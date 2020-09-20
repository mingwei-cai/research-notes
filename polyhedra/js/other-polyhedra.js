
// 請搭配 polyhedron-painter.js 使用

// ======================== 共用設定 ========================

let vLight = new Vector3D(0, 3, 4);
let focal = 12;
let lineWidth = 3;
let colorA = new Color(0xCC, 0x99, 0xFF, 0.8);

/** @type {((timeSec: number) => void)[]} */
let listAnimationFrame = [];

!function () {
	let Animation = function () {
		let timeSec = performance.now() / 1000;
		for (let DrawFrame of listAnimationFrame) {
			DrawFrame(timeSec);
		};
		requestAnimationFrame(Animation);
	};
	requestAnimationFrame(Animation);
}();

// ======================== 稜柱 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.prism'), vLight, focal);
	let vertexA = (new Vector3D(2, 1, 0)).Uint();
	let vertexB = (new Vector3D(1, 1, Math.sqrt(3))).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
	], colorA);
	let faceC = new Polygon3D([
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, -v.y, +v.z))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceC.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceC.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 反稜柱 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.antiprism'), vLight, focal);
	let vertexA = (new Vector3D(2, Math.sqrt(2 / (Math.sqrt(3) + 1)), 0)).Uint();
	let vertexB = (new Vector3D(1, Math.sqrt(2 / (Math.sqrt(3) + 1)), Math.sqrt(3))).Uint();
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, -v.z))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.z, -v.y, +v.x))),
	], colorA);
	let faceC = new Polygon3D([
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		vertexA.Create((v) => (new Vector3D(+v.z, -v.y, +v.x))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		faceB.Map((v) => (new Vector3D(-v.z, -v.y, +v.x))),
		faceB.Map((v) => (new Vector3D(+v.z, -v.y, -v.x))),
		faceB.Map((v) => (new Vector3D(-v.z, -v.y, -v.x))),
		faceC.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceC.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceC.Map((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		faceC.Map((v) => (new Vector3D(-v.z, -v.y, +v.x))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 雙角錐 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.bipyramid'), vLight, focal);
	let vertexA = (new Vector3D(0, 1, 0)).Uint();
	let vertexB = (new Vector3D(2, 0, 0)).Uint().Div(Math.sqrt(3));
	let vertexC = (new Vector3D(1, 0, Math.sqrt(3))).Uint().Div(Math.sqrt(3));
	let faceA = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexB.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexC.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
	], colorA);
	let faceB = new Polygon3D([
		vertexA.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexC.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexC.Create((v) => (new Vector3D(-v.x, +v.y, +v.z))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, -v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, -v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, -v.y, -v.z))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();

// ======================== 反雙角錐 ========================

!function () {
	let painter = new Painter(document.querySelector('canvas.antibipyramid'), vLight, focal);
	let vertexA = (new Vector3D(Math.sqrt(3), Math.sqrt(2 / (Math.sqrt(3) + 1)), -1));
	let vertexB = (new Vector3D(2, -Math.sqrt(2 / (Math.sqrt(3) + 1)), 0));
	let vertexC = (new Vector3D(Math.sqrt(3), Math.sqrt(2 / (Math.sqrt(3) + 1)), +1));
	let vertexD = (new Vector3D(1, -Math.sqrt(2 / (Math.sqrt(3) + 1)), Math.sqrt(3)));
	let vertexE = (new Vector3D(0, Math.sqrt(2 / (Math.sqrt(3) + 1)), 0));
	let vertexF = vertexA.Add(vertexB).Add(vertexC).Div(3);
	let vertexG = vertexD.Add(vertexB).Add(vertexC).Div(3);
	let vertexH = vertexE.Uint();
	let vertexI = vertexF.Div(vertexF.Dot(vertexF) / vertexE.Length());
	let vertexJ = vertexG.Div(vertexG.Dot(vertexG) / vertexE.Length());
	let faceA = new Polygon3D([
		vertexH.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexI.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexJ.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexJ.Create((v) => (new Vector3D(+v.z, -v.y, +v.x))),
	], colorA);
	let faceB = new Polygon3D([
		vertexH.Create((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		vertexJ.Create((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		vertexI.Create((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		vertexJ.Create((v) => (new Vector3D(-v.z, -v.y, +v.x))),
	], colorA);
	let solid = new Batch([
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, +v.z))),
		faceA.Map((v) => (new Vector3D(-v.x, +v.y, -v.z))),
		faceA.Map((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		faceA.Map((v) => (new Vector3D(-v.z, -v.y, +v.x))),
		faceA.Map((v) => (new Vector3D(+v.z, -v.y, -v.x))),
		faceA.Map((v) => (new Vector3D(-v.z, -v.y, -v.x))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, +v.z))),
		faceB.Map((v) => (new Vector3D(+v.x, +v.y, -v.z))),
		faceB.Map((v) => (new Vector3D(+v.z, -v.y, +v.x))),
		faceB.Map((v) => (new Vector3D(-v.z, -v.y, +v.x))),
	]);
	/** @type {(timeSec: number) => void} */
	let DrawFrame = function (timeSec) {
		let arcX = timeSec * (Math.PI / 4);
		let arcY = Math.PI / 16;
		let sinX = Math.sin(arcX);
		let sinY = Math.sin(arcY);
		let cosX = Math.cos(arcX);
		let cosY = Math.cos(arcY);
		painter.Draw(solid.Map((v) => (new Vector3D(
			v.x * cosX + v.z * sinX,
			v.y * cosY - (v.z * cosX - v.x * sinX) * sinY,
			(v.z * cosX - v.x * sinX) * cosY + v.y * sinY,
		))), lineWidth);
	};
	listAnimationFrame.push(DrawFrame);
}();
