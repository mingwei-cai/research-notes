import { DrawFrame as DrawFrame_prism } from "./other-polyhedra-prism.js";
import { DrawFrame as DrawFrame_antiprism } from "./other-polyhedra-antiprism.js";
import { DrawFrame as DrawFrame_bipyramid } from "./other-polyhedra-bipyramid.js";
import { DrawFrame as DrawFrame_antibipyramid } from "./other-polyhedra-antibipyramid.js";

let listDrawFrame = [
	DrawFrame_prism,
	DrawFrame_antiprism,
	DrawFrame_bipyramid,
	DrawFrame_antibipyramid,
];

let Animation = function () {
	let timeSec = performance.now() / 1000;
	for (let DrawFrame of listDrawFrame) {
		DrawFrame(timeSec);
	};
	requestAnimationFrame(Animation);
};

requestAnimationFrame(Animation);
