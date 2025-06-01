"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/libs/AuthContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase";
import Header from "@/components/Header";

type Category = {
  id: number;
  name: string;
};
type Post = {
  id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  category_id: number;
};

export default function Page() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 9;
  const totalPages = Math.ceil(blogPosts.length / pageSize);

  // ページング
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedPosts = blogPosts.slice(startIndex, endIndex);

  // 投稿・カテゴリ取得
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, image_path, created_at, category_id");
      if (error) {
        console.error("❌ 投稿取得エラー:", error);
        return;
      }
      setBlogPosts(data ?? []);
    };

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("❌ カテゴリ取得エラー:", error);
        return;
      }
      setCategories(data ?? []);
    };

    fetchPosts();
    fetchCategories();
  }, []);

  // ページ変更時
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log("Page changed to:", page);
  };

  // ログアウト
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
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
                key={post.id || String(idx)}
                post_id={post.id}
                title={post.title}
                content={post.content}
                image_path={post.image_path}
                created_at={post.created_at}
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
  );
}
