// section visibility control
    const sections = Array.from(document.querySelectorAll(".page-section"));
    const sectionStorageKey = "balaji:last-section";
    function showSection(id) {
      sections.forEach((sec) => {
        sec.classList.toggle("active", sec.id === id);
      });
      if (heroSection) {
        heroSection.classList.toggle("hidden", id !== "home");
      }
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      try { localStorage.setItem(sectionStorageKey, id); } catch (e) {}
    }
    document.querySelectorAll(".tabs a").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href") || "";
        if (href.startsWith("#")) {
          e.preventDefault();
          const id = href.substring(1);
          showSection(id);
        }
      });
    });
    // start with all hidden; no default section shown
    sections.forEach((sec) => sec.classList.remove("active"));
    try { localStorage.removeItem(sectionStorageKey); } catch (e) {}

    const products = [
      {
        id: "red-kanjivaram",
        name: "Red Kanjivaram Saree",
        price: 7499,
        description: "Traditional Kanjivaram with bold red body and zari border.",
        images: [
          "images/kanji1.jpeg",
          "images/kanji2.jpeg",
          "images/kanji3.jpeg",
          "images/kanji4.jpeg"
        ],
        imageNotes: [
          "Front view of full saree drape.",
          "Back view highlighting the pallu.",
          "Close-up of border and zari work.",
          "Blouse piece and fabric texture."
        ]
      },
      {
        id: "blue-banarasi",
        name: "Blue Banarasi Saree",
        price: 6899,
        description: "Handwoven Banarasi with intricate motifs on a royal blue base.",
        images: [
          "images/banaras1.jpeg",
          "images/banaras2.jpeg",
          "images/banaras3.jpeg",
          "images/banaras4.jpeg"
        ],
        imageNotes: [
          "Front drape with Banarasi motifs visible.",
          "Rear view showing rich pallu fall.",
          "Detailed look at weaving and buttas.",
          "Suggested blouse and border pairing."
        ]
      },
      {
        id: "pastel-linen",
        name: "Pastel Linen Saree",
        price: 3199,
        description: "Lightweight linen in soft pastels for everyday elegance.",
        images: [
          "images/pink1.jpeg",
          "images/pink2.jpeg",
          "images/pink3.jpeg",
          "images/pink4.jpeg"
        ],
        imageNotes: [
          "Front view of pastel linen drape.",
          "Back view with lightweight pallu.",
          "Close-up of airy linen texture.",
          "Blouse and border combination idea."
        ]
      },
      {
        id: "mysore-silk",
        name: "Mysore Silk Saree",
        price: 5799,
        description: "Pure Mysore silk with minimalist zari for timeless grace.",
        images: [
          "images/mysore1.jpeg",
          "images/mysore2.jpeg",
          "images/mysore3.jpeg",
          "images/mysore4.jpeg"
        ],
        imageNotes: [
          "Complete front drape of Mysore silk.",
          "Back view with pallu flowing freely.",
          "Border and body shine in close-up.",
          "Simple blouse option with saree."
        ]
      },
      {
        id: "gadwal-pattu",
        name: "Gadwal Pattu Saree",
        price: 7999,
        description: "Contrast Gadwal pattu with rich temple borders.",
        images: [
          "images/gadwal1.jpeg",
          "images/gadwal2.jpeg",
          "images/gadwal3.jpeg",
          "images/gadwal4.jpeg"
        ],
        imageNotes: [
          "Front view showing temple border.",
          "Rear view emphasizing contrast pallu.",
          "Close-up of intricate Gadwal weaving.",
          "Blouse suggestion with contrast border."
        ]
      },
      {
        id: "butta-design",
        name: "Butta Design Saree",
        price: 4499,
        description: "All-over butta motifs on a soft silk blend for daily chic.",
        images: [
          "images/butta1.jpeg",
          "images/butta2.jpeg",
          "images/butta3.jpeg",
          "images/butta4.jpeg"
        ],
        imageNotes: [
          "Front drape with all-over butta design.",
          "Back view with pallu and buttas visible.",
          "Close-up of butta motifs and border.",
          "Blouse pairing idea matching buttas."
        ]
      }
    ];

    const formatPrice = (n) => `₹${n.toLocaleString("en-IN")}`;
    const cart = [];
    const wish = new Set();
    const productControls = {};
    let currentProduct = null;
    let currentIndex = 0;
    const heroSection = document.querySelector(".hero");

    const productContainer = document.getElementById("products");
    products.forEach((p) => {
      const card = document.createElement("article");
      card.className = "card";

      const mainImage = document.createElement("div");
      mainImage.className = "main-image";
      const heroImg = document.createElement("img");
      heroImg.src = p.images[0];
      heroImg.alt = `${p.name} preview`;
      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.textContent = "View 4 looks";
      openBtn.onclick = () => openModal(p, 0);
      mainImage.append(heroImg, openBtn);

      const title = document.createElement("h3");
      title.textContent = p.name;

      const desc = document.createElement("p");
      desc.className = "tagline";
      desc.textContent = p.description;

      const price = document.createElement("div");
      price.className = "price";
      price.textContent = formatPrice(p.price);

      const actions = document.createElement("div");
      actions.className = "actions";

      const addBtn = document.createElement("button");
      addBtn.className = "add-cart";
      addBtn.textContent = "Add to Cart";
      addBtn.onclick = () => {
        addToCart(p);
        updateProductControls();
      };

      const qtyWrap = document.createElement("div");
      qtyWrap.style.display = "none";
      qtyWrap.style.alignItems = "center";
      qtyWrap.style.gap = "6px";

      const minusBtn = document.createElement("button");
      minusBtn.textContent = "−";
      minusBtn.className = "wishlist"; // secondary style
      minusBtn.onclick = () => changeQuantity(p, -1);

      const qtyLabel = document.createElement("span");
      qtyLabel.style.minWidth = "24px";
      qtyLabel.style.textAlign = "center";
      qtyLabel.style.fontWeight = "600";

      const plusBtn = document.createElement("button");
      plusBtn.textContent = "+";
      plusBtn.className = "wishlist";
      plusBtn.onclick = () => changeQuantity(p, 1);

      qtyWrap.append(minusBtn, qtyLabel, plusBtn);

      const wishBtn = document.createElement("button");
      wishBtn.className = "wishlist";
      wishBtn.textContent = "♡ Wishlist";
      wishBtn.onclick = () => toggleWish(p, wishBtn);

      actions.append(addBtn, qtyWrap, wishBtn);

      card.append(mainImage, title, desc, price, actions);
      productContainer.appendChild(card);

      productControls[p.id] = { addBtn, qtyWrap, qtyLabel, card };
    });

    function addToCart(product) {
      const existing = cart.find((c) => c.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ ...product, qty: 1 });
      }
      renderCart();
    }

    function changeQuantity(product, delta) {
      const existing = cart.find((c) => c.id === product.id);
      if (!existing && delta > 0) {
        cart.push({ ...product, qty: 1 });
      } else if (existing) {
        existing.qty += delta;
        if (existing.qty <= 0) {
          const idx = cart.indexOf(existing);
          if (idx !== -1) cart.splice(idx, 1);
        }
      }
      renderCart();
      updateProductControls();
    }

    function toggleWish(product, btn) {
      if (wish.has(product.id)) {
        wish.delete(product.id);
        btn.classList.remove("active");
        btn.textContent = "♡ Wishlist";
      } else {
        wish.add(product.id);
        btn.classList.add("active");
        btn.textContent = "♥ In Wishlist";
      }
      renderWishlist();
    }

    function renderCart() {
      const list = document.getElementById("cartList");
      list.innerHTML = "";
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.qty;
        const row = document.createElement("div");
        row.className = "pill cart-item";

        const thumb = document.createElement("div");
        thumb.className = "mini-thumb";
        const img = document.createElement("img");
        img.src = item.images[0];
        img.alt = item.name;
        thumb.appendChild(img);

        const text = document.createElement("div");
        text.className = "mini-text";
        const title = document.createElement("strong");
        title.textContent = item.name;
        const meta = document.createElement("span");
        meta.textContent = `Qty: ${item.qty} · ${formatPrice(item.price * item.qty)}`;
        text.append(title, meta);

        row.append(thumb, text);
        list.appendChild(row);
      });
      const summary = document.getElementById("cartSummary");
      summary.textContent = cart.length
        ? `Total: ${formatPrice(total)} (Shipping within India)`
        : "No items yet.";
    }

    function updateProductControls() {
      Object.keys(productControls).forEach((id) => {
        const controls = productControls[id];
        const item = cart.find((c) => c.id === id);
        if (!controls) return;
        if (item) {
          controls.addBtn.style.display = "none";
          controls.qtyWrap.style.display = "inline-flex";
          controls.qtyLabel.textContent = item.qty;
        } else {
          controls.addBtn.style.display = "inline-block";
          controls.qtyWrap.style.display = "none";
        }
      });
    }

    function renderWishlist() {
      const list = document.getElementById("wishlist");
      list.innerHTML = "";
      if (!wish.size) {
        list.textContent = "Wishlist is empty.";
        return;
      }
      products
        .filter((p) => wish.has(p.id))
        .forEach((p) => {
          const row = document.createElement("div");
          row.className = "pill wish-item";

          const thumb = document.createElement("div");
          thumb.className = "mini-thumb";
          const img = document.createElement("img");
          img.src = p.images[0];
          img.alt = p.name;
          thumb.appendChild(img);

          const text = document.createElement("div");
          text.className = "mini-text";
          const title = document.createElement("strong");
          title.textContent = p.name;
          const meta = document.createElement("span");
          meta.textContent = formatPrice(p.price);
          text.append(title, meta);

          row.append(thumb, text);
          list.appendChild(row);
        });
    }

    // product search
    const searchInput = document.getElementById("productSearch");
    const searchBtn = document.getElementById("productSearchBtn");

    function performSearch() {
      if (!searchInput) return;
      const query = searchInput.value.trim().toLowerCase();
      // always go to sarees section first
      showSection("sarees");
      if (!query) {
        document.getElementById("sarees").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const match = products.find((p) => p.name.toLowerCase().includes(query));
      if (match) {
        const controls = productControls[match.id];
        if (controls?.card) {
          const cardEl = controls.card;
          cardEl.classList.add("product-highlight");
          cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            cardEl.classList.remove("product-highlight");
          }, 2000);
        }
      }
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", performSearch);
    }
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          performSearch();
        }
      });
    }

    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackStatus = document.getElementById("feedbackStatus");
    const saveFormat = document.getElementById("saveFormat");

    function buildTextContent(obj) {
      const ts = new Date().toISOString();
      return `Saved: ${ts}\nName: ${obj.name}\nEmail: ${obj.email}\n\nMessage:\n${obj.message}\n`;
    }

    function downloadBlob(content, filename, type = "text/plain") {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    function saveAsTxt(payload) {
      const filename = `feedback_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.txt`;
      const content = buildTextContent(payload);
      downloadBlob(content, filename, "text/plain");
      return `Downloaded ${filename}`;
    }

    function saveAsXlsx(payload) {
      if (!window.XLSX) {
        // fallback to CSV if SheetJS not available
        const csv = `"Saved","${new Date().toISOString()}"\n"Name","${(payload.name||"").replace(/"/g,'""')}"\n"Email","${(payload.email||"").replace(/"/g,'""')}"\n"Message","${(payload.message||"").replace(/"/g,'""')}"\n`;
        const filename = `feedback_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`;
        downloadBlob(csv, filename, "text/csv");
        return `Downloaded ${filename} (CSV fallback)`;
      }
      const ws_data = [
        ["Saved", new Date().toISOString()],
        [],
        ["Name", payload.name || ""],
        ["Email", payload.email || ""],
        [],
        ["Message", payload.message || ""]
      ];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      XLSX.utils.book_append_sheet(wb, ws, "Feedback");
      const filename = `feedback_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.xlsx`;
      XLSX.writeFile(wb, filename);
      return `Downloaded ${filename}`;
    }

    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById("name").value || "",
        email: document.getElementById("email").value || "",
        message: document.getElementById("message").value || ""
      };
      feedbackStatus.textContent = "Preparing file...";
      const format = saveFormat.value || "txt";
      try {
        let msg = "";

    if (format === "xlsx") {
          msg = saveAsXlsx(payload);
        } else {
          msg = saveAsTxt(payload);
        }
        feedbackStatus.textContent = msg;
        feedbackForm.reset();
      } catch (err) {
        console.error(err);
        feedbackStatus.textContent = "Save failed.";
      }
    });
    //banner rotation
    const banners = Array.from(document.querySelectorAll(".banner"));
    let bannerIndex = 0;
  const resizeHero = () => {
    const active = banners[bannerIndex];
    if (!active?.naturalWidth) return;
    const ratio = active.naturalHeight / active.naturalWidth;
    const width = heroSection.clientWidth || window.innerWidth;
    const targetHeight = Math.max(240, width * ratio);
    heroSection.style.height = `${targetHeight}px`;
  };
  const cycleBanner = () => {
    banners[bannerIndex].classList.remove("active");
    bannerIndex = (bannerIndex + 1) % banners.length;
    banners[bannerIndex].classList.add("active");
    resizeHero();
  };
  banners.forEach((img) => img.addEventListener("load", resizeHero));
  window.addEventListener("resize", resizeHero);
  setInterval(cycleBanner, 4200);
  resizeHero();

    // modal gallery
    const lightbox = document.getElementById("lightbox");
    const modalImg = document.getElementById("modalImg");
    const modalDesc = document.getElementById("modalDesc");
    const modalThumbs = document.getElementById("modalThumbs");
    const prevImg = document.getElementById("prevImg");
    const nextImg = document.getElementById("nextImg");
    const closeModal = () => {
      lightbox.classList.remove("show");
      lightbox.setAttribute("aria-hidden", "true");
    };

    document.querySelector(".close-modal").onclick = closeModal;
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeModal();
    });

    function openModal(product, index) {
      currentProduct = product;
      currentIndex = index;
      renderModal();
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
    }

    function renderModal() {
      if (!currentProduct) return;
      modalImg.src = currentProduct.images[currentIndex];
      modalImg.alt = `${currentProduct.name} view ${currentIndex + 1}`;
      modalDesc.textContent = currentProduct.imageNotes[currentIndex];
      modalThumbs.innerHTML = "";
      currentProduct.images.forEach((img, idx) => {
        const btn = document.createElement("button");
        btn.className = idx === currentIndex ? "active" : "";
        const thumb = document.createElement("img");
        thumb.src = img;
        thumb.alt = `${currentProduct.name} thumb ${idx + 1}`;
        btn.onclick = () => {
          currentIndex = idx;
          renderModal();
        };
        btn.appendChild(thumb);
        modalThumbs.appendChild(btn);
      });
    }

    prevImg.onclick = () => {
      if (!currentProduct) return;
      currentIndex = (currentIndex - 1 + currentProduct.images.length) % currentProduct.images.length;
      renderModal();
    };
    nextImg.onclick = () => {
      if (!currentProduct) return;
      currentIndex = (currentIndex + 1) % currentProduct.images.length;
      renderModal();
    };