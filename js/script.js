/**
 * TriStorm Restoration - Main Interactive Logic
 * Handles smooth scrolling, mobile navigation auto-close, and dynamic year updates.
 */
document.addEventListener('DOMContentLoaded', function () {
    
    const navLinks = document.querySelectorAll('.navbar-nav a, .smooth-scroll');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    const nav = document.querySelector('nav');
    const banner = document.querySelector('.scrolling-banner');

    /**
     * Custom Smooth Scroll
     * Adjusts scroll position to account for the sticky navbar and the scrolling banner height.
     */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Process internal page links only
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();

                // Auto-close mobile navigation menu after clicking a link
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const bannerHeight = banner ? banner.offsetHeight : 0;
                    
                    // Calculate final offset including both banner and navbar
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navHeight - bannerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    /**
     * Automatic Copyright Year
     * Keeps the footer year up to date without manual intervention.
     */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Contact Form Submission
     * Handles Netlify form submission via AJAX to show a thank you message without redirecting.
     */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then(() => {
                contactForm.classList.add('d-none');
                formSuccess.classList.remove('d-none');
                // Scroll to the success message
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            })
            .catch((error) => alert('There was an error submitting the form. Please try again or call us directly.'));
        });
    }

});