
// 請搭配 polyhedron-painter.js 使用

// ======================== 共用設定 ========================

let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let n = 5;

// ======================== 稜柱 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.prism'), vLight, focal);
	let z = Math.sin(Math.PI / n);
	/** @type {Vector3D[]} */
	let listVertexA = [];
	/** @type {Vector3D[]} */
	let listVertexB = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 + 1 - n) / n;
		let x = Math.cos(arc);
		let y = Math.sin(arc);
		listVertexA.push(new Vector3D(x, y, +z));
		listVertexB.push(new Vector3D(x, y, -z));
	};
	/** @type {Polygon3D[]} */
	let listFace = [];
	for (let i = 1; i < n; ++i) {
		listFace.push(new Polygon3D([
			listVertexA[i - 1],
			listVertexA[i],
			listVertexB[i],
			listVertexB[i - 1],
		], colorA));
	};
	listFace.push(new Polygon3D([
		listVertexA[n - 1],
		listVertexA[0],
		listVertexB[0],
		listVertexB[n - 1],
	], colorA));
	listFace.push(new Polygon3D(listVertexA, colorA));
	listFace.push(new Polygon3D(listVertexB, colorA));
	let r = listVertexA[0].Length();
	let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));
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

// ======================== 反稜柱 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.antiprism'), vLight, focal);
	let z = Math.sin(Math.PI / (n * 2)) * Math.sqrt(Math.cos(Math.PI / n) * 2 + 1);
	/** @type {Vector3D[]} */
	let listVertexA = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 - n) / n;
		let x = Math.cos(arc);
		let y = Math.sin(arc);
		listVertexA.push(new Vector3D(x, y, +z));
	};
	/** @type {Vector3D[]} */
	let listVertexB = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 + 1 - n) / n;
		let x = Math.cos(arc);
		let y = Math.sin(arc);
		listVertexB.push(new Vector3D(x, y, -z));
	};
	/** @type {Polygon3D[]} */
	let listFace = [];
	for (let i = 1; i < n; ++i) {
		listFace.push(new Polygon3D([
			listVertexA[i - 1],
			listVertexB[i - 1],
			listVertexA[i],
		], colorA));
		listFace.push(new Polygon3D([
			listVertexB[i - 1],
			listVertexA[i],
			listVertexB[i],
		], colorA));
	};
	listFace.push(new Polygon3D([
		listVertexA[n - 1],
		listVertexB[n - 1],
		listVertexA[0],
	], colorA));
	listFace.push(new Polygon3D([
		listVertexB[n - 1],
		listVertexA[0],
		listVertexB[0],
	], colorA));
	listFace.push(new Polygon3D(listVertexA, colorA));
	listFace.push(new Polygon3D(listVertexB, colorA));
	let r = listVertexA[0].Length();
	let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));
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

// ======================== 雙角錐 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.bipyramid'), vLight, focal);
	let rh = 1 / Math.sin(Math.PI / n);
	let rw = 1 / Math.cos(Math.PI / n);
	let vertexA = new Vector3D(0, 0, +rh);
	let vertexB = new Vector3D(0, 0, -rh);
	/** @type {Vector3D[]} */
	let listVertexA = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 - n) / n;
		let x = Math.cos(arc) * rw;
		let y = Math.sin(arc) * rw;
		listVertexA.push(new Vector3D(x, y, 0));
	};
	/** @type {Polygon3D[]} */
	let listFace = [];
	for (let i = 1; i < n; ++i) {
		listFace.push(new Polygon3D([
			vertexA,
			listVertexA[i - 1],
			listVertexA[i],
		], colorA));
		listFace.push(new Polygon3D([
			vertexB,
			listVertexA[i - 1],
			listVertexA[i],
		], colorA));
	};
	listFace.push(new Polygon3D([
		vertexA,
		listVertexA[n - 1],
		listVertexA[0],
	], colorA));
	listFace.push(new Polygon3D([
		vertexB,
		listVertexA[n - 1],
		listVertexA[0],
	], colorA));
	let r = (rh > rw ? rh : rw);
	let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));
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

// ======================== 反雙角錐 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.antibipyramid'), vLight, focal);
	let t = Math.sin(Math.PI / (n * 2)) * Math.sqrt(Math.cos(Math.PI / n) * 2 + 1);
	let z = t / (Math.cos(Math.PI / n) * 2 + 1);
	let rh = (Math.cos(Math.PI / n) + 1) / (t * 2);
	let vertexA = new Vector3D(0, 0, +rh);
	let vertexB = new Vector3D(0, 0, -rh);
	/** @type {Vector3D[]} */
	let listVertexA = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 - n) / n;
		let x = Math.cos(arc);
		let y = Math.sin(arc);
		listVertexA.push(new Vector3D(x, y, -z));
	};
	/** @type {Vector3D[]} */
	let listVertexB = [];
	for (let i = 0; i < n; ++i) {
		let arc = Math.PI * (i * 2 + 1 - n) / n;
		let x = Math.cos(arc);
		let y = Math.sin(arc);
		listVertexB.push(new Vector3D(x, y, +z));
	};
	/** @type {Polygon3D[]} */
	let listFace = [];
	for (let i = 1; i < n; ++i) {
		listFace.push(new Polygon3D([
			vertexB,
			listVertexA[i - 1],
			listVertexB[i - 1],
			listVertexA[i],
		], colorA));
		listFace.push(new Polygon3D([
			vertexA,
			listVertexB[i - 1],
			listVertexA[i],
			listVertexB[i],
		], colorA));
	};
	listFace.push(new Polygon3D([
		vertexB,
		listVertexA[n - 1],
		listVertexB[n - 1],
		listVertexA[0],
	], colorA));
	listFace.push(new Polygon3D([
		vertexA,
		listVertexB[n - 1],
		listVertexA[0],
		listVertexB[0],
	], colorA));
	let rw = listVertexA[0].Length();
	let r = (rh > rw ? rh : rw);
	let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));
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
