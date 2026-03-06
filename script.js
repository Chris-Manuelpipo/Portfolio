
// ============================================
// NAVIGATION
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
}, { passive: true });

updateActiveNav();

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
 
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value; 
    const email   = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !subject || !message) {
        showStatus('Veuillez remplir tous les champs', 'error');
        return;
    }

    // Numéro WhatsApp au format international (sans + ni espaces)
    const phone = "237654804907";

    const text = `
        Bonjour M. Chris ETCHOME,

        Je me nomme ${name}.
        Mon email : ${email}.
        Je vous contacte au sujet de : ${subject}.

        Message :
        ${message}

        — Contact envoyé depuis votre Portfolio
    `;


    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    showStatus('💬 Redirection vers WhatsApp…', 'success');

    // Ouvre WhatsApp (mobile ou WhatsApp Web)
    setTimeout(() => {
    // mémorise qu’un message a déjà été affiché
    sessionStorage.setItem('contactStatusShown', '1');

    window.open(url, "_blank");

    // vider le formulaire
    contactForm.reset();
    }, 1500);
});


function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

// Basculer le thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    
    // Sauvegarder la préférence
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

window.addEventListener('load', () => {
    if (sessionStorage.getItem('contactStatusShown')) {
        formStatus.style.display = 'none';
        sessionStorage.removeItem('contactStatusShown');
    }
});
