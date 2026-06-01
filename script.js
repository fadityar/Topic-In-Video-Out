// ============================================
// SMOOTH NAVIGATION & SCROLL EFFECTS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Navigation active link tracking
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards, use case cards, and other elements
document.querySelectorAll('.feature-card, .use-case-card, .demo-card, .tech-category').forEach(el => {
    observer.observe(el);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.disabled = true;
        
        // Reset form after success message
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            showNotification('Thank you! We\'ll get back to you soon!', 'success');
        }, 2000);
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// SCROLL-TO-TOP BUTTON
// ============================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1.2rem;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ============================================
// STATISTICS COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            if (number && !number.dataset.animated) {
                number.dataset.animated = 'true';
                const value = parseInt(number.textContent);
                if (!isNaN(value)) {
                    animateCounter(number, value);
                }
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// ============================================
// DEMO VIDEO CLICK HANDLERS
// ============================================

document.querySelectorAll('.demo-video').forEach(video => {
    video.addEventListener('click', () => {
        showNotification('🎬 Video demo coming soon! Check back later.', 'info');
    });
    
    video.style.cursor = 'pointer';
    video.addEventListener('mouseenter', () => {
        video.style.transform = 'scale(1.05)';
    });
    
    video.addEventListener('mouseleave', () => {
        video.style.transform = 'scale(1)';
    });
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Press '?' for help
    if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        showNotification('📚 Navigation: Use arrow keys or click menu items', 'info');
    }
    
    // ESC to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

// Log page performance
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// ============================================
// ADD CSS ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards !important;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .demo-video {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(style);

// ============================================
// PROGRESSIVE ENHANCEMENT
// ============================================

// Check if localStorage is available
const hasLocalStorage = (() => {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
})();

if (hasLocalStorage) {
    // Remember user's last visited section
    document.querySelectorAll('section[id]').forEach(section => {
        const links = document.querySelectorAll(`a[href="#${section.id}"]`);
        links.forEach(link => {
            link.addEventListener('click', () => {
                localStorage.setItem('lastSection', section.id);
            });
        });
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add focus management for keyboard navigation
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #6366f1';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ============================================
// EASTER EGG
// ============================================

let secretCode = '';
document.addEventListener('keydown', (e) => {
    secretCode += e.key;
    if (secretCode.includes('funstory')) {
        showNotification('🎉 You found the easter egg! 🥚 Stories + AI = Magic! ✨', 'success');
        secretCode = '';
    }
    if (secretCode.length > 10) {
        secretCode = secretCode.slice(-10);
    }
});

console.log('%c🎬 Automated Kids Story Generator', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cTransform stories into videos. 10x faster! 🚀', 'font-size: 14px; color: #8b5cf6;');
console.log('%cType "funstory" to unlock the easter egg!', 'font-size: 12px; color: #10b981;');
