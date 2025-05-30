/**
 * 記事削除ボタン
 * - 削除処理とUI表示を1つのコンポーネントに集約
 * - シンプルで再利用可能
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  articleId: string;
  ownerId: string;
  currentUserId: string | undefined;
};

export default function ArticleDeleteButton({
  articleId,
  ownerId,
  currentUserId,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // 本人以外は表示しない
  if (!currentUserId || currentUserId !== ownerId) return null;

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    setIsDeleting(true);
    const { error } = await supabase.from("posts").delete().eq("id", articleId);
    setIsDeleting(false);

    if (error) {
      alert("削除に失敗しました: " + error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? "削除中..." : "削除"}
    </button>
  );
}
