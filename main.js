/**
 * Isac.Dev - Premium Portfolio Logic
 * Full Overhaul for Elite Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initCursor();
    initScrollReveal();
    initTerminal();
    initProjectFilters();
    initCommandCenter();
});

// --- 1. Interactive Neural Network Background ---
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

            // Mouse interaction
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);

                if (distance < connectionDistance) {
                    ctx.strokeStyle = `rgba(6, 182, 212, ${1 - (distance / connectionDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// --- 2. Custom Cursor ---
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        follower.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
    });

    document.querySelectorAll('a, button, .terminal-card').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2)';
            cursor.style.borderColor = 'var(--secondary)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2)', '');
            cursor.style.borderColor = 'var(--primary)';
        });
    });
}

function animateNumber(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // If it's a skill card, fill the bars
                if (entry.target.classList.contains('skill-card')) {
                    const fill = entry.target.querySelector('.skill-bar-fill');
                    const percent = fill.getAttribute('data-percent');
                    fill.style.width = percent + '%';
                    
                    // Animate the number counter
                    const percentText = entry.target.querySelector('.skill-percent');
                    animateNumber(percentText, 0, parseInt(percent), 1500);
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section, .skill-card').forEach(el => {
        observer.observe(el);
    });
}

// --- 4. Terminal Logic ---
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-content');

    const commands = {
        help: "Comandos disponíveis: sobre, stack, projetos, contato, clear",
        sobre: "Sou um Engenheiro de Software focado em criar sistemas modernos e escaláveis.",
        stack: "Stack: Arquitetura, Design UX/UI, Segurança, Sistemas Cloud.",
        projetos: "Confira meu portfólio abaixo na seção de projetos em destaque.",
        contato: "Email: contato@isac.dev | LinkedIn: /in/isacdev",
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.toLowerCase().trim();
            const response = commands[cmd] || `Comando não reconhecido: ${cmd}. Digite 'help'.`;
            
            if (cmd === 'clear') {
                output.innerHTML = '';
            } else {
                const line = document.createElement('p');
                line.className = 't-res';
                line.innerHTML = `> ${cmd}<br><span style="color: var(--text-muted)">${response}</span>`;
                output.appendChild(line);
            }
            
            input.value = '';
            output.parentElement.scrollTop = output.parentElement.scrollHeight;
        }
    });
}

// --- 5. Project Filters ---
function initProjectFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filters.forEach(f => f.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    project.classList.remove('hide');
                    setTimeout(() => {
                        project.classList.remove('fade-out');
                    }, 50);
                } else {
                    project.classList.add('fade-out');
                    setTimeout(() => {
                        project.classList.add('hide');
                    }, 500);
                }
            });
        });
    });
}

// --- 6. Command Center (3D Tilt & HUD) ---
function initCommandCenter() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.boxShadow = `${rotateY * -2}px ${rotateX * 2}px 50px rgba(6, 182, 212, 0.25)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.boxShadow = 'none';
        });
    });
}
