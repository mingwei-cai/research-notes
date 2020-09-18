
// ======================== canvas element ========================

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
	constructor(listVertex, color = Color.default) {
		this.listVertex = listVertex;
		this.color = color;
	};
};

// ======================== basic 3D caculation ========================

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
Vector3D.prototype.Map = function (Trans) {
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

let Polygon3D = class {
	/** @type {Vector3D[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Vector3D[], color: Color)} */
	constructor(listVertex, color = Color.default) {
		this.listVertex = listVertex;
		this.color = color;
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
Polygon3D.prototype.Map = function (Trans) {
	return new Polygon3D(
		this.listVertex.map(Trans),
		this.color,
	);
};

/** @type {(vLight: Vector3D, focal: number) => Polygon2D} */
Polygon3D.prototype.Projection = function (vLight, focal) {
	let vNormal = this.Normal();
	let v0 = this.listVertex[0];
	let light = (1 + (vNormal.Dot(new Vector3D(v0.x, v0.y, v0.z - focal)) > 0 ? -1 : 1) * vLight.Dot(vNormal.Uint())) / 2;
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

// ======================== batch process ========================

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
	let listFace = this.data.ListFace(m).map((face) => (face.Map(this.Trans)));
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
	let a = this.color.a;
	let t = 1 - a;
	let listFace = this.data.ListFace(m).map((face) => (new Polygon3D(
		face.listVertex,
		new Color(
			this.color.r * a + face.color.r * t,
			this.color.g * a + face.color.g * t,
			this.color.b * a + face.color.b * t,
			a + face.color.a * t,
		),
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

// ======================== painter ========================

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
		this.scale = (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (focal * focal)) * 0.96;
	};
};

/** @type {(w: number, h: number, scale: number)} */
Painter.prototype.Resize = function (w, h, scale = 0) {
	this.cvs.width = w;
	this.cvs.height = h;
	this.ox = w / 2;
	this.oy = h / 2;
	this.scale = scale || (this.ox < this.oy ? this.ox : this.oy) * (1 - 1 / (this.focal * this.focal)) * 0.96;
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
Painter.prototype.Draw = function (data, lineWidth = 3) {
	let ctx = this.cvs.getContext('2d');
	ctx.clearRect(0, 0, +this.cvs.width, +this.cvs.height);
	ctx.lineWidth = lineWidth;
	ctx.lineJoin = 'round';
	let listPolygon = this.ListPolygon(data);
	for (let polygon of listPolygon) {
		ctx.beginPath();
		for (let vertex of polygon.listVertex) {
			ctx.lineTo(this.ox + vertex.x * this.scale, this.oy - vertex.y * this.scale);
		};
		ctx.closePath();
		ctx.fillStyle = polygon.color.Style();
		ctx.fill();
		ctx.stroke();
	};
};
