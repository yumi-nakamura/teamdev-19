import React from "react";

export const ArticleDetail = () => {
  // ダミーデータ
  const article = {
    id: 1,
    title: "Blog Title",
    content:
      "ダミーテキストです。ここには記事の内容を表示する予定です ダミーテキストです。ここには記事の内容を表示する予定ですダミーテキストです。ここには記事の内容を表示する予定です",
  };

  return (
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
  );
};

export default ArticleDetail;
