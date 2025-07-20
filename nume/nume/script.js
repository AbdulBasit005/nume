// Optional: Add interactivity for language selection or buttons if needed
// For now, this file can be empty or used for future enhancements

// Scroll-triggered animations for fade-in, slide-in, zoom-in, and staggered children
function animateOnScroll(selector, activeClass, stagger = false) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (stagger) {
            entry.target.classList.add('stagger-active');
            // Stagger children
            const children = entry.target.children;
            Array.from(children).forEach((child, idx) => {
              child.style.transitionDelay = `${idx * 120}ms`;
            });
          } else {
            entry.target.classList.add(activeClass);
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach(el => observer.observe(el));
}

// --- Language Switcher ---
const translations = {
  en: {
    nav_home: 'HOME',
    nav_about: 'ABOUT US',
    nav_services: 'SERVICES',
    nav_contact: 'CONTACT US',
    nav_signin: 'SIGN IN',
    hero_title: 'Your Health,<br>A Click Away',
    hero_desc: 'Access doctors, specialists, lab tests, prescriptions, and pharmacy services — all from your home.',
    hero_book: 'Book A Doctor',
    hero_order: 'Order Medicine',
    services_title: 'Services',
    services_subtitle: 'Comprehensive Care, Anytime, Anywhere.',
    services_desc: 'From doctor consultations to lab tests, prescriptions, and medicine delivery — NOME offers all-in-one medical care, accessible anytime, anywhere.',
    service1_title: 'General Consultation',
    service1_desc: 'Connect instantly with certified general physicians for common health issues.',
    service2_title: 'Specialist Appointment',
    service2_desc: 'Book virtual or physical appointments with top specialists.',
    service3_title: 'Lab Testings',
    service3_desc: 'Home sample collection and instant lab reports made easy.'
  },
  fr: {
    nav_home: 'ACCUEIL',
    nav_about: 'À PROPOS',
    nav_services: 'SERVICES',
    nav_contact: 'CONTACT',
    nav_signin: 'SE CONNECTER',
    hero_title: 'Votre santé,<br>à portée de clic',
    hero_desc: 'Accédez à des médecins, spécialistes, analyses, ordonnances et pharmacie — tout depuis chez vous.',
    hero_book: 'Prendre rendez-vous',
    hero_order: 'Commander des médicaments',
    services_title: 'Services',
    services_subtitle: 'Soins complets, à tout moment, partout.',
    services_desc: 'Des consultations médicales aux analyses, ordonnances et livraison de médicaments — NOME offre des soins complets accessibles à tout moment, partout.',
    service1_title: 'Consultation Générale',
    service1_desc: 'Consultez instantanément des médecins généralistes certifiés pour des problèmes courants.',
    service2_title: 'Rendez-vous Spécialiste',
    service2_desc: 'Prenez rendez-vous virtuel ou physique avec les meilleurs spécialistes.',
    service3_title: 'Analyses de Laboratoire',
    service3_desc: 'Prélèvement à domicile et rapports de laboratoire instantanés.'
  },
  es: {
    nav_home: 'INICIO',
    nav_about: 'SOBRE NOSOTROS',
    nav_services: 'SERVICIOS',
    nav_contact: 'CONTACTO',
    nav_signin: 'INICIAR SESIÓN',
    hero_title: 'Tu salud,<br>a un clic',
    hero_desc: 'Accede a médicos, especialistas, análisis, recetas y farmacia — todo desde tu hogar.',
    hero_book: 'Reservar un médico',
    hero_order: 'Pedir medicina',
    services_title: 'Servicios',
    services_subtitle: 'Atención integral, en cualquier momento y lugar.',
    services_desc: 'Desde consultas médicas hasta análisis, recetas y entrega de medicamentos — NOME ofrece atención médica integral, accesible en cualquier momento y lugar.',
    service1_title: 'Consulta General',
    service1_desc: 'Conéctate al instante con médicos generales certificados para problemas comunes.',
    service2_title: 'Cita con Especialista',
    service2_desc: 'Reserva citas virtuales o presenciales con los mejores especialistas.',
    service3_title: 'Análisis de Laboratorio',
    service3_desc: 'Toma de muestras a domicilio e informes de laboratorio instantáneos.'
  }
};

function setLanguage(lang) {
  localStorage.setItem('siteLang', lang);
  const dict = translations[lang] || translations['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });
  // Set the select value
  const select = document.getElementById('languageSelect');
  if (select) select.value = lang;
}

window.addEventListener('DOMContentLoaded', () => {
  // Fade-in for sections
  animateOnScroll('.animated-fadein', 'fadein-active');
  // Slide-in for why-nume cards
  animateOnScroll('.animated-slidein', 'slidein-active');
  // Zoom-in for specialist cards
  animateOnScroll('.animated-zoomin', 'zoomin-active');
  // Staggered for services and testimonials
  animateOnScroll('.stagger-children', '', true);
  // Language switcher
  const select = document.getElementById('languageSelect');
  let lang = localStorage.getItem('siteLang') || 'en';
  setLanguage(lang);
  if (select) {
    select.value = lang;
    select.addEventListener('change', e => {
      setLanguage(e.target.value);
    });
  }
});