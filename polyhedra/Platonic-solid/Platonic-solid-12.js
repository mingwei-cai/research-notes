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
let painter = new Painter(document.querySelector('canvas.Platonic-12'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = new Point(0, 2 / (3 + Math.sqrt(5)), 1);
let vertexB = new Point(2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1));
let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o30]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o10]),
	vertexA.Map(VectorPoint.listSymmetry[0o11]),
	vertexB.Map(VectorPoint.listSymmetry[0o01]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o10]),
	faceA.Map(VectorPoint.listSymmetry[0o13]),
	faceA.Map(VectorPoint.listSymmetry[0o15]),
	faceA.Map(VectorPoint.listSymmetry[0o16]),
	faceA.Map(VectorPoint.listSymmetry[0o30]),
	faceA.Map(VectorPoint.listSymmetry[0o33]),
	faceA.Map(VectorPoint.listSymmetry[0o35]),
	faceA.Map(VectorPoint.listSymmetry[0o36]),
	faceA.Map(VectorPoint.listSymmetry[0o50]),
	faceA.Map(VectorPoint.listSymmetry[0o53]),
	faceA.Map(VectorPoint.listSymmetry[0o55]),
	faceA.Map(VectorPoint.listSymmetry[0o56]),
]);

let r = vertexA.GetValue().GetLength();
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
