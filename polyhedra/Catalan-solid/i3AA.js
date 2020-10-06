import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i3AA'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA = Point.At(
	new Point(0, 0, 1),
	new Point(1 / (kA + 2), 0, 1),
	1 / (kA * 2 + 1),
);
let vertexB = Point.At(
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	new Point(1 / (kA + 2), 0, 1),
	1 / (kA * 2 + 1),
);
let vertexC = Point.At(
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	new Point(kA, kA, kA),
	1 / (kA * 2 + 1),
);

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o21]),
	vertexC.Map(Point.listSymmetry[0o21]),
	vertexC.Map(Point.listSymmetry[0o01]),
	vertexB.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o01]),
], 0, colorA);
let faceB = new Polygon([
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o20]),
	vertexC.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceC = new Polygon([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o02]),
], 0, colorB);

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

	faceC.Map(Point.listSymmetry[0o00]),
	faceC.Map(Point.listSymmetry[0o03]),
	faceC.Map(Point.listSymmetry[0o05]),
	faceC.Map(Point.listSymmetry[0o06]),
	faceC.Map(Point.listSymmetry[0o20]),
	faceC.Map(Point.listSymmetry[0o23]),
	faceC.Map(Point.listSymmetry[0o25]),
	faceC.Map(Point.listSymmetry[0o26]),
	faceC.Map(Point.listSymmetry[0o40]),
	faceC.Map(Point.listSymmetry[0o43]),
	faceC.Map(Point.listSymmetry[0o45]),
	faceC.Map(Point.listSymmetry[0o46]),

	faceB.Map(Point.listSymmetry[0o00]),
	faceB.Map(Point.listSymmetry[0o01]),
	faceB.Map(Point.listSymmetry[0o02]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o04]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o07]),
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
