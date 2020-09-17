
let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let size = 480;
let color = new Color(0xCC, 0x99, 0xFF, 0.8);

let SinDeg = (deg) => (Math.sin(deg * Math.PI / 180));
let CosDeg = (deg) => (Math.cos(deg * Math.PI / 180));

// 正四面體
!function () {
	let oV04 = new Vector3D(1, 1, 1);
	oV04 = oV04.Div(oV04.Length());
	let oF04 = new Group([
		new Transform(oV04, (v) => (new Vector3D(-v.x, +v.y, +v.z))),
		new Transform(oV04, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transform(oV04, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
	]);
	let oS04 = new Group([
		new Transform(oF04, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF04, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oF04, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transform(oF04, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
	]);
	let s04 = new Solid(oS04, color);
	let painter04 = new Painter(document.querySelector('canvas.p04'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter04.Draw(new Transform(s04, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(10) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(10),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(10) + v.y * SinDeg(10),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正六面體
!function () {
	let oV06 = new Vector3D(1, 1, 1);
	oV06 = oV06.Div(oV06.Length());
	let oF06 = new Group([
		new Transform(oV06, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV06, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transform(oV06, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oV06, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
	]);
	let oS06 = new Group([
		new Transform(oF06, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF06, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oF06, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transform(oF06, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
		new Transform(oF06, (v) => (new Vector3D(-v.y, -v.z, -v.x))),
		new Transform(oF06, (v) => (new Vector3D(-v.z, -v.x, -v.y))),
	]);
	let s06 = new Solid(oS06, color);
	let painter06 = new Painter(document.querySelector('canvas.p06'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter06.Draw(new Transform(s06, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(10) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(10),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(10) + v.y * SinDeg(10),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正八面體
!function () {
	let oV08 = new Vector3D(1, 0, 0);
	oV08 = oV08.Div(oV08.Length());
	let oF08 = new Group([
		new Transform(oV08, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV08, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oV08, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
	]);
	let oS08 = new Group([
		new Transform(oF08, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF08, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
		new Transform(oF08, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transform(oF08, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oF08, (v) => (new Vector3D(-v.x, +v.y, +v.z))),
		new Transform(oF08, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transform(oF08, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transform(oF08, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
	]);
	let s08 = new Solid(oS08, color);
	let painter08 = new Painter(document.querySelector('canvas.p08'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter08.Draw(new Transform(s08, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(10) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(10),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(10) + v.y * SinDeg(10),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正十二面體
!function () {
	let oV12A = new Vector3D(2 / (Math.sqrt(5) + 3), 1, 0);
	let oV12B = new Vector3D(1, 1, 1);
	oV12A = oV12A.Div(oV12A.Length());
	oV12B = oV12B.Div(oV12B.Length());
	let oF12 = new Group([
		new Transform(oV12A, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV12B, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV12A, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oV12A, (v) => (new Vector3D(+v.y, +v.z, -v.x))),
		new Transform(oV12B, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
	]);
	let oS12 = new Group([
		new Transform(oF12, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF12, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oF12, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transform(oF12, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transform(oF12, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oF12, (v) => (new Vector3D(+v.y, -v.z, -v.x))),
		new Transform(oF12, (v) => (new Vector3D(-v.y, +v.z, -v.x))),
		new Transform(oF12, (v) => (new Vector3D(-v.y, -v.z, +v.x))),
		new Transform(oF12, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transform(oF12, (v) => (new Vector3D(+v.z, -v.x, -v.y))),
		new Transform(oF12, (v) => (new Vector3D(-v.z, +v.x, -v.y))),
		new Transform(oF12, (v) => (new Vector3D(-v.z, -v.x, +v.y))),
	]);
	let s12 = new Solid(oS12, color);
	let painter12 = new Painter(document.querySelector('canvas.p12'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter12.Draw(new Transform(s12, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(10) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(10),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(10) + v.y * SinDeg(10),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();

// 正二十面體
!function () {
	let oV20 = new Vector3D(2 / (Math.sqrt(5) + 1), 0, 1);
	oV20 = oV20.Div(oV20.Length());
	let oF20A = new Group([
		new Transform(oV20, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV20, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oV20, (v) => (new Vector3D(+v.y, -v.z, +v.x))),
	]);
	let oF20B = new Group([
		new Transform(oV20, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oV20, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oV20, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
	]);
	let oS20 = new Group([
		new Transform(oF20A, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF20A, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oF20A, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transform(oF20A, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transform(oF20A, (v) => (new Vector3D(+v.y, +v.z, +v.x))),
		new Transform(oF20A, (v) => (new Vector3D(+v.y, -v.z, -v.x))),
		new Transform(oF20A, (v) => (new Vector3D(-v.y, +v.z, -v.x))),
		new Transform(oF20A, (v) => (new Vector3D(-v.y, -v.z, +v.x))),
		new Transform(oF20A, (v) => (new Vector3D(+v.z, +v.x, +v.y))),
		new Transform(oF20A, (v) => (new Vector3D(+v.z, -v.x, -v.y))),
		new Transform(oF20A, (v) => (new Vector3D(-v.z, +v.x, -v.y))),
		new Transform(oF20A, (v) => (new Vector3D(-v.z, -v.x, +v.y))),
		new Transform(oF20B, (v) => (new Vector3D(+v.x, +v.y, +v.z))),
		new Transform(oF20B, (v) => (new Vector3D(+v.x, +v.y, -v.z))),
		new Transform(oF20B, (v) => (new Vector3D(+v.x, -v.y, +v.z))),
		new Transform(oF20B, (v) => (new Vector3D(+v.x, -v.y, -v.z))),
		new Transform(oF20B, (v) => (new Vector3D(-v.x, +v.y, +v.z))),
		new Transform(oF20B, (v) => (new Vector3D(-v.x, +v.y, -v.z))),
		new Transform(oF20B, (v) => (new Vector3D(-v.x, -v.y, +v.z))),
		new Transform(oF20B, (v) => (new Vector3D(-v.x, -v.y, -v.z))),
	]);
	let s20 = new Solid(oS20, color);
	let painter20 = new Painter(document.querySelector('canvas.p20'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter20.Draw(new Transform(s20, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(10) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(10),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(10) + v.y * SinDeg(10),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();
