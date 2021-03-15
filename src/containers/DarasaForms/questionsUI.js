import React, { useEffect, useState } from "react";
import Button from "components/Button/Button";
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
import Uploader from "components/Uploader/Uploader";
import { Draggable } from "react-beautiful-dnd";
import {} from "components/AllSvgIcon";
import { CopyIcon, CloseIcon, DragDropIcon } from "components/AllSvgIcon";
import { Panel } from "rc-collapse";
import TextField from "components/forms/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle,faCheckSquare, faEye, faTrash } from '@fortawesome/fontawesome-free-solid'


const typeChooserOptions = [
  // {
  //   key: "txt",
  //   Value: "Short Text",
  //   icon: <FontAwesomeIcon icon="align-left" className="icon" />,
  // },
  // {
  //   key: "lng_txt",
  //   Value: "Long Answer",
  //   icon: <FontAwesomeIcon icon="paragraph" className="icon" />,
  // },
  {
    the_key: "mcq_one",
    Value: "Multiple Choice",
    icon: <FontAwesomeIcon icon={faCheckCircle} className="icon" />,
  },
  {
    the_key: "mcq_many",
    Value: "Check Boxes",
    icon: <FontAwesomeIcon icon={faCheckSquare} className="icon" />,
  },
  // {
  //   the_key: "binary",
  //   Value: "Yes/No",
  //   icon: <FontAwesomeIcon icon="check" className="icon" />,
  // },
];

export default function QuestionsUI(
  qns,
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
) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    setQuestions(qns);
  }, [qns]);
  function checkImageHereOrNotForQuestion(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "" || gg === null) {
      return false;
    } else {
      return true;
    }
  }

  function checkImageHereOrNotForOption(gg) {
    // console.log(gg);
    if (gg === undefined || gg === "" || gg === null) {
      return false;
    } else {
      return true;
    }
  }

  function handleTypeChooser(ques, opts) {
    if (opts.length > 0) {
      const opt = opts.find(({ the_key }) => the_key === ques.question_type);
      return opt.the_key;
    } else {
      return null;
    }
  }

  function handleFilter(ques, opts) {
    const opt = opts && opts.find((fqs) => fqs.the_key === ques.question_type);
    const fltr =
      opt.the_key === "mcq_one" ? (
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
      );
    return fltr;
  }
  return (
    <div>
      {typeChooserOptions &&
        questions &&
        questions.length > 0 &&
        questions.map((ques, i) => {
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
                          isActive={questions[i].open}
                          style={{
                            position: "relative",
                          }}
                          header={
                            questions[i].open ? null : (
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

                                <h6 style={{ margin: "10px 0" }}>
                                  {i + 1}. {ques.question}
                                </h6>

                                {ques.background_image ? (
                                  <div>
                                    <img
                                      src={
                                        typeof ques.background_image ===
                                        "string"
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
                                          <p
                                            style={{
                                              display: "inline-flex",
                                              verticalAlign: "middle",
                                              color: ques.mcq_one[j].is_answer
                                                ? "#37bc35"
                                                : "#555555",
                                            }}
                                          >
                                            {ques.mcq_one[j].is_answer
                                              ? " ✔ "
                                              : handleFilter(
                                                  ques,
                                                  typeChooserOptions
                                                )}
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
                                          <p
                                            style={{
                                              display: "inline-flex",
                                              verticalAlign: "middle",
                                              color: ques.mcq_many[j].is_answer
                                                ? "#37bc35"
                                                : "#555555",
                                            }}
                                          >
                                            {ques.mcq_many[j].is_answer
                                              ? " ✔ "
                                              : handleFilter(
                                                  ques,
                                                  typeChooserOptions
                                                )}
                                            {ques.mcq_many[j].choice_text}
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
                                {ques.question_type === "lng_txt" &&
                                  ques.lng_txt.map((op, l) => (
                                    <div key={l}>
                                      <div style={{ display: "flex" }}>
                                        <p style={{ color: "#555555" }}>
                                          {op.answer_text}
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
                                  ))}
                                {ques.question_type === "txt" &&
                                  ques.txt.map((op, t) => (
                                    <div key={t}>
                                      <div style={{ display: "flex" }}>
                                        <p style={{ color: "#555555" }}>
                                          {op.answer_text}
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
                                  ))}
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
                                      <span
                                        className={"toggle-switch-switch"}
                                      />
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
                                            typeChooserOptions.find(
                                              (filteredType) =>
                                                filteredType.the_key ===
                                                ques.question_type
                                            ).icon
                                          }
                                        </PopUpOptionIcon>
                                        <span>
                                          {
                                            typeChooserOptions.find(
                                              (filteredType) =>
                                                filteredType.the_key ===
                                                ques.question_type
                                            ).Value
                                          }
                                        </span>
                                      </div>
                                    ) : null}
                                  </PopupOption>
                                </SelectBoxContent>
                                <PopUp
                                  className={isSelectActive ? "active" : ""}
                                  onClick={handleDocumentClick}
                                  ref={ref}
                                >
                                  {typeChooserOptions.map((opt, o) => {
                                    return (
                                      <PopupOption
                                        onClick={(e) => {
                                          handleQuestionType(opt.the_key, i);
                                          setIsSelectActive(false);
                                          handleToggle(e);
                                        }}
                                        key={o}
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
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "txt" && (
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
                              </div>
                            )}
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "lng_txt" && (
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
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "binary" && (
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
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "mcq_one" &&
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
                                            value={
                                              ques.mcq_one[j].background_image
                                            }
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
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "mcq_many" &&
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
                            {handleTypeChooser(ques, typeChooserOptions) ===
                              "mcq_one" ||
                            handleTypeChooser(ques, typeChooserOptions) ===
                              "mcq_many" ? (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  width: "auto",
                                  paddingTop: "5px",
                                  paddingBottom: "5px",
                                }}
                              >
                                {handleFilter(ques, typeChooserOptions)}
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
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className="icon"
                                />
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
                                        handleRequiredValue(
                                          e.target.checked,
                                          i
                                        );
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
                                      <span
                                        className={"toggle-switch-switch"}
                                      />
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
        })}
    </div>
  );
}
