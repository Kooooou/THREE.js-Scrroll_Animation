import './style.css'
import * as THREE from 'three';
const canvas = document.querySelector('.mycanvas');
const sizes = {
  width: innerWidth,
  height: innerHeight
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,sizes.width / sizes.height,0.1,100);
const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setClearColor(0x000000);
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene,camera);