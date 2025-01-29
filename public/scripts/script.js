emailjs.init("d2jL37oPNhu6IeXSC");

document.addEventListener("DOMContentLoaded", () => {
  const containersProject = document.querySelectorAll(".projects-list-container"); // Atau gunakan elemen lain yang merupakan induk project-card

  // Event delegation untuk menangani klik pada .project-card
  containersProject.forEach((container) => {
    container.addEventListener("click", (event) => {
      const card = event.target.closest(".project-card");
      if (!card) return; // Jika bukan elemen .project-card, abaikan

      console.log("clicked");
      const data = JSON.parse(card.getAttribute("data-project"));
      const container_id = card.getAttribute("container-id");
      data["closeFunction"] = `hidePopup("${container_id}")`;
      const popupContainer = document.getElementById(container_id);

      popupContainer.classList.remove("hidden");

      // Fetch the partial template
      fetch("/project")
        .then((response) => response.text())
        .then((templateSource) => {
          const template = Handlebars.compile(templateSource);
          const renderedHtml = template(data);
          popupContainer.innerHTML = renderedHtml;
        })
        .catch((error) => console.error("Error loading partial:", error));
    });
  });
  const containersResearch = document.querySelectorAll(".research-list"); // Atau gunakan elemen lain yang merupakan induk project-card

  // Event delegation untuk menangani klik pada .project-card
  containersResearch.forEach((container) => {
    container.addEventListener("click", (event) => {
      const card = event.target.closest(".research-card");
      if (!card) return; // Jika bukan elemen .project-card, abaikan

      console.log("clicked");
      const data = JSON.parse(card.getAttribute("data-project"));
      const container_id = card.getAttribute("container-id");
      data["closeFunction"] = `hidePopup("${container_id}")`;
      const popupContainer = document.getElementById(container_id);

      popupContainer.classList.remove("hidden");

      // Fetch the partial template
      fetch("/research")
        .then((response) => response.text())
        .then((templateSource) => {
          const template = Handlebars.compile(templateSource);
          const renderedHtml = template(data);
          popupContainer.innerHTML = renderedHtml;
        })
        .catch((error) => console.error("Error loading partial:", error));
    });
  });

  // Handle form submission with EmailJS
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_kw2wl8l", "template_fniqwlc", this).then(
        function () {
          console.log("SUCCESS!");
          alert("Message has been sent successfully");

          // Reset form fields
          document.querySelector('input[name="contact_number"]').value = "";
          document.querySelector('input[name="user_name"]').value = "";
          document.querySelector('input[name="user_email"]').value = "";
          document.querySelector('textarea[name="message"]').value = "";
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Message failed to send");
        }
      );
    });

  // Circular scrolling
  const projectLists = document.querySelectorAll(".projects-list");

  projectLists.forEach((list) => {
    if (list.querySelectorAll("img").length <= 3) return;
    // Duplicate content for looping
    list.innerHTML += list.innerHTML;

    const container = list.closest(".projects-list-container");
    container.addEventListener("scroll", () => {
      const scrollWidth = list.scrollWidth / 2; // Original length (before duplication)

      if (container.scrollLeft + 2 >= scrollWidth) {
        console.log("reset ke awal");
        container.scrollLeft = 0; // Reset to the beginning
      } else if (container.scrollLeft === 0) {
        console.log("reset ke akhir");
        container.scrollLeft = scrollWidth / 2; // Reset to the end
      }
    });

    // Set initial position in the middle
    container.scrollLeft = list.scrollWidth / 4;
  });
});

// Hide popup function
function hidePopup(containerId) {
  console.log(containerId);
  const popup = document.getElementById(containerId);
  popup.replaceChildren();
}
