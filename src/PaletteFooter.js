import React from "react";

export default function PaletteFooter(props) {
  const { palette, colorId, singleColorPalette, multiColorPalette, emoji } =
    props;
  return (
    <div>
      <footer className="Palette-footer">
        {singleColorPalette && colorId}
        {multiColorPalette && palette.paletteName}
        <span className="emoji">
          {palette.emoji}
          {emoji}
        </span>
      </footer>
    </div>
  );
}
