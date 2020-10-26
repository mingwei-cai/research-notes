import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i3AA-i555'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA0 = Point.At(
	new Point(0, 0, 1),
	new Point(1 / (kA + 2), 0, 1),
	1 / (kA * 2 + 1),
);
let vertexB0 = Point.At(
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	new Point(1 / (kA + 2), 0, 1),
	1 / (kA * 2 + 1),
);
let vertexC0 = Point.At(
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	new Point(kA, kA, kA),
	1 / (kA * 2 + 1),
);

let dualA0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexB0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o20]),
	vertexB0.Map(Point.listSymmetry[0o20]),
	vertexB0.Map(Point.listSymmetry[0o21]),
	vertexC0.Map(Point.listSymmetry[0o21]),
	vertexC0.Map(Point.listSymmetry[0o01]),
	vertexB0.Map(Point.listSymmetry[0o01]),
	vertexA0.Map(Point.listSymmetry[0o01]),
]);
let dualB0 = Point.Dual([
	vertexC0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o20]),
	vertexC0.Map(Point.listSymmetry[0o40]),
]);
let dualC0 = Point.Dual([
	vertexB0.Map(Point.listSymmetry[0o00]),
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexB0.Map(Point.listSymmetry[0o02]),
]);

let dualA1 = dualA0;
let dualB1 = dualB0.Mul(dualB0.Dot(dualA0) / dualB0.Dot(dualB0));
let dualC1 = dualC0.Mul(dualC0.Dot(dualA0) / dualC0.Dot(dualC0));

let p = 0;
let dualA = dualA0.Map((v) => Point.At(v, dualA1, p));
let dualB = dualB0.Map((v) => Point.At(v, dualB1, p));
let dualC = dualC0.Map((v) => Point.At(v, dualC1, p));
let r0 = dualA0.GetLength();
let r1 = dualA1.GetLength();

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o03]),
	dualC.Map(Point.listSymmetry[0o00]),
], 0);
let faceB = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o40]),
	dualC.Map(Point.listSymmetry[0o00]),
], 0);
let faceC = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualA.Map(Point.listSymmetry[0o40]),
	dualB.Map(Point.listSymmetry[0o00]),
], 0);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00], colorB),
	faceA.Map(Point.listSymmetry[0o03], colorA),
	faceA.Map(Point.listSymmetry[0o05], colorD),
	faceA.Map(Point.listSymmetry[0o06], colorC),
	faceA.Map(Point.listSymmetry[0o20], colorC),
	faceA.Map(Point.listSymmetry[0o23], colorD),
	faceA.Map(Point.listSymmetry[0o25], colorA),
	faceA.Map(Point.listSymmetry[0o26], colorB),
	faceA.Map(Point.listSymmetry[0o40], colorD),
	faceA.Map(Point.listSymmetry[0o43], colorC),
	faceA.Map(Point.listSymmetry[0o45], colorB),
	faceA.Map(Point.listSymmetry[0o46], colorA),

	faceB.Map(Point.listSymmetry[0o00], colorB),
	faceB.Map(Point.listSymmetry[0o01], colorA),
	faceB.Map(Point.listSymmetry[0o02], colorB),
	faceB.Map(Point.listSymmetry[0o03], colorA),
	faceB.Map(Point.listSymmetry[0o04], colorC),
	faceB.Map(Point.listSymmetry[0o05], colorD),
	faceB.Map(Point.listSymmetry[0o06], colorC),
	faceB.Map(Point.listSymmetry[0o07], colorD),
	faceB.Map(Point.listSymmetry[0o20], colorC),
	faceB.Map(Point.listSymmetry[0o21], colorC),
	faceB.Map(Point.listSymmetry[0o22], colorD),
	faceB.Map(Point.listSymmetry[0o23], colorD),
	faceB.Map(Point.listSymmetry[0o24], colorA),
	faceB.Map(Point.listSymmetry[0o25], colorA),
	faceB.Map(Point.listSymmetry[0o26], colorB),
	faceB.Map(Point.listSymmetry[0o27], colorB),
	faceB.Map(Point.listSymmetry[0o40], colorD),
	faceB.Map(Point.listSymmetry[0o41], colorB),
	faceB.Map(Point.listSymmetry[0o42], colorA),
	faceB.Map(Point.listSymmetry[0o43], colorC),
	faceB.Map(Point.listSymmetry[0o44], colorD),
	faceB.Map(Point.listSymmetry[0o45], colorB),
	faceB.Map(Point.listSymmetry[0o46], colorA),
	faceB.Map(Point.listSymmetry[0o47], colorC),

	faceC.Map(Point.listSymmetry[0o00], colorA),
	faceC.Map(Point.listSymmetry[0o01], colorD),
	faceC.Map(Point.listSymmetry[0o02], colorC),
	faceC.Map(Point.listSymmetry[0o03], colorB),
	faceC.Map(Point.listSymmetry[0o04], colorB),
	faceC.Map(Point.listSymmetry[0o05], colorC),
	faceC.Map(Point.listSymmetry[0o06], colorD),
	faceC.Map(Point.listSymmetry[0o07], colorA),
	faceC.Map(Point.listSymmetry[0o20], colorA),
	faceC.Map(Point.listSymmetry[0o21], colorD),
	faceC.Map(Point.listSymmetry[0o22], colorC),
	faceC.Map(Point.listSymmetry[0o23], colorB),
	faceC.Map(Point.listSymmetry[0o24], colorB),
	faceC.Map(Point.listSymmetry[0o25], colorC),
	faceC.Map(Point.listSymmetry[0o26], colorD),
	faceC.Map(Point.listSymmetry[0o27], colorA),
	faceC.Map(Point.listSymmetry[0o40], colorA),
	faceC.Map(Point.listSymmetry[0o41], colorD),
	faceC.Map(Point.listSymmetry[0o42], colorC),
	faceC.Map(Point.listSymmetry[0o43], colorB),
	faceC.Map(Point.listSymmetry[0o44], colorB),
	faceC.Map(Point.listSymmetry[0o45], colorC),
	faceC.Map(Point.listSymmetry[0o46], colorD),
	faceC.Map(Point.listSymmetry[0o47], colorA),
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
