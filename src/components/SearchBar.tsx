import React from "react";

export const SearchBar = () => {
  return (
    <div className="mt-[50px] flex items-center justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-[32%] px-[30px] py-[10px] rounded-full border-none bg-[#f0f0f0] text-[16px] placeholder-gray-500"
      />
      <span className="ml-[15px] inline-block align-middle text-black relative w-[0.5em] h-[0.5em] border-[0.1em] border-current rounded-full box-content before:content-[''] before:absolute before:top-[88%] before:left-[88%] before:w-[0.5em] before:h-[0.1em] before:bg-current before:rounded-br-[0.1em] before:transform before:-translate-y-1/2 before:rotate-45 before:origin-left" />
    </div>
  );
};
