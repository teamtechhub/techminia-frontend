import React from "react";
import facebook from "../../images/home_page/social-icons/facebook.png";
import pintrest from "../../images/home_page/social-icons/pintrest.png";
// import tiktok from "../../images/home_page/social-icons/tiktok.png";
import twitter from "../../images/home_page/social-icons/twitter.png";
import youtube from "../../images/home_page/social-icons/youtube.png";
// import linkedin from "../../images/home_page/social-icons/linkedin.png";
import instagram from "../../images/home_page/social-icons/instagram.png";

let socialIcons = [
  {
    socialIcon: facebook,
    link: "https://m.facebook.com/Darasakenya254/",
  },

  {
    socialIcon: twitter,
    link: "https://twitter.com/DarasaKenya?s=09",
  },

  {
    socialIcon: youtube,
    link: "https://youtube.com/channel/UCOEqc0ltJ9buIZg1REt10Dw",
  },
  // {
  //   socialIcon: linkedin,
  //   link: "",
  // },
  // {
  //   socialIcon: tiktok,
  //   link: "",
  // },
  {
    socialIcon: instagram,
    link: "https://instagram.com/darasakenya?igshid=1b2siiggul4np",
  },
  {
    socialIcon: pintrest,
    link: "https://www.pinterest.com/darasakenya/",
  },
];

const SocialFooterComponent = () => {
  return (
    <div className="flex">
      {socialIcons.map((icon) => (
        <a target="_blank" href={icon.link} rel="noreferrer">
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
