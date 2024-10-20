gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const pages = gsap.utils.toArray('.page');
const dateList = document.getElementById('dateList');
const tocButton = document.getElementById('tocButton');
const tocMenu = document.getElementById('tocMenu');
const lightModeIcon = document.getElementById('lightModeIcon');
const darkModeIcon = document.getElementById('darkModeIcon');
const styleSheet = document.getElementById('styleSheet');
let currentStyle = 1;

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

tocButton.addEventListener('click', () => {
  tocMenu.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!tocMenu.contains(event.target) && event.target !== tocButton) {
    tocMenu.classList.remove('open');
  }
});

pages.forEach((page, index) => {
  if (index === 0) return;

  const dateText = page.querySelector('p').innerText.split('\n')[0];
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = `#${page.id}`;
  a.innerText = dateText;
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      smoothScroll(targetElement);
      tocMenu.classList.remove('open');
    }
  });
  li.appendChild(a);
  dateList.appendChild(li);
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

lightModeIcon.addEventListener('click', () => {
  if (currentStyle !== 1) {
    styleSheet.href = 'style1.css';
    lightModeIcon.classList.add('active');
    darkModeIcon.classList.remove('active');
    currentStyle = 1;
    document.body.classList.remove('dark-mode');
  }
});

darkModeIcon.addEventListener('click', () => {
  if (currentStyle !== 2) {
    styleSheet.href = 'style2.css';
    darkModeIcon.classList.add('active');
    lightModeIcon.classList.remove('active');
    currentStyle = 2;
    document.body.classList.add('dark-mode');
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
