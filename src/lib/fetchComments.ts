import { supabase } from "./supabaseClient";

export const fetchCommentsByPostId = async (postId: number) => {
  // postId のログを出す
  console.log("📌 fetchCommentsByPostId: postId =", postId);

  if (isNaN(postId)) {
    console.error("⚠ 無効な postId（NaN）:", postId);
    return [];
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ コメント取得エラー:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return [];
  }

  console.log("✅ コメント取得成功:", data);
  return data;
};
