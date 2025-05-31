"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import "./globals.css";
import Link from "next/link";
import { SearchBar } from "../components/SearchBar";
import { supabase } from "../lib/supabaseClient";

type Post = {
  post_id: string;
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  category?: Category;
};

type Category = {
  id: string;
  name: string;
};

export default function Page() {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;
  const totalPages = Math.ceil(blogPosts.length / pageSize);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, category:categories(*)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("データ取得エラー:", error);
      } else {
        const sorted = (data || []).sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        setBlogPosts(sorted);
      }
    };
    fetchPosts();
  }, []);

  // ページ変更時
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 表示する記事をスライス
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedPosts = blogPosts.slice(startIndex, endIndex);

  return (
    <>
      <div className="bg-gray-50 text-gray-900">
        <header className="bg-white px-4 py-3">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
            <nav className="space-x-4 text-sm">
              <Link
                href="/login"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign Up
              </Link>
            </nav>
          </div>
        </header>

        <SearchBar />

        <main>
          <div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
            {displayedPosts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                post_id={post.id}
                categoryName={post.category ? post.category.name : ""}
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
