// =========================================
// Scroll Restoration
// =========================================
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // Navigation & Menu
  // =========================================
  const hamburger = document.getElementById("hamburger-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const closeMenu = document.getElementById("close-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function openMenu() {
    navOverlay.classList.add("active");
    navOverlay.setAttribute("aria-hidden", "false");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenuFunc() {
    navOverlay.classList.remove("active");
    navOverlay.setAttribute("aria-hidden", "true");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeMenuFunc);

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenuFunc);
  });

  // =========================================
  // Language Toggle
  // =========================================
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");
  let currentLang = "en";

  const translations = {
    ja: {
      navTop: "TOP",
      navDoctrine: "理念",
      navMembers: "チームメンバー",
      navAchievements: "大会実績",
      navPartners: "スポンサー様",
      navApply: "お問い合わせ",
      heroSubtitle: "EST. 2026 / Nagasaki",
      secDoctrine: "理念",
      aboutCore: "CORE PHILOSOPHY",
      aboutLead:
        "ASTRANOVA は、長崎のチームである。<strong>勝敗は通過点</strong>に過ぎない。<br>私たちが追い求めているのは、まだ誰も辿り着いていない景色そのものだ。",
      aboutLog1: "LOG_001 / 設立 ―― 2026年、長崎を起点に始動。",
      aboutLog2: "LOG_002 / 目標 ―― 長崎から世界を揺らすこと。",
      aboutLog3: "LOG_003 / 現在 ―― 世界へ向けた第一歩の始動。",
      secMembers: "チームメンバー",
      secAchievements: "大会実績",
      awaitingData: "AWAITING RECORD...",
      secPartners: "スポンサー様",
      secApply: "お問い合わせ",
      formType: "CATEGORY",
      formSelect: "選択してください",
      formOptPlayer: "プレイヤー募集 (PLAYER)",
      formOptManager: "マネージャー募集 (MANAGER)",
      formOptDesigner: "デザイナー募集 (DESIGNER)",
      formOptOther: "その他お問い合わせ (OTHER)",
      formName: "NAME",
      formEmail: "EMAIL",
      formMessage: "MESSAGE",
      formSubmit: "SEND APPLICATION",
    },
    en: {
      navTop: "TOP",
      navDoctrine: "Philosophy",
      navMembers: "Team Members",
      navAchievements: "Competition Results",
      navPartners: "Sponsor",
      navApply: "Contact Us",
      heroSubtitle: "EST. 2026 / Nagasaki",
      secDoctrine: "Philosophy",
      aboutCore: "CORE PHILOSOPHY",
      aboutLead:
        "ASTRANOVA is a Nagasaki-based team. <strong>Victory is merely a waypoint</strong>.<br>What we pursue is the very view that no one has yet reached.",
      aboutLog1: "LOG_001 / ESTABLISHED -- Launched in 2026, starting from Nagasaki.",
      aboutLog2: "LOG_002 / GOAL -- Shaking the world from Nagasaki.",
      aboutLog3: "LOG_003 / CURRENT -- Taking the first steps toward the global stage.",
      secMembers: "Team Members",
      secAchievements: "Competition Results",
      awaitingData: "AWAITING RECORD...",
      secPartners: "Sponsor",
      secApply: "Contact Us",
      formType: "CATEGORY",
      formSelect: "Please select",
      formOptPlayer: "PLAYER",
      formOptManager: "MANAGER",
      formOptDesigner: "DESIGNER",
      formOptOther: "OTHER",
      formName: "NAME",
      formEmail: "EMAIL",
      formMessage: "MESSAGE",
      formSubmit: "SEND APPLICATION",
    },
  };

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ja" : "en";
    langLabel.textContent = currentLang === "en" ? "/ JP" : "/ EN";
    langToggle.querySelector(".icon").textContent =
      currentLang === "en" ? "EN" : "JP";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });
  });

  // =========================================
  // Three.js Background & Theme Toggle
  // =========================================
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const htmlEl = document.documentElement;

  let particleMaterial = null;
  const colorDark = 0x7df9ff; // Original cyan for dark theme
  const colorLight = 0x111111; // Black particles for light theme

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    if (currentTheme === "dark") {
      htmlEl.setAttribute("data-theme", "light");
      themeLabel.textContent = "LIGHT";
      if (particleMaterial) particleMaterial.color.setHex(colorLight);
    } else {
      htmlEl.setAttribute("data-theme", "dark");
      themeLabel.textContent = "DARK";
      if (particleMaterial) particleMaterial.color.setHex(colorDark);
    }
  });

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // WebGL / Three.js の初期化処理（エラー保護付き）
  if (
    typeof THREE !== "undefined" &&
    document.getElementById("webgl-container")
  ) {
    try {
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x02040a, 0.04);

      const initWidth = window.innerWidth || 1024;
      const initHeight = window.innerHeight || 768;

      const camera = new THREE.PerspectiveCamera(
        120,
        initWidth / initHeight,
        0.1,
        1000,
      );
      camera.position.set(0, 0, -30);
      camera.rotation.z = Math.PI;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(initWidth, initHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      document.getElementById("webgl-container").appendChild(renderer.domElement);

      const particlesCount = 12000;
      const geometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(particlesCount * 3);

      for (let i = 0; i < particlesCount; i++) {
        const r = Math.random() * 12;
        const theta = Math.random() * Math.PI * 2;
        const ySpread =
          Math.pow(Math.random(), 2) *
          (Math.random() < 0.5 ? 1 : -1) *
          (10 / (r + 1.5));

        posArray[i * 3] = r * Math.cos(theta);
        posArray[i * 3 + 1] = ySpread;
        posArray[i * 3 + 2] = r * Math.sin(theta);
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

      particleMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color:
          htmlEl.getAttribute("data-theme") === "dark" ? colorDark : colorLight,
        transparent: true,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(geometry, particleMaterial);
      particlesMesh.rotation.x = Math.PI * 0.15;
      scene.add(particlesMesh);

      let mouseX = 0,
        mouseY = 0;
      let targetZ = 12;
      let targetFov = 75;
      let targetRotZ = 0;

      function updateMouse(x, y) {
        const w = window.innerWidth || 1024;
        const h = window.innerHeight || 768;
        mouseX = x / w - 0.5;
        mouseY = y / h - 0.5;
      }

      document.addEventListener("mousemove", (e) =>
        updateMouse(e.clientX, e.clientY),
      );
      document.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches && e.touches.length > 0) {
            updateMouse(e.touches[0].clientX, e.touches[0].clientY);
          }
        },
        { passive: true },
      );

      function animate() {
        if (reduceMotion) return;
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0008;

        camera.position.z += (targetZ - camera.position.z) * 0.02;
        camera.rotation.z += (targetRotZ - camera.rotation.z) * 0.02;
        camera.fov += (targetFov - camera.fov) * 0.02;
        camera.updateProjectionMatrix();

        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;

        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      if (!reduceMotion) {
        animate();
      } else {
        camera.position.z = targetZ;
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      }

      window.addEventListener("resize", () => {
        const w = window.innerWidth || 1024;
        const h = window.innerHeight || 768;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
    } catch (e) {
      console.warn("WebGL background initialization failed:", e);
    }
  }

  // Doctrine Scroll Animation hook
  const aboutSection = document.getElementById("about");
  if (aboutSection && !reduceMotion) {
    let ticking = false;
    function updateAboutParallax() {
      const rect = aboutSection.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const progress = Math.min(
        Math.max(
          1 - (rect.top + rect.height * 0.5) / (vh + rect.height * 0.5),
          0,
        ),
        1,
      );
      aboutSection.style.setProperty("--about-parallax", progress.toFixed(3));
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateAboutParallax);
          ticking = true;
        }
      },
      { passive: true },
    );
    updateAboutParallax();
  }

  // Doctrine Intersection Observer
  if ("IntersectionObserver" in window && !reduceMotion) {
    const doctrineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const log = document.getElementById("about-log");
            const telemetry = document.querySelector(".about-telemetry");
            if (log) log.classList.add("is-decoded");
            if (telemetry) telemetry.classList.add("is-visible");
            doctrineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    if (aboutSection) doctrineObserver.observe(aboutSection);
  } else {
    const log = document.getElementById("about-log");
    const telemetry = document.querySelector(".about-telemetry");
    if (log) log.classList.add("is-decoded");
    if (telemetry) telemetry.classList.add("is-visible");
  }

  // =========================================
  // Form Submission Hook & Template Injection
  // =========================================
  const contactForm = document.getElementById("contactForm");
  const applyTypeSelect = document.getElementById("apply-type");
  const messageTextarea = document.getElementById("message");

  if (applyTypeSelect && messageTextarea) {
    const templates = {
      player:
        "【プレイヤー応募】\n・現在のランク：\n・得意な役割/キャラ：\n・過去の大会実績：",
      manager:
        "【マネージャー/スタッフ応募】\n・希望する業務内容：\n・関連する経験やスキル：\n・週に稼働できる時間：",
      designer:
        "【デザイナー応募】\n・ポートフォリオURL：\n・使用可能なツール（Illustrator, Photoshopなど）：\n・得意なデザイン分野：",
      other: "【お問い合わせ内容】\n（こちらにご用件をご記入ください）",
    };

    applyTypeSelect.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      if (templates[selectedValue]) {
        messageTextarea.value = templates[selectedValue];
      }
    });
  }

  if (contactForm) {
    const modalOverlay = document.getElementById("success-modal");
    const modalCloseBtn = document.getElementById("modal-close");

    if (modalCloseBtn && modalOverlay) {
      modalCloseBtn.addEventListener("click", () => {
        modalOverlay.classList.remove("is-visible");
      });
    }

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // --- Validation ---
      const typeVal = document.getElementById("apply-type")?.value?.trim();
      const nameVal = document.getElementById("name")?.value?.trim();
      const emailVal = document.getElementById("email")?.value?.trim();
      const messageVal = document.getElementById("message")?.value?.trim();

      const validTypes = ["player", "manager", "designer", "other"];

      if (
        !typeVal ||
        !validTypes.includes(typeVal) ||
        !nameVal ||
        !emailVal ||
        !messageVal
      ) {
        alert("処理が実行できませんでした");
        return;
      }

      const btn = contactForm.querySelector(".submit-btn");
      const originalText = btn.innerHTML;

      if (btn) {
        btn.innerHTML = "TRANSMITTING...";
        btn.style.opacity = "0.5";
        btn.disabled = true;
      }

      try {
        const response = await fetch(contactForm.action, {
          method: contactForm.method,
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          if (modalOverlay) modalOverlay.classList.add("is-visible");
          contactForm.reset();
        } else {
          alert("処理が実行できませんでした");
        }
      } catch (error) {
        console.error(error);
        alert("処理が実行できませんでした");
      } finally {
        // Reset Turnstile
        if (typeof turnstile !== "undefined") {
          turnstile.reset();
        }
        if (btn) {
          btn.innerHTML = originalText;
          btn.style.opacity = "1";
          btn.disabled = false;
        }
      }
    });
  }

  // --- Team Members Slider ---
  const sliderContainer = document.getElementById("members-slider");
  const track = document.getElementById("slider-track");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (sliderContainer && track) {
    const cards = Array.from(track.children);
    let currentIndex = 0;
    let autoPlayInterval = null;

    function getCardsPerView() {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateSlider() {
      const cardsPerView = getCardsPerView();
      const totalCards = cards.length;
      const maxIndex = Math.max(0, totalCards - cardsPerView);

      if (currentIndex > maxIndex) {
        currentIndex = 0;
      } else if (currentIndex < 0) {
        currentIndex = maxIndex;
      }

      if (cards.length > 0) {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 20; // gap: 20px defined in CSS
        const translateX = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${translateX}px)`;
      }
    }

    function nextSlide() {
      const cardsPerView = getCardsPerView();
      currentIndex += cardsPerView;
      updateSlider();
    }

    function prevSlide() {
      const cardsPerView = getCardsPerView();
      currentIndex -= cardsPerView;
      updateSlider();
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, 3500); // 3.5 seconds auto play
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoPlay();
      });
      nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoPlay();
      });
    }

    sliderContainer.addEventListener("mouseenter", stopAutoPlay);
    sliderContainer.addEventListener("mouseleave", startAutoPlay);

    window.addEventListener("resize", updateSlider);

    setTimeout(() => {
      updateSlider();
    }, 100);

    // Intersection Observer for slider auto play
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAutoPlay();
          } else {
            stopAutoPlay();
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(sliderContainer);
  }
});
