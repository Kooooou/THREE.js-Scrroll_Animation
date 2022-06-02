import "./style.css";
import * as THREE from "three";
import background from './bg/bg.jpg';

const canvas = document.querySelector(".mycanvas");
const sizes = {
  width: innerWidth,
  height: innerHeight,
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(new THREE.Vector3(0,0,20));
camera.lookAt(scene.position);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor(0x000000);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
const sceneBg = new THREE.TextureLoader().load(background);
scene.background = sceneBg;

const normalMaterial = new THREE.MeshNormalMaterial();
const boxGeometry = new THREE.BoxGeometry(5,5,5);
const box = new THREE.Mesh(boxGeometry,normalMaterial);
scene.add(box);
const tick = function(){
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
}
tick();

const onResize = function () {
  sizes.width = innerWidth;
  sizes.height = innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
};
window.addEventListener("resize", onResize);
