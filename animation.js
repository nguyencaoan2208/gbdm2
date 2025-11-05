window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const hero = document.querySelector('.hero-banner');
  const images = hero.querySelectorAll('.images img');
  const scrollY = window.scrollY;
  const fadeStart = 0;
  const fadeEnd = window.innerHeight * 0.5;

  // --- Hiệu ứng fade cho hero images ---
  let progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
  progress = Math.min(Math.max(progress, 0), 1);

  images.forEach(img => {
    img.style.opacity = 1 - progress;
    img.style.transform = `translateY(-${progress * 100}px)`;
  });

  // --- Đổi màu nền header khi scroll quá 100vh ---
  if (scrollY > window.innerHeight * 0.8) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});




// Chọn tất cả phần tử muốn có hiệu ứng
const floatEls = document.querySelectorAll('.scroll-float');

// Dùng IntersectionObserver để phát hiện khi vào khung nhìn
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    } else {
      entry.target.classList.remove('in-view');
    }
  });
}, { threshold: 0.2 }); // kích hoạt khi 20% phần tử nhìn thấy

// Theo dõi các phần tử
floatEls.forEach(el => observer.observe(el));


// S;ide category banner
const slider = document.querySelector('.category-banners');
const slides = slider.querySelector('.slides');
const banners = slider.querySelectorAll('.banner');
const dotsContainer = slider.querySelector('.dots');

let current = 0;

// Tạo dot tương ứng với số slide
banners.forEach((_, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function goToSlide(index) {
  current = index;
  slides.style.transform = `translateX(-${100 * index}%)`;
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

// Tự động trượt (tùy chọn)
setInterval(() => {
  current = (current + 1) % banners.length;
  goToSlide(current);
}, 4000);
