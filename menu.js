
/** @type {(string) => void} */
let changeContent = function () {
	/** @type {HTMLIFrameElement} */
	let content = document.querySelector('[name="content"]');
	content.src = './' + (location.hash.slice(1) || 'home') + '.html';
};

/** @type {(this: Window, ev: PopStateEvent) => boolean} */
window.onpopstate = function (ev) {
	changeContent();
	return true;
};

/** @type {(this: HTMLAnchorElement, ev: MouseEvent) => boolean} */
let onMenuAnchorClick = function (ev) {
	location.hash = '#' + this.href.slice((location.origin + location.pathname).length, -5);
	return true;
};

document.querySelectorAll('.menu a').forEach(function (anchor) {
	anchor.onclick = onMenuAnchorClick;
});

changeContent();
