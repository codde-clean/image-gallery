document.addEventListener("DOMContentLoaded", function () {
  // Slideshow configuration
  const slideshowImages = [
    "images/weddings/wedding1.jpg",
    "images/weddings/wedding2.jpg",
    "images/weddings/wedding3.jpg",
    "images/weddings/wedding4.jpg",
    "images/weddings/weeding1.jpg",
    "images/events/alexander-wang-KjyrxSHwqTg-unsplash.jpg",
    "images/photoshoot/studio1.jpg",
    "images/photoshoot/studio2.jpg",
    "images/events/jose-p-ortiz-TtWswwVBYXg-unsplash.jpg",
  ];

  let currentImageIndex = 0;
  const slideDuration = 5000; // 5 seconds per slide

  // Audio configuration
  const backgroundMusic = document.getElementById("background-music");
  const audioToggle = document.getElementById("audio-toggle");
  let isPlaying = false;

  // Initialize slideshow container
  const slideshowContainer = document.querySelector(".slideshow-container");

  // Create and append slides
  slideshowImages.forEach((image, index) => {
    const slide = document.createElement("img");
    slide.src = image;
    slide.className = `slide ${index === 0 ? "active" : ""}`;
    slide.alt = "Photography Portfolio Slide";
    slide.loading = "lazy"; // Add lazy loading for better mobile performance
    slideshowContainer.appendChild(slide);
  });

  const slides = document.querySelectorAll(".slide");

  // Function to update slides with touch support
  function updateSlide(direction = 1) {
    slides[currentImageIndex].classList.remove("active");
    currentImageIndex =
      (currentImageIndex + direction + slides.length) % slides.length;
    slides[currentImageIndex].classList.add("active");
  }

  // Touch support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  slideshowContainer.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  slideshowContainer.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swipe left
        updateSlide(1);
      } else {
        // Swipe right
        updateSlide(-1);
      }
    }
  }

  // Start slideshow
  let slideInterval = setInterval(() => updateSlide(1), slideDuration);

  // Pause slideshow on hover or touch
  slideshowContainer.addEventListener("mouseenter", () =>
    clearInterval(slideInterval)
  );
  slideshowContainer.addEventListener("touchstart", () =>
    clearInterval(slideInterval)
  );

  // Resume slideshow when mouse leaves or touch ends
  slideshowContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => updateSlide(1), slideDuration);
  });
  slideshowContainer.addEventListener("touchend", () => {
    slideInterval = setInterval(() => updateSlide(1), slideDuration);
  });

  // Audio controls with autoplay
  if (audioToggle && backgroundMusic) {
    // Try to autoplay with sound
    backgroundMusic
      .play()
      .then(() => {
        isPlaying = true;
        audioToggle.innerHTML = '<i class="ri-volume-up-fill"></i>';
      })
      .catch((error) => {
        console.log("Autoplay prevented. User interaction needed.");
        isPlaying = false;
      });

    audioToggle.addEventListener("click", function () {
      if (isPlaying) {
        backgroundMusic.pause();
        audioToggle.innerHTML = '<i class="ri-volume-mute-fill"></i>';
      } else {
        backgroundMusic.play();
        audioToggle.innerHTML = '<i class="ri-volume-up-fill"></i>';
      }
      isPlaying = !isPlaying;
    });

    // Handle audio ended event
    backgroundMusic.addEventListener("ended", function () {
      // Loop the audio
      backgroundMusic.currentTime = 0;
      backgroundMusic.play().catch((error) => {
        console.log("Autoplay prevented after ended.");
      });
    });
  }

  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Add mobile-specific classes and adjustments
    document.querySelector(".hero").classList.add("mobile-hero");
    document.querySelector(".hero-content").classList.add("mobile-content");

    // Adjust audio controls position for mobile
    const audioControls = document.querySelector(".audio-controls");
    if (audioControls) {
      audioControls.classList.add("mobile-audio-controls");
    }
  }
});
