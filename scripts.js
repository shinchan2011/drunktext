// gsap.from('.page', {duration:1, x:'-200%', stagger:0.5});
// gsap.from('.page', {duration:1, height:'0', delay:2.5});

// gsap.from('.para', {duration: 2.5, opacity:'0', delay:3.5});



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const pages = gsap.utils.toArray('.page');
const dateList = document.getElementById('dateList');

pages.forEach((page, index) => {
  if (index === 0) return; 

  const dateText = page.querySelector('p').innerText.split('\n')[0];
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${page.id}`;
  a.innerText = dateText;
  li.appendChild(a);
  dateList.appendChild(li);
});

function smoothScroll(target) {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: 20
    },
    ease: "power2.inOut"
  });
}

document.querySelectorAll('#dateList a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      smoothScroll(targetElement);
    }
  });
});

pages.forEach((page, index) => {
  if (index === 0) return;

  gsap.from(page, {
    x: '-200%',
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: page,
      start: 'top bottom',
      end: 'top center',
      scrub: 1,
    }
  });

  gsap.to(page, {
    boxShadow: '0 0 15px rgba(187, 134, 252, 0.3)',
    duration: 1,
    scrollTrigger: {
      trigger: page,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
    }
  });
});

gsap.from(pages[0], {
  opacity: 0,
  duration: 1,
  ease: 'power2.out'
});

gsap.to(pages[0], {
  boxShadow: '0 0 15px rgba(187, 134, 252, 0.3)',
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

const lightModeIcon = document.getElementById('lightModeIcon');
const darkModeIcon = document.getElementById('darkModeIcon');
const styleSheet = document.getElementById('styleSheet');
let currentStyle = 1;

lightModeIcon.addEventListener('click', () => {
  if (currentStyle !== 1) {
    styleSheet.href = 'style1.css';
    lightModeIcon.classList.add('active');
    darkModeIcon.classList.remove('active');
    currentStyle = 1;
  }
});

darkModeIcon.addEventListener('click', () => {
  if (currentStyle !== 2) {
    styleSheet.href = 'style2.css';
    darkModeIcon.classList.add('active');
    lightModeIcon.classList.remove('active');
    currentStyle = 2;
  }
});

window.onload = () => {
  if (styleSheet.href.includes('style1.css')) {
    lightModeIcon.classList.add('active');
    darkModeIcon.classList.remove('active');
  } else {
    darkModeIcon.classList.add('active');
    lightModeIcon.classList.remove('active');
  }
};
