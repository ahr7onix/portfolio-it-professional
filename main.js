// --- TERMINAL LOGIC ---
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');
const typewriterElement = document.getElementById('typewriter-text');

const welcomeMessage = "Bem-vindo ao System v2.0. Digite 'help' para comandos.";

const commands = {
        'help': "Comandos disponiveis: about, skills, projects, contact, clear",
        'about': "Isac | Engenheiro de Software focado em criar produtos de alto impacto visual e tecnico.",
        'skills': "Stack: React, Node.js, Python, AWS, Docker, Kubernetes, CyberSecurity.",
        'projects': "Projetos: Nexus Payment Gateway, Cognitive OS (AI). Veja a secao abaixo!",
        'contact': "E-mail: contato@isac.dev | Discord: Isac.dev#0000",
        'clear': ""
};

function typewriter(text, i = 0) {
        if (i < text.length) {
                    typewriterElement.innerHTML += text.charAt(i);
                    setTimeout(() => typewriter(text, i + 1), 50);
        }
}

terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
                    const input = terminalInput.value.toLowerCase().trim();
                    const response = commands[input] || `Comando nao reconhecido: ${input}. Digite 'help' para ajuda.`;

            const output = document.createElement('p');
                    output.className = 'line';
                    output.innerHTML = `<span>></span> ${input}<br>${response}`;

            if (input === 'clear') {
                            document.getElementById('terminal-output').innerHTML = '';
            } else {
                            document.getElementById('terminal-output').appendChild(output);
            }

            terminalInput.value = '';
                    terminalBody.scrollTop = terminalBody.scrollHeight;
        }
});

// --- REVEAL ON SCROLL ---
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
                    if (entry.isIntersecting) {
                                    entry.target.style.opacity = '1';
                                    entry.target.style.transform = 'translateY(0)';
                                    observer.unobserve(entry.target);
                    }
        });
}, observerOptions);

document.querySelectorAll('.skill-card, .p-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = '0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                                    behavior: 'smooth'
                    });
        });
});

// Initial sequence
window.onload = () => {
        typewriter(welcomeMessage);
};

// --- TILT EFFECT (Simple) ---
document.querySelectorAll('.tilt').forEach(el => {
        el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                                    const xc = rect.width / 2;
                    const yc = rect.height / 2;

                                    const dx = x - xc;
                    const dy = y - yc;

                                    el.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-10px)`;
        });

                                               el.addEventListener('mouseleave', () => {
                                                           el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)`;
                                               });
});
