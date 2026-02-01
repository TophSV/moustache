// ============================================================
// MOUSTACHE — Secret Features
// Konami code, hidden triggers, easter eggs
// ============================================================

const Secrets = {
  konamiSequence: [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ],
  konamiIndex: 0,
  clickCount: 0,

  init() {
    document.addEventListener("keydown", (e) => this.checkKonami(e.key));

    // Hidden mustache icon — triple-click to open evidence room
    const mustacheIcon = document.getElementById("mustache-icon");
    if (mustacheIcon) {
      mustacheIcon.addEventListener("click", () => {
        this.clickCount++;
        if (this.clickCount >= 3) {
          this.clickCount = 0;
          this.openEvidenceRoom();
        }
        setTimeout(() => {
          this.clickCount = 0;
        }, 1500);
      });
    }
  },

  checkKonami(key) {
    if (key === this.konamiSequence[this.konamiIndex]) {
      this.konamiIndex++;
      if (this.konamiIndex === this.konamiSequence.length) {
        this.activateTruthMode();
        this.konamiIndex = 0;
      }
    } else {
      this.konamiIndex = 0;
    }
  },

  activateTruthMode() {
    Effects.triggerGlitch();
    Effects.triggerGlitch();

    const overlay = document.createElement("div");
    overlay.className = "truth-flash";
    overlay.innerHTML =
      '<div class="truth-flash-text">THE TRUTH WAS ALWAYS HERE</div>';
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      // Jump straight to investigation with maxed truth
      document.documentElement.style.setProperty("--corruption", "1");
      document.body.classList.add("conspiracy-mode");

      if (!Game.state.started) {
        Game.state.started = true;
        Game.state.startTime = Date.now();
        Game.startTimer();
        document.getElementById("truth-bar").style.display = "";
      }

      Game.state.truthRating = 70;
      Game.updateTruthBar();
      Game.showAct("act-feverdream");
      FeverDream.start();
      Audio.init();
      Audio.startAmbient(0.5);
      Effects.startFlickerLoop(0.6);
    }, 1500);
  },

  openEvidenceRoom() {
    Audio.playReveal();
    Effects.triggerGlitch();
    EvidenceRoom.open();
  },
};
