import React, { useContext, useEffect, useState } from "react";
import {
  // Col1,
  Col2,
  CourseTitle,
  Instructor,
  MGrid,
  Video,
  VideoPreview,
  // VideoTeachers,
  VideoText,
  WatchButton,
  Wrapper,
} from "pages/LandingPage/VideoCarousel.style";
import Button from "components/Button/Button";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import { CardWrapper, Row } from "pages/Students/Students.style";
import LoadingIndicator from "components/LoadingIndicator";
import { useHistory } from "react-router-dom";
import { openModal } from "@redq/reuse-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoCast from "components/Video/Video";
import PaymentModal from "components/PaymentModal";
import { AuthContext } from "contexts/auth/auth.context";
import { faPlayCircle } from "@fortawesome/fontawesome-free-solid";

export default function StudentDashboard() {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const history = useHistory();
  const [classes, setClasses] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Form");
  const [selectedClass, setSelectedClass] = useState(false);
  const [selectedSession, setSelectedSession] = useState(false);
  const [subjects, setSubjects] = useState(false);
  const [treeItems, setTreeItems] = useState();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const [videoCount, setVideoCount] = useState(0);

  console.log(selectedTeacher);

  const titles = [
    { title: "Year" },
    { title: "Class" },
    { title: "Grade" },
    { title: "Form" },
  ];
  useEffect(() => {
    axiosInstance.get(`/curriculum/class/`).then((res) => {
      setClasses(res.data.results);
    });
    axiosInstance.get(`/curriculum/subject/`).then((res) => {
      setSubjects(res.data.results);
    });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      axiosInstance
        .get(`/curriculum/syllabus/?class=${selectedClass.id}`, tokenConfig())
        .then(async (res) => {
          await setTreeItems(res.data.results);
          await new Promise((resolve) => setTimeout(resolve, 1000));

          console.log(res.data.results);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClass]);

  useEffect(() => {
    if (treeItems) {
      axiosInstance.get(`account/teachers/`, tokenConfig()).then((res) => {
        setTeachers(res.data.results);
        console.log("====== tree items ====", treeItems);
        setSelectedTeacher(
          res.data.results.filter((filteredTeacher) =>
            treeItems.find((a) => a.attending_teacher.id === filteredTeacher.id)
          )[0]
        );
        console.log("============", selectedTeacher);
        console.log(res.data.results);
        setLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeItems]);

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

  const redirectSession = (session, topic, subject) => {
    // handleModal();
    history.push(
      `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
    );
  };
  console.log(selectedSession);
  console.log(selectedSession.length);

  const onSelectSession = (session, topic, subject) => {
    // console.log(videoCount);
    // handleModal();
    if (videoCount === 0) {
      setVideoCount(videoCount + 1);
      setSelectedSession(session);
    } else {
      if (selectedSession.id !== session.id) {
        if (profile.is_student) {
          if (profile.subscription !== null) {
            if (profile.subscription.state.toString() === "1") {
              history.push(
                `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
              );
            } else {
              console.log("handlemodal");
              handleModal();
            }
          } else {
            console.log("handlemodal");
            handleModal();
          }
        }
      } else if (profile.is_student) {
        if (profile.subscription !== null) {
          if (profile.subscription.state.toString() === "1") {
            history.push(
              `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
            );
          } else {
            console.log("handlemodal");
            handleModal();
          }
        } else {
          console.log("handlemodal");
          handleModal();
        }
      }
    }
  };

  if (classes === false) {
    <LoadingIndicator />;
  }

  return (
    <>
      <CardWrapper>
        {titles.map((item, xedni) => (
          <Button
            key={xedni}
            onClick={() => {
              setSelectedTitle(item.title);
            }}
            title={`${item.title}`}
            style={{
              backgroundColor:
                selectedTitle === item.title ? "#652e8d" : "#000",
              borderRadius: "20px",
              margin: "5px",
            }}
          />
        ))}
        <br />
        {classes &&
          selectedTitle &&
          classes
            .filter((filteredClass) => filteredClass.title === selectedTitle)
            .map((cls, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  setSelectedClass(cls);
                  setLoading(true);
                }}
                style={{
                  borderRadius: "20px",
                  backgroundColor: selectedClass
                    ? selectedClass.name === cls.name
                      ? "#ec7623"
                      : "#000"
                    : "#ec7623",
                  margin: "5px",
                }}
                title={`${cls.name}`}
              />
            ))}
      </CardWrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {subjects &&
            treeItems &&
            selectedClass &&
            subjects
              .filter((filteredSubject) =>
                treeItems
                  .reduce((arr, b) => {
                    arr.push(b.subject);
                    return arr;
                  }, [])
                  .includes(filteredSubject.id)
              )
              .map((item, index) => (
                <div key={index}>
                  <h4>{item.name}</h4>

                  <p>select teacher</p>
                  {teachers &&
                    teachers
                      .filter((filteredTeacher) =>
                        treeItems.find(
                          (a) => a.attending_teacher.id === filteredTeacher.id
                        )
                      )
                      .map((teacher, i) => (
                        <Button
                          key={i}
                          size="small"
                          onClick={() => setSelectedTeacher(teacher)}
                          title={teacher.name.replace("Mr.", "")}
                          style={{
                            padding: "2px",
                            fontSize: "13px",
                            height: "auto",
                            margin: "5px",
                          }}
                        />
                      ))}

                  <Wrapper style={{ maxWidth: "100%" }}>
                    {treeItems
                      .filter(
                        (filteredItem) => filteredItem.subject === item.id
                      )
                      .filter(
                        (filteredTreeItem) =>
                          filteredTreeItem.attending_teacher.id ===
                          selectedTeacher.id
                      )
                      .map((treeItem, ind) => (
                        <div key={ind}>
                          {treeItem.topics.map((topic, indx) => (
                            <Row key={indx}>
                              {topic.sessions.slice(0, 4).map((session, id) => {
                                return (
                                  <div
                                    onClick={() =>
                                      onSelectSession(session, topic, item)
                                    }
                                    key={id}
                                    className="z-40"
                                  >
                                    <Video style={{ margin: "5px" }}>
                                      <VideoPreview
                                        style={
                                          selectedSession &&
                                          selectedSession.id === session.id
                                            ? {}
                                            : {
                                                pointerEvents: "none",
                                                cursor: "help",
                                              }
                                        }
                                      >
                                        <VideoCast
                                          url={session.video_url}
                                          playercontrols={false}
                                        />
                                      </VideoPreview>
                                      <VideoText>
                                        <CourseTitle>
                                          {session.name
                                            ? session.name
                                            : topic.name}
                                        </CourseTitle>
                                        <Instructor>
                                          {item.name} {selectedClass.name}
                                        </Instructor>

                                        {/* <MGrid>
                                        <Col1>
                                          <VideoTeachers>
                                            {selectedTeacher.name}
                                          </VideoTeachers>
                                        </Col1>
                                      </MGrid> */}
                                        <MGrid className="action-row">
                                          <Col2>
                                            <WatchButton
                                              onClick={() =>
                                                onSelectSession(
                                                  session,
                                                  topic,
                                                  item
                                                )
                                              }
                                            >
                                              <h3>
                                                <FontAwesomeIcon
                                                  icon={faPlayCircle}
                                                />{" "}
                                                VIEW CLASS
                                              </h3>
                                            </WatchButton>
                                          </Col2>
                                        </MGrid>
                                      </VideoText>
                                    </Video>
                                  </div>
                                );
                              })}
                            </Row>
                          ))}
                        </div>
                      ))}
                  </Wrapper>
                </div>
              ))}
        </>
      )}
    </>
  );
}
