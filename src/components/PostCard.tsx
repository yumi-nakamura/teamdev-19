import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

type PostCardProps = {
  post_id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  categoryName: string; // ← リレーションで取得するので必須にしても良い
};

export default function PostCard({
  post_id,
  title,
  content,
  image_path,
  created_at,
  categoryName,
}: PostCardProps) {
  const createdAtText = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
    locale: ja,
  });

  return (
    <Link
      href={`/article/${post_id}`}
      className="block bg-white rounded-lg w-75 overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        {image_path && (
          <Image src={image_path} alt={title} fill className="object-cover" />
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-blue-500">{categoryName}</span>
        </div>
        <div className="text-sm">
          <span className="mr-2 text-blue-500">Author</span>
          <span className="text-gray-500 mr-2">{createdAtText}</span>
        </div>
        <div
          className="text-base mt-3 text-gray-700 line-clamp-2"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span>{content}</span>
        </div>
      </div>
    </Link>
  );
}
