// ===== CONTACT PAGE JAVASCRIPT WITH EMAILJS =====

document.addEventListener('DOMContentLoaded', function() {
    initializeContact();
});

function initializeContact() {
    initNavigation();
    initEmailJS();
    initContactForm();
    initFormValidation();
    initContactMethods();
    initFAQ();
    initScrollEffects();
    addEventListeners();
    
    console.log('✅ Contact page initialized successfully');
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


// ===== EMAILJS INITIALIZATION =====
function initEmailJS() {
    // Initialize EmailJS
    emailjs.init(EMAIL_CONFIG.publicKey);
    console.log('📧 EmailJS initialized');
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateAllFields()) {
            showNotification('Please fill in all required fields correctly', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAIL_CONFIG.serviceID,
                EMAIL_CONFIG.templateID,
                form
            );
            
            console.log('Email sent successfully:', result);
            
            // Show success state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Show success message after a delay
            setTimeout(() => {
                showSuccessMessage();
                trackFormSubmission();
            }, 1000);
            
        } catch (error) {
            console.error('Failed to send email:', error);
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show error notification
            showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        }
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    const messageTextarea = document.getElementById('message');
    const charCounter = document.getElementById('char-count');
    
    // Real-time validation for each input
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            clearFieldError(input);
            if (input.value.trim()) {
                validateField(input);
            }
        });
    });
    
    // Character counter for message
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            const maxLength = 1000;
            
            charCounter.textContent = length;
            
            const counterContainer = charCounter.parentElement;
            counterContainer.classList.remove('warning', 'error');
            
            if (length > maxLength * 0.8) {
                counterContainer.classList.add('warning');
            }
            if (length > maxLength) {
                counterContainer.classList.add('error');
                messageTextarea.value = messageTextarea.value.substring(0, maxLength);
                charCounter.textContent = maxLength;
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let message = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    else if (fieldName === 'user_email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Name validation
    else if (fieldName === 'user_name' && value) {
        if (value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters';
        }
    }
    
    // Message validation
    else if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters';
        }
    }
    
    // Privacy consent validation
    else if (fieldName === 'privacy_consent' && field.type === 'checkbox') {
        if (!field.checked) {
            isValid = false;
            message = 'You must agree to the privacy policy';
        }
    }
    
    // Update field appearance
    updateFieldFeedback(field, isValid, message);
    
    return isValid;
}

function updateFieldFeedback(field, isValid, message) {
    const feedback = field.parentElement.querySelector('.form-feedback');
    
    // Remove existing classes
    field.classList.remove('valid', 'invalid');
    feedback.classList.remove('show', 'success', 'error');
    
    if (field.value.trim()) {
        // Add appropriate class
        field.classList.add(isValid ? 'valid' : 'invalid');
        
        // Show feedback
        if (message) {
            feedback.textContent = message;
            feedback.classList.add('show', isValid ? 'success' : 'error');
        }
    }
}

function clearFieldError(field) {
    const feedback = field.parentElement.querySelector('.form-feedback');
    field.classList.remove('invalid');
    feedback.classList.remove('show', 'error');
}

function validateAllFields() {
    const inputs = document.querySelectorAll('#contact-form input[required], #contact-form select[required], #contact-form textarea[required]');
    let allValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            allValid = false;
        }
    });
    
    return allValid;
}

// ===== SUCCESS MESSAGE =====
function showSuccessMessage() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    form.style.display = 'none';
    successMessage.classList.add('show');
    
    // Add confetti effect
    createConfetti();
}

function resetForm() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    
    // Reset form
    form.reset();
    form.style.display = 'flex';
    successMessage.classList.remove('show');
    
    // Reset button state
    submitBtn.classList.remove('loading', 'success');
    submitBtn.disabled = false;
    
    // Clear all field states
    const inputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    inputs.forEach(input => {
        input.classList.remove('valid', 'invalid');
        const feedback = input.parentElement.querySelector('.form-feedback');
        feedback.classList.remove('show', 'success', 'error');
    });
    
    // Reset character counter
    const charCounter = document.getElementById('char-count');
    if (charCounter) {
        charCounter.textContent = '0';
        charCounter.parentElement.classList.remove('warning', 'error');
    }
}

