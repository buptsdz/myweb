function toggleComments() {
  const walineContainer = document.getElementById("wal");
  const toggleButton = document.querySelector(".toggle-button");

  if (walineContainer.style.display === "" || walineContainer.style.display === "none") {
    walineContainer.style.display = "block";
    toggleButton.classList.add("comments-visible");
  } else {
    walineContainer.style.display = "none";
    toggleButton.classList.remove("comments-visible");
  }
}
