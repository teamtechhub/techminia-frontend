import React, { useEffect, useState } from "react";
import { axiosInstance, tokenConfig } from "utils/axios";
import { ProfileContent, ProfileCardBody } from "pages/Profile/Profile.style";
import { WizardCard } from "pages/Dashboard/Dashboard.style";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/Authentication/emailVerificationModal";

import "./payment.scss";
import Button from "components/Button/Button";
import { Spinner } from "components/Button/Button.style";
import PaymentContainer from "containers/Payment/Payment";

const cards = [
  {
    id: 1,
    frequency: "Monthly",
    price: 999,
    name: "Basic",
    save: 0,
    mpesa_amount: 1,
    color: "#ac3581",
  },
  {
    id: 2,
    frequency: "Semi Annually",
    price: 5000,
    name: "Plus",
    save: 1000,
    mpesa_amount: 2,
    color: "#ed145b",
  },
  {
    id: 3,
    frequency: "Annually",
    price: 10000,
    name: "Pro",
    save: 2000,
    mpesa_amount: 3,
    color: "#ef5927",
  },
];
export default function Payment() {
  const [initialValues, setInitialValues] = useState({});
  const [selectedContact, setSelectedContact] = useState();
  const [plan, setPlan] = useState();

  const mpesaSocket = new WebSocket(`ws://127.0.0.1:8000/mpesa/`);

  mpesaSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
  };
  mpesaSocket.onclose = function (e) {
    console.log("mpesa connection closed");
  };

  useEffect(() => {
    setInitialValues({
      phone: selectedContact ? selectedContact.contact : null,
      amount: plan ? plan.mpesa_amount : null,
    });
  }, [plan, selectedContact]);

  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext),
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  const validationSchema = Yup.object({
    phone: Yup.string()
      .max(15, "Phone Number too long")
      .min(12, "Phone Number is invalid")
      .required("Phone Number is Required"),
  });

  const onSubmit = (values, { setErrors, setSubmitting }) => {
    axiosInstance
      .post(
        `/mpesa/online/lipa`,
        {
          phone: values.phone.replace(/[*?^${}()]|[-]|[ ]/g, ""),
          amount: plan.mpesa_amount,
          account_reference: `Darasa ${plan.frequency} Payment`,
        },
        tokenConfig()
      )
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          handleModal(
            "Payment Processing ✔",
            <>
              <Spinner />
              <br />
              <p>Check Phone {res.data.phone} and complete payment</p>
            </>
          );
        }

        setSubmitting(false);
      })
      .error((err) => console.log(err));
  };
  return (
    <div style={{ padding: "0 0 60px 0" }}>
      <section className="section-plans" id="section-plans">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">Select a Payment Plan</h2>
        </div>

        <div className="row">
          {cards.map((card, i) => {
            return (
              <div className="col-1-of-3" key={i}>
                <div className="card">
                  <div className={`card__side card__side--front-${i + 1}`}>
                    <div className={`card__title card__title--${i + 1}`}>
                      <i className="fas fa-paper-plane"></i>
                      <h4 className="card__heading">{card.name}</h4>
                    </div>

                    {/* <div className="card__details">
                  <ul>
                    <li>1 Website</li>
                    <li>50 GB SSD Storage</li>
                    <li>Unmetered Bandwidth</li>
                    <li>Free SSL Certificate</li>
                    <li>1 Included Domain</li>
                    <li>1 Included Domain</li>
                  </ul>
                </div> */}
                  </div>
                  <div
                    className={`card__side card__side--back card__side--back-${
                      i + 1
                    }`}
                  >
                    <div className="card__cta">
                      <div className="card__price-box">
                        <p className="card__price-only">Only</p>
                        <p className="card__price-value">
                          KES. {card.price}/{card.frequency}*
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          setPlan(card);
                        }}
                        className={"btn btn--white"}
                        title={"Select"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <PaymentContainer setSelectedContact={setSelectedContact} />
      </section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form
              style={{
                position: "sticky",
                bottom: 0,
                width: "100%",
              }}
            >
              <ProfileContent>
                <WizardCard style={{ minHeight: 0, margin: 0 }}>
                  <ProfileCardBody style={{ textAlign: "center", padding: 0 }}>
                    <div
                      style={{
                        display: "inline-flex",
                        verticalAlign: "middle",
                      }}
                    >
                      <div
                        style={{
                          display: "block",
                          fontSize: "12px",
                        }}
                      >
                        {plan && (
                          <p>
                            <strong>Plan : </strong>
                            {plan.name}({plan.price})
                          </p>
                        )}

                        {selectedContact && (
                          <p>
                            <strong>Number : </strong>
                            {selectedContact.name}({selectedContact.contact})
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="small"
                      title={formik.isSubmitting ? "processing... " : "Pay"}
                      isSubmitting={formik.isSubmitting}
                      style={{
                        fontSize: 15,
                        color: "#fff",
                        float: "right",
                        margin: "auto",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                      }}
                      // disabled={!formik.isValid}
                    />
                  </ProfileCardBody>
                </WizardCard>
              </ProfileContent>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
