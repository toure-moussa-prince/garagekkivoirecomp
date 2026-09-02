/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

});


/* =====================================================
   MENU MOBILE
===================================================== */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navbar.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Fermer le menu après clic */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   HEADER AU SCROLL
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   LIEN ACTIF
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* =====================================================
   COMPTEURS
===================================================== */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    const stats = document.querySelector(".stats");

    if (!stats) return;

    const position = stats.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom >= 0) {

        countersStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(target / 70)
            );

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                counter.textContent =
                    current.toLocaleString("fr-FR");

            }, 25);

        });

    }

}

window.addEventListener("scroll", startCounters);
startCounters();


/* =====================================================
   FAQ
===================================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isOpen = item.classList.contains("open");

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });

        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});



/* =====================================================
   FORMULAIRE
===================================================== */

const contactForm =
    document.getElementById("contact-form");

const formMessage =
    document.getElementById("form-message");


contactForm.addEventListener("submit", (event) => {

    const name =
        document.getElementById("nom").value.trim();

    const phone =
        document.getElementById("telephone").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !phone || !message) {

        event.preventDefault();

        formMessage.textContent =
            "Veuillez remplir les champs obligatoires.";

        formMessage.style.color = "#e50914";

        return;

    }

    formMessage.textContent =
        "Envoi de votre message...";

    formMessage.style.color = "#25d366";

});

            

    /*
       IMPORTANT :

       Cette partie affiche seulement un message côté navigateur.

       Pour recevoir réellement les messages par email,
       il faudra connecter le formulaire à un service
       comme FormSubmit, Formspree ou un backend.
    */

    contactForm.reset();



/* =====================================================
   BOUTON RETOUR EN HAUT
===================================================== */

const backTop =
    document.getElementById("back-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   ANIMATION DES ELEMENTS
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .process-step, .review-card, .expertise-card, .gallery-item"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: .15
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});


/* =====================================================
   ANNEE AUTOMATIQUE
===================================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();
