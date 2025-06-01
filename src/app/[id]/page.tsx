"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import PostCard from "../../components/PostCard";
import { SearchBar } from "../../components/SearchBar";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import "../globals.css";

// 型定義
type Category = { name: string };
type Post = {
  id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  categories: Category | null;
};

export default function Page() {
  // 認証後はwithAuthでラップ
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, image_path, created_at, categories(name)")
        .returns<Post[]>();
      if (error) {
        console.error("❌ 投稿取得エラー:", error);
        return;
      }
      setBlogPosts(data ?? []);
    };
    fetchPosts();
  }, []);

  const totalPages = Math.ceil(blogPosts.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("選択されたページ:", page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedPosts = blogPosts.slice(startIndex, endIndex);

  return (
    <>
      <Header />
      <div className="bg-gray-50 text-gray-900">
        <SearchBar />
        <main>
          <h1 className="max-w-6xl text-center mt-10 text-4xl font-bold text-gray-500">
            Your Post
          </h1>
          <div className="max-w-6xl mx-auto flex flex-wrap gap-16 m-16 justify-center">
            {displayedPosts.length > 0
              ? displayedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post_id={post.id}
                    title={post.title}
                    content={post.content}
                    image_path={post.image_path}
                    created_at={post.created_at}
                    categoryName={post.categories?.name || ""}
                  />
                ))
              : Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <PostCard
                      key={index}
                      post_id={-1 * (index + 1)}
                      title="ブログタイトル"
                      content="ブログの冒頭部分…"
                      image_path="/sample-thumbnail.jpg"
                      created_at="2025-00-00"
                      categoryName="カテゴリ"
                    />
                  ))}
          </div>
          <div style={{ padding: 20 }}>
            <Pagination
              totalPages={totalPages}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
        <footer className="bg-white mt-16 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TeamDev19. All rights reserved.
        </footer>
      </div>
    </>
  );
}
