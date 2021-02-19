import React from "react";
import facebook from "../../images/home_page/social-icons/facebook.png";
import pintrest from "../../images/home_page/social-icons/pintrest.png";
import tiktok from "../../images/home_page/social-icons/tiktok.png";
import twitter from "../../images/home_page/social-icons/twitter.png";
import youtube from "../../images/home_page/social-icons/youtube.png";
import linkedin from "../../images/home_page/social-icons/linkedin.png";
import instagram from "../../images/home_page/social-icons/instagram.png";

let socialIcons = [
  {
    socialIcon: facebook,
    link: "",
  },
  {
    socialIcon: tiktok,
    link: "",
  },
  {
    socialIcon: twitter,
    link: "",
  },
  {
    socialIcon: youtube,
    link: "",
  },
  {
    socialIcon: linkedin,
    link: "",
  },
  {
    socialIcon: instagram,
    link: "",
  },
  {
    socialIcon: pintrest,
    link: "",
  },
];

const SocialFooterComponent = () => {
  return (
    <div className="flex">
      {socialIcons.map((icon) => (
        <a target="_blank" href="http://google.com">
          <img
            src={icon.socialIcon}
            alt={`unable to load the icon `}
            className="h-10 w-10 p-2 "
          />
        </a>
      ))}
    </div>
  );
};

export default SocialFooterComponent;
