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
import LoadingIndicator from "components/LoadingIndicator";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function Class() {
  const history = useHistory();
  const match = useRouteMatch();
  const [cls, setClass] = useState([]);
  const [subjects, setSubjects] = useState(false);
  const [treeItems, setTreeItems] = useState();
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(false);

  useEffect(() => {
    if (match.params.classID) {
      axiosInstance
        .get(`/curriculum/class/${match.params.classID}`)
        .then((res) => {
          setClass(res.data);
        });
      axiosInstance
        .get(
          `/curriculum/syllabus/?class=${match.params.classID}`,
          tokenConfig()
        )
        .then(async (res) => {
          await setTreeItems(res.data.results);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(res.data.results);
          setLoading(false);
        });
    }

    axiosInstance.get(`/curriculum/subject/`).then((res) => {
      setSubjects(res.data.results);
    });
  }, [match.params.classID]);

  useEffect(() => {
    if (treeItems) {
      axiosInstance.get(`account/teachers/`, tokenConfig()).then((res) => {
        setTeachers(res.data.results);
        setSelectedTeacher(
          res.data.results.filter((filteredTeacher) =>
            treeItems.find((a) => a.attending_teacher.id === filteredTeacher.id)
          )[0]
        );
        console.log(res.data.results);
        setLoading(false);
      });
    }
  }, [treeItems]);

  const onSelectSession = (session, topic, subject) => {
    history.push(
      `/dashboard/classes/${match.params.classID}/${subject.id}/${selectedTeacher.id}/${topic.id}/${session.id}/`
    );
  };
  const onSelectTopic = (topic, subject) => {
    history.push(
      `/dashboard/classes/${match.params.classID}/${subject.id}/${selectedTeacher.id}/${topic.id}`
    );
  };

  return (
    <>
      <CardWrapper>
        <h5>
          {cls ? (
            cls.name
          ) : (
            <>
              <span>● </span>
              <span>● </span>
              <span>● </span>
            </>
          )}
        </h5>
      </CardWrapper>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Row>
          {subjects &&
            treeItems &&
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
                      background:
                        "linear-gradient(180deg, rgb(236, 118, 35) 0%, rgb(101, 46, 141) 100%)",
                    }}
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
                                <Frame depth={"child"} key={indx}>
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
                                          <Frame depth={"child"} key={id}>
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
                                                <span>● </span>Session {id + 1}
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
