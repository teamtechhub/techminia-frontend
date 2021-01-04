/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext, useCallback } from "react";
import { CardWrapper } from "./style";
import axios from "axios";
import { BASE_URL, CURRENCY } from "constants/constants";
import { tokenConfig } from "helpers";
import ImageWrapper from "components/Image/Image";
import {
  LeftContent,
  ListingLogo,
  ListingTitle,
  H4,
  TypeList,
  ListSpan,
  ListingIcons,
} from "styles/pages.style";
import { SearchIcon, RefundIcon } from "components/AllSvgIcon";
import Button from "components/Button/Button";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import ApplicationModal from "pages/common/ApplicationModal";
import Loader from "components/Loader/Loader";
import { useStickyDispatch } from "contexts/app/app.provider";
import Error500 from "components/Error/Error500";
import { useHistory } from "react-router-dom";
import { categorySelector } from "pages/common/helpers";

function View({ type, name, isBusiness, isIndividual }) {
  const {
    authState: { profile },
  } = useContext(AuthContext);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/jobs/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          setJobs(res.data.results);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Catching Errors:", err);
          setError(err);
        });
    }, 2000);
  }, []);

  const useDispatch = useStickyDispatch();
  const setManage = useCallback(() => useDispatch({ type: "MANAGE" }), [
    useDispatch,
  ]);
  const setPost = useCallback(() => useDispatch({ type: "POST" }), [
    useDispatch,
  ]);

  const toggleManage = (category, id) => {
    setManage();
    history.push(`/dashboard/${category}/${id}`);
  };
  const togglePost = () => {
    setPost();
  };
  const handleApplication = (jobId) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => ApplicationModal(jobId),
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
  const handleModal = (text, subtext, fxn) => {
    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: () => EmailVerificationModal(text, subtext, fxn),
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
  if (error) {
    return <Error500 err={error} />;
  }

  return (
    <CardWrapper>
      <H4>
        s Listing{" "}
        <Button
          onClick={() =>
            profile.is_verified
              ? togglePost()
              : handleModal("Confirm Email First to post a gig")
          }
          size="small"
          title="Post a "
          // disabled={!profile.is_verified}
          style={{
            fontSize: 15,
            color: "#652e8d",
            backgroundColor: profile.is_verified ? "#ec7623" : "#f2f2f2",
            float: "right",
          }}
        />
      </H4>
      {loading ? (
        <Loader />
      ) : (
        <LeftContent>
          {jobs !== null && jobs.length > 0 ? (
            <ul>
              {jobs
                .filter(
                  (filteredJob) =>
                    filteredJob.job_type === "gig" ||
                    filteredJob.job_type === ""
                )
                .map((job, index) => (
                  <>
                    {job !== null && job !== undefined ? (
                      <li key={index} className={`${job.job_type}`}>
                        <section>
                          <ListingLogo>
                            <ImageWrapper
                              url={job.companyLogo}
                              alt={"company logo"}
                            />
                          </ListingLogo>
                          <ListingTitle>
                            <h3>
                              {job.title}

                              <TypeList>
                                <ListSpan className={`${job.job_type}`}>
                                  {job.job_type}
                                </ListSpan>
                                {job.creator === profile.id ? (
                                  <Button
                                    onClick={() =>
                                      toggleManage(
                                        categorySelector(job.job_type),
                                        job.id
                                      )
                                    }
                                    size="small"
                                    title={`Manage `}
                                    disabled={!profile.is_verified}
                                    style={{
                                      fontSize: 15,
                                      color: "#652e8d",
                                      backgroundColor: "#ec7623",
                                      float: "right",
                                      height: "29px",
                                      margin: "0 0 0 10px",
                                    }}
                                  />
                                ) : (
                                  <>
                                    {localStorage
                                      .getItem("thedb_applications")
                                      .includes(job.id) ? (
                                      <Button
                                        onClick={() =>
                                          profile.is_verified
                                            ? handleApplication(job.id)
                                            : handleModal(
                                                `Confrim email to Apply`,
                                                `or`,
                                                <Button
                                                  onClick={() =>
                                                    openModal({
                                                      show: true,
                                                      overlayClassName:
                                                        "quick-view-overlay",
                                                      closeOnClickOutside: true,
                                                      component: ResendEmail,
                                                      closeComponent: "",
                                                      config: {
                                                        enableResizing: false,
                                                        disableDragging: true,
                                                        className:
                                                          "quick-view-modal",
                                                        width: 458,
                                                        height: "auto",
                                                      },
                                                    })
                                                  }
                                                  size="small"
                                                  title={`Send email again`}
                                                  style={{
                                                    fontSize: 15,
                                                    color: "#fff",
                                                    backgroundColor: "#e618a5",
                                                    margin: "10px 10px",
                                                  }}
                                                />
                                              )
                                        }
                                        size="small"
                                        title={`Applied ✔`}
                                        disabled={true}
                                        style={{
                                          fontSize: 15,
                                          color: "#652e8d",
                                          backgroundColor: "#f2f2f2",
                                          float: "right",
                                          height: "29px",
                                          margin: "0 0 0 10px",
                                        }}
                                      />
                                    ) : (
                                      <Button
                                        onClick={() =>
                                          profile.is_verified
                                            ? handleApplication(job.id)
                                            : handleModal(
                                                `Confrim email to Apply`,
                                                `or`,
                                                <Button
                                                  onClick={() =>
                                                    openModal({
                                                      show: true,
                                                      overlayClassName:
                                                        "quick-view-overlay",
                                                      closeOnClickOutside: true,
                                                      component: ResendEmail,
                                                      closeComponent: "",
                                                      config: {
                                                        enableResizing: false,
                                                        disableDragging: true,
                                                        className:
                                                          "quick-view-modal",
                                                        width: 458,
                                                        height: "auto",
                                                      },
                                                    })
                                                  }
                                                  size="small"
                                                  title={`Send email again`}
                                                  style={{
                                                    fontSize: 15,
                                                    color: "#fff",
                                                    backgroundColor: "#e618a5",
                                                    margin: "10px 10px",
                                                  }}
                                                />
                                              )
                                        }
                                        size="small"
                                        title={`Apply`}
                                        // disabled={!profile.is_verified}
                                        style={{
                                          fontSize: 15,
                                          color: "#652e8d",
                                          backgroundColor: profile.is_verified
                                            ? "#ec7623"
                                            : "#f2f2f2",
                                          float: "right",
                                          height: "29px",
                                          margin: "0 0 0 10px",
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                              </TypeList>
                            </h3>
                            <ListingIcons>
                              <li>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: job.description,
                                  }}
                                />
                              </li>
                              <li>
                                <SearchIcon />
                                {job.location}
                              </li>
                              <li>
                                <RefundIcon />
                                {CURRENCY}

                                {job.salary}
                              </li>
                            </ListingIcons>
                          </ListingTitle>
                        </section>
                      </li>
                    ) : (
                      <div>Sorry, No s posted recently</div>
                    )}
                  </>
                ))}
            </ul>
          ) : (
            <div>Sorry No s posted recently</div>
          )}
        </LeftContent>
      )}
    </CardWrapper>
  );
}

export default View;
