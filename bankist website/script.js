'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');
const section = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// code fror smoooth navigation from navbar to the sections
navLinks.addEventListener('click', e => {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    console.log(e.target);
  }
});

// creating tabbed component

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked.dataset.index);
  if (!clicked) return;

  //deactivate the inactive element
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));

  //activate tabs
  clicked.classList.add('operations__tab--active');

  //activate tabcontent
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// event handeler for creating opacity for the nav bar

const nav = document.querySelector('.nav');

const changeOpacity = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    //to get the main target
    const link = e.target;
    //to get others for the opacity
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //to get the image
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
  console.log('enter');
};

nav.addEventListener('mouseover', changeOpacity.bind(0.5));
nav.addEventListener('mouseout', changeOpacity.bind(1));

// using the intersection observe api to to create out sticky note
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyOPs = function (entreies) {
  const [entry] = entreies;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const stickyObs = new IntersectionObserver(stickyOPs, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});
stickyObs.observe(header);

// using the observer api to create a smooth fade in of sectons and elements
const sectioinFunction = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};
const sectionsObesever = new IntersectionObserver(sectioinFunction, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionsObesever.observe(section);
  section.classList.add('section--hidden');
});

// for implementing lazy loading  images
const ogImg = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  // since we have just one threshold we dont need to loop over it
  // we destructure it
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // to remove the blurry effect
  entry.target.addEventListener('load', e =>
    e.target.classList.remove('lazy-img')
  );

  observer.unobserve(entry.target);
};

const obsLazingloading = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

ogImg.forEach(img => {
  obsLazingloading.observe(img);
});




const sliders = function(){
// create slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
let sliderMemory = 0;
let slideLength = slides.length;
const dotContainer = document.querySelector('.dots');
// slider.style.transform ='scale(0.4) translateX(1200px)'
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide=${i}></button>`
    );
  });
};


const activateSLide = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dots => dots.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};


dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    moveSlide(slide);
    activateSLide(slide);
  }
});

// certaing the dots logic

// the transiton logic
// slider.style.overflow = 'visible'

const moveSlide = function (slide) {
  slides.forEach((s, i) => {
    // console.log(s)
    s.style.transform = `translateX(${100 * (slide - i)}%)`;
  });
  console.log('enter');
};


const nextSlide = function () {
  if (sliderMemory === slideLength - 1) {
    sliderMemory = 0;
  } else {
    sliderMemory++;
  }
  // dotMovingSlides()

  moveSlide(sliderMemory);
  activateSLide(sliderMemory);
};

const prevslide = function () {
  if (sliderMemory === 0) {
    sliderMemory = slideLength - 1;
  } else {
    sliderMemory--;
  }

  moveSlide(sliderMemory);
  activateSLide(sliderMemory);
};
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevslide);

//creating an init function to initialize the functions 
const init = function(){
  moveSlide(0);
  createDots();
activateSLide(0);

}
init()

// for right and left arrow key

window.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevslide();
  e.key === 'ArrowRight' && nextSlide();
});
}

sliders()

window.addEventListener('beforeunload', function(e){
 e.preventDefault()
  e.returnValue = ''
})
// using intersection observer API
// we create the observer option and call back funtion that will be inputted into the oberver as arguments
//creating thw callback function containing entries and the observer as parameter
// const obsCallBack = function (entries, obersver) {
// entries.forEach(i => console.log(i));
// };
// the threshold determines percentage of viewport tthat has to seen on the browser before intersecctioin is true i.e before the root element target intercept the element
// const obsOpotions = {
// root: null,
// threshold: [0,0.2]
// };
//creating tthe obersver
// const observer = new IntersectionObserver(obsCallBack, obsOpotions);
// observer.observe(section);

// for dom tranversing
//for parent elements  going upwarsds
// const h1 = document.querySelector('h1')
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// console.log(h1.firstElementChild)
// console.log(h1.lastElementChild)

//going upwards the parent nodes
// console.log(h1.parentNode)
// h1.closest('.header').style.background ='var( --gradient-secondary)'

//going sideways siblings elements
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// const all =[...h1.parentNode.children]
// all.forEach(el=> {
// if(el !== 'h1'){
// el.style.transform = 'scale(0.5)'
// }
// })
//

// some dom maniipulation method
// console.log(document.documentElement)

// console.log(document.body)
// console.log(document.head)
// const section = document.querySelector('.header')

// const btn = document.getElementsByTagName('button')
// console.log(btn)

// const createDiv = document.createElement('div')

// createDiv.innerHTML= `get started by signing in <button class="btn  btn--close-cookie "> signin  </button>`

// createDiv.classList.add("cookie-message")

// section.prepend(createDiv)
// section.append(createDiv)

// section.before(createDiv)
// section.after(createDiv.cloneNode(true))
//
// document.querySelector('.btn--scroll-to').addEventListener('click', ()=>{
// createDiv.remove()
// })

// console.log(createDiv)

// const imgs = document.querySelector('img')

// console.log(imgs.getAttribute('class'))
// document.documentElement.style.setProperty('--color-primary', "orange")

// for smooth scroll
// const btnScroll = document.querySelector('.btn--scroll-to')
// const section2 = document.querySelector('#section--1')
// const h1= document.querySelector('h1')
//
// const  Alert = ()=>{ alert('you are mad ')
//
// h1.removeEventListener('mouseenter', Alert)
// }
// btnScroll.addEventListener('click', ()=>{
// section2.scrollIntoView({behavior:"smooth"})
// })
//
// h1.addEventListener('mouseenter', Alert)

// you can also use settimeout

// exercise for add event listener
//create an add event listener that chsnge colors at random

//  const randomInt  = (max ,min)=>
// Math.floor(Math.random()* (max - min +1) + min)

// const randomColor = ()=>
// `rgb(${randomInt(0,225)}, ${randomInt(0,225)}, ${randomInt(0,225)})`

// console.log(randomColor())

// const nav  = document.querySelector('.nav')
// const links = document.querySelector('.nav__links')
// const link = document.querySelector('.nav__link')

// link.addEventListener('click', (e)=>{
// link.style.backgroundColor = randomColor()

// console.log(e.target)
// })

// links.addEventListener('click', (e)=>{
// links.style.backgroundColor = randomColor()
//  console.log(e.target)
// })
