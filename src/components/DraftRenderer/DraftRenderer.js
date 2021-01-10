import draftToHtml from "draftjs-to-html";
import React from "react";

const DraftRenderer = ({ content }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: draftToHtml(content),
    }}
  />
);
DraftRenderer.displayName = "DraftRenderer";
export default DraftRenderer;
