import Link from "next/link";
import Image from "next/image";

type PostCardProps = {
  id: string;
  title: string;
  author: string;
  category: string;
  publishedAt: string;
  thumbnailUrl: string;
};

export default function PostCard({
  id,
  title,
  author,
  category,
  publishedAt,
  detail,
  thumbnailUrl,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${id}`}
      className="block bg-white rounded-lg w-75 overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <div className="relative w-full h-48">
        <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <span className="text-sm text-blue-500">{category}</span>
        </div>
        <div className="text-sm">
          <span className="mr-2 text-blue-500">{author}</span>
          <span className=" text-gray-500">{publishedAt}</span>
        </div>
        <div className="text-base mt-3 text-gray-700">
          <span>{detail}</span>
        </div>
      </div>
    </Link>
  );
}
