import { DrawFrame as DrawFrame_04 } from "./Platonic-solid-04.js";
import { DrawFrame as DrawFrame_06 } from "./Platonic-solid-06.js";
import { DrawFrame as DrawFrame_08 } from "./Platonic-solid-08.js";
import { DrawFrame as DrawFrame_12 } from "./Platonic-solid-12.js";
import { DrawFrame as DrawFrame_20 } from "./Platonic-solid-20.js";

let listDrawFrame = [
	DrawFrame_04,
	DrawFrame_06,
	DrawFrame_08,
	DrawFrame_12,
	DrawFrame_20,
];

let Animation = function () {
	let timeSec = performance.now() / 1000;
	for (let DrawFrame of listDrawFrame) {
		DrawFrame(timeSec);
	};
	requestAnimationFrame(Animation);
};

requestAnimationFrame(Animation);
