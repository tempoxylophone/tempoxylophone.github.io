/*
Written by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_effects_ascii.html

With simple modifications from @tempoxylophone
*/
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

let camera, scene, renderer, effect;
let cube, plane;
const start = Date.now();

init();
animate();

function init() {
	// scene setup
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.y = -80;
	camera.position.z = 500;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0, 0, 0);

	// lighting
	const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
	pointLight1.position.set(500, 500, 500);
	scene.add(pointLight1);

	const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
	pointLight2.position.set(- 500, - 500, - 500);
	scene.add(pointLight2);

	// geometry
	cube = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshPhongMaterial({ flatShading: true }));
	scene.add(cube);

	// compositing
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
	effect.setSize(window.innerWidth, window.innerHeight);
	effect.domElement.style.color = 'white';
	effect.domElement.style.backgroundColor = 'black';

	document.getElementById("scene").appendChild(effect.domElement);
	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
	effect.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	const timer = Date.now() - start;

	cube.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
	cube.rotation.x = timer * 0.002;
	cube.rotation.z = timer * 0.002;

	effect.render(scene, camera);
}
