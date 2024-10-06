import React, { useEffect, useRef } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/RGBELoader.js";

export default function JWSTPage() {
  const containerRef = useRef(null); // Create a ref to the container element

  useEffect(() => {
    // Make sure the ref exists and has been attached to the DOM
    if (!containerRef.current) return;

    const scene = new THREE.Scene();

    const hdriLoader = new RGBELoader();
    hdriLoader.load(
      process.env.PUBLIC_URL + "/assets/jwst/night.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      }
    );

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let object;
    let controls;
    let objToRender = "jwst";

    const loader = new GLTFLoader();

    loader.load(
      process.env.PUBLIC_URL + "/assets/jwst/jwst.gltf",
      function (gltf) {
        object = gltf.scene;
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.error(error);
      }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Set tone mapping method
    renderer.toneMappingExposure = 1.5; // Adjust exposure value (1.0 is default)

    // Append the WebGL renderer to the container
    containerRef.current.appendChild(renderer.domElement);

    // Camera positioning
    camera.position.z = objToRender === "jwst" ? 25 : 500;

    // Add lights to the scene
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(
      0x333333,
      objToRender === "jwst" ? 5 : 1
    );
    scene.add(ambientLight);

    // Orbit controls for interactive camera movement
    if (objToRender === "jwst") {
      controls = new OrbitControls(camera, renderer.domElement);
    }

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Add interactive button
    const buttonGeometry = new THREE.SphereGeometry(0, 16, 8);
    const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(0, -5, 0); // Position it in front of the JWST model
    scene.add(button);

    // Set up raycaster for mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", onMouseClick, false);

    function onMouseClick(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject === button) {
          console.log("Button clicked!");
          button.material.color.set(0xff0000); // Darken button on click
        }
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", onMouseClick);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array to run effect once on mount

  return (
    <div>
      <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}
