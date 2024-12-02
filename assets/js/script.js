'use strict';

// Preloader
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

// Utility function to add events to multiple elements
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

// Navbar toggle functionality
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

if (navbar && navTogglers.length && overlay) {
    const toggleNavbar = function () {
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("nav-active");
    };

    addEventOnElements(navTogglers, "click", toggleNavbar);
}

// Header hide/show on scroll
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

if (header) {
    const hideHeader = function () {
        const isScrollBottom = lastScrollPos < window.scrollY;
        if (isScrollBottom) {
            header.classList.add("hide");
        } else {
            header.classList.remove("hide");
        }

        lastScrollPos = window.scrollY;
    };

    let ticking = false;
    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                if (window.scrollY >= 50) {
                    header.classList.add("active");
                    backTopBtn.classList.add("active");
                    hideHeader();
                } else {
                    header.classList.remove("active");
                    backTopBtn.classList.remove("active");
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Hero Slider
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems.length ? heroSliderItems[0] : null;

if (lastActiveSliderItem) {
    lastActiveSliderItem.classList.add("active");
}

const updateSliderPos = function () {
    if (lastActiveSliderItem) {
        lastActiveSliderItem.classList.remove("active");
    }
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
    currentSlidePos = (currentSlidePos + 1) % heroSliderItems.length;
    updateSliderPos();
};

const slidePrev = function () {
    currentSlidePos =
        (currentSlidePos - 1 + heroSliderItems.length) % heroSliderItems.length;
    updateSliderPos();
};

if (heroSliderNextBtn && heroSliderPrevBtn) {
    heroSliderNextBtn.addEventListener("click", slideNext);
    heroSliderPrevBtn.addEventListener("click", slidePrev);
}

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(slideNext, 7000);
};

if (heroSliderNextBtn && heroSliderPrevBtn) {
    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
        clearInterval(autoSlideInterval);
    });

    addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
}

window.addEventListener("load", autoSlide);


const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;
window.addEventListener("mousemove", function(event){
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++){
      x = x * Number(parallaxItems[i].CDATA_SECTION_NODE.parallaxSpeed);
      y = y * Number(parallaxItems[i].CDATA_SECTION_NODE.parallaxSpeed);
      parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;  
    }
}); 