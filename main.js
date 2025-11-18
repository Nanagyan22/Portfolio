/* ==================== 
  toggle icon navbar 
====================== */
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/* =========================== 
    Scroll Section Active Link 
============================= */
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /* ========================
      Sticky Navbar 
=========================== */
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  /* ===================== 
    Menu Icon Navbar 
====================== */
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/* ===================== 
    Scroll Reveal 
====================== */
ScrollReveal({
  // reset: true, // You had this as 'true', which makes animations re-run. I've commented it out, but you can re-enable it.
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/* ===================== 
    Typed Js 
====================== */
const typed = new Typed(".multiple-text", {
  strings: [
    "Data Scientist",
    "Business Strategist",
    "Data Analyst",
    "Business Intelligence Analyst",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/* ===========================================
   NEW: CONTACT FORM 
   =========================================== */
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const submitButton = contactForm.querySelector('input[type="submit"]');

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      // 1. Prevent the default form submission
      e.preventDefault();

      // 2. Show a "sending" message and disable the button
      formMessage.textContent = "Sending...";
      formMessage.className = "form-message"; // Reset classes
      submitButton.disabled = true;
      submitButton.value = "Sending...";

      // 3. Get the form data
      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value,
      };

      try {
        // 4. Send the data to your backend API endpoint
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // 5. Handle success (THIS SHOWS THE "SENT" MESSAGE)
          formMessage.textContent =
            "Message sent! I'll get back to you soon.";
          formMessage.className = "form-message success";
          contactForm.reset(); // Clear the form
        } else {
          // 6. Handle errors from the server (THIS SHOWS THE "ERROR" MESSAGE)
          const errorData = await response.json();
          formMessage.textContent = `Error: ${
            errorData.error || "Failed to send message."
          }`;
          formMessage.className = "form-message error";
        }
      } catch (error) {
        // 7. Handle network errors
        console.error("Fetch error:", error);
        formMessage.textContent =
          "An error occurred. Please try again later.";
        formMessage.className = "form-message error";
      } finally {
        // 8. Re-enable the button
        submitButton.disabled = false;
        submitButton.value = "Send Message";
      }
    });
  }
});