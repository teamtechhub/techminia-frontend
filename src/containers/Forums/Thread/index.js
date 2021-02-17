/*
 * ThreadPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";
import { openModal, closeModal } from "@redq/reuse-modal";

import { CenteredSection, Section } from "./styles";

import { Post } from "components/Comment/post";
import { RootPost } from "components/Comment/rootPost";
import { useRouteMatch } from "react-router-dom";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "containers/Authentication/Form";
import {
  getPosts,
  getThread,
  votePostCall,
  deletePostCall,
  updatePostCall,
  newPostCall,
} from "./services";
import { apiErrorHandler } from "utils";
import { getTopic } from "../Topics/services";
import { useAlert } from "react-alert";

export default function ThreadPage({
  tpcslg,
  thID,
  minimal = false,
  anonAsUserObject = false,
}) {
  console.log(tpcslg);
  console.log(thID);
  const {
    authState: { isAuthenticated, profile },
    authDispatch,
  } = useContext(AuthContext);
  const alert = useAlert();
  const match = useRouteMatch();

  const [posts, setPosts] = useState([]); // posts list loaded in a client side
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [nextHref, setNextHref] = useState(null);
  const [threadId] = useState(thID ? thID : match.params.threadId);
  const [topicSlug] = useState(tpcslg ? tpcslg : match.params.topicSlug);
  const [thread, setThread] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);
  const [postsList, setPostsList] = useState(null);
  const [topic, setTopic] = useState(null);
  const [newPost, setNewPost] = useState(null);
  const [deletedPost, setDeletedPost] = useState(null);

  // post was updated from server
  useEffect(() => {
    if (updatedPost) {
      setPosts(
        posts.map((item) => {
          if (updatedPost.uid === item.uid) {
            return updatedPost;
          }
          return item;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedPost]);

  useEffect(() => {
    if (!isAuthenticated) {
      authDispatch({
        type: "login",
      });
      openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: false,
        component: AuthenticationForm,
        componentProps: { closeModal },
        closeComponent: "div",
        config: {
          enableResizing: false,
          disableDragging: true,
          className: "quick-view-modal",
          width: 458,
          height: "auto",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // loaded as Component / threadId changed
    if (threadId) {
      getPosts(threadId)
        .then((res) => {
          setPosts(res.data.results);
          setPostsList(res.data);
        })
        .catch((err) => {
          alert.error(apiErrorHandler(err));
        });
    }
    return () => {
      // clear topics list berfore threadId
      clearThread();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  const clearThread = () => {
    setHasMoreItems(false);
    setPosts([]);
  };

  useEffect(() => {
    if (match) {
      // loaded as SPA
      if (!topic) {
        getTopic(topicSlug)
          .then((res) => {
            setTopic(res.data);
          })
          .catch((err) => {
            alert.error(apiErrorHandler(err));
          });
      }
      // load thread from server
      getThread(threadId)
        .then((res) => {
          setThread(res.data);
        })
        .catch((err) => {
          alert.error(apiErrorHandler(err));
        });

      // load posts of thread from server
      getPosts(threadId)
        .then((res) => {
          setPosts(res.data.results);
          setPostsList(res.data);
        })
        .catch((err) => {
          alert.error(apiErrorHandler(err));
        });
    }

    // reset on unmount
    return () => {
      clearThread();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function mergeUnique(a, b, prop) {
      const reduced = a.filter(
        (aItem) => !b.find((bItem) => aItem[prop] === bItem[prop])
      );
      return reduced.concat(b);
    }

    if (postsList) {
      // remove existing comments
      setPosts(
        mergeUnique(posts, postsList.results, "uid")
        // [...posts, ...postsList.results]
      );
      setHasMoreItems(Boolean(postsList.next));
      setNextHref(postsList.next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postsList]);

  useEffect(() => {
    // loaded as Component / threadId changed
    if (threadId) {
      getPosts(threadId)
        .then((res) => {
          setPosts(res.data.results);
        })
        .catch((err) => {
          alert.error(`${apiErrorHandler(err)}`);
        });
    }
    return () => {
      // clear topics list berfore threadId
      clearThread();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  useEffect(() => {
    // find parent in posts and append
    if (newPost) {
      // find last index with
      const parentIndex = posts.findIndex((x) => x.uid === newPost.parent);
      const postsCopy = [...posts];
      postsCopy.splice(parentIndex + 1, 0, newPost);
      setPosts(postsCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPost]);

  useEffect(() => {
    if (deletedPost) {
      // setPosts(posts.filter(item => deletedPost.uid !== item.uid)) //  remove deleted post
      setPosts(
        posts.map((item) => {
          if (deletedPost.uid === item.uid) {
            return deletedPost;
          }
          return item;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedPost]);

  const handleAddSubmit = (args) => {
    newPostCall(args)
      .then((res) => {
        console.log(res.data);
        setNewPost(res.data);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  const handleUpdateSubmit = (args) => {
    updatePostCall(args)
      .then((res) => {
        setUpdatedPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  const handleDeleteSubmit = (args) => {
    deletePostCall(args)
      .then((res) => {
        setDeletedPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  const handleVote = (...args) => {
    votePostCall(...args)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });
  };

  // let comments = []
  let rootComment = null;

  if (posts.length > 0) {
    rootComment = (
      <RootPost
        post={posts[0]}
        onSubmitReplay={handleAddSubmit}
        onSubmitEdit={handleUpdateSubmit}
        currentProfile={profile}
        changePostVote={(...args) => {
          handleVote(...args);
        }}
        onDelete={handleDeleteSubmit}
        showReplyFormOnly={Boolean(threadId ? true : false)}
      />
    );
  }

  const renderPost = (post, onSubmitReplay, onSubmitEdit, onSubmitDelete) => {
    const widthRem = `${post.level}rem`;

    if (post.level === 0) {
      return null;
    }

    return (
      <div key={post.uid} style={{ paddingLeft: widthRem }}>
        <div
          style={{
            width: widthRem,
            // display: "inline-block",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* TODO: add threadline if needed */}
        </div>
        <div style={{ position: "relative" }}>
          {/* TODO: add react memo effect */}
          <Post
            post={post}
            onSubmitReplay={onSubmitReplay}
            onSubmitEdit={onSubmitEdit}
            currentProfile={profile}
            changePostVote={(...args) => {
              handleVote(...args);
            }}
            onDelete={onSubmitDelete}
          />
        </div>
      </div>
    );
  };

  // load next page comments
  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and waiting for a server response
      setHasMoreItems(Boolean(false));
      getPosts(threadId || match.params.threadId, nextHref);
    }
  };

  // all pages comments / todo check for performance
  const comments = posts
    .filter(function (item) {
      if (item.level === 0) {
        return false;
      }
      return true;
    })
    .map((item) =>
      renderPost(item, handleAddSubmit, handleUpdateSubmit, handleDeleteSubmit)
    );

  return (
    <article style={{ background: "#f2f2f2" }}>
      {thread && (
        <Helmet>
          {/* TODO add titles */}
          <title>Darasa {thread.title} Thread</title>
          <meta
            name="description"
            content={`Darasa ${thread && thread.title} Thread`}
          />
        </Helmet>
      )}
      <div>
        {minimal ? null : (
          <CenteredSection>
            <h2>{thread && thread.title} posts</h2>
          </CenteredSection>
        )}{" "}
        {/* root post */}
        {rootComment}
        <Section>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={hasMoreItems}
          >
            {comments}
            {postsList && postsList.count === 0 && (
              <h4>There are no comments to show</h4>
            )}
          </InfiniteScroll>
        </Section>
      </div>
    </article>
  );
}