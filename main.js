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

const torusGoeometry = new THREE.TorusGeometry(6,2,16,64);
const torus = new THREE.Mesh(torusGoeometry,normalMaterial);
torus.position.z = 10;
scene.add(torus);

let scrollPersent = 0;
const lerp = function(x,y,a){
  return (1 - a) * x + a * y;
}
const scale = function(start,end){
  return (scrollPersent - start) / (end - start);
}
document.body.onscroll = function(){
  scrollPersent = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
}
const animationScripts = [];
animationScripts.push({
  start: 0,
  end: 40,
  function(){
    camera.lookAt(box.position);
    camera.position.z = 10
    box.position.z = lerp(-15,0,scale(0,40));
    torus.position.z = lerp(10,-15,scale(0,40));
  }
})
animationScripts.push({
  start: 40,
  end: 60,
  function(){
    camera.lookAt(box.position);
    camera.position.z = 10;
    box.rotation.x = lerp(1,THREE.MathUtils.degToRad(180),scale(40,60));
  }
})
animationScripts.push({
  start: 60,
  end: 80,
  function(){
    camera.lookAt(box.position);
    camera.position.x = lerp(0,-10,scale(60,80));
    camera.position.y = lerp(0,15,scale(60,80));
    camera.position.z = lerp(10,25,scale(60,80));
  }
})
animationScripts.push({
  start: 80,
  end: 100,
  function(){
    camera.lookAt(box.position);
    box.rotation.x += 0.02;
    box.rotation.y += 0.02;
  }
})
const playScrollAnime = function(){
 animationScripts.forEach((animation)=>{
 if(scrollPersent >= animation.start && scrollPersent <= animation.end)
  animation.function();
 })
}

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
