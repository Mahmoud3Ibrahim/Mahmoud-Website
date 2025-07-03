// ===== PROJECTS PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeProjects();
});

function initializeProjects() {
    initNavigation();
    initScrollEffects();
    initProjectFilters();
    initProjectAnimations();
    initLoadMore();
    initSearchFunctionality();
    addEventListeners();
    
    console.log('✅ Projects page initialized successfully');
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
                if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                }
            }
        });
    }, observerOptions);
    
    // Observe project cards with stagger effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('.projects-header, .projects-filter, .projects-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            filterProjects(filter, projectCards);
            
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

function filterProjects(filter, projectCards) {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.classList.add('loading');
    
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
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
        
        projectsGrid.classList.remove('loading');
        updateProjectCount(filter);
    }, 300);
}

function updateProjectCount(filter) {
    const visibleCards = document.querySelectorAll('.project-card.visible').length;
    const countElement = document.querySelector('.projects-count');
    
    if (countElement) {
        countElement.textContent = `Showing ${visibleCards} projects`;
    }
    
    // Update stats if filter is active
    if (filter !== 'all') {
        const statElement = document.querySelector('.stat-number');
        if (statElement) {
            animateNumber(statElement, parseInt(statElement.textContent), visibleCards, 1000, '+');
        }
    }
}

// ===== PROJECT ANIMATIONS =====
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Hover effects for project images
        const image = card.querySelector('.project-image img');
        const overlay = card.querySelector('.project-overlay');
        const techIcons = card.querySelectorAll('.project-tech-icons i');
        
        if (image && overlay) {
            card.addEventListener('mouseenter', () => {
                // Animate tech icons
                techIcons.forEach((icon, index) => {
                    setTimeout(() => {
                        icon.style.animation = `bounceIn 0.6s ease-out ${index * 0.1}s both`;
                    }, 200);
                });
            });
            
            card.addEventListener('mouseleave', () => {
                techIcons.forEach(icon => {
                    icon.style.animation = '';
                });
            });
        }
        
        // Click effect for project cards
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-link')) {
                const primaryLink = card.querySelector('.project-link');
                if (primaryLink) {
                    // Add ripple effect
                    createRippleEffect(card, e);
                    
                    // Navigate after animation
                    setTimeout(() => {
                        primaryLink.click();
                    }, 200);
                }
            }
        });
    });
    
    // Tech tag hover effects
    const techTags = document.querySelectorAll('.project-tech span');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
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
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
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

// ===== LOAD MORE FUNCTIONALITY =====
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    let currentPage = 1;
    const projectsPerPage = 6;
    
    if (!loadMoreBtn) return;
    
    // Hide extra projects initially
    const allProjects = document.querySelectorAll('.project-card');
    hideExtraProjects(allProjects, projectsPerPage);
    
    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Loading...';
        
        // Simulate loading delay
        setTimeout(() => {
            currentPage++;
            const startIndex = (currentPage - 1) * projectsPerPage;
            const endIndex = currentPage * projectsPerPage;
            
            // Show next batch of projects
            for (let i = startIndex; i < endIndex && i < allProjects.length; i++) {
                const project = allProjects[i];
                project.style.display = 'block';
                
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'translateY(0)';
                }, (i - startIndex) * 100);
            }
            
            // Hide button if all projects are shown
            if (endIndex >= allProjects.length) {
                loadMoreBtn.style.display = 'none';
                showAllProjectsMessage();
            } else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = 'Load More Projects';
            }
        }, 800);
    });
}

function hideExtraProjects(projects, limit) {
    projects.forEach((project, index) => {
        if (index >= limit) {
            project.style.display = 'none';
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
        }
    });
}

function showAllProjectsMessage() {
    const loadMoreSection = document.querySelector('.load-more-section');
    const message = document.createElement('div');
    message.className = 'all-projects-message';
    message.innerHTML = `
        <p style="color: var(--gray-400); font-size: 0.9rem; margin-top: var(--space-4);">
            🎉 You've seen all projects! Check out more on 
            <a href="https://github.com/Mahmoud3Ibrahim" target="_blank" style="color: var(--primary-color);">GitHub</a>
        </p>
    `;
    loadMoreSection.appendChild(message);
}

