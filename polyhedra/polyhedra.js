
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

Color.prototype.Style = function () {
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

Color.default = new Color(0, 0, 0, 0);

let Vector2D = class {
	x = 0;
	y = 0;
	/** @type {(x: number, y: number)} */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	};
};

let Polygon2D = class {
	/** @type {Vector2D[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Vector2D[], color: Color)} */
	constructor(listVertex, color = null) {
		this.listVertex = listVertex;
		this.color = color || Color.default;
	};
};

// ======================== 基本 3D 運算 ========================

let Vector3D = class {
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

/** @type {(v: Vector3D) => Vector3D} */
Vector3D.prototype.Add = function (v) {
	return new Vector3D(
		this.x + v.x,
		this.y + v.y,
		this.z + v.z,
	);
};

/** @type {(v: Vector3D) => Vector3D} */
Vector3D.prototype.Sub = function (v) {
	return new Vector3D(
		this.x - v.x,
		this.y - v.y,
		this.z - v.z,
	);
};

/** @type {(k: number) => Vector3D} */
Vector3D.prototype.Mul = function (k) {
	return new Vector3D(
		this.x * k,
		this.y * k,
		this.z * k,
	);
};

/** @type {(k: number) => Vector3D} */
Vector3D.prototype.Div = function (k) {
	return new Vector3D(
		this.x / k,
		this.y / k,
		this.z / k,
	);
};

/** @type {(v: Vector3D, k: number) => Vector3D} */
Vector3D.prototype.MoveTo = function (v, k) {
	return new Vector3D(
		this.x + (v.x - this.x) * k,
		this.y + (v.y - this.y) * k,
		this.z + (v.z - this.z) * k,
	);
};

/** @type {(v: Vector3D) => Vector3D} */
Vector3D.prototype.Cross = function (v) {
	return new Vector3D(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x,
	);
};

/** @type {(v: Vector3D) => number} */
Vector3D.prototype.Dot = function (v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

Vector3D.prototype.Length = function () {
	return Math.sqrt(this.Dot(this));
};

Vector3D.prototype.Uint = function () {
	let r = this.Length();
	return (r > 0 ? this.Div(r) : this);
};

/** @type {(Trans: (v: Vector3D) => Vector3D) => Vector3D} */
Vector3D.prototype.Create = function (Trans) {
	return Trans(this);
};

/** @type {(focal: number) => Vector2D} */
Vector3D.prototype.Projection = function (focal) {
	let r = focal / (focal - this.z);
	return new Vector2D(
		this.x * r,
		this.y * r,
	);
};

/** @type {(v0: Vector3D, v1: Vector3D, v2: Vector3D) => Vector3D} */
Vector3D.GetIntersection = function (v0, v1, v2) {
	let u0 = v1.Cross(v2);
	let u1 = v2.Cross(v0);
	let u2 = v0.Cross(v1);
	let det = v0.Dot(u0);
	return u0.Add(u1).Add(u2).Div(det);
};

let Polygon3D = class {
	/** @type {Vector3D[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Vector3D[], color: Color)} */
	constructor(listVertex, color = null) {
		this.listVertex = listVertex;
		this.color = color || Color.default;
	};
};

Polygon3D.prototype.Normal = function () {
	let vNormal = new Vector3D(0, 0, 0);
	let v0 = this.listVertex[0];
	let vA = this.listVertex[1].Sub(v0);
	let n = this.listVertex.length;
	for (let i = 2; i < n; ++i) {
		let vB = this.listVertex[2].Sub(v0);
		vNormal = vNormal.Add(vA.Cross(vB));
		vA = vB;
	};
	return vNormal;
};

Polygon3D.prototype.ZIndex = function () {
	let vNormal = this.Normal();
	return vNormal.z * vNormal.Dot(this.listVertex[0]) / vNormal.Dot(vNormal);
};

/** @type {(m: WeakMap<any, Polygon3D[]>) => Polygon3D[]} */
Polygon3D.prototype.ListFace = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let listFace = [this];
	m.set(listFace)
	return listFace;
};

/** @type {(Trans: (v: Vector3D) => Vector3D) => Polygon3D} */
Polygon3D.prototype.Create = function (Trans) {
	return new Polygon3D(
		this.listVertex.map(Trans),
		this.color,
	);
};

/** @type {(vLight: Vector3D, focal: number) => Polygon2D} */
Polygon3D.prototype.Projection = function (vLight, focal) {
	let vNormal = this.Normal();
	let v0 = this.listVertex[0];
	let cos = vLight.Dot(vNormal.Uint()) * (vNormal.Dot(new Vector3D(v0.x, v0.y, v0.z - focal)) > 0 ? -1 : 1);
	let light = (1 + cos) / 2;
	return new Polygon2D(
		this.listVertex.map((v) => (v.Projection(focal))),
		new Color(
			this.color.r * light,
			this.color.g * light,
			this.color.b * light,
			this.color.a,
		),
	);
};

// ======================== 批次變換 ========================

/** @typedef {{ListFace: (m: WeakMap<any, Polygon3D[]>) => Polygon3D[]}} FaceData */
'JSDoc @typedef FaceData';

let Transformation = class {
	/** @type {FaceData} */
	data = null;
	/** @type {(v: Vector3D) => Vector3D} */
	Trans = null;
	/** @type {(data: FaceData, Trans: (v: Vector3D) => Vector3D)} */
	constructor(data, Trans) {
		this.data = data;
		this.Trans = Trans;
	};
};

/** @type {(m: WeakMap<any, Polygon3D[]>) => Polygon3D[]} */
Transformation.prototype.ListFace = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let listFace = this.data.ListFace(m).map((face) => (face.Create(this.Trans)));
	m.set(this, listFace);
	return listFace;
};

