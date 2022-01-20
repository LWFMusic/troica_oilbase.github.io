import * as THREE from './three.js-master/build/three.module.js';
import {GLTFLoader} from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "./three.js-master/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()


const hlight = new THREE.AmbientLight (0x404040,100);
scene.add(hlight);
const loader = new GLTFLoader();
loader.load('assets/scene.gltf', function (gltf){
    console.log(gltf)
    const root = gltf.scene;
    scene.add(root);
}, function (xhr){
    console.log((xhr.loaded/xhr.total * 100) + "%loaded")
}, function (error){
    console.log('An error occured')
})

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(0,1,0);
directionalLight.castShadow = true;
scene.add(directionalLight);
const light = new THREE.PointLight(0xc4c4c4,1);
light.position.set(0,300,500);
scene.add(light);
const light2 = new THREE.PointLight(0xc4c4c4,1);
light2.position.set(500,100,0);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4,1);
light3.position.set(0,100,-500);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4,1);
light4.position.set(-500,300,500);
scene.add(light4);


//boilerplate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

const camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
camera.rotation.y = 45/180*Math.PI;
camera.position.x = 800;
camera.position.y = 100;
camera.position.z = 1000;
const controls = new OrbitControls(camera,renderer.domElement);
controls.addEventListener('change', renderer);

let t = 0;
function animate(){
    t += 0.01;
    requestAnimationFrame(animate)
    scene.rotation.y += 0.001;
    renderer.render(scene,camera)
}
animate()