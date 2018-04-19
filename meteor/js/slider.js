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

let humburger = document.getElementById('humburger');
humburger.addEventListener('click', menuToggle);



function menuToggle() {
	let menuList = document.querySelector('.menu ul')

	menuList.classList.toggle('open');
	menuList.classList.toggle('grow');

};

window.addEventListener('click', function(e) {
	let menuList = document.querySelector('.menu ul');
	if (menuList.classList.contains('open') && e.target.closest('span') !== humburger) {
		menuList.classList.remove('open');
		menuList.classList.remove('grow')
	}
})
	

startSlide();

window.addEventListener('scroll', function(e) {
	let topMenu = document.querySelector('.top-menu');
	let menuLinks = document.querySelectorAll('.menu-link')
	let logo = document.querySelector('.logo img')

	if (window.pageYOffset > 80) {
		topMenu.classList.add('scrolled');
		menuLinks.forEach(function(item) {
			item.style.color = 'black';
		});
		logo.setAttribute('src','img/black_logo.png')



	} else {
		if (topMenu.classList.contains('scrolled') && window.pageYOffset < 100) {
			topMenu.classList.remove('scrolled');
			menuLinks.forEach(function(item) {
			item.style.color = '';
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

let currentModalImg;
let galleryModal = document.querySelector('.gallery-modal');
let imgs = Array.from(document.querySelectorAll('.img-container img'));
let galleryContainer = document.querySelector('.gallery-container');
let modalImg = document.querySelector('.gallery-modal img');
let closeBtn = document.querySelector('.close.btn');
let nextBtn = document.querySelector('.next.btn');
let prevBtn = document.querySelector('.prev.btn');


closeBtn.addEventListener('click', function () {
	galleryModal.style.display = 'none';
})

function showModalGallery (current) {
	galleryModal.style.display = 'block';
	modalImg.setAttribute('src', imgs[current].getAttribute('src'));
	modalImg.classList.add('grow');
	setTimeout(function () {
		modalImg.classList.remove('grow')
	}, 1000)
}

function showNext () {
	currentModalImgIndex++;
	if (currentModalImgIndex === imgs.length) {
		currentModalImgIndex=0;
	}
	showModalGallery(currentModalImgIndex);

}

nextBtn.addEventListener('click', showNext)

function showPrev () {
	currentModalImgIndex--;
	if (currentModalImgIndex < 0) {
		currentModalImgIndex=imgs.length-1;
	}
	showModalGallery(currentModalImgIndex);
}

prevBtn.addEventListener('click', showPrev)

galleryContainer.addEventListener('click', function (e) {
	let target = e.target;
	if (target.classList.contains('icon')) {
			currentModalImgIndex = imgs.indexOf(target.nextElementSibling);
			showModalGallery(currentModalImgIndex)
		}

})