let Coloration = class {
	/** @type {FaceData} */
	data = null;
	/** @type {Color} */
	color = null;
	/** @type {(data: FaceData, color: Color} */
	constructor(data, color) {
		this.data = data;
		this.color = color;
	};
};

/** @type {(m: WeakMap<any, Polygon3D[]>) => Polygon3D[]} */
Coloration.prototype.ListFace = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let listFace = this.data.ListFace(m).map((face) => (new Polygon3D(
		face.listVertex,
		this.color.Over(face.color),
	)));
	m.set(this, listFace);
	return listFace;
};

let Batch = class {
	/** @type {FaceData[]} */
	listData = null;
	/** @type {(listData: FaceData[]} */
	constructor(listData) {
		this.listData = listData;
	};
};

/** @type {(m: WeakMap<any, Polygon3D[]>) => Polygon3D[]} */
Batch.prototype.ListFace = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	/** @type {Polygon3D[]} */
	let listFace = [];
	for (let data of this.listData) {
		listFace.push(...data.ListFace(m));
	};
	m.set(this, listFace);
	return listFace;
};

/** @type {(Trans: (v: Vector3D) => Vector3D) => Transformation} */
Polygon3D.prototype.Map = function (Trans) {
	return new Transformation(this, Trans);
};
Transformation.prototype.Map = Polygon3D.prototype.Map;
Coloration.prototype.Map = Polygon3D.prototype.Map;
Batch.prototype.Map = Polygon3D.prototype.Map;

// ======================== 實際作畫邏輯 ========================

let Painter = class {
	/** @type {HTMLCanvasElement} */
	cvs = null;
	/** @type {Vector3D} */
	vLight = null;
	focal = 0;
	ox = 0;
	oy = 0;
	scale = 0;
	/** @type {(cvs: HTMLCanvasElement, vLight: Vector3D, focal: number)} */
	constructor(cvs, vLight, focal) {
		this.cvs = cvs;
		this.vLight = vLight.Uint();
		this.focal = focal;
		this.ox = cvs.width / 2;
		this.oy = cvs.height / 2;
		this.scale = (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (focal * focal)) * 0.9;
	};
};

/** @type {(w: number, h: number, scale: number)} */
Painter.prototype.Resize = function (w, h) {
	this.cvs.width = w;
	this.cvs.height = h;
	this.ox = w / 2;
	this.oy = h / 2;
	this.scale = (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (this.focal * this.focal)) * 0.9;
};

/** @type {(data: FaceData) => Polygon2D[]} */
Painter.prototype.ListPolygon = function (data) {
	let listFace = data.ListFace(new WeakMap());
	let listZIndex = listFace.map((face) => (face.ZIndex()));
	let n = listFace.length;
	for (let i = 1; i < n; ++i) {
		let face = listFace[i];
		let zIndex = listZIndex[i];
		let j = i;
		while (j >= 1 && listZIndex[j - 1] > zIndex) {
			listFace[j] = listFace[j - 1];
			listZIndex[j] = listZIndex[j - 1];
			--j;
		};
		listFace[j] = face;
		listZIndex[j] = zIndex;
	};
	return listFace.map((face) => (face.Projection(this.vLight, this.focal)));
};

/** @type {(data: FaceData, lineWidth: number) => void} */
Painter.prototype.Draw = function (data, lineWidth = 0) {
	let ctx = this.cvs.getContext('2d');
	ctx.clearRect(0, 0, +this.cvs.width, +this.cvs.height);
	if (lineWidth > 0) {
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = 'round';
	};
	let listPolygon = this.ListPolygon(data);
	for (let polygon of listPolygon) {
		ctx.beginPath();
		for (let vertex of polygon.listVertex) {
			ctx.lineTo(this.ox + vertex.x * this.scale, this.oy - vertex.y * this.scale);
		};
		ctx.closePath();
		ctx.fillStyle = polygon.color.Style();
		ctx.fill();
		if (lineWidth > 0) {
			ctx.stroke();
		};
	};
};

export {
	Color,
	Vector2D,
	Polygon2D,
	Vector3D,
	Polygon3D,
	Transformation,
	Coloration,
	Batch,
	Painter,
};
