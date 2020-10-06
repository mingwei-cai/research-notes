import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-o33334-o3444'), vLight, focalLength);
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
let kA = Solve((x) => (((x + 1) * x + 1) * x - 1), 2, 1);
let kB = Math.SQRT2 / (1 + kA);
let kC = Math.SQRT1_2;
let vertexA0 = new Point(kA * kB, kA * kA * kB, kB);
let vertexA1 = new Point(1 / (kC * 2 + 1), 1 / (kC * 2 + 1), 1);
let p = 0;
let vertexA = vertexA0.Map((v) => Point.At(v, vertexA1, p));

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o12]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o11]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceC = new Polygon([
	vertexA.Map(Point.listSymmetry[0o11]),
	vertexA.Map(Point.listSymmetry[0o20]),
	vertexA.Map(Point.listSymmetry[0o00]),
], 0, colorC);

let solidA = new Polyhedron([
	faceA.Map(Point.listSymmetry[0o00]),
	faceA.Map(Point.listSymmetry[0o20]),
	faceA.Map(Point.listSymmetry[0o40]),
	faceA.Map(Point.listSymmetry[0o17]),
	faceA.Map(Point.listSymmetry[0o37]),
	faceA.Map(Point.listSymmetry[0o57]),

	faceB.Map(Point.listSymmetry[0o00]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o11]),
	faceB.Map(Point.listSymmetry[0o12]),
	faceB.Map(Point.listSymmetry[0o14]),
	faceB.Map(Point.listSymmetry[0o17]),

	faceC.Map(Point.listSymmetry[0o00]),
	faceC.Map(Point.listSymmetry[0o03]),
	faceC.Map(Point.listSymmetry[0o05]),
	faceC.Map(Point.listSymmetry[0o06]),
	faceC.Map(Point.listSymmetry[0o11]),
	faceC.Map(Point.listSymmetry[0o12]),
	faceC.Map(Point.listSymmetry[0o14]),
	faceC.Map(Point.listSymmetry[0o17]),
	faceC.Map(Point.listSymmetry[0o20]),
	faceC.Map(Point.listSymmetry[0o23]),
	faceC.Map(Point.listSymmetry[0o25]),
	faceC.Map(Point.listSymmetry[0o26]),
	faceC.Map(Point.listSymmetry[0o31]),
	faceC.Map(Point.listSymmetry[0o32]),
	faceC.Map(Point.listSymmetry[0o34]),
	faceC.Map(Point.listSymmetry[0o37]),
	faceC.Map(Point.listSymmetry[0o40]),
	faceC.Map(Point.listSymmetry[0o43]),
	faceC.Map(Point.listSymmetry[0o45]),
	faceC.Map(Point.listSymmetry[0o46]),
	faceC.Map(Point.listSymmetry[0o51]),
	faceC.Map(Point.listSymmetry[0o52]),
	faceC.Map(Point.listSymmetry[0o54]),
	faceC.Map(Point.listSymmetry[0o57]),
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
