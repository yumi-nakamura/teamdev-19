// app/article/[id]/page.tsx
import React from "react";
import ArticleDetail from "@/components/ArticleDetail";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const id = Number(params.id);

  if (isNaN(id)) {
    console.error("❌ 無効な記事ID:", params.id);
    return <div>記事IDが不正です。</div>;
  }

  return (
    <main>
      <ArticleDetail postId={id} />
    </main>
  );
}
