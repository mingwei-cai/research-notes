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
let painter = new Painter(document.querySelector('canvas.Archimedean-3-4-3-4'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = new Point(Math.SQRT1_2, 0, Math.SQRT1_2);
let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o11]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexA.Map(VectorPoint.listSymmetry[0o12]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o20]),
	vertexA.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o00]),
	faceA.Map(VectorPoint.listSymmetry[0o20]),
	faceA.Map(VectorPoint.listSymmetry[0o40]),
	faceA.Map(VectorPoint.listSymmetry[0o17]),
	faceA.Map(VectorPoint.listSymmetry[0o37]),
	faceA.Map(VectorPoint.listSymmetry[0o57]),

	faceB.Map(VectorPoint.listSymmetry[0o00]),
	faceB.Map(VectorPoint.listSymmetry[0o01]),
	faceB.Map(VectorPoint.listSymmetry[0o02]),
	faceB.Map(VectorPoint.listSymmetry[0o03]),
	faceB.Map(VectorPoint.listSymmetry[0o04]),
	faceB.Map(VectorPoint.listSymmetry[0o05]),
	faceB.Map(VectorPoint.listSymmetry[0o06]),
	faceB.Map(VectorPoint.listSymmetry[0o07]),
]);
let listSolid = [solidA];

/** @type {(timeSec: number) => void} */
let DrawFrame = function (timeSec) {
	let arcXY = timeSec * (Math.PI / 4);
	let sinXY = Math.sin(arcXY);
	let cosXY = Math.cos(arcXY);
	let arcZY = Math.PI * (0.5 - 1 / 16);
	let sinZY = Math.sin(arcZY);
	let cosZY = Math.cos(arcZY);
	let r = vertexA.GetValue().GetLength();
	painter.Draw(listSolid, (v) => (new VectorPoint(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
};

export { DrawFrame };
