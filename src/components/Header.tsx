"use client";
import React, { useState } from "react";
import UserMenu from "./UserMenu";
import { useAuth } from "@/libs/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

function PcMenu({ user, signOut, router }: { user: SupabaseUser | null, signOut: () => Promise<void>, router: { push: (path: string) => void } }) {
  return (
    <div className="hidden min-[501px]:flex items-center">
      {user ? <UserMenu user={user} signOut={signOut} router={router} /> : (
        <>
          <Link href="/login">
            <button type="button" className="w-[110px] h-[36px] bg-white text-black border border-black rounded-full text-[14px] font-bold px-2 py-1 mr-2">Login</button>
          </Link>
          <Link href="/signup">
            <button type="button" className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1">Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
}


function MobileMenu({ user, isMenuOpen, setIsMenuOpen, handleLogout }: { user: SupabaseUser | null, isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void, handleLogout: () => void }) {
  return (
    <>
      <button
        className="min-[501px]:hidden w-8 h-8 flex flex-col justify-center items-center ml-auto"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="block w-8 h-1 bg-black mb-1 rounded"></span>
        <span className="block w-8 h-1 bg-black mb-1 rounded"></span>
        <span className="block w-8 h-1 bg-black rounded"></span>
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#D9D9D9] flex flex-col items-center justify-start pt-8">
          <button
            className="absolute top-4 right-4 text-3xl font-bold"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
          <div className="flex flex-col gap-6 mt-16 w-full items-center">
            {user ? (
              <>
                <button
                  className="w-48 h-12 bg-[#383838] text-white rounded-full text-lg font-bold"
                  onClick={() => { setIsMenuOpen(false); window.location.href = "/article/create"; }}
                >
                  Create
                </button>
                <button
                  className="w-48 h-12 bg-red-400 text-white rounded-full text-lg font-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-48 h-12 border border-black text-black rounded-full text-lg font-bold bg-white mb-2">Login</button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-48 h-12 bg-[#383838] text-white rounded-full text-lg font-bold">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}


const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
    window.location.href = "/login";
  };
  return (
    <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-end items-center relative">
      <PcMenu user={user} signOut={signOut} router={router} />
      <MobileMenu user={user} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} handleLogout={handleLogout} />

    </header>
  );
};

export default Header;
