import React from "react";
import { useAppState } from "contexts/app/app.provider";
import Post from "./Post";
import View from "./View";
import Manage from "./Manage";

export default function Controller({ type, name, isBusiness, isIndividual }) {
  let RenderView;

  if (useAppState("currentForm") === "post") {
    RenderView = (
      <Post
        type={type}
        name={name}
        isBusiness={isBusiness}
        isIndividual={isIndividual}
      />
    );
  }
  if (useAppState("currentForm") === "view") {
    RenderView = (
      <View
        type={type}
        name={name}
        isBusiness={isBusiness}
        isIndividual={isIndividual}
      />
    );
  }
  if (useAppState("currentForm") === "manage") {
    RenderView = (
      <Manage
        type={type}
        name={name}
        isBusiness={isBusiness}
        isIndividual={isIndividual}
      />
    );
  }

  return <RenderView />;
}
