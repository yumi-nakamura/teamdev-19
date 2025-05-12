"use client";

import React from "react";
import ArticleForm, { ArticleFormData } from "@/components/ArticleForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateArticlePage() {
  const router = useRouter();

  const handleSubmit = async (data: ArticleFormData) => {
    try {
      // 今後DBへの保存処理を追加
      console.log("投稿データ:", data);

      // 成功したら記事詳細ページへリダイレクト
      router.push("/article/1");
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };

  return (
    <div>
      <header className="bg-white px-4 py-3">
        <div className="w-full px-4 flex justify-end items-center">
          <nav className="relative group flex space-x-4 items-center">
            <Link
              href="/Create"
              className="w-24 text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-6"
            >
              Create
            </Link>
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full flex flex-col items-center justify-center relative">
              {/* 頭  */}
              <div className="w-[12px] h-[12px] bg-black rounded-full absolute top-3"></div>
              {/* 肩（半円） */}
              <div className="w-[25px] h-[12px] bg-black rounded-t-full absolute bottom-3"></div>
            </div>

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
      <ArticleForm onSubmit={handleSubmit} />;
    </div>
  );
}
