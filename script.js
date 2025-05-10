//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const heading = document.getElementById("h");
const para = document.getElementById("para");

const images = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
]; // these should exist in your project folder

let selected = [];
let allImages = [];

function shuffleAndDisplayImages() {
  const duplicateIndex = Math.floor(Math.random() * 5);
  allImages = [...images];
  allImages.push(images[duplicateIndex]);

  // Shuffle array
  allImages.sort(() => Math.random() - 0.5);

  // Display images
  imageContainer.innerHTML = "";
  allImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = `./images/${src}`;
    img.dataset.index = index;
    img.addEventListener("click", () => handleImageClick(img));
    imageContainer.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selected.includes(img)) return; // prevent double-click

  if (selected.length === 2) return; // only allow two selections

  img.classList.add("selected");
  selected.push(img);
  resetBtn.style.display = "inline";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  para.textContent = "";
  heading.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyBtn.addEventListener("click", () => {
  if (selected.length === 2) {
    const [img1, img2] = selected;
    const src1 = img1.src;
    const src2 = img2.src;

    if (src1 === src2) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    verifyBtn.style.display = "none";
  }
});

shuffleAndDisplayImages();
