"use client";

import React from "react";

const UserMenu = () => {
  return (
    <div className="w-full h-[90px] flex justify-end items-center pr-[32px] bg-[#D9D9D9] relative">
      {/* Createボタン */}
      <button className="mr-[50px] w-[180px] h-[60px] bg-[#383838] text-[#ffffff] text-[25px] font-medium font-[Poppins] rounded-full flex items-center justify-center">
        Create
      </button>

      {/* ユーザーアイコンとドロップダウン */}
      <div className="relative">
        <div className="w-[80px] h-[80px] bg-[#bababa] rounded-full flex items-center justify-center relative">
          <div
            className="w-[35.75px] h-[41.96px] bg-[#151515]"
            style={{
              mask: "url('/icons/user-icon.svg') no-repeat center",
              WebkitMask: "url('/icons/user-icon.svg') no-repeat center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </div>

        {/* ドロップダウンメニュー */}
        <div className="absolute top-[calc(100%+20px)] right-0 -translate-x-1/2 w-[262px] h-[152.94px] bg-[#b3b3b3] rounded-[20px] px-[17px] pt-0 pb-[26px] flex flex-col items-center z-10">
          <div className="text-[30px] leading-[100%] font-semibold text-black mt-[25px] mb-[30px] font-poppins">
            User name
          </div>
          <button className="w-[203px] h-[50.55px] bg-[#FF3131] bg-opacity-80 text-[30px] font-poppins font-semibold text-[#000000D0] rounded-full">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
