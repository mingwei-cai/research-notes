
let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let color = new Color(0xCC, 0x99, 0xFF, 0.8);

let painter04 = new Painter(document.querySelector('canvas.p04'), vLight, focal);
let painter06 = new Painter(document.querySelector('canvas.p06'), vLight, focal);
let painter08 = new Painter(document.querySelector('canvas.p08'), vLight, focal);
let painter12 = new Painter(document.querySelector('canvas.p12'), vLight, focal);
let painter20 = new Painter(document.querySelector('canvas.p20'), vLight, focal);
let startTime = Date.now();

// 正四面體
!function () {
	let vertex04 = (new Vector3D(1, 1, 1)).Uint();
	let face04 = new Polygon3D([
		vertex04.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertex04.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertex04.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], color);
	let solid04 = new Batch([
		new Transformation(face04, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face04, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transformation(face04, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transformation(face04, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
	]);
	let DrawFrame = function () {
		let arcX = ((Date.now() - startTime) / 1000) * (Math.PI / 4);
		let arcY = Math.PI / 8;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter04.Draw(new Transformation(solid04, (v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正六面體
!function () {
	let vertex06 = (new Vector3D(1, 1, 1)).Uint();
	let face06 = new Polygon3D([
		vertex06.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex06.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertex06.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		vertex06.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], color);
	let solid06 = new Batch([
		new Transformation(face06, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face06, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transformation(face06, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transformation(face06, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
		new Transformation(face06, (v) => (new Vector3D(-v.y, -v.z, -v.x))),
		new Transformation(face06, (v) => (new Vector3D(-v.z, -v.x, -v.y))),
	]);
	let DrawFrame = function () {
		let arcX = ((Date.now() - startTime) / 1000) * (Math.PI / 4);
		let arcY = Math.PI / 8;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter06.Draw(new Transformation(solid06, (v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正八面體
!function () {
	let vertex08 = (new Vector3D(1, 0, 0)).Uint();
	let face08 = new Polygon3D([
		vertex08.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex08.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertex08.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
	], color);
	let solid08 = new Batch([
		new Transformation(face08, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face08, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
		new Transformation(face08, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transformation(face08, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transformation(face08, (v) => (new Vector3D(-v.x, +v.y, +v.z))),
		new Transformation(face08, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transformation(face08, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transformation(face08, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
	]);
	let DrawFrame = function () {
		let arcX = ((Date.now() - startTime) / 1000) * (Math.PI / 4);
		let arcY = Math.PI / 8;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter08.Draw(new Transformation(solid08, (v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正十二面體
!function () {
	let vertex12A = (new Vector3D(2 / (Math.sqrt(5) + 3), 1, 0)).Uint();
	let vertex12B = (new Vector3D(1, 1, 1)).Uint();
	let face12 = new Polygon3D([
		vertex12A.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex12B.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex12A.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertex12A.Map((v) => (new Vector3D(+v.y, +v.z, -v.x))),
		vertex12B.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], color);
	let solid12 = new Batch([
		new Transformation(face12, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face12, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transformation(face12, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transformation(face12, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transformation(face12, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transformation(face12, (v) => (new Vector3D(+v.y, -v.z, -v.x))),
		new Transformation(face12, (v) => (new Vector3D(-v.y, +v.z, -v.x))),
		new Transformation(face12, (v) => (new Vector3D(-v.y, -v.z, +v.x))),
		new Transformation(face12, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transformation(face12, (v) => (new Vector3D(+v.z, -v.x, -v.y))),
		new Transformation(face12, (v) => (new Vector3D(-v.z, +v.x, -v.y))),
		new Transformation(face12, (v) => (new Vector3D(-v.z, -v.x, +v.y))),
	]);
	let DrawFrame = function () {
		let arcX = ((Date.now() - startTime) / 1000) * (Math.PI / 4);
		let arcY = Math.PI / 8;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter12.Draw(new Transformation(solid12, (v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正二十面體
!function () {
	let vertex20 = (new Vector3D(2 / (Math.sqrt(5) + 1), 0, 1)).Uint();
	let face20A = new Polygon3D([
		vertex20.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex20.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
		vertex20.Map((v) => (new Vector3D(+v.z, -v.x, +v.y))),
	], color);
	let face20B = new Polygon3D([
		vertex20.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertex20.Map((v) => (new Vector3D(+v.y, +v.z, +v.x))),
		vertex20.Map((v) => (new Vector3D(+v.z, +v.x, +v.y))),
	], color);
	let solid20 = new Batch([
		new Transformation(face20A, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face20A, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transformation(face20A, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transformation(face20A, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transformation(face20A, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transformation(face20A, (v) => (new Vector3D(+v.y, -v.z, -v.x))),
		new Transformation(face20A, (v) => (new Vector3D(-v.y, +v.z, -v.x))),
		new Transformation(face20A, (v) => (new Vector3D(-v.y, -v.z, +v.x))),
		new Transformation(face20A, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transformation(face20A, (v) => (new Vector3D(+v.z, -v.x, -v.y))),
		new Transformation(face20A, (v) => (new Vector3D(-v.z, +v.x, -v.y))),
		new Transformation(face20A, (v) => (new Vector3D(-v.z, -v.x, +v.y))),
		new Transformation(face20B, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transformation(face20B, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
		new Transformation(face20B, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transformation(face20B, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transformation(face20B, (v) => (new Vector3D(-v.x, +v.y, +v.z))),
		new Transformation(face20B, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transformation(face20B, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transformation(face20B, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
	]);
	let DrawFrame = function () {
		let arcX = ((Date.now() - startTime) / 1000) * (Math.PI / 4);
		let arcY = Math.PI / 8;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter20.Draw(new Transformation(solid20, (v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();
