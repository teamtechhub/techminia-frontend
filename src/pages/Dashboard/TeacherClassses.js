import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Col2,
  CourseTitle,
  Instructor,
  MGrid,
  Video,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "contexts/auth/auth.context";

export default function TeacherClassses({ setView }) {
  const history = useHistory();
  const {
    authState: { profile },
  } = useContext(AuthContext);

  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(false);
  const [subjects, setSubjects] = useState(false);
  const [treeItems, setTreeItems] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
  const [more, setMore] = useState(3);
  console.log(selectedTeacher);

  useEffect(() => {
    axiosInstance.get(`/curriculum/class/`).then(async (res) => {
      await setClasses(res.data.results);
      await axiosInstance
        .get(`/account/teachers/profile`)
        .then(async (response) => {
          await setSelectedTeacher(response.data);
          await setSelectedClass(
            res.data.results.filter((filteredClass) =>
              response.data.classes.includes(filteredClass.id)
            )[0]
          );
        });
    });
    axiosInstance.get(`/curriculum/subject/`).then((res) => {
      setSubjects(res.data.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.log(res.data.results);
        setLoading(false);
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treeItems]);

  const onSelectSession = (session, topic, subject) => {
    history.push(
      `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
    );
  };

  return (
    <>
      <CardWrapper>
        {profile.is_teacher && profile.extended_profile.is_darasa_teacher ? (
          <Button
            onClick={() => setView(false)}
            style={{ float: "right", margin: "5px" }}
            title={`Add Lessons`}
          />
        ) : null}

        <br />
        {classes && selectedTeacher
          ? classes
              .filter((filteredClass) =>
                selectedTeacher.classes.includes(filteredClass.id)
              )
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
              ))
          : null}
        {classes.length === 0 ? <p>No Classes Here</p> : null}
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
                  <Wrapper>
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
                              {topic.sessions
                                .slice(0, more)
                                .map((session, id) => {
                                  return (
                                    <Video key={id}>
                                      <VideoText>
                                        <CourseTitle>
                                          {session.name
                                            ? session.name
                                            : topic.name}
                                        </CourseTitle>
                                        <Instructor>
                                          {item.name} {selectedClass.name}
                                        </Instructor>

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
                                                  icon={"play-circle"}
                                                />{" "}
                                                VIEW LESSON
                                              </h3>
                                            </WatchButton>
                                          </Col2>
                                        </MGrid>
                                      </VideoText>
                                    </Video>
                                  );
                                })}
                              {topic.sessions.length > more && (
                                <Video>
                                  <VideoText>
                                    <MGrid className="action-row">
                                      <Col2>
                                        <WatchButton
                                          onClick={() => setMore(more + 3)}
                                        >
                                          <h3>VIEW MORE</h3>
                                        </WatchButton>
                                      </Col2>
                                    </MGrid>
                                  </VideoText>
                                </Video>
                              )}
                            </Row>
                          ))}
                        </div>
                      ))}
                  </Wrapper>
                </div>
              ))}
          {subjects.length === 0 ? <p>No Subject Lessons Added</p> : null}
        </>
      )}
    </>
  );
}
