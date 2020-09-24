
// 雖然 canvas 本身就支援用 WebGL 來實現 3D 作圖
// 但這份程式碼是用 2D 來模擬 3D
// 這僅為滿足個人研究興趣
// 不建議將這份程式碼直接用於實際應用

// ======================== canvas 相關物件 ========================

let Color = class {
	r = 0;
	g = 0;
	b = 0;
	a = 0;
	/** @type {(r: number, g: number, b: number, a: number)} */
	constructor(r, g, b, a = 1) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	};
};

Color.prototype.GetStyle = function () {
	return 'rgba(' + [this.r, this.g, this.b, this.a].join() + ')';
};

/** @type {(color: Color) => Color} */
Color.prototype.Over = function (color) {
	let a0 = this.a;
	if (a0 == 0) {
		return color;
	};
	let a1 = color.a * (1 - a0);
	if (a1 == 0) {
		return this;
	};
	let a = a0 + a1;
	let p = a0 / a;
	return new Color(
		color.r + (this.r - color.r) * p,
		color.g + (this.g - color.g) * p,
		color.b + (this.b - color.b) * p,
		a,
	);
};

Color.transparent = new Color(0, 0, 0, 0);

let Point2D = class {
	x = 0;
	y = 0;
	/** @type {(x: number, y: number)} */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	};
};

let Polygon2D = class {
	/** @type {Point2D[]} */
	listVertex = null;
	order = 0;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Point2D[], order: number, color: Color)} */
	constructor(listVertex, order, color = null) {
		this.listVertex = listVertex;
		this.order = order;
		this.color = color || Color.transparent;
	};
};

// ======================== 3D 座標點 ========================

let VectorPoint = class {
	x = 0;
	y = 0;
	z = 0;
	/** @type {(x: number, y: number, z: number)} */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};
};

/** @type {(v: VectorPoint) => VectorPoint} */
VectorPoint.prototype.Add = function (v) {
	return new VectorPoint(
		this.x + v.x,
		this.y + v.y,
		this.z + v.z,
	);
};

/** @type {(v: VectorPoint) => VectorPoint} */
VectorPoint.prototype.Sub = function (v) {
	return new VectorPoint(
		this.x - v.x,
		this.y - v.y,
		this.z - v.z,
	);
};

/** @type {(k: number) => VectorPoint} */
VectorPoint.prototype.Mul = function (k) {
	return new VectorPoint(
		this.x * k,
		this.y * k,
		this.z * k,
	);
};

/** @type {(k: number) => VectorPoint} */
VectorPoint.prototype.Div = function (k) {
	return new VectorPoint(
		this.x / k,
		this.y / k,
		this.z / k,
	);
};

/** @type {(v: VectorPoint) => VectorPoint} */
VectorPoint.prototype.Cross = function (v) {
	return new VectorPoint(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x,
	);
};

