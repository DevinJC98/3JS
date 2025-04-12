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
  //resize and update the camera aspect ratio
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
const ambience = new THREE.AmbientLight(0xffffff, 0.05);
//directional light imitating "The Sun"
const pointlight = new THREE.DirectionalLight(0xffffff);
pointlight.position.set(-70, 25, 70);
scene.add(pointlight, ambience);

//draws the scene each time the screen is refreshed. Default 60fps
function animate() {
  renderer.render(scene, camera);

  //planet
  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.005;
  earth.rotation.y += 0.005;
  earthmoon.rotation.y += 0.002;
  mars.rotation.y += 0.005;
  jupiter.rotation.y += 0.005;
  saturn.rotation.y += 0.005;
  ringholder.rotation.y += 0.01;
  uranus.rotation.y += 0.005;
  neptune.rotation.y += 0.005;
}

//runs the animation in the renderer
renderer.setAnimationLoop(animate);

//camera controls for click and drag
//Default Target is 0,0,0
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;

//this function generates a single star.
function addstar() {
  //shape, mat, mesh
  const geometry = new THREE.SphereGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial(0xffffff);
  const sphere = new THREE.Mesh(geometry, material);

  const yzmin = -750;
  const yzmax = 750;
  const xmin = -1800;
  const xmax = 1800;

  //build an array of three, fill it with random values
  const y = Math.random() * (yzmax - yzmin) + yzmin;
  const z = Math.random() * (yzmax - yzmin) + yzmin;
  const x = Math.random() * (xmax - xmin) + xmin;

  //star
  sphere.position.set(x, y, z);
  sphere.name = "Star";
  scene.add(sphere);
}

//build an array of 500 and make each part of the array call the addstar function
Array(500).fill().forEach(addstar);

//planet textures
const planet = new THREE.SphereGeometry(25);

//sun
const sunmaterial = new THREE.MeshStandardMaterial(0xf5f749);
sunmaterial.emissive = new THREE.Color(0xfdfdb3);
sunmaterial.emissive.intensity = 2;
const sun = new THREE.Mesh(planet, sunmaterial);
sun.scale.setScalar(15);
sun.position.set(-1200, 0, 0);
sun.name = "Sun";
scene.add(sun);

//mercury

const mercurytexture = new THREE.TextureLoader().load("mercury.webp");
const mercurymaterial = new THREE.MeshStandardMaterial({ map: mercurytexture });
const mercury = new THREE.Mesh(planet, mercurymaterial);
mercury.position.x = -600;
mercury.scale.setScalar(0.3);
mercury.name = "Mercury";
scene.add(mercury);

//venus
const venustexture = new THREE.TextureLoader().load("venus.webp");
const venusmaterial = new THREE.MeshStandardMaterial({ map: venustexture });
const venus = new THREE.Mesh(planet, venusmaterial);
venus.position.x = -300;
venus.scale.setScalar(0.9);
venus.name = "Venus";
scene.add(venus);

//earth
const earthtexture = new THREE.TextureLoader().load("earth.webp");
const earthmaterial = new THREE.MeshStandardMaterial({ map: earthtexture });
const earth = new THREE.Mesh(planet, earthmaterial);
earth.position.x = 0;
earth.rotateZ = 23.45;
earth.name = "Earth";
scene.add(earth);

//moon
const moontexture = new THREE.TextureLoader().load("moon.webp");
const moonmaterial = new THREE.MeshStandardMaterial({ map: moontexture });
const moon = new THREE.Mesh(planet, moonmaterial);
moon.position.set(50, 0, 0);
moon.scale.setScalar(0.25);
moon.name = "Moon";
const earthmoon = new THREE.Group();
earthmoon.add(moon);
scene.add(earthmoon);

//mars

const marstexture = new THREE.TextureLoader().load("mars.webp");
const marsmaterial = new THREE.MeshStandardMaterial({ map: marstexture });
const mars = new THREE.Mesh(planet, marsmaterial);
mars.position.x = 300;
mars.scale.setScalar(0.5);
mars.name = "Mars";
scene.add(mars);

//jupiter
const jupitertexture = new THREE.TextureLoader().load("joopitr-01.webp");
const jupitermaterial = new THREE.MeshStandardMaterial({ map: jupitertexture });
const jupiter = new THREE.Mesh(planet, jupitermaterial);
jupiter.position.x = 600;
jupiter.scale.setScalar(4);
jupiter.name = "Jupiter";
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
saturn.position.x = 1100;
saturn.scale.setScalar(3);
saturnsring.scale.setScalar(3);
const ringholder = new THREE.Group();
ringholder.position.x = 1100;
ringholder.add(saturnsring);
saturn.name = "Saturn";
saturnsring.name = "Saturn";
scene.add(saturn, ringholder);

//uranus
const uranustexture = new THREE.TextureLoader().load("uranus.webp");
const uranusmaterial = new THREE.MeshStandardMaterial({ map: uranustexture });
const uranus = new THREE.Mesh(planet, uranusmaterial);
uranus.position.x = 1500;
uranus.scale.setScalar(2);
uranus.name = "Uranus";
scene.add(uranus);

