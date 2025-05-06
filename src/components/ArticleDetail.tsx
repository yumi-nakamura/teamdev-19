import React from "react";
import Link from "next/link";
import { CommentSection } from "./CommentSection";

export const ArticleDetail = () => {
  // ダミーデータ
  const article = {
    id: 1,
    title: "Blog Title",
    content:
      "ダミーテキストです。ここには記事の内容を表示する予定です ダミーテキストです。ここには記事の内容を表示する予定ですダミーテキストです。ここには記事の内容を表示する予定です",
  };

  return (
    <>
      {/* ヘッダー */}
      <header className="bg-gray-100 px-4 py-3 flex justify-end items-center gap-4 rounded-t-lg">
        <Link
          href="/login"
          className="px-6 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-2 rounded-full border border-gray-800 text-gray-800 bg-white hover:bg-gray-100 transition"
        >
          Sign Up
        </Link>
      </header>
      {/* 詳細記事本体 */}
      <div className="max-w-4xl mx-auto p-5">
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full h-64 bg-gray-300"></div>
          </div>

          <div className="text-base leading-relaxed">
            <p>{article.content}</p>
          </div>
        </div>
      </div>
      {/* コメント欄 */}
      <CommentSection />
    </>
  );
};

export default ArticleDetail;
