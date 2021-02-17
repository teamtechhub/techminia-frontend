import React from "react";
import { useRouteMatch } from "react-router-dom";
import ThreadPage from "./Thread";
import ThreadsList from "./Threads";
import Topics from "./Topics";
import { ImageHeader } from "./styles";
import tuit from "images/tuit.png";

export default function Forums() {
  const match = useRouteMatch();

  return (
    <div>
      <ImageHeader
        style={{
          backgroundImage: `url(${tuit})`,
        }}
      />

      {match.params.topicSlug ? (
        match.params.threadId ? (
          <ThreadPage />
        ) : (
          <ThreadsList />
        )
      ) : (
        <Topics />
      )}
    </div>
  );
}
