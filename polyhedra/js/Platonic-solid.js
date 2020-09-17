
let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let size = 480;

let SinDeg = (deg) => (Math.sin(deg * Math.PI / 180));
let CosDeg = (deg) => (Math.cos(deg * Math.PI / 180));

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
	let s06 = new Solid(oS06, new Color(0xCC, 0x99, 0xFF, 0.8));
	let painter06 = new Painter(document.querySelector('canvas.p06'), vLight, focal, size);
	let startTime = Date.now();
	let DrawFrame = function () {
		let deg = (Date.now() - startTime) * 45 / 1000;
		painter06.Draw(new Transform(s06, (v) => (new Vector3D(
			v.x * CosDeg(deg) + v.z * SinDeg(deg),
			v.y * CosDeg(15) - (v.z * CosDeg(deg) - v.x * SinDeg(deg)) * SinDeg(15),
			(v.z * CosDeg(deg) - v.x * SinDeg(deg)) * CosDeg(15) + v.y * SinDeg(15),
		))));
		requestAnimationFrame(DrawFrame);
	};
	requestAnimationFrame(DrawFrame);
}();
