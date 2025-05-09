'use client';
import React, { useState } from "react";

interface Comment {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export const CommentSection = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    setComments([
      ...comments,
      {
        id: Math.floor(Math.random() * 1000) + 1, // ランダムにIDを割り振る（バックエンド作成後は消す）
        user_id: "abcdefg", // バックエンド作成後は消す
        post_id: 1, // バックエンド作成後は消す
        content: commentText,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    setCommentText(""); // コメント追加後に入力欄をクリア
  };

  return (
    <section className="max-w-[771px] mx-auto mt-8 p-4">
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Your Comment..."
          className="flex-grow p-2 border border-gray-300 rounded text-center"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-2 rounded border-none cursor-pointer"
        >
          Comment
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-2 items-start p-3 bg-gray-100 rounded-lg"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center text-2xl text-gray-700 select-none font-[\'Material_Symbols_Outlined\']">
                <span>f</span> {/* 仮アバター */}
              </div>
              <div className="text-xs text-gray-500">user</div>
            </div>
            <div>
              <p className="text-sm m-0">{comment.content}</p>
              <span className="text-xs text-[#18A0FB80] mt-1 block">
                a min ago
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
