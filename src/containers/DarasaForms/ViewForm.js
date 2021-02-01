import Loader from "components/Loader/Loader";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { axiosInstance, tokenConfig } from "utils/axios";
import { FormHeader } from "./df.style";
import { ProfileContent, ProfileCardHead } from "pages/Profile/Profile.style";
import { WizardCard } from "pages/Dashboard/Dashboard.style";

export default function ViewForm() {
  const match = useRouteMatch();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/form/${match.params.formID}`, tokenConfig())
      .then(async (res) => {
        await setForm(res.data);
        setLoading(false);
      });
  }, [match.params.formID]);
  console.log(form);

  return (
    <div style={{ alignItems: "center", margin: "0 auto" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProfileContent style={{ width: "100%" }}>
            <WizardCard style={{ minHeight: 0 }}>
              <ProfileCardHead
                className="card-topline"
                style={{ textAlign: "center" }}
              >
                <header>{form.title}</header>
              </ProfileCardHead>
            </WizardCard>
          </ProfileContent>
          <div
            style={{
              display: "flex",
              margin: "0 auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormHeader
              style={{
                backgroundColor: form.background_color,
                backgroundImage: `url(${
                  form.background_image ||
                  "https://lh3.googleusercontent.com/A45mBe_6UR6DnieoI4xZvX6oImdxRaaugLOTgaU0h77OSFPc1Q0R_h2HTdbfLIpAM6TQ_iAcEe4E7hDPsvMFlVmFHIqV2VXmZIroZQ3POBofXMBr7y8Xz08PMt9YXBb00quDYCyh92KqY9Zk"
                })`,
              }}
            />
            {form.questions.length > 0 &&
              form.questions.questions.map((ques, i) => {
                return (
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
                    {ques.question_type === "mcq_one"
                      ? ques.mcq_one.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <input
                                type="radio"
                                disabled
                                style={{
                                  height: "1.3em",
                                  margin: "2px 5px",
                                }}
                              />
                              <p style={{ color: "#555555" }}>
                                {ques.mcq_one[j].choice_text}
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
                    {ques.question_type === "mcq_many"
                      ? ques.mcq_many.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <input
                                type="checkbox"
                                value="1"
                                disabled
                                style={{
                                  height: "1.3em",
                                  margin: "2px 5px",
                                }}
                              />
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
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
