import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";

export const ObjLoader = (props) => {

  const firstRef = useRef(0);

  const initLoading = () => {
    if (firstRef.current === 0) {
      firstRef.current = 1;
      let timelineSVG = gsap.timeline({
        paused: true
      });
      timelineSVG.to("#svg-circle", { strokeDashoffset: 0, duration: 2, ease: "none" });
      timelineSVG.play();
    }
  };

  useEffect(() => {
    initLoading();
  }, []);

  useEffect(() => {
    if (props.percent === 100) {
      gsap.set("#svg-circle", { strokeDashoffset: 0 });
      setTimeout(loadingEnd, 600);
    }
  }, [props.percent]);

  function loadingEnd() {
    const thiselement = document.querySelector('.obj-loader');
    thiselement.classList.add("off");
  }

  return (
    <div className="obj-loader">
      <div className="obj-loader-main">
        <div className="percent">
          <div id="percent-qt">{props.percent}</div>
          <div id="percent-ps">%</div>
        </div>
        <svg className="circle-svg" width="312" height="312" viewBox="-156 -156 312 312">
          <circle id="svg-circle" cx="0" cy="0" r="152" />
        </svg>
      </div>
    </div>
  );
};

export default ObjLoader;