// select box
const selectBox = document.querySelectorAll(".select-box");
console.log(selectBox);

selectBox.forEach((box) => {
  box.addEventListener("click", () => {
    selectBox.forEach((box) => {
      box.classList.remove("selected");
    });
    box.classList.add("selected");
  });
});

// Intersection observer animations
const options = {
  rootMargin: "0px 0px -50px 0px",
  threshold: 0,
};

const slideInLeftElements = document.querySelectorAll(".slide-in-left");
const slideInTopElements = document.querySelectorAll(".slide-in-top");
const delay = 500;

const callback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("in-view");
      }, index * delay);
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(callback, options);
slideInLeftElements.forEach((element) => observer.observe(element));
slideInTopElements.forEach((element) => observer.observe(element));

// gsap animations
const tripItems = document.querySelectorAll(".trip-item");

gsap.set(tripItems, { opacity: 0, y: 200 });

const initialDelay = 700;

setTimeout(() => {
  tripItems.forEach((item, index) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: index * 0.4,
      ease: "power1.out",
    });
  });
}, initialDelay);
