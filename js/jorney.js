// ===== JOURNEY PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeJourney();
});

function initializeJourney() {
    initNavigation();
    initTimelineAnimations();
    initSkillBarsAnimation();
    initScrollEffects();
    initInteractiveElements();
    initStatsCounter();
    addEventListeners();
    
    console.log('✅ Journey page initialized successfully');
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

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItem = entry.target;
                
                // Add stagger delay based on the item index
                const index = Array.from(timelineItems).indexOf(timelineItem);
                const delay = index * 200;
                
                setTimeout(() => {
                    timelineItem.classList.add('animate');
                    
                    // Animate the marker icon
                    const markerIcon = timelineItem.querySelector('.marker-icon');
                    if (markerIcon) {
                        animateMarkerIcon(markerIcon);
                    }
                    
                    // Animate skill tags
                    const skillTags = timelineItem.querySelectorAll('.skill-tag');
                    animateSkillTags(skillTags);
                    
                    // Animate achievements list
                    const achievementsList = timelineItem.querySelectorAll('.achievements li, .academic-achievements li');
                    animateAchievements(achievementsList);
                    
                }, delay);
                
                timelineObserver.unobserve(timelineItem);
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

function animateMarkerIcon(markerIcon) {
    markerIcon.style.transform = 'scale(0)';
    markerIcon.style.opacity = '0';
    
    setTimeout(() => {
        markerIcon.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        markerIcon.style.transform = 'scale(1)';
        markerIcon.style.opacity = '1';
        
        // Add a bounce effect
        setTimeout(() => {
            markerIcon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                markerIcon.style.transform = 'scale(1)';
            }, 200);
        }, 300);
    }, 200);
}

