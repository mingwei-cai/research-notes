import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Catalan-i33335'), vLight, focalLength);
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
let vertexA = new Point(1 / kD, kC / kD, 1);
let vertexB = new Point(
	(+ kC * (kA + 1) - kD + kA) / (kD * 2),
	(+ kC + kD * kA - (kA + 1)) / (kD * 2),
	(+ kC * kA + kD * (kA + 1) + 1) / (kD * 2),
);
let vertexC = new Point(
	(+ kC - kD * kA - (kA + 1)) / (kD * 2),
	(- kC * kA + kD * (kA + 1) - 1) / (kD * 2),
	(+ kC * (kA + 1) + kD + kA) / (kD * 2),
);
let vertexD = new Point(
	(- kC + kD * kA - (kA + 1)) / (kD * 2),
	(- kC * kA + kD * (kA + 1) + 1) / (kD * 2),
	(+ kC * (kA + 1) + kD - kA) / (kD * 2),
);
let vertexE = new Point(
	(- kC * (kA + 1) + kD + kA) / (kD * 2),
	(+ kC + kD * kA + (kA + 1)) / (kD * 2),
	(+ kC * kA + kD * (kA + 1) - 1) / (kD * 2),
);

let dualA = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
]);
let dualB = Point.Dual([
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o43]),
	vertexC.Map(Point.listSymmetry[0o25]),
]);
let dualC = Point.Dual([
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o40]),
]);
let dualD = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o03]),
	vertexD.Map(Point.listSymmetry[0o40]),
]);
let dualE = Point.Dual([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexB.Map(Point.listSymmetry[0o00]),
]);
let dualF = Point.Dual([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o43]),
	vertexC.Map(Point.listSymmetry[0o00]),
]);
let dualG = Point.Dual([
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o25]),
	vertexD.Map(Point.listSymmetry[0o00]),
]);
let dualH = Point.Dual([
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o00]),
]);
let dualI = Point.Dual([
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o00]),
]);

let faceA = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o00]),
	dualE.Map(Point.listSymmetry[0o03]),
	dualD.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceB = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o00]),
	dualG.Map(Point.listSymmetry[0o43]),
	dualD.Map(Point.listSymmetry[0o03]),
	dualE.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceC = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualG.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o25]),
	dualB.Map(Point.listSymmetry[0o00]),
	dualF.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceD = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o20]),
	dualD.Map(Point.listSymmetry[0o20]),
	dualG.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceE = new Polygon([
	dualA.Map(Point.listSymmetry[0o00]),
	dualI.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o40]),
	dualC.Map(Point.listSymmetry[0o00]),
	dualH.Map(Point.listSymmetry[0o00]),
], 0, colorA);

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
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o20]),
	faceB.Map(Point.listSymmetry[0o23]),
	faceB.Map(Point.listSymmetry[0o25]),
	faceB.Map(Point.listSymmetry[0o26]),
	faceB.Map(Point.listSymmetry[0o40]),
	faceB.Map(Point.listSymmetry[0o43]),
	faceB.Map(Point.listSymmetry[0o45]),
	faceB.Map(Point.listSymmetry[0o46]),

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
	faceD.Map(Point.listSymmetry[0o03]),
	faceD.Map(Point.listSymmetry[0o05]),
	faceD.Map(Point.listSymmetry[0o06]),
	faceD.Map(Point.listSymmetry[0o20]),
	faceD.Map(Point.listSymmetry[0o23]),
	faceD.Map(Point.listSymmetry[0o25]),
	faceD.Map(Point.listSymmetry[0o26]),
	faceD.Map(Point.listSymmetry[0o40]),
	faceD.Map(Point.listSymmetry[0o43]),
	faceD.Map(Point.listSymmetry[0o45]),
	faceD.Map(Point.listSymmetry[0o46]),

	faceE.Map(Point.listSymmetry[0o00]),
	faceE.Map(Point.listSymmetry[0o03]),
	faceE.Map(Point.listSymmetry[0o05]),
	faceE.Map(Point.listSymmetry[0o06]),
	faceE.Map(Point.listSymmetry[0o20]),
	faceE.Map(Point.listSymmetry[0o23]),
	faceE.Map(Point.listSymmetry[0o25]),
	faceE.Map(Point.listSymmetry[0o26]),
	faceE.Map(Point.listSymmetry[0o40]),
	faceE.Map(Point.listSymmetry[0o43]),
	faceE.Map(Point.listSymmetry[0o45]),
	faceE.Map(Point.listSymmetry[0o46]),
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
