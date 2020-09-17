let Vector = class {
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

/** @type {(v: Vector) => Vector} */
Vector.prototype.Add = function (v) {
	return new Vector(
		this.x + v.x,
		this.y + v.y,
		this.z + v.z,
	);
};

/** @type {(v: Vector) => Vector} */
Vector.prototype.Sub = function (v) {
	return new Vector(
		this.x - v.x,
		this.y - v.y,
		this.z - v.z,
	);
};

/** @type {(k: number) => Vector} */
Vector.prototype.Mul = function (k) {
	return new Vector(
		this.x * k,
		this.y * k,
		this.z * k,
	);
};

/** @type {(k: number) => Vector} */
Vector.prototype.Div = function (k) {
	return new Vector(
		this.x / k,
		this.y / k,
		this.z / k,
	);
};

/** @type {(v: Vector) => Vector} */
Vector.prototype.Cross = function (v) {
	return new Vector(
		this.y * v.z - this.z * v.y,
		this.z * v.x - this.x * v.z,
		this.x * v.y - this.y * v.x,
	);
};

/** @type {(v: Vector) => number} */
Vector.prototype.Dot = function (v) {
	return this.x * v.x + this.y * v.y + this.z * v.z;
};

Vector.prototype.Length = function () {
	return Math.sqrt(this.Dot(this));
};

/** @type {(m: WeakMap) => Vector} */
Vector.prototype.Value = function (m) {
	return this;
};

/** @type {(Acrion: (v: Vector) => Vector) => Vector} */
Vector.prototype.Map = function (Acrion) {
	return Acrion(this);
};

/** @type {(base: any, Acrion: (v: Vector) => Vector) => any} */
let TransformValue = function (base, Acrion) {
	if (Array.isArray(base)) {
		return base.map((value) => (TransformValue(value, Acrion)))
	} else {
		return base.Map(Acrion);
	};
};

let Transform = class {
	base = null;
	/** @type {(v: Vector) => Vector} */
	Action = null;
	constructor(base) {
		this.base = base;
	};
};

/** @type {(m: WeakMap) => any} */
Transform.prototype.Value = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = TransformValue(this.base.Value(m), this.Action);
	m.set(this, value);
	return value;
};

let Group = class {
	/** @type {Transform[]} */
	listData = null;
	/** @type {(listData: Transform[])} */
	constructor(listData) {
		this.listData = listData;
	};
};

/** @type {(m: WeakMap) => any[]} */
Group.prototype.Value = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = this.listData.map((data) => (data.Value(m)));
	m.set(this, value);
	return value;
};

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

/** @type {(light: number) => string} */
Color.prototype.Value = function (light) {
	return 'rgba(' + [
		this.r * light,
		this.g * light,
		this.b * light,
		this.a,
	] + ')';
};

let SolidGraph = class {
	/** @type {Vector[][]} */
	listPolygon = null;
	/** @type {Color} */
	color = null;
	/** @type {(listPolygon: Vector[][], color: Color)} */
	constructor(listPolygon, color) {
		this.listPolygon = listPolygon;
		this.color = color;
	};
};

/** @type {(Acrion: (v: Vector) => Vector) => SolidGraph} */
SolidGraph.prototype.Map = function (Acrion) {
	return new SolidGraph(
		this.listPolygon.map((polygon) => (
			polygon.map((vector) => (Acrion(vector)))
		)),
		this.color,
	);
};

let Solid = class {
	/** @type {Group} */
	group = null;
	/** @type {Color} */
	color = null;
	/** @type {(group: Group, color: Color)} */
	constructor(group, color) {
		this.group = group;
		this.color = color;
	};
};

/** @type {(m: WeakMap) => SolidGraph} */
Solid.prototype.Value = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = new SolidGraph(this.group.Value(m), this.color);
	m.set(this, value);
	return value;
};
