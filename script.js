// Presentation state
let currentSlideIndex = 0;
const totalSlides = 8;

// Add CSS custom properties for JS access
document.documentElement.style.setProperty('--color-primary-rgb', '33, 128, 141');

// Get DOM elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slide-dot');
const currentSlideElement = document.getElementById('currentSlide');
const totalSlidesElement = document.getElementById('totalSlides');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const presentationNav = document.getElementById('presentationNav');

// Slide titles for navbar chips
const slideTitles = [
    'Portada',
    'Principios',
    'Vulnerabilidades',
    'CVSS',
    'Amenazas',
    'Software Seguro',
    'Conclusiones',
    'Referencias'
];

// Initialize presentation
function initPresentation() {
    totalSlidesElement.textContent = totalSlides;
    buildNavbar();
    updatePresentation();
}

// Update presentation state
function updatePresentation() {
    // Update slide visibility
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });

    // Update counter
    currentSlideElement.textContent = currentSlideIndex + 1;

    // Update progress bar
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;

    // Update button states
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;

    // Update navbar active state
    updateNavbarActive();
}

// Navigation functions
function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updatePresentation();
    }
}

function previousSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updatePresentation();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlideIndex = index;
        updatePresentation();
    }
}

// Build the top navbar dynamically
function buildNavbar() {
    if (!presentationNav) return;
    presentationNav.innerHTML = '';
    slideTitles.forEach((title, idx) => {
        const chip = document.createElement('button');
        chip.className = 'nav-chip';
        chip.type = 'button';
        chip.setAttribute('aria-label', `Ir a diapositiva ${idx + 1}: ${title}`);
        chip.innerHTML = `<span class="chip-index">${idx + 1}</span><span class="chip-title">${title}</span>`;
        chip.addEventListener('click', () => goToSlideEnhanced(idx));
        presentationNav.appendChild(chip);
    });
    updateNavbarActive();
}

function updateNavbarActive() {
    if (!presentationNav) return;
    const chips = presentationNav.querySelectorAll('.nav-chip');
    chips.forEach((chip, idx) => {
        chip.classList.toggle('active', idx === currentSlideIndex);
    });
}

// Expandable sections functionality
function toggleSection(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.expand-icon');
    const isExpanded = content.classList.contains('expanded');

    if (isExpanded) {
        content.classList.remove('expanded');
        icon.classList.remove('rotated');
        content.style.maxHeight = '0';
    } else {
        content.classList.add('expanded');
        icon.classList.add('rotated');
        content.style.maxHeight = `${content.scrollHeight}px`;
    }
}

function expandAll(slideNumber) {
    const currentSlide = slides[slideNumber - 1];
    if (!currentSlide) return;

    const sections = currentSlide.querySelectorAll('.expandable-section');
    sections.forEach(section => {
        const content = section.querySelector('.expandable-content');
        const icon = section.querySelector('.expand-icon');

        if (!content.classList.contains('expanded')) {
            content.classList.add('expanded');
            icon.classList.add('rotated');
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    });
}

function collapseAll(slideNumber) {
    const currentSlide = slides[slideNumber - 1];
    if (!currentSlide) return;

    const sections = currentSlide.querySelectorAll('.expandable-section');
    sections.forEach(section => {
        const content = section.querySelector('.expandable-content');
        const icon = section.querySelector('.expand-icon');

        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            icon.classList.remove('rotated');
            content.style.maxHeight = '0';
        }
    });
}

// Auto-adjust expanded content heights on window resize
function adjustExpandedHeights() {
    const expandedContents = document.querySelectorAll('.expandable-content.expanded');
    expandedContents.forEach(content => {
        content.style.maxHeight = `${content.scrollHeight}px`;
    });
}

// Enhanced keyboard navigation
function handleKeyNavigation(event) {
    // Don't interfere with form elements
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }

    switch (event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        case 'e':
        case 'E':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                expandAll(currentSlideIndex + 1);
            }
            break;
        case 'c':
        case 'C':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                collapseAll(currentSlideIndex + 1);
            }
            break;
    }
}

// Smooth scroll to top when changing slides
function smoothScrollToTop() {
    const slideContainer = document.querySelector('.slide-container');
    if (slideContainer) {
        slideContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Enhanced keyboard navigation and event listeners
document.addEventListener('keydown', handleKeyNavigation);

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustExpandedHeights, 250);
});

// Add slide change animation with scroll reset
function updatePresentationEnhanced() {
    updatePresentation();
    smoothScrollToTop();

    // Optional: Auto-collapse all sections when changing slides
    // collapseAll(currentSlideIndex + 1);
}

// Override navigation functions to use enhanced version
function nextSlideEnhanced() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updatePresentationEnhanced();
    }
}

function previousSlideEnhanced() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updatePresentationEnhanced();
    }
}

function goToSlideEnhanced(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlideIndex = index;
        updatePresentationEnhanced();
    }
}

// Add accessibility enhancements
function addAccessibilityEnhancements() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    expandableHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `expandable-content-${index}`);

        const content = header.nextElementSibling;
        content.setAttribute('id', `expandable-content-${index}`);
        content.setAttribute('role', 'region');

        header.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSection(header);
            }
        });
    });

    const originalToggleSection = window.toggleSection;
    window.toggleSection = header => {
        originalToggleSection(header);
        const content = header.nextElementSibling;
        const isExpanded = content.classList.contains('expanded');
        header.setAttribute('aria-expanded', isExpanded.toString());
    };
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initPresentation();
    addAccessibilityEnhancements();

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Override the button functions to use enhanced versions
window.nextSlide = nextSlideEnhanced;
window.previousSlide = previousSlideEnhanced;
window.goToSlide = goToSlideEnhanced;
