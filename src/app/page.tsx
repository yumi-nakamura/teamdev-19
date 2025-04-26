"use client";
import React from "react";
import Pagination from "./components/Pagination";
import SignUp from "@/components/SignUp/SignUp";

export default function Page() {
  const handlePageChange = (page: number) => {
    console.log("選択されたページ:", page);
  };

  return (
    <>
      <SignUp />
      <main style={{ padding: 20 }}>
        <Pagination totalPages={10} onPageChange={handlePageChange} />
      </main>
    </>
  );
}
