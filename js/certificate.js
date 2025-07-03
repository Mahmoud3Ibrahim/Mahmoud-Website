// ===== CERTIFICATES PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeCertificates();
});

function initializeCertificates() {
    initNavigation();
    initScrollEffects();
    initCertificateFilters();
    initCertificateModal();
    initStatsCounter();
    initProgressBars();
    addEventListeners();
    
    console.log('✅ Certificates page initialized successfully');
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
                
                // Add special effects for different elements
                if (entry.target.classList.contains('certificate-card')) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                }
            }
        });
    }, observerOptions);
    
    // Observe certificate cards with stagger effect
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('.certificates-header, .certificates-filter, .certificates-section, .next-steps-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe next step items
    const nextStepItems = document.querySelectorAll('.next-step-item');
    nextStepItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px) scale(0.95)';
        item.style.transition = `all 0.7s ease-out ${index * 0.15}s`;
        observer.observe(item);
    });
}

// ===== CERTIFICATE FILTERS =====
function initCertificateFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter certificates with animation
            filterCertificates(filter, certificateCards);
            
            // Update URL without page reload
            const url = new URL(window.location);
            if (filter === 'all') {
                url.searchParams.delete('filter');
            } else {
                url.searchParams.set('filter', filter);
            }
            window.history.replaceState({}, '', url);
        });
    });
    
    // Apply filter from URL on load
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('filter') || 'all';
    
    const initialButton = document.querySelector(`[data-filter="${initialFilter}"]`);
    if (initialButton) {
        initialButton.click();
    }
}

function filterCertificates(filter, certificateCards) {
    const certificatesGrid = document.querySelector('.certificates-grid');
    certificatesGrid.classList.add('certificates-loading');
    
    setTimeout(() => {
        certificateCards.forEach((card, index) => {
            const categories = card.getAttribute('data-category').split(' ');
            const shouldShow = filter === 'all' || categories.includes(filter);
            
            if (shouldShow) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                    card.style.display = 'block';
                }, index * 50);
            } else {
                card.classList.add('hidden');
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        certificatesGrid.classList.remove('certificates-loading');
        updateCertificateCount(filter);
    }, 300);
}

function updateCertificateCount(filter) {
    const visibleCards = document.querySelectorAll('.certificate-card.visible').length;
    const countElement = document.querySelector('.certificates-count');
    
    if (countElement) {
        countElement.textContent = `Showing ${visibleCards} certificates`;
    }
    
    // Update stats if filter is active
    if (filter !== 'all') {
        const statElement = document.querySelector('.certificates-stats .stat-number');
        if (statElement) {
            animateNumber(statElement, parseInt(statElement.textContent), visibleCards, 1000, '+');
        }
    }
}

