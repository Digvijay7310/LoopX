import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";

function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="px-3 py-1 ring ring-red-600 rounded-lg logo-bg"
    >
      <span className="font-semibold text-red-600 text-2xl">LoopX</span>
    </div>
  );
}

export default Logo;
