import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from "gsap";

function About(props) {

  const svgRef = useRef(false);

  useEffect(() => {
    const cs = props.currentState;
    if (cs === 'about') {
      //console.log("about発火");
      if (svgRef.current === false) {
        svgRef.current = true;
        let timelineSvg = gsap.timeline({
          paused: false
        });
        timelineSvg
          .fromTo(".svg-stl1", { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 6, ease: "none" })
          .fromTo(".svg-stl1", { fill: "rgba(0,0,0,0)" }, { fill: "rgba(0,0,0,1)", duration: 0.5, ease: "none" }, "-=4.7")
          .fromTo(".content-desc", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "none" }, "-=4")
          .fromTo(".learn-more", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "none" },"-=3.5")
          .call(svgEnd);
      }
    }
  }, [props.currentState]);

  function svgEnd() {
    //console.log("svgend");
    svgRef.current = false;
  }

  return (
    <>
      <div className="content-about">
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 281.96 50.69" width="282" height="51">
            <path className="svg-stl1" d="M267.05,10.78V49.85H256.27V10.78H241.36V.84H282v9.94ZM206.78,50.62c-12.66,0-21.21-7.36-21.21-21.78V.84h10.78V29.15c0,7.81,4,11.52,10.57,11.52s10.57-4,10.57-11.76V.84h10.78V28.49C228.27,43.34,219.94,50.62,206.78,50.62ZM145,50.69c-15.12,0-26-11.28-26-25.21v-.14c0-13.93,11-25.34,26.11-25.34s26,11.27,26,25.2v.14C171.15,39.27,160.16,50.69,145,50.69Zm14.84-25.35c0-8.4-6.16-15.4-14.84-15.4s-14.7,6.86-14.7,15.26v.14c0,8.4,6.16,15.41,14.84,15.41s14.7-6.87,14.7-15.27ZM88.41,49.85H65.1V.84H87.85c5.6,0,10,1.54,13.25,4.34A13,13,0,0,1,104,13.64h0c0,5.53-3,8.61-6.45,10.57,5.67,2.17,9.17,5.46,9.17,12v.14C106.75,45.37,99.47,49.85,88.41,49.85Zm4.9-34.52c0-3.22-2.52-5-7.07-5H75.6V20.65h9.94c4.76,0,7.77-1.54,7.77-5.18ZM96,34.93c0-3.29-2.45-5.32-8-5.32H75.6V40.39H88.41c4.76,0,7.63-1.68,7.63-5.32ZM36.19,38.85H15.47L11,49.85H0L21,.49h9.94L52,49.85H41.21ZM25.83,13.44,19.32,29.33h13Z"/>
          </svg>
        </h1>
        <p className="content-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="learn-more">
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">
            <Link to="/">TOP</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default About;