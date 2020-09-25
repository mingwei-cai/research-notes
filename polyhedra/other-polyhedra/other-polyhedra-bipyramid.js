import {
	Color,
	VectorPoint,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new VectorPoint(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.bipyramid'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let n = 5;
let rA = 1 / Math.cos(Math.PI / n);
let zA = 1 / Math.sin(Math.PI / n);
let vertexA = new Point(0, 0, +zA);
let vertexB = new Point(0, 0, -zA);
/** @type {Point[]} */
let listVertexA = [];
for (let i = 0; i < n; ++i) {
	let arc = Math.PI * (i * 2 - n) / n;
	let x = Math.cos(arc) * rA;
	let y = Math.sin(arc) * rA;
	listVertexA.push(new Point(x, y, 0));
};

/** @type {Polygon[]} */
let listFaceA = [];
for (let i = 1; i < n; ++i) {
	listFaceA.push(new Polygon([
		vertexA,
		listVertexA[i - 1],
		listVertexA[i],
	], 0, colorA));
	listFaceA.push(new Polygon([
		vertexB,
		listVertexA[i - 1],
		listVertexA[i],
	], 0, colorA));
};
listFaceA.push(new Polygon([
	vertexA,
	listVertexA[n - 1],
	listVertexA[0],
], 0, colorA));
listFaceA.push(new Polygon([
	vertexB,
	listVertexA[n - 1],
	listVertexA[0],
], 0, colorA));

let solidA = new Polyhedron(listFaceA);
let r = (zA > rA ? zA : rA);
let listSolid = [
	solidA.Map((v) => v.Div(r)),
];

/** @type {(timeSec: number) => void} */
let DrawFrame = function (timeSec) {
	let arcXY = timeSec * (Math.PI / 4);
	let arcZY = Math.PI * (0.5 - 1 / 16);
	let sinXY = Math.sin(arcXY);
	let sinZY = Math.sin(arcZY);
	let cosXY = Math.cos(arcXY);
	let cosZY = Math.cos(arcZY);
	painter.Draw(listSolid, (v) => (new VectorPoint(
		v.x * cosXY - v.y * sinXY,
		(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
		v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
	)), lineWidth);
};

export { DrawFrame };
