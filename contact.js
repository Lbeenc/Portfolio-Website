const contactForm = document.querySelector("#contact-form");
const sendButton = document.querySelector("#send-button");
const contactStatus = document.querySelector("#contact-status");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    contactStatus.textContent = "";

    try {
        await emailjs.sendForm(
            "YOUR_SERVICE_ID",
            "YOUR_TEMPLATE_ID",
            contactForm,
            {
                publicKey: "YOUR_PUBLIC_KEY"
            }
        );

        contactStatus.textContent = "Your message was sent. Thank you!";
        contactForm.reset();
    } catch (error) {
        contactStatus.textContent =
            "Your message couldn't be sent. Please try again.";
        console.error("EmailJS error:", error);
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send message";
    }
});