// Bootstrap Registration Project - JavaScript functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initializeFormValidation();
    
    // Add smooth scrolling to navigation links
    initializeSmoothScrolling();
    
    // Add fade-in animation to sections
    initializeAnimations();
    
    // Initialize interactive features
    initializeInteractiveFeatures();
});

/**
 * Initialize Bootstrap form validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (form.checkValidity()) {
                handleFormSubmission(form);
            }
            
            form.classList.add('was-validated');
        });
    });
}

/**
 * Handle form submission
 */
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate form processing
    setTimeout(() => {
        // Get form data
        const formData = new FormData(form);
        const userData = {
            firstName: formData.get('firstName') || document.getElementById('firstName').value,
            lastName: formData.get('lastName') || document.getElementById('lastName').value,
            email: formData.get('email') || document.getElementById('email').value
        };
        
        // Add to table
        addUserToTable(userData);
        
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Registration successful!');
    }, 1500);
}

/**
 * Add user data to the submissions table
 */
function addUserToTable(userData) {
    const tableBody = document.querySelector('#userTable tbody');
    if (!tableBody) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${escapeHtml(userData.firstName)}</td>
        <td>${escapeHtml(userData.lastName)}</td>
        <td>${escapeHtml(userData.email)}</td>
    `;
    
    // Add fade-in animation
    row.style.opacity = '0';
    row.style.transform = 'translateY(20px)';
    
    tableBody.appendChild(row);
    
    // Animate in
    setTimeout(() => {
        row.style.transition = 'all 0.5s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
    }, 100);
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 3000);
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

/**
 * Initialize fade-in animations
 */
function initializeAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize interactive features
 */
function initializeInteractiveFeatures() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effect to form inputs
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

/**
 * Utility function to escape HTML
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Utility function to validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Export functions for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        escapeHtml,
        isValidEmail
    };
}