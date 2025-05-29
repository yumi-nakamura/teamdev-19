"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import PostCard from "@/components/PostCard";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/libs/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import "./globals.css";
import { useRouter } from "next/navigation";
import Link from "next/link"
type Category = {
id: number;
name: string;
};

type Post = {
id: number;
title: string;
content: string;
image_path: string;
created_at: string;
category_id: number;
};

export default function Page() {
const { user, signOut } = useAuth();
const router = useRouter();

const [blogPosts, setBlogPosts] = useState<Post[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [currentPage, setCurrentPage] = useState(1);

const pageSize = 9;
const totalPages = Math.ceil(blogPosts.length / pageSize);

const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const displayedPosts = blogPosts.slice(startIndex, endIndex);

const handlePageChange = (page: number) => {
console.log("Page changed to:", page);
setCurrentPage(page);
};

const handleLogout = async () => {
await signOut();
router.push("/login");
};

useEffect(() => {
const fetchPosts = async () => {
const { data, error } = await supabase
.from("posts")
.select("id, title, content, image_path, created_at, category_id");

if (error) {
console.error("❌ 投稿取得エラー:", error);
return;
}

setBlogPosts(data ?? []);
};

const fetchCategories = async () => {
const { data, error } = await supabase.from("categories").select("*");
if (error) {
console.error("❌ カテゴリ取得エラー:", error);
return;
}

setCategories(data ?? []);
};

fetchPosts();
fetchCategories();
}, []);

return (
<div className="bg-gray-50 text-gray-900">
<header className="bg-white px-4 py-3">
<div className="max-w-5xl mx-auto flex justify-between items-center">
<h1 className="text-xl font-bold text-gray-900">BlogTitle</h1>
<nav className="space-x-4 text-sm">
{user ? (
<button
onClick={handleLogout}
className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
>
Logout
</button>
) : (
<>
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
</>
)}
</nav>
</div>
</header>

<SearchBar />

<main>
<div className="max-w-6xl w-full mx-auto flex flex-wrap gap-16 m-16 justify-center">
{displayedPosts.map((post, idx) => {
const category = categories.find(
(cat) => String(cat.id) === String(post.category_id)
);
return (
<PostCard
key={post.id || String(idx)}
post_id={post.id}
title={post.title}
content={post.content}
image_path={post.image_path}
created_at={post.created_at}
categoryName={category ? category.name : ""}
/>
);
})}
</div>

<div style={{ padding: 20 }}>
<Pagination
totalPages={totalPages}
pageSize={pageSize}
currentPage={currentPage}
onPageChange={handlePageChange}
/>
</div>
</main>

<footer className="bg-white mt-16 py-4 text-center text-sm text-gray-500">
© {new Date().getFullYear()} TeamDev19. All rights reserved.
</footer>
</div>
);
}