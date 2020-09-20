
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

// ======================== 截角四面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Archimedean-3-6-6'), vLight, focal);
	let vertexA = (new Vector3D(3, 1, 1)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.x, -v.y))),
		vertexA.Create((v) => (new Vector3D(-v.z, +v.x, +v.y))),
		vertexA.Create((v) => (new Vector3D(-v.y, +v.z, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.y, -v.z, +v.x))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		vertexA.Create((v) => (new Vector3D(-v.y, -v.z, -v.x))),
		vertexA.Create((v) => (new Vector3D(-v.z, -v.x, -v.y))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 截角八面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Archimedean-4-6-6'), vLight, focal);
	let vertexA = (new Vector3D(2, 1, 0)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, +v.z, +v.y))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.y, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.x, +v.z))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.z, +v.y))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, +v.z, -v.y))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		faceB.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		faceB.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.y, -v.z, -v.x))),
		faceB.Map((v) => (new Vector3D(-v.z, -v.x, -v.y))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 截角二十面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Archimedean-5-6-6'), vLight, focal);
	let vertexA = (new Vector3D(2 / (Math.sqrt(5) + 1), 0, 1));
	let vertexB = vertexA.Mul(2);
	let vertexC = vertexA.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))).Add(vertexB).Uint();
	let vertexD = vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))).Add(vertexB).Uint();
	let vertexE = vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))).Add(vertexB).Uint();
	let faceA = new Polygon3D([
		vertexC.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexD.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexE.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexE.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertexD.Create((v) => (new Vector3D(+v.z, -v.x, +v.y))),
		vertexC.Create((v) => (new Vector3D(+v.z, -v.x, +v.y))),
	], colorA);
	let faceB = new Polygon3D([
		vertexE.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexD.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexE.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexD.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexE.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexD.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
	], colorA);
	let faceC = new Polygon3D([
		vertexC.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexD.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexE.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexE.Create((v) => (new Vector3D(+v.z, +v.x, -v.y))),
		vertexD.Create((v) => (new Vector3D(+v.z, +v.x, -v.y))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		faceA.Map((v) => (new Vector3D(+v.y, -v.z, -v.x))),
		faceA.Map((v) => (new Vector3D(-v.y, +v.z, -v.x))),
		faceA.Map((v) => (new Vector3D(-v.y, -v.z, +v.x))),
		faceA.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		faceA.Map((v) => (new Vector3D(+v.z, -v.x, -v.y))),
		faceA.Map((v) => (new Vector3D(-v.z, +v.x, -v.y))),
		faceA.Map((v) => (new Vector3D(-v.z, -v.x, +v.y))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		faceC.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceC.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceC.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceC.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceC.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		faceC.Map((v) => (new Vector3D(+v.y, -v.z, -v.x))),
		faceC.Map((v) => (new Vector3D(-v.y, +v.z, -v.x))),
		faceC.Map((v) => (new Vector3D(-v.y, -v.z, +v.x))),
		faceC.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		faceC.Map((v) => (new Vector3D(+v.z, -v.x, -v.y))),
		faceC.Map((v) => (new Vector3D(-v.z, +v.x, -v.y))),
		faceC.Map((v) => (new Vector3D(-v.z, -v.x, +v.y))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 截角六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-8-8'), vLight, focal);
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

// ======================== 截角十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-10-10'), vLight, focal);
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

// ======================== 截半六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-4-3-4'), vLight, focal);
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

// ======================== 截半十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-5-3-5'), vLight, focal);
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

// ======================== 大斜方截半六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-4-6-8'), vLight, focal);
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

// ======================== 大斜方截半十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-4-6-10'), vLight, focal);
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

// ======================== 小斜方截半六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-4-4-4'), vLight, focal);
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

// ======================== 小斜方截半十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-4-5-4'), vLight, focal);
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

// ======================== 扭稜六面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-3-3-3-4'), vLight, focal);
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

// ======================== 扭稜十二面體 ========================

// !function () {
// 	let painter = new Painter(document.querySelector('canvas.Archimedean-3-3-3-3-5'), vLight, focal);
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
