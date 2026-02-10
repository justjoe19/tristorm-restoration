document.addEventListener('DOMContentLoaded', function () {
    
    // Select necessary elements
    const navLinks = document.querySelectorAll('.navbar-nav a');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');
    const nav = document.querySelector('nav'); // Select the navbar to measure its height

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target section ID (e.g., "#contact")
            const targetId = link.getAttribute('href');

            // Only run this custom logic for internal page links (starting with #)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault(); // Stop the default "jump" behavior

                // 1. Close mobile menu if it is open
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // 2. Find the target element on the page
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 3. Dynamic Calculation:
                    // Measure the header height accurately
                    const navHeight = nav.offsetHeight;
                    
                    // Calculate exactly where the element is relative to the viewport + current scroll
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navHeight;

                    // 4. Scroll to the calculated position, respecting prefers-reduced-motion
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: prefersReducedMotion.matches ? "auto" : "smooth"
                    });

                    // 5. Manage keyboard focus:
                    // After scrolling, set focus to the target element.
                    // This is important for screen reader users and keyboard navigators.
                    if (targetElement) {
                        // Ensure the element can receive focus
                        if (!targetElement.hasAttribute('tabindex')) {
                            targetElement.setAttribute('tabindex', '-1');
                        }
                        targetElement.focus();
                    }
                }
            }
        });
    });

});