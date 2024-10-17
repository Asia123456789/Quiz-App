// Add event listeners to the buttons
document.getElementById("html-btn").addEventListener("click", function() {
  localStorage.setItem("selectedQuiz", "html");
});

document.getElementById("css-btn").addEventListener("click", function() {
  localStorage.setItem("selectedQuiz", "css");
});

document.getElementById("js-btn").addEventListener("click", function() {
  localStorage.setItem("selectedQuiz", "javascript");
});
