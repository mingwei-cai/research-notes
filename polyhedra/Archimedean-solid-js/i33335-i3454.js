import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Archimedean-i33335-i3454'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);

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
let vertexA1 = new Point(+1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexB1 = new Point(-1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexC1 = new Point(-1 / (kA + 2), kA, 2 / (kA + 2));
let vertexD1 = new Point(0, (kA * 2 + 1) / (kA + 2), kA);
let vertexE1 = new Point(+1 / (kA + 2), kA, 2 / (kA + 2));
let p = 0;
let vertexA = vertexA0.Map((v) => Point.At(v, vertexA1, p));
let vertexB = vertexB0.Map((v) => Point.At(v, vertexB1, p));
let vertexC = vertexC0.Map((v) => Point.At(v, vertexC1, p));
let vertexD = vertexD0.Map((v) => Point.At(v, vertexD1, p));
let vertexE = vertexE0.Map((v) => Point.At(v, vertexE1, p));

// let vertexA = new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
// let vertexB = new Point(1 / (kA + 2), kA, 2 / (kA + 2));
// let vertexC = new Point(0, (kA * 2 + 1) / (kA + 2), kA);

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
], 0, colorA);
let faceB = new Polygon([
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o43]),
	vertexC.Map(Point.listSymmetry[0o25]),
], 0, colorB);
let faceC = new Polygon([
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceD = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o03]),
	vertexD.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceE = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexB.Map(Point.listSymmetry[0o00]),
], 0, colorC);
let faceF = new Polygon([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o43]),
	vertexC.Map(Point.listSymmetry[0o00]),
], 0, colorC);
let faceG = new Polygon([
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o25]),
	vertexD.Map(Point.listSymmetry[0o00]),
], 0, colorC);
let faceH = new Polygon([
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o00]),
], 0, colorC);
let faceI = new Polygon([
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o40]),
	vertexA.Map(Point.listSymmetry[0o00]),
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
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),

	faceC.Map(Point.listSymmetry[0o00]),
	faceC.Map(Point.listSymmetry[0o03]),
	faceC.Map(Point.listSymmetry[0o05]),
	faceC.Map(Point.listSymmetry[0o06]),

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

	faceF.Map(Point.listSymmetry[0o00]),
	faceF.Map(Point.listSymmetry[0o03]),
	faceF.Map(Point.listSymmetry[0o05]),
	faceF.Map(Point.listSymmetry[0o06]),
	faceF.Map(Point.listSymmetry[0o20]),
	faceF.Map(Point.listSymmetry[0o23]),
	faceF.Map(Point.listSymmetry[0o25]),
	faceF.Map(Point.listSymmetry[0o26]),
	faceF.Map(Point.listSymmetry[0o40]),
	faceF.Map(Point.listSymmetry[0o43]),
	faceF.Map(Point.listSymmetry[0o45]),
	faceF.Map(Point.listSymmetry[0o46]),

	faceG.Map(Point.listSymmetry[0o00]),
	faceG.Map(Point.listSymmetry[0o03]),
	faceG.Map(Point.listSymmetry[0o05]),
	faceG.Map(Point.listSymmetry[0o06]),
	faceG.Map(Point.listSymmetry[0o20]),
	faceG.Map(Point.listSymmetry[0o23]),
	faceG.Map(Point.listSymmetry[0o25]),
	faceG.Map(Point.listSymmetry[0o26]),
	faceG.Map(Point.listSymmetry[0o40]),
	faceG.Map(Point.listSymmetry[0o43]),
	faceG.Map(Point.listSymmetry[0o45]),
	faceG.Map(Point.listSymmetry[0o46]),

	faceH.Map(Point.listSymmetry[0o00]),
	faceH.Map(Point.listSymmetry[0o03]),
	faceH.Map(Point.listSymmetry[0o05]),
	faceH.Map(Point.listSymmetry[0o06]),
	faceH.Map(Point.listSymmetry[0o20]),
	faceH.Map(Point.listSymmetry[0o23]),
	faceH.Map(Point.listSymmetry[0o25]),
	faceH.Map(Point.listSymmetry[0o26]),
	faceH.Map(Point.listSymmetry[0o40]),
	faceH.Map(Point.listSymmetry[0o43]),
	faceH.Map(Point.listSymmetry[0o45]),
	faceH.Map(Point.listSymmetry[0o46]),

	faceI.Map(Point.listSymmetry[0o00]),
	faceI.Map(Point.listSymmetry[0o03]),
	faceI.Map(Point.listSymmetry[0o05]),
	faceI.Map(Point.listSymmetry[0o06]),
	faceI.Map(Point.listSymmetry[0o20]),
	faceI.Map(Point.listSymmetry[0o23]),
	faceI.Map(Point.listSymmetry[0o25]),
	faceI.Map(Point.listSymmetry[0o26]),
	faceI.Map(Point.listSymmetry[0o40]),
	faceI.Map(Point.listSymmetry[0o43]),
	faceI.Map(Point.listSymmetry[0o45]),
	faceI.Map(Point.listSymmetry[0o46]),
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
