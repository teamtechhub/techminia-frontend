/*
 * ThreadsPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import InfiniteScroll from "react-infinite-scroller";

import ThreadListItem from "components/ThreadListItem";

import { getThreads } from "./services";
import { Section, CenteredSection } from "./styles";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useAlert } from "react-alert";
import { getTopic } from "../Topics/services";
import { apiErrorHandler } from "utils";
import Button from "components/Button/Button";
import { NewThreadPage } from "../NewThreadPage";
import {
  CardRow,
  ForumSidebar,
  ForumCard,
  ForumCardBody,
  ForumContent,
  ForumCardHead,
} from "../styles";
import LoadingIndicator from "components/LoadingIndicator";

export default function ThreadsList() {
  const [threads, setThreads] = useState([]);
  const [topic, setTopic] = useState({});
  const [hasMoreItems, setHasMoreItems] = useState(false);
  const [nextHref, setNextHref] = useState(null);
  const [newThreadView, setNewThreadView] = useState(false);
  const [allThreads, setAllThreads] = useState(true);
  const history = useHistory();
  const match = useRouteMatch();
  const alert = useAlert();

  const setNewThread = (data) => {
    setThreads([...threads, data]);
  };

  useEffect(() => {
    getTopic(match.params.topicSlug)
      .then((res) => {
        setTopic(res.data);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });

    // load threads from server
    getThreads(match.params.topicSlug)
      .then((res) => {
        setHasMoreItems(res.data.next !== null);
        setNextHref(2);
        setThreads(res.data.results);
      })
      .catch((err) => {
        alert.error(`${apiErrorHandler(err)}`);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.topicSlug, match.params.topicSlug]);

  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and wait for a server response
      getThreads(match.params.topicSlug, nextHref)
        .then((res) => {
          setHasMoreItems(res.data.next !== null);
          setNextHref(res.data.next !== null ? nextHref + 1 : null);
          setThreads([...threads, ...res.data.results]);
        })
        .catch((err) => {
          alert.error(`${apiErrorHandler(err)}`);
        });
    }
  };

  const onThreadClick = (e, item) => {
    history.push(`/dashboard/${topic.slug}/${item.id}/${item.slug}`);
  };

  let items = [];

  if (threads) {
    items = threads.map((item) => (
      <ThreadListItem
        onClick={(e) => {
          onThreadClick(e, item);
        }}
        key={item.id}
        item={item}
      />
    ));
  }

  return useMemo(
    () => (
      <article>
        <Helmet>
          {/* todo add titles */}
          <title>Threads List</title>
          <meta name="description" content="React Darasa threads List" />
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
                <h5>Help Desk</h5>
                <Button
                  style={{
                    borderRadius: "25px",
                    background: "#5a8dee",
                    padding: "0 10px",
                    height: "25px",
                    margin: "5px",
                  }}
                  title={`New Thread`}
                  onClick={() => {
                    setNewThreadView(true);
                    setAllThreads(false);
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
                  title={`All Threads`}
                  onClick={() => {
                    setNewThreadView(false);
                    setAllThreads(true);
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
                <header>{topic && topic.title}</header>
              </CenteredSection>
            </ForumCardHead>
            <ForumCardBody>
              <div style={{ display: "block", padding: "10px", width: "100%" }}>
                <Section>
                  {newThreadView && (
                    <NewThreadPage setNewThread={setNewThread} />
                  )}
                  {allThreads && (
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={loadNextPage}
                      hasMore={hasMoreItems}
                      loader={<LoadingIndicator key={nextHref} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
                    >
                      <ul>{items}</ul>
                      {threads && threads.length === 0 && (
                        <h4>There are no threads to show</h4>
                      )}
                    </InfiniteScroll>
                  )}
                </Section>
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
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, hasMoreItems, threads]
  );
}
