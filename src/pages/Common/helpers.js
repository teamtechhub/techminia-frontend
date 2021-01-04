import React from "react";
import axios from "axios";
import Error500 from "components/Error/Error500";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";
import { openModal } from "@redq/reuse-modal";
import EmailVerificationModal from "containers/SignInOutForm/emailVerificationModal";
import { addToLocalStorageArray } from "helpers";

export const categorySelector = (category) => {
  switch (category) {
    case "fulltime":
      return "jobs";
    case "Gig":
      return "gigs";
    case "parttime":
      return "jobs";
    case "volunteering":
      return "jobs";
    case "Volunteering":
      return "jobs";
    case "internship":
      return "internships";
    case "Internship":
      return "internships";
    case "gig":
      return "gigs";

    default:
      throw new Error(`Unsupported Category Type: ${category}`);
  }
};

export const getOrgLogo = (creator_id) => {
  var orgProfile = "";
  try {
    axios
      .get(`${BASE_URL}/organization/`, tokenConfig())
      .then((res) => {
        const filteredData = res.data.results.filter(
          (filteredProfile) => filteredProfile.user === creator_id
        )[0];
        orgProfile = filteredData.logo
          ? filteredData.logo
          : axios
              .get(`${BASE_URL}/individual/`, tokenConfig())
              .then((res) => {
                const filteredData = res.data.results.filter(
                  (filteredProfile) => filteredProfile.user === creator_id
                )[0];
                orgProfile = filteredData.image;
              })
              .catch((err) => {
                console.log("Catching Errors:", err);
                return <Error500 err={err} />;
              });
        // console.log("orgProfile", orgProfile);
      })
      .catch((err) => {
        console.log("Catching Errors:", err);
        return <Error500 err={err} />;
      });
  } catch (error) {
    return <Error500 err={error} />;
  }
  console.log("orgProfile", orgProfile);
  return { orgProfile };
  // return "http://127.0.0.1:8000/static/img/default.jpg";
};

export const handleModal = (text, subtext, fx) => {
  openModal({
    show: true,
    overlayClassName: "quick-view-overlay",
    closeOnClickOutside: true,
    component: () => EmailVerificationModal(text, subtext, fx),
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

export const randomJob = (jobs) => {
  if (jobs) {
    const randomInt = Math.floor(Math.random() * Math.floor(jobs.length));
    console.log("randomInt", randomInt);
    return randomInt;
  } else {
    return 0;
  }
};

export const getApplications = () => {
  try {
    axios
      .get(`${BASE_URL}/jobs/applications/`, tokenConfig())
      .then(async (res) => {
        console.log("applicant data", res.data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const applications = res.data.results
          .filter(
            (filteredApplications) =>
              filteredApplications.applicant ===
              JSON.parse(localStorage.getItem("thedb_auth_profile"))["id"]
          )
          // eslint-disable-next-line array-callback-return
          .reduce((arr, b) => {
            arr.push(b.job);
            return arr;
          }, []);
        localStorage.removeItem("thedb_applications");
        console.log("applications", applications);
        addToLocalStorageArray("thedb_applications", applications);
      })
      .catch((err) => {
        console.log("error", err);
      });
  } catch (error) {
    return <Error500 err={error} />;
  }
};

export const generateHTML = (str) => {
  // newDOM = new DOMParser().parseFromString(str,"text/html")
  const htmlFragment = document.createRange().createContextualFragment(str);
  return htmlFragment;
};
