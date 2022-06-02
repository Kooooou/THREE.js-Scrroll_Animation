import "./style.css";
import * as THREE from "three";
import background from './bg/bg.jpg';
import { TextureLoader } from "three";

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
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setClearColor(0x000000);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
const sceneBg = new TextureLoader().load(background);
scene.background = sceneBg;
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
