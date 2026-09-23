const welcomeButton = document.querySelector("#welcome-button");
const welcomeMessage = document.querySelector("#welcome-message");

welcomeButton.addEventListener("click", () => {
    welcomeMessage.textContent = "Thanks for checking out my portfolio!";
});