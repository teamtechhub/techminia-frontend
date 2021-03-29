import React, { useEffect, useState } from "react";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import Collapse, { Panel } from "rc-collapse";
import { Column, Frame, Content, Header, Title } from "./Students.style";
import { animated } from "react-spring";
import {
  ProfileSidebar,
  ProfileContent,
  ProfileCard,
  ProfileCardBody,
  ProfileCardHead,
} from "../Profile/Profile.style";
import { useRouteMatch } from "react-router-dom";
import { logToConsole } from "utils/logging";

function expandIcon({ isActive }) {
  return (
    <i>
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="1.494"
          viewBox="0 0 12 1.494"
        >
          <path
            data-name="_ionicons_svg_ios-remove (4)"
            d="M138.753,240H128.247a.747.747,0,0,0,0,1.494h10.506a.747.747,0,1,0,0-1.494Z"
            transform="translate(-127.5 -240)"
            fill="#21277f"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <path
            data-name="_ionicons_svg_ios-add (7)"
            d="M138.753,132.753h-4.506v-4.506a.747.747,0,1,0-1.494,0v4.506h-4.506a.747.747,0,0,0,0,1.494h4.506v4.506a.747.747,0,1,0,1.494,0v-4.506h4.506a.747.747,0,1,0,0-1.494Z"
            transform="translate(-127.5 -127.5)"
            fill="#21277f"
          />
        </svg>
      )}
    </i>
  );
}
export default function ClassView(className) {
  const match = useRouteMatch();

  const [treeItems, setTreeItems] = useState();
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState(false);
  const [cls, setCls] = useState(false);
  const addAllClasses = ["accordion"];

  useEffect(() => {
    axiosInstance
      .get(`/curriculum/class/${match.params.classID}`)
      .then((res) => {
        setCls(res.data.results);
        logToConsole(res.data.results);
      });
    axiosInstance
      .get(`/curriculum/subject/${match.params.subjectID}`)
      .then((res) => {
        setSubject(res.data.results);
        logToConsole(res.data.results);
      });
    axiosInstance
      .get(`/curriculum/session/${match.params.sessionID}`)
      .then((res) => {
        setSubject(res.data.results);
        logToConsole(res.data.results);
      });
  }, []);

  useEffect(() => {
    if (match.params.classID && match.params.subjectID) {
      axiosInstance
        .get(
          `/curriculum/syllabus/?class=${match.params.classID}&subject=${match.params.subjectID}`,
          tokenConfig()
        )
        .then((res) => {
          setTreeItems(res.data.results);
          logToConsole(res.data.results);
          setLoading(false);
        });
    }
  }, [match.params.classID, match.params.subjectID]);

  if (className) {
    addAllClasses.push(className);
  }
  return (
    <div>
      <ProfileSidebar>
        <ProfileCard>
          <Collapse
            accordion={true}
            className={addAllClasses.join(" ")}
            defaultActiveKey="active"
            expandIcon={expandIcon}
          >
            <Panel
              header={
                <h3>{subject.name ? subject.name : `selected subject`}</h3>
              }
              headerClass="accordion-title"
              key={subject.id}
            >
              <div>
                <h4>{subject.name}</h4>
                <Column
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    padding: "40px",
                    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
                    transition: "box-shadow 0.5s",
                    willChange: "transform",
                    borderRadius: "6px",
                    background:
                      "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
                  }}
                  key={subject.id}
                >
                  {treeItems
                    .filter(
                      (filteredItem) => filteredItem.subject === subject.id
                    )
                    .filter(
                      (filteredTreeItem) =>
                        filteredTreeItem.attending_teacher.id ===
                        match.params.teacherID
                    )
                    .map((treeItem, ind) => (
                      <Frame
                        style={{ borderBottom: "1px solid #e6e6e6" }}
                        depth={"parent"}
                        key={ind}
                      >
                        <Header
                          open={true}
                          depth={"parent"}
                          className={"parent"}
                        >
                          <Title
                            style={{
                              fontWeight: 700,
                              fontSize: "large",
                              color: "#fff",
                            }}
                          >
                            {treeItem.name}
                          </Title>
                        </Header>

                        <Content style={{}}>
                          <animated.div
                            style={{}}
                            children={treeItem.topics.map((topic, indx) => (
                              <Frame depth={"child"} key={indx}>
                                <Header
                                  open={true}
                                  depth={"child"}
                                  className={"child"}
                                >
                                  <Title
                                    style={{
                                      fontWeight: 300,
                                      fontSize: "large",
                                    }}
                                  >
                                    {topic.name}
                                  </Title>
                                </Header>

                                <Content style={{}}>
                                  <animated.div
                                    style={{}}
                                    children={topic.sessions.map(
                                      (session, id) => (
                                        <Frame depth={"child"} key={id}>
                                          <Header
                                            open={true}
                                            depth={"child"}
                                            className={"child"}
                                          >
                                            <Title
                                              style={{
                                                fontWeight: 200,
                                                // fontSize: "medium",
                                                color: "#fff",
                                              }}
                                            >
                                              Session {id + 1}
                                            </Title>
                                          </Header>

                                          <Content style={{}}>
                                            <animated.div
                                              style={{}}
                                              // children={}
                                            />
                                          </Content>
                                        </Frame>
                                      )
                                    )}
                                  />
                                </Content>
                              </Frame>
                            ))}
                          />
                        </Content>
                      </Frame>
                    ))}
                </Column>
              </div>
            </Panel>
          </Collapse>
        </ProfileCard>
      </ProfileSidebar>
      <ProfileContent>
        <ProfileCard>
          <ProfileCardHead className="card-topline">
            <header>Change Password</header>
          </ProfileCardHead>
          <ProfileCardBody></ProfileCardBody>
        </ProfileCard>
      </ProfileContent>
    </div>
  );
}
