
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

// ======================== 正四面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Platonic-04'), vLight, focal);
	let vertexA = (new Vector3D(1, 1, 1)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
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

// ======================== 正六面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Platonic-06'), vLight, focal);
	let vertexA = (new Vector3D(1, 1, 1)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		faceA.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.y, -v.z, -v.x))),
		faceA.Map((v) => (new Vector3D(-v.z, -v.x, -v.y))),
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

// ======================== 正八面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Platonic-08'), vLight, focal);
	let vertexA = (new Vector3D(1, 0, 0)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
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

// ======================== 正十二面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Platonic-12'), vLight, focal);
	let vertexA = (new Vector3D(2 / (Math.sqrt(5) + 3), 1, 0)).Uint();
	let vertexB = (new Vector3D(1, 1, 1)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.z, -v.x))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
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

// ======================== 正二十面體 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.Platonic-20'), vLight, focal);
	let vertexA = (new Vector3D(2 / (Math.sqrt(5) + 1), 0, 1)).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertexA.Create((v) => (new Vector3D(+v.z, -v.x, +v.y))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
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
