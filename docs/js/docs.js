/**
 * Visual Diff Merge Documentation Scripts
 * Common functionality for all documentation pages
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebarNavigation();
    initSmoothScrolling();
    initDeepLinking();
    initTabSystem();
    handleSidebarLinksForTabs();
});

/**
 * Initialize sidebar navigation highlighting
 */
function initSidebarNavigation() {
    const sections = document.querySelectorAll('main section[id]');
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');

    if (sections.length === 0 || sidebarLinks.length === 0) return;

    // Set first link as active by default
    sidebarLinks[0].classList.add('active');

    // Function to determine which section is currently in view
    function highlightCurrentSection() {
        // Get current scroll position
        const scrollY = window.pageYOffset;

        // Calculate the height of the sticky navigation to use as offset
        const navHeight = document.querySelector('.docs-nav')?.offsetHeight || 0;

        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - (navHeight + 20); // Adding extra offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // Remove active class from all links
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to the corresponding link
                const activeLink = document.querySelector(`.docs-sidebar a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightCurrentSection);

    // Initial highlight
    highlightCurrentSection();
}

/**
 * Initialize smooth scrolling for sidebar links
 */
function initSmoothScrolling() {
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');

    if (sidebarLinks.length === 0) return;

    // Calculate the height of the sticky navigation to use as offset
    const navHeight = document.querySelector('.docs-nav')?.offsetHeight || 0;

    // Add click handlers to smooth scroll to sections
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only process internal links
            if (!targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);

            // If target doesn't exist, let default behavior happen
            if (!targetElement) return;

            // Check if the target is inside a tab
            const tabContent = targetElement.closest('.mode-section');

            // If the link targets content in a tab, let handleSidebarLinksForTabs handle it
            if (tabContent) return;

            // For regular links (not targeting tab content), do smooth scrolling
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - navHeight,
                behavior: 'smooth'
            });

            // Update URL hash without scrolling
            history.pushState(null, null, targetId);
        });
    });
}

/**
 * Initialize deep linking - handle URL hash on page load
 */
function initDeepLinking() {
    // Check if there's a hash in the URL
    if (window.location.hash) {
        // Delay to ensure the page is fully loaded
        setTimeout(() => {
            const targetId = window.location.hash;
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate the height of the sticky navigation to use as offset
                const navHeight = document.querySelector('.docs-nav')?.offsetHeight || 0;

                // Scroll to the target section
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });

                // Highlight the corresponding sidebar link
                const sidebarLinks = document.querySelectorAll('.docs-sidebar a');
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        }, 100);
    }
}

/**
 * Initialize tab system for pages with tab navigation
 */
function initTabSystem() {
    // Only run this on pages with tabs
    const tabContainer = document.querySelector('.nav-tabs');
    if (!tabContainer) return;

    // Get all tab links
    const tabLinks = tabContainer.querySelectorAll('a');

    // Tab click event handler
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target tab ID from href
            const targetId = this.getAttribute('href');

            // Deactivate all tabs
            tabContainer.querySelectorAll('li').forEach(tab => {
                tab.classList.remove('active');
            });

            // Activate clicked tab
            this.parentElement.classList.add('active');

            // Hide all tab content
            document.querySelectorAll('.tab-content > .mode-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show target tab content
            const targetTab = document.querySelector(`${targetId}`);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

/**
 * Handle sidebar link clicks that might target content inside tabs
 */
function handleSidebarLinksForTabs() {
    const sidebarLinks = document.querySelectorAll('.docs-sidebar a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');

            // Only process internal links
            if (!targetHref.startsWith('#')) return;

            const targetId = targetHref.substring(1);
            const targetElement = document.getElementById(targetId);

            // If target doesn't exist, let default behavior happen
            if (!targetElement) return;

            // Check if the target is one of the tab IDs
            const isTabId = ['file-browser', 'file-upload', 'text-compare', 'url-compare'].includes(targetId);

            if (isTabId) {
                // This is a direct link to a tab
                e.preventDefault();

                // Find the tab link
                const tabLink = document.querySelector(`.nav-tabs a[href="#${targetId}"]`);

                if (tabLink) {
                    // Deactivate all tabs
                    document.querySelectorAll('.nav-tabs li').forEach(tab => {
                        tab.classList.remove('active');
                    });

                    // Activate clicked tab
                    tabLink.parentElement.classList.add('active');

                    // Hide all tab content
                    document.querySelectorAll('.tab-content > .mode-section').forEach(section => {
                        section.classList.remove('active');
                    });

                    // Show target tab content
                    const targetTab = document.querySelector(`#${targetId}`);
                    if (targetTab) {
                        targetTab.classList.add('active');
                    }

                    // Scroll to the mode selector
                    const modeSelector = document.querySelector('.mode-selector');
                    if (modeSelector) {
                        const navHeight = document.querySelector('.docs-nav')?.offsetHeight || 0;
                        window.scrollTo({
                            top: modeSelector.offsetTop - navHeight,
                            behavior: 'smooth'
                        });
                    }
                }
            }
            // Check if the target is inside a tab content area
            else {
                const tabSection = targetElement.closest('.mode-section');

                if (tabSection) {
                    // This targets content inside a tab
                    e.preventDefault();

                    // Find the tab id
                    const tabId = tabSection.id;

                    // Find the corresponding tab link
                    const tabLink = document.querySelector(`.nav-tabs a[href="#${tabId}"]`);

                    if (tabLink) {
                        // Activate the tab
                        tabLink.click();

                        // Scroll to the mode selector
                        const modeSelector = document.querySelector('.mode-selector');
                        if (modeSelector) {
                            const navHeight = document.querySelector('.docs-nav')?.offsetHeight || 0;
                            window.scrollTo({
                                top: modeSelector.offsetTop - navHeight,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }
        });
    });
}
