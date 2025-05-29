import React from "react";
import ArticleDetail from "@/components/ArticleDetail";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  //npm run lint実行時にエラーが出るので、console.logを追加
  console.log(id);

  return (
    <main>
      <ArticleDetail articleId={id} />
    </main>
  );
}
