// Mobile Navigation Menu

const menuToggle = document.getElementById("menu-toggle");
const mainNavigation = document.getElementById("main-navigation");

if (menuToggle && mainNavigation) {

    menuToggle.addEventListener("click", function () {

        mainNavigation.classList.toggle("active");

        const isOpen = mainNavigation.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}
