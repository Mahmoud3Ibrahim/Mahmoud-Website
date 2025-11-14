// ===== RESUME PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeResume();
});

function initializeResume() {
    initNavigation();
    initScrollEffects();
    initSkillAnimations();
    initTimelineAnimations();
    initPrintFunctionality();
    addEventListeners();
    
    console.log('Resume page initialized successfully');
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
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
                
                // Special animation for different elements
                if (entry.target.classList.contains('education-item')) {
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
                
                if (entry.target.classList.contains('experience-item')) {
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, observerOptions);
    
    // Observe resume sections
    const sections = document.querySelectorAll('.resume-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe education items with stagger
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Observe experience items with slide effect
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = `all 0.7s ease-out ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Observe skill groups
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(30px) scale(0.95)';
        group.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(group);
    });
    
    // Observe project categories
    const projectCategories = document.querySelectorAll('.project-category');
    projectCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(40px)';
        category.style.transition = `all 0.7s ease-out ${index * 0.12}s`;
        observer.observe(category);
    });
}

// ===== SKILL ANIMATIONS =====
function initSkillAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Add hover effects to skill tags
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
            tag.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
    });
    
    // Animate skill tags on scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                });
            }
        });
    }, { threshold: 0.3 });
    
    const skillGroups = document.querySelectorAll('.skill-group');
    skillGroups.forEach(group => {
        const tags = group.querySelectorAll('.skill-tag');
        tags.forEach(tag => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px) scale(0.8)';
            tag.style.transition = 'all 0.3s ease-out';
        });
        skillObserver.observe(group);
    });
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    // Add timeline effect to experience items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-active');
                
                // Animate duties list
                const duties = entry.target.querySelectorAll('.experience-duties li');
                duties.forEach((duty, index) => {
                    setTimeout(() => {
                        duty.style.opacity = '1';
                        duty.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });
    
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach(item => {
        const duties = item.querySelectorAll('.experience-duties li');
        duties.forEach(duty => {
            duty.style.opacity = '0';
            duty.style.transform = 'translateX(-20px)';
            duty.style.transition = 'all 0.4s ease-out';
        });
        timelineObserver.observe(item);
    });
}

// ===== PRINT FUNCTIONALITY =====
function initPrintFunctionality() {
    // Add print styles optimization
    const printBtn = document.querySelector('.download-actions .btn');
    
    if (printBtn) {
        // Add print option
        const printOption = document.createElement('button');
        printOption.className = 'btn btn-outline print-btn';
        printOption.innerHTML = '<i class="print-icon">🖨️</i> Print Resume';
        printOption.style.marginLeft = 'var(--space-3)';
        
        printOption.addEventListener('click', () => {
            // Optimize for printing
            const originalTitle = document.title;
            document.title = 'Mahmoud Ibrahim - Resume';
            
            // Add print-specific styles
            const printStyles = document.createElement('style');
            printStyles.innerHTML = `
                @media print {
                    .video-background,
                    .navbar,
                    .footer,
                    .download-actions {
                        display: none !important;
                    }
                    
                    .resume-header {
                        margin-top: 0 !important;
                        padding-top: 0 !important;
                    }
                    
                    .resume-section {
                        page-break-inside: avoid;
                        margin-bottom: 2rem;
                    }
                    
                    .education-item,
                    .experience-item,
                    .skill-group {
                        page-break-inside: avoid;
                        margin-bottom: 1rem;
                    }
                }
            `;
            document.head.appendChild(printStyles);
            
            // Print
            window.print();
            
            // Cleanup
            document.title = originalTitle;
            setTimeout(() => {
                document.head.removeChild(printStyles);
            }, 1000);
        });
        
        printBtn.parentNode.appendChild(printOption);
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Add smooth scrolling to section navigation (if added)
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    
    sectionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT INFO INTERACTIONS =====
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        
        if (link) {
            item.addEventListener('click', () => {
                link.click();
            });
            
            item.style.cursor = 'pointer';
            
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(5px)';
                item.style.background = 'rgba(59, 130, 246, 0.1)';
                item.style.borderRadius = 'var(--radius-md)';
                item.style.padding = 'var(--space-2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
                item.style.background = 'transparent';
                item.style.padding = '0';
            });
        }
    });
}

// ===== SECTION PROGRESS INDICATOR =====
function initProgressIndicator() {
    const sections = document.querySelectorAll('.resume-section');
    
    if (sections.length > 0) {
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'resume-progress';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-text">Resume Progress</span>
        `;
        
        // Style the progress indicator
        progressContainer.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid rgba(59, 130, 246, 0.3);
            backdrop-filter: blur(10px);
            z-index: 999;
            transition: opacity 0.3s ease;
        `;
        
        const progressBar = progressContainer.querySelector('.progress-bar');
        progressBar.style.cssText = `
            width: 100px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        `;
        
        const progressFill = progressContainer.querySelector('.progress-fill');
        progressFill.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #10b981);
            width: 0%;
            transition: width 0.3s ease;
        `;
        
        const progressText = progressContainer.querySelector('.progress-text');
        progressText.style.cssText = `
            color: #fff;
            font-size: 0.75rem;
            text-align: center;
            display: block;
        `;
        
        document.body.appendChild(progressContainer);
        
        // Update progress on scroll
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = (scrolled / maxScroll) * 100;
            
            progressFill.style.width = progress + '%';
            
            // Hide at top and bottom
            if (scrolled < 100 || progress > 95) {
                progressContainer.style.opacity = '0';
            } else {
                progressContainer.style.opacity = '1';
            }
        }, 10));
        
        // Hide on mobile
        function checkMobile() {
            if (window.innerWidth <= 768) {
                progressContainer.style.display = 'none';
            } else {
                progressContainer.style.display = 'block';
            }
        }
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
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
    
    // Copy email to clipboard
    const emailElement = document.querySelector('.contact-item span');
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailElement.textContent);
                showNotification('Email copied to clipboard!', 'success');
            } catch (err) {
                console.log('Failed to copy email');
            }
        });
    }
}

// ===== UTILITY FUNCTIONS =====
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

function handleResize() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768) {
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
setTimeout(() => {
    initSmoothScrolling();
    initContactInteractions();
    initProgressIndicator();
    
    console.log('Resume page fully loaded with all features');
}, 500);