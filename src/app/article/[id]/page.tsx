import React from "react";
import ArticleDetail from "@/components/ArticleDetail";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params: { id } }: ArticlePageProps) {
  //npm run lint実行時にエラーが出るので、console.logを追加
  console.log(id);
  return (
    <main>
      <ArticleDetail />
    </main>
  );
}
