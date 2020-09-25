
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

Point2D.prototype.GetValue = function () {
	return this;
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

Polygon2D.prototype.GetValue = function () {
	return this;
};

// ======================== 3D 座標點 ========================

let VectorPoint = class {
	y = 0;
	z = 0;
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
VectorPoint.listSymmetry = [

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

	(v) => new VectorPoint(+v.y, +v.z, +v.x),
	(v) => new VectorPoint(-v.y, +v.z, +v.x),
	(v) => new VectorPoint(+v.y, -v.z, +v.x),
	(v) => new VectorPoint(-v.y, -v.z, +v.x),
	(v) => new VectorPoint(+v.y, +v.z, -v.x),
	(v) => new VectorPoint(-v.y, +v.z, -v.x),
	(v) => new VectorPoint(+v.y, -v.z, -v.x),
	(v) => new VectorPoint(-v.y, -v.z, -v.x),

	(v) => new VectorPoint(+v.x, +v.z, +v.y),
	(v) => new VectorPoint(-v.x, +v.z, +v.y),
	(v) => new VectorPoint(+v.x, -v.z, +v.y),
	(v) => new VectorPoint(-v.x, -v.z, +v.y),
	(v) => new VectorPoint(+v.x, +v.z, -v.y),
	(v) => new VectorPoint(-v.x, +v.z, -v.y),
	(v) => new VectorPoint(+v.x, -v.z, -v.y),
	(v) => new VectorPoint(-v.x, -v.z, -v.y),

	(v) => new VectorPoint(+v.z, +v.x, +v.y),
	(v) => new VectorPoint(-v.z, +v.x, +v.y),
	(v) => new VectorPoint(+v.z, -v.x, +v.y),
	(v) => new VectorPoint(-v.z, -v.x, +v.y),
	(v) => new VectorPoint(+v.z, +v.x, -v.y),
	(v) => new VectorPoint(-v.z, +v.x, -v.y),
	(v) => new VectorPoint(+v.z, -v.x, -v.y),
	(v) => new VectorPoint(-v.z, -v.x, -v.y),

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
PointManager.prototype.Map = function (Trans) {
	return new PointManager(this, Trans);
};

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

/** @type {(Trans: Transformation) => PointManager} */
Point.prototype.Map = function (Trans) {
	return new PointManager(this, Trans);
};

/** @type {(vertex0: VertexData, vertex1: VertexData, k: number) => Point} */
Point.At = function (vertexA, vertexB, k) {
	let vA = vertexA.GetValue();
	let vB = vertexB.GetValue();
	return new Point(
		vA.x + (vB.x - vA.x) * k,
		vA.y + (vB.y - vA.y) * k,
		vA.z + (vB.z - vA.z) * k,
	);
};

// ======================== 3D 多邊形 ========================

let VectorPolygon = class {
	/** @type {VectorPoint[]} */
	listVertex = null;
	order = 0;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: VectorPoint[], order: number, color: Color)} */
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
		this.order,
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
	let uX = new VectorPoint(sumXX, sumXY, sumZX);
	let uY = new VectorPoint(sumXY, sumYY, sumYZ);
	let uZ = new VectorPoint(sumZX, sumYZ, sumZZ);
	let vX = uY.Cross(uZ);
	let vY = uZ.Cross(uX);
	let vZ = uX.Cross(uY);
	let det = uX.Dot(vX);
	if (det == 0) {
		return new VectorPoint(0, 0, 0);
	};
	let vNormal = (vX.Mul(sumX)).Add(vY.Mul(sumY)).Add(vZ.Mul(sumZ)).Div(det);
	return vNormal.Div(vNormal.Dot(vNormal));
};

/** @type {(focalLength: number, vLight: VectorPoint) => Polygon2D} */
VectorPolygon.prototype.GetProjection = function (focalLength, vLight) {
	let vCenter = this.GetCenter();
	let d = vCenter.Dot(vCenter);
	let isBack = (focalLength * vCenter.z < d);
	let order = (isBack ? ~this.order : this.order);
	let color = this.color;
	if (color.a > 0) {
		let cosL = vCenter.Dot(vLight) / Math.sqrt(d);
		let k = (1 + (isBack ? -cosL : cosL)) / 2;
		color = new Color(
			color.r * k,
			color.g * k,
			color.b * k,
			color.a,
		);
	};
	return new Polygon2D(
		this.listVertex.map((v) => v.GetProjection(focalLength)),
		order,
		color,
	);
};

/** @typedef {{GetValue: (m: WeakMap) => VectorPolygon}} FaceData */
'JSDoc @typedef FaceData';

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

/** @type {(m: WeakMap) => VectorPolygon} */
PolygonManager.prototype.GetValue = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = this.data.GetValue(m).Map(this.Trans, this.color);
	m.set(this, value);
	return value;
};

