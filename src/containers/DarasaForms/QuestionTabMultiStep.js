import Button from "components/Button/Button";
import StepWizard from "containers/Multistep/Multistep";
import React, { useState } from "react";
import {
  Container,
  QuestionHeader,
  QuestionInfoCategory,
  QuestionInfoContainer,
  QuestionInfoCategoryIcon,
  QCTitle,
  QuestionInfo,
  QCIcon,
  Answers,
  AnswersList,
  AnswersItem,
  AnswersLink,
  AnswerFeedback,
} from "./df.style";

export default function QuestionTabWizard({ form }) {
  const [state, setState] = useState({
    isAnswer: false,
    transitions: {
      enterRight: `animated enterRight`,
      enterLeft: `animated enterLeft`,
      exitRight: `animated exitRight`,
      exitLeft: `animated exitLeft`,
      intro: `animated intro`,
    },
  });
  const selectAnswer = (op, j) => {
    setState({ ...state, isAnswer: true });
  };

  const onStepChange = (stats) => {
    // console.log(stats);
  };
  const setInstance = (SW) => {
    setState({
      ...state,
      SW,
    });
  };
  // const nextStep = (check) => {
  //   if (check) {
  //     alert.info(`Select Required Field to proceed`);
  //   } else {
  //     return false;
  //   }
  // };

  const { SW } = state;
  return (
    <>
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled={true}
        // nav={<Nav />}
        instance={setInstance}
      >
        {form.questions.length > 0 &&
          form.questions.map((ques, i) => {
            return state.isAnswer ? (
              <Container
                name={`Question ${i + 1}`}
                tabindex="0"
                role="button"
                aria-disabled="false"
                aria-expanded="false"
                elevation="1"
                style={{ margin: "10px 0" }}
              >
                <div
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                    margin: "13px",
                  }}
                >
                  <strong style={{ float: "right" }}>
                    {i + 1} / {form.questions.length}
                  </strong>

                  {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                  <QuestionHeader>
                    <h2>
                      {i + 1}. {ques.question}
                    </h2>
                    <QuestionInfoContainer>
                      <QuestionInfoCategory>
                        <QCTitle>
                          <h6>Wow! You've nailed it</h6>
                        </QCTitle>
                      </QuestionInfoCategory>
                    </QuestionInfoContainer>
                  </QuestionHeader>
                  <Answers>
                    <AnswersItem>
                      <AnswersLink
                        style={{
                          backgroundColor: "#0b8708",
                          borderColor: "#0d950a",
                        }}
                      >
                        <p>The Correct Answer</p>
                      </AnswersLink>
                    </AnswersItem>
                    <AnswerFeedback>
                      djf sjfdsflkskfd jsfsf s djf sjfdsflkskfd jsfsf s djf
                      sjfdsflkskfd jsfsf s djf sjfdsflkskfd jsfsf s fd fdsdfsgf
                      sd fsf dsf s fd sdfs fsdfsfs fd sfdsf sdf sdfsfd
                      sfdsfsdfsfd s
                    </AnswerFeedback>
                    {SW.currentStep === SW.totalSteps ? null : (
                      <Button
                        style={{
                          width: "100%",
                          maxWidth: "200px",
                          borderRadius: "5px 30px ",
                        }}
                        title={`${SW.nextStepName} >`}
                        onClick={() => {
                          SW.nextStep();
                          setState({ ...state, isAnswer: false });
                        }}
                      />
                    )}
                  </Answers>
                </div>
              </Container>
            ) : (
              <Container
                tabindex="0"
                role="button"
                aria-disabled="false"
                aria-expanded="false"
                elevation="1"
                style={{ margin: "10px 0" }}
              >
                <div
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                    margin: "13px",
                  }}
                >
                  <strong style={{ float: "right" }}>
                    {i + 1} / {form.questions.length}
                  </strong>

                  {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}
                  <QuestionHeader>
                    <h2>
                      {i + 1}. {ques.question}
                    </h2>
                    <QuestionInfoContainer>
                      <QuestionInfoCategory>
                        <QuestionInfoCategoryIcon>
                          <QCIcon />
                        </QuestionInfoCategoryIcon>
                        <QCTitle>
                          <h3>Geography</h3>
                        </QCTitle>
                      </QuestionInfoCategory>
                      <QuestionInfo>By Teacher: ...</QuestionInfo>
                    </QuestionInfoContainer>
                  </QuestionHeader>
                  {ques.background_image ? (
                    <div>
                      <img
                        src={ques.background_image}
                        width="400px"
                        height="auto"
                        alt="header-pic"
                      />
                      <br></br>
                      <br></br>
                    </div>
                  ) : (
                    ""
                  )}
                  <Answers>
                    <AnswersList>
                      {ques.question_type === "mcq_one"
                        ? ques.mcq_one.map((op, j) => (
                            <AnswersItem
                              key={j}
                              onClick={() => selectAnswer(op, j)}
                            >
                              <AnswersLink>
                                <input
                                  type="radio"
                                  disabled
                                  style={{
                                    height: "1.3em",
                                    margin: "2px 15px",
                                  }}
                                />
                                <p>{ques.mcq_one[j].choice_text}</p>
                              </AnswersLink>
                              <div>
                                {op.background_image ? (
                                  <img
                                    src={op.background_image}
                                    width="160px"
                                    height="auto"
                                    alt="header-info-pic"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </AnswersItem>
                          ))
                        : null}
                      {ques.question_type === "mcq_many"
                        ? ques.mcq_many.map((op, j) => (
                            <AnswersItem
                              key={j}
                              onClick={() => selectAnswer(op, j)}
                            >
                              <AnswersLink>
                                <input
                                  type="checkbox"
                                  value="1"
                                  disabled
                                  style={{
                                    height: "1.3em",
                                    margin: "2px 15px",
                                  }}
                                />
                                <p>{ques.mcq_many[j].choice_text}</p>
                              </AnswersLink>
                              <div>
                                {op.background_image ? (
                                  <img
                                    src={op.background_image}
                                    width="160px"
                                    height="auto"
                                    alt="header-info-pic"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </AnswersItem>
                          ))
                        : null}
                      {ques.question_type === "lng_txt" &&
                        ques.lng_txt.map((op, j) => {
                          return (
                            <AnswersItem
                              key={j}
                              onClick={() => selectAnswer(op, j)}
                            >
                              <div style={{ display: "flex" }}>
                                <p>{op.answer_text}</p>
                              </div>

                              <div>
                                {op.background_image ? (
                                  <img
                                    src={op.background_image_alt}
                                    width="160px"
                                    height="auto"
                                    alt="header-info-pic"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </AnswersItem>
                          );
                        })}

                      {ques.question_type === "txt" &&
                        ques.txt.map((op, j) => {
                          return (
                            <AnswersItem
                              key={j}
                              onClick={() => selectAnswer(op, j)}
                            >
                              <div style={{ display: "flex" }}>
                                <p>{op.answer_text}</p>
                              </div>

                              <div>
                                {op.background_image ? (
                                  <img
                                    src={op.background_image_alt}
                                    width="160px"
                                    height="auto"
                                    alt="header-info-pic"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </AnswersItem>
                          );
                        })}

                      {ques.question_type === "binary" &&
                        ques.binary.map((op, j) => {
                          return (
                            <AnswersItem
                              key={j}
                              onClick={() => selectAnswer(op, j)}
                            >
                              <div className="toggle-switch">
                                <input
                                  type="checkbox"
                                  className="toggle-switch-checkbox"
                                  id={"chkbx2"}
                                  name={"chkbx2"}
                                  checked={ques.binary.answer_option}
                                />
                                <label
                                  className="toggle-switch-label"
                                  htmlFor={"chkbx2"}
                                >
                                  <span
                                    className={"toggle-switch-inner"}
                                    data-yes={"yes"}
                                    data-no={"no"}
                                  />
                                  <span className={"toggle-switch-switch"} />
                                </label>
                              </div>
                            </AnswersItem>
                          );
                        })}
                    </AnswersList>
                  </Answers>
                </div>
              </Container>
            );
          })}
      </StepWizard>
      <br />
    </>
  );
}
