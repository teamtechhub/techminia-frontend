import Button from "components/Button/Button";
import React, { useEffect, useState } from "react";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import {
  CardWrapper,
  Row,
  Column,
  Frame,
  Content,
  Header,
  Title,
} from "./Students.style";
import { animated } from "react-spring";
import Loader from "components/Loader/Loader";
import { useHistory } from "react-router-dom";

function AllClasses() {
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
  const onSelectTopic = (topic, subject) => {
    history.push(
      `/dashboard/classes/${selectedClass.id}/${subject.id}/${selectedTeacher.id}/${topic.id}`
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
        <Row>
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
                      background: "#652e8d",
                    }}
                    key={index}
                  >
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
                              style={{}}
                              children={treeItem.topics.map((topic, indx) => (
                                <Frame
                                  style={{ background: "transparent" }}
                                  depth={"child"}
                                  key={indx}
                                >
                                  <Header
                                    open={true}
                                    depth={"child"}
                                    className={"child"}
                                    onClick={() => onSelectTopic(topic, item)}
                                  >
                                    <Title
                                      style={{
                                        fontWeight: 300,
                                        fontSize: "large",
                                        color: "#fff",
                                        textDecoration: "none",
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
                                              onClick={() =>
                                                onSelectSession(
                                                  session,
                                                  topic,
                                                  item
                                                )
                                              }
                                            >
                                              <Title
                                                style={{
                                                  fontWeight: 200,
                                                  // fontSize: "medium",
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
                              ))}
                            />
                          </Content>
                        </Frame>
                      ))}
                  </Column>
                </div>
              ))}
        </Row>
      )}
    </>
  );
}

export default AllClasses;
