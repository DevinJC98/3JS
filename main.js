import * as THREE from "three";
import { OrbitControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";

//sets the active scene
const scene = new THREE.Scene();

//adds a camera. first attribute is field of view. second is aspect ratio, and forth are clipping planes "near" and "far". The camera wont render anything closer than near, or any further than far. (minecraft view distance?)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1
);
//zoom
camera.position.z = 120;

//Responsiveness is rough in 3d
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

//renderer
const renderer = new THREE.WebGLRenderer();
//renders the scene based on the width and height of the browser.
renderer.setSize(window.innerWidth, window.innerHeight);
//add the renderer to the html document
document.body.appendChild(renderer.domElement);

//lighting
//fake shadows on everything the point light isnt illuminating
const ambience = new THREE.AmbientLight(0xffffff, 0.1);
//directional light imitating "The Sun"
const pointlight = new THREE.DirectionalLight(0xffffff);
pointlight.position.set(-70, 25, 70);
scene.add(pointlight, ambience);

//draws the scene each time the screen is refreshed. Default 60fps
function animate() {
  renderer.render(scene, camera);

  earth.rotation.y += 0.005;
  earthmoon.rotation.y += 0.0005;

  jupiter.rotation.y += 0.005;
  ringholder.rotation.y += 0.01;
}

//runs the animation in the renderer
renderer.setAnimationLoop(animate);

//camera controls for click and drag
const controls = new OrbitControls(camera, renderer.domElement);

//random generation
function addstar() {
  //shape, mat, mesh
  const geometry = new THREE.SphereGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial(0xffffff);
  const sphere = new THREE.Mesh(geometry, material);

  //build an array of three, fill it with random values
  const [x, y, z] = Array(3)
    .fill() // this function is built in 3js function that returns a random positive int within the specified range
    .map(() => THREE.MathUtils.randInt(-1300, 1000));

  //set star coords with previously built array ^
  sphere.position.set(x, y, z);
  sphere.name = "Star";
  scene.add(sphere);
}

//build an array of 200 and make each part of the array call the addstar function
Array(500).fill().forEach(addstar);

//planet textures
const planet = new THREE.SphereGeometry(25);

//sun
const sunmaterial = new THREE.MeshStandardMaterial(0xf5f749);
sunmaterial.emissive = new THREE.Color(0xfdfdb3);
const sun = new THREE.Mesh(planet, sunmaterial);
sun.scale.setScalar(4);
sun.position.set(-900, 0, 0);
scene.add(sun);

//mercury
const mercurymaterial = new THREE.MeshStandardMaterial(0x121212);
const mercury = new THREE.Mesh(planet, mercurymaterial);
mercury.position.x = -600;
mercury.scale.setScalar(1);
scene.add(mercury);

//venus
const venusmaterial = new THREE.MeshStandardMaterial(0x121212);
const venus = new THREE.Mesh(planet, venusmaterial);
venus.position.x = -300;
venus.scale.setScalar(1);
scene.add(venus);

//earth
const earthtexture = new THREE.TextureLoader().load("badearth-01.jpg");
const earthmaterial = new THREE.MeshStandardMaterial({ map: earthtexture });
const earth = new THREE.Mesh(planet, earthmaterial);
earth.position.x = 0;
earth.rotateZ = 23.45;
earth.name = "Earth";
scene.add(earth);

//moon
const moonmaterial = new THREE.MeshStandardMaterial(0x121212);
const moon = new THREE.Mesh(planet, moonmaterial);
moon.position.set(50, 0, 0);
moon.scale.setScalar(0.25);
const earthmoon = new THREE.Group();
earthmoon.add(moon);
scene.add(earthmoon);

//mars

const marstexture = new THREE.TextureLoader().load("mars.webp");
const marsmaterial = new THREE.MeshStandardMaterial({ map: marstexture });
const mars = new THREE.Mesh(planet, marsmaterial);
mars.position.x = 300;
scene.add(mars);

