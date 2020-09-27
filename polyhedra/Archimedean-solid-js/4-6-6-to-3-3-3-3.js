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
let painter = new Painter(document.querySelector('canvas.Archimedean-4-6-6-to-3-3-3-3'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);

let kA = Math.SQRT1_2;
let vertexA0 = Point.At(
	new Point(kA, 0, kA),
	new Point(0, 0, kA * 2),
	1 / 3,
);
let vertexA1 = new VectorPoint(0, 0, kA * 2);
let p = 0;
let vertexA = vertexA0.Map((v) => v.Add(vertexA1.Sub(v).Mul(p)));

let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o11]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexA.Map(VectorPoint.listSymmetry[0o12]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o10]),
	vertexA.Map(VectorPoint.listSymmetry[0o20]),
	vertexA.Map(VectorPoint.listSymmetry[0o30]),
	vertexA.Map(VectorPoint.listSymmetry[0o40]),
	vertexA.Map(VectorPoint.listSymmetry[0o50]),
], 0, colorB);

let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o00]),
	faceA.Map(VectorPoint.listSymmetry[0o20]),
	faceA.Map(VectorPoint.listSymmetry[0o40]),
	faceA.Map(VectorPoint.listSymmetry[0o07]),
	faceA.Map(VectorPoint.listSymmetry[0o27]),
	faceA.Map(VectorPoint.listSymmetry[0o47]),

	faceB.Map(VectorPoint.listSymmetry[0o00]),
	faceB.Map(VectorPoint.listSymmetry[0o01]),
	faceB.Map(VectorPoint.listSymmetry[0o02]),
	faceB.Map(VectorPoint.listSymmetry[0o03]),
	faceB.Map(VectorPoint.listSymmetry[0o04]),
	faceB.Map(VectorPoint.listSymmetry[0o05]),
	faceB.Map(VectorPoint.listSymmetry[0o06]),
	faceB.Map(VectorPoint.listSymmetry[0o07]),
]);

let listSolid = [solidA];
let arcXY = Math.PI / 8;
let sinXY = Math.sin(arcXY);
let cosXY = Math.cos(arcXY);
let arcZY = Math.PI * (0.5 - 1 / 16);
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
	painter.Draw(listSolid, (v) => (new VectorPoint(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
