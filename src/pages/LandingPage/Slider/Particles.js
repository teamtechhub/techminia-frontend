import Particles from "react-particles-js";
import React from "react";
import ParticlesConfig from "./particlesConfig";

function CustomParticles({ children }) {
  return (
    <div>
      <Particles
        params={ParticlesConfig}
        style={{
          position: "absolute",
          // zIndex: 1,
          left: "50%",
          right: 0,
          bottom: "70px",
          top: 0,
        }}
      />
      {children && <div>{children}</div>}
    </div>
  );
}
export default CustomParticles;
