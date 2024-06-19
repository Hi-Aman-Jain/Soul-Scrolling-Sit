import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 30, 200);
const material = new THREE.MeshPhongMaterial({ color: 0x9c1f3d });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Saturn Planet
const saturnTexture = new THREE.TextureLoader().load('Images/saturn.jpg');
const ringTexture = new THREE.TextureLoader().load('Images/rings.jpg');

const saturnGeometry = new THREE.SphereGeometry(6, 32, 32);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

// Saturn Planet Ring
const ringGeometry = new THREE.RingGeometry(8, 14, 32);
const ringMaterial = new THREE.MeshBasicMaterial({map: ringTexture, side: THREE.DoubleSide });
const rings = new THREE.Mesh(ringGeometry, ringMaterial);

// Adjust ring orientation
rings.rotation.x = 5.57; // Rotate the rings to be horizontal

// Position Saturn and rings
saturn.position.set(-25, 2, 85);
rings.position.set(-25, 2, 85);

scene.add(saturn);
scene.add(rings);

// Lights
const pointLight = new THREE.PointLight(0x9c1f3d);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0x003f7e);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(180));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(2000).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load('Images/space.jpg');
scene.background = spaceTexture;
 
// Avatar on the 3-D box
const boxTexture = new THREE.TextureLoader().load('Images/box.jpg');
const box = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 3.2), new THREE.MeshBasicMaterial({ map: boxTexture }));

scene.add(box);

// Planet
const planetTexture = new THREE.TextureLoader().load('Images/planet.jpg');
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture
  })
);

scene.add(planet);
planet.position.z = 32;
planet.position.x = -10;  // or planet.position.setX(-10);

box.position.z = -5;
box.position.x = 2.5;

// Satellite (Box geometry)
const satelliteGeometry = new THREE.BoxGeometry(2.5, 2.5, 5.5); 
const satelliteMaterial = new THREE.MeshStandardMaterial({ color: 0xff2268 });
const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);

scene.add(satellite);
satellite.position.set(-15, 1, 50);

// Rocket (capsule geometry)
const rocketGeometry = new THREE.CapsuleGeometry(5, 10, 30, 64);
const rocketMaterial = new THREE.MeshStandardMaterial({ color: 0xffeb89 });
const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);

scene.add(rocket);
rocket.position.set(-35, 1, 125);

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  planet.rotation.x += 0.03;
  planet.rotation.y += 0.03;
  planet.rotation.z += 0.03;

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  saturn.rotation.y += 0.03;
  saturn.rotation.x += 0.03;
  saturn.rotation.z += 0.03;

  rings.rotation.x += 0.001;
  rings.rotation.y += 0.005;

  satellite.rotation.y += 0.01;
  rocket.rotation.y += 0.01;

  camera.position.z = t * -0.009999;
  camera.position.x = t * -0.00099;
  camera.rotation.y = t * -0.000099;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Torus Rotation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // Planet blue rotation
  planet.rotation.x += 0.005;

  // Saturn rotation
  saturn.rotation.x += 0.005;

  // Rings rotation
  rings.rotation.x += 0.005;

  // Satellite rotation
  satellite.rotation.y += 0.01;

  // Rocket rotation
  rocket.rotation.x += 0.005; // Adding x-axis rotation for the rocket
  rocket.rotation.y += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();

// Select the audio element and the button
const backgroundMusic = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

// Toggle play/pause state when the button is clicked
musicButton.addEventListener('click', () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicButton.textContent = '❚❚ Music';
  } else {
    backgroundMusic.pause();
    musicButton.textContent = '▶ Music';
  }
});

// Scroll event handlers to play and pause music
// let isScrolling;
// window.addEventListener('scroll', () => {
//   backgroundMusic.play(); 
  // Start playing music when scrolling
  //clearTimeout(isScrolling);
  //isScrolling = setTimeout(() => {
   // backgroundMusic.pause(); 
    // Pause music when scrolling stops
  //}, 66); 
  // 66ms for smooth user experience
// });
