import React from "react";
import { Img } from "react-image";
import placeholder from "./job-logo-placeholder.png";

const Placeholder = () => <img src={placeholder} alt="product img loder" />;

export default function ImageWrapper({ url, alt, className, style, id }) {
  return (
    <Img
      draggable={false}
      style={style}
      src={url}
      alt={alt}
      // loader={<Placeholder />}
      unloader={<Placeholder />}
      className={className}
    />
  );
}
