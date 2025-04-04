import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

//sets the active scene
const scene = new THREE.Scene();

//adds a camera. first attribute is field of view. second is aspect ratio, and forth are clipping planes "near" and "far". The camera wont render anything closer than near, or any further than far. (minecraft view distance?)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//zoom
camera.position.z = 120;

//renderer
const renderer = new THREE.WebGLRenderer();
//renders the scene based on the width and height of the browser.
renderer.setSize(window.innerWidth, window.innerHeight);
//add the renderer to the html document
document.body.appendChild(renderer.domElement);

//funky torus knot to play with 3JS shapes, materials and lighting
//the bones, the skin, and the body
const geometry = new THREE.TorusKnotGeometry(15, 1.5, 500, 500, 8, 11);
const material = new THREE.MeshStandardMaterial({ color: 0x17bebb });
const cube = new THREE.Mesh(geometry, material);
//set the position.
cube.position.set(50, 50, 50);
//puts the body in the scene
scene.add(cube);

//lighting
//fake shadows on everything the point light isnt illuminating
const ambience = new THREE.AmbientLight(0xffffff, 0.02);
//directional light imitating "The Sun"
const pointlight = new THREE.PointLight(0xffffff, 100, 0, 1);
pointlight.position.set(-70, 25, 70);
scene.add(pointlight, ambience);

//draws the scene each time the screen is refreshed. Default 60fps
function animate() {
  renderer.render(scene, camera);
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.007;
  cube.rotation.z += 0.003;
  earth.rotation.y += 0.003;
}

//runs the animation in the renderer
renderer.setAnimationLoop(animate);

//camera controls for click and drag
const controls = new OrbitControls(camera, renderer.domElement);

//random generation
function addstar() {
  //shape, mat, mesh
  const geometry = new THREE.SphereGeometry(0.3, 0.3, 0.3);
  const material = new THREE.MeshBasicMaterial(0xffffff);
  const sphere = new THREE.Mesh(geometry, material);

  //build an array of three, fill it with random values
  const [x, y, z] = Array(3)
    .fill() // this function is built in 3js function that returns a random positive int within the specified range
    .map(() => THREE.MathUtils.randInt(-300, 300));

  //set star coords with previously built array ^
  sphere.position.set(x, y, z);
  sphere.name = "Star";
  scene.add(sphere);
}

//build an array of 200 and make each part of the array call the addstar function
Array(200).fill().forEach(addstar);

//earth
const box = new THREE.SphereGeometry(25);
const texture = new THREE.TextureLoader().load("badearth-01.jpg");
const boxmesh = new THREE.MeshStandardMaterial({ map: texture });
const earth = new THREE.Mesh(box, boxmesh);
earth.position.x = 0;
earth.position.y = 5;
earth.rotateZ = 23.45;
earth.name = "Earth";
scene.add(earth);

const mars = new THREE.Mesh(box, material);
mars.position.x = 500;
scene.add(mars);

pastbutton.addEventListener("click", function () {
  camera.position.set(earth.position.x, 0, 120);
  controls.target = new THREE.Vector3(
    earth.position.x,
    earth.position.y,
    earth.position.z
  );
  controls.update();
});
nextbutton.addEventListener("click", function () {
  camera.position.set(mars.position.x, 0, 120);
  controls.target = new THREE.Vector3(
    mars.position.x,
    mars.position.y,
    mars.position.z
  );
  controls.update();
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
