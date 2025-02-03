emailjs.init("d2jL37oPNhu6IeXSC");

document.addEventListener("DOMContentLoaded", () => {
  const containersProject = document.querySelectorAll(".wrapper");

  containersProject.forEach((wrapper, index) => {
    wrapper.classList.add(`wrapper${index}`);
  });
  for (let i = 0; i < containersProject.length; i++) {
    const wrapper = document.querySelector(`.wrapper.wrapper${i}`);
    if (wrapper) {
      const items = wrapper.querySelectorAll(".item");
      const itemCount = items.length;
      const maxLeft = Math.max(300 * itemCount, wrapper.offsetWidth);

      items.forEach((item, index) => {
        item.style.left = `${maxLeft}px`;
        item.style.animationDelay = `${
          (30 / itemCount) * (itemCount - (index + 1)) * -1
        }s`;
        console.log(
          `${(30 / itemCount) * (itemCount - (index + 1)) * -1}s, ${
            index + 1
          }, ${itemCount}`
        );
      });
    }
  }

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
      let isValid = true; // Flag untuk mengecek apakah form valid
      clearErrors(); // Hapus pesan error sebelumnya

      // Ambil nilai input
      const contactNumber = document
        .getElementById("contact_number")
        .value.trim();
      const userName = document.getElementById("user_name").value.trim();
      const userEmail = document.getElementById("user_email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validasi Contact Number (wajib angka dan minimal 8 karakter)
      if (contactNumber === "" || contactNumber.length < 8) {
        showError("contact_number", "Contact number harus minimal 8 digit");
        isValid = false;
      }

      // Validasi Name (tidak boleh kosong)
      if (userName === "") {
        showError("user_name", "Name tidak boleh kosong");
        isValid = false;
      }

      // Validasi Email
      if (!isValidEmail(userEmail)) {
        showError("user_email", "Format email tidak valid");
        isValid = false;
      }

      // Validasi Message (minimal 10 karakter)
      if (message.length < 10) {
        showError("message", "Message harus minimal 10 karakter");
        isValid = false;
      }

      // Jika semua valid, kirim form
      if (isValid) {
        emailjs.sendForm("service_kw2wl8l", "template_fniqwlc", this).then(
          function () {
            alert("Message has been sent successfully");
            document.querySelector('input[name="contact_number"]').value = "";
            document.querySelector('input[name="user_name"]').value = "";
            document.querySelector('input[name="user_email"]').value = "";
            document.querySelector('textarea[name="message"]').value = "";
          },
          function (error) {
            alert("Message failed to send");
            console.log("FAILED...", error);
          }
        );
      }
    });
});

// Fungsi untuk validasi format email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fungsi untuk menampilkan pesan error
function showError(inputId, message) {
  const inputField = document.getElementById(inputId);
  const errorElement = document.createElement("small");
  errorElement.className = "error-message";
  errorElement.style.color = "red";
  errorElement.innerText = message;
  inputField.parentNode.appendChild(errorElement);
}

// Fungsi untuk menghapus pesan error sebelumnya
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

// Hide popup function
function hidePopup(containerId) {
  console.log(containerId);
  const popup = document.getElementById(containerId);
  popup.replaceChildren();
}

function adjustHeight() {
  const header = document.querySelector(".header");
  const container = document.querySelector(".container-home");
  const headerHeight = header.offsetHeight;
  container.style.height = `calc(100vh - ${headerHeight}px)`;
}

window.addEventListener("load", adjustHeight);
window.addEventListener("resize", adjustHeight);
