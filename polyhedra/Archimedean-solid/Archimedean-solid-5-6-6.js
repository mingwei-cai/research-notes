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
let painter = new Painter(document.querySelector('canvas.Archimedean-5-6-6'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = Point.At(
	new Point(0, 0, 1),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	1 / 3,
);
let vertexB = Point.At(
	new Point(1 / 2, 1 / (Math.sqrt(5) + 1), (Math.sqrt(5) + 1) / 4),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	1 / 3,
);
let vertexC = Point.At(
	new Point(1 / (Math.sqrt(5) + 1), (Math.sqrt(5) + 1) / 4, 1 / 2),
	new Point(0, 2 / (Math.sqrt(5) + 1), 1),
	1 / 3,
);
let faceA = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o01]),
	vertexB.Map(VectorPoint.listSymmetry[0o01]),
], 0, colorA);
let faceB = new Polygon([
	vertexA.Map(VectorPoint.listSymmetry[0o10]),
	vertexB.Map(VectorPoint.listSymmetry[0o10]),
	vertexC.Map(VectorPoint.listSymmetry[0o30]),
	vertexC.Map(VectorPoint.listSymmetry[0o31]),
	vertexB.Map(VectorPoint.listSymmetry[0o11]),
	vertexA.Map(VectorPoint.listSymmetry[0o11]),
], 0, colorA);
let faceC = new Polygon([
	vertexC.Map(VectorPoint.listSymmetry[0o00]),
	vertexB.Map(VectorPoint.listSymmetry[0o00]),
	vertexC.Map(VectorPoint.listSymmetry[0o20]),
	vertexB.Map(VectorPoint.listSymmetry[0o20]),
	vertexC.Map(VectorPoint.listSymmetry[0o40]),
	vertexB.Map(VectorPoint.listSymmetry[0o40]),
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

	faceB.Map(VectorPoint.listSymmetry[0o10]),
	faceB.Map(VectorPoint.listSymmetry[0o13]),
	faceB.Map(VectorPoint.listSymmetry[0o15]),
	faceB.Map(VectorPoint.listSymmetry[0o16]),
	faceB.Map(VectorPoint.listSymmetry[0o30]),
	faceB.Map(VectorPoint.listSymmetry[0o33]),
	faceB.Map(VectorPoint.listSymmetry[0o35]),
	faceB.Map(VectorPoint.listSymmetry[0o36]),
	faceB.Map(VectorPoint.listSymmetry[0o50]),
	faceB.Map(VectorPoint.listSymmetry[0o53]),
	faceB.Map(VectorPoint.listSymmetry[0o55]),
	faceB.Map(VectorPoint.listSymmetry[0o56]),

	faceC.Map(VectorPoint.listSymmetry[0o00]),
	faceC.Map(VectorPoint.listSymmetry[0o01]),
	faceC.Map(VectorPoint.listSymmetry[0o02]),
	faceC.Map(VectorPoint.listSymmetry[0o03]),
	faceC.Map(VectorPoint.listSymmetry[0o04]),
	faceC.Map(VectorPoint.listSymmetry[0o05]),
	faceC.Map(VectorPoint.listSymmetry[0o06]),
	faceC.Map(VectorPoint.listSymmetry[0o07]),
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
