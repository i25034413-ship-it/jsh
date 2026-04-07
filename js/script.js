document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  var carouselTrack = document.getElementById('carouselTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsContainer = document.getElementById('carouselDots');

  if (carouselTrack) {
    var slides = carouselTrack.children;
    var totalSlides = slides.length;
    var currentSlide = 0;
    var autoPlayInterval;
    var isHovering = false;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      carouselTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.children;
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
        if (i === currentSlide) {
          dots[i].classList.add('active');
        }
      }
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoPlay() {
      autoPlayInterval = setInterval(function() {
        if (!isHovering) {
          nextSlide();
        }
      }, 5000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      });
    }

    if (dotsContainer) {
      var dots = dotsContainer.children;
      for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function() {
          var index = parseInt(this.getAttribute('data-index'));
          goToSlide(index);
          stopAutoPlay();
          startAutoPlay();
        });
      }
    }

    var heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', function() {
        isHovering = true;
      });
      heroSection.addEventListener('mouseleave', function() {
        isHovering = false;
      });
    }

    startAutoPlay();

    document.addEventListener('keydown', function(e) {
      if (!carouselTrack) return;
      if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
      }
    });
  }

  var touchStartX = 0;
  var touchEndX = 0;

  if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    var swipeThreshold = 50;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        if (nextBtn) nextBtn.click();
      } else {
        if (prevBtn) prevBtn.click();
      }
    }
  }

  var foodCatBtns = document.querySelectorAll('.food-cat-btn');
  foodCatBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      foodCatBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
    });
  });
});
