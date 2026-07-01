/* =========================================================
   Yedi Supriadi — Portfolio & CV
   Interaksi & animasi
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    setTimeout(() => $("#preloader")?.classList.add("done"), 900);
  });

  /* ---------- Tahun footer ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll + progress ---------- */
  const nav = $("#nav");
  const progress = $("#scrollProgress");
  const toTop = $("#toTop");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    toTop.classList.toggle("show", y > 500);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (y / h) * 100 + "%";
    highlightNav();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  toTop?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ---------- Menu mobile ---------- */
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  toggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  $$(".nav__link").forEach((l) =>
    l.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    })
  );

  /* ---------- Highlight nav aktif ---------- */
  const sections = $$("main section[id]");
  function highlightNav() {
    const pos = window.scrollY + 120;
    let current = "";
    sections.forEach((sec) => {
      if (pos >= sec.offsetTop) current = sec.id;
    });
    $$(".nav__link").forEach((l) =>
      l.classList.toggle("active", l.getAttribute("href") === "#" + current)
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Skill bars ---------- */
  const skillIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          $$("i[data-w]", e.target).forEach((bar) => {
            bar.style.width = bar.dataset.w + "%";
          });
          skillIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  const skillsBox = $(".about__skills");
  if (skillsBox) skillIO.observe(skillsBox);

  /* ---------- Counter angka ---------- */
  function animateCount(el, target, dur = 1600) {
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }
  const countIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target, +e.target.dataset.count);
          countIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => countIO.observe(el));

  // Badge hero (tahun & proyek)
  const hy = $("#stat-years"),
    hp = $("#stat-projects");
  const heroStatIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (hy) animateCount(hy, 8, 1400);
          if (hp) animateCount(hp, 120, 1600);
          heroStatIO.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  if (hy) heroStatIO.observe(hy);

  /* ---------- Efek ketik (typing) ---------- */
  const typedEl = $("#typed");
  if (typedEl) {
    const roles = [
      "Profesional Kreatif",
      "Problem Solver",
      "Kolaborator Andal",
      "Yedi Supriadi",
    ];
    let ri = 0,
      ci = 0,
      deleting = false;
    const tick = () => {
      const word = roles[ri];
      typedEl.textContent = word.slice(0, ci);
      if (!deleting && ci < word.length) {
        ci++;
      } else if (deleting && ci > 0) {
        ci--;
      } else if (!deleting && ci === word.length) {
        deleting = true;
        return setTimeout(tick, 1600);
      } else {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
      setTimeout(tick, deleting ? 45 : 95);
    };
    tick();
  }

  /* ---------- Tilt foto hero ---------- */
  const tilt = $("[data-tilt]");
  if (tilt && window.matchMedia("(pointer:fine)").matches) {
    const strength = 10;
    tilt.addEventListener("mousemove", (e) => {
      const r = tilt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
    });
    tilt.addEventListener("mouseleave", () => {
      tilt.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
    });
  }

  /* ---------- Filter portfolio ---------- */
  const filters = $$(".filter");
  const cards = $$(".card");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("hide", !show);
      });
    })
  );

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let visible = [];
  let idx = 0;

  function openLB(i) {
    visible = cards.filter((c) => !c.classList.contains("hide"));
    idx = i;
    updateLB();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  }
  function updateLB() {
    const card = visible[idx];
    const img = $("img", card);
    const title = $("h4", card)?.textContent || "";
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = title;
  }
  function closeLB() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
  }
  cards.forEach((card) =>
    card.addEventListener("click", () => {
      const vis = cards.filter((c) => !c.classList.contains("hide"));
      openLB(vis.indexOf(card));
    })
  );
  $("#lbClose")?.addEventListener("click", closeLB);
  $("#lbNext")?.addEventListener("click", () => {
    idx = (idx + 1) % visible.length;
    updateLB();
  });
  $("#lbPrev")?.addEventListener("click", () => {
    idx = (idx - 1 + visible.length) % visible.length;
    updateLB();
  });
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) closeLB();
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowRight") $("#lbNext").click();
    if (e.key === "ArrowLeft") $("#lbPrev").click();
  });

  /* ---------- Form kontak (demo, tanpa backend) ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const msg = $("#message").value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !msg) {
      note.textContent = "Mohon lengkapi nama, email, dan pesan.";
      note.className = "form-note err";
      return;
    }
    if (!emailOk) {
      note.textContent = "Format email tidak valid.";
      note.className = "form-note err";
      return;
    }
    note.textContent = "Terima kasih, " + name + "! Pesan Anda telah tercatat.";
    note.className = "form-note ok";
    form.reset();
    // Untuk pengiriman nyata, hubungkan ke layanan seperti Formspree / EmailJS.
  });

  /* ---------- Custom cursor ---------- */
  const dot = $("#cursorDot");
  const ring = $("#cursorRing");
  if (dot && ring && window.matchMedia("(pointer:fine)").matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    $$("[data-cursor='hover'], a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
  }

  // Inisialisasi state awal
  onScroll();
})();
