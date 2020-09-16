
/** @type {(string) => void} */
let changeContent = function (state) {
	/** @type {HTMLIFrameElement} */
	let content = document.querySelector('[name="content"]');
	content.src = './' + (state || location.hash.slice(1) || 'home/home') + '.html';
};

/** @type {(this: Window, ev: PopStateEvent) => boolean} */
window.onpopstate = function (ev) {
	changeContent(ev.state);
	return true;
};

/** @type {(this: HTMLAnchorElement, ev: MouseEvent) => boolean} */
let onMenuAnchorClick = function (ev) {
	let state = this.href.slice(2, -5);
	history.pushState(state, '', '#' + state);
	return true;
};

document.querySelectorAll('.menu a').forEach(function (anchor) {
	anchor.onclick = onMenuAnchorClick;
});

changeContent(history.state);
