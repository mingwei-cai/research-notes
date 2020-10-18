import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-o468'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = Math.SQRT1_2;
let vertexA = Point.At(
	new Point(1 / (kA * 2 + 1), 1 / (kA * 2 + 1), 1),
	new Point(kA, 0, kA),
	2 / (kA * 2 + 3),
);

let dualA = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o10]),
	vertexA.Map(Point.listSymmetry[0o11]),
	vertexA.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o13]),
	vertexA.Map(Point.listSymmetry[0o12]),
	vertexA.Map(Point.listSymmetry[0o02]),
]);
let dualB = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o10]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o30]),
	vertexA.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o50]),
]);
let dualC = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o50]),
	vertexA.Map(Point.listSymmetry[0o52]),
	vertexA.Map(Point.listSymmetry[0o02]),
]);

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualC.Map(Point.listSymmetry[0o00]),
], 0, colorA);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00]),
	faceA.Map(Point.listSymmetry[0o01]),
	faceA.Map(Point.listSymmetry[0o02]),
	faceA.Map(Point.listSymmetry[0o03]),
	faceA.Map(Point.listSymmetry[0o04]),
	faceA.Map(Point.listSymmetry[0o05]),
	faceA.Map(Point.listSymmetry[0o06]),
	faceA.Map(Point.listSymmetry[0o07]),
	faceA.Map(Point.listSymmetry[0o10]),
	faceA.Map(Point.listSymmetry[0o11]),
	faceA.Map(Point.listSymmetry[0o12]),
	faceA.Map(Point.listSymmetry[0o13]),
	faceA.Map(Point.listSymmetry[0o14]),
	faceA.Map(Point.listSymmetry[0o15]),
	faceA.Map(Point.listSymmetry[0o16]),
	faceA.Map(Point.listSymmetry[0o17]),
	faceA.Map(Point.listSymmetry[0o20]),
	faceA.Map(Point.listSymmetry[0o21]),
	faceA.Map(Point.listSymmetry[0o22]),
	faceA.Map(Point.listSymmetry[0o23]),
	faceA.Map(Point.listSymmetry[0o24]),
	faceA.Map(Point.listSymmetry[0o25]),
	faceA.Map(Point.listSymmetry[0o26]),
	faceA.Map(Point.listSymmetry[0o27]),
	faceA.Map(Point.listSymmetry[0o30]),
	faceA.Map(Point.listSymmetry[0o31]),
	faceA.Map(Point.listSymmetry[0o32]),
	faceA.Map(Point.listSymmetry[0o33]),
	faceA.Map(Point.listSymmetry[0o34]),
	faceA.Map(Point.listSymmetry[0o35]),
	faceA.Map(Point.listSymmetry[0o36]),
	faceA.Map(Point.listSymmetry[0o37]),
	faceA.Map(Point.listSymmetry[0o40]),
	faceA.Map(Point.listSymmetry[0o41]),
	faceA.Map(Point.listSymmetry[0o42]),
	faceA.Map(Point.listSymmetry[0o43]),
	faceA.Map(Point.listSymmetry[0o44]),
	faceA.Map(Point.listSymmetry[0o45]),
	faceA.Map(Point.listSymmetry[0o46]),
	faceA.Map(Point.listSymmetry[0o47]),
	faceA.Map(Point.listSymmetry[0o50]),
	faceA.Map(Point.listSymmetry[0o51]),
	faceA.Map(Point.listSymmetry[0o52]),
	faceA.Map(Point.listSymmetry[0o53]),
	faceA.Map(Point.listSymmetry[0o54]),
	faceA.Map(Point.listSymmetry[0o55]),
	faceA.Map(Point.listSymmetry[0o56]),
	faceA.Map(Point.listSymmetry[0o57]),
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
