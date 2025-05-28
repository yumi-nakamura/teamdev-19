"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchCommentsByPostId } from "../lib/fetchComments"; // パスは必要に応じて調整
import { supabase } from "../lib/supabaseClient"; // supabaseClientのパスは必要に応じて調整

interface Comment {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export const CommentSection = ({ postId }: { postId: number }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    console.log("postId", postId);
    const getComments = async () => {
      const data = await fetchCommentsByPostId(postId);
      setComments(data);
    };

    getComments();
  }, [postId]);
  const handleAddComment = async () => {
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          user_id: "6040b85b-9004-4a87-b085-3aceaa4f38ad",
          post_id: postId,
          content: commentText,
        },
      ])
      .select();

    if (error) {
      console.error("❌ 投稿失敗:", error);
      return;
    }

    setComments((prev) => [...prev, ...data]);
    setCommentText(""); // ← ここを追加してUX向上
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
