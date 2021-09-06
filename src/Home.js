import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from "gsap";

function Home(props) {

  const svgRef = useRef(false);

  useEffect(() => {
    const cs = props.currentState;
    if (cs === 'home') {
      //console.log("home発火");
      if (svgRef.current === false) {
        svgRef.current = true;
        let timelineSvg = gsap.timeline({
          paused: false
        });
        timelineSvg
          .fromTo(".svg-stl1", { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 6, ease: "none" })
          .fromTo(".svg-stl1", { fill: "rgba(0,0,0,0)" }, { fill: "rgba(0,0,0,1)", duration: 0.5, ease: "none" }, "-=4.7")
          .fromTo(".content-desc", { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "none" },"-=4")
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
      <div className="content-top">
        <h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.39 50.98" width="496" height="51">
            <path className="svg-stl1" d="M480.48,10.78V49.85H469.7V10.78H454.79V.84h40.6v9.94ZM426.13,51a32.12,32.12,0,0,1-21.6-8.27l6.37-7.64c5.12,3.64,9,6,14.63,6,4.41,0,7.07-1.76,7.07-4.63v-.14c0-2.4-1.68-4.13-9.87-6.23-9.87-2.38-16.24-5.25-16.24-15v-.14C406.49,6,413.63.14,423.64.14a28.36,28.36,0,0,1,18.2,6.23l-5.5,8.12c-4.44-3-8.71-4.83-12.84-4.83s-6.3,2.38-6.3,4.27v.14c0,3.22,2.72,4.27,10.57,6.58,9.94,2.45,16.28,6,16.28,14.56v.14C444.05,45.09,435.89,51,426.13,51ZM355.39.84h37v9.59H366.1v9.94h23.1V30H366.1V40.25h26.6v9.6H355.39Zm-28.77,49H315.84V10.78H300.93V.84h40.6v9.94H326.62Zm-77.56,0H238.74V10.78H223.37V.84H264v9.94H249.06Zm-56.14-9.1c5.6,0,9-1.65,12.88-5.75l6.86,6.94c-5,5.38-10.64,8.75-20.09,8.75-14.42,0-25.13-10.62-25.13-25.21v-.14C167.44,11.41,177.94,0,193,0c9.64,0,14.77,3.08,20.09,8.13l-7.63,7.34c-3.78-3.43-7.63-5.53-12.53-5.53-8.26,0-14.21,6.86-14.21,15.26v.14C178.71,33.74,184.52,40.75,192.92,40.75Zm-52.22-1.9H120l-4.48,11h-11l21-49.36h9.94l21,49.36H145.18ZM130.34,13.44l-6.51,15.89h13ZM56.21.84h37v9.59H66.92v9.94H90V30H66.92V40.25h26.6v9.6H56.21Zm-26.46,49L19.46,34.16H10.78V49.85H0V.84H22.4a23.91,23.91,0,0,1,14.28,5A16,16,0,0,1,40.88,17v.14c0,7.91-4.27,12.88-10.5,15.19l12,17.51ZM30,18.24c0-5.29-3.22-7-8.47-7H10.78V24.64H21.7c5.25,0,8.26-2.8,8.26-6.93Z"/>
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
            <Link to="/About">About</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Home;