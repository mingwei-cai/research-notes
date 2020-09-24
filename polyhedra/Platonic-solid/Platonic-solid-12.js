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

let vertexA = new Point((Math.sqrt(5) + 1) / 2, 2 / (Math.sqrt(5) + 1), 0);
let vertexB = new Point(1, 1, 1);
let faceA = new Polygon([
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o10]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o00]),
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o30]),
	vertexA.CreatePoint(VectorPoint.listSymmetry[0o34]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o04]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o00]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o03]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o05]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o06]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o20]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o23]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o25]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o26]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o40]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o43]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o45]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o46]),
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
