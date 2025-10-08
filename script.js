// 1) Évszám a láblécben
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 2) Mobil menü nyit/zár
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("navmenu");
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("show");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

// 3) Sima görgetés belső linkekre
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      menu?.classList.remove("show");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });
});

// 4) Egyszerű űrlap-ellenőrzés + visszajelzés
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Küldés…";
    statusEl.style.color = "";

    if (!form.checkValidity()) { form.reportValidity(); return; }

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "Köszi! Hamarosan jelentkezem.";
        statusEl.style.color = "green";
      } else {
        statusEl.textContent = "Hoppá, valami hiba történt. Próbáld újra később!";
        statusEl.style.color = "crimson";
      }
    } catch {
      statusEl.textContent = "Hálózati hiba. Ellenőrizd az internetet!";
      statusEl.style.color = "crimson";
    }
  });
}


// 5) Scroll-reveal (belibbenő animációk)
// Scroll-reveal (ismétlődő belibbenés oda-vissza)
const revealEls = document.querySelectorAll('.reveal, .cards .card, details');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
      } else {
        e.target.classList.remove('show');
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('show'));
}


