"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PostCard from "../components/PostCard";
import "./globals.css";
import Link from "next/link";
import { SearchBar } from "../components/SearchBar";
import { supabase } from "../lib/supabaseClient";
import "./globals.css";

// 型定義（リレーション対応） 
type Post = {
id: number;
title: string;
content: string;
image_path: string;
created_at: string;
categories: {
name: string;
} | null;
};

export default function Page() {
const [blogPosts, setBlogPosts] = useState<Post[]>([]);

useEffect(() => {
const fetchPosts = async () => {
const { data, error } = await supabase
.from("posts")
.select("id, title, content, image_path, created_at, categories(name)")
.returns<Post[]>()

if (error) {
console.error("❌ 投稿取得エラー:", error);
return;
}

setBlogPosts(data ?? []);
};

fetchPosts();
}, []);

const handlePageChange = (page: number) => {
console.log("選択されたページ:", page);
};

return (
<div className="bg-gray-50 text-gray-900">
<header className="bg-white px-4 py-3">
<div className="max-w-5xl mx-auto flex justify-between items-center">
<h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
<nav className="space-x-4 text-sm">
<Link
href="/login"
className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
>
Login
</Link>
<Link
href="/signup"
className="text-gray-700 bg-white hover:bg-gray-100 border border-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
>
Sign Up
</Link>
</nav>
</div>
</header>

<SearchBar />

<main>
<div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
{blogPosts.map((post) => (
<PostCard
key={post.id}
post_id={post.id}
title={post.title}
content={post.content}
image_path={post.image_path}
created_at={post.created_at}
categoryName={post.categories?.name || ""}
/>
))}
</div>
<div style={{ padding: 20 }}>
<Pagination totalPages={10} onPageChange={handlePageChange} />
</div>
</main>

<footer className="bg-white mt-16 py-4 text-center text-sm text-gray-500">
© {new Date().getFullYear()} TeamDev19. All rights reserved.
</footer>
</div>
);
}