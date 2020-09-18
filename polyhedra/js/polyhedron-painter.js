
// ======================== style ========================

let Color = class {
	r = 0;
	g = 0;
	b = 0;
	a = 0;
	/** @type {(r: number, g: number, b: number, a: number)} */
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	};
};

Color.prototype.Style = function () {
	return 'rgba(' + [this.r, this.g, this.b, this.a].join(',') + ')';
};

// ======================== basic 2D caculation ========================

let Vector2D = class {
	x = 0;
	y = 0;
	/** @type {(x: number, y: number)} */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	};
};

/** @type {(v: Vector2D) => Vector2D} */
Vector2D.prototype.Add = function (v) {
	return new Vector2D(
		this.x + v.x,
		this.y + v.y,
	);
};

/** @type {(v: Vector2D) => Vector2D} */
Vector2D.prototype.Sub = function (v) {
	return new Vector2D(
		this.x - v.x,
		this.y - v.y,
	);
};

/** @type {(k: number) => Vector2D} */
Vector2D.prototype.Mul = function (k) {
	return new Vector2D(
		this.x * k,
		this.y * k,
	);
};

/** @type {(k: number) => Vector2D} */
Vector2D.prototype.Div = function (k) {
	return new Vector2D(
		this.x / k,
		this.y / k,
	);
};

/** @type {(v: Vector2D) => number} */
Vector2D.prototype.Cross = function (v) {
	return this.x * v.y - this.y * v.x;
};

/** @type {(v: Vector2D) => number} */
Vector2D.prototype.Dot = function (v) {
	return this.x * v.x + this.y * v.y;
};

Vector2D.prototype.Length = function () {
	return Math.sqrt(this.Dot(this));
};

/** @type {(listVertex: Vector2D[]) => number} */
let GetArea = function (listVertex) {
	let area = 0;
	let v0 = listVertex[0];
	let vA = listVertex[1].Sub(v0);
	let n = listVertex.length;
	for (let i = 2; i < n; ++i) {
		let vB = listVertex[2].Sub(v0);
		area += vA.Cross(vB);
		vA = vB;
	};
	return area / 2;
};

let Polygon2D = class {
	/** @type {Vector2D[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Vector2D[], color: Color)} */
	constructor(listVertex, color) {
		this.listVertex = listVertex;
		this.color = color;
	};
};

Polygon2D.prototype.Area = function () {
	return GetArea(this.listVertex);
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

/** @type {(m: WeakMap) => Vector3D} */
Vector3D.prototype.Value = function (m) {
	return this;
};

/** @type {(focal: number) => Vector2D} */
Vector3D.prototype.Projection = function (focal) {
	let r = focal / (focal - this.z);
	return new Vector2D(
		this.x * r,
		this.y * r,
	);
};

/** @type {(listVertex: Vector3D[]) => Vector3D} */
let GetNormal = function (listVertex) {
	let vNormal = new Vector3D(0, 0, 0);
	let v0 = listVertex[0];
	let vA = listVertex[1].Sub(v0);
	let n = listVertex.length;
	for (let i = 2; i < n; ++i) {
		let vB = listVertex[2].Sub(v0);
		vNormal = vNormal.Add(vA.Cross(vB));
		vA = vB;
	};
	return vNormal;
};

let Polygon3D = class {
	/** @type {Vector3D[]} */
	listVertex = null;
	/** @type {Color} */
	color = null;
	/** @type {(listVertex: Vector3D[], color: Color)} */
	constructor(listVertex, color) {
		this.listVertex = listVertex;
		this.color = color;
	};
};

Polygon3D.prototype.Normal = function () {
	return GetNormal(this.listVertex);
};

Polygon3D.prototype.ZIndex = function () {
	let sum = 0;
	for (let vertex of this.listVertex) {
		sum += vertex.z;
	};
	return sum / this.listVertex.length;
};

/** @type {(Acrion: (v: Vector3D) => Vector3D) => Face} */
Polygon3D.prototype.Map = function (Acrion) {
	return new Polygon3D(
		this.listVertex.map((vertex) => (Acrion(vertex))),
		this.color,
	);
};

/** @type {(vLight: Vector3D, focal: number) => Polygon2D} */
Polygon3D.prototype.Projection = function (vLight, focal) {
	let listVertex = this.listVertex.map((v) => (v.Projection(focal)))
	let vNormal = this.Normal();
	let cos = vLight.Dot(vNormal) / (vLight.Length() * vNormal.Length());
	if (GetArea(listVertex) < 0) {
		cos = -cos;
	};
	let light = (1 + cos) / 2;
	return new Polygon2D(listVertex, new Color(
		this.color.r * light,
		this.color.g * light,
		this.color.b * light,
		this.color.a,
	));
};

// ======================== batch process ========================
