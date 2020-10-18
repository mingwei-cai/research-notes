import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-o388-o444'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = Math.SQRT1_2;
let vertexA = Point.At(
	new Point(kA, 0, kA),
	new Point(kA, kA, kA),
	1 / (kA * 2 + 1),
);

let dualA0 = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o10]),
	vertexA.Map(Point.listSymmetry[0o11]),
	vertexA.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o13]),
	vertexA.Map(Point.listSymmetry[0o12]),
	vertexA.Map(Point.listSymmetry[0o02]),
]);
let dualB0 = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o40]),
]);

let dualA1 = dualA0;
let dualB1 = new Point(kA * 2 / 3, kA * 2 / 3, kA * 2 / 3);

let p = 0;
let dualA = dualA0.Map((v) => Point.At(v, dualA1, p));
let dualB = dualB0.Map((v) => Point.At(v, dualB1, p));
let r0 = dualA0.GetLength();
let r1 = dualA1.GetLength();

let faceA = new Polygon([
	dualB.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o40]),
], 0);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00], colorA),
	faceA.Map(Point.listSymmetry[0o03], colorA),
	faceA.Map(Point.listSymmetry[0o05], colorA),
	faceA.Map(Point.listSymmetry[0o06], colorA),
	faceA.Map(Point.listSymmetry[0o20], colorA),
	faceA.Map(Point.listSymmetry[0o23], colorA),
	faceA.Map(Point.listSymmetry[0o25], colorA),
	faceA.Map(Point.listSymmetry[0o26], colorA),
	faceA.Map(Point.listSymmetry[0o40], colorA),
	faceA.Map(Point.listSymmetry[0o43], colorA),
	faceA.Map(Point.listSymmetry[0o45], colorA),
	faceA.Map(Point.listSymmetry[0o46], colorA),
	faceA.Map(Point.listSymmetry[0o01], colorB),
	faceA.Map(Point.listSymmetry[0o02], colorB),
	faceA.Map(Point.listSymmetry[0o04], colorB),
	faceA.Map(Point.listSymmetry[0o07], colorB),
	faceA.Map(Point.listSymmetry[0o21], colorB),
	faceA.Map(Point.listSymmetry[0o22], colorB),
	faceA.Map(Point.listSymmetry[0o24], colorB),
	faceA.Map(Point.listSymmetry[0o27], colorB),
	faceA.Map(Point.listSymmetry[0o41], colorB),
	faceA.Map(Point.listSymmetry[0o42], colorB),
	faceA.Map(Point.listSymmetry[0o44], colorB),
	faceA.Map(Point.listSymmetry[0o47], colorB),
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
	let r = r0 + (r1 - r0) * p;
	painter.Draw(listSolid, (v) => (new Point(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
