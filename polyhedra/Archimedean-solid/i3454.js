import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Archimedean-i3454'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA = new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexB = new Point(1 / (kA + 2), kA, 2 / (kA + 2));
let vertexC = new Point(0, (kA * 2 + 1) / (kA + 2), kA);

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o01]),
], 0, colorA);
let faceB = new Polygon([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceC = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o02]),
], 0, colorB);
let faceD = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o02]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o01]),
], 0, colorC);
let faceE = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o40]),
	vertexC.Map(Point.listSymmetry[0o40]),
], 0, colorC);

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

	faceB.Map(Point.listSymmetry[0o00]),
	faceB.Map(Point.listSymmetry[0o01]),
	faceB.Map(Point.listSymmetry[0o02]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o04]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o07]),

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

	faceD.Map(Point.listSymmetry[0o00]),
	faceD.Map(Point.listSymmetry[0o20]),
	faceD.Map(Point.listSymmetry[0o40]),
	faceD.Map(Point.listSymmetry[0o17]),
	faceD.Map(Point.listSymmetry[0o37]),
	faceD.Map(Point.listSymmetry[0o57]),

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
