"use client";
import React from "react";
import Pagination from "./components/Pagination";

export default function Page() {
  const handlePageChange = (page: number) => {
    console.log("選択されたページ:", page);
    // ここで API を叩いてデータ再取得、スクロールトップするなどの処理
  };

  return (
    <main style={{ padding: 20 }}>
      <Pagination totalPages={10} onPageChange={handlePageChange} />
    </main>
  );
}
