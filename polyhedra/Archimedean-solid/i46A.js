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
let painter = new Painter(document.querySelector('canvas.Archimedean-i46A'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);

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

let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o01]),
	vertexE.Map(VectorPoint.listSymmetry[0o01]),
	vertexB.Map(VectorPoint.listSymmetry[0o01]),
	vertexD.Map(VectorPoint.listSymmetry[0o01]),
	vertexA.Map(VectorPoint.listSymmetry[0o01]),
], 0, colorA);
let faceB = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexE.Map(VectorPoint.listSymmetry[0o20]),
	vertexB.Map(VectorPoint.listSymmetry[0o40]),
	vertexE.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorB);
let faceC = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o40]),
	vertexC.Map(VectorPoint.listSymmetry[0o42]),
	vertexD.Map(VectorPoint.listSymmetry[0o02]),
	vertexA.Map(VectorPoint.listSymmetry[0o02]),
], 0, colorB);
let faceD = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o01]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexA.Map(VectorPoint.listSymmetry[0o02]),
], 0, colorC);
let faceE = new Polygon([
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o40]),
	vertexC.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorC);

let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o00]),
	faceA.Map(VectorPoint.listSymmetry[0o03]),
	faceA.Map(VectorPoint.listSymmetry[0o05]),
	faceA.Map(VectorPoint.listSymmetry[0o06]),
	faceA.Map(VectorPoint.listSymmetry[0o20]),
	faceA.Map(VectorPoint.listSymmetry[0o23]),
	faceA.Map(VectorPoint.listSymmetry[0o25]),
	faceA.Map(VectorPoint.listSymmetry[0o26]),
	faceA.Map(VectorPoint.listSymmetry[0o40]),
	faceA.Map(VectorPoint.listSymmetry[0o43]),
	faceA.Map(VectorPoint.listSymmetry[0o45]),
	faceA.Map(VectorPoint.listSymmetry[0o46]),

	faceB.Map(VectorPoint.listSymmetry[0o00]),
	faceB.Map(VectorPoint.listSymmetry[0o01]),
	faceB.Map(VectorPoint.listSymmetry[0o02]),
	faceB.Map(VectorPoint.listSymmetry[0o03]),
	faceB.Map(VectorPoint.listSymmetry[0o04]),
	faceB.Map(VectorPoint.listSymmetry[0o05]),
	faceB.Map(VectorPoint.listSymmetry[0o06]),
	faceB.Map(VectorPoint.listSymmetry[0o07]),

	faceC.Map(VectorPoint.listSymmetry[0o00]),
	faceC.Map(VectorPoint.listSymmetry[0o03]),
	faceC.Map(VectorPoint.listSymmetry[0o05]),
	faceC.Map(VectorPoint.listSymmetry[0o06]),
	faceC.Map(VectorPoint.listSymmetry[0o20]),
	faceC.Map(VectorPoint.listSymmetry[0o23]),
	faceC.Map(VectorPoint.listSymmetry[0o25]),
	faceC.Map(VectorPoint.listSymmetry[0o26]),
	faceC.Map(VectorPoint.listSymmetry[0o40]),
	faceC.Map(VectorPoint.listSymmetry[0o43]),
	faceC.Map(VectorPoint.listSymmetry[0o45]),
	faceC.Map(VectorPoint.listSymmetry[0o46]),

	faceD.Map(VectorPoint.listSymmetry[0o00]),
	faceD.Map(VectorPoint.listSymmetry[0o20]),
	faceD.Map(VectorPoint.listSymmetry[0o40]),
	faceD.Map(VectorPoint.listSymmetry[0o17]),
	faceD.Map(VectorPoint.listSymmetry[0o37]),
	faceD.Map(VectorPoint.listSymmetry[0o57]),

	faceE.Map(VectorPoint.listSymmetry[0o00]),
	faceE.Map(VectorPoint.listSymmetry[0o01]),
	faceE.Map(VectorPoint.listSymmetry[0o02]),
	faceE.Map(VectorPoint.listSymmetry[0o03]),
	faceE.Map(VectorPoint.listSymmetry[0o04]),
	faceE.Map(VectorPoint.listSymmetry[0o05]),
	faceE.Map(VectorPoint.listSymmetry[0o06]),
	faceE.Map(VectorPoint.listSymmetry[0o07]),
	faceE.Map(VectorPoint.listSymmetry[0o20]),
	faceE.Map(VectorPoint.listSymmetry[0o21]),
	faceE.Map(VectorPoint.listSymmetry[0o22]),
	faceE.Map(VectorPoint.listSymmetry[0o23]),
	faceE.Map(VectorPoint.listSymmetry[0o24]),
	faceE.Map(VectorPoint.listSymmetry[0o25]),
	faceE.Map(VectorPoint.listSymmetry[0o26]),
	faceE.Map(VectorPoint.listSymmetry[0o27]),
	faceE.Map(VectorPoint.listSymmetry[0o40]),
	faceE.Map(VectorPoint.listSymmetry[0o41]),
	faceE.Map(VectorPoint.listSymmetry[0o42]),
	faceE.Map(VectorPoint.listSymmetry[0o43]),
	faceE.Map(VectorPoint.listSymmetry[0o44]),
	faceE.Map(VectorPoint.listSymmetry[0o45]),
	faceE.Map(VectorPoint.listSymmetry[0o46]),
	faceE.Map(VectorPoint.listSymmetry[0o47]),
]);

let listSolid = [solidA];
let arcZY = Math.PI * (0.5 - 1 / 16);
let sinZY = Math.sin(arcZY);
let cosZY = Math.cos(arcZY);
let r = vertexA.GetValue().GetLength();

let DrawFrame = function () {
	let timeSec = performance.now() / 1000;
	let arcXY = timeSec * (Math.PI / 4);
	let sinXY = Math.sin(arcXY);
	let cosXY = Math.cos(arcXY);
	painter.Draw(listSolid, (v) => (new VectorPoint(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
