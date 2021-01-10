import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "constants/constants";
import { tokenConfig } from "helpers";

export const useJobPic = (creator_id) => {
  const [pictureUrl, setPictureUrl] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`${BASE_URL}/organization/`, tokenConfig())
        .then((res) => {
          console.log("industry data", res.data.results);
          let orgProfile = res.data.results.filter(
            (filteredProfile) => filteredProfile.user === creator_id
          )[0].logo;
          setPictureUrl(orgProfile);
        })
        .catch((err) => {
          console.log("Catching Errors:", err);
        });
    } catch (error) {
      console.log("Catching Errors:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pictureUrl;
};
