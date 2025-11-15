import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";

function Logo() {
  const navigate = useNavigate();

  return (
    <h1
      onClick={() => navigate("/")}
      className="loopx-logo"
    >
      <span className="font-medium">LoopX</span>
    </h1>
  );
}

export default Logo;
