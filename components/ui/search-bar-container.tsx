// "use client";
// import React from "react";
// import { BsSearch } from "react-icons/bs";
// // import { fetchSearchedTweetsAndUsers } from "@/lib/actions/tweet/tweetActions";
// import Image from "next/image";
// import { CgSpinner } from "react-icons/cg";
// import { IoCloseSharp } from "react-icons/io5";
// import { MdDeleteOutline } from "react-icons/md";
// import Link from "next/link";

// const SearchBarContainer = () => {
//   // import { useRouter, useSearchParams } from "next/navigation";
//   // import { useDebouncedCallback } from "use-debounce";
//   // const searchParams = useSearchParams();
//   // const { replace } = useRouter();
//   // const [search, setSearch] = useState(
//   //   searchParams.get("search")?.toString() || ""
//   // )
//   // const handleChange = useDebouncedCallback((value: string) => {
//   //   const params = new URLSearchParams(searchParams);
//   //   if (value) {
//   //     params.set("search", value);
//   //   } else {
//   //     params.delete("search");
//   //   }
//   //   replace(`/?${params.toString()}`);
//   // });

//   // useEffect(() => {
//   //   if (!searchParams.get("search")) {
//   //     setSearch("");
//   //   }
//   // }, [searchParams.get("search")]);

//   const [searchTerm, setSearchTerm] = React.useState("");
//   const [recentSearches, setRecentSearches] = React.useState<string[]>([]);
//   const [tweets, setTweets] = React.useState<
//     {
//       profileImage: string;
//       createdAt: Date;
//       text: string;
//       image: string | null;
//       postId: string;
//       authorId: string;
//     }[]
//   >([]);
//   const [users, setUsers] = React.useState<
//     {
//       id: string;
//       profileImage: string;
//       createdAt: Date;
//       name: string;
//       userName: string;
//       bio: string;
//       location: string;
//       website: string;
//       dob: Date;
//       updatedAt: Date;
//     }[]
//   >([]);
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [searched, setSearched] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const searchRef = React.useRef<HTMLDivElement>(null);
//   const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

//   React.useEffect(() => {
//     const savedSearches = JSON.parse(
//       localStorage.getItem("recentSearches") || "[]",
//     );
//     setRecentSearches(savedSearches);
//   }, []);

//   React.useEffect(() => {
//     const handleSearch = async () => {
//       if (searchTerm.trim()) {
//         setLoading(true);
//         const result = await fetchSearchedTweetsAndUsers(searchTerm);

//         if (result) {
//           const { users, tweets } = result;
//           setTweets(tweets);
//           setUsers(users);
//           setSearched(true);
//           setIsOpen(true);
//           setLoading(false);

//           if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

//           typingTimeoutRef.current = setTimeout(() => {
//             if (!recentSearches.includes(searchTerm)) {
//               const updatedSearches = [searchTerm, ...recentSearches].slice(
//                 0,
//                 5,
//               );
//               setRecentSearches(updatedSearches);
//               localStorage.setItem(
//                 "recentSearches",
//                 JSON.stringify(updatedSearches),
//               );
//             }
//           }, 1000);
//         } else {
//           console.log("No results found");
//         }
//       } else {
//         setTweets([]);
//         setUsers([]);
//         setSearched(false);
//         setIsOpen(false);
//       }
//     };
//     handleSearch();
//   }, [searchTerm]);

//   React.useEffect(() => {
//     function handleClickOutside(e: MouseEvent) {
//       if (
//         isOpen &&
//         searchRef.current &&
//         !searchRef.current.contains(e.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   const handleDeleteRecentSearch = (index: number) => {
//     const updatedSearches = [...recentSearches];
//     updatedSearches.splice(index, 1);
//     setRecentSearches(updatedSearches);
//     // localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
//   };

//   const clearAllRecentSearches = () => {
//     setRecentSearches([]);
//     localStorage.removeItem("recentSearches");
//   };

//   return (
//     <div className="py-4 bg-black mx-2 ">
//       <div className="group relative w-full " ref={searchRef}>
//         <label
//           htmlFor="searchbox"
//           className="absolute top-0 left-0 h-full flex items-center justify-center px-10 "
//         >
//           <BsSearch className="w-6 h-6 text-gray-500  group-focus-within:text-twitter" />
//         </label>
//         <label
//           htmlFor="searchbox"
//           className="absolute top-0 right-0 h-full flex items-center justify-center px-10 cursor-pointer"
//         >
//           {searchTerm.length > 0 && (
//             <IoCloseSharp
//               className="w-6 h-6 bg-white rounded-full p-1 text-black"
//               onClick={() => setSearchTerm("")}
//             />
//           )}
//         </label>

