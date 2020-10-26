import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i33335-i3454'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);
let colorD = new Color(0xFF, 0x66, 0x99, 0.8);

/** @type {(f: (x: number), xA: number, xB: number) => number} */
let Solve = function (f, xA, xB) {
	xA = +xA;
	xB = +xB;
	let yA = f(xA);
	do {
		let yB = f(xB);
		let xC = (yA * xB - yB * xA) / (yA - yB);
		xA = xB;
		xB = xC;
		yA = yB;
	} while (Number.isFinite(xB));
	return xA;
};
let kA = 2 / (Math.sqrt(5) + 1);
let kB = Solve((x) => ((x * x - 2) * x - (kA + 1)), 3, 2);
let kC = kB - 1 / kB;
let kD = 1 + (kA + 1) * (kB + 1 + 1 / kB);

let vertexA0 = new Point(1 / kD, kC / kD, 1);
let vertexB0 = new Point(
	(+ kC * (kA + 1) - kD + kA) / (kD * 2),
	(+ kC + kD * kA - (kA + 1)) / (kD * 2),
	(+ kC * kA + kD * (kA + 1) + 1) / (kD * 2),
);
let vertexC0 = new Point(
	(+ kC - kD * kA - (kA + 1)) / (kD * 2),
	(- kC * kA + kD * (kA + 1) - 1) / (kD * 2),
	(+ kC * (kA + 1) + kD + kA) / (kD * 2),
);
let vertexD0 = new Point(
	(- kC + kD * kA - (kA + 1)) / (kD * 2),
	(- kC * kA + kD * (kA + 1) + 1) / (kD * 2),
	(+ kC * (kA + 1) + kD - kA) / (kD * 2),
);
let vertexE0 = new Point(
	(- kC * (kA + 1) + kD + kA) / (kD * 2),
	(+ kC + kD * kA + (kA + 1)) / (kD * 2),
	(+ kC * kA + kD * (kA + 1) - 1) / (kD * 2),
);
let dualA0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexB0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o00]),
	vertexD0.Map(Point.listSymmetry[0o00]),
	vertexE0.Map(Point.listSymmetry[0o00]),
]);
let dualB0 = Point.Dual([
	vertexC0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o43]),
	vertexC0.Map(Point.listSymmetry[0o25]),
]);
let dualC0 = Point.Dual([
	vertexE0.Map(Point.listSymmetry[0o00]),
	vertexE0.Map(Point.listSymmetry[0o20]),
	vertexE0.Map(Point.listSymmetry[0o40]),
]);
let dualD0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexB0.Map(Point.listSymmetry[0o03]),
	vertexD0.Map(Point.listSymmetry[0o40]),
]);
let dualE0 = Point.Dual([
	vertexA0.Map(Point.listSymmetry[0o00]),
	vertexA0.Map(Point.listSymmetry[0o03]),
	vertexB0.Map(Point.listSymmetry[0o00]),
]);
let dualF0 = Point.Dual([
	vertexB0.Map(Point.listSymmetry[0o00]),
	vertexC0.Map(Point.listSymmetry[0o43]),
	vertexC0.Map(Point.listSymmetry[0o00]),
]);
let dualG0 = Point.Dual([
	vertexC0.Map(Point.listSymmetry[0o00]),
	vertexB0.Map(Point.listSymmetry[0o25]),
	vertexD0.Map(Point.listSymmetry[0o00]),
]);
let dualH0 = Point.Dual([
	vertexD0.Map(Point.listSymmetry[0o00]),
	vertexE0.Map(Point.listSymmetry[0o20]),
	vertexE0.Map(Point.listSymmetry[0o00]),
]);
let dualI0 = Point.Dual([
	vertexE0.Map(Point.listSymmetry[0o00]),
	vertexD0.Map(Point.listSymmetry[0o40]),
	vertexA0.Map(Point.listSymmetry[0o00]),
]);

let vertexA1 = new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexB1 = new Point(1 / (kA + 2), kA, 2 / (kA + 2));
let vertexC1 = new Point(0, (kA * 2 + 1) / (kA + 2), kA);

let dualA1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexB1.Map(Point.listSymmetry[0o00]),
	vertexC1.Map(Point.listSymmetry[0o00]),
	vertexB1.Map(Point.listSymmetry[0o01]),
	vertexA1.Map(Point.listSymmetry[0o01]),
]);
let dualC1 = Point.Dual([
	vertexB1.Map(Point.listSymmetry[0o00]),
	vertexB1.Map(Point.listSymmetry[0o20]),
	vertexB1.Map(Point.listSymmetry[0o40]),
]);
let dualB1 = dualC1.Map(Point.listSymmetry[0o01]);
let dualD1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexC1.Map(Point.listSymmetry[0o40]),
	vertexA1.Map(Point.listSymmetry[0o02]),
]);
let dualE1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexA1.Map(Point.listSymmetry[0o02]),
	vertexA1.Map(Point.listSymmetry[0o03]),
	vertexA1.Map(Point.listSymmetry[0o01]),
]);
let dualI1 = Point.Dual([
	vertexA1.Map(Point.listSymmetry[0o00]),
	vertexB1.Map(Point.listSymmetry[0o00]),
	vertexB1.Map(Point.listSymmetry[0o40]),
	vertexC1.Map(Point.listSymmetry[0o40]),
]);
let dualF1 = dualI1.Map(Point.listSymmetry[0o01]);
let dualG1 = dualI1.Map(Point.listSymmetry[0o21]);
let dualH1 = dualI1.Map(Point.listSymmetry[0o20]);

