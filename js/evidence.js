// ============================================================
// MOUSTACHE — Investigation Engine
// Cork board, evidence files, forensics, dossier, defense layers
// ============================================================

const Investigation = {
  pinnedIds: new Set(),
  dossierEntries: [],
  defensesOpened: new Set(),

  // --- TOOLS ---
  openTool(tool) {
    const panel = document.getElementById("detail-panel");
    const title = document.getElementById("detail-title");
    const body = document.getElementById("detail-body");

    panel.style.display = "";
    // Re-trigger animation
    panel.style.animation = "none";
    panel.offsetHeight; // reflow
    panel.style.animation = "";

    Game.boostTruth(1); // every tool interaction

    switch (tool) {
      case "evidence":
        title.textContent = "EVIDENCE FILES";
        body.innerHTML = "";
        this.buildEvidenceList(body);
        break;
      case "forensics":
        title.textContent = "MOUSTACHE FORENSICS";
        body.innerHTML = "";
        this.buildForensics(body);
        this.addDossier(DOSSIER_TEMPLATES.photoAnalyzed());
        Game.boostTruth(3);
        break;
      case "defense":
        title.textContent = "DEFENSE PROTOCOLS";
        body.innerHTML = "";
        this.buildDefenseLayers(body);
        break;
      case "dossier":
        title.textContent = "YOUR DOSSIER";
        body.innerHTML = "";
        this.buildDossier(body);
        break;
      case "share":
        title.textContent = "TRANSMIT FINDINGS";
        body.innerHTML = "";
        this.buildShare(body);
        break;
    }
  },

  closePanel() {
    document.getElementById("detail-panel").style.display = "none";
  },

  // --- EVIDENCE FILES ---
  buildEvidenceList(container) {
    const intro = document.createElement("p");
    intro.className = "share-instruction";
    intro.textContent = "CLICK ANY DOCUMENT TO PIN IT TO YOUR BOARD";
    container.appendChild(intro);

    EVIDENCE_FACTS.forEach((fact) => {
      const item = document.createElement("div");
      item.className =
        "evidence-item" + (this.pinnedIds.has(fact.id) ? " pinned" : "");
      item.innerHTML = `
        <div class="evidence-item-title">${fact.title}</div>
        <div class="evidence-item-text">${fact.text}</div>
        <div class="evidence-item-source">— ${fact.source}</div>
        <div class="evidence-item-action">${this.pinnedIds.has(fact.id) ? "✓ PINNED TO BOARD" : "► CLICK TO PIN"}</div>
      `;
      item.addEventListener("click", () => {
        if (!this.pinnedIds.has(fact.id)) {
          this.pinEvidence(fact);
          item.classList.add("pinned");
          item.querySelector(".evidence-item-action").textContent =
            "✓ PINNED TO BOARD";
        }
      });
      container.appendChild(item);
    });
  },

  // --- PIN EVIDENCE ---
  pinEvidence(fact) {
    if (this.pinnedIds.has(fact.id)) return;
    this.pinnedIds.add(fact.id);

    const board = document.getElementById("corkboard");
    const empty = document.getElementById("corkboard-empty");
    if (empty) empty.remove();

    const card = document.createElement("div");
    card.className = "pin-card";
    card.style.setProperty("--rot", (Math.random() * 4 - 2).toFixed(1));
    card.innerHTML = `
      <div class="pin-card-title">${fact.title}</div>
      <div class="pin-card-text">${fact.text}</div>
    `;
    board.appendChild(card);

    // Update count
    document.getElementById("board-count").textContent =
      this.pinnedIds.size + " items pinned";

    // Truth boost
    Game.boostTruth(fact.truthBoost);

    // Dossier
    this.addDossier(DOSSIER_TEMPLATES.evidenceViewed(this.pinnedIds.size));

    // Audio + effects at high counts
    Audio.playCorrect();
    if (this.pinnedIds.size >= 5) Effects.triggerGlitch();
    if (this.pinnedIds.size >= 10) Effects.triggerVHSTrack();
  },

  // --- MOUSTACHE FORENSICS ---
  buildForensics(container) {
    const intro = document.createElement("p");
    intro.style.cssText =
      "font-family:var(--font-mono);font-size:14px;color:var(--cream);line-height:1.6;margin-bottom:20px;";
    intro.textContent =
      "Side-by-side follicle analysis comparing Subject S (Selleck) and Subject R (Reynolds). All measurements taken from high-resolution film stills using proprietary forensic imaging software.";
    container.appendChild(intro);

    const keys = Object.keys(MOUSTACHE_ANALYSIS);
    keys.forEach((key, i) => {
      const d = MOUSTACHE_ANALYSIS[key];
      const max = Math.max(d.s, d.r) * 1.1;
      const row = document.createElement("div");
      row.className = "forensic-row";
      row.innerHTML = `
        <div class="forensic-label">${d.label}</div>
        <div class="forensic-track">
          <div class="forensic-bar-s" style="width:0%"></div>
          <div class="forensic-bar-r" style="width:0%"></div>
        </div>
        <div class="forensic-vals">
          <span style="color:var(--amber)">${d.s}</span> / <span style="color:var(--red)">${d.r}</span> ${d.unit}
        </div>
      `;
      container.appendChild(row);

      setTimeout(
        () => {
          row.querySelector(".forensic-bar-s").style.width =
            (d.s / max) * 100 + "%";
          row.querySelector(".forensic-bar-r").style.width =
            (d.r / max) * 100 + "%";
        },
        200 + i * 150,
      );
    });

    const verdict = document.createElement("div");
    verdict.className = "forensic-verdict";
    verdict.textContent = "ANALYZING...";
    container.appendChild(verdict);

    setTimeout(() => {
      verdict.textContent = "COMPUTING MATCH INDEX...";
    }, 1500);
    setTimeout(() => {
      verdict.textContent = "MATCH: 99.7%";
      Game.boostTruth(5);
    }, 3000);
  },

  // --- DEFENSE LAYERS ---
  buildDefenseLayers(container) {
    const intro = document.createElement("p");
    intro.style.cssText =
      "font-family:var(--font-mono);font-size:14px;color:var(--cream);line-height:1.6;margin-bottom:20px;";
    intro.textContent =
      "Every conspiracy that survives has a defense architecture. Here's how this one responds to skepticism. Click each layer. Watch how it absorbs your objections.";
    container.appendChild(intro);

    DEFENSE_LAYERS.forEach((layer) => {
      const el = document.createElement("div");
      el.className = "defense-layer";
      el.innerHTML = `
        <div class="defense-header">
          <span class="defense-name">LAYER ${layer.id}: ${layer.name}</span>
          <span class="defense-trigger">"${layer.trigger}"</span>
        </div>
        <div class="defense-body">
          <p class="defense-response">${layer.response}</p>
        </div>
      `;
      el.querySelector(".defense-header").addEventListener("click", () => {
        el.classList.toggle("open");
        if (!this.defensesOpened.has(layer.id)) {
          this.defensesOpened.add(layer.id);
          Game.boostTruth(3);
          Audio.playGlitch();
        }
      });
      container.appendChild(el);
    });
  },

  // --- DOSSIER ---
  addDossier(text) {
    const mins = Game.getMinutesElapsed();
    this.dossierEntries.push({ time: mins, text });
  },

  buildDossier(container) {
    const intro = document.createElement("p");
    intro.style.cssText =
      "font-family:var(--font-mono);font-size:14px;color:var(--cream);line-height:1.6;margin-bottom:20px;";
    intro.textContent =
      "This is the file we're building on you. Every action you take is logged. Every tool you open. Every piece of evidence you examine. This is what your investigation looks like from the outside.";
    container.appendChild(intro);

    // Add live entries
    const liveEntries = [
      ...this.dossierEntries,
      {
        time: Game.getMinutesElapsed(),
        text: DOSSIER_TEMPLATES.timeSpent(Game.getMinutesElapsed()),
      },
      {
        time: Game.getMinutesElapsed(),
        text: DOSSIER_TEMPLATES.truthRating(Game.state.truthRating),
      },
    ];

    liveEntries.forEach((entry) => {
      const el = document.createElement("div");
      el.className = "dossier-entry";
      el.innerHTML = `
        <div class="dossier-time">T+${entry.time}m</div>
        <div>${entry.text}</div>
      `;
      container.appendChild(el);
    });

    Game.boostTruth(2);
  },

  // --- SHARE ---
  buildShare(container) {
    const intro = document.createElement("p");
    intro.style.cssText =
      "font-family:var(--font-mono);font-size:14px;color:var(--cream);line-height:1.6;margin-bottom:20px;";
    intro.textContent =
      "Select a message to copy. The investigation spreads. That's how transmission works.";
    container.appendChild(intro);

    const rating = Game.getTruthLabel();
    const time = Game.getTimeString();

    SHARE_TEXTS.filter(
      (s) => !s.requires || s.requires === Game.state.believeChoice,
    ).forEach((entry) => {
      const text = entry.text
        .replace("[TIME]", time)
        .replace("[RATING]", rating);
      const el = document.createElement("div");
      el.className = "share-text";
      el.textContent = text;
      el.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(() => {
          const toast = document.createElement("div");
          toast.className = "toast";
          toast.textContent = "FINDINGS COPIED — TRANSMISSION INITIATED";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2500);
          this.addDossier(DOSSIER_TEMPLATES.sharedResults());
          Game.boostTruth(5);
        });
      });
      container.appendChild(el);
    });

    const inst = document.createElement("p");
    inst.className = "share-instruction";
    inst.textContent = "CLICK TO COPY TO CLIPBOARD";
    container.appendChild(inst);
  },
};

// Legacy alias for secrets.js compatibility
const EvidenceRoom = {
  open() {
    Game.showAct("act-feverdream");
    FeverDream.start();
  },
  close() {},
};
