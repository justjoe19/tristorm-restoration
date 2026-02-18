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

});