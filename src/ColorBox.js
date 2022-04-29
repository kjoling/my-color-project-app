import React from "react";
import "./ColorBox.css";

export default function ColorBox(props) {
  const { name, background } = props;
  return (
    <div style={{ background: background }} className="ColorBox">
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <button className="copy-button">COPY</button>
      </div>
      <span className="see-more">MORE</span>
    </div>
  );
}