/** @type {(Trans: Transformation, color: Color) => PolygonManager} */
PolygonManager.prototype.Map = function (Trans, color = null) {
	return new PolygonManager(this, Trans, color);
};

let Polygon = class {
	/** @type {VertexData[]} */
	listVertex = null;
	order = 0;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: VertexData[], order: number, color: Color)} */
	constructor(listVertex, order, color = null) {
		this.listVertex = listVertex;
		this.order = order;
		this.color = color;
	};
};

/** @type {(m: WeakMap) => VectorPolygon} */
Polygon.prototype.GetValue = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = new VectorPolygon(
		this.listVertex.map((vertex) => vertex.GetValue()),
		this.order,
		this.color,
	);
	m.set(this, value);
	return value;
};

/** @type {(Trans: Transformation, color: Color) => PolygonManager} */
Polygon.prototype.Map = function (Trans, color = null) {
	return new PolygonManager(this, Trans, color);
};

// ======================== 3D 多面體 ========================

/** @typedef {{GetValue: (m: WeakMap) => VectorPolygon[]}} SolidData */
'JSDoc @typedef SolidData';

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

/** @type {(m: WeakMap) => VectorPolygon[]} */
PolyhedronManager.prototype.GetValue = function (m) {
	return this.data.GetValue(m).map((face) => face.Map(this.Trans, this.color));
};

/** @type {(Trans: Transformation, color: Color) => PolyhedronManager} */
PolyhedronManager.prototype.Map = function (Trans, color = null) {
	return new PolyhedronManager(this, Trans, color);
};

let Polyhedron = class {
	/** @type {FaceData[]} */
	listFace = null;
	/** @type {(listFace: FaceData[])} */
	constructor(listFace) {
		this.listFace = listFace;
	};
};

/** @type {(m: WeakMap) => VectorPolygon[]} */
Polyhedron.prototype.GetValue = function (m) {
	return this.listFace.map((face) => face.GetValue(m));
};

/** @type {(Trans: Transformation, color: Color) => PolyhedronManager} */
Polyhedron.prototype.Map = function (Trans, color = null) {
	return new PolyhedronManager(this, Trans, color);
};

// ======================== 實際作畫邏輯 ========================

let Painter = class {
	/** @type {HTMLCanvasElement} */
	cvs = null;
	/** @type {VectorPoint} */
	vLight = null;
	focalLength = 0;
	ox = 0;
	oy = 0;
	scale = 0;
	/** @type {(cvs: HTMLCanvasElement, vLight: VectorPoint, focalLength: number)} */
	constructor(cvs, vLight, focalLength) {
		this.cvs = cvs;
		this.vLight = vLight.Div(vLight.GetLength());
		this.focalLength = focalLength;
		this.ox = cvs.width / 2;
		this.oy = cvs.height / 2;
		this.scale = (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (focalLength * focalLength)) * 0.9;
	};
};

/** @type {(w: number, h: number, scale: number)} */
Painter.prototype.Resize = function (w, h) {
	this.cvs.width = w;
	this.cvs.height = h;
	this.ox = w / 2;
	this.oy = h / 2;
	this.scale = (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (this.focalLength * this.focalLength)) * 0.9;
};

/** @type {(listSolid: SolidData[], Trans: Transformation) => Polygon2D[]} */
Painter.prototype.ListPolygon = function (listSolid, Trans) {
	let m = new WeakMap();
	/** @type {VectorPolygon[]} */
	let listFace = Array.prototype.concat.apply([], listSolid.map((solid) => solid.GetValue(m)));
	return listFace.map((face) => face.Map(Trans).GetProjection(this.focalLength, this.vLight)).sort((a, b) => a.order - b.order);
};

/** @type {(listSolid: SolidData[], Trans: Transformation, lineWidth: number) => void} */
Painter.prototype.Draw = function (listSolid, Trans, lineWidth = 0) {
	let ctx = this.cvs.getContext('2d');
	ctx.clearRect(0, 0, +this.cvs.width, +this.cvs.height);
	if (lineWidth > 0) {
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = 'round';
	};
	let listPolygon = this.ListPolygon(listSolid, Trans);
	for (let polygon of listPolygon) {
		ctx.beginPath();
		for (let vertex of polygon.listVertex) {
			ctx.lineTo(this.ox + vertex.x * this.scale, this.oy - vertex.y * this.scale);
		};
		ctx.closePath();
		ctx.fillStyle = polygon.color.GetStyle();
		ctx.fill();
		if (lineWidth > 0) {
			ctx.stroke();
		};
	};
};

export {
	Color,
	VectorPoint,
	Point,
	Polygon,
	Polyhedron,
	Painter,
};
