// ===== CORRECTED PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initSmoothScroll();
    addEventListeners();
    
    console.log('✅ Data Analytics Portfolio initialized successfully');
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBrand = document.querySelector('.nav-brand');
    
    // Navigation brand click handler
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to top or refresh page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-primary)';
            navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.4)';
        } else {
            navbar.style.background = 'var(--bg-primary)';
            navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.2)';
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(highlightActiveSection, 100));
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special effects for skill categories
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in effect
    const sections = document.querySelectorAll('.data-skills-section, .projects-section, .experience-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe project cards with stagger effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Observe skill categories with stagger effect
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px) scale(0.95)';
        category.style.transition = `all 0.7s ease-out ${index * 0.1}s`;
        observer.observe(category);
    });
    
    // Observe experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                // Add a slight delay for better visual effect
                setTimeout(() => {
                    bar.style.width = width + '%';
                    
                    // Add a subtle glow effect when animating
                    bar.style.boxShadow = '0 0 10px rgba(37, 99, 235, 0.5)';
                    setTimeout(() => {
                        bar.style.boxShadow = 'none';
                    }, 1500);
                }, 200);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 75; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== TECH STACK ANIMATION CONTROL =====
function initTechStackAnimation() {
    const techItems = document.querySelectorAll('.tech-item');
    const imageContainer = document.querySelector('.image-container');
    
    if (!imageContainer) return;
    
    // Pause animations when hovering over the image
    imageContainer.addEventListener('mouseenter', () => {
        techItems.forEach(item => {
            item.style.animationPlayState = 'paused';
        });
    });
    
    // Resume animations when mouse leaves
    imageContainer.addEventListener('mouseleave', () => {
        techItems.forEach(item => {
            item.style.animationPlayState = 'running';
        });
    });
    
    // Add click interaction to tech items
    techItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add a pulse effect when clicked
            item.style.transform = 'scale(1.2)';
            item.style.zIndex = '10';
            
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.zIndex = 'auto';
            }, 300);
        });
    });
}

// ===== TYPING EFFECT FOR HERO SECTION =====
function initTypingEffect() {
    const typeElement = document.querySelector('.typing-text');
    if (!typeElement) return;
    
    const texts = [
        'Data Analytics Expert',
        'Java Developer',
        'Database Designer',
        'Business Intelligence Specialist',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle expensive operations
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            handleScroll();
        }, 10);
    });
}

// ===== SCROLL HANDLER =====
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Subtle parallax effect for hero section
    const hero = document.querySelector('.hero-section');
    if (hero && scrolled < window.innerHeight) {
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    // Update scroll progress for potential progress bar
    const scrollProgress = (scrolled / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress + '%');
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract number from text (e.g., "12+" -> 12, "3.87" -> 3.87)
                const number = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                const suffix = finalValue.replace(/[\d.]/g, '');
                
                animateNumber(target, 0, number, 2000, suffix);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// ===== NUMBER ANIMATION UTILITY =====
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easedProgress = easeOutCubic(progress);
        const current = start + (end - start) * easedProgress;
        
        // Format the number based on the original format
        let displayValue;
        if (end % 1 === 0) {
            displayValue = Math.round(current);
        } else {
            displayValue = current.toFixed(2);
        }
        
        element.textContent = displayValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// ===== EASING FUNCTIONS =====
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ===== THROTTLE UTILITY =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EVENT LISTENERS =====
function addEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const navMenu = document.getElementById('nav-menu');
            
            if (mobileMenuBtn && navMenu) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
        }, 250);
    });
    
    // Focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
    
    // Video background error handling
    const video = document.getElementById('background-video');
    if (video) {
        video.addEventListener('error', () => {
            console.log('Video failed to load, using fallback background');
            const videoContainer = document.querySelector('.video-background');
            videoContainer.innerHTML = '<div class="video-fallback"></div><div class="video-overlay"></div>';
        });
    }
}

// ===== RESIZE HANDLER =====
function handleResize() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Recalculate tech item positions if needed
    const techItems = document.querySelectorAll('.tech-item');
    if (window.innerWidth <= 480) {
        techItems.forEach(item => {
            item.style.display = 'none';
        });
    } else {
        techItems.forEach(item => {
            item.style.display = 'flex';
        });
    }
}

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
function initializeAdditionalFeatures() {
    initTechStackAnimation();
    initStatsCounter();
    optimizePerformance();
    initContactForm();
    
    // Add smooth hover effects to cards
    const cards = document.querySelectorAll('.skill-category, .project-card, .experience-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.style.transform.replace('translateY(0px)', 'translateY(-5px)');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.style.transform.replace('translateY(-5px)', 'translateY(0px)');
        });
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    
    // Don't show errors to users in production
    if (window.location.hostname === 'localhost') {
        showNotification('A technical error occurred. Check console for details.', 'error');
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    console.log('🧹 Cleaning up portfolio resources...');
});

// ===== INITIALIZE EVERYTHING =====
// Add a small delay to ensure DOM is fully loaded
setTimeout(() => {
    initializeAdditionalFeatures();
    initTypingEffect();
    
    // Add a nice entrance animation to the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 All portfolio features loaded successfully!');
}, 300);