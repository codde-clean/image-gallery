document.addEventListener("DOMContentLoaded", function () {
  // Background audio setup
  const backgroundMusic = new Audio("../audio/memories.mp3");
  backgroundMusic.loop = true;

  // Auto-play audio when the page loads
  backgroundMusic.play().catch(function (error) {
    console.log("Audio autoplay failed. User interaction needed.");
  });

  // Add audio controls
  const audioControls = document.createElement("div");
  audioControls.className = "audio-controls";
  audioControls.innerHTML = `
        <button id="audio-toggle" class="audio-toggle">
            <i class="ri-volume-up-fill"></i>
        </button>
    `;
  document.querySelector(".gallery-container").appendChild(audioControls);

  // Audio control functionality
  const audioToggle = document.getElementById("audio-toggle");
  let isPlaying = true;

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

  // Create background slideshow effect for category sections
  const categorySections = document.querySelectorAll(".category-section");

  categorySections.forEach((section) => {
    // Add a background container for the slideshow
    const bgContainer = document.createElement("div");
    bgContainer.className = "category-background";
    section.insertBefore(bgContainer, section.firstChild);

    // Get all images from the category
    const images = Array.from(
      section.querySelectorAll(".gallery-item img")
    ).map((img) => img.src);
    let currentImageIndex = 0;

    // Create initial background
    bgContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${images[0]})`;

    // Change background every 5 seconds
    setInterval(() => {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      bgContainer.style.opacity = "0";

      setTimeout(() => {
        bgContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${images[currentImageIndex]})`;
        bgContainer.style.opacity = "1";
      }, 1000);
    }, 5000);
  });
});
