/**
 * Isac.Dev - Elite Cyber-HUD Portfolio Logic
 * Restoration to icon-based version (Turn 10/11)
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initScrollReveal();
    initTerminal();
    initCommandCenter();
});

// --- 1. Interactive Neural Network (Canvas) ---
function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 80;
    
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
        }

        draw() {
            ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
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
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// --- 2. Scroll Reveal ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-section').forEach(el => {
        observer.observe(el);
    });
}

// --- 3. Terminal CLI Logic ---
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

// --- 4. Command Center (3D Tilt & HUD) ---
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
