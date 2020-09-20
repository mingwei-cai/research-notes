
// 請搭配 polyhedron-painter.js 使用

// ======================== 共用設定 ========================

let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

/** @type {((timeSec: number) => void)[]} */
let listAnimationFrame = [];

!function () {
	let Animation = function () {
		let timeSec = performance.now() / 1000;
		for (let DrawFrame of listAnimationFrame) {
			DrawFrame(timeSec);
		};
		requestAnimationFrame(Animation);
	};
	requestAnimationFrame(Animation);
}();

// ======================== 三方四面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-6-6'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 四方六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-4-6-6'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 五方十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-5-6-6'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 三方八面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-8-8'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 三方二十面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-10-10'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 菱形十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-4-3-4'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 菱形三十面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-5-3-5'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 六方八面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-4-6-8'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 六方二十面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-4-6-10'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 鳶形二十四面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-4-4-4'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 鳶形六十面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-4-5-4'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 五角二十四面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-3-3-3-4'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();

// ======================== 五角六十面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Catalan-3-3-3-3-5'), vLight, focal);
// 	let vertexA = (new Vector3D(1, 1, 1)).Uint();
// 	let faceA = new Polygon3D([
// 		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	], colorA);
// 	let solid = new Batch([
// 		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	]);
// 	/** @type {(timeSec: number) => void} */
// 	let DrawFrame = function (timeSec) {
// 		let arcX = timeSec * (Math.PI / 4);
// 		let arcY = Math.PI / 16;
// 		let sinX = Math.sin(arcX);
// 		let sinY = Math.sin(arcY);
// 		let cosX = Math.cos(arcX);
// 		let cosY = Math.cos(arcY);
// 		painter.Draw(solid.Map((v) => (new Vector3D(
// 			v.x * cosX + v.z * sinX,
// 			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
// 			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
// 		))), lineWidth);
// 	};
// 	listAnimationFrame.push(DrawFrame);
// }();
