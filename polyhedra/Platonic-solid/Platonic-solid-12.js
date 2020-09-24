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

let vertexA = new Point(0, 2 / (Math.sqrt(5) + 1), (Math.sqrt(5) + 1) / 2);
let vertexB = new Point(1, 1, 1);
let faceA = new Polygon([
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o10]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o00]),
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o50]),
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o51]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o01]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o10]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o13]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o15]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o16]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o30]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o33]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o35]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o36]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o50]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o53]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o55]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o56]),
]);

let r = vertexA.GetValue().GetLength();
let listSolid = [
	solidA.CreatePolyhedron((v) => v.Div(r)),
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
