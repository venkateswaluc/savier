const topbar = document.getElementById("topbar");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal, .reveal-delay");
const year = document.getElementById("year");
const toTop = document.getElementById("toTop");

if (year) {
    year.textContent = new Date().getFullYear();
}

const updateTopbar = () => {
    if (window.scrollY > 8) {
        topbar.classList.add("scrolled");
    } else {
        topbar.classList.remove("scrolled");
    }
};

window.addEventListener("scroll", updateTopbar);
updateTopbar();

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const open = menuToggle.classList.toggle("open");
        mainNav.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

const markActiveLink = () => {
    const offset = window.scrollY + 140;
    let currentId = "home";

    sections.forEach((section) => {
        if (offset >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isMatch);
    });
};

window.addEventListener("scroll", markActiveLink);
markActiveLink();

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (toTop) {
    toTop.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
