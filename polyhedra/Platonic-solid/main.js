import { DrawFrame as DrawFrame04 } from "./Platonic-solid-04.js";
import { DrawFrame as DrawFrame06 } from "./Platonic-solid-06.js";
import { DrawFrame as DrawFrame08 } from "./Platonic-solid-08.js";
import { DrawFrame as DrawFrame12 } from "./Platonic-solid-12.js";
import { DrawFrame as DrawFrame20 } from "./Platonic-solid-20.js";

let listDrawFrame = [
	DrawFrame04,
	DrawFrame06,
	DrawFrame08,
	DrawFrame12,
	DrawFrame20,
];

let Animation = function () {
	let timeSec = performance.now() / 1000;
	for (let DrawFrame of listDrawFrame) {
		DrawFrame(timeSec);
	};
	requestAnimationFrame(Animation);
};

requestAnimationFrame(Animation);
