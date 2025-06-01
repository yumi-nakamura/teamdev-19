import React from "react";
import ArticleDetail from "@/components/ArticleDetail";
import Header from "@/components/Header";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params;
  //npm run lint実行時にエラーが出るので、console.logを追加
  console.log(id);

  return (
    <>
      <Header />
      <main>
        <ArticleDetail articleId={id} />
      </main>
    </>
  );
}
