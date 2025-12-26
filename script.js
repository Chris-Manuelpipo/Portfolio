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
                updateActiveNav(link);
            });
        });

        function updateActiveNav(currentLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            currentLink.classList.add('active');
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            const sections = document.querySelectorAll('section');
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        });

        const form = document.getElementById("contactForm");
        const status = document.getElementById("formStatus");

        form.addEventListener("submit", async e => {
        e.preventDefault();

        const data = new FormData(form);

        const res = await fetch("send-mail.php", {
            method: "POST",
            body: data
        });

        const text = await res.text();

        if(text === "OK"){
            status.textContent = "Message envoyé avec succès.";
            form.reset();
        } else {
            status.textContent = "Erreur lors de l’envoi.";
        }
        });


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
