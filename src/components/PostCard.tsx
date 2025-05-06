import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  post_id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
};

export default function PostCard({
  post_id,
  user_id,
  category_id,
  title,
  content,
  image_path,
  created_at,
  updated_at,
}: PostCardProps) {
  return (
    <Link
      href={`/article/${post_id}`}
      className="block bg-white rounded-lg w-75 overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        <Image src={image_path} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-blue-500">{category_id}</span>
        </div>
        <div className="text-sm">
          <span className="mr-2 text-blue-500">{user_id}</span>
          <span className=" text-gray-500 mr-2">{updated_at}</span>
          <span className=" text-gray-300">{created_at}</span>
        </div>
        <div className="text-base mt-3 text-gray-700">
          <span>{content}</span>
        </div>
      </div>
    </Link>
  );
}
