import React from "react";
import styles from "./ArticleDetail.module.css";

export const ArticleDetail = () => {
  // ダミーデータ
  const article = {
    id: 1,
    title: "Blog Title",
    content: "ダミーテキストです。ここには記事の内容を表示する予定です",
  };

  return (
    <div className={styles.container}>
      <div className={styles.articleContainer}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.authorAvatar}>
            <div className={styles.avatar} />
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.image} />
        </div>

        <div className={styles.content}>
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