// ===== CONTACT METHODS =====
function initContactMethods() {
    const copyableMethods = document.querySelectorAll('.contact-method:not(.external-link)');
    
    copyableMethods.forEach(method => {
        method.addEventListener('click', () => {
            const content = method.querySelector('.method-content p').textContent;
            const type = method.querySelector('.method-content h3').textContent.toLowerCase();
            copyToClipboard(content, type);
        });
    });
}

function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(type);
        showNotification(`${capitalize(type)} copied to clipboard!`, 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
}

function showCopyFeedback(type) {
    const method = document.querySelector(`.${type}-icon`).closest('.contact-method');
    const feedback = method.querySelector('.copy-feedback');
    
    feedback.classList.add('show');
    
    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2000);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ===== FAQ SECTION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Animate the answer
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
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
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.contact-header, .contact-section, .faq-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
    
    // Observe contact methods with stagger
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        method.style.opacity = '0';
        method.style.transform = 'translateX(30px)';
        method.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(method);
    });
    
    // Observe FAQ items with stagger
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
        observer.observe(item);
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.contact-stats .stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('h')) {
                    // For "24h"
                    animateNumber(target, 0, 24, 1500, 'h');
                } else if (finalValue.includes('%')) {
                    // For "100%"
                    animateNumber(target, 0, 100, 2000, '%');
                } else {
                    // For regular numbers
                    const number = parseFloat(finalValue);
                    animateNumber(target, 0, number, 1000, '');
                }
                
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
            displayValue = current.toFixed(1);
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

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: confettiFall ${Math.random() * 3 + 2}s linear infinite;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// ===== ANALYTICS & TRACKING =====
function trackFormSubmission() {
    // Track form submission for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'contact',
            event_label: 'contact_form',
            value: 1
        });
    }
    
    console.log('📊 Form submission tracked');
}

function trackContactMethodClick(method) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_method_click', {
            event_category: 'contact',
            event_label: method,
            value: 1
        });
    }
    
    console.log(`📊 Contact method clicked: ${method}`);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 10000;
        font-weight: 500;
        max-width: 400px;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    
    const notificationStyles = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-icon {
            font-size: 1.2rem;
            flex-shrink: 0;
        }
        .notification-text {
            flex: 1;
            line-height: 1.4;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .notification-close:hover {
            opacity: 1;
        }
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto-remove after 5 seconds for success/info, 7 seconds for errors
    const autoRemoveTime = type === 'error' ? 7000 : 5000;
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification.querySelector('.notification-close'));
        }
    }, autoRemoveTime);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

function getNotificationBorderColor(type) {
    const colors = {
        success: '#059669',
        error: '#dc2626',
        warning: '#d97706',
        info: '#2563eb'
    };
    return colors[type] || colors.info;
}

function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== FORM AUTO-SAVE =====
function initFormAutoSave() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Load saved data
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`contact_form_${input.name}`);
        if (savedValue && input.type !== 'checkbox') {
            input.value = savedValue;
        } else if (savedValue && input.type === 'checkbox') {
            input.checked = savedValue === 'true';
        }
    });
    
    // Save data on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.type === 'checkbox') {
                localStorage.setItem(`contact_form_${input.name}`, input.checked);
            } else {
                localStorage.setItem(`contact_form_${input.name}`, input.value);
            }
        });
    });
    
    // Clear saved data on successful submission
    form.addEventListener('submit', () => {
        setTimeout(() => {
            inputs.forEach(input => {
                localStorage.removeItem(`contact_form_${input.name}`);
            });
        }, 2000);
    });
}

