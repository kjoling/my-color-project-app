import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

export default function ColorBox(props) {
  const { name, background } = props;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <CopyToClipboard text={background} onCopy={handleCopy}>
      <div style={{ background: background }} className="ColorBox">
        <div
          style={{ background }}
          className={`copy-overlay ${copied && "show"}`}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p>{background}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">COPY</button>
        </div>
        <Link to="/" onClick={(e) => e.stopPropagation()}>
          <span className="see-more">MORE</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
