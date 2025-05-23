
// Navbar hide/show on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScroll = currentScroll;

    // Back to Top visibility
    const backToTop = document.getElementById('backToTop');
    if (currentScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Smooth scroll
document.querySelectorAll('.nav-link, .back-to-top').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1) || 'home';
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Parallax for wheel
gsap.to('.canvas', {
    y: 50,
    scrollTrigger: {
        trigger: '.Work',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    }
});

// Section animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }
            );
            // Trigger skill bar animation
            if (entry.target.id === 'skills') {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    const delay = parseFloat(item.getAttribute('data-delay')) || (index * 0.15);
                    gsap.fromTo(item,
                        { opacity: 0, y: 20, scale: 0.95 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: 'expo.out',
                            delay: delay
                        }
                    );
                    item.classList.add('visible');
                });
                const bars = entry.target.querySelectorAll('.power-fill');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
                const radarChart = entry.target.querySelector('.radar-chart');
                if (radarChart) {
                    gsap.fromTo(radarChart,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out', delay: 0.5 }
                    );
                    radarChart.classList.add('visible');
                }
            }
            // Trigger timeline animation
            if (entry.target.id === 'education') {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    const delay = parseFloat(item.getAttribute('data-delay')) || (index * 0.2);
                    gsap.fromTo(item,
                        { opacity: 0, y: 30, scale: 0.95 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: 'expo.out',
                            delay: delay
                        }
                    );
                    item.classList.add('visible');
                });
            }
            // Trigger about info cards
            if (entry.target.id === 'about') {
                const infoCards = entry.target.querySelectorAll('.info-card');
                gsap.fromTo(infoCards,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'expo.out',
                        stagger: 0.1
                    }
                );
            }
            // Trigger hobbies items
            if (entry.target.id === 'hobbies') {
                const hobbiesItems = entry.target.querySelectorAll('.hobbies-item');
                gsap.fromTo(hobbiesItems,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'expo.out',
                        stagger: 0.1
                    }
                );
            }
            // Trigger testimonials
            if (entry.target.id === 'testimonials') {
                const testimonialItems = entry.target.querySelectorAll('.testimonial-item');
                gsap.fromTo(testimonialItems,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'expo.out',
                        stagger: 0.1
                    }
                );
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

// Fade-in animation
const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Blink effect
const blinkElements = document.querySelectorAll('.blink-text, section h3');
const blinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('blink-active');
        } else {
            entry.target.classList.remove('blink-active');
            void entry.target.offsetWidth;
        }
    });
}, { threshold: 0.5 });

blinkElements.forEach(element => {
    blinkObserver.observe(element);
});

// Radar Chart
const canvas = document.querySelector('.radar-chart');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const skills = [90, 85, 80, 75, 70];
    const labels = ['HTML & CSS', 'JavaScript', 'Python', 'React', 'Git'];
    function drawRadarChart() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 3.5;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Background grid
        ctx.beginPath();
        ctx.strokeStyle = '#c7d2fe';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.moveTo(centerX, centerY - (radius * i / 5));
            for (let j = 1; j <= 5; j++) {
                const angle = (j * 2 * Math.PI / 5) - Math.PI / 2;
                ctx.lineTo(centerX + Math.cos(angle) * (radius * i / 5), centerY + Math.sin(angle) * (radius * i / 5));
            }
            ctx.closePath();
            ctx.stroke();
        }
        // Axes
        ctx.beginPath();
        ctx.strokeStyle = '#475569';
        for (let i = 0; i < 5; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        }
        ctx.stroke();
        // Animated chart
        gsap.fromTo({ progress: 0 },
            { progress: 1, duration: 1.5, ease: 'expo.out' },
            {
                onUpdate: function () {
                    ctx.beginPath();
                    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
                    gradient.addColorStop(0, '#1e40af');
                    gradient.addColorStop(1, '#3b82f6');
                    ctx.fillStyle = 'rgba(30, 64, 175, 0.3)';
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2.5;
                    for (let i = 0; i < skills.length; i++) {
                        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
                        const value = (skills[i] / 100 * radius) * this.targets()[0].progress;
                        ctx.lineTo(centerX + Math.cos(angle) * value, centerY + Math.sin(angle) * value);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                }
            }
        );
        // Labels
        ctx.fillStyle = '#1e293b';
        ctx.font = '14px Poppins';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 3;
        for (let i = 0; i < labels.length; i++) {
            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius + 28);
            const y = centerY + Math.sin(angle) * (radius + 28);
            ctx.fillText(labels[i], x, y);
        }
        ctx.shadowBlur = 0;
    }
    drawRadarChart();

    // Resize radar chart
    function resizeCanvas() {
        const maxWidth = Math.min(320, window.innerWidth * 0.7);
        canvas.width = maxWidth;
        canvas.height = maxWidth;
        drawRadarChart();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

// Particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } },
        color: { value: '#1e40af' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#1e40af', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 1.5, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Modal for projects
const modal = document.getElementById('projectModal');
const modalContent = document.querySelector('.modal-content');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal .close');
const projectFaces = document.querySelectorAll('.face');

const projects = [
    { title: 'Dự án 1', description: 'Website thương mại điện tử với React và Firebase.', image: 'https://via.placeholder.com/250x200?text=Project+1', link: 'javascript:void(0)' },
    { title: 'Dự án 2', description: 'Ứng dụng quản lý công việc với JavaScript và Node.js.', image: 'https://via.placeholder.com/250x200?text=Project+2', link: 'javascript:void(0)' },
    { title: 'Dự án 3', description: 'Portfolio cá nhân sử dụng HTML, CSS, và GSAP.', image: 'https://via.placeholder.com/250x200?text=Project+3', link: 'javascript:void(0)' },
    { title: 'Dự án 4', description: 'Ứng dụng di động với React Native.', image: 'https://via.placeholder.com/250x200?text=Project+4', link: 'javascript:void(0)' },
    { title: 'Dự án 5', description: 'API RESTful với Python và Flask.', image: 'https://via.placeholder.com/250x200?text=Project+5', link: 'javascript:void(0)' },
    { title: 'Dự án 6', description: 'Hệ thống đặt lịch với MongoDB.', image: 'https://via.placeholder.com/250x200?text=Project+6', link: 'javascript:void(0)' }
];

projectFaces.forEach(face => {
    face.addEventListener('click', () => {
        const projectId = face.getAttribute('data-project') - 1;
        modalTitle.textContent = projects[projectId].title;
        modalDescription.textContent = projects[projectId].description;
        modalImage.src = projects[projectId].image;
        document.querySelector('.modal-content .detail-btn').href = projects[projectId].link;
        modal.style.display = 'flex';
        setTimeout(() => modalContent.classList.add('show'), 10);
    });
});

closeModal.addEventListener('click', () => {
    modalContent.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 400);
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modalContent.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 400);
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button');
    button.classList.add('loading');
    button.disabled = true;
    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;
        alert('Tin nhắn đã được gửi! (Đây là demo)');
        contactForm.reset();
    }, 2000);
});