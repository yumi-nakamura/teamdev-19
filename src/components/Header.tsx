"use client";

import React from "react";
import UserMenu from "./UserMenu";

const Header = () => {
  const isLoggedIn = false;

  return (
    <header className="w-full max-w-[2055px] mx-auto h-[120px] bg-[#D9D9D9] px-[30px] flex justify-end items-center">
      <div className="flex items-center">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <button
              type="button"
              className="w-[200px] h-[60px] bg-white text-black border border-black rounded-full text-[25px] font-bold px-[22.29px] py-[9.68px] mr-[50px]"
            >
              Login
            </button>
            <button
              type="button"
              className="w-[200px] h-[60px] bg-[#383838] text-[#ffffff] rounded-full text-[25px] font-bold flex items-center justify-center leading-[100%]"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
