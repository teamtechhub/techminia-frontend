import React, { useEffect, useMemo, useState } from "react";
import { CenteredSection } from "./styles";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";
import { useHistory } from "react-router-dom";
import { getTopics } from "./services";
import { useAlert } from "react-alert";
import TopicListItem from "components/TopicListItem";
import { apiErrorHandler } from "utils";
import Button from "components/Button/Button";
import { NewTopicPage } from "../NewTopicPage";
import {
  CardRow,
  ForumSidebar,
  ForumCard,
  ForumCardBody,
  ForumContent,
  ForumCardHead,
} from "../styles";
import LoadingIndicator from "components/LoadingIndicator";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [nextHref, setNextHref] = useState(null);
  const [newTopicView, setNewTopicView] = useState(false);
  const [allForums, setAllForums] = useState(true);
  const history = useHistory();
  const alert = useAlert();

  const setNewTopic = (data) => {
    setTopics([...topics, data]);
  };

  useEffect(() => {
    // refresh topics from server
    getTopics()
      .then((res) => {
        setHasMoreItems(res.data.next !== null);
        setNextHref(2);
        setTopics(res.data.results);
      })
      .catch((err) => {
        alert.error(apiErrorHandler(err));
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and wait for a server response
      getTopics(nextHref)
        .then((res) => {
          setHasMoreItems(res.data.next !== null);
          setNextHref(res.data.next !== null ? nextHref + 1 : null);
          setTopics([...topics, ...res.data.results]);
        })
        .catch((err) => {
          alert.error(apiErrorHandler(err));
        });
    }
  };

  const onTopicClick = (e, slug) => {
    history.push(`/dashboard/forum/${slug}`);
  };

  let items = [];

  if (topics) {
    items = topics.map((item) => (
      <TopicListItem
        onClick={(e) => {
          onTopicClick(e, item.slug);
        }}
        key={item.slug}
        item={item}
      />
    ));
  }

  return (
    <article>
      <Helmet>
        <title>Topics List</title>
        <meta name="description" content="React comments Django topics List" />
      </Helmet>
      <ForumSidebar>
        <ForumCard>
          <ForumCardBody>
            <CardRow
              style={{
                zIndex: 2,
                margin: "auto",
                display: "block",
                padding: "10px",
                background: "#eaeaea",
                textAlign: "center",
              }}
            >
              <h4>Help Desk</h4>
              <Button
                style={{
                  borderRadius: "25px",
                  background: "#5a8dee",
                  padding: "0 10px",
                  height: "25px",
                  margin: "5px",
                }}
                title={`New Topic`}
                onClick={() => {
                  setNewTopicView(true);
                  setAllForums(false);
                  console.log("clicked newtopic");
                }}
              />
              <br />
              <Button
                style={{
                  borderRadius: "25px",
                  background: "#5a8dee",
                  padding: "0 10px",
                  height: "25px",
                  margin: "5px",
                }}
                title={`All Forums`}
                onClick={() => {
                  setNewTopicView(false);
                  setAllForums(true);
                  console.log("clicked all forums");
                }}
              />
            </CardRow>
          </ForumCardBody>
        </ForumCard>
      </ForumSidebar>
      <ForumContent>
        <ForumCard>
          <ForumCardHead>
            <CenteredSection>
              <header>All Topics</header>
            </CenteredSection>
          </ForumCardHead>
          <ForumCardBody>
            <div style={{ display: "block", padding: "10px", width: "100%" }}>
              <section>
                {useMemo(
                  () => (
                    <>
                      {newTopicView && (
                        <NewTopicPage setNewTopic={setNewTopic} />
                      )}
                      {allForums && (
                        <InfiniteScroll
                          pageStart={0}
                          loadMore={loadNextPage}
                          hasMore={hasMoreItems}
                          loader={<LoadingIndicator key={nextHref} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
                        >
                          <ul>{items}</ul>
                        </InfiniteScroll>
                      )}
                    </>
                  ),
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  [items, hasMoreItems]
                )}
              </section>
            </div>
          </ForumCardBody>
        </ForumCard>
      </ForumContent>
      <div>
        <div
          style={{
            display: "flex",
            padding: "10px",
            margin: "10px",
            width: "100%",
          }}
        ></div>
      </div>
    </article>
  );
}
