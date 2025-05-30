"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/PostCard";
import "../globals.css";

export default function Profile() {
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
          <div className="w-full px-4 flex justify-end items-center">
            <nav className="relative group flex space-x-4 items-center">
              <Link
                href="/Create"
                className="w-24 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-6"
              >
                Create
              </Link>
              <Image
                src="https://placehold.jp/50x50.png"
                alt="User profile picture"
                className="rounded-full"
                width={50}
                height={50}
              />
              <div className="absolute top-full right-0 mt-2 w-33 bg-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                <div className="px-4 py-2 mt-1.5 text-gray-800 flex justify-center text-sm font-bold">
                  User Name
                </div>
                <div className="flex justify-center">
                  <button className="w-24 px-4 py-1.5 mb-3 text-sm text-white bg-red-400 hover:bg-red-500 rounded-full font-bold">
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main>
          <h1 className="max-w-6xl text-center mt-10 text-4xl font-bold text-gray-500">
            Your Post
          </h1>
          <div className="max-w-6xl mx-auto flex flex-wrap gap-15 m-15">
            {Array(6)
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
