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
  75,
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
const sceneBg = new THREE.TextureLoader().load(background);
scene.background = sceneBg;

const normalMaterial = new THREE.MeshNormalMaterial();
const boxGeometry = new THREE.BoxGeometry(5,5,5,10,10);
const box = new THREE.Mesh(boxGeometry,normalMaterial);
box.position.z = -15;
box.rotateX(1);
box.rotateY(1);
scene.add(box);

const torusGoeometry = new THREE.TorusGeometry(8,1,16,64);
const torus = new THREE.Mesh(torusGoeometry,normalMaterial);
torus.position.z = 10;
scene.add(torus);

const animationScripts = [];
animationScripts.push({
  start: 0,
  end: 40,
  function(){
    camera.lookAt(box.position);
    camera.position.z = 10
    // box.position.z += 0.01;
  }
})
const playScrollAnime = function(){
 animationScripts.forEach((animation)=>{
   animation.function();
 })
}
let scrollPersent = 0;
document.body.onscroll = function(){
  scrollPersent = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
 console.log(scrollPersent);
}
playScrollAnime();
const tick = function(){
  requestAnimationFrame(tick);
  playScrollAnime();
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
