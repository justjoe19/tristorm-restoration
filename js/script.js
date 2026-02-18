document.addEventListener('DOMContentLoaded', function () {
    
    const navLinks = document.querySelectorAll('.navbar-nav a, .smooth-scroll');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    const nav = document.querySelector('nav');
    const banner = document.querySelector('.scrolling-banner');

    // This is a custom smooth scroll that accounts for the height of the
    // sticky navbar and the banner.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Only run this for internal page links
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); // Stop the default browser jump

                // If the mobile menu is open, close it
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const bannerHeight = banner ? banner.offsetHeight : 0;
                    
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

});

// Update the copyright year automatically
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}