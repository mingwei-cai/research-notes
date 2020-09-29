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
let painter = new Painter(document.querySelector('canvas.Archimedean-i33335'), vLight, focalLength);
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

let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorA);
let faceB = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o43]),
	vertexC.Map(VectorPoint.listSymmetry[0o25]),
], 0, colorB);
let faceC = new Polygon([
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o20]),
	vertexE.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorB);
let faceD = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o03]),
	vertexD.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorB);
let faceE = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorC);
let faceF = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o43]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorC);
let faceG = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o25]),
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorC);
let faceH = new Polygon([
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o20]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorC);
let faceI = new Polygon([
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o40]),
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
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
	faceB.Map(VectorPoint.listSymmetry[0o03]),
	faceB.Map(VectorPoint.listSymmetry[0o05]),
	faceB.Map(VectorPoint.listSymmetry[0o06]),

	faceC.Map(VectorPoint.listSymmetry[0o00]),
	faceC.Map(VectorPoint.listSymmetry[0o03]),
	faceC.Map(VectorPoint.listSymmetry[0o05]),
	faceC.Map(VectorPoint.listSymmetry[0o06]),

	faceD.Map(VectorPoint.listSymmetry[0o00]),
	faceD.Map(VectorPoint.listSymmetry[0o03]),
	faceD.Map(VectorPoint.listSymmetry[0o05]),
	faceD.Map(VectorPoint.listSymmetry[0o06]),
	faceD.Map(VectorPoint.listSymmetry[0o20]),
	faceD.Map(VectorPoint.listSymmetry[0o23]),
	faceD.Map(VectorPoint.listSymmetry[0o25]),
	faceD.Map(VectorPoint.listSymmetry[0o26]),
	faceD.Map(VectorPoint.listSymmetry[0o40]),
	faceD.Map(VectorPoint.listSymmetry[0o43]),
	faceD.Map(VectorPoint.listSymmetry[0o45]),
	faceD.Map(VectorPoint.listSymmetry[0o46]),

	faceE.Map(VectorPoint.listSymmetry[0o00]),
	faceE.Map(VectorPoint.listSymmetry[0o03]),
	faceE.Map(VectorPoint.listSymmetry[0o05]),
	faceE.Map(VectorPoint.listSymmetry[0o06]),
	faceE.Map(VectorPoint.listSymmetry[0o20]),
	faceE.Map(VectorPoint.listSymmetry[0o23]),
	faceE.Map(VectorPoint.listSymmetry[0o25]),
	faceE.Map(VectorPoint.listSymmetry[0o26]),
	faceE.Map(VectorPoint.listSymmetry[0o40]),
	faceE.Map(VectorPoint.listSymmetry[0o43]),
	faceE.Map(VectorPoint.listSymmetry[0o45]),
	faceE.Map(VectorPoint.listSymmetry[0o46]),

	faceF.Map(VectorPoint.listSymmetry[0o00]),
	faceF.Map(VectorPoint.listSymmetry[0o03]),
	faceF.Map(VectorPoint.listSymmetry[0o05]),
	faceF.Map(VectorPoint.listSymmetry[0o06]),
	faceF.Map(VectorPoint.listSymmetry[0o20]),
	faceF.Map(VectorPoint.listSymmetry[0o23]),
	faceF.Map(VectorPoint.listSymmetry[0o25]),
	faceF.Map(VectorPoint.listSymmetry[0o26]),
	faceF.Map(VectorPoint.listSymmetry[0o40]),
	faceF.Map(VectorPoint.listSymmetry[0o43]),
	faceF.Map(VectorPoint.listSymmetry[0o45]),
	faceF.Map(VectorPoint.listSymmetry[0o46]),

	faceG.Map(VectorPoint.listSymmetry[0o00]),
	faceG.Map(VectorPoint.listSymmetry[0o03]),
	faceG.Map(VectorPoint.listSymmetry[0o05]),
	faceG.Map(VectorPoint.listSymmetry[0o06]),
	faceG.Map(VectorPoint.listSymmetry[0o20]),
	faceG.Map(VectorPoint.listSymmetry[0o23]),
	faceG.Map(VectorPoint.listSymmetry[0o25]),
	faceG.Map(VectorPoint.listSymmetry[0o26]),
	faceG.Map(VectorPoint.listSymmetry[0o40]),
	faceG.Map(VectorPoint.listSymmetry[0o43]),
	faceG.Map(VectorPoint.listSymmetry[0o45]),
	faceG.Map(VectorPoint.listSymmetry[0o46]),

	faceH.Map(VectorPoint.listSymmetry[0o00]),
	faceH.Map(VectorPoint.listSymmetry[0o03]),
	faceH.Map(VectorPoint.listSymmetry[0o05]),
	faceH.Map(VectorPoint.listSymmetry[0o06]),
	faceH.Map(VectorPoint.listSymmetry[0o20]),
	faceH.Map(VectorPoint.listSymmetry[0o23]),
	faceH.Map(VectorPoint.listSymmetry[0o25]),
	faceH.Map(VectorPoint.listSymmetry[0o26]),
	faceH.Map(VectorPoint.listSymmetry[0o40]),
	faceH.Map(VectorPoint.listSymmetry[0o43]),
	faceH.Map(VectorPoint.listSymmetry[0o45]),
	faceH.Map(VectorPoint.listSymmetry[0o46]),

	faceI.Map(VectorPoint.listSymmetry[0o00]),
	faceI.Map(VectorPoint.listSymmetry[0o03]),
	faceI.Map(VectorPoint.listSymmetry[0o05]),
	faceI.Map(VectorPoint.listSymmetry[0o06]),
	faceI.Map(VectorPoint.listSymmetry[0o20]),
	faceI.Map(VectorPoint.listSymmetry[0o23]),
	faceI.Map(VectorPoint.listSymmetry[0o25]),
	faceI.Map(VectorPoint.listSymmetry[0o26]),
	faceI.Map(VectorPoint.listSymmetry[0o40]),
	faceI.Map(VectorPoint.listSymmetry[0o43]),
	faceI.Map(VectorPoint.listSymmetry[0o45]),
	faceI.Map(VectorPoint.listSymmetry[0o46]),
]);

let listSolid = [solidA];

let DrawFrame = function () {
	let timeSec = performance.now() / 1000;
	let arcXY = timeSec * (Math.PI / 4);
	let sinXY = Math.sin(arcXY);
	let cosXY = Math.cos(arcXY);
	let arcZY = Math.PI * (0.5 - 1 / 16);
	let sinZY = Math.sin(arcZY);
	let cosZY = Math.cos(arcZY);
	let r = vertexA.GetValue().GetLength();
	painter.Draw(listSolid, (v) => (new VectorPoint(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
