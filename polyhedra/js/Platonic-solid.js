
let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let size = 480;

!function () {
	let oV06 = new Vector3D(1, 1, 1);
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
	let painter06 = new Painter(document.querySelector('canvas.p04'), vLight, focal, size);
	painter06.Draw(s06);
}();