/** @type {(v: VectorPoint) => number} */
VectorPoint.prototype.Dot = function (v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

VectorPoint.prototype.GetLength = function () {
	return Math.sqrt(this.Dot(this));
};

VectorPoint.prototype.GetUint = function () {
	let r = this.GetLength();
	return (r > 0 ? this.Div(r) : this);
};

/** @type {(focalLength: number) => Point2D} */
VectorPoint.prototype.GetProjection = function (focalLength) {
	let r = focalLength / (focalLength - this.z);
	return new Point2D(
		this.x * r,
		this.y * r,
	);
};

/** @typedef {(v: VectorPoint) => VectorPoint} Transformation */
'JSDoc @typedef Transformation';

/** @type {Transformation[]} */
let listSymmetry = [

	(v) => new VectorPoint(+v.x, +v.y, +v.z),
	(v) => new VectorPoint(-v.x, +v.y, +v.z),
	(v) => new VectorPoint(+v.x, -v.y, +v.z),
	(v) => new VectorPoint(-v.x, -v.y, +v.z),
	(v) => new VectorPoint(+v.x, +v.y, -v.z),
	(v) => new VectorPoint(-v.x, +v.y, -v.z),
	(v) => new VectorPoint(+v.x, -v.y, -v.z),
	(v) => new VectorPoint(-v.x, -v.y, -v.z),

	(v) => new VectorPoint(+v.y, +v.x, +v.z),
	(v) => new VectorPoint(-v.y, +v.x, +v.z),
	(v) => new VectorPoint(+v.y, -v.x, +v.z),
	(v) => new VectorPoint(-v.y, -v.x, +v.z),
	(v) => new VectorPoint(+v.y, +v.x, -v.z),
	(v) => new VectorPoint(-v.y, +v.x, -v.z),
	(v) => new VectorPoint(+v.y, -v.x, -v.z),
	(v) => new VectorPoint(-v.y, -v.x, -v.z),

	(v) => new VectorPoint(+v.z, +v.x, +v.y),
	(v) => new VectorPoint(-v.z, +v.x, +v.y),
	(v) => new VectorPoint(+v.z, -v.x, +v.y),
	(v) => new VectorPoint(-v.z, -v.x, +v.y),
	(v) => new VectorPoint(+v.z, +v.x, -v.y),
	(v) => new VectorPoint(-v.z, +v.x, -v.y),
	(v) => new VectorPoint(+v.z, -v.x, -v.y),
	(v) => new VectorPoint(-v.z, -v.x, -v.y),

	(v) => new VectorPoint(+v.x, +v.z, +v.y),
	(v) => new VectorPoint(-v.x, +v.z, +v.y),
	(v) => new VectorPoint(+v.x, -v.z, +v.y),
	(v) => new VectorPoint(-v.x, -v.z, +v.y),
	(v) => new VectorPoint(+v.x, +v.z, -v.y),
	(v) => new VectorPoint(-v.x, +v.z, -v.y),
	(v) => new VectorPoint(+v.x, -v.z, -v.y),
	(v) => new VectorPoint(-v.x, -v.z, -v.y),

	(v) => new VectorPoint(+v.y, +v.z, +v.x),
	(v) => new VectorPoint(-v.y, +v.z, +v.x),
	(v) => new VectorPoint(+v.y, -v.z, +v.x),
	(v) => new VectorPoint(-v.y, -v.z, +v.x),
	(v) => new VectorPoint(+v.y, +v.z, -v.x),
	(v) => new VectorPoint(-v.y, +v.z, -v.x),
	(v) => new VectorPoint(+v.y, -v.z, -v.x),
	(v) => new VectorPoint(-v.y, -v.z, -v.x),

	(v) => new VectorPoint(+v.z, +v.y, +v.x),
	(v) => new VectorPoint(-v.z, +v.y, +v.x),
	(v) => new VectorPoint(+v.z, -v.y, +v.x),
	(v) => new VectorPoint(-v.z, -v.y, +v.x),
	(v) => new VectorPoint(+v.z, +v.y, -v.x),
	(v) => new VectorPoint(-v.z, +v.y, -v.x),
	(v) => new VectorPoint(+v.z, -v.y, -v.x),
	(v) => new VectorPoint(-v.z, -v.y, -v.x),

];

/** @typedef {{GetValue: () => VectorPoint}} VertexData */
'JSDoc @typedef VertexData';

let Point = class {
	x = 0;
	y = 0;
	z = 0;
	/** @type {(x: number, y: number, z: number)} */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	};
};

Point.prototype.GetValue = function () {
	return new VectorPoint(this.x, this.y, this.z);
};

let PointManager = class {
	/** @type {VertexData} */
	data = null;
	/** @type {Transformation} */
	Trans = null;
	/** @type {(data: VertexData, Trans: Transformation)} */
	constructor(data, Trans) {
		this.data = data;
		this.Trans = Trans;
	};
};

PointManager.prototype.GetValue = function () {
	return this.Trans(this.data.GetValue());
};

/** @type {(Trans: Transformation) => PointManager} */
PointManager.prototype.CreatePoint = function (Trans) {
	return new PointManager(this, Trans);
};
Point.prototype.CreatePoint = PointManager.prototype.CreatePoint;

// ======================== 3D 多邊形 ========================

let VectorPolygon = class {
	/** @type {VectorPoint[]} */
	listVertex = null;
	order = 0;
	/** @type {Color} */
	color = null;
	/** @type {listVertex: VectorPoint[], order: number, color: Color} */
	constructor(listVertex, order, color = null) {
		this.listVertex = listVertex;
		this.order = order;
		this.color = color || Color.transparent;
	};
};

/** @type {(Trans: Transformation, color: Color) => VectorPolygon} */
VectorPolygon.prototype.Map = function (Trans, color = null) {
	return new VectorPolygon(
		Trans == null ? this.listVertex : this.listVertex.map(Trans),
		color == null ? this.color : color.Over(this.color),
	);
};

