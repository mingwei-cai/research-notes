import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i3535'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA = new Point(0, 0, 1);
let vertexB = new Point(1 / 2, kA / 2, (kA + 1) / 2);

let dualA = Point.Dual([
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o01]),
	vertexB.Map(Point.listSymmetry[0o21]),
]);
let dualB = Point.Dual([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o40]),
]);
let dualC = Point.Dual([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o02]),
]);

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualC.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o03]),
	dualC.Map(Point.listSymmetry[0o03]),
], 0, colorA);
let faceB = new Polygon([
	dualC.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o40]),
], 0, colorA);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00]),
	faceA.Map(Point.listSymmetry[0o20]),
	faceA.Map(Point.listSymmetry[0o40]),
	faceA.Map(Point.listSymmetry[0o07]),
	faceA.Map(Point.listSymmetry[0o27]),
	faceA.Map(Point.listSymmetry[0o47]),

	faceB.Map(Point.listSymmetry[0o00]),
	faceB.Map(Point.listSymmetry[0o01]),
	faceB.Map(Point.listSymmetry[0o02]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o04]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o07]),
	faceB.Map(Point.listSymmetry[0o20]),
	faceB.Map(Point.listSymmetry[0o21]),
	faceB.Map(Point.listSymmetry[0o22]),
	faceB.Map(Point.listSymmetry[0o23]),
	faceB.Map(Point.listSymmetry[0o24]),
	faceB.Map(Point.listSymmetry[0o25]),
	faceB.Map(Point.listSymmetry[0o26]),
	faceB.Map(Point.listSymmetry[0o27]),
	faceB.Map(Point.listSymmetry[0o40]),
	faceB.Map(Point.listSymmetry[0o41]),
	faceB.Map(Point.listSymmetry[0o42]),
	faceB.Map(Point.listSymmetry[0o43]),
	faceB.Map(Point.listSymmetry[0o44]),
	faceB.Map(Point.listSymmetry[0o45]),
	faceB.Map(Point.listSymmetry[0o46]),
	faceB.Map(Point.listSymmetry[0o47]),
]);

let listSolid = [solidA];
let arcZY = (Math.PI / 2) * (1 - 1 / 8);
let sinZY = Math.sin(arcZY);
let cosZY = Math.cos(arcZY);
let r = dualA.GetValue().GetLength();

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
