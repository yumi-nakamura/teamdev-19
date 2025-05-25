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

  const handlePageChange = (page: number) => {
    console.log("選択されたページ:", page);
    // ここで API を叩いてデータ再取得、スクロールトップするなどの処理
  };

  return (
    <>
      <div className="bg-gray-50 text-gray-900">
        <Header />
        <SearchBar />
        <main>
          <div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
            {blogPosts.map((post, idx) => {
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
