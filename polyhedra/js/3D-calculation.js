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

/** @type {(vector: Vector3D) => Vector3D} */
Vector3D.prototype.Add = function (vector) {
	return new Vector3D(
		this.x + vector.x,
		this.y + vector.y,
		this.z + vector.z,
	);
};

/** @type {(vector: Vector3D) => Vector3D} */
Vector3D.prototype.Sub = function (vector) {
	return new Vector3D(
		this.x - vector.x,
		this.y - vector.y,
		this.z - vector.z,
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

/** @type {(vector: Vector3D) => Vector3D} */
Vector3D.prototype.Cross = function (vector) {
	return new Vector3D(
		this.y * vector.z - this.z * vector.y,
		this.z * vector.x - this.x * vector.z,
		this.x * vector.y - this.y * vector.x,
	);
};

/** @type {(vector: Vector3D) => number} */
Vector3D.prototype.Dot = function (vector) {
	return this.x * vector.x + this.y * vector.y + this.z * vector.z;
};

Vector3D.prototype.Length = function () {
	return Math.sqrt(this.Dot(this));
};

let Vertex = class {
	/** @type {Vector3D} */
	vector = null;
	/** @type {(vector: Vector3D) => Vector3D} */
	Trans = null;
	/** @type {(vector: Vector3D, Trans: (vector: Vector3D) => Vector3D)} */
	constructor(vector, Trans) {
		this.vector = vector;
		this.Trans = Trans;
	};
};

Vertex.prototype.AsVector = function () {
	return this.Trans(this.vector);
};

let Polygon3D = class {
	/** @type {Vertex[]} */
	listVertex = null;
	/** @type {(listVertex: Vertex[], color: Color)} */
	constructor(listVertex, color = null) {
		this.listVertex = listVertex;
		this.color = color;
	};
};

/** @type {() => Vector3D} */
Polygon3D.prototype.NormalVector = function () {
	let vector0 = this.listVertex[0].AsVector();
	let vector1 = this.listVertex[0].AsVector();
	let vector2 = this.listVertex[0].AsVector();
	return vector1.Sub(vector0).Cross(vector2.Sub(vector0));
};

let Face = class {
	/** @type {Polygon3D} */
	polygon = null;
	/** @type {(vector: Vector3D) => Vector3D} */
	Trans = null;
	/** @type {(polygon: Polygon3D, Trans: (vector: Vector3D) => Vector3D)} */
	constructor(polygon, Trans) {
		this.polygon = polygon;
		this.Trans = Trans;
	};
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

let FaceSet = class {
	/** @type {Face[]} */
	listFace = null;
	/** @type {FaceSet[]} */
	listSubset = null;
	/** @type {(vector: Vector3D) => Vector3D} */
	Trans = null;
	/** @type {Color} */
	color = null;
	/** @type {(listFace: Face[], listSubset: FaceSet[], Trans: (vector: Vector3D) => Vector3D, color: Color)} */
	constructor(listFace, listSubset, Trans, color = null) {
		this.listFace = listFace;
		this.listSubset = listSubset;
		this.Trans = Trans;
		this.color = color;
	};
};
