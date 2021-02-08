import AccordionWrapper from "components/Accordion/Accordion.style";
import { SaveIcon, Plus } from "components/AllSvgIcon";
import Button from "components/Button/Button";

import useOnClickOutside from "components/Popover/useOnClickOutside";

import { indexOf } from "lodash";
import Collapse from "rc-collapse";
import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useRouteMatch } from "react-router-dom";
import { toFormData } from "utils";
import { formTokenConfig } from "utils/axios";
import { tokenConfig } from "utils/axios";
import { axiosInstance } from "utils/axios";
import questionsUI from "./questionsUI";
import { Container } from "./df.style";

// import ImageUplaodModel from "./ImageUploadModel";

export default function QuestionTab({ formDetails }) {
  const match = useRouteMatch();
  const alert = useAlert();

  const [questions, setQuestions] = useState([]);
  const [loadForm, setLoadForm] = useState(false);
  const [oldQuestions, setOldQuestions] = useState(formDetails.questions);
  const [isSelectActive, setIsSelectActive] = useState(false);
  // Popover State
  const [state, setState] = useState(false);
  // Ref
  const ref = useRef();
  const newQuestion = {
    question: "Question",
    background_image: null,
    background_image_alt: "",
    order: questions.length + 1,
    mcq_many: [
      {
        is_answer: false,
        choice_text: "Option 1",
        background_image: null,
        background_image_alt: "",
      },
    ],
    mcq_one: [
      {
        is_answer: false,
        choice_text: "Option 1",
        background_image: null,
        background_image_alt: "",
      },
    ],
    question_type: "mcq_one",
    binary: [{ answer_option: "yes" }],
    txt: [
      {
        answer_text: "Short Answer",
        background_image: null,
        background_image_alt: "",
      },
    ],
    lng_txt: [
      {
        answer_text: "Long Answer",
        background_image: null,
        background_image_alt: "",
      },
    ],
    score: 0,
    feedback: "Feedback : Explanation for answer",
    required: false,
    open: questions.length === 0 ? false : true,
  };

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
    console.log("first useEffect()");
    if (formDetails.questions !== undefined) {
      //console.log(props.formData.questions.length);
      if (formDetails.questions.length === 0) {
        setQuestions([newQuestion]);
      } else {
        setQuestions(formDetails.questions);
      }
    }
    window.addEventListener("click", handleDocumentClick);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDetails]);

  useEffect(() => {
    axiosInstance
      .get(`/form/${match.params.formID}`, tokenConfig())
      .then(async (res) => {
        await setOldQuestions(res.data.questions);
      });
  }, [match.params.formID]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldQuestions]);

  const updateQuestions = async (d, res) => {
    const qs = questions;
    let newQ = { ...res, open: false };
    console.log(qs);
    console.log(indexOf(qs, d));
    await qs.splice(indexOf(qs, d), 1);
    await setQuestions((qs) => [...qs, newQ, newQuestion]);
    // await setQuestions((questions) => [...questions, newQuestion])
    await setOldQuestions((qs) => [...qs, newQ]);
    setLoadForm(!loadForm);
  };

  const handleEditAddQuestion = async (quiz, type) => {
    const qs = [...questions];

    if (qs.filter(({ open }) => open === true).length > 0) {
      let all_data =
        type === "edit_question"
          ? await quiz
          : await qs.find(({ open }) => open === true);

      const formData = await toFormData({
        old: all_data.id
          ? oldQuestions.find(({ id }) => id === all_data.id)
          : false,
        new: all_data,
      });
      all_data.order = (await indexOf(qs, all_data)) + 1;
      if (type === "edit_question") {
        if (all_data.id) {
          axiosInstance
            .patch(`/question/${all_data.id}/`, formData, formTokenConfig())
            .then(async (res) => {
              updateQuestions(all_data, res.data);
              alert.success(`${res.data.question} Saved`);
            });
        } else {
          axiosInstance
            .post(`/question/`, formData, formTokenConfig())
            .then(async (res) => {
              axiosInstance
                .patch(
                  `/form/${match.params.formID}/`,
                  { questions: [res.data.id] },
                  tokenConfig()
                )
                .then((response) => {
                  console.log("response", response);
                  if (response.status === 200) {
                    updateQuestions(all_data, res.data);
                    alert.success("Question added");
                  }
                });
            });
        }
      } else if (type === "add_question") {
        if (qs.filter((filteredQS) => filteredQS.open === true).length !== 0) {
          if (all_data.id) {
            axiosInstance
              .patch(`/question/${all_data.id}/`, formData, formTokenConfig())
              .then(async (res) => {
                updateQuestions(all_data, res.data);
                alert.success("Question Editted");
              });
          } else {
            axiosInstance
              .post(`/question/`, formData, formTokenConfig())
              .then((res) => {
                axiosInstance
                  .patch(
                    `/form/${match.params.formID}/`,
                    { questions: [res.data.id] },
                    tokenConfig()
                  )
                  .then((response) => {
                    console.log("response", response);
                    if (response.status === 200) {
                      updateQuestions(all_data, res.data);
                      alert.success("Question added");
                    }
                  });
              });
          }
        }
      }
    }
  };

  useOnClickOutside(ref, () => setState(false));

  async function saveQuestions() {
    console.log("auto saving questions initiated");

    for (let q = 0; q < questions.length; q++) {
      const element = await questions[q];
      const formData = await toFormData({
        old: oldQuestions.find(({ id }) => id === element.id),
        new: element,
      });
      if (element.id) {
        axiosInstance
          .patch(`/question/${element.id}/`, formData, formTokenConfig())
          .then(async (res) => {
            alert.success(`${res.data.question} Saved`);
          });
      } else {
        axiosInstance
          .post(`/question/`, formData, formTokenConfig())
          .then(async (res) => {
            alert.success(`${res.data.question} Added`);
          });
      }
    }
  }

  async function addMoreQuestionField() {
    if (questions.filter((filteredQS) => filteredQS.open === true).length > 0) {
      await handleEditAddQuestion(null, "add_question");
      expandCloseAll();
    } else {
      await expandCloseAll();

      await setQuestions((questions) => [...questions, newQuestion]);
    }
  }

  async function copyQuestion(i) {
    console.log("copying", i);
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
      mcq_many: mcqManyOptions,
      mcq_one: mcqOneOptions,
      question_type: qs[i].question_type,
      binary: { answer_option: qs[i].binary.answer_option },
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
    console.log(newQuestion);
    console.log(questions);
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
    console.log("deleting");
    const qs = questions;
    qs[i].open = await false;
    console.log(qs, i);
    if (questions.length > 1) {
      await qs.splice(i, 1);

      setQuestions(qs);
      expandCloseAll();
    } else {
      setQuestions(qs);
    }

    console.log(qs);
  }
  async function setAnswerKey(i, j) {
    var optionsOfQuestion = [...questions];
    console.log("setting answer key");
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
    console.log("removing answer key");
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
    optionsOfQuestion[i].question_type = type;
    setQuestions(optionsOfQuestion);
    console.log("the type", type);
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
        console.log("Max  5 options ");
      }
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      if (optionsOfQuestion[i].mcq_one.length < 5) {
        optionsOfQuestion[i].mcq_one.push({
          choice_text: "Option " + (optionsOfQuestion[i].mcq_one.length + 1),
        });
      } else {
        console.log("Max  5 options ");
      }
    }

    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  }

  function removeOption(i, j) {
    console.log("handling remove opt");
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].question_type === "mcq_many") {
      if (optionsOfQuestion[i].mcq_many.length > 1) {
        optionsOfQuestion[i].mcq_many.splice(j, 1);
        setQuestions(optionsOfQuestion);
        console.log(i + "__" + j);
      }
    } else if (optionsOfQuestion[i].question_type === "mcq_one") {
      if (optionsOfQuestion[i].mcq_one.length > 1) {
        optionsOfQuestion[i].mcq_one.splice(j, 1);
        setQuestions(optionsOfQuestion);
        console.log(i + "__" + j);
      }
    }
  }

  async function expandCloseAll() {
    console.log("closing all");
    var qs = questions;
    for (let j = 0; j < qs.length; j++) {
      questions[j].open = false;
    }
    setQuestions(qs);
  }

  async function handleExpand(i) {
    let qs = [...questions];
    [].splice();

    if (qs[i].open === false && qs[i].id) {
      await handleEditAddQuestion(
        qs.find((filteredQS) => filteredQS.open === true),
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
    setQuestions(qs);
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
                {questionsUI(
                  questions,
                  // typeChooserOptions,

                  copyQuestion,
                  removeImage,
                  deleteQuestion,
                  setAnswerKey,
                  removeAnswerKey,

                  handleTextImage,
                  handleImageValue,
                  handleQuestionType,
                  handleQuestionValue,
                  handleBinaryValue,
                  handleRequiredValue,
                  handleShortValue,
                  handleLongValue,
                  handleOptionValue,
                  handleFeedbackValue,
                  handlePointsValue,

                  handleDocumentClick,
                  handleToggle,
                  ref,

                  handleExpand,
                  removeOption,
                  showAsQuestion,
                  addOption,
                  handleImageValueOption,

                  setIsSelectActive,
                  isSelectActive
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div
          style={{
            position: "sticky",
            bottom: 0,
            width: "100%",
            maxWidth: "950px",
            borderRadius: 0,
          }}
        >
          <Container
            style={{
              borderRadius: 0,
              width: "100%",
              display: "inline-flex",
              verticalAlign: "middle",
              alignItems: "center",
              margin: "0px auto",
            }}
          >
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
              style={{ background: "#ec7623", color: "#fff" }}
              title={"Save Questions"}
            />
          </Container>
        </div>
      </Collapse>
    </AccordionWrapper>
  );
}
