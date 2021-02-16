import React from "react";
import facebook from "../../images/home_page/social-icons/facebook.png";
import pintrest from "../../images/home_page/social-icons/pintrest.png";
import tiktok from "../../images/home_page/social-icons/tiktok.png";
import twitter from "../../images/home_page/social-icons/twitter.png";
import youtube from "../../images/home_page/social-icons/youtube.png";
import linkedin from "../../images/home_page/social-icons/linkedin.png";
import instagram from "../../images/home_page/social-icons/instagram.png";

function getIconUrlFromName(name) {
  let icon;
  switch (name) {
    case "facebook":
      icon = "../../images/home_page/social-icons/facebook.png";
      break;

    case "twitter":
      icon = "../../images/home_page/social-icons/twitter.png";
      break;

    case "whatsapp":
      icon = "../../images/home_page/social-icons/whatsapp.png";
      break;

    case "tiktok":
      icon = "../../images/home_page/social-icons/tiktok.png";
      break;
    case "youtube":
      icon = "../../images/home_page/social-icons/youtube.png";
      break;

    case "pintrest":
      icon = "../../images/home_page/social-icons/pintrest.png";
      break;

    case "instagram":
      icon = "../../images/home_page/social-icons/instagram.png";
      break;

    case "linkedin":
      icon = "../../images/home_page/social-icons/linkedin.png";
      break;

    default:
      break;
  }
  return icon;
}

const SocialFooterComponent = (url, name) => {
  let icon = getIconUrlFromName(name);
  return (
    <div>
      <a target="_blank" href="www.facebook.com" rel="noreferrer">
        <img
          src={icon}
          alt={`unable to load the ${name} icon `}
          className="h-7 w-10 p-2 "
        />
      </a>
    </div>
  );
};

export default SocialFooterComponent;