let p = 0;
let dualA = dualA0.Map((v) => Point.At(v, dualA1, p));
let dualB = dualB0.Map((v) => Point.At(v, dualB1, p));
let dualC = dualC0.Map((v) => Point.At(v, dualC1, p));
let dualD = dualD0.Map((v) => Point.At(v, dualD1, p));
let dualE = dualE0.Map((v) => Point.At(v, dualE1, p));
let dualF = dualF0.Map((v) => Point.At(v, dualF1, p));
let dualG = dualG0.Map((v) => Point.At(v, dualG1, p));
let dualH = dualH0.Map((v) => Point.At(v, dualH1, p));
let dualI = dualI0.Map((v) => Point.At(v, dualI1, p));
let r0 = dualA0.GetLength();
let r1 = dualA1.GetLength();

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o03]),
	dualD.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o00]),
], 0);
let faceB = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o00]),
	dualG.Map(Point.listSymmetry[0o43]),
	dualD.Map(Point.listSymmetry[0o03]),
	dualE.Map(Point.listSymmetry[0o00]),
], 0);
let faceC = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualG.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o25]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o00]),
], 0);
let faceD = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o20]),
	dualD.Map(Point.listSymmetry[0o20]),
	dualG.Map(Point.listSymmetry[0o00]),
], 0);
let faceE = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o40]),
	dualC.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o00]),
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

	faceB.Map(Point.listSymmetry[0o00], colorD),
	faceB.Map(Point.listSymmetry[0o03], colorC),
	faceB.Map(Point.listSymmetry[0o05], colorB),
	faceB.Map(Point.listSymmetry[0o06], colorA),
	faceB.Map(Point.listSymmetry[0o20], colorB),
	faceB.Map(Point.listSymmetry[0o23], colorA),
	faceB.Map(Point.listSymmetry[0o25], colorD),
	faceB.Map(Point.listSymmetry[0o26], colorC),
	faceB.Map(Point.listSymmetry[0o40], colorC),
	faceB.Map(Point.listSymmetry[0o43], colorD),
	faceB.Map(Point.listSymmetry[0o45], colorA),
	faceB.Map(Point.listSymmetry[0o46], colorB),

	faceC.Map(Point.listSymmetry[0o00], colorC),
	faceC.Map(Point.listSymmetry[0o03], colorD),
	faceC.Map(Point.listSymmetry[0o05], colorA),
	faceC.Map(Point.listSymmetry[0o06], colorB),
	faceC.Map(Point.listSymmetry[0o20], colorD),
	faceC.Map(Point.listSymmetry[0o23], colorC),
	faceC.Map(Point.listSymmetry[0o25], colorB),
	faceC.Map(Point.listSymmetry[0o26], colorA),
	faceC.Map(Point.listSymmetry[0o40], colorB),
	faceC.Map(Point.listSymmetry[0o43], colorA),
	faceC.Map(Point.listSymmetry[0o45], colorD),
	faceC.Map(Point.listSymmetry[0o46], colorC),

	faceD.Map(Point.listSymmetry[0o00], colorA),
	faceD.Map(Point.listSymmetry[0o03], colorB),
	faceD.Map(Point.listSymmetry[0o05], colorC),
	faceD.Map(Point.listSymmetry[0o06], colorD),
	faceD.Map(Point.listSymmetry[0o20], colorA),
	faceD.Map(Point.listSymmetry[0o23], colorB),
	faceD.Map(Point.listSymmetry[0o25], colorC),
	faceD.Map(Point.listSymmetry[0o26], colorD),
	faceD.Map(Point.listSymmetry[0o40], colorA),
	faceD.Map(Point.listSymmetry[0o43], colorB),
	faceD.Map(Point.listSymmetry[0o45], colorC),
	faceD.Map(Point.listSymmetry[0o46], colorD),

	faceE.Map(Point.listSymmetry[0o00], colorD),
	faceE.Map(Point.listSymmetry[0o03], colorC),
	faceE.Map(Point.listSymmetry[0o05], colorB),
	faceE.Map(Point.listSymmetry[0o06], colorA),
	faceE.Map(Point.listSymmetry[0o20], colorB),
	faceE.Map(Point.listSymmetry[0o23], colorA),
	faceE.Map(Point.listSymmetry[0o25], colorD),
	faceE.Map(Point.listSymmetry[0o26], colorC),
	faceE.Map(Point.listSymmetry[0o40], colorC),
	faceE.Map(Point.listSymmetry[0o43], colorD),
	faceE.Map(Point.listSymmetry[0o45], colorA),
	faceE.Map(Point.listSymmetry[0o46], colorB),
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
