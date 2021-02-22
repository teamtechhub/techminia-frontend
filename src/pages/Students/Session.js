import React, { useContext, useEffect, useState } from "react";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import Collapse, { Panel } from "rc-collapse";
import { openModal } from "@redq/reuse-modal";
import {
  Column,
  Frame,
  Content,
  Header,
  Title,
  VideoPreview,
  Notes,
} from "./Students.style";
import { animated } from "react-spring";
import {
  ProfileSidebar,
  ProfileContent,
  ProfileCard,
  ProfileCardBody,
  ProfileCardHead,
} from "../Profile/Profile.style";
import { useHistory, useRouteMatch } from "react-router-dom";
import LoadingIndicator from "components/LoadingIndicator";
import DraftRenderer from "components/DraftRenderer/DraftRenderer";
import Button from "components/Button/Button";
import Video from "components/Video/Video";
import ThreadPage from "containers/Forums/Thread";
import { slugify } from "utils";
import EditDeleteSession from "./editDeleteSession";
import { AuthContext } from "contexts/auth/auth.context";
import { Btn } from "pages/Dashboard/Dashboard.style";
import PaymentModal from "components/PaymentModal";

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
export default function Session({ className, view }) {
  const match = useRouteMatch();
  const history = useHistory();
  const {
    authState: { profile },
  } = useContext(AuthContext);

  const [treeItems, setTreeItems] = useState(false);
  const [subject, setSubject] = useState(false);
  const [cls, setCls] = useState(false);
  const [teacher, setTeacher] = useState(false);
  const [session, setSession] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const [topic, setTopic] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(false);
  const [edit, setEdit] = useState(false);
  const addAllClasses = ["accordion"];
  console.log(reload);

  const btns = [
    { title: "Notes" },
    { title: "Comments" },
    // { title: "Files" }
  ];

  const clsID = match.params.classID;
  const SubID = match.params.subjectID;
  const taID = match.params.teacherID;
  const tpcID = match.params.topicID;
  const sessID = match.params.sessionID;

  useEffect(() => {
    setLoading(true);
    setReload(true);
    // new Promise((resolve) => setTimeout(resolve, 3000));
    setTimeout(async () => {
      if (clsID) {
        await axiosInstance
          .get(`/curriculum/class/${match.params.classID}`, tokenConfig())
          .then((res) => {
            setCls(res.data);
            console.log(res.data);
          });
      }
      if (taID) {
        await axiosInstance
          .get(`/account/teachers/${match.params.teacherID}`, tokenConfig())
          .then((res) => {
            setTeacher(res.data);
            console.log(res.data);
          });
      }
      if (SubID) {
        await axiosInstance
          .get(`/curriculum/subject/${match.params.subjectID}`, tokenConfig())
          .then((res) => {
            setSubject(res.data);
            console.log(res.data);
          });
      }
      if (tpcID) {
        await axiosInstance
          .get(`/curriculum/topic/${match.params.topicID}`, tokenConfig())
          .then((res) => {
            setTopic(res.data);
            console.log(res.data);
          });
      }

      if (sessID) {
        await axiosInstance
          .get(`/curriculum/session/${match.params.sessionID}`, tokenConfig())
          .then((res) => {
            setSession(res.data);
            console.log(res.data);
          });
      }
      if (clsID && SubID) {
        await axiosInstance
          .get(
            `/curriculum/syllabus/?class=${match.params.classID}&subject=${match.params.subjectID}`,
            tokenConfig()
          )
          .then((res) => {
            setTreeItems(res.data.results);
            console.log(res.data.results);
          });
      }
      if (view === "subject" && treeItems) {
        await axiosInstance
          .get(`account/teachers/`, tokenConfig())
          .then((res) => {
            setTeacher(res.data.results);
            console.log("====== tree items ====", treeItems);
            setSelectedTeacher(
              res.data.results.filter((filteredTeacher) =>
                treeItems.find(
                  (a) => a.attending_teacher.id === filteredTeacher.id
                )
              )[0]
            );
            console.log(res.data.results);
          });
      }
      setLoading(false);
      setReload(false);
    }, 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    match.params.classID,
    match.params.subjectID,
    match.params.teacherID,
    match.params.topicID,
    match.params.sessionID,
    // reload,
  ]);

  const onSelectSession = (sess, topic) => {
    setReload(true);
    if (view === "subject") {
      history.push(
        `/dashboard/classes/${clsID}/${SubID}/${selectedTeacher.id}/${topic.id}/${sess.id}`
      );
    } else {
      history.push(
        `/dashboard/classes/${clsID}/${SubID}/${taID}/${tpcID}/${sess.id}`
      );
    }
    setReload(false);
  };

  useEffect(() => {}, [match.params.classID, match.params.subjectID]);

  if (className) {
    addAllClasses.push(className);
  }

  const handleModal = () => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: PaymentModal,
      closeComponent: "",

      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  if (!treeItems && !cls && !subject && !teacher && loading) {
    return <LoadingIndicator />;
  }
  // if (reload) {
  //   return <LoadingIndicator />;
  // }
  let topicSlug = null;
  if (cls && subject) {
    topicSlug = slugify(subject.name + " " + cls.name);
  }
  return (
    <div
      style={
        profile.is_teacher
          ? {}
          : profile.subscription &&
            profile.subscription.state.toString() === "1"
          ? {}
          : { pointerEvents: "none", cursor: "help" }
      }
      onClick={
        profile.is_student &&
        profile.subscription &&
        profile.subscription.state.toString() === "1"
          ? null
          : handleModal
      }
    >
      {edit ? (
        <EditDeleteSession session={session} setEdit={setEdit} />
      ) : (
        <>
          <ProfileSidebar>
            <ProfileCard>
              <Collapse
                accordion={true}
                className={addAllClasses.join(" ")}
                defaultActiveKey="active"
                expandIcon={expandIcon}
                style={{ background: "#fff" }}
              >
                {subject && (
                  <Panel
                    header={
                      <h6
                        style={{
                          fontWeight: 500,
                          color: "#652e8d",
                          textTransform: "uppercase",
                          margin: "0 10px",
                        }}
                      >
                        {`Table of Contents - ${
                          subject.name ? subject.name : null
                        }`}
                      </h6>
                    }
                    headerClass="accordion-title card-topline"
                  >
                    <div>
                      {view === "subject" ? (
                        <>
                          <p>select teacher</p>
                          {teacher &&
                            teacher
                              .filter((filteredTeacher) =>
                                treeItems.find(
                                  (a) =>
                                    a.attending_teacher.id ===
                                    filteredTeacher.id
                                )
                              )
                              .map((tchr, i) => (
                                <Button
                                  key={i}
                                  size="small"
                                  onClick={() => setSelectedTeacher(tchr)}
                                  title={tchr.name}
                                  style={{
                                    padding: "2px",
                                    fontSize: "13px",
                                    height: "auto",
                                    margin: "5px",
                                  }}
                                />
                              ))}
                        </>
                      ) : null}
                      <Column
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          padding: "20px",
                          boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
                          transition: "box-shadow 0.5s",
                          willChange: "transform",
                          borderRadius: "6px",
                          background: "#652e8d",
                        }}
                        key={subject.id}
                      >
                        {treeItems &&
                          treeItems
                            .filter(
                              (filteredItem) =>
                                filteredItem.subject === subject.id
                            )
                            .filter(
                              (filteredTreeItem) =>
                                `${
                                  view === "subject"
                                    ? selectedTeacher.id
                                    : match.params.teacherID
                                }` ===
                                filteredTreeItem.attending_teacher.id.toString()
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
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {treeItem.name}
                                  </Title>
                                </Header>

                                <Content style={{}}>
                                  <animated.div
                                    children={treeItem.topics.map(
                                      (topic, indx) => (
                                        <Frame
                                          style={{ background: "transparent" }}
                                          depth={"child"}
                                          key={indx}
                                        >
                                          <Header
                                            open={true}
                                            depth={"child"}
                                            className={"child"}
                                          >
                                            <Title
                                              style={{
                                                fontWeight: 300,
                                                fontSize: "large",
                                                color: "#fff",
                                                textDecoration:
                                                  view === "topic"
                                                    ? tpcID ===
                                                      topic.id.toString()
                                                      ? "line-through"
                                                      : "none"
                                                    : "none",
                                              }}
                                            >
                                              {indx + 1}. {topic.name}
                                            </Title>
                                          </Header>

                                          <Content style={{}}>
                                            <animated.div
                                              style={{}}
                                              children={topic.sessions.map(
                                                (session, id) => (
                                                  <Frame
                                                    style={{
                                                      background: "transparent",
                                                    }}
                                                    depth={"child"}
                                                    key={id}
                                                  >
                                                    <Header
                                                      open={true}
                                                      depth={"child"}
                                                      className={"child"}
                                                    >
                                                      <Title
                                                        onClick={() =>
                                                          onSelectSession(
                                                            session,
                                                            topic
                                                          )
                                                        }
                                                        style={{
                                                          fontWeight: 200,
                                                          textDecoration:
                                                            sessID ===
                                                            session.id.toString()
                                                              ? "line-through"
                                                              : "none",
                                                          color: "#fff",
                                                        }}
                                                      >
                                                        <span>● </span>
                                                        {session.name ? (
                                                          session.name
                                                        ) : (
                                                          <>Session {id + 1}</>
                                                        )}
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
                                      )
                                    )}
                                  />
                                </Content>
                              </Frame>
                            ))}
                      </Column>
                    </div>
                  </Panel>
                )}
              </Collapse>
            </ProfileCard>
          </ProfileSidebar>
          {session && view !== "topic" && view !== "subject" && (
            <>
              <ProfileContent>
                <ProfileCard>
                  <ProfileCardHead className="card-topline">
                    <header>
                      {subject.name} ~ {cls.name} by {teacher.name}
                    </header>
                    {profile.is_teacher &&
                    profile.extended_profile.id === teacher.id ? (
                      <Btn
                        style={{
                          background: "#ef592b",
                          margin: "5px",
                          height: "25px",
                          padding: "0 10px",
                        }}
                        onClick={() => setEdit(true)}
                        title="Edit Lesson"
                      />
                    ) : null}
                  </ProfileCardHead>
                  <ProfileCardBody>
                    {/* <img src={session.video_url} alt="tuition" /> */}
                    <Video url={session.video_url} playercontrols={false} />
                  </ProfileCardBody>
                </ProfileCard>
              </ProfileContent>
              <ProfileContent>
                <ProfileCard>
                  {session && (
                    <>
                      <ProfileCardHead className="card-topline">
                        <header>
                          {btns.map((item, p) => (
                            <Button
                              key={p}
                              onClick={() => {
                                setActiveButton(item.title);
                              }}
                              title={`${item.title}`}
                              style={{
                                backgroundColor:
                                  activeButton === item.title
                                    ? "#652e8d"
                                    : "#000",
                                padding: "2px",
                                fontSize: "13px",
                                height: "auto",
                                margin: "5px",
                                textTransform: "lowercase",
                              }}
                            />
                          ))}
                        </header>
                      </ProfileCardHead>
                      {activeButton === "Comments" && cls && subject && (
                        <>
                          {session.forum && (
                            <ThreadPage
                              minimal={true}
                              tpcslg={topicSlug}
                              thID={session.forum}
                            />
                          )}
                        </>
                      )}
                      {activeButton === "Notes" && (
                        <ProfileCardBody>
                          <div style={{ textAlign: "center" }}>
                            <span>Class Notes prepared by {teacher.name}</span>
                          </div>

                          <Notes>
                            <DraftRenderer content={session.notes} />
                          </Notes>
                        </ProfileCardBody>
                      )}
                      {/* {activeButton === "Files" && (
                    <ProfileCardBody>Some Docs</ProfileCardBody>
                  )} */}
                    </>
                  )}
                </ProfileCard>
              </ProfileContent>
            </>
          )}
          {view === "subject" && (
            <ProfileContent>
              <ProfileCard>
                <ProfileCardHead className="card-topline">
                  <header>{subject.name}</header>
                </ProfileCardHead>
                <ProfileCardBody>
                  <VideoPreview style={{ color: "#fff" }}>
                    <img
                      src={subject.background_image}
                      alt={subject.background_image_alt}
                    />
                  </VideoPreview>
                </ProfileCardBody>
              </ProfileCard>
            </ProfileContent>
          )}
          {view === "topic" && (
            <ProfileContent>
              <ProfileCard>
                <ProfileCardHead className="card-topline">
                  <header>{topic.name}</header>
                </ProfileCardHead>
                <ProfileCardBody>
                  <VideoPreview style={{ color: "#fff" }}>
                    <img
                      src={topic.background_image}
                      alt={topic.background_image_alt}
                    />
                  </VideoPreview>
                </ProfileCardBody>
              </ProfileCard>
            </ProfileContent>
          )}
        </>
      )}
    </div>
  );
}
