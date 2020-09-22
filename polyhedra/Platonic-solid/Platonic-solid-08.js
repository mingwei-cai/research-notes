import {
	Color,
	Vector2D,
	Polygon2D,
	Vector3D,
	Polygon3D,
	Transformation,
	Coloration,
	Batch,
	Painter,
} from "../polyhedra.js";

let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);
let painter = new Painter(document.querySelector('canvas.Platonic-08'), vLight, focal);

let vertexA = (new Vector3D(1, 0, 0)).Uint();
let faceA = new Polygon3D([
	vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
	vertexA.Create((v) => (new Vector3D(+v.y, +v.z, +v.x))),
	vertexA.Create((v) => (new Vector3D(+v.z, +v.x, +v.y))),
], colorA);
let listFace = [
	faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
	faceA.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	faceA.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
	faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
	faceA.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
	faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
	faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
	faceA.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
];
let r = vertexA.Length();
let solid = (new Batch(listFace)).Map((v) => (v.Div(r)));

/** @type {(timeSec: number) => void} */
let DrawFrame = function (timeSec) {
	let arcXY = timeSec * (Math.PI / 4);
	let arcZY = Math.PI * (0.5 - 1 / 16);
	let sinXY = Math.sin(arcXY);
	let sinZY = Math.sin(arcZY);
	let cosXY = Math.cos(arcXY);
	let cosZY = Math.cos(arcZY);
	painter.Draw(solid.Map((v) => (new Vector3D(
		v.x * cosXY - v.y * sinXY,
		(v.y * cosXY + v.x * sinXY) * cosZY + v.z * sinZY,
		v.z * cosZY - (v.y * cosXY + v.x * sinXY) * sinZY,
	))), lineWidth);
};

export { DrawFrame };
