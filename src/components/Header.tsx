'use client';
import React from 'react';
import UserMenu from './UserMenu';

const Header = () => {
  const isLoggedIn = false

  return (
    <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-end items-center">
      <div className="flex items-center">
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <button
              type="button"
              className="w-[110px] h-[36px] bg-white text-black border border-black rounded-full text-[14px] font-bold px-2 py-1 mr-2"
            >
              Login
            </button>
            <button
              type="button"
              className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
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