import React from "react";
import ArticleDetail from "@/components/ArticleDetail";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <header className="bg-white px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
          <nav className="space-x-4 text-sm">
            <a
              href="/login"
              className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Sign Up
            </a>
          </nav>
        </div>
      </header>
      <ArticleDetail id={id} />
    </>
  );
}
