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
let painter = new Painter(document.querySelector('canvas.Archimedean-3-6-6'), vLight, focalLength);
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

let vertexA = new Point(1, 1, 1);
let vertexB = Point.At(vertexA, vertexA.CreatePoint(VectorPoint.listSymmetry[0o03]), 1 / 3);
let faceA = new Polygon([
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o01]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o21]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o24]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o44]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o42]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o02]),
], 0, colorA);
let faceB = new Polygon([
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o00]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o20]),
	vertexB.CreatePoint(VectorPoint.listSymmetry[0o40]),
], 0, colorA);
let solidA = new Polyhedron([
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o00]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o03]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o05]),
	faceA.CreatePolygon(VectorPoint.listSymmetry[0o06]),
	faceB.CreatePolygon(VectorPoint.listSymmetry[0o01]),
	faceB.CreatePolygon(VectorPoint.listSymmetry[0o02]),
	faceB.CreatePolygon(VectorPoint.listSymmetry[0o04]),
	faceB.CreatePolygon(VectorPoint.listSymmetry[0o07]),
]);

let r = vertexB.GetValue().GetLength();
let listSolid = [
	solidA.CreatePolyhedron((v) => v.Div(r)),
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

// import {
// 	Color,
// 	Vector2D,
// 	Polygon2D,
// 	Vector3D,
// 	Polygon3D,
// 	Transformation,
// 	Coloration,
// 	Batch,
// 	Painter,
// } from "../polyhedra.js";

// let vLight = new Vector3D(0, 3, 4);
// let focalLength = 12;
// let lineWidth = 3;
// let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
// let painter = new Painter(document.querySelector('canvas.Archimedean-3-6-6'), vLight, focalLength);
// let vertex0A = new Vector3D(1, 1, 1);
// let vertexA = Vector3D.GetDiversion(
// 	vertex0A,
// 	vertex0A.Create((v) => (new Vector3D(+v.x, -v.y, -v.z))),
// 	1 / 3,
// );

// let faceA = new Polygon3D([
// 	vertexA.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
// 	vertexA.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
// 	vertexA.Create((v) => (new Vector3D(+v.z, +v.x, -v.y))),
// 	vertexA.Create((v) => (new Vector3D(-v.z, +v.x, +v.y))),
// 	vertexA.Create((v) => (new Vector3D(-v.y, +v.z, +v.x))),
// 	vertexA.Create((v) => (new Vector3D(+v.y, -v.z, +v.x))),
// ], 0, colorA);
// let faceB = new Polygon3D([
// 	vertexA.Create((v) => (new Vector3D(-v.x, -v.y, -v.z))),
// 	vertexA.Create((v) => (new Vector3D(-v.y, -v.z, -v.x))),
// 	vertexA.Create((v) => (new Vector3D(-v.z, -v.x, -v.y))),
// ], 0, colorA);
// let listFace = [
// 	faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
// 	faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
// 	faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
// 	faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
// 	faceB.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
// 	faceB.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
// 	faceB.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
// ];

// let r = vertexA.GetLength();
// let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));

// /** @type {(timeSec: number) => void} */
// let DrawFrame = function (timeSec) {
// 	let arcXY = timeSec * (Math.PI / 4);
// 	let arcZY = Math.PI * (0.5 - 1 / 16);
// 	let sinXY = Math.sin(arcXY);
// 	let sinZY = Math.sin(arcZY);
// 	let cosXY = Math.cos(arcXY);
// 	let cosZY = Math.cos(arcZY);
// 	painter.Draw(solid.Map((v) => (new Vector3D(
// 		v.x * cosXY - v.y * sinXY,
// 		(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
// 		v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
// 	))), lineWidth);
// };

// export { DrawFrame };