// ===== SMART FORM FEATURES =====
function initSmartFormFeatures() {
    const nameInput = document.getElementById('user_name');
    const emailInput = document.getElementById('user_email');
    const companyInput = document.getElementById('company');
    
    // Auto-capitalize name
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            const words = e.target.value.split(' ');
            const capitalizedWords = words.map(word => 
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            );
            e.target.value = capitalizedWords.join(' ');
        });
    }
    
    // Email domain suggestions
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            suggestEmailDomain(emailInput);
        });
    }
    
    // Auto-fill company from email domain
    if (emailInput && companyInput) {
        emailInput.addEventListener('blur', () => {
            if (!companyInput.value && emailInput.value) {
                const domain = emailInput.value.split('@')[1];
                if (domain && !isCommonEmailProvider(domain)) {
                    const companyName = domain.split('.')[0];
                    companyInput.value = companyName.charAt(0).toUpperCase() + companyName.slice(1);
                }
            }
        });
    }
}

function suggestEmailDomain(emailInput) {
    const email = emailInput.value;
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'algonquinlive.com'];
    
    if (email.includes('@')) {
        const [localPart, domain] = email.split('@');
        const suggestion = findClosestDomain(domain, commonDomains);
        
        if (suggestion && suggestion !== domain) {
            const correctedEmail = `${localPart}@${suggestion}`;
            
            if (confirm(`Did you mean: ${correctedEmail}?`)) {
                emailInput.value = correctedEmail;
                validateField(emailInput);
            }
        }
    }
}

function findClosestDomain(domain, commonDomains) {
    const threshold = 2; // Maximum edit distance
    let closest = null;
    let minDistance = Infinity;
    
    commonDomains.forEach(commonDomain => {
        const distance = levenshteinDistance(domain.toLowerCase(), commonDomain.toLowerCase());
        if (distance < minDistance && distance <= threshold) {
            minDistance = distance;
            closest = commonDomain;
        }
    });
    
    return closest;
}

function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

function isCommonEmailProvider(domain) {
    const commonProviders = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 
        'live.com', 'aol.com', 'icloud.com', 'protonmail.com'
    ];
    return commonProviders.includes(domain.toLowerCase());
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
            
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                closeNotification(notification.querySelector('.notification-close'));
            });
        }
    });
    
    // Window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Form focus management
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formInputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.type !== 'textarea') {
                e.preventDefault();
                const nextInput = formInputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.getElementById('submit-btn').focus();
                }
            }
        });
    });
    
    // Contact method click tracking
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const methodType = method.querySelector('.method-content h3').textContent.toLowerCase();
            trackContactMethodClick(methodType);
        });
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
    
    // Adjust FAQ layout on resize
    const faqItems = document.querySelectorAll('.faq-item.active .faq-answer');
    faqItems.forEach(answer => {
        answer.style.maxHeight = answer.scrollHeight + 'px';
    });
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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== INITIALIZE ADDITIONAL FEATURES =====
setTimeout(() => {
    initStatsCounter();
    initFormAutoSave();
    initSmartFormFeatures();
    
    // Add custom animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes pulseSuccess {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .submit-btn.success {
            animation: pulseSuccess 0.6s ease-out;
        }
    `;
    document.head.appendChild(animationStyles);
    
    console.log('🚀 All contact page features loaded successfully!');
}, 300);

// ===== EXPOSE GLOBAL FUNCTIONS =====
window.copyToClipboard = copyToClipboard;
window.resetForm = resetForm;
window.closeNotification = closeNotification;

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Contact Page Error:', e.error);
    
    if (window.location.hostname === 'localhost') {
        showNotification('A technical error occurred. Check console for details.', 'error');
    }
});

// ===== CLEANUP =====
window.addEventListener('beforeunload', () => {
    console.log('🧹 Cleaning up contact page resources...');
});

// ===== END OF CONTACT JAVASCRIPT =====
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

