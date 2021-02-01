import Accordion from "components/Accordion/Accordion";
import { DragDropIcon } from "components/AllSvgIcon";
import React, { useEffect, useState } from "react";
import Collapse, { Panel } from "rc-collapse";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as formService from "services/FormService";
import { Spinner } from "components/Button/Button.style";

export default function QuestionTab(props) {
  const [questions, setQuestions] = useState([]);
  const [openUploadImagePop, setOpenUploadImagePop] = useState(false);
  const [imageContextData, setImageContextData] = useState({
    question: null,
    option: null,
  });
  const [formData, setFormData] = useState({});
  const [loadingFormData, setLoadingFormData] = useState(true);

  useEffect(() => {
    if (props.formData.questions !== undefined) {
      //console.log(props.formData.questions.length);
      if (props.formData.questions.length === 0) {
        setQuestions([
          {
            questionText: "Question",
            options: [{ optionText: "Option 1" }],
            open: false,
          },
        ]);
      } else {
        setQuestions(props.formData.questions);
      }
      setLoadingFormData(false);
    }
    setFormData(props.formData);
  }, [props.formData]);

  function saveQuestions() {
    console.log("auto saving questions initiated");
    var data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: questions,
    };

    formService.autoSave(data).then(
      (result) => {
        console.log(result);
        setQuestions(result.questions);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(resMessage);
      }
    );
  }

  function checkImageHereOrNotForQuestion(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "") {
      return false;
    } else {
      return true;
    }
  }

  function addMoreQuestionField() {
    expandCloseAll(); //I AM GOD

    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        options: [{ optionText: "Option 1" }],
        open: true,
      },
    ]);
  }

  function copyQuestion(i) {
    let qs = [...questions];
    expandCloseAll();
    const myNewOptions = [];
    qs[i].options.forEach((opn) => {
      if (opn.optionImage !== undefined || opn.optionImage !== "") {
        var opn1new = {
          optionText: opn.optionText,
          optionImage: opn.optionImage,
        };
      } else {
        var opn1new = {
          optionText: opn.optionText,
        };
      }
      myNewOptions.push(opn1new);
    });
    const qImage = qs[i].questionImage || "";
    var newQuestion = {
      questionText: qs[i].questionText,
      questionImage: qImage,
      options: myNewOptions,
      open: true,
    };
    setQuestions((questions) => [...questions, newQuestion]);
  }

  const handleImagePopupOpen = () => {
    setOpenUploadImagePop(true);
  };

  function uploadImage(i, j) {
    setImageContextData({
      question: i,
      option: j,
    });
    handleImagePopupOpen();
  }

  function updateImageLink(link, context) {
    var optionsOfQuestion = [...questions];
    var i = context.question;

    if (context.option == null) {
      optionsOfQuestion[i].questionImage = link;
    } else {
      var j = context.option;
      optionsOfQuestion[i].options[j].optionImage = link;
    }
    setQuestions(optionsOfQuestion);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];

    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );

    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function showAsQuestion(i) {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Max  5 options ");
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
      console.log(i + "__" + j);
    }
  }

  function expandCloseAll() {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }
  function questionsUI() {
    return (
      <Collapse
        accordion={true}
        defaultActiveKey="active"
        // expandIcon={expandIcon}
      >
        {questions.map((ques, i) => {
          return (
            <Draggable key={i} draggableId={i + "id"} index={i}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div>
                    <div style={{ marginBottom: "15px" }}>
                      <div style={{ width: "100%", marginBottom: "-7px" }}>
                        <DragDropIcon
                          style={{
                            transform: "rotate(-90deg)",
                            color: "#DAE0E2",
                          }}
                          fontSize="small"
                        />
                      </div>
                      <Panel
                        header={
                          !questions[i].open ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginLeft: "3px",
                                paddingTop: "15px",
                                paddingBottom: "15px",
                              }}
                            >
                              {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}

                              <p
                                variant="subtitle1"
                                style={{ marginLeft: "0px" }}
                              >
                                {i + 1}. {ques.questionText}
                              </p>

                              {ques.questionImage !== "" ? (
                                <div>
                                  <img
                                    src={ques.questionImage}
                                    width="400px"
                                    height="auto"
                                    alt="pic-pic"
                                  />
                                  <br></br>
                                  <br></br>
                                </div>
                              ) : (
                                ""
                              )}

                              {ques.options.map((op, j) => (
                                <div key={j}>
                                  <div style={{ display: "flex" }}>
                                    <radio />
                                    <p style={{ color: "#555555" }}>
                                      {ques.options[j].optionText}
                                    </p>
                                  </div>

                                  <div>
                                    {op.optionImage !== "" ? (
                                      <img
                                        src={op.optionImage}
                                        width="160px"
                                        height="auto"
                                        alt="pic-pic"
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            ""
                          )
                        }
                      >
                        <h2>panel quiz</h2>
                      </Panel>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          );
        })}
      </Collapse>
    );
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questionsUI()}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
