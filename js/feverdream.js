// ============================================================
// MOUSTACHE — The Fever Dream
// A linear descent into mustache-based madness
// ============================================================

// --- HELPERS ---

function dramaticPause(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function typeText(el, text, speed = 35) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

function typeHTML(el, html, speed = 35) {
  // Types text but renders HTML at the end
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent;
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        el.innerHTML = html;
        resolve();
      }
    }, speed);
  });
}

function waitForClick(stage, buttonText, className = "fever-btn") {
  return new Promise((resolve) => {
    const btn = document.createElement("button");
    btn.className = className;
    btn.textContent = buttonText;
    btn.style.opacity = "0";
    stage.appendChild(btn);
    setTimeout(() => {
      btn.style.opacity = "1";
    }, 100);
    btn.addEventListener("click", () => {
      btn.remove();
      resolve();
    });
  });
}

function waitForAnyClick(stage) {
  return new Promise((resolve) => {
    const hint = document.createElement("div");
    hint.className = "fever-click-hint";
    hint.textContent = "click anywhere";
    stage.appendChild(hint);
    const handler = () => {
      stage.removeEventListener("click", handler);
      hint.remove();
      resolve();
    };
    stage.addEventListener("click", handler);
  });
}

function flashScreen(color = "#ff3030", duration = 150) {
  const flash = document.createElement("div");
  flash.style.cssText = `position:fixed;inset:0;background:${color};z-index:9999;opacity:0.7;pointer-events:none;`;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), duration);
}

function shakeScreen(intensity = 5, duration = 300) {
  const el = document.getElementById("act-feverdream");
  const orig = el.style.transform;
  let start = Date.now();
  const shake = () => {
    const elapsed = Date.now() - start;
    if (elapsed > duration) {
      el.style.transform = orig;
      return;
    }
    const x = (Math.random() - 0.5) * intensity * 2;
    const y = (Math.random() - 0.5) * intensity * 2;
    el.style.transform = `translate(${x}px, ${y}px) ${orig}`;
    requestAnimationFrame(shake);
  };
  requestAnimationFrame(shake);
}

function animateNumber(el, from, to, duration, suffix = "") {
  return new Promise((resolve) => {
    const start = performance.now();
    const update = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent =
        Math.floor(from + (to - from) * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(update);
      else resolve();
    };
    requestAnimationFrame(update);
  });
}

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// --- THE FEVER DREAM ---

