// Rahul Singh Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initHeaderScroll();
    initSmoothScroll();
    initBackToTop();
    initTypingEffect();

    // Add loading class removal after page load
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        startScrollAnimations();
    });
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Update active nav link on scroll
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Header scroll effects
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = 70; // Adjust based on header height
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();

            // In a real implementation, you would send the data to a server
            // Example: sendContactForm(name, email, subject, message);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 9999;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations to CSS dynamically
const notificationStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.timeline__item, .project__card, .skills__category, .education__item, .highlight__item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function startScrollAnimations() {
    initScrollAnimations();
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    const originalText = heroTitle.innerHTML;
    const nameSpan = heroTitle.querySelector('.hero__name');

    if (nameSpan) {
        const nameText = nameSpan.textContent;
        let displayText = heroTitle.innerHTML.replace(nameSpan.outerHTML, '');
        let nameIndex = 0;

        // Clear the name initially
        nameSpan.textContent = '';

        // Typing animation for the name
        function typeNextChar() {
            if (nameIndex < nameText.length) {
                nameSpan.textContent += nameText.charAt(nameIndex);
                nameIndex++;
                setTimeout(typeNextChar, 100);
            }
        }

        // Start typing after a delay
        setTimeout(typeNextChar, 1000);
    }
}

// Skill bars animation (if you want to add skill level indicators)
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__bar');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        if (level) {
            bar.style.width = level + '%';
        }
    });
}

// Parallax effect for hero background
function initParallax() {
    const heroBackground = document.querySelector('.hero__background');

    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax on load
window.addEventListener('load', function() {
    initParallax();
});

// Download resume function
function downloadResume() {
    const a = document.createElement('a');
    a.href = 'assets/RAHUL-SINGH-Resume.pdf'; // relative path, not starting with /
    a.download = 'Rahul_Singh_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showNotification('Resume downloaded successfully!', 'success');
}



// Create resume content
function createResumeContent() {
    return `RAHUL SINGH
Senior Software Engineer | Android & Java Backend | Microservices | Cloud | Fintech
Email: rahul.singh79179@gmail.com | Phone: +91-9890354105
LinkedIn: https://linkedin.com/in/rahuls190 | GitHub: https://github.com/Rahulsingh190

PROFESSIONAL SUMMARY
Versatile Senior Software Engineer with 4.8+ years of proven expertise building high-performance backend microservices and scalable Android applications for fintech, IoT, and enterprise domains. Experienced in designing cloud-native distributed systems, optimizing mobile user experiences, and delivering mission-critical platforms processing millions of transactions.

TECHNICAL EXPERTISE
Backend Development:
- Languages: Java 8/11/17, Kotlin, Python, SQL
- Frameworks: Spring Boot, Spring Cloud, Hibernate, Micronaut
- Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
- Cloud & DevOps: AWS (EKS, Lambda, RDS, S3), Docker, Kubernetes, Terraform, Jenkins, CI/CD
- Messaging/Streaming: Kafka, RabbitMQ, ActiveMQ

Android Development:
- Languages & Tools: Kotlin, Java, XML, Android SDK, Android Studio, Gradle
- Architecture: MVVM, Clean Architecture, Repository Pattern
- Libraries: Jetpack (Compose, Room, LiveData, ViewModel, Navigation, WorkManager), Retrofit, OkHttp
- Others: Hilt/Dagger, Firebase, Coroutines, RxJava, Espresso, Mockito

Architecture & Practices:
- Microservices, Event-Driven Systems, CQRS, DDD
- Secure Authentication (OAuth2, JWT, Biometric, AES-256)
- TDD, CI/CD, Monitoring (Prometheus, Grafana, ELK)

PROFESSIONAL EXPERIENCE

Senior Software Engineer | Programming.com, Mohali/Pune | May 2024 – Present
- Architected and delivered Bajaj Vehicle Loan Platform across Android and backend systems, enabling 500K+ customers to apply, track, and manage loans with sub-2s approvals
- Designed microservices architecture with Spring Boot, Kafka, and AWS EKS for EMI, KYC, fraud detection, and credit scoring workflows
- Developed the companion Android app using Kotlin + Jetpack Compose with biometric login, loan calculator, and 4.6+ Play Store rating
- Integrated 20+ third-party APIs (banks, payment gateways, bureaus), reducing loan processing time by 65%
- Optimized backend queries & mobile performance (35% faster load times, 95% crash-free rate)

Software Engineer | Launch Ventures, Hyderabad | Nov 2020 – Apr 2024
- Built 8+ fintech & IoT applications with Java/Spring Boot and Android, scaling to 150M+ monthly transactions
- Developed POS systems for Android with offline-first billing, inventory sync, and real-time settlements across 200+ stores
- Created fitness mobile app with wearable integration and gamification, reaching 100K+ downloads
- Engineered high-throughput APIs with <200ms response time and secure OAuth2/JWT authentication
- Implemented CI/CD for backend + Android, reducing release cycle by 70% and ensuring zero-downtime deployments
- Mentored 4 developers in Spring Boot, Android MVVM, and TDD, boosting productivity and code quality

EDUCATION
Bachelor of Technology (B.Tech) in Computer Science
Pune Institute of Computer Technology (SPPU) | CGPA: 7.09/10

Diploma in Computer Engineering
Sou. Venutai Chavan Polytechnic College (MSBTE) | 84.24%

For detailed project portfolio and more information, visit: https://rahulsingh190.github.io/myportfolio/`;
}

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (window.innerWidth > 768) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
    }
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Performance optimization: Preload critical resources
function preloadResources() {
    const criticalResources = [
        'images/hero-bg.png',
        'images/profile-avatar.png'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', function() {
    preloadResources();
});

// Console welcome message
console.log(`
    ██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗         ███████╗██╗███╗   ██╗ ██████╗ ██╗  ██╗
    ██╔══██╗██╔══██╗██║  ██║██║   ██║██║         ██╔════╝██║████╗  ██║██╔════╝ ██║  ██║
    ██████╔╝███████║███████║██║   ██║██║         ███████╗██║██╔██╗ ██║██║  ███╗███████║
    ██╔══██╗██╔══██║██╔══██║██║   ██║██║         ╚════██║██║██║╚██╗██║██║   ██║██╔══██║
    ██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗    ███████║██║██║ ╚████║╚██████╔╝██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝

    Welcome to Rahul Singh's Portfolio!
    Senior Software Engineer | Android & Java Backend

    📧 rahul.singh79179@gmail.com
    🔗 https://linkedin.com/in/rahuls190
    💻 https://github.com/Rahulsingh190

    Looking for collaboration opportunities? Let's connect!
`);