//jupiter
const jupitertexture = new THREE.TextureLoader().load("joopitr-01.webp");
const jupitermaterial = new THREE.MeshStandardMaterial({ map: jupitertexture });
const jupiter = new THREE.Mesh(planet, jupitermaterial);
jupiter.position.x = 600;
jupiter.scale.setScalar(1);
scene.add(jupiter);

//saturn
//make shape in blender and import instead of using build in shapes
const ringshape = new THREE.TorusGeometry(33, 5, 2, 50);

const saturntexture = new THREE.TextureLoader().load("Saturn.webp");
const saturnmaterial = new THREE.MeshStandardMaterial({ map: saturntexture });
const saturn = new THREE.Mesh(planet, saturnmaterial);
const saturnsring = new THREE.Mesh(ringshape, jupitermaterial);
saturnsring.rotation.x = 90;
saturnsring.rotation.z = 20;
saturn.position.x = 900;
saturn.scale.setScalar(1);
const ringholder = new THREE.Group();
ringholder.position.x = 900;
ringholder.add(saturnsring);
scene.add(saturn, ringholder);

//uranus
const uranusmaterial = new THREE.MeshStandardMaterial(0xfffffff);
const uranus = new THREE.Mesh(planet, uranusmaterial);
uranus.position.x = 1200;
uranus.scale.setScalar(1);
scene.add(uranus);

//neptune
const neptunetexture = new THREE.TextureLoader().load("joopitr.webp");
const neptunematerial = new THREE.MeshStandardMaterial({ map: neptunetexture });
const neptune = new THREE.Mesh(planet, neptunematerial);
neptune.position.x = 1500;
neptune.scale.setScalar(1);
scene.add(neptune);

//UI Events
let planetindex = 3;
let warpspeed = 1;