// ===== CERTIFICATE MODAL =====
function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal functionality
    [modalOverlay, modalClose].forEach(element => {
        element.addEventListener('click', () => {
            closeModal();
        });
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Certificate data
const certificateData = {
    certificate_7: {
        title: 'Python Basics',
        provider: 'University of Michigan',
        date: 'Jun 2025',
        description: 'Comprehensive foundation in Python programming covering syntax, data types, control structures, and problem-solving techniques through Coursera.',
        skills: ['Python Programming', 'Data Types', 'Control Structures', 'Problem Solving', 'Algorithms'],
        verifyUrl: 'https://coursera.org/verify/5JHPB5DUPEKF',
        image: '../image/certificate_7.jpg'
    },
    certificate_1: {
        title: 'Google Data Analytics Professional Certificate',
        provider: 'Google',
        date: 'Aug 2023',
        description: 'A prestigious certification that equipped me with comprehensive skills in data analysis, transforming raw data into actionable insights with expertise.',
        skills: ['Data Analysis', 'SQL', 'R Programming', 'Tableau', 'Data Visualization', 'Statistical Analysis'],
        verifyUrl: '#',
        image: '../image/certificate_1.jpg'
    },
    certificate_2: {
        title: 'Share Data Through the Art of Visualization',
        provider: 'Google',
        date: 'Jul 2023',
        description: 'A valuable certification that honed my ability to create impactful visual stories from data using tools like Tableau and advanced visualization techniques.',
        skills: ['Data Visualization', 'Tableau', 'Storytelling', 'Dashboard Design', 'Charts'],
        verifyUrl: '#',
        image: '../image/certificate_2.jpg'
    },
    certificate_3: {
        title: 'Google Data Analytics Capstone: Complete a Case Study',
        provider: 'Google',
        date: 'Aug 2023',
        description: 'An impressive achievement showcasing my ability to apply data analysis skills in a real-world case study project with comprehensive analysis.',
        skills: ['Case Study', 'Data Analysis', 'Project Management', 'Presentation', 'Problem Solving'],
        verifyUrl: '#',
        image: '../image/certificate_3.jpg'
    },
    certificate_4: {
        title: 'Data Analytics with R',
        provider: 'Google',
        date: 'Jun 2023',
        description: 'A certification that enhanced my skills in using R programming for statistical analysis, data manipulation, and advanced visualization techniques.',
        skills: ['R Programming', 'Statistical Analysis', 'Data Manipulation', 'ggplot2', 'RStudio'],
        verifyUrl: '#',
        image: '../image/certificate_4.jpg'
    },
    certificate_5: {
        title: 'Process Data',
        provider: 'Google',
        date: 'May 2023',
        description: 'A certification that taught me the art of cleaning and preparing data for effective analysis, ensuring data integrity and quality.',
        skills: ['Data Cleaning', 'Data Preparation', 'Data Integrity', 'Quality Assurance', 'ETL'],
        verifyUrl: '#',
        image: '../image/certificate_5.jpg'
    },
    certificate_6: {
        title: 'Prepare Data for Exploration',
        provider: 'Google',
        date: 'Apr 2023',
        description: 'A certification that equipped me with skills to organize and prepare data for insightful exploration and comprehensive analysis.',
        skills: ['Data Organization', 'Data Exploration', 'Database Management', 'Data Collection', 'SQL'],
        verifyUrl: '#',
        image: '../image/certificate_6.jpg'
    }
};

function openCertificateModal(certificateId) {
    const modal = document.getElementById('certificateModal');
    const data = certificateData[certificateId];
    
    if (!data) return;
    
    // Update modal content
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalImage').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalVerify').href = data.verifyUrl;
    
    // Update skills
    const skillsContainer = document.getElementById('modalSkills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    // Store current certificate for download
    modal.setAttribute('data-current-cert', certificateId);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.8) translateY(50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease-out';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
    }, 50);
}

