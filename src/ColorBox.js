import React, { useState } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import SingleColorPalette from "./SingleColorPalette";
import { css } from "@emotion/css";

export default function ColorBox(props) {
  const { name, background, moreUrl, showLink, level } = props;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isDarkColor = level > 600;
  const isLightColor = level <= 400;

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
            <span
              className={
                isDarkColor
                  ? css`
                      ${styles.lightText}
                    `
                  : undefined
              }
            >
              {name}
            </span>
          </div>
          <button
            className={`copy-button ${
              isLightColor &&
              css`
                ${styles["dark-text"]}
              `
            }`}
          >
            COPY
          </button>
        </div>
        {showLink && (
          <Link
            to={moreUrl}
            onClick={(e) => e.stopPropagation()}
            element={<SingleColorPalette level={level} />}
          >
            <span
              className={
                isLightColor
                  ? seeMore +
                    css`
                      ${styles["dark-text"]}
                    `
                  : seeMore +
                    css`
                      ${styles.lightText}
                    `
              }
            >
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

const seeMore = "see-more ";

const styles = {
  lightText: {
    color: "white",
    borderRadius: "5px",
  },
  "dark-text": {
    color: "black",
    borderRadius: "5px",
  },
};
