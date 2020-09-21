
// 請搭配 polyhedron-painter.js 使用

// ======================== 共用設定 ========================

let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

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
	let DrawFrame = function () {
		let timeSec = performance.now() / 1000;
		let arcXY = timeSec * (Math.PI / 4);
		let arcZY = Math.PI * (0.5 - 1 / 16);
		let sinXY = Math.sin(arcXY);
		let sinZY = Math.sin(arcZY);
		let cosXY = Math.cos(arcXY);
		let cosZY = Math.cos(arcZY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosXY - v.y * sinXY,
			(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
			v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
		))), lineWidth);
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
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
	let DrawFrame = function () {
		let timeSec = performance.now() / 1000;
		let arcXY = timeSec * (Math.PI / 4);
		let arcZY = Math.PI * (0.5 - 1 / 16);
		let sinXY = Math.sin(arcXY);
		let sinZY = Math.sin(arcZY);
		let cosXY = Math.cos(arcXY);
		let cosZY = Math.cos(arcZY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosXY - v.y * sinXY,
			(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
			v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
		))), lineWidth);
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
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
	let DrawFrame = function () {
		let timeSec = performance.now() / 1000;
		let arcXY = timeSec * (Math.PI / 4);
		let arcZY = Math.PI * (0.5 - 1 / 16);
		let sinXY = Math.sin(arcXY);
		let sinZY = Math.sin(arcZY);
		let cosXY = Math.cos(arcXY);
		let cosZY = Math.cos(arcZY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosXY - v.y * sinXY,
			(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
			v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
		))), lineWidth);
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
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
	let DrawFrame = function () {
		let timeSec = performance.now() / 1000;
		let arcXY = timeSec * (Math.PI / 4);
		let arcZY = Math.PI * (0.5 - 1 / 16);
		let sinXY = Math.sin(arcXY);
		let sinZY = Math.sin(arcZY);
		let cosXY = Math.cos(arcXY);
		let cosZY = Math.cos(arcZY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosXY - v.y * sinXY,
			(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
			v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
		))), lineWidth);
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
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
	let DrawFrame = function () {
		let timeSec = performance.now() / 1000;
		let arcXY = timeSec * (Math.PI / 4);
		let arcZY = Math.PI * (0.5 - 1 / 16);
		let sinXY = Math.sin(arcXY);
		let sinZY = Math.sin(arcZY);
		let cosXY = Math.cos(arcXY);
		let cosZY = Math.cos(arcZY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosXY - v.y * sinXY,
			(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
			v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
		))), lineWidth);
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();
