import { DrawFrame as DrawFrame_3_6_6 } from "./Archimedean-solid-3-6-6.js";
// import { DrawFrame as DrawFrame_3_8_8 } from "./Archimedean-solid-3-8-8.js";
// import { DrawFrame as DrawFrame_3_A_A } from "./Archimedean-solid-3-A-A.js";
// import { DrawFrame as DrawFrame_3_4_3_4 } from "./Archimedean-solid-3-4-3-4.js";
// import { DrawFrame as DrawFrame_3_5_3_5 } from "./Archimedean-solid-3-5-3-5.js";
// import { DrawFrame as DrawFrame_4_6_6 } from "./Archimedean-solid-4-6-6.js";
// import { DrawFrame as DrawFrame_5_6_6 } from "./Archimedean-solid-5-6-6.js";
// import { DrawFrame as DrawFrame_4_6_8 } from "./Archimedean-solid-4-6-8.js";
// import { DrawFrame as DrawFrame_4_6_A } from "./Archimedean-solid-4-6-A.js";
// import { DrawFrame as DrawFrame_3_4_4_4 } from "./Archimedean-solid-3-4-4-4.js";
// import { DrawFrame as DrawFrame_3_4_5_4 } from "./Archimedean-solid-3-4-5-4.js";
// import { DrawFrame as DrawFrame_3_3_3_3_4 } from "./Archimedean-solid-3-3-3-3-4.js";
// import { DrawFrame as DrawFrame_3_3_3_3_5 } from "./Archimedean-solid-3-3-3-3-5.js";

let listDrawFrame = [
	DrawFrame_3_6_6,
	// DrawFrame_3_8_8,
	// DrawFrame_3_A_A,
	// DrawFrame_3_4_3_4,
	// DrawFrame_3_5_3_5,
	// DrawFrame_4_6_6,
	// DrawFrame_5_6_6,
	// DrawFrame_4_6_8,
	// DrawFrame_4_6_A,
	// DrawFrame_3_4_4_4,
	// DrawFrame_3_4_5_4,
	// DrawFrame_3_3_3_3_4,
	// DrawFrame_3_3_3_3_5,
];

let Animation = function () {
	let timeSec = performance.now() / 1000;
	for (let DrawFrame of listDrawFrame) {
		DrawFrame(timeSec);
	};
	requestAnimationFrame(Animation);
};

requestAnimationFrame(Animation);