pastbutton.addEventListener("click", function () {
  planetindex--;
  if (planetindex <= 0) {
    planetindex = 0;
  }

  switch (planetindex) {
    case 0:
      const sunmove = setInterval(function () {
        camera.position.x -= warpspeed;
        camera.position.z += 0.5;
        if (camera.position.x <= sun.position.x) {
          controls.target = new THREE.Vector3(
            sun.position.x,
            sun.position.y,
            sun.position.z
          );
          controls.update();
          clearInterval(sunmove);
        }
      }, 2);
      break;

    case 1:
      const mercurymove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= mercury.position.x) {
          controls.target = new THREE.Vector3(
            mercury.position.x,
            mercury.position.y,
            mercury.position.z
          );
          controls.update();
          clearInterval(mercurymove);
        }
      }, 2);
      break;

    case 2:
      const venusmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= venus.position.x) {
          controls.target = new THREE.Vector3(
            venus.position.x,
            venus.position.y,
            venus.position.z
          );
          controls.update();
          clearInterval(venusmove);
        }
      }, 2);
      break;

    case 3:
      const earthmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= earth.position.x) {
          controls.target = new THREE.Vector3(
            earth.position.x,
            earth.position.y,
            earth.position.z
          );
          controls.update();
          clearInterval(earthmove);
        }
      }, 2);
      break;

    case 4:
      const marsmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= mars.position.x) {
          controls.target = new THREE.Vector3(
            mars.position.x,
            mars.position.y,
            mars.position.z
          );
          controls.update();
          clearInterval(marsmove);
        }
      }, 2);
      break;

    case 5:
      const jupitermove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= jupiter.position.x) {
          controls.target = new THREE.Vector3(
            jupiter.position.x,
            jupiter.position.y,
            jupiter.position.z
          );
          controls.update();
          clearInterval(jupitermove);
        }
      }, 2);
      break;

    case 6:
      const saturnmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= saturn.position.x) {
          controls.target = new THREE.Vector3(
            saturn.position.x,
            saturn.position.y,
            saturn.position.z
          );
          controls.update();
          clearInterval(saturnmove);
        }
      }, 2);
      break;

    case 7:
      const uranusmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= uranus.position.x) {
          controls.target = new THREE.Vector3(
            uranus.position.x,
            uranus.position.y,
            uranus.position.z
          );
          controls.update();
          clearInterval(uranusmove);
        }
      }, 2);
      break;

    case 8:
      const neptunemove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.x <= neptune.position.x) {
          controls.target = new THREE.Vector3(
            neptune.position.x,
            neptune.position.y,
            neptune.position.z
          );
          controls.update();
          clearInterval(neptunemove);
        }
      }, 2);
      break;
  }
});
nextbutton.addEventListener("click", function () {
  planetindex++;
  if (planetindex >= 8) {
    planetindex = 8;
  }

  switch (planetindex) {
    case 1:
      const mercurymove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= mercury.position.x) {
          controls.target = new THREE.Vector3(
            mercury.position.x,
            mercury.position.y,
            mercury.position.z
          );
          controls.update();
          clearInterval(mercurymove);
        }
      }, 2);
      break;

    case 2:
      const venusmove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= venus.position.x) {
          controls.target = new THREE.Vector3(
            venus.position.x,
            venus.position.y,
            venus.position.z
          );
          controls.update();
          clearInterval(venusmove);
        }
      }, 2);
      break;

    case 3:
      const earthmove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= earth.position.x) {
          controls.target = new THREE.Vector3(
            earth.position.x,
            earth.position.y,
            earth.position.z
          );
          controls.update();
          clearInterval(earthmove);
        }
      }, 2);
      break;

    case 4:
      const marsmove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= mars.position.x) {
          controls.target = new THREE.Vector3(
            mars.position.x,
            mars.position.y,
            mars.position.z
          );
          controls.update();
          clearInterval(marsmove);
        }
      }, 2);
      break;

    case 5:
      const jupitermove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= jupiter.position.x) {
          controls.target = new THREE.Vector3(
            jupiter.position.x,
            jupiter.position.y,
            jupiter.position.z
          );
          controls.update();
          clearInterval(jupitermove);
        }
      }, 2);
      break;

    case 6:
      const saturnmove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= saturn.position.x) {
          controls.target = new THREE.Vector3(
            saturn.position.x,
            saturn.position.y,
            saturn.position.z
          );
          controls.update();
          clearInterval(saturnmove);
        }
      }, 2);
      break;

    case 7:
      const uranusmove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= uranus.position.x) {
          controls.target = new THREE.Vector3(
            uranus.position.x,
            uranus.position.y,
            uranus.position.z
          );
          controls.update();
          clearInterval(uranusmove);
        }
      }, 2);
      break;

    case 8:
      const neptunemove = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.x >= neptune.position.x) {
          controls.target = new THREE.Vector3(
            neptune.position.x,
            neptune.position.y,
            neptune.position.z
          );
          controls.update();
          clearInterval(neptunemove);
        }
      }, 2);
      break;
  }
});

//Raycasting for mouse interaction with 3d
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener("mousemove", function (mousestuff) {
  //set vector2(x,y)
  mouse.x = (mousestuff.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(mousestuff.clientY / window.innerHeight) * 2 + 1;

  //shoot the ray from the camera
  raycaster.setFromCamera(mouse, camera);
  //check what the ray is going through
  const intersects = raycaster.intersectObjects(scene.children);

  //check the items in the array then change the text and cursor when hovering over planet or star
  for (let i = 0; i < intersects.length; i++) {
    planetname.innerHTML = intersects[i].object.name;
    this.document.body.style.cursor = "pointer";
  }
  //if the ray isnt touching anything, display planet not found message and display default cursor
  if (intersects.length == 0) {
    planetname.innerHTML = "Planet Not Found";
    this.document.body.style.cursor = "initial";
  }
});
