import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i46A'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA = Point.At(
	new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1),
	new Point(0, 0, 1),
	2 / (kA + 4),
);
let vertexB = Point.At(
	new Point(1 / (kA + 2), kA, 2 / (kA + 2)),
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	2 / (kA + 4),
);
let vertexC = Point.At(
	new Point(0, (kA * 2 + 1) / (kA + 2), kA),
	new Point(kA / 2, (kA + 1) / 2, 1 / 2),
	2 / (kA + 4),
);
let vertexD = Point.At(
	new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1),
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	2 / (kA + 4),
);
let vertexE = Point.At(
	new Point(1 / (kA + 2), kA, 2 / (kA + 2)),
	new Point(kA / 2, (kA + 1) / 2, 1 / 2),
	2 / (kA + 4),
);

let dualA = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o01]),
	vertexE.Map(Point.listSymmetry[0o01]),
	vertexB.Map(Point.listSymmetry[0o01]),
	vertexD.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o01]),
]);
let dualB = Point.Dual([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o40]),
	vertexE.Map(Point.listSymmetry[0o40]),
]);
let dualC = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o40]),
	vertexC.Map(Point.listSymmetry[0o42]),
	vertexD.Map(Point.listSymmetry[0o02]),
	vertexA.Map(Point.listSymmetry[0o02]),
]);
let dualD = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o02]),
]);
let dualE = Point.Dual([
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o40]),
	vertexC.Map(Point.listSymmetry[0o40]),
]);

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualC.Map(Point.listSymmetry[0o00]),
	dualD.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceB = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualC.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceC = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceD = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o20]),
], 0, colorA);
let faceE = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualC.Map(Point.listSymmetry[0o20]),
	dualE.Map(Point.listSymmetry[0o20]),
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
	faceA.Map(Point.listSymmetry[0o20]),
	faceA.Map(Point.listSymmetry[0o21]),
	faceA.Map(Point.listSymmetry[0o22]),
	faceA.Map(Point.listSymmetry[0o23]),
	faceA.Map(Point.listSymmetry[0o24]),
	faceA.Map(Point.listSymmetry[0o25]),
	faceA.Map(Point.listSymmetry[0o26]),
	faceA.Map(Point.listSymmetry[0o27]),
	faceA.Map(Point.listSymmetry[0o40]),
	faceA.Map(Point.listSymmetry[0o41]),
	faceA.Map(Point.listSymmetry[0o42]),
	faceA.Map(Point.listSymmetry[0o43]),
	faceA.Map(Point.listSymmetry[0o44]),
	faceA.Map(Point.listSymmetry[0o45]),
	faceA.Map(Point.listSymmetry[0o46]),
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

	faceC.Map(Point.listSymmetry[0o00]),
	faceC.Map(Point.listSymmetry[0o01]),
	faceC.Map(Point.listSymmetry[0o02]),
	faceC.Map(Point.listSymmetry[0o03]),
	faceC.Map(Point.listSymmetry[0o04]),
	faceC.Map(Point.listSymmetry[0o05]),
	faceC.Map(Point.listSymmetry[0o06]),
	faceC.Map(Point.listSymmetry[0o07]),
	faceC.Map(Point.listSymmetry[0o20]),
	faceC.Map(Point.listSymmetry[0o21]),
	faceC.Map(Point.listSymmetry[0o22]),
	faceC.Map(Point.listSymmetry[0o23]),
	faceC.Map(Point.listSymmetry[0o24]),
	faceC.Map(Point.listSymmetry[0o25]),
	faceC.Map(Point.listSymmetry[0o26]),
	faceC.Map(Point.listSymmetry[0o27]),
	faceC.Map(Point.listSymmetry[0o40]),
	faceC.Map(Point.listSymmetry[0o41]),
	faceC.Map(Point.listSymmetry[0o42]),
	faceC.Map(Point.listSymmetry[0o43]),
	faceC.Map(Point.listSymmetry[0o44]),
	faceC.Map(Point.listSymmetry[0o45]),
	faceC.Map(Point.listSymmetry[0o46]),
	faceC.Map(Point.listSymmetry[0o47]),

	faceD.Map(Point.listSymmetry[0o00]),
	faceD.Map(Point.listSymmetry[0o01]),
	faceD.Map(Point.listSymmetry[0o02]),
	faceD.Map(Point.listSymmetry[0o03]),
	faceD.Map(Point.listSymmetry[0o04]),
	faceD.Map(Point.listSymmetry[0o05]),
	faceD.Map(Point.listSymmetry[0o06]),
	faceD.Map(Point.listSymmetry[0o07]),
	faceD.Map(Point.listSymmetry[0o20]),
	faceD.Map(Point.listSymmetry[0o21]),
	faceD.Map(Point.listSymmetry[0o22]),
	faceD.Map(Point.listSymmetry[0o23]),
	faceD.Map(Point.listSymmetry[0o24]),
	faceD.Map(Point.listSymmetry[0o25]),
	faceD.Map(Point.listSymmetry[0o26]),
	faceD.Map(Point.listSymmetry[0o27]),
	faceD.Map(Point.listSymmetry[0o40]),
	faceD.Map(Point.listSymmetry[0o41]),
	faceD.Map(Point.listSymmetry[0o42]),
	faceD.Map(Point.listSymmetry[0o43]),
	faceD.Map(Point.listSymmetry[0o44]),
	faceD.Map(Point.listSymmetry[0o45]),
	faceD.Map(Point.listSymmetry[0o46]),
	faceD.Map(Point.listSymmetry[0o47]),

	faceE.Map(Point.listSymmetry[0o00]),
	faceE.Map(Point.listSymmetry[0o01]),
	faceE.Map(Point.listSymmetry[0o02]),
	faceE.Map(Point.listSymmetry[0o03]),
	faceE.Map(Point.listSymmetry[0o04]),
	faceE.Map(Point.listSymmetry[0o05]),
	faceE.Map(Point.listSymmetry[0o06]),
	faceE.Map(Point.listSymmetry[0o07]),
	faceE.Map(Point.listSymmetry[0o20]),
	faceE.Map(Point.listSymmetry[0o21]),
	faceE.Map(Point.listSymmetry[0o22]),
	faceE.Map(Point.listSymmetry[0o23]),
	faceE.Map(Point.listSymmetry[0o24]),
	faceE.Map(Point.listSymmetry[0o25]),
	faceE.Map(Point.listSymmetry[0o26]),
	faceE.Map(Point.listSymmetry[0o27]),
	faceE.Map(Point.listSymmetry[0o40]),
	faceE.Map(Point.listSymmetry[0o41]),
	faceE.Map(Point.listSymmetry[0o42]),
	faceE.Map(Point.listSymmetry[0o43]),
	faceE.Map(Point.listSymmetry[0o44]),
	faceE.Map(Point.listSymmetry[0o45]),
	faceE.Map(Point.listSymmetry[0o46]),
	faceE.Map(Point.listSymmetry[0o47]),
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
