import {
	Color,
	Point,
	Polygon,
	Polyhedron,
	Painter,
} from "../polyhedra.js";

let vLight = new Point(0, 3, 4);
let focalLength = 12;
let painter = new Painter(document.querySelector('canvas.Archimedean-i46A-i3454'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let colorB = new Color(0x00, 0xCC, 0x99, 0.8);
let colorC = new Color(0xFF, 0xCC, 0x33, 0.8);

let kA = 2 / (Math.sqrt(5) + 1);
let vertexA0 = Point.At(
	new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1),
	new Point(0, 0, 1),
	2 / (kA + 4),
);
let vertexB0 = Point.At(
	new Point(1 / (kA + 2), kA, 2 / (kA + 2)),
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	2 / (kA + 4),
);
let vertexC0 = Point.At(
	new Point(0, (kA * 2 + 1) / (kA + 2), kA),
	new Point(kA / 2, (kA + 1) / 2, 1 / 2),
	2 / (kA + 4),
);
let vertexD0 = Point.At(
	new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1),
	new Point(1 / 2, kA / 2, (kA + 1) / 2),
	2 / (kA + 4),
);
let vertexE0 = Point.At(
	new Point(1 / (kA + 2), kA, 2 / (kA + 2)),
	new Point(kA / 2, (kA + 1) / 2, 1 / 2),
	2 / (kA + 4),
);
let vertexA1 = new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexB1 = new Point(1 / (kA + 2), kA, 2 / (kA + 2));
let vertexC1 = new Point(0, (kA * 2 + 1) / (kA + 2), kA);
let vertexD1 = new Point(1 / (kA * 2 + 3), 1 / (kA * 2 + 3), 1);
let vertexE1 = new Point(1 / (kA + 2), kA, 2 / (kA + 2));
let p = 0;
let vertexA = vertexA0.Map((v) => Point.At(v, vertexA1, p));
let vertexB = vertexB0.Map((v) => Point.At(v, vertexB1, p));
let vertexC = vertexC0.Map((v) => Point.At(v, vertexC1, p));
let vertexD = vertexD0.Map((v) => Point.At(v, vertexD1, p));
let vertexE = vertexE0.Map((v) => Point.At(v, vertexE1, p));

let faceA = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o01]),
	vertexE.Map(Point.listSymmetry[0o01]),
	vertexB.Map(Point.listSymmetry[0o01]),
	vertexD.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o01]),
], 0, colorA);
let faceB = new Polygon([
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o20]),
	vertexE.Map(Point.listSymmetry[0o20]),
	vertexB.Map(Point.listSymmetry[0o40]),
	vertexE.Map(Point.listSymmetry[0o40]),
], 0, colorB);
let faceC = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexC.Map(Point.listSymmetry[0o40]),
	vertexC.Map(Point.listSymmetry[0o42]),
	vertexD.Map(Point.listSymmetry[0o02]),
	vertexA.Map(Point.listSymmetry[0o02]),
], 0, colorB);
let faceD = new Polygon([
	vertexA.Map(Point.listSymmetry[0o00]),
	vertexA.Map(Point.listSymmetry[0o01]),
	vertexA.Map(Point.listSymmetry[0o03]),
	vertexA.Map(Point.listSymmetry[0o02]),
], 0, colorC);
let faceE = new Polygon([
	vertexD.Map(Point.listSymmetry[0o00]),
	vertexB.Map(Point.listSymmetry[0o00]),
	vertexE.Map(Point.listSymmetry[0o40]),
	vertexC.Map(Point.listSymmetry[0o40]),
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
	faceB.Map(Point.listSymmetry[0o01]),
	faceB.Map(Point.listSymmetry[0o02]),
	faceB.Map(Point.listSymmetry[0o03]),
	faceB.Map(Point.listSymmetry[0o04]),
	faceB.Map(Point.listSymmetry[0o05]),
	faceB.Map(Point.listSymmetry[0o06]),
	faceB.Map(Point.listSymmetry[0o07]),

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
	faceD.Map(Point.listSymmetry[0o20]),
	faceD.Map(Point.listSymmetry[0o40]),
	faceD.Map(Point.listSymmetry[0o17]),
	faceD.Map(Point.listSymmetry[0o37]),
	faceD.Map(Point.listSymmetry[0o57]),

	faceE.Map(Point.listSymmetry[0o00]),
	faceE.Map(Point.listSymmetry[0o01]),
	faceE.Map(Point.listSymmetry[0o02]),
	faceE.Map(Point.listSymmetry[0o03]),
	faceE.Map(Point.listSymmetry[0o04]),
	faceE.Map(Point.listSymmetry[0o05]),
	faceE.Map(Point.listSymmetry[0o06]),
	faceE.Map(Point.listSymmetry[0o07]),
	faceE.Map(Point.listSymmetry[0o20]),
	faceE.Map(Point.listSymmetry[0o21]),
	faceE.Map(Point.listSymmetry[0o22]),
	faceE.Map(Point.listSymmetry[0o23]),
	faceE.Map(Point.listSymmetry[0o24]),
	faceE.Map(Point.listSymmetry[0o25]),
	faceE.Map(Point.listSymmetry[0o26]),
	faceE.Map(Point.listSymmetry[0o27]),
	faceE.Map(Point.listSymmetry[0o40]),
	faceE.Map(Point.listSymmetry[0o41]),
	faceE.Map(Point.listSymmetry[0o42]),
	faceE.Map(Point.listSymmetry[0o43]),
	faceE.Map(Point.listSymmetry[0o44]),
	faceE.Map(Point.listSymmetry[0o45]),
	faceE.Map(Point.listSymmetry[0o46]),
	faceE.Map(Point.listSymmetry[0o47]),
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
	painter.Draw(listSolid, (v) => (new Point(
		(v.x * cosXY - v.y * sinXY) / r,
		((v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY) / r,
		(v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY) / r,
	)), lineWidth);
	requestAnimationFrame(DrawFrame);
};
requestAnimationFrame(DrawFrame);
