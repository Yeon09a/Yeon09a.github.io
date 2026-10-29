let tocObserver = null;

function setActive(id) {
	document.querySelectorAll('.sideBar nav a').forEach(function (l) {
		l.classList.toggle('active', l.getAttribute('href') === '#' + id);
	});
}

function watchSections() {
	if (tocObserver) {
		tocObserver.disconnect();
	}

	tocObserver = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				setActive(entry.target.id);
			}
		});
	}, { rootMargin: '-15% 0px -80% 0px' });

	sectionsBox.querySelectorAll('section').forEach(function (s) {
		tocObserver.observe(s);
	});
}

window.addEventListener('scroll', function () {
	const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
	if (!atBottom) {
		return;
	}

	const sections = sectionsBox.querySelectorAll('section');
	if (sections.length) {
		setActive(sections[sections.length - 1].id);
	}
});