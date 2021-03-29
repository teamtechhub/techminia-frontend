import Button from "components/Button/Button";
import StepWizard from "containers/Multistep/Multistep";
import React, { useState } from "react";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
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
import { logToConsole } from "utils/logging";

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
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const multiAnswers = (ques) => {
    const rs =
      selectedAnswers &&
      selectedAnswers.reduce((acc, val) => {
        acc.push({
          answer: val.id,
          answer_to: ques.id,
        });
        return acc;
      }, []);
    return rs;
  };

  const setAnsState = () => {
    setState({ ...state, isAnswer: true });
  };

  const handleSelectAnswer = (op, ques) => {
    if (ques.question_type === "mcq_many") {
      const newQ =
        selectedAnswers &&
        selectedAnswers.reduce((arr, val) => {
          if (val.id !== op.id) {
            arr.push(val);
          }
          return arr;
        }, []);
      setSelectedAnswers(newQ);
    }
    const data = {
      response_to: form.id,
      question_id: ques.id,
      response:
        ques.question_type === "mcq_many"
          ? multiAnswers(ques)
          : ques.question_type === "mcq_one"
          ? [
              {
                answer:
                  ques.question_type === "binary"
                    ? op.answer_option
                    : op.choice_text,
                answer_to: ques.id,
              },
            ]
          : [
              {
                answer: op.id,
                answer_to: ques.id,
              },
            ],
    };

    if (ques.question_type === "mcq_many") {
      setSelectedAnswers([...selectedAnswers, op]);
    } else {
      setSelectedAnswer(op);
      setState({ ...state, isAnswer: true });
    }

    axiosInstance.post(`/response/`, data, tokenConfig()).then((res) => {
      logToConsole(res);
    });
  };
  const answerArray = (q) => {
    switch (q.question_type) {
      case "mcq_one":
        return q.mcq_one.filter((fq) => fq.is_answer === true);
      case "mcq_many":
        return q.mcq_many.filter((fq) => fq.is_answer === true);
      case "binary":
        return q.binary;
      case "lng_txt":
        return q.lng_txt;
      case "txt":
        return q.txt;
      default:
        break;
    }
  };
  const handleCheckBoxValid = (chk) => {
    const valid =
      selectedAnswers &&
      selectedAnswers.find((f) => f.id === chk.id) &&
      selectedAnswers.find((f) => f.id === chk.id).length > 0;
    return valid;
  };
  const handleAnswerCheck = (q) => {
    switch (q.question_type) {
      case "mcq_one":
        const mcq_one = q.mcq_one.find((fq) => fq.is_answer === true);
        logToConsole(mcq_one);
        return mcq_one !== undefined
          ? mcq_one.id && selectedAnswer.id
            ? mcq_one.id === selectedAnswer.id
            : false
          : false;
      // return parseInt(q.answer_key) === parseInt(selectedAnswer.id);
      case "mcq_many":
        logToConsole("====================", selectedAnswers);
        const mcq_many =
          selectedAnswers &&
          q.mcq_many.filter(
            (fq) =>
              fq.is_answer === true &&
              selectedAnswers
                .reduce((arr, b) => {
                  arr.push(b.id);
                  return arr;
                }, [])
                .includes(fq.id)
          );
        return mcq_many ? mcq_many.length > 0 : false;
      // const ans = q.answer_key.split(",");
      // return ans.includes(selectedAnswer.id);
      case "binary":
        return q.binary[0].id === selectedAnswer.id;
      // return parseInt(q.answer_key) === parseInt(selectedAnswer.id);
      case "lng_txt":
        return q.lng_txt[0].id === selectedAnswer.id;
      // return parseInt(q.answer_key) === parseInt(selectedAnswer.id);
      case "txt":
        return q.txt[0].id === selectedAnswer.id;
      // return parseInt(q.answer_key) === parseInt(selectedAnswer.id);
      default:
        break;
    }
  };

  const onStepChange = (stats) => {
    // logToConsole(stats);
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
        // isHashEnabled={true}
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
                          <h5>
                            {form.class_names} {form.subject_names}
                          </h5>
                          <br />
                          {handleAnswerCheck(ques) ? (
                            <h6>Wow! You've nailed it</h6>
                          ) : answerArray(ques).length > 0 ? (
                            <h6>The Correct Answer is ...</h6>
                          ) : null}
                        </QCTitle>
                      </QuestionInfoCategory>
                      <QuestionInfo>By {form.teacher}</QuestionInfo>
                    </QuestionInfoContainer>
                  </QuestionHeader>
                  <Answers>
                    <AnswersItem>
                      {answerArray(ques).length === 0 && (
                        <h4>No Answer was provided.</h4>
                      )}
                      {answerArray(ques).map((ans, b) => {
                        return (
                          <AnswersLink
                            key={b}
                            style={
                              handleAnswerCheck(ques)
                                ? {
                                    backgroundColor: "#0d950a",
                                    borderColor: "#0b8708",
                                    margin: "10px 0",
                                  }
                                : {
                                    backgroundColor: "#ec7623",
                                    borderColor: "#c35100",
                                    margin: "10px 0",
                                  }
                            }
                          >
                            <p>
                              {ques.question_type === "mcq_one" &&
                                ans.choice_text}
                              {ques.question_type === "mcq_many" &&
                                ans.choice_text}
                              {ques.question_type === "txt" && ans.answer_text}
                              {ques.question_type === "lng_txt" &&
                                ans.answer_text}
                              {ques.question_type === "binary" &&
                                ans.answer_option}
                            </p>
                          </AnswersLink>
                        );
                      })}
                    </AnswersItem>
                    <AnswerFeedback>{ques.feedback}</AnswerFeedback>
                    {SW.currentStep === SW.totalSteps ? null : (
                      <Button
                        style={{ float: "right" }}
                        title={`Question ${i + 2} >`}
                        onClick={() => {
                          SW.nextStep();
                          setState({ ...state, isAnswer: false });
                          setSelectedAnswers([]);
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
                          <h5>
                            {form.class_names} {form.subject_names}
                          </h5>
                        </QCTitle>
                      </QuestionInfoCategory>
                      <QuestionInfo>By {form.teacher}</QuestionInfo>
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
                              onClick={() => handleSelectAnswer(op, ques)}
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
                      {ques.question_type === "mcq_many" ? (
                        <>
                          {ques.mcq_many.map((op, j) => (
                            <AnswersItem
                              style={
                                handleCheckBoxValid(op)
                                  ? {
                                      backgroundColor: "#a17fb99c",
                                    }
                                  : {}
                              }
                              key={j}
                              onClick={() => handleSelectAnswer(op, ques)}
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
                          ))}
                          {selectedAnswers.length > 0 && (
                            <Button
                              onClick={() => setAnsState()}
                              title={`See Answer`}
                            />
                          )}
                        </>
                      ) : null}
                      {ques.question_type === "lng_txt" &&
                        ques.lng_txt.map((op, j) => {
                          return (
                            <AnswersItem
                              key={j}
                              onClick={() => handleSelectAnswer(op, ques)}
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
                              onClick={() => handleSelectAnswer(op, ques)}
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
                              onClick={() => handleSelectAnswer(op, ques)}
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
