import {
	Color,
	Vector2D,
	Polygon2D,
	Vector3D,
	Polygon3D,
	Transformation,
	Coloration,
	Batch,
	Painter,
} from "../polyhedra.js";

let vLight = new Vector3D(0, 3, 4);
let focalLength = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let n = 5;
let painter = new Painter(document.querySelector('canvas.antibipyramid'), vLight, focalLength);
let rA = Math.sqrt(Math.cos(Math.PI / n) * 2 + 1) / Math.cos(Math.PI / (n * 2));
let zA = Math.tan(Math.PI / (n * 2));
let zB = 1 / Math.tan(Math.PI / (n * 2));
let vertexA = new Vector3D(0, 0, +zB);
let vertexB = new Vector3D(0, 0, -zB);

/** @type {Vector3D[]} */
let listVertexA = [];
for (let i = 0; i < n; ++i) {
	let arc = Math.PI * (i * 2 - n) / n;
	let x = Math.cos(arc) * rA;
	let y = Math.sin(arc) * rA;
	listVertexA.push(new Vector3D(x, y, -zA));
};
/** @type {Vector3D[]} */
let listVertexB = [];
for (let i = 0; i < n; ++i) {
	let arc = Math.PI * (i * 2 + 1 - n) / n;
	let x = Math.cos(arc) * rA;
	let y = Math.sin(arc) * rA;
	listVertexB.push(new Vector3D(x, y, +zA));
};
/** @type {Polygon3D[]} */
let listFace = [];
for (let i = 1; i < n; ++i) {
	listFace.push(new Polygon3D([
		vertexB,
		listVertexA[i - 1],
		listVertexB[i - 1],
		listVertexA[i],
	], 0, colorA));
	listFace.push(new Polygon3D([
		vertexA,
		listVertexB[i - 1],
		listVertexA[i],
		listVertexB[i],
	], 0, colorA));
};
listFace.push(new Polygon3D([
	vertexB,
	listVertexA[n - 1],
	listVertexB[n - 1],
	listVertexA[0],
], 0, colorA));
listFace.push(new Polygon3D([
	vertexA,
	listVertexB[n - 1],
	listVertexA[0],
	listVertexB[0],
], 0, colorA));

let r = zB;
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
};

export { DrawFrame };
