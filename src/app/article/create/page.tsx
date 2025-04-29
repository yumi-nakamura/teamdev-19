"use client";

import React from "react";
import ArticleForm, { ArticleFormData } from "@/components/ArticleForm";
import { useRouter } from "next/navigation";

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

  return <ArticleForm onSubmit={handleSubmit} />;
}
