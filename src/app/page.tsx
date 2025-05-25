"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import "./globals.css";
import { SearchBar } from "../components/SearchBar";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

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
};

type Category = {
  id: string;
  name: string;
};

export default function Page() {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;
  const totalPages = Math.ceil(blogPosts.length / pageSize);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
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
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("カテゴリ取得エラー:", error);
      } else {
        setCategories(data || []);
      }
    };
    fetchPosts();
    fetchCategories();
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
        <Header />
        <SearchBar />
        <main>
          <div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
            {displayedPosts.map((post, idx) => {
              const category = categories.find(
                (cat) => String(cat.id) === String(post.category_id),
              );
              return (
                <PostCard
                  key={post.id || post.post_id || String(idx)}
                  {...post}
                  categoryName={category ? category.name : ""}
                />
              );
            })}
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
