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

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/venkateswarlu.cvr@gmail.com';
let isSubmitting = false;

if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (isSubmitting) return;
        
        const formData = new FormData(this);
        const payload = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!payload.email.includes('@')) {
            showAlert('Please enter a valid email address', 'error');
            return;
        }

        isSubmitting = true;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...payload,
                    _subject: `New Savier Inquiry: ${payload.subject}`
                })
            });

            if (!response.ok) throw new Error('Failed to send');

            showAlert('Success! Your message has been sent.', 'success');
            this.reset();
        } catch (error) {
            showAlert('Error: Message could not be sent. Please try again.', 'error');
        } finally {
            isSubmitting = false;
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        }
    });
}

// ===========================
// Alert Notification System
// ===========================
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    alert.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'alertSlideOut 0.4s var(--ease-out) forwards';
        setTimeout(() => alert.remove(), 400);
    }, 4000);
}

console.log('✓ Savier Consultancy script loaded successfully');
