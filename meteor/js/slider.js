let sliderImage = document.querySelectorAll('.slide');
let current = 0;
let timer;

function reset () {
	for (let i =0; i < sliderImage.length; i++) {
		sliderImage[i].style.display = 'none';
	}
};



function startSlide () {	
	reset();
	sliderImage[current].style.display = 'block';
	timer = setTimeout (function () {		
		reset();
		current++;
		
		if (current === sliderImage.length) {
			current = 0;
			clearTimeout(timer)
		}
		//sliderImage[current].style.display = 'block';
		
		
		startSlide()
	}, 5000)
}

	

startSlide();

window.addEventListener('scroll', function(e) {
	let topMenu = document.querySelector('.top-menu');
	let menuLink = document.querySelectorAll('.menu-link')
	let logo = document.querySelector('.logo img')

	if (window.pageYOffset > 100) {
		topMenu.classList.add('scrolled');
		menuLink.forEach(function(item) {
			item.style.color = 'black';
		});
		logo.setAttribute('src','img/black_logo.png')



	} else {
		if (topMenu.classList.contains('scrolled') && window.pageYOffset < 100) {
			topMenu.classList.remove('scrolled');
			menuLink.forEach(function(item) {
			item.style.color = '#fff';
		});
			logo.setAttribute('src','img/white_logo.png')
		}
		

	}
});

let galleryMenu = document.querySelector('.gallery-menu');
let activeItem = document.querySelector('.gallery-menu .active');
let imageContainers = document.querySelectorAll('.img-container');

function highlight (node) {
	if (activeItem) {
		activeItem.classList.remove('active');
	}
	activeItem = node;
	activeItem.classList.add('active');
}

galleryMenu.addEventListener('click', function(e) {
	let target = e.target;
	let activeItem;
	if (target.tagName !=='LI') return;
	let filter = target.getAttribute('data-filter');
	if (filter === 'all') {
		imageContainers.forEach(function(item) {
			item.style.display = 'block';
		})
	} else {
		imageContainers.forEach( function(item) {
		if(item.classList.contains(filter)) {
			item.style.display = 'block';
			item.classList.add('fade');
		} else {
			item.style.display = 'none';
		}
	});
	}
	
	highlight(target);
	

});