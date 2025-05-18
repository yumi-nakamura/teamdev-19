"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/libs/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-900">
        BlogTitle
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-[110px] h-[36px] bg-blue-500 text-white rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
          >
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button
                type="button"
                className="w-[110px] h-[36px] bg-white text-black border border-black rounded-full text-[14px] font-bold px-2 py-1 mr-2"
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                type="button"
                className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;