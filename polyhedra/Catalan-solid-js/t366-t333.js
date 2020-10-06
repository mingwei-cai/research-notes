import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-t366-t333'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let vertexB0 = Point.At(
	new Point(1 / 3, 1 / 3, 1 / 3),
	new Point(1, 1, 1),
	2 / 5,
);
let vertexB1 = new Point(1 / 3, 1 / 3, 1 / 3);
let p = 0;
let vertexA = new Point(1, -1, 1);
let vertexB = vertexB0.Map((v) => Point.At(v, vertexB1, p));

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o00]),
], 0);
let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00], colorB),
	faceA.Map(Point.listSymmetry[0o03], colorA),
	faceA.Map(Point.listSymmetry[0o05], colorD),
	faceA.Map(Point.listSymmetry[0o06], colorC),
	faceA.Map(Point.listSymmetry[0o20], colorB),
	faceA.Map(Point.listSymmetry[0o23], colorA),
	faceA.Map(Point.listSymmetry[0o25], colorD),
	faceA.Map(Point.listSymmetry[0o26], colorC),
	faceA.Map(Point.listSymmetry[0o40], colorB),
	faceA.Map(Point.listSymmetry[0o43], colorA),
	faceA.Map(Point.listSymmetry[0o45], colorD),
	faceA.Map(Point.listSymmetry[0o46], colorC),
]);

let listSolid = [solidA];
let arcXY = Math.PI / 8;
let sinXY = Math.sin(arcXY);
let cosXY = Math.cos(arcXY);
let arcZY = (Math.PI / 2) * (1 - 1 / 8);
let sinZY = Math.sin(arcZY);
let cosZY = Math.cos(arcZY);

let DrawFrame = function () {
	let timeSec = performance.now() / 1000;
	let t = timeSec % 4;
	let tq = t | 0;
	let tr = t - tq;
	switch (tq) {
		case 0:
			p = 0;
			break;
		case 1:
			p = tr;
			break;
		case 2:
			p = 1;
			break;
		case 3:
			p = 1 - tr;
			break;
	};
	let r = vertexA.GetValue().GetLength();
	painter.Draw(listSolid, (v) => (new Point(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
