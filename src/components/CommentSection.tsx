import React, { useState } from "react";

const sectionStyle: React.CSSProperties = {
  maxWidth: "771px",
  margin: "32px auto",
  padding: "16px",
};

const inputRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginTop: "16px",
};

const inputStyle: React.CSSProperties = {
  flexGrow: 1,
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  textAlign: "center",
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#3b82f6",
  color: "white",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
};

const commentListStyle: React.CSSProperties = {
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const commentItemStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  alignItems: "flex-start",
  padding: "12px",
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
};

const commentAvatarContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
};

const commentAvatarStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  backgroundColor: "#d1d5db",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  color: "#374151",
  fontFamily: "'Material Symbols Outlined'",
  userSelect: "none",
};

const usernameStyle: React.CSSProperties = {
  fontSize: "10px",
  color: "#6b7280",
};

const commentTextStyle: React.CSSProperties = {
  fontSize: "14px",
  margin: 0,
};

const commentTimestampStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#18A0FB80",
  marginTop: "4px",
};

export const CommentSection = () => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <section style={sectionStyle}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
        Comments
      </h2>
      <div style={inputRowStyle}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Your Comment..."
          style={inputStyle}
        />
        <button onClick={handleAddComment} style={buttonStyle}>
          Comment
        </button>
      </div>

      <div style={commentListStyle}>
        {comments.map((comment, index) => (
          <div key={index} style={commentItemStyle}>
            <div style={commentAvatarContainerStyle}>
              <div style={commentAvatarStyle}>
                <span className="material-symbols-outlined">f</span>
              </div>
              <div style={usernameStyle}>user</div>
            </div>
            <div>
              <p style={commentTextStyle}>{comment}</p>
              <span style={commentTimestampStyle}>a min ago</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

