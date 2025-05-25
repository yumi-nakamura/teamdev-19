"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ArticleForm, { ArticleFormData } from "@/components/ArticleForm";
import { withAuth } from "@/libs/withAuth";

// 記事編集ページのコンポーネント
export default withAuth(function EditArticlePage() {
  const router = useRouter();
  const { id: articleId } = useParams() as { id: string };
  const [article, setArticle] = useState<ArticleFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // フォーム送信と同じ機能のヘッダーボタン
  const handleCreateClick = () => {
    if (article) {
      handleSubmit(article);
    }
  };

  // 記事データの取得
  useEffect(() => {
    async function fetchArticle() {
      try {
        setLoading(true);

        // ダミーデータ（将来的にAPIから取得）
        const dummyArticle: ArticleFormData = {
          title: "サンプル記事タイトル",
          content:
            "これはサンプルの記事内容です。実際のAPIから取得したデータに置き換えてください。",
          category_id: 1,
          image: null,
          image_path: "/images/sample-image.jpg",
        };

        setArticle(dummyArticle);
      } catch (err) {
        console.error("記事データの取得エラー:", err);
        setError("記事データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    }

    if (articleId) fetchArticle();
  }, [articleId]);

  // 更新処理
  const handleSubmit = async (data: ArticleFormData) => {
    try {
      // 画像ファイルがある場合は、アップロード処理を行う
      let imagePath = data.image_path;
      if (data.image) {
        // 実際には画像アップロード処理が必要（現在はダミー処理）
        imagePath = `/images/uploaded-${Date.now()}.jpg`;
      }

      // 更新データ
      const updateData = {
        title: data.title,
        content: data.content,
        category_id: data.category_id,
        image_path: imagePath,
        // user_id は認証機能実装後に追加
      };

      console.log("送信する更新データ:", updateData);

      // 成功時のリダイレクト
      router.push(`/article/${articleId}`);
    } catch (err) {
      console.error("記事更新エラー:", err);
      alert("記事の更新に失敗しました。");
    }
  };

  return (
    <>
      {/* カスタムヘッダー */}
      <header className="w-full max-w-[2055px] mx-auto h-[60px] bg-[#D9D9D9] px-[30px] flex justify-end items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleCreateClick}
            className="w-[110px] h-[36px] bg-[#383838] text-[#ffffff] rounded-full text-[14px] font-bold flex items-center justify-center px-2 py-1"
          >
            Create
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {loading && <p className="text-center py-8">読み込み中...</p>}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && article && (
          <ArticleForm onSubmit={handleSubmit} initialData={article} />
        )}
      </div>
    </>
  );
});
