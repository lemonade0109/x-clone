"use client";
import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { Input } from "./input";
import { TooltipContainer } from "./tooltip-container";

export type IconSelectorsProp = {
  addImageToPost: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const IconSelectors = (props: IconSelectorsProp) => {
  const { addImageToPost } = props;
  const imagePickRef = React.useRef<HTMLInputElement>(null);
  const name = "image";

  const handleImageClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (imagePickRef.current) {
      imagePickRef.current.click();
    }
  };
  return (
    <div className="max-w-3xl">
      <TooltipContainer content="media" variant="blueShade">
        <div className="group">
          <div className="w-11 h-11 flex items-center justify-center group-hover:bg-twitter/15 rounded-full z-10">
            <HiOutlinePhotograph
              onClick={handleImageClick}
              className="h-10 w-10 p-2 text-sky-500 group-hover:text-twitter rounded-full cursor-pointer "
            />
          </div>
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

      <TooltipContainer content="GIF" variant="blueShade">
        <div className="group">
          <div className="w-11 h-11 flex items-center justify-center group-hover:bg-twitter/15 rounded-full">
            <MdOutlineGifBox className="h-10 w-10 p-2 text-sky-500 group-hover:text-twitter rounded-full cursor-pointer" />
          </div>
        </div>
      </TooltipContainer>

      <TooltipContainer content="emoji" variant="blueShade">
        <div className="group">
          <div className="w-11 h-11 flex items-center justify-center group-hover:bg-twitter/15 rounded-full">
            <MdOutlineEmojiEmotions className="h-10 w-10 p-2 text-sky-500 group-hover:text-twitter rounded-full cursor-pointer" />
          </div>
        </div>
      </TooltipContainer>
    </div>
  );
};

export default IconSelectors;
