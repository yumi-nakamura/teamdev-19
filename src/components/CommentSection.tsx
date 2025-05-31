"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface Comment {
  id: number;
  user_id: string;
  post_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export const CommentSection = ({ postId }: { postId: string | number }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  // const [userId, setUserId] = useState<string | null>(null);

  // コメント取得
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });
      if (!error && data) setComments(data);
    };
    fetchComments();

    // --- リアルタイム購読 ---
    const channel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  // コメント投稿
  const handleAddComment = async () => {
    if (commentText.trim() === "") return;
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          post_id: 38,
          content: commentText,
          user_id: "aefe67ab-e521-4621-8042-08d3a09ea3f3",
        },
      ])
      .select();
    if (!error && data && data[0]) {
      setComments([data[0], ...comments]);
      setCommentText("");
    }
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
