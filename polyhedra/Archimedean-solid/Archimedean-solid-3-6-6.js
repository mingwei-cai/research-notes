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
let painter = new Painter(document.querySelector('canvas.Archimedean-3-6-6'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = Point.At(
	new Point(0, 0, 1),
	new Point(1, 1, 1),
	1 / 3,
);
let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o02]),
	vertexA.Map(VectorPoint.listSymmetry[0o01]),
	vertexA.Map(VectorPoint.listSymmetry[0o21]),
	vertexA.Map(VectorPoint.listSymmetry[0o24]),
	vertexA.Map(VectorPoint.listSymmetry[0o44]),
	vertexA.Map(VectorPoint.listSymmetry[0o42]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o20]),
	vertexA.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o00]),
	faceA.Map(VectorPoint.listSymmetry[0o03]),
	faceA.Map(VectorPoint.listSymmetry[0o05]),
	faceA.Map(VectorPoint.listSymmetry[0o06]),

	faceB.Map(VectorPoint.listSymmetry[0o01]),
	faceB.Map(VectorPoint.listSymmetry[0o02]),
	faceB.Map(VectorPoint.listSymmetry[0o04]),
	faceB.Map(VectorPoint.listSymmetry[0o07]),
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
