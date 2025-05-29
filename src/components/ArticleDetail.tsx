"use client";
import React, { useEffect, useState } from "react";
import { CommentSection } from "./CommentSection";
import { supabase } from "@/utils/supabase";


// 型定義
type Category = {
name: string;
};

type Article = {
id: number;
title: string;
content: string;
created_at: string;
image_path: string;
categories: Category | null;
};

export const ArticleDetail = ({ postId }: { postId: number }) => {
const [article, setArticle] = useState<Article | null>(null);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
const fetchArticle = async () => {
const { data, error } = await supabase
.from("posts")
.select("id, title, content, image_path, created_at, categories(name)")//リレーションで仮
.eq("id", postId)
.single();

if (error || !data) {
console.error("❌ 記事取得エラー:", error);
setError("記事が見つかりませんでした。");
return;
}
if (data) {
const formatted: Article = {
...data,
categories: Array.isArray(data.categories) && data.categories.length > 0 ? data.categories[0] : null,
};
setArticle(formatted);
}
};

fetchArticle();
}, [postId]);

if (error) {
return <p className="text-center text-red-500 mt-10">{error}</p>;
}

if (!article) {
return <p className="text-center text-gray-500 mt-10">読み込み中...</p>;
}

return (
<>

<div className="max-w-4xl mx-auto p-5">
<div className="bg-gray-50 rounded-lg p-6 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h1 className="text-2xl font-bold">{article.title}</h1>
<div className="flex items-center space-x-2">
<p className="text-sm text-gray-500 mr-4">
{new Date(article.created_at).toLocaleString("ja-JP")}
</p>
<div className="w-11 h-11 rounded-full bg-gray-300"></div>
</div>
</div>

<div className="mb-4 flex justify-center">
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

{article.categories?.name && (
<p className="mb-2 text-xs text-gray-500">
カテゴリ: {article.categories.name}
</p>
)}

<div className="text-base leading-relaxed">
<p>{article.content}</p>
</div>
</div>
<CommentSection postId={article.id} />
</div>
</>
);
};
