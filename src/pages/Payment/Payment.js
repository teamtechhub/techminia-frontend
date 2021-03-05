import React, { useContext, useEffect, useState } from "react";
import { axiosInstance, tokenConfig } from "utils/axios";
import { WizardCard } from "pages/Dashboard/Dashboard.style";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { openModal } from "@redq/reuse-modal";
import "./payment.scss";
import Button from "components/Button/Button";
import PaymentContainer from "containers/Payment/Payment";
import PPModal from "./PPModal";
import LoadingIndicator from "components/LoadingIndicator";
import { addObjectToLocalStorageObject } from "utils";
import { AuthContext } from "contexts/auth/auth.context";
import { apiErrorHandler } from "utils";
import { useAlert } from "react-alert";
import {
  ProfileCard,
  ProfileContent,
  ProfileCardBody,
  CardRow,
  ListGroup,
  ProfileCardHead,
  Li,
  B,
  A,
  ProfileListCol,
  ProfileListTitle,
  ProfileListText,
} from "pages/Profile/Profile.style";
import moment from "moment";
import { BASE_WEBSOCKET_URL } from "constants/constants";

const cards = [
  {
    id: 0,
    frequency: "Daily",
    price: 50,
    name: "Basic",
    save: 0,
    mpesa_amount: 50,
    color: "#ac3581",
  },
  {
    id: 1,
    frequency: "Monthly",
    price: 999,
    name: "Plus",
    save: 0,
    mpesa_amount: 999,
    color: "#ac3581",
  },
  {
    id: 2,
    frequency: "Semi Annually",
    price: 5000,
    name: "Pro",
    save: 1000,
    mpesa_amount: 5000,
    color: "#ed145b",
  },
  // {
  //   id: 3,
  //   frequency: "Annually",
  //   price: 10000,
  //   name: "Ultimate",
  //   save: 2000,
  //   mpesa_amount: 4,
  //   color: "#ef5927",
  // },
];

export default function Payment() {
  const {
    authState: { profile },
    authDispatch,
  } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState({});
  const [selectedContact, setSelectedContact] = useState();
  const [plan, setPlan] = useState();
  const alert = useAlert();

  const newConnection = (transaction_id) => {
    const mpesaSocket = new WebSocket(
      `${BASE_WEBSOCKET_URL}/mpesa/${
        transaction_id ? transaction_id + "/" : ""
      }`
    );

    mpesaSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      if (data.response) {
        if (data.response.result_description === "Request cancelled by user") {
          handleModal(
            "Payment Unsuccessful",
            <div>😔 The request was cancelled by {selectedContact.contact}</div>
          );
        } else if (
          data.response.result_description ===
          "The service request is processed successfully."
        ) {
          handleModal(
            "😃 Successfully Paid. ✔",
            <div
              style={{
                color: "green",
              }}
            >
              Receipt Number: {data.response.mpesa_receipt_number}
            </div>
          );
          handleUpdateSubscription();
        } else {
          handleModal(
            "Oops! There seems to be a problem.",
            <div
              style={{
                color: "orange",
              }}
            >
              {data.response.result_description}
            </div>
          );
        }
      }
    };
    mpesaSocket.onclose = function (e) {
      console.log("mpesa connection closed");
    };
  };

  useEffect(() => {
    setInitialValues({
      phone: selectedContact ? selectedContact.contact : null,
      amount: plan ? plan.mpesa_amount : null,
    });
  }, [plan, selectedContact]);

  const handleUpdateSubscription = () => {
    axiosInstance
      .get(`/auth/profile/`, tokenConfig())
      .then(async (res) => {
        let auth_profile = res.data;
        addObjectToLocalStorageObject("darasa_auth_profile", auth_profile);
        alert.success("Updating ...");
        authDispatch({
          type: "UPDATE",
          payload: {
            profile: auth_profile,
          },
        });
      })
      .catch((err) => {
        alert.error(apiErrorHandler(err));
      });
  };

  const handleModal = (text, subtext) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: PPModal,
      closeComponent: "",
      componentProps: { text: text, subtext: subtext },
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
      .min(12, "Phone Number is invalid"),
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
        if (res.status === 200) {
          newConnection(res.data.id);
          handleModal(
            "Payment Processing",
            <div>
              <LoadingIndicator />
              <br />
              <p>Check Phone {res.data.phone} and complete payment</p>
            </div>
          );
        }

        setSubmitting(false);
      })
      .error((err) => console.log(err));
  };

  return (
    <>
      {profile.subscription && profile.subscription.state.toString() !== "1" ? (
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
                      <ProfileCardBody
                        style={{ textAlign: "center", padding: 0 }}
                      >
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
                                {selectedContact.name}({selectedContact.contact}
                                )
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
                          disabled={!plan || !selectedContact}
                        />
                      </ProfileCardBody>
                    </WizardCard>
                  </ProfileContent>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <ProfileCard>
          <ProfileCardHead className="card-topline">
            <header>Account Details</header>
          </ProfileCardHead>
          <ProfileCardBody>
            <ListGroup>
              <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                <B>Status</B>
                <A>Active</A>
              </Li>
              <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                <B>Subcription Package</B>
                <A>{profile.subscription.reference}</A>
              </Li>
              <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                <B>Start Date</B>
                {/* <A>{moment(profile.subscription.start)}</A> */}
                <A>{moment(profile.subscription.start).format("D MMM YYYY")}</A>
              </Li>
              <Li style={{ padding: 0, backgroundColor: "#ffffff00" }}>
                <B>Expiry Date</B>
                <A>{moment(profile.subscription.end).format("D MMM YYYY")}</A>
              </Li>
            </ListGroup>
            <CardRow>
              <ProfileListCol
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  flex: "100%",
                  maxWidth: "100%",
                }}
              >
                <ProfileListTitle style={{ margin: "0 10px" }}>
                  {moment(profile.subscription.end, "YYYY-MM-DD").diff(
                    moment(new Date(), "YYYY-MM-DD"),
                    "days"
                  )}
                </ProfileListTitle>
                <ProfileListText>Days to Next Payment</ProfileListText>
              </ProfileListCol>
            </CardRow>
          </ProfileCardBody>
        </ProfileCard>
      )}
    </>
  );
}
