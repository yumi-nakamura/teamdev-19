"use client";
import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/PostCard";
import "../globals.css";
import { withAuth } from "../../libs/withAuth";
import Header from "@/components/Header";

export default withAuth(function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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
    setCurrentPage(page);
    console.log("選択されたページ:", page);
    // ここで API を叩いてデータ再取得、スクロールトップするなどの処理
  };

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <PostCard key={post.post_id} {...post} categoryName="カテゴリー" />
          ))}
        </div>
        <div className="mt-8">
          <Pagination
            totalPages={Math.ceil(blogPosts.length / pageSize)}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
});
