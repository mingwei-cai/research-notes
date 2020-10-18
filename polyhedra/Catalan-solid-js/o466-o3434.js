import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-o466-o3434'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = Math.SQRT1_2;

let vertexA0 = Point.At(
	new Point(kA, 0, kA),
	new Point(0, 0, kA * 2),
	1 / 3,
);
let dualA0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexA0.Map(Point.listSymmetry[0o11]),
	vertexA0.Map(Point.listSymmetry[0o03]),
	vertexA0.Map(Point.listSymmetry[0o12]),
]);
let dualB0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexA0.Map(Point.listSymmetry[0o10]),
	vertexA0.Map(Point.listSymmetry[0o20]),
	vertexA0.Map(Point.listSymmetry[0o30]),
	vertexA0.Map(Point.listSymmetry[0o40]),
	vertexA0.Map(Point.listSymmetry[0o50]),
]);

let vertexA1 = new Point(kA, 0, kA);
let dualA1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexA1.Map(Point.listSymmetry[0o12]),
	vertexA1.Map(Point.listSymmetry[0o03]),
	vertexA1.Map(Point.listSymmetry[0o11]),
]);
let dualB1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexA1.Map(Point.listSymmetry[0o20]),
	vertexA1.Map(Point.listSymmetry[0o40]),
]);

let p = 0;
let dualA = dualA0.Map((v) => Point.At(v, dualA1, p));
let dualB = dualB0.Map((v) => Point.At(v, dualB1, p));
let r0 = dualB0.GetLength();
let r1 = dualA1.GetLength();

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualB.Map(Point.listSymmetry[0o02]),
], 0);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00], colorA),
	faceA.Map(Point.listSymmetry[0o03], colorA),
	faceA.Map(Point.listSymmetry[0o05], colorA),
	faceA.Map(Point.listSymmetry[0o06], colorA),
	faceA.Map(Point.listSymmetry[0o20], colorB),
	faceA.Map(Point.listSymmetry[0o23], colorB),
	faceA.Map(Point.listSymmetry[0o25], colorB),
	faceA.Map(Point.listSymmetry[0o26], colorB),
	faceA.Map(Point.listSymmetry[0o40], colorC),
	faceA.Map(Point.listSymmetry[0o43], colorC),
	faceA.Map(Point.listSymmetry[0o45], colorC),
	faceA.Map(Point.listSymmetry[0o46], colorC),
	faceA.Map(Point.listSymmetry[0o11], colorB),
	faceA.Map(Point.listSymmetry[0o12], colorB),
	faceA.Map(Point.listSymmetry[0o14], colorB),
	faceA.Map(Point.listSymmetry[0o17], colorB),
	faceA.Map(Point.listSymmetry[0o31], colorC),
	faceA.Map(Point.listSymmetry[0o32], colorC),
	faceA.Map(Point.listSymmetry[0o34], colorC),
	faceA.Map(Point.listSymmetry[0o37], colorC),
	faceA.Map(Point.listSymmetry[0o51], colorA),
	faceA.Map(Point.listSymmetry[0o52], colorA),
	faceA.Map(Point.listSymmetry[0o54], colorA),
	faceA.Map(Point.listSymmetry[0o57], colorA),
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
