(() => {
  const STORE_KEY = "grSiteData";
  const defaults = {
    services: [
      { id: "seamless", name: "Seamless metal gutters", description: "A continuous gutter run formed for the property.", price: "" },
      { id: "installation", name: "Gutter installation", description: "New gutters installed for homes around Fort Wayne.", price: "" },
      { id: "repair", name: "Gutter repair", description: "Repair for gutters that need attention.", price: "" }
    ],
    inquiries: [], jobPhotos: [], pairs: [], towns: [], publicPhone: "", publicEmail: "", publicAddress: "", socialLinks: [],
    announcement: { enabled: false, text: "", link: "", start: "", end: "" }
  };
  const statuses = ["New", "Contacted", "Estimate sent", "Won", "Lost"];
  let data = readStore();
  const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random().toString(16).slice(2)}`;

  function readStore() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (!saved) return structuredClone(defaults);
      return {
        ...structuredClone(defaults), ...saved,
        services: Array.isArray(saved.services) && saved.services.length ? saved.services : structuredClone(defaults.services),
        inquiries: Array.isArray(saved.inquiries) ? saved.inquiries : [],
        jobPhotos: Array.isArray(saved.jobPhotos) ? saved.jobPhotos : [],
        pairs: Array.isArray(saved.pairs) ? saved.pairs : [],
        towns: Array.isArray(saved.towns) ? saved.towns : []
      };
    } catch {
      return structuredClone(defaults);
    }
  }

  function save(message = "Saved") {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
    const toast = document.getElementById("saveToast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(save.timer);
    save.timer = setTimeout(() => toast.classList.remove("show"), 1700);
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderInquiries() {
    const list = document.getElementById("inquiryList");
    const filter = document.getElementById("statusFilter").value;
    const visible = data.inquiries.filter((item) => filter === "All" || item.status === filter);
    list.replaceChildren();
    document.getElementById("inquiryEmpty").hidden = visible.length > 0;
    visible.forEach((item) => {
      const card = element("article", "inquiry-card");
      const content = element("div");
      content.append(
        element("p", "inquiry-services", item.services.join(", ")),
        element("h3", "", item.name),
        element("p", "", `${item.street}, ${item.town}`),
        element("p", "", item.description || "No description added"),
        element("p", "inquiry-meta", [item.phone, item.email].filter(Boolean).join("  •  ")),
        element("p", "inquiry-meta", new Date(item.createdAt).toLocaleString())
      );
      if (item.photos && item.photos.length) {
        const images = element("div", "inquiry-photos");
        item.photos.forEach((src) => {
          const image = document.createElement("img");
          image.src = src;
          image.alt = "Property photo attached to request";
          images.appendChild(image);
        });
        content.appendChild(images);
      }
      const actions = element("div", "inquiry-actions");
      const statusLabel = element("label", "", "Status");
      const select = document.createElement("select");
      statuses.forEach((status) => {
        const option = document.createElement("option");
        option.textContent = status;
        option.selected = item.status === status;
        select.appendChild(option);
      });
      statusLabel.appendChild(select);
      const notesLabel = element("label", "", "Notes");
      const notes = document.createElement("textarea");
      notes.rows = 3;
      notes.value = item.notes || "";
      notesLabel.appendChild(notes);
      const update = element("button", "", "Save request");
      update.type = "button";
      update.addEventListener("click", () => {
        item.status = select.value;
        item.notes = notes.value.trim();
        save("Request saved");
        renderInquiries();
      });
      actions.append(statusLabel, notesLabel, update);
      card.append(content, actions);
      list.appendChild(card);
    });
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function exportCsv() {
    const rows = [["Date", "Name", "Services", "Street address", "Town", "Description", "Phone", "Email", "Status", "Notes"]];
    data.inquiries.forEach((item) => rows.push([item.createdAt, item.name, item.services.join("; "), item.street, item.town, item.description, item.phone, item.email, item.status, item.notes]));
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(",")).join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gutter-runners-estimate-requests.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function resizeImage(file, limit = 450000) {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * ratio);
    canvas.height = Math.round(bitmap.height * ratio);
    const context = canvas.getContext("2d", { alpha: false });
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    let quality = .8;
    let result = canvas.toDataURL("image/jpeg", quality);
    while (result.length * .75 > limit && quality > .32) {
      quality -= .08;
      result = canvas.toDataURL("image/jpeg", quality);
    }
    return result;
  }

  function serviceOptions(selected) {
    const select = document.createElement("select");
    data.services.forEach((service) => {
      const option = document.createElement("option");
      option.textContent = service.name;
      option.selected = selected === service.name;
      select.appendChild(option);
    });
    return select;
  }

  function renderPhotos() {
    const list = document.getElementById("photoList");
    list.replaceChildren();
    document.getElementById("photoEmpty").hidden = data.jobPhotos.length > 0;
    data.jobPhotos.sort((a, b) => a.order - b.order).forEach((item, index) => {
      const row = element("article", "media-item");
      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.caption || "Job photo";
      const fields = element("div", "media-fields");
      const captionLabel = element("label", "", "Caption");
      const caption = document.createElement("input");
      caption.value = item.caption || "";
      captionLabel.appendChild(caption);
      const serviceLabel = element("label", "", "Service");
      const service = serviceOptions(item.service);
      serviceLabel.appendChild(service);
      const visibleLabel = element("label", "visible-check", "Visible on site");
      const visible = document.createElement("input");
      visible.type = "checkbox";
      visible.checked = !item.hidden;
      visibleLabel.prepend(visible);
      fields.append(captionLabel, serviceLabel, visibleLabel);
      [caption, service, visible].forEach((input) => input.addEventListener("change", () => {
        item.caption = caption.value.trim();
        item.service = service.value;
        item.hidden = !visible.checked;
        save("Photo saved");
      }));
      const actions = element("div", "media-actions");
      const up = element("button", "", "Move up");
      const down = element("button", "", "Move down");
      const remove = element("button", "danger", "Delete");
      [up, down, remove].forEach((button) => button.type = "button");
      up.disabled = index === 0;
      down.disabled = index === data.jobPhotos.length - 1;
      up.addEventListener("click", () => movePhoto(index, index - 1));
      down.addEventListener("click", () => movePhoto(index, index + 1));
      remove.addEventListener("click", () => {
        data.jobPhotos = data.jobPhotos.filter((photo) => photo.id !== item.id);
        normalizePhotoOrder();
        save("Photo deleted");
        renderPhotos();
      });
      actions.append(up, down, remove);
      row.append(image, fields, actions);
      list.appendChild(row);
    });
  }

  function normalizePhotoOrder() {
    data.jobPhotos.forEach((photo, index) => photo.order = index);
  }
  function movePhoto(from, to) {
    if (to < 0 || to >= data.jobPhotos.length) return;
    const sorted = data.jobPhotos.sort((a, b) => a.order - b.order);
    const moved = sorted.splice(from, 1)[0];
    sorted.splice(to, 0, moved);
    normalizePhotoOrder();
    save("Photo order saved");
    renderPhotos();
  }

  function renderPairs() {
    const list = document.getElementById("pairList");
    list.replaceChildren();
    document.getElementById("pairEmpty").hidden = data.pairs.length > 0;
    data.pairs.forEach((item) => {
      const row = element("article", "media-item");
      const thumbs = element("div", "pair-thumbs");
      [item.before, item.after].forEach((src, index) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = index ? "After photo" : "Before photo";
        thumbs.appendChild(image);
      });
      const fields = element("div", "media-fields");
      const captionLabel = element("label", "", "Caption");
      const caption = document.createElement("input");
      caption.value = item.caption || "";
      captionLabel.appendChild(caption);
      const visibleLabel = element("label", "visible-check", "Visible on site");
      const visible = document.createElement("input");
      visible.type = "checkbox";
      visible.checked = !item.hidden;
      visibleLabel.prepend(visible);
      fields.append(captionLabel, visibleLabel);
      caption.addEventListener("change", () => { item.caption = caption.value.trim(); save("Pair saved"); });
      visible.addEventListener("change", () => { item.hidden = !visible.checked; save("Pair saved"); });
      const actions = element("div", "media-actions");
      const remove = element("button", "danger", "Delete");
      remove.type = "button";
      remove.addEventListener("click", () => {
        data.pairs = data.pairs.filter((pair) => pair.id !== item.id);
        save("Pair deleted");
        renderPairs();
      });
      actions.appendChild(remove);
      row.append(thumbs, fields, actions);
      list.appendChild(row);
    });
  }

  function renderServices() {
    const editor = document.getElementById("servicesEditor");
    editor.replaceChildren();
    data.services.forEach((service) => {
      const row = element("div", "service-editor");
      const nameLabel = element("label", "", "Service name");
      const name = document.createElement("input");
      name.value = service.name;
      name.dataset.field = "name";
      name.dataset.id = service.id;
      nameLabel.appendChild(name);
      const descriptionLabel = element("label", "", "Description");
      const description = document.createElement("input");
      description.value = service.description;
      description.dataset.field = "description";
      description.dataset.id = service.id;
      descriptionLabel.appendChild(description);
      const priceLabel = element("label", "", "Starting price");
      const price = document.createElement("input");
      price.value = service.price || "";
      price.dataset.field = "price";
      price.dataset.id = service.id;
      priceLabel.appendChild(price);
      row.append(nameLabel, descriptionLabel, priceLabel);
      editor.appendChild(row);
    });
  }

  function fillForms() {
    document.getElementById("townsInput").value = data.towns.join("\n");
    document.getElementById("publicPhone").value = data.publicPhone || "";
    document.getElementById("publicEmail").value = data.publicEmail || "";
    document.getElementById("publicAddress").value = data.publicAddress || "";
    document.getElementById("socialLinks").value = (data.socialLinks || []).join("\n");
    const item = data.announcement || defaults.announcement;
    document.getElementById("announcementEnabled").checked = item.enabled;
    document.getElementById("announcementText").value = item.text;
    document.getElementById("announcementLink").value = item.link;
    document.getElementById("announcementStart").value = item.start;
    document.getElementById("announcementEnd").value = item.end;
  }

  document.getElementById("statusFilter").addEventListener("change", renderInquiries);
  document.getElementById("exportCsv").addEventListener("click", exportCsv);
  document.getElementById("photoForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("jobPhotoFile").files[0];
    if (!file) return;
    const src = await resizeImage(file);
    data.jobPhotos.push({ id: uid(), src, caption: document.getElementById("jobPhotoCaption").value.trim(), service: document.getElementById("jobPhotoService").value, hidden: false, order: data.jobPhotos.length });
    save("Job photo added");
    event.target.reset();
    renderPhotos();
  });
  document.getElementById("pairForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const beforeFile = document.getElementById("beforeFile").files[0];
    const afterFile = document.getElementById("afterFile").files[0];
    if (!beforeFile || !afterFile) return;
    const [before, after] = await Promise.all([resizeImage(beforeFile), resizeImage(afterFile)]);
    data.pairs.push({ id: uid(), before, after, caption: document.getElementById("pairCaption").value.trim(), hidden: false });
    save("Matched pair added");
    event.target.reset();
    renderPairs();
  });
  document.getElementById("servicesForm").addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelectorAll("#servicesEditor input").forEach((input) => {
      const service = data.services.find((item) => item.id === input.dataset.id);
      service[input.dataset.field] = input.value.trim();
    });
    save("Services saved");
  });
  document.getElementById("townsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    data.towns = document.getElementById("townsInput").value.split("\n").map((town) => town.trim()).filter(Boolean);
    save("Towns saved");
  });
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    data.publicPhone = document.getElementById("publicPhone").value.trim();
    data.publicEmail = document.getElementById("publicEmail").value.trim();
    data.publicAddress = document.getElementById("publicAddress").value.trim();
    data.socialLinks = document.getElementById("socialLinks").value.split("\n").map((value) => value.trim()).filter(Boolean);
    save("Business info saved");
  });
  document.getElementById("announcementForm").addEventListener("submit", (event) => {
    event.preventDefault();
    data.announcement = {
      enabled: document.getElementById("announcementEnabled").checked,
      text: document.getElementById("announcementText").value.trim(),
      link: document.getElementById("announcementLink").value.trim(),
      start: document.getElementById("announcementStart").value,
      end: document.getElementById("announcementEnd").value
    };
    save("Announcement saved");
  });

  renderInquiries();
  renderPhotos();
  renderPairs();
  renderServices();
  fillForms();
})();
