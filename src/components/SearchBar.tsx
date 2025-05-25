"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * 検索バーコンポーネント
 * 記事のタイトルに基づいて検索する機能を提供
 */
export const SearchBar = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const router = useRouter();

  /**
   * 検索を実行する関数
   * @param e フォームのSubmitイベント
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) return;

    try {
      setIsSearching(true);

      // 検索結果ページへ遷移
      // クエリパラメータとしてキーワードを渡す
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    } catch (error) {
      console.error("検索エラー:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-[70px] flex items-center justify-center"
    >
      <input
        type="text"
        placeholder="記事を検索..."
        className="w-[32%] px-[30px] py-[10px] rounded-full border-none bg-[#f0f0f0] text-[16px] placeholder-gray-500"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={isSearching}
      />
      <button
        type="submit"
        className="ml-[15px] bg-transparent border-none cursor-pointer"
        disabled={isSearching}
      >
        <span className="inline-block align-middle text-black relative w-[0.5em] h-[0.5em] border-[0.1em] border-current rounded-full box-content before:content-[''] before:absolute before:top-[88%] before:left-[88%] before:w-[0.5em] before:h-[0.1em] before:bg-current before:rounded-br-[0.1em] before:transform before:-translate-y-1/2 before:rotate-45 before:origin-left" />
      </button>
    </form>
  );
};