//neptune
const neptunetexture = new THREE.TextureLoader().load("neptune.webp");
const neptunematerial = new THREE.MeshStandardMaterial({ map: neptunetexture });
const neptune = new THREE.Mesh(planet, neptunematerial);
neptune.position.x = 1900;
neptune.scale.setScalar(2);
neptune.name = "Neptune";
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
        camera.position.x -= warpspeed * 1.6;
        if (camera.position.z >= 0) {
          camera.position.z += 2;
        } else {
          camera.position.z -= 2;
        }
        controls.target.x -= warpspeed * 1.6;
        controls.update();
        if (controls.target.x <= sun.position.x) {
          clearInterval(sunmove);
        }
      }, 2);
      break;

    case 1:
      const mercurymove = setInterval(function () {
        camera.position.x -= warpspeed;

        if (camera.position.z >= 0) {
          camera.position.z -= 0.12;
        } else {
          camera.position.z += 0.12;
        }

        controls.target.x -= warpspeed;
        controls.update();
        if (controls.target.x <= mercury.position.x) {
          clearInterval(mercurymove);
        }
      }, 2);
      break;

    case 2:
      const venusmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z -= 0.1;
        } else {
          camera.position.z += 0.1;
        }
        controls.target.x -= warpspeed;
        controls.update();
        if (controls.target.x <= venus.position.x) {
          clearInterval(venusmove);
        }
      }, 2);
      break;

    case 3:
      const earthmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z += 0.2;
        } else {
          camera.position.z -= 0.2;
        }
        controls.target.x -= warpspeed;
        controls.update();
        if (controls.target.x <= earth.position.x) {
          clearInterval(earthmove);
        }
      }, 2);
      break;

    case 4:
      const marsmove = setInterval(function () {
        camera.position.x -= warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z -= 0.5;
        } else {
          camera.position.z += 0.5;
        }
        controls.target.x -= warpspeed;
        controls.update();
        if (controls.target.x <= mars.position.x) {
          clearInterval(marsmove);
        }
      }, 2);
      break;

    case 5:
      const jupitermove = setInterval(function () {
        camera.position.x -= warpspeed;
        controls.target.x -= warpspeed;
        controls.update();
        if (controls.target.x <= jupiter.position.x) {
          clearInterval(jupitermove);
        }
      }, 2);
      break;

    case 6:
      const saturnmove = setInterval(function () {
        camera.position.x -= warpspeed * 1.6;
        if (camera.position.z >= 0) {
          camera.position.z += 0.2;
        } else {
          camera.position.z -= 0.2;
        }
        controls.target.x -= warpspeed * 1.6;
        controls.update();
        if (controls.target.x <= saturn.position.x) {
          clearInterval(saturnmove);
        }
      }, 2);
      break;

    case 7:
      const uranusmove = setInterval(function () {
        camera.position.x -= warpspeed * 1.3;
        controls.target.x -= warpspeed * 1.3;
        controls.update();
        if (controls.target.x <= uranus.position.x) {
          clearInterval(uranusmove);
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
      const fromsun = setInterval(function () {
        camera.position.x += warpspeed * 1.6;
        if (camera.position.z >= 0) {
          camera.position.z -= 2;
        } else {
          camera.position.z += 2;
        }
        controls.target.x += warpspeed * 1.6;
        controls.update();
        if (controls.target.x >= mercury.position.x) {
          clearInterval(fromsun);
        }
      }, 2);
      break;

    case 2:
      const frommercury = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z += 0.12;
        } else {
          camera.position.z -= 0.12;
        }
        controls.target.x += warpspeed;
        controls.update();
        if (controls.target.x >= venus.position.x) {
          clearInterval(frommercury);
        }
      }, 2);
      break;

    case 3:
      const fromvenus = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z += 0.1;
        } else {
          camera.position.z -= 0.1;
        }
        controls.target.x += warpspeed;
        controls.update();
        if (controls.target.x >= earth.position.x) {
          clearInterval(fromvenus);
        }
      }, 2);
      break;

    case 4:
      const fromearth = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z -= 0.2;
        } else {
          camera.position.z += 0.2;
        }
        controls.target.x += warpspeed;
        controls.update();
        if (controls.target.x >= mars.position.x) {
          clearInterval(fromearth);
        }
      }, 2);
      break;

    case 5:
      const frommars = setInterval(function () {
        camera.position.x += warpspeed;
        if (camera.position.z >= 0) {
          camera.position.z += 0.5;
        } else {
          camera.position.z -= 0.5;
        }
        controls.target.x += warpspeed;
        controls.update();
        if (controls.target.x >= jupiter.position.x) {
          clearInterval(frommars);
        }
      }, 2);
      break;

    case 6:
      const fromjupiter = setInterval(function () {
        camera.position.x += warpspeed * 1.6;
        controls.target.x += warpspeed * 1.6;
        controls.update();
        if (controls.target.x >= saturn.position.x) {
          clearInterval(fromjupiter);
        }
      }, 2);
      break;

    case 7:
      const fromsaturn = setInterval(function () {
        camera.position.x += warpspeed * 1.3;
        if (camera.position.z >= 0) {
          camera.position.z -= 0.2;
        } else {
          camera.position.z += 0.2;
        }
        controls.target.x += warpspeed * 1.3;
        controls.update();
        if (controls.target.x >= uranus.position.x) {
          clearInterval(fromsaturn);
        }
      }, 2);
      break;

    case 8:
      const fromuranus = setInterval(function () {
        camera.position.x += warpspeed * 1.3;
        controls.target.x += warpspeed * 1.3;
        controls.update();
        if (controls.target.x >= neptune.position.x) {
          clearInterval(fromuranus);
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
    planetname.innerHTML = "Scanning";
    this.document.body.style.cursor = "initial";
  }
});