function animateSkillTags(skillTags) {
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.4s ease-out';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

function animateAchievements(achievements) {
    achievements.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBarsAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                
                // Add a delay for better visual effect
                setTimeout(() => {
                    bar.style.width = width + '%';
                    
                    // Add a subtle glow effect during animation
                    bar.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.6)';
                    setTimeout(() => {
                        bar.style.boxShadow = 'none';
                    }, 1500);
                    
                    // Add percentage counter animation
                    animatePercentageCounter(bar, width);
                }, 300);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

function animatePercentageCounter(bar, targetWidth) {
    const skillItem = bar.closest('.skill-bar-item');
    const label = skillItem.querySelector('span');
    const originalText = label.textContent;
    
    let currentWidth = 0;
    const increment = targetWidth / 30; // 30 steps for smooth animation
    
    const counter = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= targetWidth) {
            currentWidth = targetWidth;
            clearInterval(counter);
            label.textContent = originalText;
        } else {
            label.textContent = `${originalText} (${Math.round(currentWidth)}%)`;
        }
    }, 50);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animations for different sections
                if (entry.target.classList.contains('skill-evolution-item')) {
                    animateSkillEvolutionItem(entry.target);
                }
                
                if (entry.target.classList.contains('goal-item')) {
                    animateGoalItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.journey-header, .skills-evolution-section, .future-goals-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe skill evolution items
    const skillItems = document.querySelectorAll('.skill-evolution-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transition = `all 0.6s ease-out ${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Observe goal items
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) rotateX(15deg)';
        item.style.transition = `all 0.7s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
}

function animateSkillEvolutionItem(item) {
    const skillBars = item.querySelectorAll('.skill-progress');
    
    setTimeout(() => {
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 200);
        });
    }, 500);
}

function animateGoalItem(item) {
    const icon = item.querySelector('.goal-icon');
    
    setTimeout(() => {
        icon.style.transform = 'scale(0) rotate(180deg)';
        icon.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }, 100);
    }, 200);
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Timeline item hover effects
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const text = item.querySelector('.timeline-text');
        const image = item.querySelector('.timeline-image img');
        
        if (text && image) {
            text.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05) rotate(2deg)';
                image.style.filter = 'brightness(1.1) saturate(1.2)';
            });
            
            text.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1) rotate(0deg)';
                image.style.filter = 'brightness(1) saturate(1)';
            });
        }
    });
    
    // Skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
            tag.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.boxShadow = 'none';
        });
        
        // Click effect
        tag.addEventListener('click', () => {
            createSkillRipple(tag);
        });
    });
    
    // Goal items interaction
    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.goal-icon');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.goal-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Timeline marker interactions
    const markerIcons = document.querySelectorAll('.marker-icon');
    markerIcons.forEach(marker => {
        marker.addEventListener('click', () => {
            createMarkerPulse(marker);
        });
    });
}

function createSkillRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(59, 130, 246, 0.4);
        border-radius: 50%;
        animation: skillRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createMarkerPulse(marker) {
    marker.style.animation = 'none';
    setTimeout(() => {
        marker.style.animation = 'markerPulse 1s ease-out';
    }, 10);
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.journey-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const number = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                const suffix = finalValue.replace(/[\d.]/g, '');
                
                animateNumber(target, 0, number, 2500, suffix);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        const current = start + (end - start) * easedProgress;
        
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

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// ===== SCROLL PROGRESS INDICATOR =====
function initScrollProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'journey-progress';
    progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-phases">
            <div class="phase-dot" data-phase="1" title="Born by The Sea"></div>
            <div class="phase-dot" data-phase="2" title="University & Accounting"></div>
            <div class="phase-dot" data-phase="3" title="Cairo & Media"></div>
            <div class="phase-dot" data-phase="4" title="FALSO Initiative"></div>
            <div class="phase-dot" data-phase="5" title="Moving to Canada"></div>
            <div class="phase-dot" data-phase="6" title="Back to School"></div>
        </div>
    `;
    
    progressContainer.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid rgba(59, 130, 246, 0.3);
        backdrop-filter: blur(10px);
        z-index: 999;
        transition: opacity 0.3s ease;
        display: none;
    `;
    
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .progress-bar {
            width: 4px;
            height: 200px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        
        .progress-fill {
            height: 0%;
            background: linear-gradient(180deg, #3b82f6, #10b981);
            width: 100%;
            transition: height 0.3s ease;
        }
        
        .progress-phases {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .phase-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .phase-dot.active {
            background: #3b82f6;
            box-shadow: 0 0 10px #3b82f6;
        }
        
        .phase-dot:hover {
            background: #10b981;
            transform: scale(1.2);
        }
    `;
    document.head.appendChild(progressStyles);
    document.body.appendChild(progressContainer);
    
    // Update progress on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const progressFill = progressContainer.querySelector('.progress-fill');
    const phaseDots = progressContainer.querySelectorAll('.phase-dot');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        
        progressFill.style.height = progress + '%';
        
        // Update active phase
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const dot = phaseDots[index];
            
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Show/hide progress indicator
        const timelineSection = document.querySelector('.timeline-section');
        const timelineRect = timelineSection.getBoundingClientRect();
        
        if (timelineRect.top <= window.innerHeight && timelineRect.bottom >= 0) {
            progressContainer.style.display = 'block';
        } else {
            progressContainer.style.display = 'none';
        }
    }, 10));
    
    // Phase dot click handlers
    phaseDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const targetItem = timelineItems[index];
            if (targetItem) {
                const offsetTop = targetItem.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hide on mobile
    function checkMobile() {
        if (window.innerWidth <= 768) {
            progressContainer.style.display = 'none';
        }
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
}

// ===== TIMELINE NAVIGATION =====
function initTimelineNavigation() {
    const navContainer = document.createElement('div');
    navContainer.className = 'timeline-nav';
    navContainer.innerHTML = `
        <button class="nav-btn prev-btn" title="Previous Phase">←</button>
        <span class="phase-indicator">Phase 1 of 6</span>
        <button class="nav-btn next-btn" title="Next Phase">→</button>
    `;
    
    navContainer.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        padding: 1rem 2rem;
        border-radius: 2rem;
        border: 1px solid rgba(59, 130, 246, 0.3);
        backdrop-filter: blur(10px);
        z-index: 999;
        display: none;
        align-items: center;
        gap: 1rem;
    `;
    
    const navStyles = document.createElement('style');
    navStyles.textContent = `
        .nav-btn {
            background: #3b82f6;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .nav-btn:hover {
            background: #2563eb;
            transform: scale(1.1);
        }
        
        .nav-btn:disabled {
            background: rgba(255, 255, 255, 0.2);
            cursor: not-allowed;
            transform: scale(1);
        }
        
        .phase-indicator {
            color: white;
            font-size: 0.9rem;
            font-weight: 500;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(navStyles);
    document.body.appendChild(navContainer);
    
    const prevBtn = navContainer.querySelector('.prev-btn');
    const nextBtn = navContainer.querySelector('.next-btn');
    const indicator = navContainer.querySelector('.phase-indicator');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    let currentPhase = 0;
    
    function updateNavigation() {
        prevBtn.disabled = currentPhase === 0;
        nextBtn.disabled = currentPhase === timelineItems.length - 1;
        indicator.textContent = `Phase ${currentPhase + 1} of ${timelineItems.length}`;
    }
    
    function scrollToPhase(index) {
        if (index >= 0 && index < timelineItems.length) {
            currentPhase = index;
            const targetItem = timelineItems[index];
            const offsetTop = targetItem.offsetTop - 100;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            updateNavigation();
        }
    }
    
    prevBtn.addEventListener('click', () => scrollToPhase(currentPhase - 1));
    nextBtn.addEventListener('click', () => scrollToPhase(currentPhase + 1));
    
    // Show navigation when in timeline section
    window.addEventListener('scroll', throttle(() => {
        const timelineSection = document.querySelector('.timeline-section');
        const timelineRect = timelineSection.getBoundingClientRect();
        
        if (timelineRect.top <= window.innerHeight && timelineRect.bottom >= 0 && window.innerWidth > 768) {
            navContainer.style.display = 'flex';
            
            // Update current phase based on scroll position
            timelineItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentPhase = index;
                    updateNavigation();
                }
            });
        } else {
            navContainer.style.display = 'none';
        }
    }, 10));
    
    updateNavigation();
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const timelineImages = document.querySelectorAll('.timeline-image img');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        timelineImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const windowCenterY = window.innerHeight / 2;
            const distance = Math.abs(centerY - windowCenterY);
            const maxDistance = window.innerHeight;
            const intensity = Math.max(0, 1 - distance / maxDistance);
            
            const translateY = (centerY - windowCenterY) * 0.1 * intensity;
            img.style.transform = `translateY(${translateY}px) scale(${1 + intensity * 0.05})`;
        });
    }, 10));
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
        
        // Arrow key navigation for timeline
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const timelineItems = document.querySelectorAll('.timeline-item');
            const currentIndex = getCurrentTimelineIndex();
            
            let newIndex;
            if (e.key === 'ArrowUp') {
                newIndex = Math.max(0, currentIndex - 1);
            } else {
                newIndex = Math.min(timelineItems.length - 1, currentIndex + 1);
            }
            
            scrollToTimelineItem(newIndex);
        }
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Print functionality
    window.addEventListener('beforeprint', () => {
        // Ensure all animations are completed before printing
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.classList.add('animate');
        });
    });
}

function getCurrentTimelineIndex() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;
    
    timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentIndex = index;
        }
    });
    
    return currentIndex;
}

function scrollToTimelineItem(index) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems[index]) {
        const offsetTop = timelineItems[index].offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
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
    }, 4000);
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
setTimeout(() => {
    initScrollProgress();
    initTimelineNavigation();
    initParallaxEffects();
    
    // Add custom animations styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes skillRipple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
        
        @keyframes markerPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
            100% { transform: scale(1); }
        }
        
        @keyframes timelineSlideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyles);
    
    console.log('🚀 All journey page features loaded successfully!');
}, 500);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Journey Page Error:', e.error);
    
    if (window.location.hostname === 'localhost') {
        showNotification('A technical error occurred. Check console for details.', 'error');
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    console.log('🧹 Cleaning up journey page resources...');
});

// ===== END OF JOURNEY JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Lock or unlock scroll on body
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
});
