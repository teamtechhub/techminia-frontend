import React, { Fragment, useEffect, useState } from "react";
import {
  Col1,
  Col2,
  CourseTitle,
  Instructor,
  MGrid,
  Video,
  VideoPreview,
  VideoTeachers,
  VideoText,
  WatchButton,
  Wrapper,
} from "pages/LandingPage/VideoCarousel.style";
import Button from "components/Button/Button";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import { CardWrapper, Row } from "pages/Students/Students.style";
import Loader from "components/Loader/Loader";
import { useHistory } from "react-router-dom";
// import tuit from "images/tuit.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoCast from "components/Video/Video";

export default function StudentDashboard() {
  const history = useHistory();
  const [classes, setClasses] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Form");
  const [selectedClass, setSelectedClass] = useState(false);
  const [subjects, setSubjects] = useState(false);
  const [treeItems, setTreeItems] = useState();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);
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

  const onSelectSession = (session, topic, subject) => {
    history.push(
      `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
    );
  };

  if (classes === false) {
    <Loader />;
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
        <Loader />
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
                          title={teacher.name}
                          style={{
                            padding: "2px",
                            fontSize: "13px",
                            height: "auto",
                            margin: "5px",
                          }}
                        />
                      ))}

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
                              {topic.sessions.slice(0, 4).map((session, id) => {
                                return (
                                  <Video key={id}>
                                    <VideoPreview>
                                      <VideoCast url={session.video_url} />
                                      <div>
                                        <FontAwesomeIcon
                                          icon={"play-circle"}
                                          className="icon"
                                        />
                                      </div>
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

                                      <MGrid>
                                        <Col1>
                                          <VideoTeachers>
                                            {selectedTeacher.name}
                                          </VideoTeachers>
                                        </Col1>
                                      </MGrid>
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
                                              VIEW CLASS
                                            </h3>
                                          </WatchButton>
                                        </Col2>
                                      </MGrid>
                                    </VideoText>
                                  </Video>
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
