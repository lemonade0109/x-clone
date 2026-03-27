"use client";
import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { Input } from "./input";
import TooltipContainer from "./tooltip-container";
import EmojiPicker from "emoji-picker-react";

export type IconSelectorsProp = {
  addImageToPost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmojiSelect?: (emoji: string) => void;
  onGifSelect?: (gifUrl: string) => void;
};

type GiphyGif = {
  id: string;
  title: string;
  images?: {
    fixed_height?: { url?: string };
    fixed_width_downsampled?: { url?: string };
    original?: { url?: string };
  };
};

const IconSelectors = (props: IconSelectorsProp) => {
  const { addImageToPost, onEmojiSelect, onGifSelect } = props;
  const imagePickRef = React.useRef<HTMLInputElement>(null);
  const [showEmoji, setShowEmoji] = React.useState(false);
  const [showGif, setShowGif] = React.useState(false);
  const [gifs, setGifs] = React.useState<GiphyGif[]>([]);
  const [gifSearch, setGifSearch] = React.useState("");
  const gifModalRef = React.useRef<HTMLDivElement>(null);
  const emojiModalRef = React.useRef<HTMLDivElement>(null);
  const name = "image";

  // Store raw gif objects, not mapped URLs
  const parseGifs = (data: any[]): GiphyGif[] => {
    return data
      .filter((gif) => gif?.id && gif?.images)
      .map((gif) => ({
        id: gif.id,
        title: gif.title ?? "",
        images: {
          fixed_height: gif.images?.fixed_height,
          fixed_width_downsampled: gif.images?.fixed_width_downsampled,
          original: gif.images?.original,
        },
      }));
  };

  // Fetch trending GIFs on mount
  React.useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const res = await fetch("/api/giphy/trending?limit=20");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setGifs(parseGifs(Array.isArray(data?.data) ? data.data : []));
      } catch (error) {
        console.error("Error fetching trending GIFs:", error);
        setGifs([]);
      }
    };

    if (showGif) fetchTrendingGifs();
  }, [showGif]);

  // Search GIFs
  const searchGifs = async (query: string) => {
    if (!query.trim()) {
      setGifs([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/giphy/search?q=${encodeURIComponent(query)}&limit=20`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setGifs(parseGifs(Array.isArray(data?.data) ? data.data : []));
    } catch (error) {
      console.error("Error searching GIFs:", error);
      setGifs([]);
    }
  };

  const handleGifSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setGifSearch(query);
    searchGifs(query);
  };

  const handleImageClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (imagePickRef.current) {
      imagePickRef.current.click();
    }
  };

  const handleEmojiSelect = (emojiData: any) => {
    onEmojiSelect?.(emojiData.emoji);
    setShowEmoji(false);
  };

  const handleGifSelect = (gifUrl: string) => {
    onGifSelect?.(gifUrl);
    setShowGif(false);
    setGifSearch("");
    setGifs([]);
  };

  // Close modals when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        gifModalRef.current &&
        !gifModalRef.current.contains(event.target as Node)
      ) {
        setShowGif(false);
      }
      if (
        emojiModalRef.current &&
        !emojiModalRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-1">
      {/* Media */}
      <TooltipContainer content="media" side="bottom">
        <div className="group">
          <button
            type="button"
            className="w-11 h-11 flex items-center justify-center group-hover:bg-[#1d9bf0]/15 rounded-full z-10"
          >
            <HiOutlinePhotograph
              onClick={handleImageClick}
              className="h-10 w-10 p-2 text-sky-500 group-hover:text-[#1d9bf0] rounded-full cursor-pointer "
            />
          </button>
          <Input
            id="imageInput"
            type="file"
            ref={imagePickRef}
            onChange={addImageToPost}
            accept="image/*"
            className="hidden"
            name={name}
          />
        </div>
      </TooltipContainer>

      {/* GIF */}
      <TooltipContainer content="GIF" side="bottom">
        <div className="group relative" ref={gifModalRef}>
          <button
            type="button"
            onClick={() => {
              setShowGif(!showGif);
              setShowEmoji(false);
            }}
            className="w-11 h-11 flex items-center justify-center group-hover:bg-[#1d9bf0]/15 rounded-full"
          >
            <MdOutlineGifBox className="h-10 w-10 p-2 text-sky-500 group-hover:text-[#1d9bf0] rounded-full cursor-pointer" />
          </button>

          {/* GIF modal - opens downward */}
          {showGif && (
            <div className="absolute top-12 left-0 w-80 z-50 bg-white rounded-2xl shadow-2xl border border-zinc-200">
              <div className="p-4 border-b border-zinc-200">
                <Input
                  type="text"
                  placeholder="Search GIFs"
                  value={gifSearch}
                  onChange={handleGifSearchChange}
                  className="w-full rounded-full border text-sm border-zinc-300 px-3 py-2 outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 max-h-80 overflow-y-auto">
                {gifs.length > 0 ? (
                  gifs.map((gif) => {
                    const previewUrl =
                      gif.images?.fixed_height?.url ||
                      gif.images?.fixed_width_downsampled?.url ||
                      gif.images?.original?.url;

                    if (!previewUrl) return null;

                    return (
                      <button
                        key={gif.id}
                        type="button"
                        onClick={() => handleGifSelect(previewUrl)}
                        className="relative overflow-hidden rounded-lg transition hover:opacity-80"
                      >
                        <img
                          src={previewUrl}
                          alt={gif.title || "GIF"}
                          className="h-32 w-full object-cover"
                        />
                      </button>
                    );
                  })
                ) : (
                  <div className="col-span-2 py-8 text-center text-sm text-zinc-500">
                    {gifSearch ? "No GIFs found" : "Loading GIFs..."}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </TooltipContainer>

      {/* Emoji */}
      <TooltipContainer content="emoji" side="bottom">
        <div className="group relative" ref={emojiModalRef}>
          <button
            type="button"
            onClick={() => {
              setShowEmoji(!showEmoji);
              setShowGif(false);
            }}
            className="w-11 h-11 flex items-center justify-center group-hover:bg-[#1d9bf0]/15 rounded-full"
          >
            <MdOutlineEmojiEmotions className="h-10 w-10 p-2 text-sky-500 group-hover:text-[#1d9bf0] rounded-full cursor-pointer" />
          </button>

          {/* Emoji modal - opens downward */}
          {showEmoji && (
            <div className="absolute top-12 right-0 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                width={320}
                height={400}
              />
            </div>
          )}
        </div>
      </TooltipContainer>
    </div>
  );
};

export default IconSelectors;
