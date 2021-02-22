//import { Plus, Minus } from "components/AllSvgIcon";
import Na from "images/home_page/na.png";
//import Lady from "images/lady.png";
import ab from "images/home_page/particles/a+b.png";
import controller from "images/home_page/particles/controller.png";
import floatingbook from "images/home_page/particles/floating_book.png";
import football from "images/home_page/particles/football.png";
import planetsat from "images/home_page/particles/planet_saturn.png";
import xy from "images/home_page/particles/x+y.png";

const ParticlesConfig = {
  particles: {
    number: {
      value: 25,
      density: {
        enable: true,
        value_area: 600,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: false,
    },
    opacity: {
      value: 1.0,
    },
    shape: {
      type: ["image"],
      image: [
        {
          src: `${xy}`,
          height: 20,
          width: 20,
        },
        {
          src: `${Na}`,
          height: 20,
          width: 20,
        },
        {
          src: `${controller}`,
          height: 20,
          width: 20,
        },
        {
          src: `${ab}`,
          height: 15,
          width: 10,
        },
        {
          src: `${floatingbook}`,
          height: 15,
          width: 10,
        },
        {
          src: `${planetsat}`,
          height: 15,
          width: 10,
        },
        {
          src: `${football}`,
          height: 15,
          width: 10,
        },
      ],
    },
    // color: { value: "#652e8d" },
    size: {
      value: 40,
      random: false,
      anim: {
        enable: true,
        speed: 5,
        size_min: 10,
        sync: false,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: false,
      },
      resize: true,
    },
  },
  retina_detect: false,
};
export default ParticlesConfig;
