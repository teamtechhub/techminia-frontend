import { Plus, Minus } from "components/AllSvgIcon";
import Na from "images/home_page/na.png";
import Lady from "images/lady.png";

const ParticlesConfig = {
  particles: {
    number: {
      value: 8,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      speed: 1,
      out_mode: "out",
    },
    shape: {
      type: ["image", "star", "triangle"],
      image: [
        {
          src: `${Plus}`,
          height: 20,
          width: 20,
        },
        {
          src: `${Minus}`,
          height: 20,
          width: 20,
        },
        {
          src: `${Na}`,
          height: 20,
          width: 20,
        },
        {
          src: `${Lady}`,
          height: 10,
          width: 10,
        },
      ],
    },
    color: {
      value: "#CCC",
    },
    size: {
      value: 40,
      random: false,
      anim: {
        enable: true,
        speed: 4,
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
