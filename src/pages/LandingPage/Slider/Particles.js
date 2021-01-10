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
          zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      />
      {children && <div style={{ position: "relative" }}>{children}</div>}
    </div>
  );
}
export default CustomParticles;
