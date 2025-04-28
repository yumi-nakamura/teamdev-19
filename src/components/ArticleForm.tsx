"use client";

import React, { useState, useRef } from "react";

// 記事フォームで扱うデータの型定義
export interface ArticleFormData {
  title: string; // 記事のタイトル
  content: string; // 記事の本文内容
  category_id: string; // カテゴリーID
  image: File | null; // アップロードされた画像ファイル
}

// コンポーネントに渡されるプロパティの型定義
interface ArticleFormProps {
  onSubmit: (formData: ArticleFormData) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit }) => {
  // フォームの状態を管理
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    category_id: "",
    image: null,
  });

  // 隠れた画像アップロード用の要素を操作するための参照
  const fileInputRef = useRef<HTMLInputElement>(null);

  // アップロードされた画像をプレビュー表示するためのデータを保存する変数
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // テキスト入力やセレクトボックスの値が変わったときに実行される関数
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    // 入力された値だけを更新し、他の入力内容はそのまま残す
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ユーザーが画像を選択したときに実行される関数
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // フォームデータに選択された画像ファイルを保存
      setFormData((prev) => ({ ...prev, image: file }));

      // 画像ファイルをブラウザで表示できる形式に変換してプレビューに使用
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // フォーム送信ボタンがクリックされたときに実行される関数
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページのリロードを防止
    onSubmit(formData); // 入力データを親コンポーネントに渡す
  };

  // 画像選択ダイアログを表示する関数
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form onSubmit={handleSubmit}>
        {/* タイトル入力部分 */}
        <div className="mb-8">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="ブログタイトルを入力"
            className="text-4xl font-bold border-none outline-none w-full"
            required
          />
          {/* タイトル下の区切り線 */}
          <div className="h-0.5 w-full bg-gray-100 mt-2"></div>
        </div>

        {/* 画像アップロード部分 */}
        <div className="mb-8">
          <div
            onClick={triggerFileInput}
            className={`
              border-2 border-dashed border-gray-300 rounded-lg 
              h-64 flex flex-col items-center justify-center
              cursor-pointer
              ${imagePreview ? "" : "hover:bg-gray-50"}
            `}
            // 画像がアップロードされていれば、その画像をバックグラウンドに表示
            style={
              imagePreview
                ? {
                    backgroundImage: `url(${imagePreview})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {/* 画像がない場合のみ、アップロードアイコンとボタンを表示 */}
            {!imagePreview && (
              <>
                {/* 上向き矢印のSVGアイコン */}
                <svg
                  className="w-12 h-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                {/* アップロードボタン */}
                <button
                  type="button"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full"
                >
                  Upload Image
                </button>
              </>
            )}
            {/* 実際のファイル入力要素（非表示） */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* カテゴリ選択部分 */}
        <div className="mb-8 flex justify-end items-center">
          <label className="text-gray-600 mr-2">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 bg-white"
            required
          >
            <option value="">Value</option>
            <option value="1">Technology</option>
          </select>
        </div>

        {/* 記事内容入力部分 */}
        <div className="mb-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here..."
              className="w-full bg-transparent border-none outline-none resize-none min-h-[150px]"
              required
            />
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
