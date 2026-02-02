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
        await typeText(l2, "CLEARANCE LEVEL: MOUSTACHE", 30);
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
        await dramaticPause(1200);
        sub.textContent = "As in: recognized. Found out.";
        await dramaticPause(1800);
        sub.textContent = "As in: recognized. Caught.";
        await dramaticPause(120);
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

    // ========== BEAT 9: MOUSTACHE FORENSICS (click gate) ==========
    {
      corruption: 0.5,
      truth: 7,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-forensics");
        const title = makeEl("div", "fever-evidence-title");
        wrap.appendChild(title);
        Effects.scrambleText(title, "MOUSTACHE FORENSICS", 600);
        stage.appendChild(wrap);
        await dramaticPause(800);
        const intro = makeEl(
          "div",
          "fever-text-dim",
          "Side-by-side follicle analysis",
        );
        intro.style.marginBottom = "16px";
        wrap.appendChild(intro);
        await dramaticPause(600);
        // Animated bars
        const keys = Object.keys(MOUSTACHE_ANALYSIS);
        for (let i = 0; i < keys.length; i++) {
          const d = MOUSTACHE_ANALYSIS[keys[i]];
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
            Game.state.believeChoice = "yes";
            Game.boostTruth(3);
            resolve();
          });
          btnNo.addEventListener("click", () => {
            Game.state.believeChoice = "no";
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

    // ========== BEAT 9.5: CONDITIONAL — YES: THE PAPER TRAIL / NO: THE MOUSTACHE RESPONDS ==========
    {
      corruption: 0.53,
      truth: 0, // truth is boosted manually inside each path
      async render(stage, next) {
        if (Game.state.believeChoice === "yes") {
          // === THE PAPER TRAIL (YES path) ===
          stage.innerHTML = "";
          const terminal = makeEl("div", "fever-terminal");
          stage.appendChild(terminal);
          const l1 = makeEl("div", "fever-terminal-line fever-green");
          terminal.appendChild(l1);
          await typeText(l1, "> BELIEF CONFIRMED.", 25);
          await dramaticPause(600);
          const l2 = makeEl("div", "fever-terminal-line fever-green");
          terminal.appendChild(l2);
          await typeText(l2, "> UNLOCKING RESTRICTED FILE.", 25);
          Audio.playGlitch();
          Effects.triggerGlitch();
          await dramaticPause(1200);

          stage.innerHTML = "";
          const card = makeEl("div", "fever-evidence");
          const title = makeEl("div", "fever-evidence-title");
          card.appendChild(title);
          Effects.scrambleText(title, "THE PAPER TRAIL", 500);
          stage.appendChild(card);
          await dramaticPause(800);

          const text1 = makeEl("div", "fever-evidence-text");
          card.appendChild(text1);
          await typeText(
            text1,
            "In 1989, Selleck became the executive producer of a television show.",
            25,
          );
          await dramaticPause(600);

          const text2 = makeEl("div", "fever-evidence-sub fever-big");
          text2.textContent = "It starred Reynolds.";
          card.appendChild(text2);
          shakeScreen(4, 200);
          await dramaticPause(1800);

          const text3 = makeEl("div", "fever-evidence-text");
          card.appendChild(text3);
          const phrases = [
            "One identity.",
            "Controlling the other's career.",
            "In writing.",
            "On a contract.",
          ];
          for (const phrase of phrases) {
            text3.textContent += (text3.textContent ? " " : "") + phrase;
            await dramaticPause(600);
          }
          await dramaticPause(800);

          const kicker = makeEl("div", "fever-huge");
          card.appendChild(kicker);
          Effects.scrambleText(kicker, "The deal closed in two days.", 800);
          flashScreen("#ff3030", 150);
          Audio.playReveal();
          await dramaticPause(2000);

          const whisper1 = makeEl("div", "fever-text-dim");
          whisper1.textContent = "As if he'd been told to say yes.";
          card.appendChild(whisper1);
          await dramaticPause(2000);

          const whisper2 = makeEl("div", "fever-text-dim");
          whisper2.style.fontStyle = "italic";
          whisper2.textContent = "Just like you.";
          card.appendChild(whisper2);
          Effects.triggerFlicker();
          Game.boostTruth(5);
          await dramaticPause(2500);
        } else {
          // === THE MOUSTACHE RESPONDS (NO path) ===
          stage.innerHTML = "";
          const blackWrap = makeEl("div", "fever-centered");
          stage.appendChild(blackWrap);
          await dramaticPause(1200);

          const said = makeEl("div", "fever-text-dim");
          said.textContent = "You said no.";
          blackWrap.appendChild(said);
          await dramaticPause(1500);

          const response = makeEl("div", "fever-text-dim");
          response.style.fontStyle = "italic";
          response.textContent =
            "That's exactly what the moustache wants you to think.";
          blackWrap.appendChild(response);
          await dramaticPause(2200);

          stage.innerHTML = "";
          Audio.playGlitch();
          Effects.triggerGlitch();

          const card = makeEl("div", "fever-evidence");
          const title = makeEl("div", "fever-evidence-title");
          card.appendChild(title);
          Effects.scrambleText(title, "THE MOUSTACHE RESPONDS", 600);
          stage.appendChild(card);
          await dramaticPause(800);

          const text1 = makeEl("div", "fever-evidence-text");
          card.appendChild(text1);
          await typeText(
            text1,
            "You believe you just exercised free will.",
            28,
          );
          await dramaticPause(800);

          const text2 = makeEl("div", "fever-evidence-text");
          card.appendChild(text2);
          await typeText(
            text2,
            "The moustache appreciates your confidence.",
            28,
          );
          await dramaticPause(1500);

          const text3 = makeEl("div", "fever-evidence-text");
          card.appendChild(text3);
          const timeStr = Game.getTimeString();
          await typeText(
            text3,
            "Consider: you have now spent " +
              timeStr +
              " looking at moustaches.",
            22,
          );
          await dramaticPause(600);

          const text4 = makeEl("div", "fever-text-dim");
          text4.textContent = "Of your own volition. Nobody forced you.";
          card.appendChild(text4);
          await dramaticPause(1800);

          const text5 = makeEl("div", "fever-evidence-text");
          card.appendChild(text5);
          await typeText(
            text5,
            "The moustache does not require belief. It requires attention.",
            22,
          );
          await dramaticPause(600);

          const has = makeEl("div", "fever-evidence-sub fever-big");
          has.textContent = "It has yours.";
          card.appendChild(has);
          shakeScreen(5, 250);
          await dramaticPause(2000);

          const text6 = makeEl("div", "fever-evidence-text");
          card.appendChild(text6);
          await typeText(
            text6,
            "It has moved between faces for decades. Reynolds. Selleck. Others you haven't been cleared to know about.",
            18,
          );
          await dramaticPause(1500);

          const kicker = makeEl("div", "fever-huge");
          card.appendChild(kicker);
          Effects.scrambleText(kicker, "It is not worn. It wears.", 800);
          flashScreen("#ff3030", 150);
          Audio.playReveal();
          await dramaticPause(2500);

          const filed = makeEl("div", "fever-huge");
          card.appendChild(filed);
          Effects.scrambleText(filed, "YOUR NO CHANGES NOTHING.", 600);
          shakeScreen(6, 300);
          await dramaticPause(2000);

          const heard = makeEl("div", "fever-text-dim");
          heard.style.fontStyle = "italic";
          heard.textContent = "It heard you. It doesn't mind.";
          card.appendChild(heard);
          Effects.triggerFlicker();
          Game.boostTruth(4);
          await dramaticPause(2500);
        }
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

    // ========== BEAT 10.5: YOU DIDN'T EVEN NOTICE / YOU KNEW ENOUGH TO PLAY ALONG ==========
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

        const saidYes = Game.state.believeChoice === "yes";

        // Frame 1: Title
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const title = makeEl("div", "fever-evidence-title");
        wrap.appendChild(title);
        Effects.scrambleText(
          title,
          saidYes ? "YOU KNEW ENOUGH TO PLAY ALONG" : "YOU DIDN'T EVEN NOTICE",
          600,
        );
        Audio.playGlitch();
        await dramaticPause(1500);
        const sub = makeEl("div", "fever-text-dim");
        sub.textContent = "Some of those photos weren't Tom or Burt.";
        wrap.appendChild(sub);
        await dramaticPause(2500);

        // Frame 2+: Each impostor, one at a time, full stage
        for (const imp of impostors) {
          stage.innerHTML = "";
          const solo = makeEl("div", "fever-centered");
          stage.appendChild(solo);
          const img = document.createElement("img");
          img.src = imp.url;
          img.className = "fever-impostor-photo";
          img.crossOrigin = "anonymous";
          solo.appendChild(img);
          await dramaticPause(800);
          const callout = makeEl("div", "fever-impostor-callout");
          callout.textContent =
            imp.answer === "selleck"
              ? 'You said this was "Tom Selleck"'
              : 'You said this was "Burt Reynolds"';
          solo.appendChild(callout);
          shakeScreen(4, 200);
          Audio.playGlitch();
          await dramaticPause(2500);
        }

        // Frame 3: All together + punchline
        stage.innerHTML = "";
        const finale = makeEl("div", "fever-centered");
        stage.appendChild(finale);
        const row = makeEl("div", "fever-impostor-row");
        for (const imp of impostors) {
          const thumb = makeEl("div", "fever-impostor-thumb");
          const img = document.createElement("img");
          img.src = imp.url;
          img.className = "fever-impostor-photo-sm";
          img.crossOrigin = "anonymous";
          thumb.appendChild(img);
          const lbl = makeEl("div", "fever-impostor-label");
          lbl.textContent =
            imp.answer === "selleck" ? '"Tom Selleck"' : '"Burt Reynolds"';
          thumb.appendChild(lbl);
          row.appendChild(thumb);
        }
        finale.appendChild(row);
        await dramaticPause(1500);
        const punchline = makeEl("div", "fever-evidence-sub fever-big");
        finale.appendChild(punchline);
        await typeText(
          punchline,
          "If you can't tell who has the moustache, does it matter who's behind it?",
          25,
        );
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

        // Conditional easter egg based on YES/NO choice
        if (Game.state.believeChoice === "yes") {
          const egg1 = makeEl("div", "fever-dossier-text");
          wrap.appendChild(egg1);
          await typeText(
            egg1,
            "You said YES at the 99.7% checkpoint. Your file has been updated.",
            18,
          );
          await dramaticPause(600);
          const egg2 = makeEl("div", "fever-evidence-sub");
          egg2.textContent = "Classification: WILLING PARTICIPANT.";
          wrap.appendChild(egg2);
          Effects.triggerFlicker();
          await dramaticPause(1200);
        } else if (Game.state.believeChoice === "no") {
          const egg1 = makeEl("div", "fever-dossier-text");
          wrap.appendChild(egg1);
          await typeText(egg1, "You said no. The moustache noted it.", 18);
          await dramaticPause(600);
          const egg2 = makeEl("div", "fever-dossier-text");
          wrap.appendChild(egg2);
          await typeText(egg2, "Your file is still open.", 18);
          Effects.triggerFlicker();
          await dramaticPause(1200);
        }

        const btnLabel =
          Game.state.believeChoice === "yes"
            ? "I DON'T WANT TO STOP"
            : Game.state.believeChoice === "no"
              ? "I'M STILL NOT CONVINCED"
              : "I CAN'T STOP";
        const btn = makeEl("button", "fever-btn", btnLabel);
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
          "The same moustache.",
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
        await dramaticPause(1200);
        const note2 = makeEl("div", "fever-evidence-text");
        card.appendChild(note2);
        await typeText(
          note2,
          "But which identity was actually behind Magnum's private investigations?",
          30,
        );
        await dramaticPause(800);

        // Conditional easter egg — the show confessed on camera
        if (Game.state.believeChoice) {
          const confess = makeEl("div", "fever-evidence-text");
          card.appendChild(confess);
          await typeText(
            confess,
            "A security guard on the show mistook Magnum for Burt Reynolds. On camera. In the script.",
            22,
          );
          await dramaticPause(800);
          const confess2 = makeEl("div", "fever-evidence-text");
          card.appendChild(confess2);
          await typeText(
            confess2,
            "It happened to Selleck in real life too.",
            30,
          );
          await dramaticPause(1000);
          if (Game.state.believeChoice === "yes") {
            const tag = makeEl("div", "fever-text-dim");
            tag.style.fontStyle = "italic";
            tag.textContent = "The show was confessing. You already knew that.";
            card.appendChild(tag);
          } else {
            const tag = makeEl("div", "fever-text-dim");
            tag.style.fontStyle = "italic";
            tag.textContent = "You said no. But the show said yes. Repeatedly.";
            card.appendChild(tag);
          }
          await dramaticPause(1500);
        }

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
          "The probability of two unrelated moustaches matching to this degree:",
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
          "You're suffering from a moustache-specific perceptual disorder brought on by prolonged exposure to thick facial hair in media. The ",
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
        stage.classList.add("fever-blackout");
        Audio.playGlitch();
        await dramaticPause(2000);
        const calm = makeEl(
          "div",
          "fever-calm",
          "There is only one moustache.",
        );
        stage.appendChild(calm);
        await dramaticPause(1500);
        await waitForAnyClick(stage);
        stage.classList.remove("fever-blackout");
        next();
      },
    },

    // ========== BEAT 19: THE CONVERGENCE ==========
    {
      corruption: 0.93,
      truth: 7,
      async render(stage, next) {
        stage.innerHTML = "";
        const card = makeEl("div", "fever-evidence");
        const title = makeEl("div", "fever-evidence-title", "THE CONVERGENCE");
        card.appendChild(title);
        stage.appendChild(card);
        await dramaticPause(500);
        const line1 = makeEl("div", "fever-evidence-text");
        card.appendChild(line1);
        await typeText(
          line1,
          "In 2018, there was no longer any need for two identities.",
          40,
        );
        await dramaticPause(1500);
        const big = makeEl("div", "fever-huge");
        big.textContent = "The covers were consolidated.";
        card.appendChild(big);
        await dramaticPause(2000);
        const line3 = makeEl("div", "fever-evidence-text fever-text-dim");
        card.appendChild(line3);
        await typeText(line3, "One identity retired. One remained.", 40);
        await dramaticPause(800);
        const line4 = makeEl("div", "fever-evidence-text fever-text-dim");
        card.appendChild(line4);
        await typeText(line4, "Ask yourself: which one is still here?", 40);
        await dramaticPause(1500);
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

    // ========== BEAT 21: THERE IS ONLY ONE MOUSTACHE (crescendo) ==========
    {
      corruption: 1.0,
      truth: 10,
      async render(stage, next) {
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-centered");
        stage.appendChild(wrap);
        const huge = makeEl("div", "fever-finale-text");
        wrap.appendChild(huge);
        Effects.scrambleText(huge, "THERE IS ONLY ONE MOUSTACHE", 1200);
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
        stage.classList.add("fever-blackout");
        Effects.stopFlickerLoop();
        Audio.startAmbient(0);
        document.getElementById("popup-container").innerHTML = "";
        await dramaticPause(1500);
        stage.classList.remove("fever-blackout");
        next();
      },
    },

    // ========== BEAT 22: THE GRAND FINALE ==========
    {
      corruption: 0.6,
      truth: 0,
      async render(stage, next) {
        document.body.classList.remove("screen-tilt");
        stage.classList.add("fever-finale-stage");

        // Stop the timer — freeze it at final time
        if (Game.state.timerInterval) {
          clearInterval(Game.state.timerInterval);
          Game.state.timerInterval = null;
        }

        const startLabel =
          Game.state.preFeverTruthLabel || "BLISSFULLY IGNORANT";
        const finalLabel = Game.getTruthLabel();
        const score = Game.state.score;
        const total = Game.state.totalRounds;
        const time = Game.getTimeString();

        // Helper: show a title card on black
        const showCard = async (buildFn) => {
          stage.innerHTML = "";
          const card = makeEl("div", "fever-finale-card");
          stage.appendChild(card);
          await buildFn(card);
        };

        // === CARD 1: THE TRUTH RATING JOURNEY ===
        await showCard(async (card) => {
          const intro = makeEl("div", "fever-text-dim");
          intro.textContent = "You entered this investigation as";
          card.appendChild(intro);
          await dramaticPause(1200);
          const startEl = makeEl("div", "fever-finale-start-rating");
          startEl.textContent = startLabel;
          card.appendChild(startEl);
          await dramaticPause(3000);
          // Fade out
          card.style.opacity = "0";
          card.style.transition = "opacity 0.8s ease";
          await dramaticPause(1000);
          card.style.opacity = "1";
          card.innerHTML = "";
          const now = makeEl("div", "fever-text-dim");
          now.textContent = "You are now";
          card.appendChild(now);
          await dramaticPause(1200);
          const finalEl = makeEl("div", "fever-finale-end-rating");
          finalEl.textContent = finalLabel;
          card.appendChild(finalEl);
          shakeScreen(6, 300);
          Audio.playReveal();
          Effects.triggerGlitch();
          await dramaticPause(3500);
        });

        // === CARD 2: THE SCORE ===
        await showCard(async (card) => {
          card.style.opacity = "0";
          card.style.transition = "opacity 0.6s ease";
          await dramaticPause(100);
          card.style.opacity = "1";
          const intro = makeEl("div", "fever-text-dim");
          intro.textContent = "You identified";
          card.appendChild(intro);
          await dramaticPause(800);
          const scoreEl = makeEl("div", "fever-finale-score");
          scoreEl.textContent =
            score + " of " + total + " moustaches correctly.";
          card.appendChild(scoreEl);
          await dramaticPause(2000);
          const punch = makeEl("div", "fever-finale-score-punch");
          card.appendChild(punch);
          await typeText(
            punch,
            "It didn't matter. It was always the same moustache.",
            35,
          );
          await dramaticPause(2500);
        });

        // === CARD 3: THE STARRING CREDITS ===
        await showCard(async (card) => {
          card.style.opacity = "0";
          card.style.transition = "opacity 0.6s ease";
          await dramaticPause(100);
          card.style.opacity = "1";
          const starring = makeEl("div", "fever-finale-starring");
          starring.textContent = "Starring";
          card.appendChild(starring);
          await dramaticPause(1200);
          const names = makeEl("div", "fever-finale-names");
          names.innerHTML =
            '<span class="fever-finale-name">BURT SELLECK</span>' +
            '<span class="fever-finale-name">TOM REYNOLDS</span>';
          card.appendChild(names);
          Audio.playReveal();
          await dramaticPause(2500);
          const sub = makeEl("div", "fever-text-dim");
          sub.textContent = "Or the other way around. Nobody can tell.";
          card.appendChild(sub);
          await dramaticPause(2500);
        });

        // === CARD 4: THE CLOSING STATEMENT ===
        await showCard(async (card) => {
          card.style.opacity = "0";
          card.style.transition = "opacity 0.6s ease";
          await dramaticPause(100);
          card.style.opacity = "1";
          const line = makeEl("div", "fever-finale-closing");
          card.appendChild(line);
          await typeText(
            line,
            "You can't prove they're different people. You've tried.",
            45,
          );
          await dramaticPause(3000);
          Effects.triggerGlitch();
          card.style.opacity = "0";
          await dramaticPause(1000);
        });

        // === PHASE 2: THE FINAL CARD ===
        stage.innerHTML = "";
        const wrap = makeEl("div", "fever-finale");
        stage.appendChild(wrap);

        // Title
        const title = makeEl("div", "fever-finale-title-text");
        title.textContent = "THERE IS ONLY ONE MOUSTACHE";
        wrap.appendChild(title);

        // Truth journey one-liner
        const journey = makeEl("div", "fever-finale-journey");
        journey.innerHTML =
          '<span class="fever-journey-start">' +
          startLabel +
          "</span>" +
          '<span class="fever-journey-arrow">\u2192</span>' +
          '<span class="fever-journey-end">' +
          finalLabel +
          "</span>";
        wrap.appendChild(journey);

        // Share section
        const shareWrap = makeEl("div", "fever-share-wrap");
        wrap.appendChild(shareWrap);
        const shareLabel = makeEl(
          "div",
          "fever-share-label",
          "TRANSMIT YOUR FINDINGS",
        );
        shareWrap.appendChild(shareLabel);

        // Build share card with refresh
        let usedIndices = [];
        const buildShareCard = () => {
          if (usedIndices.length >= SHARE_TEXTS.length) usedIndices = [];
          let idx;
          do {
            idx = Math.floor(Math.random() * SHARE_TEXTS.length);
          } while (usedIndices.includes(idx));
          usedIndices.push(idx);
          const text = SHARE_TEXTS[idx]
            .replace("[TIME]", time)
            .replace("[START_RATING]", startLabel)
            .replace("[RATING]", finalLabel);
          return text;
        };

        const cardEl = makeEl("div", "fever-share-card");
        let currentText = buildShareCard();
        cardEl.textContent = currentText;
        cardEl.addEventListener("click", () => {
          navigator.clipboard.writeText(currentText).then(() => {
            cardEl.textContent = "COPIED — TRANSMISSION INITIATED";
            cardEl.classList.add("fever-copied");
            setTimeout(() => {
              cardEl.classList.remove("fever-copied");
              cardEl.textContent = currentText;
            }, 2000);
          });
        });
        shareWrap.appendChild(cardEl);

        const refreshBtn = makeEl("div", "fever-refresh-btn");
        refreshBtn.textContent = "\u21bb REFRESH TRANSMISSION";
        refreshBtn.addEventListener("click", () => {
          currentText = buildShareCard();
          cardEl.classList.remove("fever-copied");
          cardEl.textContent = currentText;
        });
        shareWrap.appendChild(refreshBtn);

        // Share platform buttons
        const platforms = [
          {
            name: "X",
            url: (t) =>
              `https://x.com/intent/tweet?text=${encodeURIComponent(t)}`,
          },
          {
            name: "Reddit",
            url: (t) =>
              `https://reddit.com/submit?title=${encodeURIComponent(t)}&url=${encodeURIComponent("https://moustache.wtf")}`,
          },
          {
            name: "Facebook",
            url: (t) =>
              `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(t)}&u=${encodeURIComponent("https://moustache.wtf")}`,
          },
          {
            name: "Threads",
            url: (t) =>
              `https://threads.net/intent/post?text=${encodeURIComponent(t)}`,
          },
          {
            name: "Bluesky",
            url: (t) =>
              `https://bsky.app/intent/compose?text=${encodeURIComponent(t)}`,
          },
        ];
        const btnRow = makeEl("div", "fever-share-buttons");
        platforms.forEach((p) => {
          const btn = makeEl("div", "fever-share-btn", p.name);
          btn.addEventListener("click", () => {
            window.open(p.url(currentText), "_blank", "noopener");
          });
          btnRow.appendChild(btn);
        });
        shareWrap.appendChild(btnRow);

        // Bottom
        const bottom = makeEl("div", "fever-finale-bottom");
        const again = makeEl("div", "fever-play-again");
        again.textContent = "PLAY AGAIN — DIFFERENT PHOTOS, SAME TRUTH";
        again.addEventListener("click", () => {
          stage.classList.remove("fever-finale-stage");
          Effects.cleanup();
          document.body.classList.remove("screen-tilt", "conspiracy-mode");
          Game.showAct("act-title");
        });
        bottom.appendChild(again);
        const oss = makeEl("div", "fever-opensource");
        oss.innerHTML =
          'Moustache is Open Source: <a href="https://github.com/TophSV/moustache" target="_blank" rel="noopener" class="fever-github-link"><svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="vertical-align:-2px;margin-right:4px"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>TophSV/moustache</a>';
        bottom.appendChild(oss);
        wrap.appendChild(bottom);
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