VectorPolygon.prototype.GetCenter = function () {
	let sumX = 0;
	let sumY = 0;
	let sumZ = 0;
	let sumXX = 0;
	let sumYY = 0;
	let sumZZ = 0;
	let sumYZ = 0;
	let sumZX = 0;
	let sumXY = 0;
	for (let v of this.listVertex) {
		sumX += v.x;
		sumY += v.y;
		sumZ += v.z;
		sumXX += v.x * v.x;
		sumYY += v.y * v.y;
		sumZZ += v.z * v.z;
		sumYZ += v.y * v.z;
		sumZX += v.z * v.x;
		sumXY += v.x * v.y;
	};
	let u0 = new VectorPoint(sumXX, sumXY, sumZX);
	let u1 = new VectorPoint(sumXY, sumYY, sumYZ);
	let u2 = new VectorPoint(sumZX, sumYZ, sumZZ);
	let v0 = u1.Cross(u2);
	let v1 = u2.Cross(u0);
	let v2 = u0.Cross(u1);
	let det = u0.Dot(v0);
	if (det == 0) {
		return new VectorPoint(0, 0, 0);
	};
	let vNormal = (v0.Mul(sumX)).Add(v1.Mul(sumY)).Add(v2.Mul(sumZ)).Div(det);
	return vNormal.Div(vNormal.Dot(vNormal));
};

/** @type {(focalLength: number, vLight: VectorPoint) => Polygon2D} */
VectorPolygon.prototype.GetProjection = function (focalLength, vLight) {
	let order = this.order;
	let vCenter = this.GetCenter();
	let d = vCenter.GetLength();
	let cosF = vCenter.z / d;
	if (cosF < 0) {
		order = ~order;
		cosF = -cosF;
	};
	let color = this.color;
	if (color.a > 0) {
		let cosL = vCenter.Dot(vLight) / d;
		if (order < 0) {
			cosL = -cosL;
		};
		let k = (1 + cosL) / 2;
		color = new Color(
			color.r * k,
			color.g * k,
			color.b * k,
			cosF > 0 ? 1 - (1 - color.a) ** (1 / cosF) : 1,
		);
	};
	return new Polygon2D(
		this.listVertex.map((v) => v.GetProjection(focalLength)),
		order,
		color,
	);
};

/** @typedef {{GetValue: (order: number) => VectorPolygon}} FaceData */
'JSDoc @typedef FaceData';

let Polygon = class {
	/** @type {VertexData[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {listVertex: VertexData[], color: Color} */
	constructor(listVertex, color = null) {
		this.listVertex = listVertex;
		this.color = color;
	};
};

/** @type {(order: number) => VectorPolygon} */
Polygon.prototype.GetValue = function (order) {
	return VectorPolygon(
		this.listVertex.map((v) => v.GetValue()),
		order,
		this.color,
	);
};

let PolygonManager = class {
	/** @type {FaceData} */
	data = null;
	/** @type {Transformation} */
	Trans = null;
	/** @type {Color} */
	color = null;
	/** @type {(data: FaceData, Trans: Transformation, color: Color)} */
	constructor(data, Trans, color = null) {
		this.data = data;
		this.Trans = Trans;
		this.color = color;
	};
};

/** @type {(order: number) => VectorPolygon} */
PolygonManager.prototype.GetValue = function (order) {
	return this.data.GetValue(order).Map(this.Trans, this.color);
};

/** @type {(Trans: Transformation, color: Color) => PolygonManager} */
PolygonManager.prototype.CreatePolygon = function (Trans, color = null) {
	return new PolygonManager(this, Trans, color);
};
Polygon.prototype.CreatePolygon = PolygonManager.prototype.CreatePolygon;

// ======================== 3D 多面體 ========================

/** @typedef {{GetValue: () => VectorPolygon[]}} SolidData */
'JSDoc @typedef SolidData';

let Polyhedron = class {
	/** @type {FaceData[]} */
	listFace = null;
	order = 0;
	/** @type {(listFace: FaceData[], order: number)} */
	constructor(listFace, order) {
		this.listFace = listFace;
		this.order = order;
	};
};

/** @type {() => VectorPolygon[]} */
Polyhedron.prototype.GetValue = function () {
	return this.listFace.map((f) => f.GetValue(this.order));
};

let PolyhedronManager = class {
	/** @type {SolidData} */
	data = null;
	/** @type {Transformation} */
	Trans = null;
	/** @type {Color} */
	color = null;
	/** @type {(data: SolidData, Trans: Transformation, color: Color)} */
	constructor(data, Trans, color = null) {
		this.data = data;
		this.Trans = Trans;
		this.color = color;
	};
};
