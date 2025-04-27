"use client";
import React, { FC, useState } from "react";

type Props = {
  totalPages: number;
  onPageChange?: (page: number) => void;
};

const Pagination: FC<Props> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  // 左右ボタン用スタイル（枠線を透明に）
  const edgeBtnStyle: React.CSSProperties = {
    minWidth: 32,
    height: 32,
    border: "1px solid transparent",
    backgroundColor: "#fff",
    cursor: "pointer",
    opacity: 1,
    fontWeight: "bold",
  };

  // 中央のページ番号用スタイル
  const pageBtnStyle = (active: boolean): React.CSSProperties => ({
    width: 32,
    height: 32,
    margin: "0 4px",
    borderRadius: "50%",
    border: active ? "2px solid #333" : "1px solid #ccc",
    backgroundColor: active ? "#333" : "#fff",
    color: active ? "#fff" : "#000",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* ←Previous Page */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        style={{
          ...edgeBtnStyle,
          opacity: currentPage === 1 ? 0.5 : 1,
          justifySelf: "start", // 左端に寄せる
        }}
      >
        ← Previous Page
      </button>

      {/* ページ番号群を中央揃え */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            style={pageBtnStyle(page === currentPage)}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Page→ */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        style={{
          ...edgeBtnStyle,
          opacity: currentPage === totalPages ? 0.5 : 1,
          justifySelf: "end", // 右端に寄せる
        }}
      >
        Next Page →
      </button>
    </div>
  );
};

export default Pagination;
