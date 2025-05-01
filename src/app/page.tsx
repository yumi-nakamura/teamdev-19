"use client";
import React from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import "./globals.css";

export default function Page() {
  const blogPosts = [
    {
      post_id: "1",
      title: "ブログタイトル",
      user_id: "Name",
      category_id: "category",
      created_at: "2025-00-00",
      updated_at: "2025-00-00",
      content:
        "ブログの冒頭部分ブログの冒頭部分ブログの冒頭部分ブログの冒頭部分…",
      image_path: "/sample-thumbnail.jpg",
    },
  ];

  const handlePageChange = (page: number) => {
    console.log("選択されたページ:", page);
    // ここで API を叩いてデータ再取得、スクロールトップするなどの処理
  };

  return (
    <>
      <div className="bg-gray-50 text-gray-900">
        <header className="bg-white px-4 py-3">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
            <nav className="space-x-4 text-sm">
              <a
                href="/login"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </a>
              <a
                href="/signup"
                className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign Up
              </a>
            </nav>
          </div>
        </header>

        <main>
          <div className="max-w-6xl mx-auto flex flex-wrap gap-15 m-15">
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <PostCard key={index} {...blogPosts[0]} />
              ))}
          </div>
          <div style={{ padding: 20 }}>
            <Pagination totalPages={10} onPageChange={handlePageChange} />
          </div>
        </main>
        <footer className="bg-white mt-16 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TeamDev19. All rights reserved.
        </footer>
      </div>
    </>
  );
}
