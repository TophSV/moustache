// ============================================================
// MOUSTACHE — Main Game Controller
// The engine. The state. The slow, inevitable descent.
// ============================================================

const Game = {
  state: {
    act: "title",
    round: 0,
    score: 0,
    totalRounds: 8,
    answers: [],
    truthRating: 0,
    startTime: null,
    started: false,
    timerInterval: null,
  },

  init() {
    // Preroll video intro
    this.startPreroll();

    // Sound toggle
    const soundBtn = document.getElementById("sound-toggle");
    soundBtn.addEventListener("click", () => {
      Audio.init();
      const on = Audio.toggle();
      soundBtn.classList.toggle("active", on);
      soundBtn.innerHTML = on
        ? '<span class="sound-on">&#9835;</span>'
        : '<span class="sound-off">&#9834;</span>';
    });

    // Start button
    document.getElementById("start-btn").addEventListener("click", () => {
      Audio.init();
      this.startGame();
    });

    // Quiz answer buttons
    document
      .getElementById("btn-selleck")
      .addEventListener("click", () => this.submitAnswer("selleck"));
    document
      .getElementById("btn-reynolds")
      .addEventListener("click", () => this.submitAnswer("reynolds"));

    // Enter investigation button
    document
      .getElementById("enter-investigation-btn")
      .addEventListener("click", () => this.enterInvestigation());

    // (Tool buttons and detail panel removed — fever dream handles post-quiz)

    // Secrets
    Secrets.init();

    // Beforeunload — log in dossier
    window.addEventListener("beforeunload", () => {
      if (this.state.started) {
        Investigation.addDossier(DOSSIER_TEMPLATES.triedToLeave());
      }
    });
  },

  // --- PREROLL ---
  startPreroll() {
    const video = document.getElementById("preroll-video");
    const secondsEl = document.getElementById("preroll-seconds");
    const countdown = document.getElementById("preroll-countdown");
    const playBtn = document.getElementById("preroll-play");
    const skipBtn = document.getElementById("preroll-skip");
    let remaining = 8;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      const preroll = document.getElementById("act-preroll");
      preroll.style.opacity = "0";
      preroll.style.transition = "opacity 0.8s ease";
      setTimeout(() => {
        this.showAct("act-title");
      }, 800);
    };

    let timer;

    playBtn.addEventListener("click", () => {
      playBtn.style.display = "none";
      skipBtn.style.display = "none";
      video.style.display = "";
      countdown.style.display = "";
      // They chose sound — default it on
      Audio.init();
      Audio.muted = false;
      const soundBtn = document.getElementById("sound-toggle");
      soundBtn.classList.add("active");
      soundBtn.innerHTML = '<span class="sound-on">&#9835;</span>';
      video.play();
      timer = setInterval(() => {
        remaining--;
        if (secondsEl) secondsEl.textContent = remaining;
        if (remaining <= 0) finish();
      }, 1000);
      video.addEventListener("ended", finish);
    });

    skipBtn.addEventListener("click", finish);
  },

  // --- ACT MANAGEMENT ---
  showAct(actId) {
    document
      .querySelectorAll(".act")
      .forEach((a) => a.classList.remove("active"));
    const el = document.getElementById(actId);
    if (el) el.classList.add("active");
    this.state.act = actId;
  },

  // --- QUIZ SELECTION ---
  selectQuizPhotos() {
    const shuffle = (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    const selleck = shuffle(
      PHOTO_DATA.filter((p) => p.answer === "selleck" && p.type === "real"),
    );
    const reynolds = shuffle(
      PHOTO_DATA.filter((p) => p.answer === "reynolds" && p.type === "real"),
    );
    const impostors = shuffle(PHOTO_DATA.filter((p) => p.type === "impostor"));

    // Pick 3 selleck, 3 reynolds, 2 impostors — no duplicate URLs
    const usedUrls = new Set();
    const pickUnique = (pool, count) => {
      const result = [];
      for (const p of pool) {
        if (result.length >= count) break;
        if (!usedUrls.has(p.url)) {
          usedUrls.add(p.url);
          result.push(p);
        }
      }
      return result;
    };
    const pickedSelleck = pickUnique(selleck, 3);
    const pickedReynolds = pickUnique(reynolds, 3);
    const pickedImpostors = pickUnique(impostors, 2);
    const picked = [...pickedSelleck, ...pickedReynolds, ...pickedImpostors];

    // Guarantee first 2 slots are real photos (no impostors)
    const reals = shuffle(picked.filter((p) => p.type === "real"));
    const imps = picked.filter((p) => p.type === "impostor");
    const firstTwo = reals.slice(0, 2);
    const rest = shuffle([...reals.slice(2), ...imps]);

    const labels = "ABCDEFGH";
    return [...firstTwo, ...rest].map((photo, i) => ({
      ...photo,
      exhibit: "Exhibit " + labels[i],
    }));
  },

  // --- START GAME ---
  startGame() {
    this.state = {
      act: "act-quiz",
      round: 0,
      score: 0,
      totalRounds: 8,
      answers: [],
      truthRating: 0,
      startTime: Date.now(),
      started: true,
      timerInterval: null,
      quizPhotos: this.selectQuizPhotos(),
    };

    // Animate "MOUSTACHE" wordmark: flash from title, then reveal header logo
    const titleMain = document.querySelector(".title-main");
    const headerLogo = document.getElementById("header-logo");
    if (titleMain && headerLogo) {
      const rect = titleMain.getBoundingClientRect();
      const cs = getComputedStyle(titleMain);
      // Create flying clone
      const wordmark = document.createElement("span");
      wordmark.id = "header-wordmark";
      wordmark.textContent = "MOUSTACHE";
      wordmark.style.top = rect.top + "px";
      wordmark.style.left = rect.left + "px";
      wordmark.style.fontSize = cs.fontSize;
      wordmark.style.opacity = "1";
      wordmark.style.transition =
        "top 0.6s cubic-bezier(0.4,0,0.2,1), left 0.6s cubic-bezier(0.4,0,0.2,1), font-size 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s cubic-bezier(0.4,0,0.2,1)";
      document.body.appendChild(wordmark);
      wordmark.offsetHeight;
      // Fly toward header logo position
      const logoText = headerLogo.querySelector(".header-logo-text");
      headerLogo.style.display = "";
      const logoRect = logoText.getBoundingClientRect();
      wordmark.style.top = logoRect.top + "px";
      wordmark.style.left = logoRect.left + "px";
      wordmark.style.fontSize = "13px";
      wordmark.style.opacity = "0.5";
      // After transition: glitch flash, remove clone, reveal logo
      setTimeout(() => {
        Effects.triggerGlitch();
        wordmark.remove();
        headerLogo.classList.add("visible");
      }, 650);
    }

    // Show truth bar
    document.getElementById("truth-bar").style.display = "";

    // Start timer
    this.startTimer();

    // Show quiz
    this.showAct("act-quiz");
    this.nextRound();
  },

  // --- TIMER ---
  startTimer() {
    if (this.state.timerInterval) clearInterval(this.state.timerInterval);
    this.state.timerInterval = setInterval(() => this.updateTimer(), 1000);
    this.updateTimer();
  },

  updateTimer() {
    const el = document.getElementById("time-display");
    if (el) el.textContent = this.getTimeString();
  },

  getMinutesElapsed() {
    if (!this.state.startTime) return 0;
    return Math.floor((Date.now() - this.state.startTime) / 60000);
  },

  getTimeString() {
    if (!this.state.startTime) return "0:00";
    const secs = Math.floor((Date.now() - this.state.startTime) / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m + ":" + String(s).padStart(2, "0");
  },

  // --- TRUTH RATING ---
  boostTruth(amount) {
    this.state.truthRating = Math.min(100, this.state.truthRating + amount);
    this.updateTruthBar();
  },

  updateTruthBar() {
    const r = this.state.truthRating;
    document.getElementById("truth-value").textContent = r;
    document.getElementById("truth-meter-fill").style.width = r + "%";

    // Find label
    const tier =
      TRUTH_RATINGS.find((t) => r <= t.max) ||
      TRUTH_RATINGS[TRUTH_RATINGS.length - 1];
    document.getElementById("truth-status").textContent = tier.label;

    // Corruption scales with truth rating
    const corruption = Math.min(1, r / 100);
    document.documentElement.style.setProperty("--corruption", corruption);

    // Add conspiracy mode class at high ratings
    if (r >= 60) {
      document.body.classList.add("conspiracy-mode");
    }
  },

  getTruthLabel() {
    const r = this.state.truthRating;
    const tier =
      TRUTH_RATINGS.find((t) => r <= t.max) ||
      TRUTH_RATINGS[TRUTH_RATINGS.length - 1];
    return tier.label;
  },

  // --- QUIZ FLOW ---
  nextRound() {
    this.state.round++;
    if (this.state.round > this.state.totalRounds) {
      this.showTurn();
      return;
    }

    this.updateHUD();

    // Show loading
    const loading = document.getElementById("quiz-loading");
    const photo = document.getElementById("quiz-photo");
    const result = document.getElementById("quiz-result");

    loading.style.display = "";
    photo.style.display = "none";
    result.style.display = "none";

    // Loading message
    const msg =
      LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    document.getElementById("loading-text").textContent = msg;

    // Loading delay
    const duration = 1200 + Math.random() * 800;
    setTimeout(() => this.showPhoto(), duration);
  },

  showPhoto() {
    const data = this.state.quizPhotos[this.state.round - 1];
    if (!data) return this.showTurn();

    const img = document.getElementById("photo-img");
    const fallback = document.getElementById("photo-fallback");

    img.style.display = "";
    fallback.style.display = "none";

    img.onerror = () => {
      img.style.display = "none";
      fallback.style.display = "";
      document.getElementById("fallback-exhibit").textContent = data.exhibit;
      document.getElementById("fallback-desc").textContent = data.desc;
      document.getElementById("fallback-era").textContent = data.era;
    };

    img.src = data.url;

    document.getElementById("exhibit-label").textContent = data.exhibit;
    document.getElementById("era-label").textContent = data.era;

    const hintArea = document.getElementById("hint-area");
    hintArea.textContent = data.hint || "";

    // Enable buttons
    document
      .querySelectorAll(".btn-answer")
      .forEach((b) => (b.disabled = false));

    // Show photo area
    document.getElementById("quiz-loading").style.display = "none";
    document.getElementById("quiz-photo").style.display = "";
    document.getElementById("quiz-result").style.display = "none";
  },

  // Track used foreshadow messages
  usedPre: [],
  usedPost: [],

  pickFrom(pool, used) {
    if (used.length >= pool.length) used.length = 0;
    const available = pool.filter((f) => !used.includes(f));
    const msg = available[Math.floor(Math.random() * available.length)];
    used.push(msg);
    return msg;
  },

  // Pre-answer intrusion — short, violent, jarring
  showPreIntrusion(callback) {
    const msg = this.pickFrom(FORESHADOW_PRE, this.usedPre);
    const overlay = document.createElement("div");
    overlay.className = "quiz-foreshadow foreshadow-pre";
    const text = document.createElement("div");
    text.className = "foreshadow-text foreshadow-text-pre";
    text.textContent = msg;
    overlay.appendChild(text);
    document.body.appendChild(overlay);
    Audio.playGlitch();
    Effects.triggerGlitch();

    // Short sharp hold then snap back
    setTimeout(
      () => {
        overlay.remove();
        callback();
      },
      800 + Math.random() * 400,
    );
  },

  // Post-answer intrusion — full vision, burns in from black
  showPostIntrusion(callback) {
    const msg = this.pickFrom(FORESHADOW_POST, this.usedPost);
    const overlay = document.createElement("div");
    overlay.className = "quiz-foreshadow";
    document.body.appendChild(overlay);
    Effects.triggerGlitch();

    // Text burns in after a beat of black
    setTimeout(() => {
      const text = document.createElement("div");
      text.className = "foreshadow-text";
      text.textContent = msg;
      overlay.appendChild(text);
    }, 400);

    // Hard snap back
    setTimeout(() => {
      Audio.playGlitch();
      Effects.triggerGlitch();
      overlay.remove();
      callback();
    }, 2800);
  },

  submitAnswer(guess) {
    // Disable buttons
    document
      .querySelectorAll(".btn-answer")
      .forEach((b) => (b.disabled = true));

    const data = this.state.quizPhotos[this.state.round - 1];
    const isImpostor = data.type === "impostor";
    const isCorrect = guess === data.answer;

    if (isImpostor || isCorrect) {
      this.state.score++;
    }

    this.state.answers.push({
      round: this.state.round,
      guess,
      correct: isImpostor || isCorrect,
      actual: data.answer,
    });

    // Truth goes up on correct (including impostors)
    if (isCorrect || isImpostor) this.boostTruth(4);
    this.updateHUD();

    const round = this.state.round;

    const showResult = () => {
      if (isImpostor || isCorrect) {
        Audio.playCorrect();
      } else {
        Audio.playWrong();
      }

      const resultEl = document.getElementById("quiz-result");
      const iconEl = document.getElementById("result-icon");
      const textEl = document.getElementById("result-text");
      const subEl = document.getElementById("result-subtext");

      resultEl.style.display = "";
      document.getElementById("quiz-photo").style.display = "none";
      subEl.textContent = "";
      subEl.style.display = "none";

      if (isImpostor) {
        iconEl.textContent = "\u2713";
        textEl.textContent = "CORRECT... TECHNICALLY";
        resultEl.className = "quiz-result result-impostor";
        if (data.joke) {
          subEl.textContent = data.joke;
          subEl.style.display = "";
        }
      } else if (isCorrect) {
        iconEl.textContent = "\u2713";
        textEl.textContent = "CORRECT";
        resultEl.className = "quiz-result result-correct";
      } else {
        const name =
          data.answer === "selleck" ? "Tom Selleck" : "Burt Reynolds";
        iconEl.textContent = "\u2717";
        textEl.textContent = "INCORRECT \u2014 That was " + name;
        resultEl.className = "quiz-result result-wrong";
      }

      const resultDelay = isImpostor ? 3500 : 1800;

      setTimeout(() => {
        const isLastRound = round >= this.state.totalRounds;
        // Post-answer intrusion — skip round 1 and last round
        if (round > 1 && !isLastRound) {
          this.showPostIntrusion(() => this.nextRound());
        } else {
          this.nextRound();
        }
      }, resultDelay);
    };

    // Pre-answer intrusion — every round after round 1
    // Hide the photo first so the intrusion cuts from a clean state
    document.getElementById("quiz-photo").style.display = "none";
    if (round > 1) {
      this.showPreIntrusion(showResult);
    } else {
      showResult();
    }
  },

  updateHUD() {
    const rd = document.getElementById("round-display");
    const sd = document.getElementById("score-display");
    if (rd) rd.textContent = this.state.round + " / " + this.state.totalRounds;
    if (sd) sd.textContent = this.state.score;
  },

  // --- THE TURN ---
  showTurn() {
    // Add quiz completion to dossier
    Investigation.addDossier(
      DOSSIER_TEMPLATES.quizComplete(this.state.score, this.state.totalRounds),
    );

    this.showAct("act-turn");

    // Score display
    document.getElementById("turn-score").textContent = this.state.score;
    const comment = document.getElementById("turn-score-comment");
    if (this.state.score >= 7) {
      comment.textContent = "Interesting. You seem to know too much.";
    } else if (this.state.score >= 4) {
      comment.textContent = "Not bad. Not good enough.";
    } else {
      comment.textContent = "Exactly what they want you to score.";
    }

    // Reveal lines with delays
    document.querySelectorAll(".turn-line").forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });

    // Make turn content visible now that opacity is set to 0
    document.querySelector(".turn-content").style.visibility = "visible";
  },

  // --- ENTER THE FEVER DREAM ---
  enterInvestigation() {
    // Snapshot truth label before fever dream corrupts it
    this.state.preFeverTruthLabel = this.getTruthLabel();
    this.showAct("act-feverdream");
    FeverDream.start();
  },
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => Game.init());
