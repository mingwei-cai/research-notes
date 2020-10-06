import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-t366'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let vertexA = Point.At(
	new Point(0, 0, 1),
	new Point(1, -1, 1),
	1 / 3,
);

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o10]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o30]),
	vertexA.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o50]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(Point.listSymmetry[0o02]),
	vertexA.Map(Point.listSymmetry[0o21]),
	vertexA.Map(Point.listSymmetry[0o44]),
], 0, colorB);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o01]),
	faceA.Map(Point.listSymmetry[0o02]),
	faceA.Map(Point.listSymmetry[0o04]),
	faceA.Map(Point.listSymmetry[0o07]),

	faceB.Map(Point.listSymmetry[0o00]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
]);

let listSolid = [solidA];
let arcZY = (Math.PI / 2) * (1 - 1 / 8);
let sinZY = Math.sin(arcZY);
let cosZY = Math.cos(arcZY);
let r = vertexA.GetValue().GetLength();

let DrawFrame = function () {
	let timeSec = performance.now() / 1000;
	let arcXY = timeSec * (Math.PI / 4);
	let sinXY = Math.sin(arcXY);
	let cosXY = Math.cos(arcXY);
	painter.Draw(listSolid, (v) => (new Point(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
