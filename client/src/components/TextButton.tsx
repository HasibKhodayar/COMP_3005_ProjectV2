import React, { MouseEventHandler } from "react";

interface TextButtonProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const TextButton: React.FC<TextButtonProps> = ({ onClick, children }) => {
  return (
    <div
      style={{
        cursor: "pointer",
        textDecoration: "underline",
        color: "blue",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default TextButton;