const FeverDream = {
  stage: null,
  beatIndex: 0,

  beats: [
    // ========== BEAT 1: ACCESSING CLASSIFIED FILES ==========
    {
      corruption: 0.15,
      truth: 2,
      async render(stage, next) {
        stage.innerHTML = "";
        const terminal = makeEl("div", "fever-terminal");
        stage.appendChild(terminal);
        const l1 = makeEl("div", "fever-terminal-line");
        terminal.appendChild(l1);
        await typeText(l1, "ACCESSING CLASSIFIED FILES...", 30);
        await dramaticPause(600);
        const l2 = makeEl("div", "fever-terminal-line");
        terminal.appendChild(l2);
        await typeText(l2, "CLEARANCE LEVEL: MUSTACHE", 30);
        await dramaticPause(600);
        const l3 = makeEl("div", "fever-terminal-line fever-green");
        terminal.appendChild(l3);
        await typeText(l3, "WELCOME, INVESTIGATOR.", 40);
        Audio.playReveal();
        await dramaticPause(1200);
        next();
      },
    },

    // ========== BEAT 2: THE DESIGNATION ==========
    {
      corruption: 0.18,
      truth: 3,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title");
        card.appendChild(title);
        Effects.scrambleText(title, "THE DESIGNATION", 500);
        Audio.playGlitch();
        stage.appendChild(card);
        await dramaticPause(700);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(
          text,
          'Tom Selleck was literally called "Television\'s Burt Reynolds" by Hollywood critics.',
          30,
        );
        await dramaticPause(800);
        const sub = makeEl("div", "fever-evidence-sub");
        sub.textContent = "Not a comparison. A classification.";
        card.appendChild(sub);
        await dramaticPause(2500);
        next();
      },
    },

    // ========== BEAT 3: THE CONFESSION ==========
    {
      corruption: 0.22,
      truth: 4,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE CONFESSION");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(text, '"There was a time I could have been ', 30);
        const highlight = document.createElement("span");
        highlight.className = "fever-highlight";
        text.appendChild(highlight);
        await typeText(highlight, "mistaken", 80);
        Audio.playGlitch();
        Effects.triggerGlitch();
        const rest = document.createTextNode(
          ' for Burt Reynolds." — Tom Selleck',
        );
        text.appendChild(rest);
        await dramaticPause(1200);
        const sub = makeEl("div", "fever-evidence-sub fever-big");
        sub.textContent = "As in: recognized.";
        card.appendChild(sub);
        await dramaticPause(2500);
        next();
      },
    },

    // ========== BEAT 4: DO YOU SEE IT YET? (click gate) ==========
    {
      corruption: 0.25,
      truth: 1,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const q = makeEl("div", "fever-question", "Do you see it yet?");
        q.style.opacity = "0";
        wrap.appendChild(q);
        await dramaticPause(300);
        q.style.opacity = "1";
        await dramaticPause(1800);
        const no = makeEl("div", "fever-text-dim", "No?");
        wrap.appendChild(no);
        await dramaticPause(1500);
        const keep = makeEl("div", "fever-text-dim", "Keep looking.");
        wrap.appendChild(keep);
        await dramaticPause(1200);
        await waitForClick(wrap, "CONTINUE");
        next();
      },
    },

    // ========== BEAT 5: THE SCHEDULING PROBLEM ==========
    {
      corruption: 0.3,
      truth: 4,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl(
          "div",
          "fever-evidence-title",
          "THE SCHEDULING PROBLEM",
        );
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(
          text,
          "Both were considered for Indiana Jones. Both were considered for James Bond. Both were offered the same roles at the same time.",
          25,
        );
        await dramaticPause(800);
        const sub = makeEl("div", "fever-evidence-sub fever-big");
        card.appendChild(sub);
        await typeText(sub, "Hollywood wasn't casting two men.", 40);
        await dramaticPause(600);
        // Chromatic aberration flash
        flashScreen("#00ffff", 80);
        Effects.triggerGlitch();
        const finale = makeEl("div", "fever-evidence-sub fever-huge");
        finale.textContent = "They were scheduling one.";
        card.appendChild(finale);
        await dramaticPause(2500);
        next();
      },
    },

    // ========== BEAT 6: THE IMPOSSIBLE PHOTOGRAPH ==========
    {
      corruption: 0.35,
      truth: 5,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl(
          "div",
          "fever-evidence-title",
          "THE IMPOSSIBLE PHOTOGRAPH",
        );
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(
          text,
          'They allegedly "met" on the set of Magnum P.I. in the 1980s.',
          28,
        );
        await dramaticPause(600);
        // "One." cascade
        const sizes = [72, 54, 40, 28, 20, 14, 10];
        for (let i = 0; i < sizes.length; i++) {
          const one = makeEl("div", "fever-one");
          one.style.fontSize = sizes[i] + "px";
          one.style.opacity = 1 - i * 0.12;
          one.textContent = "One.";
          card.appendChild(one);
          await dramaticPause(300);
        }
        // Start red strings
        Effects.drawRedStrings();
        await dramaticPause(1500);
        next();
      },
    },

    // ========== BEAT 7: THE HANDOFF ==========
    {
      corruption: 0.4,
      truth: 5,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE HANDOFF");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(400);
        // Timeline
        const timeline = makeEl("div", "fever-timeline");
        card.appendChild(timeline);
        const reynolds = makeEl("div", "fever-timeline-bar fever-bar-r");
        reynolds.innerHTML = "<span>REYNOLDS 1977-1982</span>";
        reynolds.style.width = "0%";
        timeline.appendChild(reynolds);
        const selleck = makeEl("div", "fever-timeline-bar fever-bar-s");
        selleck.innerHTML = "<span>SELLECK 1980-1988</span>";
        selleck.style.width = "0%";
        timeline.appendChild(selleck);
        await dramaticPause(300);
        reynolds.style.width = "45%";
        await dramaticPause(800);
        selleck.style.width = "60%";
        selleck.style.marginLeft = "25%";
        await dramaticPause(800);
        // Overlap label
        const overlap = makeEl("div", "fever-overlap");
        overlap.textContent = "⚠ TRANSITION WINDOW";
        timeline.appendChild(overlap);
        Effects.triggerFlicker();
        await dramaticPause(1000);
        const sub = makeEl("div", "fever-evidence-sub");
        sub.textContent =
          'Not two careers. One career, managed across two "identities."';
        card.appendChild(sub);
        await dramaticPause(2500);
        next();
      },
    },

    // ========== BEAT 8: THE TONIGHT SHOW ==========
    {
      corruption: 0.45,
      truth: 3,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE TONIGHT SHOW");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(400);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(
          text,
          "Both appeared on The Tonight Show with Johnny Carson. Multiple times each. But never on the same episode. Never on the same week.",
          25,
        );
        await dramaticPause(800);
        const check = makeEl("div", "fever-evidence-sub", "Check the records.");
        card.appendChild(check);
        await dramaticPause(600);
        const wait = makeEl("div", "fever-evidence-sub", "We'll wait.");
        card.appendChild(wait);
        await dramaticPause(1500);
        // Mock loading
        const spinner = makeEl("div", "fever-spinner");
        spinner.textContent = "⏳ Searching NBC archives...";
        card.appendChild(spinner);
        await dramaticPause(2000);
        spinner.textContent = "Still checking?";
        spinner.className = "fever-evidence-sub fever-text-dim";
        await dramaticPause(1500);
        next();
      },
    },

    // ========== BEAT 9: MUSTACHE FORENSICS (click gate) ==========
    {
      corruption: 0.5,
      truth: 7,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-forensics");
        const title = makeEl("div", "fever-evidence-title");
        wrap.appendChild(title);
        Effects.scrambleText(title, "MUSTACHE FORENSICS", 600);
        stage.appendChild(wrap);
        await dramaticPause(800);
        const intro = makeEl(
          "div",
          "fever-text-dim",
          "Side-by-side follicle analysis",
        );
        wrap.appendChild(intro);
        await dramaticPause(600);
        // Animated bars
        const keys = Object.keys(MUSTACHE_ANALYSIS);
        for (let i = 0; i < keys.length; i++) {
          const d = MUSTACHE_ANALYSIS[keys[i]];
          const max = Math.max(d.s, d.r) * 1.1;
          const row = makeEl("div", "fever-forensic-row");
          row.innerHTML = `
            <span class="fever-forensic-label">${d.label}</span>
            <div class="fever-forensic-track">
              <div class="fever-forensic-fill-s" style="width:0%"></div>
              <div class="fever-forensic-fill-r" style="width:0%"></div>
            </div>
            <span class="fever-forensic-vals">${d.s} / ${d.r} ${d.unit}</span>
          `;
          wrap.appendChild(row);
          await dramaticPause(250);
          row.querySelector(".fever-forensic-fill-s").style.width =
            (d.s / max) * 100 + "%";
          row.querySelector(".fever-forensic-fill-r").style.width =
            (d.r / max) * 100 + "%";
        }
        await dramaticPause(1000);
        const verdict = makeEl("div", "fever-verdict");
        wrap.appendChild(verdict);
        Effects.scrambleText(verdict, "MATCH: 99.7%", 800);
        Audio.playReveal();
        Effects.showConspiracyPopup();
        await dramaticPause(2000);
        // Click gate
        const btnWrap = makeEl("div", "fever-choice");
        const btnYes = makeEl("button", "fever-btn", "YES, I BELIEVE");
        const btnNo = makeEl("button", "fever-btn fever-btn-dim", "NO");
        btnWrap.appendChild(btnYes);
        btnWrap.appendChild(btnNo);
        wrap.appendChild(btnWrap);
        await new Promise((resolve) => {
          btnYes.addEventListener("click", () => {
            Game.boostTruth(3);
            resolve();
          });
          btnNo.addEventListener("click", () => {
            const resp =
              SKEPTIC_RESPONSES[
                Math.floor(Math.random() * SKEPTIC_RESPONSES.length)
              ];
            btnNo.textContent = resp;
            btnNo.disabled = true;
            btnYes.remove();
            Effects.triggerGlitch();
            setTimeout(resolve, 2000);
          });
        });
        next();
      },
    },

    // ========== BEAT 10: THE CHILDREN KNEW ==========
    {
      corruption: 0.55,
      truth: 3,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl(
          "div",
          "fever-evidence-title",
          "THE CHILDREN KNEW",
        );
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        const words =
          "Children are pattern-recognition engines that haven't been taught which patterns to ignore.".split(
            " ",
          );
        for (let i = 0; i < words.length; i++) {
          text.textContent += (i > 0 ? " " : "") + words[i];
          const pause =
            words[i] === "engines" || words[i] === "ignore." ? 800 : 120;
          if (words[i] === "engines") Effects.triggerVHSTrack();
          await dramaticPause(pause);
        }
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 10.5: YOU DIDN'T EVEN NOTICE ==========
    {
      corruption: 0.58,
      truth: 5,
      async render(stage, next) {
        // Find impostors the player saw
        const impostors = (Game.state.quizPhotos || []).filter(
          (p) => p.type === "impostor",
        );
        if (impostors.length === 0) {
          next();
          return;
        }
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const title = makeEl("div", "fever-evidence-title");
        wrap.appendChild(title);
        Effects.scrambleText(title, "YOU DIDN'T EVEN NOTICE", 600);
        Audio.playGlitch();
        await dramaticPause(1500);
        const sub = makeEl("div", "fever-text-dim");
        sub.textContent = "Some of those photos weren't Tom or Burt.";
        wrap.appendChild(sub);
        await dramaticPause(2000);
        // Flash each impostor
        for (const imp of impostors) {
          const card = makeEl("div", "fever-evidence");
          card.style.borderColor = "var(--red-string)";
          const img = document.createElement("img");
          img.src = imp.url;
          img.style.cssText =
            "max-width:200px;max-height:200px;filter:grayscale(0.5) contrast(1.2);margin-bottom:12px;";
          img.crossOrigin = "anonymous";
          card.appendChild(img);
          const label = makeEl("div", "fever-highlight fever-big");
          label.textContent =
            imp.answer === "selleck"
              ? "YOU CALLED THIS TOM SELLECK"
              : "YOU CALLED THIS BURT REYNOLDS";
          card.appendChild(label);
          wrap.appendChild(card);
          shakeScreen(4, 200);
          await dramaticPause(2000);
        }
        await dramaticPause(1000);
        const punchline = makeEl(
          "div",
          "fever-evidence-sub fever-big",
          "If you can't tell who has the mustache, does it matter who's behind it?",
        );
        wrap.appendChild(punchline);
        Effects.triggerGlitch();
        await dramaticPause(3000);
        next();
      },
    },

    // ========== BEAT 11: DEFENSE PROTOCOL ==========
    {
      corruption: 0.6,
      truth: 4,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-terminal");
        stage.appendChild(wrap);
        // Rapid scroll of triggers
        for (const layer of DEFENSE_LAYERS) {
          const line = makeEl("div", "fever-terminal-line fever-fast");
          line.textContent = `> LAYER ${layer.id}: "${layer.trigger}"`;
          wrap.appendChild(line);
          await dramaticPause(200);
        }
        await dramaticPause(1000);
        // Slow response
        const resp = makeEl("div", "fever-evidence-text");
        resp.style.marginTop = "20px";
        wrap.appendChild(resp);
        await typeText(resp, DEFENSE_LAYERS[1].response, 30);
        await dramaticPause(3000); // "We'll wait." silence
        next();
      },
    },

    // ========== BEAT 12: THE HEIGHT PROBLEM (permanent tilt) ==========
    {
      corruption: 0.65,
      truth: 4,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl(
          "div",
          "fever-evidence-title",
          "THE HEIGHT DISCREPANCY",
        );
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(400);
        const text = makeEl("div", "fever-evidence-text");
        card.appendChild(text);
        await typeText(
          text,
          "Selleck is listed at 6'4\". Reynolds at 5'11\". A five-inch difference.",
          25,
        );
        await dramaticPause(800);
        const conv = makeEl("div", "fever-evidence-sub", "Convenient.");
        card.appendChild(conv);
        Effects.showConspiracyPopup();
        await dramaticPause(1200);
        const fast = makeEl("div", "fever-evidence-text");
        card.appendChild(fast);
        await typeText(
          fast,
          "...deliberately manipulated for exactly this kind of dual-identity management.",
          18,
        );
        // PERMANENT TILT
        document.body.classList.add("screen-tilt");
        Effects.triggerGlitch();
        shakeScreen(3, 200);
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 13: THE AGE PROBLEM ==========
    {
      corruption: 0.7,
      truth: 5,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE AGE PROBLEM");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(400);
        const gap = makeEl("div", "fever-huge", "A nine-year gap.");
        card.appendChild(gap);
        await dramaticPause(1500);
        const need = makeEl("div", "fever-evidence-text");
        card.appendChild(need);
        await typeText(
          need,
          "If you were maintaining two identities, you would ",
          25,
        );
        const needSpan = document.createElement("span");
        needSpan.className = "fever-highlight";
        need.appendChild(needSpan);
        Effects.scrambleText(needSpan, "NEED", 400);
        shakeScreen(4, 300);
        await dramaticPause(600);
        const rest = document.createTextNode(" an age gap.");
        need.appendChild(rest);
        // Stacked popups
        Effects.showConspiracyPopup();
        await dramaticPause(500);
        Effects.showConspiracyPopup();
        await dramaticPause(500);
        Effects.showConspiracyPopup();
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 14: ARE YOU STILL HERE? (click gate) ==========
    {
      corruption: 0.73,
      truth: 2,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const doss = makeEl("div", "fever-dossier-text");
        wrap.appendChild(doss);
        await typeText(
          doss,
          DOSSIER_TEMPLATES.timeSpent(Game.getMinutesElapsed()),
          20,
        );
        await dramaticPause(800);
        const doss2 = makeEl("div", "fever-dossier-text");
        wrap.appendChild(doss2);
        await typeText(
          doss2,
          DOSSIER_TEMPLATES.truthRating(Game.state.truthRating),
          20,
        );
        await dramaticPause(1200);
        const close = makeEl("div", "fever-text-dim");
        wrap.appendChild(close);
        await typeText(close, "You could close this tab right now.", 40);
        await dramaticPause(1500);
        const wont = makeEl(
          "div",
          "fever-evidence-sub fever-big",
          "You won't.",
        );
        wrap.appendChild(wont);
        await dramaticPause(1200);
        const btn = makeEl("button", "fever-btn", "I CAN'T STOP");
        wrap.appendChild(btn);
        await new Promise((resolve) => {
          btn.addEventListener("click", () => {
            btn.textContent = "WE KNOW";
            Effects.triggerGlitch();
            setTimeout(resolve, 800);
          });
        });
        next();
      },
    },

    // ========== BEAT 15: WARDROBE / TRANS AM (rapid montage) ==========
    {
      corruption: 0.78,
      truth: 3,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const lines = [
          "The same wardrobe.",
          "The same car.",
          "The same mustache.",
          "The same era.",
        ];
        for (const line of lines) {
          const el = makeEl("div", "fever-slam", line);
          wrap.appendChild(el);
          shakeScreen(6, 150);
          Audio.playGlitch();
          await dramaticPause(800);
        }
        Effects.drawRedStrings();
        await dramaticPause(1500);
        next();
      },
    },

    // ========== BEAT 16: THE SCRIPT ANOMALY ==========
    {
      corruption: 0.82,
      truth: 4,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl(
          "div",
          "fever-evidence-title",
          "THE SCRIPT ANOMALY",
        );
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(400);
        const script = makeEl("div", "fever-script");
        script.innerHTML =
          '<em>"Doing a Burt Reynolds impersonation for the tourists."</em>';
        card.appendChild(script);
        await dramaticPause(1500);
        const note = makeEl("div", "fever-evidence-text");
        card.appendChild(note);
        await typeText(note, "This line was not in the original script.", 30);
        await dramaticPause(800);
        Effects.triggerGlitch();
        Effects.triggerVHSTrack();
        // Distort
        card.style.transform = "skewX(-2deg)";
        card.style.filter = "hue-rotate(15deg)";
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 17: THE FOLLICLE IMPOSSIBILITY ==========
    {
      corruption: 0.87,
      truth: 6,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const label = makeEl(
          "div",
          "fever-text-dim",
          "The probability of two unrelated mustaches matching to this degree:",
        );
        wrap.appendChild(label);
        await dramaticPause(800);
        const num = makeEl("div", "fever-huge fever-number");
        num.textContent = "1";
        wrap.appendChild(num);
        await animateNumber(num, 1, 847000000, 2500, "");
        num.textContent = "1 in 847,000,000";
        // Vibrate
        num.classList.add("fever-vibrate");
        Effects.triggerVHSTrack();
        Effects.triggerVHSTrack();
        Audio.playGlitch();
        await dramaticPause(3000);
        next();
      },
    },

    // ========== BEAT 18: REALITY DISSOLUTION (click anywhere) ==========
    {
      corruption: 0.9,
      truth: 5,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const text = makeEl("div", "fever-evidence-text");
        wrap.appendChild(text);
        await typeText(
          text,
          "You're suffering from a mustache-specific perceptual disorder brought on by prolonged exposure to thick facial hair in media. The ",
          18,
        );
        // Break — text starts overlapping itself
        const chaos = makeEl("div", "fever-chaos");
        wrap.appendChild(chaos);
        const fragment = "the Selleck-Reynolds Complex ";
        for (let i = 0; i < 8; i++) {
          chaos.textContent += fragment;
          chaos.style.fontSize = 14 + i * 2 + "px";
          chaos.style.opacity = 1 - i * 0.08;
          Effects.triggerFlicker();
          await dramaticPause(150);
        }
        // HARD CUT
        stage.innerHTML = "";
        stage.style.background = "#000";
        Audio.playGlitch();
        await dramaticPause(2000);
        const calm = makeEl("div", "fever-calm", "There is only one mustache.");
        stage.appendChild(calm);
        await dramaticPause(1500);
        await waitForAnyClick(stage);
        stage.style.background = "";
        next();
      },
    },

    // ========== BEAT 19: THE RETIREMENT ==========
    {
      corruption: 0.93,
      truth: 7,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE RETIREMENT");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const died = makeEl("div", "fever-huge");
        died.innerHTML =
          'Burt Reynolds <span class="fever-highlight fever-vibrate">"died"</span>';
        card.appendChild(died);
        await dramaticPause(2000);
        const decomm = makeEl("div", "fever-evidence-text");
        card.appendChild(decomm);
        await typeText(decomm, "The older identity was decommissioned.", 40);
        await dramaticPause(1000);
        // Word by word
        const words = "The mission continues under a single cover.".split(" ");
        const finale = makeEl("div", "fever-evidence-sub fever-big");
        card.appendChild(finale);
        for (const word of words) {
          finale.textContent += (finale.textContent ? " " : "") + word;
          await dramaticPause(700);
        }
        flashScreen("#cc2020", 500);
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 20: YOUR DOSSIER ==========
    {
      corruption: 0.96,
      truth: 3,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-terminal");
        stage.appendChild(wrap);
        const entries = [
          DOSSIER_TEMPLATES.quizComplete(
            Game.state.score,
            Game.state.totalRounds,
          ),
          DOSSIER_TEMPLATES.evidenceViewed(14),
          DOSSIER_TEMPLATES.truthRating(Game.state.truthRating),
          "Subject has viewed the entire file. Subject is now part of the file.",
          "Subject's browser history has been noted.",
        ];
        for (const entry of entries) {
          const line = makeEl("div", "fever-terminal-line");
          wrap.appendChild(line);
          await typeText(line, "> " + entry, 12);
          wrap.scrollTop = wrap.scrollHeight;
          await dramaticPause(400);
        }
        Effects.triggerGlitch();
        await dramaticPause(2000);
        next();
      },
    },

    // ========== BEAT 21: THERE IS ONLY ONE MUSTACHE (crescendo) ==========
    {
      corruption: 1.0,
      truth: 10,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const huge = makeEl("div", "fever-finale-text");
        wrap.appendChild(huge);
        Effects.scrambleText(huge, "THERE IS ONLY ONE MUSTACHE", 1200);
        Audio.playReveal();
        // Chaos
        Effects.drawRedStrings();
        await dramaticPause(500);
        Effects.showConspiracyPopup();
        await dramaticPause(400);
        Effects.triggerGlitch();
        Effects.showConspiracyPopup();
        await dramaticPause(400);
        Effects.triggerVHSTrack();
        Effects.showConspiracyPopup();
        await dramaticPause(400);
        Effects.triggerGlitch();
        Effects.triggerFlicker();
        Effects.showConspiracyPopup();
        // Truth to 100
        while (Game.state.truthRating < 100) {
          Game.boostTruth(2);
          await dramaticPause(100);
        }
        await dramaticPause(2000);
        // BLACKOUT
        stage.innerHTML = "";
        stage.style.background = "#000";
        Effects.stopFlickerLoop();
        Audio.startAmbient(0);
        document.getElementById("popup-container").innerHTML = "";
        await dramaticPause(3000);
        stage.style.background = "";
        next();
      },
    },

    // ========== BEAT 22: THE END ==========
    {
      corruption: 0.6,
      truth: 0,
      async render(stage, next) {
        stage.innerHTML = "";
        document.body.classList.remove("screen-tilt");
        const wrap = makeEl("div", "fever-finale");
        stage.appendChild(wrap);
        await dramaticPause(500);
        const rating = makeEl("div", "fever-finale-rating");
        rating.textContent = "Your Truth Rating: " + Game.state.truthRating;
        wrap.appendChild(rating);
        await dramaticPause(800);
        const label = makeEl("div", "fever-finale-label", Game.getTruthLabel());
        wrap.appendChild(label);
        await dramaticPause(1000);
        const line = makeEl(
          "div",
          "fever-text-dim",
          "You can't prove they're different people. You've tried.",
        );
        wrap.appendChild(line);
        await dramaticPause(1500);
        // Share cards
        const shareWrap = makeEl("div", "fever-share-wrap");
        wrap.appendChild(shareWrap);
        const shareLabel = makeEl(
          "div",
          "fever-share-label",
          "TRANSMIT YOUR FINDINGS",
        );
        shareWrap.appendChild(shareLabel);
        const rating_text = Game.getTruthLabel();
        const time = Game.getTimeString();
        SHARE_TEXTS.forEach((template) => {
          const text = template
            .replace("[TIME]", time)
            .replace("[RATING]", rating_text);
          const card = makeEl("div", "fever-share-card", text);
          card.addEventListener("click", () => {
            navigator.clipboard.writeText(text).then(() => {
              card.textContent = "COPIED — TRANSMISSION INITIATED";
              card.classList.add("fever-copied");
            });
          });
          shareWrap.appendChild(card);
        });
        const spread = makeEl(
          "div",
          "fever-text-dim",
          "The investigation spreads. That's how transmission works.",
        );
        wrap.appendChild(spread);
        await dramaticPause(2000);
        const again = makeEl("div", "fever-play-again");
        again.textContent = "PLAY AGAIN — DIFFERENT PHOTOS, SAME TRUTH";
        again.addEventListener("click", () => {
          Effects.cleanup();
          document.body.classList.remove("screen-tilt", "conspiracy-mode");
          Game.showAct("act-title");
        });
        wrap.appendChild(again);
        // Don't call next — this is the end
      },
    },
  ],

  start() {
    this.stage = document.getElementById("fever-stage");
    this.beatIndex = 0;
    Audio.startAmbient(0.2);
    Effects.startFlickerLoop(0.15);
    this.runBeat();
  },

  runBeat() {
    if (this.beatIndex >= this.beats.length) return;
    const beat = this.beats[this.beatIndex];
    document.documentElement.style.setProperty("--corruption", beat.corruption);
    if (beat.truth) Game.boostTruth(beat.truth);
    Audio.startAmbient(beat.corruption);
    Effects.startFlickerLoop(beat.corruption);
    beat.render(this.stage, () => {
      this.beatIndex++;
      this.runBeat();
    });
  },
};
