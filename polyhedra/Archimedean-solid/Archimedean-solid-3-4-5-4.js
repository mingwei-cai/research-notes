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
let painter = new Painter(document.querySelector('canvas.Archimedean-3-4-5-4'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = Point.At(
	new Point(2 / (3 + Math.sqrt(5)), 0, 1),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	2 / (3 + Math.sqrt(5)),
);
let vertexB = Point.At(
	new Point(2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1)),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	2 / (3 + Math.sqrt(5)),
);
let vertexC = Point.At(
	new Point(0, 1, 2 / (3 + Math.sqrt(5))),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	2 / (3 + Math.sqrt(5)),
);
// let vertexA = new Point(0, 2 / (3 + Math.sqrt(5)), 1);
// let vertexB = new Point(2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1), 2 / (Math.sqrt(5) + 1));
let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o01]),
	vertexA.Map(VectorPoint.listSymmetry[0o03]),
	vertexA.Map(VectorPoint.listSymmetry[0o02]),
], 0, colorA);
let faceB = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexA.Map(VectorPoint.listSymmetry[0o01]),
	vertexB.Map(VectorPoint.listSymmetry[0o01]),
], 0, colorA);
let faceC = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o10]),
	vertexA.Map(VectorPoint.listSymmetry[0o11]),
	vertexC.Map(VectorPoint.listSymmetry[0o30]),
], 0, colorA);
let faceD = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexC.Map(VectorPoint.listSymmetry[0o20]),
], 0, colorA);
let faceE = new Polygon([
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexB.Map(VectorPoint.listSymmetry[0o40]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.Map(VectorPoint.listSymmetry[0o00]),
	faceA.Map(VectorPoint.listSymmetry[0o20]),
	faceA.Map(VectorPoint.listSymmetry[0o40]),
	faceA.Map(VectorPoint.listSymmetry[0o07]),
	faceA.Map(VectorPoint.listSymmetry[0o27]),
	faceA.Map(VectorPoint.listSymmetry[0o47]),

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

	faceC.Map(VectorPoint.listSymmetry[0o10]),
	faceC.Map(VectorPoint.listSymmetry[0o13]),
	faceC.Map(VectorPoint.listSymmetry[0o15]),
	faceC.Map(VectorPoint.listSymmetry[0o16]),
	faceC.Map(VectorPoint.listSymmetry[0o30]),
	faceC.Map(VectorPoint.listSymmetry[0o33]),
	faceC.Map(VectorPoint.listSymmetry[0o35]),
	faceC.Map(VectorPoint.listSymmetry[0o36]),
	faceC.Map(VectorPoint.listSymmetry[0o50]),
	faceC.Map(VectorPoint.listSymmetry[0o53]),
	faceC.Map(VectorPoint.listSymmetry[0o55]),
	faceC.Map(VectorPoint.listSymmetry[0o56]),

	faceD.Map(VectorPoint.listSymmetry[0o00]),
	faceD.Map(VectorPoint.listSymmetry[0o01]),
	faceD.Map(VectorPoint.listSymmetry[0o02]),
	faceD.Map(VectorPoint.listSymmetry[0o03]),
	faceD.Map(VectorPoint.listSymmetry[0o04]),
	faceD.Map(VectorPoint.listSymmetry[0o05]),
	faceD.Map(VectorPoint.listSymmetry[0o06]),
	faceD.Map(VectorPoint.listSymmetry[0o07]),
	faceD.Map(VectorPoint.listSymmetry[0o20]),
	faceD.Map(VectorPoint.listSymmetry[0o21]),
	faceD.Map(VectorPoint.listSymmetry[0o22]),
	faceD.Map(VectorPoint.listSymmetry[0o23]),
	faceD.Map(VectorPoint.listSymmetry[0o24]),
	faceD.Map(VectorPoint.listSymmetry[0o25]),
	faceD.Map(VectorPoint.listSymmetry[0o26]),
	faceD.Map(VectorPoint.listSymmetry[0o27]),
	faceD.Map(VectorPoint.listSymmetry[0o40]),
	faceD.Map(VectorPoint.listSymmetry[0o41]),
	faceD.Map(VectorPoint.listSymmetry[0o42]),
	faceD.Map(VectorPoint.listSymmetry[0o43]),
	faceD.Map(VectorPoint.listSymmetry[0o44]),
	faceD.Map(VectorPoint.listSymmetry[0o45]),
	faceD.Map(VectorPoint.listSymmetry[0o46]),
	faceD.Map(VectorPoint.listSymmetry[0o47]),

	faceE.Map(VectorPoint.listSymmetry[0o00]),
	faceE.Map(VectorPoint.listSymmetry[0o01]),
	faceE.Map(VectorPoint.listSymmetry[0o02]),
	faceE.Map(VectorPoint.listSymmetry[0o03]),
	faceE.Map(VectorPoint.listSymmetry[0o04]),
	faceE.Map(VectorPoint.listSymmetry[0o05]),
	faceE.Map(VectorPoint.listSymmetry[0o06]),
	faceE.Map(VectorPoint.listSymmetry[0o07]),
]);

let r = vertexA.GetValue().GetLength();
let listSolid = [
	solidA.Map((v) => v.Div(r)),
];

/** @type {(timeSec: number) => void} */
let DrawFrame = function (timeSec) {
	let arcXY = timeSec * (Math.PI / 4);
	let arcZY = Math.PI * (0.5 - 1 / 16);
	let sinXY = Math.sin(arcXY);
	let sinZY = Math.sin(arcZY);
	let cosXY = Math.cos(arcXY);
	let cosZY = Math.cos(arcZY);
	painter.Draw(listSolid, (v) => (new VectorPoint(
		v.x * cosXY - v.y * sinXY,
		(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
		v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
	)), lineWidth);
};

export { DrawFrame };
