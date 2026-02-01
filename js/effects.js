// ============================================================
// MOUSTACHE — Effects Engine
// Glitches, flickers, popups, text scramble, red strings
// ============================================================

const Effects = {
  flickerInterval: null,
  popupTimeout: null,

  triggerGlitch() {
    document.body.classList.add("glitching");
    Audio.playGlitch();
    setTimeout(() => document.body.classList.remove("glitching"), 250);
  },

  triggerVHSTrack() {
    document.body.classList.add("vhs-tracking");
    setTimeout(() => document.body.classList.remove("vhs-tracking"), 500);
  },

  triggerFlicker() {
    document.body.classList.add("flickering");
    setTimeout(() => document.body.classList.remove("flickering"), 200);
  },

  startFlickerLoop(corruption) {
    this.stopFlickerLoop();
    if (corruption < 0.15) return;

    const baseInterval = 8000;
    const minInterval = 1500;
    const interval = baseInterval - corruption * (baseInterval - minInterval);

    this.flickerInterval = setInterval(
      () => {
        const roll = Math.random();
        if (roll < 0.5) {
          this.triggerFlicker();
        } else if (roll < 0.8) {
          this.triggerVHSTrack();
        } else {
          this.triggerGlitch();
        }
      },
      interval + Math.random() * 2000,
    );
  },

  stopFlickerLoop() {
    if (this.flickerInterval) {
      clearInterval(this.flickerInterval);
      this.flickerInterval = null;
    }
  },

  triggerLayerEffects(layer, corruption) {
    document.documentElement.style.setProperty("--corruption", corruption);

    if (layer >= 2) {
      this.startFlickerLoop(corruption);
      if (Math.random() < corruption * 0.4) {
        setTimeout(
          () => this.showConspiracyPopup(),
          1000 + Math.random() * 2000,
        );
      }
    }

    if (layer >= 3) {
      document.body.classList.add("conspiracy-mode");
      this.drawRedStrings();
      this.showAnalysisSidebar();
    }
  },

  showConspiracyPopup() {
    const container = document.getElementById("popup-container");
    if (container.children.length > 0) return;

    const messages = [
      "WARNING: Facial pattern match exceeds 94.7%",
      "ALERT: Mustache curvature deviation within margin of error",
      'SYSTEM: Two "separate" SAG registrations detected for same biometric profile',
      "ERROR: Cannot reconcile two identities with single follicle pattern",
      "NOTICE: Your participation in this investigation has been logged",
      "WARNING: Cognitive dissonance levels approaching critical threshold",
      'ALERT: Subject "Selleck" and Subject "Reynolds" share dental records',
      "SYSTEM ERROR: Hollywood cover-up protocol 7-B engaged",
    ];

    const popup = document.createElement("div");
    popup.className = "conspiracy-popup";
    popup.style.top = 60 + Math.random() * 30 + "%";
    popup.style.left = Math.random() > 0.5 ? "5%" : "";
    popup.style.right = popup.style.left ? "" : "5%";
    popup.innerHTML = `
      <div class="popup-titlebar">
        <span>⚠ SYSTEM ALERT</span>
        <button class="popup-close" onclick="this.closest('.conspiracy-popup').remove()">×</button>
      </div>
      <div class="popup-body">${messages[Math.floor(Math.random() * messages.length)]}</div>
    `;

    container.appendChild(popup);

    setTimeout(() => {
      if (popup.parentNode) {
        popup.classList.add("dismissing");
        setTimeout(() => popup.remove(), 300);
      }
    }, 3500);
  },

  showAnalysisSidebar() {
    // Legacy — forensics now handled by Investigation.buildForensics
  },

  hideAnalysisSidebar() {
    // Legacy — no-op
  },

  animateNumber(el, from, to, duration, decimals, suffix) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = from + (to - from) * eased;
      el.textContent = value.toFixed(decimals) + (suffix || "");
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  scrambleText(el, finalText, duration) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    const steps = 12;
    const stepDuration = duration / steps;
    let step = 0;

    el.classList.add("scrambling");

    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval);
        el.textContent = finalText;
        el.classList.remove("scrambling");
        return;
      }

      const progress = step / steps;
      let text = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < finalText.length * progress) {
          text += finalText[i];
        } else {
          text += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = text;
      step++;
    }, stepDuration);
  },

  drawRedStrings() {
    const svg = document.getElementById("red-strings");
    if (svg.children.length > 0) return;

    svg.setAttribute(
      "viewBox",
      `0 0 ${window.innerWidth} ${window.innerHeight}`,
    );
    svg.style.width = "100%";
    svg.style.height = "100%";

    const points = [];
    for (let i = 0; i < 8; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });
    }

    // Draw connecting lines
    for (let i = 0; i < points.length - 1; i++) {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("x1", points[i].x);
      line.setAttribute("y1", points[i].y);
      line.setAttribute("x2", points[i + 1].x);
      line.setAttribute("y2", points[i + 1].y);
      line.setAttribute("class", "red-string-line");
      line.style.animationDelay = i * 0.3 + "s";
      svg.appendChild(line);
    }

    // Draw pins
    points.forEach((p) => {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      circle.setAttribute("cx", p.x);
      circle.setAttribute("cy", p.y);
      circle.setAttribute("r", "4");
      circle.setAttribute("class", "red-string-pin");
      svg.appendChild(circle);
    });
  },

  clearRedStrings() {
    const svg = document.getElementById("red-strings");
    svg.innerHTML = "";
  },

  cleanup() {
    this.stopFlickerLoop();
    this.clearRedStrings();
    this.hideAnalysisSidebar();
    document.body.classList.remove(
      "glitching",
      "vhs-tracking",
      "flickering",
      "conspiracy-mode",
    );
    document.getElementById("popup-container").innerHTML = "";
  },
};
