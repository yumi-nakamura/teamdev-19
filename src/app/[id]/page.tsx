"use client";
import React from "react";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/PostCard";
import "../globals.css";
import { withAuth } from "@/libs/withAuth";
import Header from "@/components/Header";


export default withAuth(function Profile() {
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
      <Header />
      <div className="bg-gray-50 text-gray-900">
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
});
