import React, { useEffect, useRef, useState } from 'react';
import {
  useLocation
} from 'react-router-dom';
import ObjLoader from './ObjLoader';
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { gsap } from "gsap";
//import { NoToneMapping } from 'three';

export const WebglBG = (props) => {

  const location = useLocation();

  const firstRef = useRef(0);
  const requestRef = useRef();
  const pathRef = useRef(1);
  const move1Ref = useRef(100);
  const move2Ref = useRef(100);

  const [percent, setPercent] = useState(0);

  let scene;
  let camera;

  let renderer;
  //let box;
  let city;

  let width = window.innerWidth;
  let height = window.innerHeight;

  const onCanvasLoaded = (canvas) => {
    if (!canvas) {
      return;
    }
    if (firstRef.current === 0) {
      firstRef.current = 1;
      createBox();
    }
  };

  const onHomeEndHandler = () => {
    props.fromHomeNotice();
  };

  const onAboutEndHandler = () => {
    props.fromAboutNotice();
  };

  const createBox = () => {

    const canvas = document.getElementById('webgl-canvas');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000 );
    //camera = new THREE.OrthographicCamera(-480, +480, 270, -270, 1, 10000);
    camera.position.set(0, 0, width / 2);
    //camera.up.set(0, 1, 0);
    //camera.lookAt({ x: 0, y: 0, z: 0 });

    //const light = new THREE.DirectionalLight(0x000000);
    //light.position.set(0, 1, 0).normalize();
	  //scene.add( light );

    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1.0);

    //container.appendChild(renderer.domElement);

    //const geometry = new THREE.BoxGeometry(400, 400, 400);
    //const material = new THREE.MeshNormalMaterial();
    //box = new THREE.Mesh(geometry, material);
    //scene.add(box);

    const wf_material = new THREE.MeshBasicMaterial({ color: 0xa0a0a0, wireframe: true });

    const objLoader = new OBJLoader();
    objLoader.load(
      './city.obj',
      function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = wf_material;
          }
        });
        city = object.clone();
        //city.position.set(width * 0.25, width * 0.15 * -1, width * 2 * -1);
        city.position.set(width / 5, height / 5 * -1, width / 3);
        scene.add(city);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        setPercent(xhr.loaded / xhr.total * 100);
      },
      function (error) {
        console.log('An error happened');
      }
    );

    window.addEventListener("resize", () => handleResize());

    tick();

  };

  function gotoAbout() {
    move1Ref.current = 0;
    let timelineBox = gsap.timeline({
      paused: false
    });
    timelineBox
      .to(camera.position, { z: width / 2, duration: 2, ease: "slow(0.7, 0.7, false)" })
      .to(camera.rotation, {
        y: 0,
        duration: 2,
        delay: 0,
        ease: "slow(0.4, 0.4, false)",
      }, "-=2")
      .call(gotoAboutEnd);
    ;
  }

  function gotoTop() {
    move2Ref.current = 0;
    let timelineBox2 = gsap.timeline({
      paused: false
    });
    timelineBox2.to(camera.rotation, {
      y: -1.5,
      duration: 2,
      delay: 0,
      ease: "slow(0.4, 0.4, false)",
    })
      .to(camera.position, { z: width / 2 * -1, duration: 2, ease: "slow(0.7, 0.7, false)" }, "-=2")
    .call(gotoTopEnd);
  }

  function gotoAboutEnd() {
    move1Ref.current = 0;
    move2Ref.current = 100;
    //console.log("ani1end");
    onHomeEndHandler();
  }

  function gotoTopEnd() {
    move1Ref.current = 100;
    move2Ref.current = 0;
    //console.log("ani2end");
    onAboutEndHandler();
  }

  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    if (location.pathname === '/About') {
      camera.position.set(0, 0, width / 2 * -1);
      camera.rotation.y = -1.5;
    } else {
      camera.position.set(0, 0, width / 2);
    }
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  const tick = () => {
    if (pathRef.current !== undefined) {
      if (pathRef.current === 1) {
        if (move1Ref.current > 0) {
          gotoAbout();
        }
      } else {
        if (move2Ref.current > 0) {
          gotoTop();
        }
      }
    }
    renderer.render(scene, camera);
    requestRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (location.pathname === '/About') {
      pathRef.current = 2;
    } else {
      pathRef.current = 1;
    }
  }, [location.pathname]);

  return (
    <>
      <ObjLoader percent={percent} />
      <canvas id="webgl-canvas" ref={onCanvasLoaded} />
    </>
  );
};

export default WebglBG;