// ===== SEARCH FUNCTIONALITY =====
function initSearchFunctionality() {
    // Create search input if it doesn't exist
    const filterSection = document.querySelector('.projects-filter .container');
    
    if (filterSection && !document.querySelector('.search-input')) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div style="margin-top: var(--space-4); text-align: center;">
                <input type="text" 
                       class="search-input" 
                       placeholder="Search projects..." 
                       style="
                           background: var(--bg-card);
                           border: 1px solid rgba(59, 130, 246, 0.2);
                           color: var(--white);
                           padding: var(--space-3) var(--space-4);
                           border-radius: var(--radius-lg);
                           width: 100%;
                           max-width: 400px;
                           font-size: 0.9rem;
                           transition: var(--transition);
                           backdrop-filter: blur(10px);
                       ">
            </div>
        `;
        filterSection.appendChild(searchContainer);
        
        // Add search functionality
        const searchInput = searchContainer.querySelector('.search-input');
        
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            searchInput.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = 'rgba(59, 130, 246, 0.2)';
            searchInput.style.boxShadow = 'none';
        });
        
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchProjects(e.target.value);
            }, 300);
        });
    }
}

function searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    const searchQuery = query.toLowerCase().trim();
    
    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const techs = Array.from(card.querySelectorAll('.project-tech span'))
            .map(span => span.textContent.toLowerCase())
            .join(' ');
        
        const matches = title.includes(searchQuery) || 
                       description.includes(searchQuery) || 
                       techs.includes(searchQuery);
        
        if (matches || searchQuery === '') {
            card.style.display = 'block';
            card.classList.remove('hidden');
            card.classList.add('visible');
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Show no results message if needed
    const visibleCards = document.querySelectorAll('.project-card.visible').length;
    handleNoResults(visibleCards, searchQuery);
}

function handleNoResults(visibleCount, query) {
    const existingMessage = document.querySelector('.no-results-message');
    
    if (visibleCount === 0 && query !== '') {
        if (!existingMessage) {
            const projectsGrid = document.querySelector('.projects-grid');
            const message = document.createElement('div');
            message.className = 'no-results-message';
            message.innerHTML = `
                <div style="
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: var(--space-12);
                    color: var(--gray-400);
                ">
                    <div style="font-size: 3rem; margin-bottom: var(--space-4);">🔍</div>
                    <h3 style="color: var(--white); margin-bottom: var(--space-2);">No projects found</h3>
                    <p>Try searching with different keywords or check out all projects</p>
                </div>
            `;
            projectsGrid.appendChild(message);
        }
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
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

// ===== PROJECT MODAL (OPTIONAL) =====
function initProjectModal() {
    // Create modal for project details
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(modal);
    
    // Modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: var(--bg-card);
            border-radius: var(--radius-xl);
            border: 1px solid rgba(59, 130, 246, 0.3);
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        .modal-close {
            position: absolute;
            top: var(--space-4);
            right: var(--space-4);
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: var(--white);
            font-size: 1.5rem;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            z-index: 1;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Close modal functionality
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    [overlay, closeBtn].forEach(element => {
        element.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizePerformance() {
    // Lazy load project images
    const images = document.querySelectorAll('.project-image img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // Throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Parallax effect for header
    const header = document.querySelector('.projects-header');
    if (header && scrolled < window.innerHeight) {
        const rate = scrolled * 0.3;
        header.style.transform = `translateY(${rate}px)`;
    }
    
    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (scrolled > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
}

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: var(--white);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
        backToTop.style.background = 'var(--primary-dark)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
        backToTop.style.background = 'var(--primary-color)';
    });
    
    document.body.appendChild(backToTop);
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
    
    // Adjust grid layout on resize
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && window.innerWidth <= 480) {
        projectsGrid.style.gridTemplateColumns = '1fr';
    }
}

// ===== NOTIFICATION SYSTEM =====
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
    initStatsCounter();
    initProjectModal();
    optimizePerformance();
    createBackToTopButton();
    
    // Add ripple animation styles
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
    
    console.log('🚀 All projects page features loaded successfully!');
}, 300);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Projects Page Error:', e.error);
    
    if (window.location.hostname === 'localhost') {
        showNotification('A technical error occurred. Check console for details.', 'error');
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    console.log('🧹 Cleaning up projects page resources...');
});

// ===== END OF PROJECTS JAVASCRIPT =====