function downloadCertificate() {
    const modal = document.getElementById('certificateModal');
    const certificateId = modal.getAttribute('data-current-cert');
    const data = certificateData[certificateId];
    
    if (!data) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = data.image;
    link.download = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.jpg`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Certificate image downloaded successfully!', 'success');
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.certificates-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Handle different types of stat values
                if (finalValue.includes('-')) {
                    // For date ranges like "2024-2025"
                    animateYearRange(target, finalValue);
                } else {
                    const number = parseFloat(finalValue.replace(/[^\d.]/g, ''));
                    const suffix = finalValue.replace(/[\d.]/g, '');
                    animateNumber(target, 0, number, 2000, suffix);
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateYearRange(element, finalValue) {
    const years = finalValue.split('-');
    const startYear = parseInt(years[0]);
    const endYear = parseInt(years[1]);
    
    let currentYear = startYear - 5;
    const increment = 1;
    
    const yearAnimation = setInterval(() => {
        currentYear += increment;
        if (currentYear >= startYear) {
            element.textContent = `${startYear}-${Math.min(currentYear, endYear)}`;
            if (currentYear >= endYear) {
                clearInterval(yearAnimation);
                element.textContent = finalValue;
            }
        }
    }, 100);
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

// ===== PROGRESS BARS ANIMATION =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Reset and animate
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = targetWidth;
                    
                    // Add glow effect
                    progressBar.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.6)';
                    setTimeout(() => {
                        progressBar.style.boxShadow = 'none';
                    }, 2000);
                }, 300);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.3 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===== CERTIFICATE INTERACTIONS =====
function initCertificateInteractions() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    
    certificateCards.forEach(card => {
        // Hover effects for certificate images
        const image = card.querySelector('.certificate-image img');
        const overlay = card.querySelector('.certificate-overlay');
        const skillTags = card.querySelectorAll('.certificate-skills .skill-tag');
        
        if (image && overlay) {
            card.addEventListener('mouseenter', () => {
                // Animate skill tags
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.transform = 'translateY(-2px) scale(1.05)';
                    }, index * 50);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                skillTags.forEach(tag => {
                    tag.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
        
        // Click effect for certificate cards
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.certificate-actions')) {
                const viewButton = card.querySelector('.view-link');
                if (viewButton) {
                    // Add ripple effect
                    createRippleEffect(card, e);
                    
                    // Open modal after animation
                    setTimeout(() => {
                        viewButton.click();
                    }, 200);
                }
            }
        });
    });
    
    // Skill tag interactions
    const skillTags = document.querySelectorAll('.certificate-skills .skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Search for similar certificates
            const skillName = tag.textContent;
            searchCertificatesBySkill(skillName);
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(16, 185, 129, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: certificateRipple 0.6s ease-out;
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

function searchCertificatesBySkill(skillName) {
    const certificateCards = document.querySelectorAll('.certificate-card');
    let matchingCards = [];
    
    certificateCards.forEach(card => {
        const skills = Array.from(card.querySelectorAll('.certificate-skills .skill-tag'))
            .map(tag => tag.textContent.toLowerCase());
        
        if (skills.includes(skillName.toLowerCase())) {
            matchingCards.push(card);
        }
    });
    
    if (matchingCards.length > 1) {
        showNotification(`Found ${matchingCards.length} certificates with "${skillName}" skill`, 'info');
        
        // Highlight matching cards
        certificateCards.forEach(card => {
            card.style.opacity = '0.3';
        });
        
        matchingCards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        // Reset after 3 seconds
        setTimeout(() => {
            certificateCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            });
        }, 3000);
    }
}

// ===== LEARNING PATH VISUALIZATION =====
function initLearningPath() {
    const pathItems = document.querySelectorAll('.path-item');
    
    const pathObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pathItem = entry.target;
                const index = Array.from(pathItems).indexOf(pathItem);
                
                setTimeout(() => {
                    pathItem.style.transform = 'translateX(0)';
                    pathItem.style.opacity = '1';
                    
                    // Add connecting line animation
                    if (index < pathItems.length - 1) {
                        createPathConnection(pathItem, pathItems[index + 1]);
                    }
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });
    
    pathItems.forEach((item, index) => {
        item.style.transform = 'translateX(-30px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease-out';
        pathObserver.observe(item);
    });
}

function createPathConnection(fromItem, toItem) {
    const connection = document.createElement('div');
    connection.className = 'path-connection';
    connection.style.cssText = `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 20px;
        background: linear-gradient(180deg, var(--secondary-color), transparent);
        top: 100%;
        animation: pathGrow 0.8s ease-out;
    `;
    
    fromItem.style.position = 'relative';
    fromItem.appendChild(connection);
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
        
        // Arrow key navigation for filters
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeFilter = document.querySelector('.filter-btn.active');
            const allFilters = Array.from(document.querySelectorAll('.filter-btn'));
            const currentIndex = allFilters.indexOf(activeFilter);
            
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : allFilters.length - 1;
            } else {
                newIndex = currentIndex < allFilters.length - 1 ? currentIndex + 1 : 0;
            }
            
            allFilters[newIndex].click();
            allFilters[newIndex].focus();
        }
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pause animations when tab is not visible
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            // Resume animations when tab is visible
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
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
    
    // Adjust modal layout on resize
    const modal = document.getElementById('certificateModal');
    if (modal.style.display === 'flex') {
        const modalBody = modal.querySelector('.modal-body');
        if (window.innerWidth <= 768) {
            modalBody.style.flexDirection = 'column';
        } else {
            modalBody.style.flexDirection = 'row';
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
    initCertificateInteractions();
    initLearningPath();
    
    // Add custom animations styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes certificateRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pathGrow {
            from {
                height: 0;
                opacity: 0;
            }
            to {
                height: 20px;
                opacity: 1;
            }
        }
        
        @keyframes skillHighlight {
            0%, 100% { background: rgba(16, 185, 129, 0.15); }
            50% { background: rgba(16, 185, 129, 0.3); }
        }
    `;
    document.head.appendChild(animationStyles);
    
    console.log('🚀 All certificates page features loaded successfully!');
}, 300);

// ===== EXPOSE GLOBAL FUNCTIONS =====
window.openCertificateModal = openCertificateModal;
window.downloadCertificate = downloadCertificate;

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Certificates Page Error:', e.error);
    
    if (window.location.hostname === 'localhost') {
        showNotification('A technical error occurred. Check console for details.', 'error');
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    console.log('🧹 Cleaning up certificates page resources...');
});

// ===== END OF CERTIFICATES JAVASCRIPT =====