//         <input
//           id="searchbox"
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           autoComplete="off"
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//           }}
//           onFocus={() => setIsOpen(true)}
//           className="bg-neutral-900 text-lg w-full h-full px-20 py-4 outline-none  group-focus-within:border-twitter caret-twitter group-focus-within:border rounded-3xl"
//         />

//         {/* DROPDOWN RESULTS */}
//         {isOpen && (
//           <div className="absolute top-full left-0 w-full mt-2 bg-black border rounded-lg shadow-lg h-[500px] overflow-y-auto transition-all duration-300 ease-in-out">
//             {loading && (
//               <div className="">
//                 <CgSpinner className="w-12 h-12 text-twitter animate-spin" />
//               </div>
//             )}

//             {!loading && searchTerm === "" && recentSearches.length > 0 ? (
//               <div>
//                 <div className="flex justify-between p-4">
//                   <p className=" text-white text-2xl font-bold">Recent</p>

//                   <button
//                     onClick={clearAllRecentSearches}
//                     className=" text-twitter hover:bg-twitter/10 rounded-full px-4 text-xl font-bold"
//                   >
//                     Clear all
//                   </button>
//                 </div>
//                 {recentSearches.map((search, i) => (
//                   <div
//                     key={i}
//                     className="flex items-center justify-between px-6 py-6 transition hover:bg-white/10"
//                   >
//                     <div
//                       onClick={() => setSearchTerm(search)}
//                       className="flex items-center justify-start gap-7 cursor-pointer"
//                     >
//                       <BsSearch className="w-7 h-7 text-white" />
//                       <p className="text-white text-xl ">{search}</p>
//                     </div>

//                     <div className="  w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-950 cursor-pointer">
//                       <MdDeleteOutline
//                         className="w-6 h-6 text-red-500"
//                         onClick={() => handleDeleteRecentSearch(i)}
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 <div className="border-b border-gray-700 py-2"></div>

//                 {/* {users.map((user) => (
//                   <div
//                     key={user.id}
//                     className="flex items-center justify-between px-6 py-6 transition hover:bg-white/10"
//                   >
//                     <div
//                       onClick={() => setSearchTerm(user.name)}
//                       className="flex items-center p-3 w-auto  justify-between  rounded-full  transition-all duration-200 gap-4 hover:bg-white/10"
//                     >
//                       <div className="flex gap-3">
//                         <span className="relative w-10 h-10">
//                           <Image
//                             src={user?.profileImage}
//                             alt={user?.name}
//                             fill
//                             className="rounded-full"
//                           />
//                         </span>

//                         <span className="text-white">
//                           <h1 className="font-bold tracking-wide text-lg">
//                             {user?.name}
//                           </h1>
//                           <p className="text-sm text-slate-500">
//                             @{user.userName}
//                           </p>
//                         </span>

//                         <div className="">X</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))} */}
//               </div>
//             ) : (
//               <>
//                 {!loading && users.length > 0 && (
//                   <div>
//                     <div className="w-full border-b border-gray-700 py-6 text-xl px-3 tracking-normal">
//                       <p>{`Search for "${searchTerm}"`}</p>
//                     </div>

//                     {users.map((user) => (
//                       <Link
//                         href={`/${user.userName}`}
//                         className="flex items-center justify-start gap-4 px-3 py-6 transition hover:bg-white/10 cursor-pointer"
//                         key={user.id}
//                         onClick={() => setIsOpen(false)}
//                       >
//                         <div className="w-14 h-14 relative">
//                           <Image
//                             src={user.profileImage}
//                             alt={user.userName}
//                             className="rounded-full"
//                             fill
//                           />
//                         </div>

//                         <div className=" flex flex-col items-start justify-center">
//                           <h3 className="text-gray-100 text-xl font-bold">
//                             {user.name}
//                           </h3>
//                           <p className="text-gray-500">@{user.userName}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}

//                 {!loading && tweets.length > 0 && (
//                   <div className="">
//                     <p className="p-2 text-gray-500">Tweets</p>
//                     {tweets.map((tweet) => (
//                       <div className="" key={tweet.postId}>
//                         <p className="text-gray-800">{tweet.text}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {!loading &&
//                   tweets.length === 0 &&
//                   users.length === 0 &&
//                   searched && (
//                     <p className="p-3 text-gray-500">No results found</p>
//                   )}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBarContainer;
