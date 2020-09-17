
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

/** @type {(listPoint: Vector2D[]) => number} */
let GetArea = function (listPoint) {
	let area = 0;
	let v0 = listPoint[0];
	let vA = listPoint[1].Sub(v0);
	let n = listPoint.length;
	for (let i = 2; i < n; ++i) {
		let vB = listPoint[2].Sub(v0);
		area += vA.Cross(vB);
		vA = vB;
	};
	return area;
};

let Polygon = class {
	/** @type {Vector2D[]} */
	listPoint = null;
	color = '';
	/** @type {(listPoint: Vector2D[], color: string)} */
	constructor(listPoint, color) {
		this.listPoint = listPoint;
		this.color = color;
	};
};

Polygon.prototype.Area = function () {
	return GetArea(this.listPoint);
};

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

/** @type {(m: WeakMap) => Vector3D} */
Vector3D.prototype.Value = function (m) {
	return this;
};

/** @type {(Acrion: (v: Vector3D) => Vector3D) => Vector3D} */
Vector3D.prototype.Map = function (Acrion) {
	return Acrion(this);
};

/** @type {(focal: number) => Vector2D} */
Vector3D.prototype.Projection = function (focal) {
	let r = focal / (focal = this.z);
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

/** @type {(base: any, Acrion: (v: Vector3D) => Vector3D) => any} */
let TransformValue = function (base, Acrion) {
	if (Array.isArray(base)) {
		return base.map((value) => (TransformValue(value, Acrion)))
	} else {
		return base.Map(Acrion);
	};
};

let Transform = class {
	base = null;
	/** @type {(v: Vector3D) => Vector3D} */
	Action = null;
	/** @type {(base: any, Action: (v: Vector3D) => Vector3)} */
	constructor(base, Action) {
		this.base = base;
		this.Action = Action;
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

let Face = class {
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

/** @type {(Acrion: (v: Vector3D) => Vector3D) => Face} */
Face.prototype.Map = function (Acrion) {
	return new Face(
		this.listVertex.map((vertex) => (Acrion(vertex))),
		this.color,
	);
};

Face.prototype.ZIndex = function () {
	let zIndex = - Infinity;
	for (let vertex of this.listVertex) {
		if (vertex.z > zIndex) {
			zIndex = vertex.z;
		};
	};
	return zIndex;
};

Face.prototype.Normal = function () {
	return GetNormal(this.listVertex);
};

/** @type {(vLight: Vector3D, focal: number) => Polygon} */
Face.prototype.Projection = function (vLight, focal) {
	let listPoint = this.listVertex.map((v) => (v.Projection(focal)))
	let vNormal = this.Normal();
	let cos = vLight.Dot(vNormal) / (vLight.Length() * vNormal.Length());
	if (GetArea(listPoint) < 0) {
		cos = -cos;
	};
	return new Polygon(listPoint, this.color.Value((1 + cos) / 2));
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

/** @type {(m: WeakMap) => Face[]} */
Solid.prototype.Value = function (m) {
	if (m.has(this)) {
		return m.get(this);
	};
	let value = this.group.Value(m).map((listVertex) => (new Face(listVertex, this.color)));
	m.set(this, value);
	return value;
};

/** @type {(data: any, result: any[]) => void} */
let GetFlatArray = function (data, result) {
	if (Array.isArray(data)) {
		for (let value of data) {
			GetFlatArray(value, result);
		};
	} else {
		result.push(data);
	};
};

/** @type {(data: any) => Face[]} */
let GetListFace = function (data) {
	/** @type {Face[]} */
	let listFace = [];
	GetFlatArray(data.Value(new WeakMap()), listFace);
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
	return listFace;
};

let Painter = class {
	/** @type {HTMLCanvasElement} */
	cvs = null;
	/** @type {Vector3D} */
	vLight = null;
	focal = 0;
	size = 0;
	ox = 0;
	oy = 0;
	/** @type {(cvs: HTMLCanvasElement, vLight: Vector3D, focal: number, size: number)} */
	constructor(cvs, vLight, focal, size) {
		this.cvs = cvs;
		this.vLight = vLight;
		this.focal = focal;
		this.size = size;
		this.ox = cvs.width / 2;
		this.oy = cvs.height / 2;
	};
};

Painter.prototype.Draw = function (data) {
	let ctx = this.cvs.getContext('2d');
	ctx.clearRect(0, 0, +this.cvs.width, +this.cvs.height);
	ctx.lineWidth = 3;
	ctx.lineJoin = 'round';
	let listPolygon = GetListFace(data).map((face) => (face.Projection(vLight, focal)));
	for (let polygon of listPolygon) {
		ctx.beginPath();
		for (let point of polygon.listPoint) {
			ctx.lineTo(this.ox + point.x * this.size, this.oy - point.y * this.size);
		};
		ctx.closePath();
		ctx.fillStyle = polygon.color;
		ctx.fill();
		ctx.stroke();
	};
};
