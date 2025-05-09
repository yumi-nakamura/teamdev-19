"use client";

import React from "react";
import ArticleForm, { ArticleFormData } from "@/components/ArticleForm";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export default function CreateArticlePage() {
  const router = useRouter();

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file) {
      console.warn("画像ファイルが指定されていません");
      return null;
    }

    console.log("アップロードするファイル:", file);

    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const filePath = `posts/${uniqueFileName}`; // 正しい仮想ディレクトリパス

    console.log("アップロード先ファイルパス:", filePath);

    const { error: uploadError } = await supabase.storage
      .from("my-bucket")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("画像アップロードエラー:", uploadError);
      return null;
    }

    const { data: listData, error: listError } = await supabase.storage
      .from("my-bucket")
      .list("posts", {
        search: uniqueFileName,
      });

    if (listError) {
      console.error("アップロード確認用リスト取得エラー:", listError);
    } else {
      console.log("アップロード後のファイル一覧:", listData);
    }

    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("my-bucket")
      .getPublicUrl(filePath);

    if (publicUrlError) {
      console.error("パブリックURL取得エラー:", publicUrlError);
      return null;
    }

    console.log("getPublicUrlの戻り値:", publicUrlData);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.warn("publicUrlが取得できませんでした。data内容:", publicUrlData);
      return null;
    }

    console.log("取得した画像のURL:", publicUrlData.publicUrl);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (formData: ArticleFormData) => {
    if (!formData.image) {
      alert("画像が選択されていません！");
      return;
    }

    console.log("選択された画像ファイル:", formData.image);

    try {
      const imagePath = await uploadImage(formData.image);
      console.log("アップロードされた画像URL:", imagePath);

      const postPayload: any = {
        title: formData.title,
        content: formData.content,
        category_id: formData.category_id,
      };

      if (imagePath) {
        postPayload.image_path = imagePath;
      }

      const { data: insertedData, error } = await supabase
        .from("posts")
        .insert([postPayload])
        .select();

      if (error) throw error;

      const postId = insertedData?.[0]?.id;
      if (postId) {
        router.push(`/article/${postId}`);
      } else {
        alert("記事IDの取得に失敗しました");
      }
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました");
    }
  };

  return (
    <>
      <ArticleForm onSubmit={handleSubmit} />
    </>
  );
}
