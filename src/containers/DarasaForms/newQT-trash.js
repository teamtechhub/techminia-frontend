import {
  faAlignLeft,
  faCheck,
  faCheckCircle,
  faCheckSquare,
  faEye,
  faParagraph,
  faTrash,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { openModal } from "@redq/reuse-modal";
import AccordionWrapper from "components/Accordion/Accordion.style";
import { SaveIcon } from "components/AllSvgIcon";
import { CopyIcon } from "components/AllSvgIcon";
import { CloseIcon, DragDropIcon, Plus } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import TextField from "components/forms/TextField";
import useOnClickOutside from "components/Popover/useOnClickOutside";
import Uploader from "components/Uploader/Uploader";
import Collapse, { Panel } from "rc-collapse";
import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import * as formService from "services/FormService";
import { toFormData } from "utils";
import { formTokenConfig } from "utils/axios";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import {
  Container,
  MainContent,
  OptionsRow,
  PopUp,
  PopupOption,
  PopUpOptionIcon,
  SelectBox,
  SelectBoxContent,
  SideView,
  TitleInput,
  TitleRow,
  TypeChooser,
} from "./df.style";
import { logToConsole } from "utils/logging";

// import ImageUplaodModel from "./ImageUploadModel";

export default function QuestionTab() {
  const match = useRouteMatch();
  const alert = useAlert();
  const [questions, setQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const newQuestion = [
    {
      question: "Question",
      background_image: null,
      background_image_alt: null,
      order: questions.length + 1,
      mcq_many: [
        {
          is_answer: false,
          choice_text: "Option 1",
          background_image: null,
          background_image_alt: null,
        },
      ],
      mcq_one: [
        {
          is_answer: false,
          choice_text: "Option 1",
          background_image: null,
          background_image_alt: null,
        },
      ],
      question_type: "mcq_one",
      binary: [{ answer_option: "yes" }],
      txt: [
        {
          answer_text: "Short Answer",
          background_image: null,
          background_image_alt: null,
        },
      ],
      lng_txt: [
        {
          answer_text: "Long Answer",
          background_image: null,
          background_image_alt: null,
        },
      ],
      score: 0,
      feedback: "Feedback : Explanation for answer",
      required: false,
      open: questions.length === 0 ? false : true,
    },
  ];
  logToConsole(newQuestion);
  const [formData, setFormData] = useState({});

  const [isSelectActive, setIsSelectActive] = useState(true);
  // Popover State
  const [state, setState] = useState(false);
  // Ref
  const ref = useRef();

  // Toggle Popover content
  const handleToggle = (e) => {
    e.stopPropagation();
    setState((state) => !state);
  };

  // Handle document click
  const handleDocumentClick = (e) => {
    e.stopPropagation();
    if (state) {
      handleToggle(e);
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/form/${match.params.formID}`, tokenConfig())
      .then((res) => {
        setFormData(res.data);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    logToConsole("first useEffect()");
    if (formData.questions !== undefined) {
      //logToConsole(props.formData.questions.length);
      if (formData.questions.length === 0) {
        setQuestions([
          {
            question: "Question",
            background_image: null,
            background_image_alt: null,
            mcq_many: [
              {
                is_answer: false,
                choice_text: "Option 1",
                background_image: null,
                background_image_alt: null,
              },
            ],
            mcq_one: [
              {
                is_answer: false,
                choice_text: "Option 1",
                background_image: null,
                background_image_alt: null,
              },
            ],
            question_type: "mcq_one",
            binary: [{ answer_option: "yes" }],
            txt: [
              {
                answer_text: "Short Answer",
                background_image: null,
                background_image_alt: null,
              },
            ],
            lng_txt: [
              {
                answer_text: "Long Answer",
                background_image: null,
                background_image_alt: null,
              },
            ],
            score: 0,
            feedback: "",
            required: false,
            open: false,
          },
        ]);
      } else {
        setQuestions(formData.questions);
        logToConsole(formData.questions);
        // if(!formData){
        //   axiosInstance
        //   .get(
        //     `/question/?${JSON.stringify(formData.questions)}`,
        //     tokenConfig()
        //   )
        //   .then((res) => setQuestions(res.data.results));
        // }
      }
    }
    window.addEventListener("click", handleDocumentClick);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.formID]);

  const typeChooserOptions = [
    {
      key: "txt",
      Value: "Short Text",
      icon: <FontAwesomeIcon icon={faAlignLeft} className="icon" />,
    },
    {
      key: "lng_txt",
      Value: "Long Answer",
      icon: <FontAwesomeIcon icon={faParagraph} className="icon" />,
    },
    {
      key: "mcq_one",
      Value: "Multiple Choice",
      icon: <FontAwesomeIcon icon={faCheckCircle} className="icon" />,
    },
    {
      key: "mcq_many",
      Value: "Check Boxes",
      icon: <FontAwesomeIcon icon={faCheckSquare} className="icon" />,
    },
    {
      key: "binary",
      Value: "Yes/No",
      icon: <FontAwesomeIcon icon={faCheck} className="icon" />,
    },
  ];

  const handleEditAddQuestion = async (quiz, type) => {
    const qs = [...questions];
    const all_data =
      type === "edit_question"
        ? await quiz
        : await qs.filter((filteredQS) => filteredQS.open === true)[0];

    logToConsole(all_data);

    if (type === "edit_question" || all_data.uuid) {
      const formEditData = toFormData(all_data);

      axiosInstance
        .put(`/question/${all_data.id}`, formEditData, formTokenConfig())
        .then(async (res) => {
          alert.success("Question Editted");
        });
    } else {
      const formAddData = toFormData(all_data);

      axiosInstance
        .post(`/question/`, formAddData, formTokenConfig())
        .then((res) => {
          axiosInstance
            .patch(
              `/form/${match.params.formID}/`,
              { questions: [res.data.id] },
              tokenConfig()
            )
            .then((response) => {
              logToConsole("response", response);
              if (response.status === 200) {
                alert.success("Question added");
              }
            });
        });
    }
  };

  useOnClickOutside(ref, () => setState((state) => false));

  function saveQuestions() {
    logToConsole("auto saving questions initiated");
    var data = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      questions: questions,
    };

    formService.autoSave(data).then(
      (result) => {
        logToConsole(result);
        setQuestions(result.questions);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        logToConsole(resMessage);
      }
    );
  }

  function checkImageHereOrNotForQuestion(gg) {
    // logToConsole(gg);
    if (gg === undefined || gg === "" || gg === null) {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // logToConsole(gg);
    if (gg === undefined || gg === "" || gg === null) {
      return false;
    } else {
      return true;
    }
  }

  function addMoreQuestionField() {
    handleEditAddQuestion(null, "add_question");
    logToConsole("adding more quiz");
    expandCloseAll();

    setQuestions((questions) => [
      ...questions,
      {
        question: "Question",
        background_image: null,
        background_image_alt: null,
        mcq_many: [
          {
            is_answer: false,
            choice_text: "Option 1",
            background_image: null,
            background_image_alt: null,
          },
        ],
        mcq_one: [
          {
            is_answer: false,
            choice_text: "Option 1",
            background_image: null,
            background_image_alt: null,
          },
        ],
        question_type: "mcq_one",
        binary: [{ answer_option: "yes" }],
        txt: [
          {
            answer_text: "Short Answer",
            background_image: null,
            background_image_alt: null,
          },
        ],
        lng_txt: [
          {
            answer_text: "Long Answer",
            background_image: null,
            background_image_alt: null,
          },
        ],
        score: 0,
        feedback: "",
        required: false,
        open: true,
      },
    ]);
  }

  async function copyQuestion(i) {
    logToConsole("copying", i);
    let qs = [...questions];

    const mcqOneOptions = [];
    const mcqManyOptions = [];
    if (qs[i].question_type === "mcq_one") {
      qs[i].mcq_one.forEach((opn) => {
        var opn1new;
        if (opn.background_image !== undefined || opn.background_image !== "") {
          opn1new = {
            choice_text: opn.choice_text,
            background_image: opn.background_image,
            background_image_alt: opn.background_image_alt,
            is_answer: opn.is_answer,
          };
        } else {
          opn1new = {
            choice_text: opn.choice_text,
            background_image_alt: opn.background_image_alt,
            is_answer: opn.is_answer,
          };
        }
        mcqOneOptions.push(opn1new);
      });
    } else if (qs[i].question_type === "mcq_many") {
      qs[i].mcq_many.forEach((opn) => {
        var opn1new;
        if (opn.background_image !== undefined || opn.background_image !== "") {
          opn1new = {
            choice_text: opn.choice_text,
            background_image: opn.background_image,
            background_image_alt: opn.background_image_alt,
            is_answer: opn.is_answer,
          };
        } else {
          opn1new = {
            choice_text: opn.choice_text,
            background_image_alt: opn.background_image_alt,
            is_answer: opn.is_answer,
          };
        }
        mcqManyOptions.push(opn1new);
      });
    }
    const qImage = qs[i].background_image || "";
    var newQuestion = {
      question: qs[i].question,
      background_image: qImage,
      // options: myNewOptions,
      mcq_many: mcqManyOptions,
      mcq_one: mcqOneOptions,
      question_type: qs[i].question_type,
      binary: qs[i].binary.answer_option,
      txt: qs[i].txt,
      lng_txt: qs[i].lng_txt,
      score: qs[i].score,
      feedback: qs[i].feedback,
      required: qs[i].required,
      open: false,
    };
    // var newQuestion = { ...qs[i] };
    expandCloseAll();
    newQuestion.open = true;
    // await setQuestions((questions) => [...questions, newQuestion]);
    questions.push(newQuestion);
    logToConsole(newQuestion);
    logToConsole(questions);
  }

  function removeImage(i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      optionsOfQuestion[i].mcq_many[j].background_image = null;
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      optionsOfQuestion[i].mcq_one[j].background_image = null;
    }
    setQuestions(optionsOfQuestion);
  }

  async function deleteQuestion(i) {
    logToConsole("deleting");
    const qs = questions;
    qs[i].open = await false;
    logToConsole(qs, i);
    if (questions.length > 1) {
      await qs.splice(i, 1);

      setQuestions(qs);
      expandCloseAll();
    } else {
      setQuestions(qs);
    }

    logToConsole(qs);
  }
  async function setAnswerKey(i, j) {
    var optionsOfQuestion = [...questions];
    logToConsole("setting answer key");
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      optionsOfQuestion[i].mcq_many[j].is_answer = true;
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      for (let k = 0; k < optionsOfQuestion[i].mcq_one.length; k++) {
        optionsOfQuestion[i].mcq_one[k].is_answer = await false;
      }
      optionsOfQuestion[i].mcq_one[j].is_answer = await true;
    }
    setQuestions(optionsOfQuestion);
  }
  async function removeAnswerKey(i, j) {
    var optionsOfQuestion = [...questions];
    logToConsole("removing answer key");
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      optionsOfQuestion[i].mcq_many[j].is_answer = false;
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      optionsOfQuestion[i].mcq_one[j].is_answer = await false;
    }
    setQuestions(optionsOfQuestion);
  }

  function handlePointsValue(val, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].score = val;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleFeedbackValue(val, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].feedback = val;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      optionsOfQuestion[i].mcq_many[j].choice_text = text;
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      optionsOfQuestion[i].mcq_one[j].choice_text = text;
    }
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleLongValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].lng_txt.answer_text = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleShortValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].txt.answer_text = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleRequiredValue(bool, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].required = bool;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }
  function handleBinaryValue(bool, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].binary.answer_option = bool;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].question = text;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionType(type, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].question_type = type.key;
    setQuestions(optionsOfQuestion);
    logToConsole("the type", type.key);
  }
  function setImageFieldValue(img) {
    if (typeof img !== "string" && typeof img !== undefined && img !== null) {
      return img[0];
    }
    return null;
  }
  function handleImageValue(i, bg) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].background_image = setImageFieldValue(bg);
    setQuestions(optionsOfQuestion);
  }
  function handleTextImage(i, bg) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "txt") {
      optionsOfQuestion[i].txt.background_image = setImageFieldValue(bg);
    } else if (optionsOfQuestion[i].question_type === "lng_txt") {
      optionsOfQuestion[i].lng_txt.background_image = setImageFieldValue(bg);
    }
    setQuestions(optionsOfQuestion);
  }
  function handleImageValueOption(i, j, bg) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      optionsOfQuestion[i].mcq_many[j].background_image = setImageFieldValue(
        bg
      );
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      optionsOfQuestion[i].mcq_one[j].background_image = setImageFieldValue(bg);
    }
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

  async function showAsQuestion(i) {
    expandCloseAll();
    const qs = questions;
    qs[i].open = await false;
    await setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];

    if (optionsOfQuestion[i].question_type === "mcq_many") {
      if (optionsOfQuestion[i].mcq_many.length < 5) {
        optionsOfQuestion[i].mcq_many.push({
          choice_text: "Option " + (optionsOfQuestion[i].mcq_many.length + 1),
        });
      } else {
        logToConsole("Max  5 options ");
      }
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      if (optionsOfQuestion[i].mcq_one.length < 5) {
        optionsOfQuestion[i].mcq_one.push({
          choice_text: "Option " + (optionsOfQuestion[i].mcq_one.length + 1),
        });
      } else {
        logToConsole("Max  5 options ");
      }
    }

    //logToConsole(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    logToConsole("handling remove opt");
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      if (optionsOfQuestion[i].mcq_many.length > 1) {
        optionsOfQuestion[i].mcq_many.splice(j, 1);
        setQuestions(optionsOfQuestion);
        logToConsole(i + "__" + j);
      }
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      if (optionsOfQuestion[i].mcq_one.length > 1) {
        optionsOfQuestion[i].mcq_one.splice(j, 1);
        setQuestions(optionsOfQuestion);
        logToConsole(i + "__" + j);
      }
    }
  }

  async function expandCloseAll() {
    logToConsole("closing all");
    var qs = questions;
    for (let j = 0; j < qs.length; j++) {
      questions[j].open = false;
    }
    setQuestions(qs);
  }

  async function handleExpand(i) {
    let qs = [...questions];
    if (questions.length === 0) {
      await handleEditAddQuestion(
        qs.filter((filteredQS) => filteredQS.open === true)[0],
        "edit_question"
      );
    }

    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    await setQuestions(qs);
  }

  function questionsUI(all_questions) {
    return all_questions.map((ques, i) => {
      return (
        <Draggable key={i} draggableId={i + "id"} index={i}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              key={i}
            >
              <div style={{ marginBottom: "15px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "-7px",
                    textAlign: "center",
                  }}
                >
                  <DragDropIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                    }}
                    fontSize="small"
                  />
                </div>

                <Container
                  onClick={() => handleExpand(i)}
                  tabindex="0"
                  role="button"
                  aria-disabled="false"
                  aria-expanded="false"
                  elevation="1"
                >
                  <SideView />
                  <MainContent>
                    <Panel
                      //   isActive={activePanel === i}
                      isActive={all_questions[i].open}
                      style={{
                        position: "relative",
                        // zIndex: 999,
                      }}
                      header={
                        all_questions[i].open ? null : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "13px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            {/* <TextField id="standard-basic" label=" " value="Question" InputProps={{ disableUnderline: true }} />  */}

                            <p style={{ marginLeft: "0px" }}>
                              {i + 1}. {ques.question}
                            </p>

                            {ques.background_image ? (
                              <div>
                                <img
                                  src={
                                    typeof ques.background_image === "string"
                                      ? ques.background_image
                                      : ques.background_image.preview
                                  }
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
                            {ques.question_type === "mcq_one"
                              ? ques.mcq_one.map((op, j) => (
                                  <div key={j}>
                                    <div style={{ display: "flex" }}>
                                      {typeChooserOptions.filter(
                                        (filteredType) =>
                                          filteredType.key ===
                                          ques.question_type
                                      )[0].key === "mcq_one" ? (
                                        <input
                                          type="radio"
                                          disabled
                                          style={{
                                            height: "1.3em",
                                            margin: "2px 5px",
                                          }}
                                        />
                                      ) : (
                                        <input
                                          type="checkbox"
                                          value="1"
                                          disabled
                                          style={{
                                            height: "1.3em",
                                            margin: "2px 5px",
                                          }}
                                        />
                                      )}
                                      <p style={{ color: "#555555" }}>
                                        {ques.mcq_one[j].choice_text}
                                      </p>
                                    </div>

                                    <div>
                                      {op.background_image ? (
                                        <img
                                          src={
                                            typeof op.background_image ===
                                            "string"
                                              ? op.background_image
                                              : op.background_image.preview
                                          }
                                          width="160px"
                                          height="auto"
                                          alt="header-info-pic"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ))
                              : null}
                            {ques.question_type === "mcq_many"
                              ? ques.mcq_many.map((op, j) => (
                                  <div key={j}>
                                    <div style={{ display: "flex" }}>
                                      {typeChooserOptions.filter(
                                        (filteredType) =>
                                          filteredType.key ===
                                          ques.question_type
                                      )[0].key === "mcq_one" ? (
                                        <input
                                          type="radio"
                                          disabled
                                          style={{
                                            height: "1.3em",
                                            margin: "2px 5px",
                                          }}
                                        />
                                      ) : (
                                        <input
                                          type="checkbox"
                                          value="1"
                                          disabled
                                          style={{
                                            height: "1.3em",
                                            margin: "2px 5px",
                                          }}
                                        />
                                      )}
                                      <p style={{ color: "#555555" }}>
                                        {ques.mcq_many[j].choice_text}
                                      </p>
                                    </div>

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
                                  </div>
                                ))
                              : null}
                            {ques.question_type === "lng_txt" && (
                              <>
                                <div style={{ display: "flex" }}>
                                  <p style={{ color: "#555555" }}>
                                    {ques.lng_txt.answer_text}
                                  </p>
                                </div>

                                <div>
                                  {ques.lng_txt.background_image ? (
                                    <img
                                      src={ques.lng_txt.background_image_alt}
                                      width="160px"
                                      height="auto"
                                      alt="header-info-pic"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            )}
                            {ques.question_type === "txt" && (
                              <>
                                <div style={{ display: "flex" }}>
                                  <p style={{ color: "#555555" }}>
                                    {ques.txt.answer_text}
                                  </p>
                                </div>

                                <div>
                                  {ques.txt.background_image ? (
                                    <img
                                      src={ques.txt.background_image_alt}
                                      width="160px"
                                      height="auto"
                                      alt="header-info-pic"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </>
                            )}

                            {ques.question_type === "binary" && (
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
                            )}
                          </div>
                        )
                      }
                    >
                      <TitleRow
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <p style={{ marginTop: "20px", padding: 5 }}>
                          {i + 1}.
                        </p>
                        <TitleInput>
                          <TextField
                            type="text"
                            placeholder="Question text"
                            style={{
                              borderRight: "transparent",
                              borderLeft: "transparent",
                              borderTop: "transparent",
                              fontWeight: "50px",
                              fontSize: "20px",
                              borderRadius: 0,
                              borderBottom: "1px solid #652e8d",
                            }}
                            value={ques.question}
                            variant="filled"
                            onChange={(e) => {
                              handleQuestionValue(e.target.value, i);
                            }}
                          />
                        </TitleInput>

                        {/* <PicInput
                          onClick={() => {
                            uploadImage(i, null);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={"file-image"}
                            className="icon"
                            style={{ height: "100%", width: "50%" }}
                          />
                        </PicInput> */}
                        <Uploader
                          value={ques.background_image}
                          imageURL={ques.background_image}
                          name="background_image"
                          minimal
                          onChange={(val) => {
                            handleImageValue(i, val);
                          }}
                        />
                        <TypeChooser>
                          <SelectBox>
                            <SelectBoxContent>
                              <PopupOption
                                onClick={() => setIsSelectActive(true)}
                              >
                                {ques.question_type ? (
                                  <div>
                                    <PopUpOptionIcon>
                                      {
                                        typeChooserOptions.filter(
                                          (filteredType) =>
                                            filteredType.key ===
                                            ques.question_type
                                        )[0].icon
                                      }
                                    </PopUpOptionIcon>
                                    <span>
                                      {
                                        typeChooserOptions.filter(
                                          (filteredType) =>
                                            filteredType.key ===
                                            ques.question_type
                                        )[0].Value
                                      }
                                    </span>
                                  </div>
                                ) : null}
                              </PopupOption>
                            </SelectBoxContent>
                            <PopUp
                              className={isSelectActive ? "active" : ""}
                              onClick={handleToggle}
                              ref={ref}
                            >
                              {typeChooserOptions.map((opt, o) => {
                                return (
                                  <PopupOption
                                    onClick={(e) => {
                                      handleQuestionType(opt, i);
                                      setIsSelectActive(false);
                                      handleToggle(e);
                                    }}
                                  >
                                    <PopUpOptionIcon>
                                      {opt.icon}
                                    </PopUpOptionIcon>
                                    <span>{opt.Value}</span>
                                  </PopupOption>
                                );
                              })}
                            </PopUp>
                          </SelectBox>
                          {/* <select options={typeChooserOptions} /> */}
                        </TypeChooser>
                      </TitleRow>

                      <div>
                        {checkImageHereOrNotForQuestion(
                          ques.background_image
                        ) ? (
                          <div>
                            <div
                              style={{
                                width: "150px",
                                display: "flex",
                                alignItems: "flex-start",
                                paddingLeft: "20px",
                              }}
                            >
                              <Uploader
                                value={ques.background_image}
                                imageURL={ques.background_image}
                                name="background_image"
                                minimal
                                onChange={(val) => {
                                  handleImageValue(i, val);
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <OptionsRow
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "txt" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "auto",
                              minWidth: "-webkit-fill-available",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <TextField
                              fullWidth={true}
                              type="text"
                              placeholder="Short Answer"
                              style={{
                                borderRight: "transparent",
                                borderLeft: "transparent",
                                borderTop: "transparent",
                                fontWeight: "50px",
                                fontSize: "20px",
                                borderRadius: 0,
                                borderBottom: "1px solid #652e8d",
                                margin: "5px",
                              }}
                              value={ques.txt.answer_text}
                              onChange={(e) => {
                                handleShortValue(e.target.value, i);
                              }}
                            />
                            <div
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                display: "inline-flex",
                                alignItems: "center",
                                float: "right",
                              }}
                            >
                              <Button
                                size="small"
                                style={{
                                  background: "transparent",
                                  color: "#ec7623",
                                  textTransform: "none",
                                  margin: 0,
                                }}
                                title={
                                  <Uploader
                                    value={ques.background_image}
                                    imageURL={ques.background_image}
                                    name="background_image"
                                    minimal
                                    onChange={(val) => {
                                      handleTextImage(i, val);
                                    }}
                                  />
                                }
                              />
                            </div>
                            {/* <FontAwesomeIcon
                                icon={"circle"}
                                className="icon"
                                style={{
                                  color: "#652e8d",
                                }}
                              /> */}
                          </div>
                        )}
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "lng_txt" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "auto",
                              minWidth: "-webkit-fill-available",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <textarea
                              fullWidth={true}
                              type="textarea"
                              placeholder="Long Answer"
                              style={{
                                borderRight: "transparent",
                                borderLeft: "transparent",
                                borderTop: "transparent",
                                fontWeight: "50px",
                                fontSize: "20px",
                                borderRadius: 0,
                                borderBottom: "1px solid #652e8d",
                              }}
                              value={ques.lng_txt.answer_text}
                              onChange={(e) => {
                                handleLongValue(e.target.value, i);
                              }}
                            />
                            <div
                              style={{
                                cursor: "pointer",
                                position: "relative",
                                display: "inline-flex",
                                alignItems: "center",
                                float: "right",
                              }}
                            >
                              <Button
                                size="small"
                                style={{
                                  background: "transparent",
                                  color: "#ec7623",
                                  textTransform: "none",
                                  margin: 0,
                                }}
                                title={
                                  <Uploader
                                    value={ques.background_image}
                                    imageURL={ques.background_image}
                                    name="background_image"
                                    minimal
                                    onChange={(val) => {
                                      handleTextImage(i, val);
                                    }}
                                  />
                                }
                              />
                            </div>
                            {/* <FontAwesomeIcon
                                icon={"circle"}
                                className="icon"
                                style={{
                                  color: "#652e8d",
                                }}
                              /> */}
                          </div>
                        )}
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "binary" && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "auto",
                              minWidth: "-webkit-fill-available",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <div className="toggle-switch">
                              <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id={"chkbx1"}
                                name={"chkbx1"}
                                checked={ques.binary.answer_option}
                                onChange={(e) => {
                                  handleBinaryValue(e.target.checked, i);
                                }}
                              />
                              <label
                                className="toggle-switch-label"
                                htmlFor={"chkbx1"}
                              >
                                <span
                                  className={"toggle-switch-inner"}
                                  data-yes={"yes"}
                                  data-no={"no"}
                                />
                                <span className={"toggle-switch-switch"} />
                              </label>
                            </div>
                          </div>
                        )}
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "mcq_one" &&
                          ques.mcq_one.map((op, j) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "auto",
                                  minWidth: "-webkit-fill-available",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }}
                                key={j}
                              >
                                <input
                                  type="radio"
                                  disabled
                                  style={{ height: "1.3em", width: "2%" }}
                                />

                                <TextField
                                  fullWidth={true}
                                  type="text"
                                  placeholder="Option text"
                                  style={{
                                    borderRight: "transparent",
                                    borderLeft: "transparent",
                                    borderTop: "transparent",
                                    fontWeight: "50px",
                                    fontSize: "20px",
                                    borderRadius: 0,
                                    borderBottom: "1px solid #652e8d",
                                    margin: "5px",
                                  }}
                                  value={ques.mcq_one[j].choice_text}
                                  onChange={(e) => {
                                    handleOptionValue(e.target.value, i, j);
                                  }}
                                />
                                <div
                                  style={{
                                    cursor: "pointer",
                                    position: "relative",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    float: "right",
                                  }}
                                >
                                  <Button
                                    size="small"
                                    onClick={() => {
                                      ques.mcq_one[j].is_answer
                                        ? removeAnswerKey(i, j)
                                        : setAnswerKey(i, j);
                                    }}
                                    style={{
                                      background: "transparent",
                                      color: ques.mcq_one[j].is_answer
                                        ? "#37bc35"
                                        : "#ec7623",
                                      textTransform: "none",
                                      marginLeft: "-5px",
                                    }}
                                    title={
                                      ques.mcq_one[j].is_answer
                                        ? " ✔ - Remove as Answer"
                                        : "Set as Answer"
                                    }
                                  />
                                  <Button
                                    size="small"
                                    style={{
                                      background: "transparent",
                                      color: "#ec7623",
                                      textTransform: "none",
                                      margin: 0,
                                    }}
                                    title={
                                      <Uploader
                                        value={ques.mcq_one[j].background_image}
                                        imageURL={
                                          ques.mcq_one[j].background_image
                                        }
                                        name="background_image"
                                        minimal
                                        onChange={(val) => {
                                          handleImageValueOption(i, j, val);
                                        }}
                                      />
                                    }
                                  />

                                  <Button
                                    size="small"
                                    onClick={() => {
                                      removeOption(i, j);
                                    }}
                                    icon={<CloseIcon />}
                                    style={{
                                      background: "transparent",
                                      color: "#ec7623",
                                      textTransform: "none",
                                      margin: 0,
                                    }}
                                    title={""}
                                  />
                                </div>
                                {/* <FontAwesomeIcon
                                icon={"circle"}
                                className="icon"
                                style={{
                                  color: "#652e8d",
                                }}
                              /> */}
                              </div>
                            );
                          })}
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "mcq_many" &&
                          ques.mcq_many.map((op, j) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  width: "auto",
                                  minWidth: "-webkit-fill-available",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }}
                                key={j}
                              >
                                <input
                                  type="checkbox"
                                  value="1"
                                  disabled
                                  style={{ height: "1.3em", width: "2%" }}
                                />

                                <TextField
                                  fullWidth={true}
                                  type="text"
                                  placeholder="Option text"
                                  style={{
                                    borderRight: "transparent",
                                    borderLeft: "transparent",
                                    borderTop: "transparent",
                                    fontWeight: "50px",
                                    fontSize: "20px",
                                    borderRadius: 0,
                                    borderBottom: "1px solid #652e8d",
                                    margin: "5px",
                                  }}
                                  value={ques.mcq_many[j].choice_text}
                                  onChange={(e) => {
                                    handleOptionValue(e.target.value, i, j);
                                  }}
                                />
                                <div
                                  style={{
                                    cursor: "pointer",
                                    position: "relative",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    float: "right",
                                  }}
                                >
                                  <Button
                                    size="small"
                                    onClick={() => {
                                      ques.mcq_many[j].is_answer
                                        ? removeAnswerKey(i, j)
                                        : setAnswerKey(i, j);
                                    }}
                                    style={{
                                      background: "transparent",
                                      color: ques.mcq_many[j].is_answer
                                        ? "#37bc35"
                                        : "#ec7623",
                                      textTransform: "none",
                                      marginLeft: "-5px",
                                    }}
                                    title={
                                      ques.mcq_many[j].is_answer
                                        ? " ✔ - Remove as Answer"
                                        : "Set as Answer"
                                    }
                                  />
                                  <Button
                                    size="small"
                                    style={{
                                      background: "transparent",
                                      color: "#ec7623",
                                      textTransform: "none",
                                      margin: 0,
                                    }}
                                    title={
                                      <Uploader
                                        value={
                                          ques.mcq_many[j].background_image
                                        }
                                        imageURL={
                                          ques.mcq_many[j].background_image
                                        }
                                        name="background_image"
                                        minimal
                                        onChange={(val) => {
                                          handleImageValueOption(i, j, val);
                                        }}
                                      />
                                    }
                                  />

                                  <Button
                                    size="small"
                                    onClick={() => {
                                      removeOption(i, j);
                                    }}
                                    icon={<CloseIcon />}
                                    style={{
                                      background: "transparent",
                                      color: "#ec7623",
                                      textTransform: "none",
                                      margin: 0,
                                    }}
                                    title={""}
                                  />
                                </div>
                                <div>
                                  {checkImageHereOrNotForOption(
                                    op.background_image
                                  ) ? (
                                    <div>
                                      <div
                                        style={{
                                          width: "150px",
                                          display: "flex",
                                          alignItems: "flex-start",
                                          paddingLeft: "20px",
                                        }}
                                      >
                                        <img
                                          src={
                                            typeof op.background_image ===
                                            "string"
                                              ? op.background_image
                                              : op.background_image.preview
                                          }
                                          width="90px"
                                          height="auto"
                                          alt="opt-img"
                                        />

                                        <CloseIcon
                                          style={{
                                            marginLeft: "-15px",
                                            marginTop: "-15px",
                                            zIndex: 999,
                                            backgroundColor: "lightgrey",
                                            color: "grey",
                                          }}
                                          size="small"
                                          onClick={() => {
                                            removeImage(i, j);
                                          }}
                                        />
                                      </div>
                                      <br></br>
                                      <br></br>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        <br />
                        <br />
                        {typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "mcq_one" ||
                        typeChooserOptions.filter(
                          (filteredType) =>
                            filteredType.key === ques.question_type
                        )[0].key === "mcq_many" ? (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              width: "auto",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            {typeChooserOptions.filter(
                              (filteredType) =>
                                filteredType.key === ques.question_type
                            )[0].key === "mcq_one" ? (
                              <input type="radio" disabled />
                            ) : (
                              <input type="checkbox" value="1" disabled />
                            )}
                            <Button
                              size="small"
                              onClick={() => {
                                addOption(i);
                              }}
                              style={{
                                background: "transparent",
                                color: "#ec7623",
                                textTransform: "none",
                                marginLeft: "-5px",
                              }}
                              title={"Add Option"}
                            />
                          </div>
                        ) : null}
                      </OptionsRow>

                      <br />
                      <textarea
                        style={{
                          padding: "10px",
                          margin: "0 25px",
                          width: "90%",
                        }}
                        placeholder={"Feedback : Explanation for answer"}
                        id="feedback"
                        name="feedback"
                        rows="4"
                        cols="50"
                        value={ques.feedback}
                        onChange={(e) => {
                          handleFeedbackValue(e.target.value, i);
                        }}
                      />
                      <br />
                      <input
                        style={{
                          borderRight: "transparent",
                          borderLeft: "transparent",
                          borderTop: "transparent",
                          fontWeight: "50px",
                          fontSize: "20px",
                          borderRadius: 0,
                          borderBottom: "1px solid #652e8d",
                          margin: "5px 25px",
                        }}
                        value={ques.score}
                        onChange={(e) => {
                          handlePointsValue(e.target.value, i);
                        }}
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="5"
                      />
                      <label>Points</label>
                      <hr />
                      <div>
                        <Button
                          size="small"
                          onClick={() => {
                            copyQuestion(i);
                          }}
                          style={{
                            background: "transparent",
                            color: "#ec7623",
                            textTransform: "none",
                          }}
                          title={<CopyIcon />}
                        />
                        <Button
                          size="small"
                          onClick={() => {
                            showAsQuestion(i);
                          }}
                          style={{
                            background: "transparent",
                            color: "#652e8d",
                            textTransform: "none",
                          }}
                          title={
                            <FontAwesomeIcon icon={faEye} className="icon" />
                          }
                        />
                        <Button
                          size="small"
                          onClick={() => {
                            deleteQuestion(i);
                          }}
                          style={{
                            background: "transparent",
                            color: "#652e8d",
                            textTransform: "none",
                          }}
                          title={
                            <FontAwesomeIcon icon={faTrash} className="icon" />
                          }
                        />
                        <Button
                          size="small"
                          style={{
                            background: "transparent",
                            color: "#652e8d",
                            textTransform: "none",
                          }}
                          title={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <p>
                                <strong>Required</strong>
                              </p>
                              <div className="toggle-switch">
                                <input
                                  type="checkbox"
                                  className="toggle-switch-checkbox"
                                  id={"chkbx"}
                                  name={"chkbx"}
                                  checked={ques.required}
                                  onChange={(e) => {
                                    handleRequiredValue(e.target.checked, i);
                                  }}
                                />
                                <label
                                  className="toggle-switch-label"
                                  htmlFor={"chkbx"}
                                >
                                  <span
                                    className={"toggle-switch-inner"}
                                    data-yes={"yes"}
                                    data-no={"no"}
                                  />
                                  <span className={"toggle-switch-switch"} />
                                </label>
                              </div>
                            </div>
                          }
                        />
                      </div>
                    </Panel>
                  </MainContent>
                </Container>
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  }
  return (
    <AccordionWrapper>
      <Collapse
        accordion={true}
        defaultActiveKey="active"
        // expandIcon={expandIcon}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questionsUI(questions)}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div>
          <Button
            variant="contained"
            onClick={addMoreQuestionField}
            icon={<Plus color={"#fff"} />}
            style={{ margin: "5px" }}
            title={"Add Question"}
          />

          <Button
            variant="contained"
            color="primary"
            icon={<SaveIcon color={"#fff"} />}
            onClick={saveQuestions}
            style={{ background: "#ec7623", color: "#fff", margin: "15px" }}
            title={"Save Questions"}
          />
        </div>
      </Collapse>
    </AccordionWrapper>
  );
}
