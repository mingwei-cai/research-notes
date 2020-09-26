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
let painter = new Painter(document.querySelector('canvas.Archimedean-3-3-3-3-5'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

/** @type {(f: (x: number), a: number, b: number) => number} */
let Solve = function (f, a, b) {
	a = +a;
	b = +b;
	let fa = f(a);
	do {
		let fb = f(b);
		let c = (fa * b - fb * a) / (fa - fb);
		a = b;
		b = c;
		fa = fb;
	} while (Number.isFinite(b));
	return a;
};

let kA = (Math.sqrt(5) + 1) / 2;
let kB = Solve((x) => ((x * x - 2) * x - kA), 3, 2);
let kC = kB - 1 / kB;
let kD = 1 + kA * (kB + 1 + 1 / kB);

let vertexA = new Point(2 * kC, 2, 2 * kD);
let vertexB = new Point(kC + kD / kA + kA, - kC * kA + kD + 1 / kA, kC / kA + kD * kA - 1);
let vertexC = new Point(kC + kD / kA - kA, kC * kA - kD + 1 / kA, kC / kA + kD * kA + 1);
let vertexD = new Point(- kC / kA + kD * kA + 1, - kC + kD / kA - kA, kC * kA + kD - 1 / kA);
let vertexE = new Point(- kC / kA + kD * kA - 1, kC - kD / kA - kA, kC * kA + kD + 1 / kA);

let faceA = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
], 0, colorA);
let faceC = new Polygon([
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o23]),
	vertexE.Map(VectorPoint.listSymmetry[0o46]),
], 0, colorA);
let faceD = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexB.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorA);
let faceE = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o03]),
	vertexD.Map(VectorPoint.listSymmetry[0o20]),
], 0, colorA);
let faceF = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexD.Map(VectorPoint.listSymmetry[0o20]),
], 0, colorA);
let faceG = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o03]),
	vertexE.Map(VectorPoint.listSymmetry[0o20]),
	vertexD.Map(VectorPoint.listSymmetry[0o20]),
], 0, colorA);
let faceH = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexD.Map(VectorPoint.listSymmetry[0o20]),
], 0, colorA);
let faceI = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o00]),
	vertexE.Map(VectorPoint.listSymmetry[0o23]),
], 0, colorA);
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
	faceB.Map(VectorPoint.listSymmetry[0o20]),
	faceB.Map(VectorPoint.listSymmetry[0o23]),
	faceB.Map(VectorPoint.listSymmetry[0o25]),
	faceB.Map(VectorPoint.listSymmetry[0o26]),
	faceB.Map(VectorPoint.listSymmetry[0o40]),
	faceB.Map(VectorPoint.listSymmetry[0o43]),
	faceB.Map(VectorPoint.listSymmetry[0o45]),
	faceB.Map(VectorPoint.listSymmetry[0o46]),

	faceC.Map(VectorPoint.listSymmetry[0o00]),
	faceC.Map(VectorPoint.listSymmetry[0o03]),
	faceC.Map(VectorPoint.listSymmetry[0o05]),
	faceC.Map(VectorPoint.listSymmetry[0o06]),

	faceD.Map(VectorPoint.listSymmetry[0o00]),
	faceD.Map(VectorPoint.listSymmetry[0o03]),
	faceD.Map(VectorPoint.listSymmetry[0o05]),
	faceD.Map(VectorPoint.listSymmetry[0o06]),

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

/** @type {(timeSec: number) => void} */
let DrawFrame = function (timeSec) {
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
};

export { DrawFrame };
