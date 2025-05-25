"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface UserMenuProps {
  user: SupabaseUser;
  signOut: () => Promise<void>;
  router: { push: (path: string) => void };
}

const UserMenu = ({ user, signOut, router }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // モーダル外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <div className="flex items-center gap-8">
      {/* Createボタン（ワイヤーフレームサイズに調整） */}
      <Link href="/article/create">
        <button className="w-[120px] h-[44px] bg-[#383838] text-[#ffffff] text-[18px] font-medium rounded-full flex items-center justify-center">
          Create
        </button>
      </Link>
      {/* ユーザーアイコンとドロップダウン */}
      <div className="relative" ref={menuRef}>
        <button
          className="w-[50px] h-[50px] bg-[#bababa] rounded-full flex items-center justify-center"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div
            className="w-[20px] h-[23px] bg-[#151515]"
            style={{
              mask: "url('/icons/user-icon.svg') no-repeat center",
              WebkitMask: "url('/icons/user-icon.svg') no-repeat center",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}
          />
        </button>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-300 rounded-lg shadow-lg z-50 flex flex-col items-center py-4">
            <div className="px-4 py-2 text-gray-800 text-sm font-bold mb-2">
              {user?.email || "User name"}
            </div>
            <button
              onClick={handleLogout}
              className="w-32 px-4 py-2 text-sm text-white bg-red-400 hover:bg-red-500 rounded-full font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
