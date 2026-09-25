(() => {
  const STORE_KEY = "grSiteData";
  const defaults = {
    services: [
      { id: "seamless", name: "Seamless metal gutters", description: "A continuous gutter run formed for the property.", price: "" },
      { id: "installation", name: "Gutter installation", description: "New gutters installed for homes around Fort Wayne.", price: "" },
      { id: "repair", name: "Gutter repair", description: "Repair for gutters that need attention.", price: "" }
    ],
    inquiries: [],
    jobPhotos: [],
    pairs: [],
    towns: [],
    publicPhone: "",
    publicEmail: "",
    publicAddress: "",
    socialLinks: [],
    announcement: { enabled: false, text: "", link: "", start: "", end: "" }
  };

  function readStore() {
    try {
      const value = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (!value) return structuredClone(defaults);
      return {
        ...structuredClone(defaults),
        ...value,
        services: Array.isArray(value.services) && value.services.length ? value.services : structuredClone(defaults.services),
        inquiries: Array.isArray(value.inquiries) ? value.inquiries : [],
        jobPhotos: Array.isArray(value.jobPhotos) ? value.jobPhotos : [],
        pairs: Array.isArray(value.pairs) ? value.pairs : [],
        towns: Array.isArray(value.towns) ? value.towns : []
      };
    } catch {
      return structuredClone(defaults);
    }
  }

  function writeStore(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  }

  function formatPhone(value) {
    const digits = String(value).replace(/\D/g, "");
    if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
    return value;
  }

  function renderManagedContent() {
    const data = readStore();
    data.services.forEach((service) => {
      const item = document.querySelector(`[data-service-id="${service.id}"]`);
      if (!item) return;
      item.querySelector("h3").textContent = service.name;
      item.querySelector("p").textContent = service.description;
      const price = item.querySelector(".service-price");
      price.textContent = service.price ? `Starting at ${service.price}` : "";
      price.hidden = !service.price;
      const action = item.querySelector(".open-estimate");
      action.dataset.service = service.name;
    });

    const phoneLinks = document.querySelectorAll(".public-phone");
    phoneLinks.forEach((link) => {
      link.hidden = !data.publicPhone;
      if (data.publicPhone) {
        link.href = `tel:${data.publicPhone.replace(/[^\d+]/g, "")}`;
        link.textContent = formatPhone(data.publicPhone);
      }
    });
    const email = document.getElementById("footerEmail");
    email.hidden = !data.publicEmail;
    if (data.publicEmail) {
      email.href = `mailto:${data.publicEmail}`;
      email.textContent = data.publicEmail;
    }
    const towns = document.getElementById("towns");
    towns.hidden = !data.towns.length;
    towns.textContent = data.towns.length ? `Also serving ${data.towns.join(", ")}` : "";

    renderAnnouncement(data.announcement);
    renderWork(data);
  }

  function renderAnnouncement(item) {
    const bar = document.getElementById("announcement");
    const today = new Date().toISOString().slice(0, 10);
    const inRange = (!item.start || item.start <= today) && (!item.end || item.end >= today);
    const show = Boolean(item.enabled && item.text && inRange);
    bar.hidden = !show;
    if (!show) return;
    const text = document.getElementById("announcementText");
    const link = document.getElementById("announcementLink");
    text.hidden = Boolean(item.link);
    link.hidden = !item.link;
    if (item.link) {
      link.textContent = item.text;
      link.href = item.link;
    } else {
      text.textContent = item.text;
    }
  }

  function renderWork(data) {
    const photos = data.jobPhotos.filter((photo) => !photo.hidden && photo.src);
    const pairs = data.pairs.filter((pair) => !pair.hidden && pair.before && pair.after);
    const section = document.getElementById("work");
    const nav = document.getElementById("workNav");
    const show = photos.length > 0 || pairs.length > 0;
    section.hidden = !show;
    nav.hidden = !show;
    if (!show) return;

    const gallery = document.getElementById("workGallery");
    gallery.replaceChildren();
    photos.sort((a, b) => (a.order || 0) - (b.order || 0)).forEach((photo) => {
      const figure = document.createElement("figure");
      figure.className = "work-card";
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.caption || `${photo.service || "Gutter"} work`;
      image.loading = "lazy";
      figure.appendChild(image);
      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.appendChild(caption);
      }
      gallery.appendChild(figure);
    });

    const comparisons = document.getElementById("comparisons");
    comparisons.replaceChildren();
    pairs.forEach((pair) => {
      const frame = document.createElement("div");
      frame.className = "comparison";
      frame.style.setProperty("--split", ".5");
      const before = document.createElement("img");
      before.src = pair.before;
      before.alt = pair.caption ? `Before: ${pair.caption}` : "Before gutter work";
      before.loading = "lazy";
      const afterWrap = document.createElement("div");
      afterWrap.className = "after-wrap";
      const after = document.createElement("img");
      after.src = pair.after;
      after.alt = pair.caption ? `After: ${pair.caption}` : "After gutter work";
      after.loading = "lazy";
      afterWrap.appendChild(after);
      const beforeLabel = document.createElement("span");
      beforeLabel.className = "comparison-label before";
      beforeLabel.textContent = "Before";
      const afterLabel = document.createElement("span");
      afterLabel.className = "comparison-label after";
      afterLabel.textContent = "After";
      const range = document.createElement("input");
      range.type = "range";
      range.min = "0";
      range.max = "100";
      range.value = "50";
      range.setAttribute("aria-label", "Move between before and after");
      range.addEventListener("input", () => {
        const split = Number(range.value) / 100;
        afterWrap.style.width = `${range.value}%`;
        frame.style.setProperty("--split", Math.max(.01, split));
      });
      frame.append(before, afterWrap, beforeLabel, afterLabel, range);
      comparisons.appendChild(frame);
    });
  }

  function setupVideo() {
    const video = document.getElementById("heroRain");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const load = () => {
      const source = video.querySelector("source");
      if (!source.src) {
        source.src = source.dataset.src;
        video.load();
        video.play().catch(() => {});
      }
    };
    if ("requestIdleCallback" in window) requestIdleCallback(load, { timeout: 1800 });
    else setTimeout(load, 700);
  }

  function setupProgress() {
    const water = document.getElementById("scrollWater");
    const update = () => {
      const range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      water.style.width = `${Math.min(100, Math.max(0, scrollY / range * 100))}%`;
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  }

  function setupMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const jump = new URLSearchParams(location.search).get("jump");
    if (jump !== null) history.scrollRestoration = "manual";
    if (!reduce && jump === null && window.Lenis) {
      const lenis = new Lenis({ lerp: .09, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const path = document.getElementById("formingPath");
    const label = document.getElementById("formingState");
    const line = document.getElementById("formingLine");
    const shapes = [
      "M90 188 L710 188 C710 188 710 188 710 188 L710 210 C710 210 710 210 710 210 L710 232 C710 232 710 232 710 232 L710 254 C710 254 710 254 710 254 L710 276 C710 276 710 276 710 276 L90 276 C90 276 90 276 90 276 Z",
      "M90 174 L660 174 C688 174 710 196 710 224 L710 238 C710 244 710 250 710 256 L710 270 C710 276 710 282 710 288 L710 302 C710 308 710 314 710 320 L680 320 C670 320 660 312 660 302 L90 262 C90 242 90 210 90 174 Z",
      "M112 132 L648 132 C682 132 704 160 704 194 L704 212 C704 226 700 240 692 252 L676 276 C668 288 664 302 664 316 L664 332 C632 338 594 338 558 334 L128 278 C118 236 112 184 112 132 Z",
      "M126 98 L630 98 C672 98 700 132 700 174 L700 196 C700 218 692 238 678 254 L650 286 C634 304 624 326 624 350 L624 360 C556 370 484 364 420 342 L158 274 C138 224 126 164 126 98 Z",
      "M136 74 L616 74 C664 74 696 112 696 160 L696 178 C696 204 686 228 668 246 L628 286 C606 308 594 338 594 370 L594 378 C490 392 382 374 294 324 L176 258 C150 204 136 140 136 74 Z"
    ];
    const names = ["Flat strip", "First bend", "Second bend", "Curved face", "Finished K profile"];
    const setState = (progress) => {
      const index = Math.min(4, Math.floor(progress * 5));
      label.textContent = names[index];
      if (index === 4) line.textContent = "Seamless metal gutters. One continuous run, with no seams along its length.";
      else line.textContent = "A flat aluminum strip bends into the profile that carries rain away.";
    };

    if (reduce) {
      path.setAttribute("d", shapes[4]);
      setState(1);
    } else if (innerWidth > 900) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".forming",
          start: "top top",
          end: "+=220%",
          pin: ".forming-stage",
          scrub: .55,
          invalidateOnRefresh: true,
          onUpdate: (self) => setState(self.progress)
        }
      });
      shapes.slice(1).forEach((shape) => timeline.to(path, { attr: { d: shape }, duration: 1, ease: "none" }));
    } else {
      const observer = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        const timeline = gsap.timeline({ onUpdate: () => setState(timeline.progress()) });
        shapes.slice(1).forEach((shape) => timeline.to(path, { attr: { d: shape }, duration: .55, ease: "power2.inOut" }));
        observer.disconnect();
      }, { threshold: .35 });
      observer.observe(document.querySelector(".forming"));
    }

    gsap.from(".service-hanger", {
      y: -34,
      opacity: 0,
      stagger: .14,
      duration: .8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".service-run", start: "top 76%", once: true }
    });

    addEventListener("load", () => {
      ScrollTrigger.refresh();
      if (jump !== null) {
        scrollTo(0, Number(jump) || 0);
        ScrollTrigger.update();
        ScrollTrigger.getAll().forEach((trigger) => trigger.update());
      }
    }, { once: true });

    const frameTimes = [];
    let priorFrame = performance.now();
    let priorReport = priorFrame;
    const measure = (now) => {
      frameTimes.push(now - priorFrame);
      priorFrame = now;
      if (now - priorReport >= 2000) {
        const ordered = frameTimes.splice(0).sort((a, b) => a - b);
        window.__motionStats = {
          p95: ordered[Math.floor(ordered.length * .95)] || 0,
          max: ordered[ordered.length - 1] || 0
        };
        priorReport = now;
      }
      requestAnimationFrame(measure);
    };
    requestAnimationFrame(measure);
  }

  async function resizePhoto(file) {
    const image = await createImageBitmap(file);
    const maxSide = 1500;
    const ratio = Math.min(1, maxSide / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.width * ratio);
    canvas.height = Math.round(image.height * ratio);
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.close();
    let quality = .78;
    let value = canvas.toDataURL("image/jpeg", quality);
    while (value.length * .75 > 300000 && quality > .34) {
      quality -= .08;
      value = canvas.toDataURL("image/jpeg", quality);
    }
    return value;
  }

  function setupEstimate() {
    const dialog = document.getElementById("estimateDialog");
    const form = document.getElementById("estimateForm");
    const steps = [...form.querySelectorAll(".form-step")];
    const stepCount = document.getElementById("stepCount");
    const progress = document.getElementById("stepProgress");
    const title = document.getElementById("dialogTitle");
    const next = document.getElementById("nextStep");
    const back = document.getElementById("backStep");
    const send = document.getElementById("sendRequest");
    const photoInput = document.getElementById("requestPhotos");
    const preview = document.getElementById("requestPhotoPreview");
    const titles = ["What do you need?", "Where is the property?", "Add a photo", "How can we reach you?"];
    let current = 0;
    let photos = [];

    function showStep(index) {
      current = index;
      steps.forEach((step, position) => step.classList.toggle("active", position === index));
      stepCount.textContent = `Step ${index + 1} of 4`;
      progress.style.width = `${(index + 1) * 25}%`;
      title.textContent = titles[index];
      back.hidden = index === 0;
      next.hidden = index === 3;
      send.hidden = index !== 3;
    }

    function validateStep() {
      if (current === 0) {
        const any = form.querySelectorAll('input[name="services"]:checked').length > 0;
        document.getElementById("serviceError").textContent = any ? "" : "Choose at least one service.";
        return any;
      }
      if (current === 1) {
        const fields = [form.elements.street, form.elements.town];
        const valid = fields.every((field) => field.value.trim());
        fields.forEach((field) => field.toggleAttribute("aria-invalid", !field.value.trim()));
        return valid;
      }
      return true;
    }

    document.querySelectorAll(".open-estimate").forEach((button) => {
      button.addEventListener("click", () => {
        form.hidden = false;
        document.getElementById("formSuccess").hidden = true;
        form.querySelectorAll(".dialog-head,.step-progress,.form-step,.form-actions").forEach((item) => item.hidden = false);
        if (button.dataset.service) {
          const choice = [...form.querySelectorAll('input[name="services"]')].find((input) => input.value === button.dataset.service);
          if (choice) choice.checked = true;
        }
        showStep(0);
        dialog.showModal();
      });
    });
    document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());
    document.querySelector(".close-after-send").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    next.addEventListener("click", () => {
      if (validateStep()) showStep(Math.min(3, current + 1));
    });
    back.addEventListener("click", () => showStep(Math.max(0, current - 1)));

    photoInput.addEventListener("change", async () => {
      const files = [...photoInput.files].slice(0, 2);
      document.getElementById("photoError").textContent = photoInput.files.length > 2 ? "Choose no more than two images." : "";
      photos = await Promise.all(files.map(resizePhoto));
      preview.replaceChildren(...photos.map((src) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = "Selected property photo";
        return image;
      }));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const phone = form.elements.phone.value.trim();
      const email = form.elements.email.value.trim();
      const error = document.getElementById("contactError");
      if (!form.elements.name.value.trim() || (!phone && !email)) {
        error.textContent = "Add your name and either a phone number or email.";
        return;
      }
      if (email && !form.elements.email.checkValidity()) {
        error.textContent = "Enter a valid email address.";
        return;
      }
      error.textContent = "";
      const data = readStore();
      data.inquiries.unshift({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        createdAt: new Date().toISOString(),
        services: [...form.querySelectorAll('input[name="services"]:checked')].map((input) => input.value),
        street: form.elements.street.value.trim(),
        town: form.elements.town.value.trim(),
        description: form.elements.description.value.trim(),
        photos,
        name: form.elements.name.value.trim(),
        phone,
        email,
        status: "New",
        notes: ""
      });
      try {
        writeStore(data);
      } catch {
        error.textContent = "The images are too large for this device. Try one photo.";
        return;
      }
      form.querySelectorAll(".dialog-head,.step-progress,.form-step,.form-actions").forEach((item) => item.hidden = true);
      document.getElementById("formSuccess").hidden = false;
      form.reset();
      preview.replaceChildren();
      photos = [];
    });
  }

  renderManagedContent();
  setupVideo();
  setupProgress();
  setupEstimate();
  setupMotion();
  addEventListener("storage", renderManagedContent);
  const ready = () => { window.__ready = true; };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready);
  else ready();
})();
