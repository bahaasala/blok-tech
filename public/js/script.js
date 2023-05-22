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
document.addEventListener("DOMContentLoaded", () => {
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
});
