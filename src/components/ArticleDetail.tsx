"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface ArticleDetailProps {
  id: string;
}

export default function ArticleDetail({ id }: ArticleDetailProps) {
  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error || !data) {
        console.error("記事取得エラー:", error);
        setError("記事が見つかりませんでした。");
        return;
      }

      setArticle(data);
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!article) {
    return <p className="text-center text-gray-500 mt-10">読み込み中...</p>;
  }

  return (
    <div className="flex justify-center mx-auto p-5 m-10">
      <div className="bg-gray-50 w-180 rounded-lg p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <div className="flex items-center">
            <div className="w-11 h-11 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="mb-5 flex justify-center">
          {article.image_path ? (
            <img
              src={article.image_path}
              alt="投稿画像"
              className="w-170 h-85 object-cover rounded"
            />
          ) : (
            <div className="w-170 h-85 bg-gray-300 rounded"></div>
          )}
        </div>

        <div className="text-base leading-relaxed flex justify-center">
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
}
