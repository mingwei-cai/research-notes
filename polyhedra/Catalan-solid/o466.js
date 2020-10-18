import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-o466'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = Math.SQRT1_2;
let vertexA = Point.At(
	new Point(kA, 0, kA),
	new Point(0, 0, kA * 2),
	1 / 3,
);

let dualA = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o11]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o12]),
]);
let dualB = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o10]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o30]),
	vertexA.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o50]),
]);

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o02]),
], 0, colorA);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00]),
	faceA.Map(Point.listSymmetry[0o03]),
	faceA.Map(Point.listSymmetry[0o05]),
	faceA.Map(Point.listSymmetry[0o06]),
	faceA.Map(Point.listSymmetry[0o20]),
	faceA.Map(Point.listSymmetry[0o23]),
	faceA.Map(Point.listSymmetry[0o25]),
	faceA.Map(Point.listSymmetry[0o26]),
	faceA.Map(Point.listSymmetry[0o40]),
	faceA.Map(Point.listSymmetry[0o43]),
	faceA.Map(Point.listSymmetry[0o45]),
	faceA.Map(Point.listSymmetry[0o46]),
	faceA.Map(Point.listSymmetry[0o11]),
	faceA.Map(Point.listSymmetry[0o12]),
	faceA.Map(Point.listSymmetry[0o14]),
	faceA.Map(Point.listSymmetry[0o17]),
	faceA.Map(Point.listSymmetry[0o31]),
	faceA.Map(Point.listSymmetry[0o32]),
	faceA.Map(Point.listSymmetry[0o34]),
	faceA.Map(Point.listSymmetry[0o37]),
	faceA.Map(Point.listSymmetry[0o51]),
	faceA.Map(Point.listSymmetry[0o52]),
	faceA.Map(Point.listSymmetry[0o54]),
	faceA.Map(Point.listSymmetry[0o57]),
]);

let listSolid = [solidA];
let arcZY = (Math.PI / 2) * (1 - 1 / 8);
let sinZY = Math.sin(arcZY);
let cosZY = Math.cos(arcZY);
let r = dualB.GetValue().GetLength();

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
