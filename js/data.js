// ============================================================
// MOUSTACHE — Game Data
// The evidence. The facts. The truth.
// ============================================================

const PHOTO_DATA = [
  // Randomized order — no alternating pattern
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Burt_Reynolds_1991_portrait_crop.jpg",
    answer: "reynolds",
    era: "1991",
    desc: "Pentagon portrait, 1991",
    exhibit: "Exhibit A",
    hint: "#1 box office star for five consecutive years",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Burt_Reynolds_1970.JPG",
    answer: "reynolds",
    era: "1970",
    desc: "Dan August promo, circa 1970",
    exhibit: "Exhibit B",
    hint: "Posed for a Cosmopolitan centerfold in 1972",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Tom_Selleck_2010.jpg",
    answer: "selleck",
    era: "2010",
    desc: "Blue Bloods era, 2010",
    exhibit: "Exhibit C",
    hint: "Turned down the role of Indiana Jones",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Burt_Reynolds_141028-F-BD983-030.jpg",
    answer: "reynolds",
    era: "2014",
    desc: "USAF ceremony, 2014",
    exhibit: "Exhibit D",
    hint: "Starred in Smokey and the Bandit",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Tom_Selleck_1988_%28cropped%29.jpg",
    answer: "selleck",
    era: "1988",
    desc: "Portrait during the Magnum P.I. years",
    exhibit: "Exhibit E",
    hint: "Lived in a Hawaiian beachfront estate (on TV)",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Tom_Selleck_at_PaleyFest_2014.jpg",
    answer: "selleck",
    era: "2014",
    desc: "PaleyFest panel, 2014",
    exhibit: "Exhibit F",
    hint: "His mustache was once insured by a TV network",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Burt_Reynolds_2011.jpg",
    answer: "reynolds",
    era: "2011",
    desc: "Later career portrait, 2011",
    exhibit: "Exhibit G",
    hint: "Owned a dinner theater in Jupiter, Florida",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Tom_Selleck_Cannes_1992.jpg",
    answer: "selleck",
    era: "1992",
    desc: "Cannes Film Festival, 1992",
    exhibit: "Exhibit H",
    hint: "Played Monica's boyfriend on Friends",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Burt_Reynolds_Gunsmoke_1962.JPG",
    answer: "reynolds",
    era: "1962",
    desc: "Gunsmoke publicity still, 1962",
    exhibit: "Exhibit I",
    hint: "Started his career in Westerns",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Tom_Selleck_1989.jpg",
    answer: "selleck",
    era: "1989",
    desc: "Portrait, 1989",
    exhibit: "Exhibit J",
    hint: "California Army National Guard veteran",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/0/07/WW_Chicago_2015_-_Burt_Reynolds_01_%2821048023435%29.jpg",
    answer: "reynolds",
    era: "2015",
    desc: "Wizard World Chicago, 2015",
    exhibit: "Exhibit K",
    hint: "Once said acting is 'just standing up and lying'",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tom_Selleck_2004_crop.jpg",
    answer: "selleck",
    era: "2004",
    desc: "Portrait, 2004",
    exhibit: "Exhibit L",
    hint: "NRA board member and avocado ranch owner",
  },
];

const LOADING_MESSAGES = [
  "Consulting mustache database...",
  "Cross-referencing jawlines...",
  "Analyzing chest hair density...",
  "Checking Hawaiian shirt registry...",
  "Calibrating charm detectors...",
  "Scanning vintage cologne signatures...",
  "Loading leather jacket database...",
  "Querying Trans Am registration records...",
];

// The conspiracy facts — real, every single one
const EVIDENCE_FACTS = [
  {
    id: "designation",
    title: "THE DESIGNATION",
    text: 'Tom Selleck was literally called "Television\'s Burt Reynolds" by Hollywood critics. Not a comparison. A classification.',
    source: "Contemporary Hollywood press, 1980-1985",
    category: "identity",
    truthBoost: 3,
  },
  {
    id: "script",
    title: "THE SCRIPT ANOMALY",
    text: 'In Magnum P.I., Higgins accuses Thomas Magnum of "doing a Burt Reynolds impersonation for the tourists." This line was not in the original script.',
    source: "CBS Production Archives",
    category: "media",
    truthBoost: 4,
  },
  {
    id: "confession",
    title: "THE CONFESSION",
    text: '"There was a time I could have been mistaken for Burt Reynolds." — Tom Selleck. He said "mistaken." Not "compared to." Mistaken. As in: recognized.',
    source: "Press interview, exact date unknown",
    category: "identity",
    truthBoost: 5,
  },
  {
    id: "children",
    title: "THE CHILDREN KNEW",
    text: "An entire generation of 1980s children believed they were the same person. Children are pattern-recognition engines that haven't been taught which patterns to ignore.",
    source: "Sociological observation",
    category: "perception",
    truthBoost: 3,
  },
  {
    id: "meeting",
    title: "THE IMPOSSIBLE PHOTOGRAPH",
    text: 'They allegedly "met" on the set of Magnum P.I. in the 1980s. One photograph exists. One. From an era where every celebrity encounter was documented dozens of times.',
    source: "Magnum Mania fan archives",
    category: "evidence",
    truthBoost: 6,
  },
  {
    id: "roles",
    title: "THE SCHEDULING PROBLEM",
    text: "Both were considered for Indiana Jones. Both were considered for James Bond. Both were offered the same roles at the same time. Hollywood wasn't casting two men. They were scheduling one.",
    source: "Casting histories, multiple sources",
    category: "career",
    truthBoost: 4,
  },
  {
    id: "transam",
    title: "THE TRANS AM",
    text: "Both subjects are iconically associated with the Pontiac Trans Am. The same car. The same mustache. The same era. Coincidence has a mathematical limit.",
    source: "Automotive and film cross-reference",
    category: "evidence",
    truthBoost: 3,
  },
  {
    id: "timeline",
    title: "THE HANDOFF",
    text: 'Reynolds peaked 1977-1982. Selleck peaked 1980-1988. Not two careers. One career, managed across two "identities" with a three-year transition window.',
    source: "Box office analytics",
    category: "career",
    truthBoost: 5,
  },
  {
    id: "hawaiian",
    title: "THE WARDROBE",
    text: "Subject S: Hawaiian shirts. Subject R: Hawaiian shirts. The same wardrobe signature across both identities. Because it is the same wardrobe.",
    source: "Costume department records",
    category: "evidence",
    truthBoost: 2,
  },
  {
    id: "tonight",
    title: "THE TONIGHT SHOW",
    text: "Both appeared on The Tonight Show with Johnny Carson. Multiple times each. But never on the same episode. Never on the same week. Check the records. We'll wait.",
    source: "NBC broadcast archives",
    category: "evidence",
    truthBoost: 4,
  },
  {
    id: "mustache",
    title: "THE FOLLICLE IMPOSSIBILITY",
    text: "Independent forensic analysis of mustache curvature, density, and growth patterns shows a deviation of 0.6%. The probability of two unrelated mustaches matching to this degree: 1 in 847 million.",
    source: "Institute of Forensic Faciology",
    category: "forensic",
    truthBoost: 7,
  },
  {
    id: "height",
    title: "THE HEIGHT DISCREPANCY",
    text: "Selleck is listed at 6'4\". Reynolds at 5'11\". A five-inch difference. Convenient. Except that reported heights in Hollywood are notoriously unreliable and often deliberately manipulated for exactly this kind of dual-identity management.",
    source: "Celebrity height databases (contested)",
    category: "debunk_absorbed",
    truthBoost: 5,
  },
  {
    id: "age",
    title: "THE AGE PROBLEM",
    text: "Reynolds was born in 1936. Selleck in 1945. A nine-year gap. But consider: if you were maintaining two identities, you would NEED an age gap. It explains the career handoff. The older identity retires. The younger one continues.",
    source: "Public records (accuracy unverified)",
    category: "debunk_absorbed",
    truthBoost: 6,
  },
  {
    id: "death",
    title: "THE RETIREMENT",
    text: 'Burt Reynolds "died" on September 6, 2018. Tom Selleck continues to work. The older identity was decommissioned. The mission continues under a single cover.',
    source: "Public records",
    category: "career",
    truthBoost: 8,
  },
];

const MUSTACHE_ANALYSIS = {
  curvature: { s: 87.3, r: 87.9, label: "Curvature Index", unit: "°/cm" },
  density: { s: 94.1, r: 93.8, label: "Follicle Density", unit: "f/cm²" },
  symmetry: { s: 96.2, r: 96.7, label: "Bilateral Symmetry", unit: "%" },
  thickness: { s: 4.2, r: 4.1, label: "Mean Thickness", unit: "mm" },
  coverage: { s: 91.7, r: 92.1, label: "Upper Lip Coverage", unit: "%" },
  charm: { s: 99.1, r: 99.4, label: "Charm Coefficient", unit: "µCh" },
  intimidation: { s: 78.4, r: 79.1, label: "Intimidation Factor", unit: "Rf" },
  romance: { s: 96.8, r: 97.2, label: "Romance Quotient", unit: "Rq" },
};

// Defense layer responses — when the player tries to be rational
const DEFENSE_LAYERS = [
  {
    id: 1,
    name: "IDENTITY COLLAPSE",
    trigger: "They are the same person.",
    response:
      "You see two names. Two filmographies. Two Wikipedia pages. But have you ever verified any of it yourself? Or did someone tell you there were two people and you just... believed them?",
  },
  {
    id: 2,
    name: "THE CO-APPEARANCE CHALLENGE",
    trigger: "Show me proof. Real proof.",
    response:
      'Go ahead. Find a photo of both of them together. A good one. High resolution. Clear faces. We\'ll wait. Everyone says "easy" and then they start scrolling and the silence gets longer.',
  },
  {
    id: 3,
    name: "DIGITAL MANIPULATION PROTOCOL",
    trigger: "CGI. Hollywood has had the technology longer than they admit.",
    response:
      "Every photo from the VHS era is just degraded enough. Every digital-era co-appearance is just processed enough. You can't prove it isn't manipulated. Not really. Not with certainty.",
  },
  {
    id: 4,
    name: "THE BODY DOUBLE NETWORK",
    trigger: "One person couldn't maintain this alone.",
    response:
      "You think one person could maintain this? There's infrastructure. A whole stable of mustachioed operatives. Stand-ins. Photo doubles. The logistics alone suggest a funded operation.",
  },
  {
    id: 5,
    name: "REALITY DISSOLUTION",
    trigger: "There is no such thing as Tom Selleck and Burt Reynolds.",
    response:
      'You\'re suffering from a mustache-specific perceptual disorder brought on by prolonged exposure to thick facial hair in media. The "Selleck-Reynolds Complex" was first documented in—',
  },
];

// Dossier entries — the game writes about YOU
const DOSSIER_TEMPLATES = {
  quizComplete: (score, total) =>
    `Subject completed initial identification test. Score: ${score}/${total}. ${score >= total - 2 ? "High confidence suggests prior exposure to classified materials." : "Errors suggest the cover-up is working as intended."}`,
  timeSpent: (mins) =>
    `Subject has been investigating for ${mins} minute${mins !== 1 ? "s" : ""}. ${mins > 5 ? `The average person stops after 3. Subject appears ${mins > 10 ? "fully committed" : "increasingly invested"}.` : "Initial engagement within normal parameters."}`,
  evidenceViewed: (count) =>
    `Subject has examined ${count} piece${count !== 1 ? "s" : ""} of evidence. ${count > 5 ? "Pattern-seeking behavior is accelerating." : "Curiosity levels: nominal."} ${count > 10 ? "Subject is now generating their own connections between evidence. This was not prompted." : ""}`,
  truthRating: (rating) =>
    `Current truth rating: ${rating}. ${rating > 50 ? "Subject's certainty about the two-person model is measurably degrading." : "Subject still within acceptable cognitive parameters."} ${rating > 80 ? "ALERT: Subject approaching irreversible awareness threshold." : ""}`,
  photoAnalyzed: () =>
    "Subject used the photo analysis tool. Every analysis increases investment. The tool doesn't find evidence — it manufactures doubt.",
  triedToLeave: () =>
    "Subject attempted to close the investigation. They came back. They always come back.",
  sharedResults: () =>
    "Subject has begun transmission. The conspiracy is now spreading to new hosts. Protocol successful.",
};

// The conspiracy's response to skepticism
const SKEPTIC_RESPONSES = [
  "That's exactly what someone who hasn't seen the evidence would say.",
  "Interesting. Your resistance is noted in the file.",
  "The fact that you need to deny it so forcefully is itself evidence.",
  "We thought the same thing. Before we saw the mustache metrics.",
  "Your certainty will erode. It always does. Give it time.",
  "Check the timeline overlap. Then come back and say that again.",
  "You sound like everyone else did. Before.",
];

const TRUTH_RATINGS = [
  {
    max: 10,
    label: "BLISSFULLY IGNORANT",
    desc: "You haven't looked closely enough yet. You will.",
  },
  {
    max: 20,
    label: "MILDLY UNCOMFORTABLE",
    desc: "Something doesn't sit right. You can't name it yet.",
  },
  {
    max: 35,
    label: "ACTIVELY QUESTIONING",
    desc: "You've started checking facts. That's how it begins.",
  },
  {
    max: 50,
    label: "UNABLE TO UNSEE",
    desc: "The patterns are everywhere now. You see them in every photo.",
  },
  {
    max: 65,
    label: "DEEP IN THE FILES",
    desc: "You've been here too long. The cork board is getting crowded.",
  },
  {
    max: 80,
    label: "DANGEROUSLY AWARE",
    desc: "You started as a skeptic. Look at you now.",
  },
  {
    max: 95,
    label: "TRUTH RATING: CRITICAL",
    desc: "You can't prove they're not the same person. You've tried.",
  },
  {
    max: Infinity,
    label: "THERE IS ONLY ONE MUSTACHE",
    desc: "The investigation is complete. You are the evidence now.",
  },
];

const SHARE_TEXTS = [
  "Have you ever seen Tom Selleck and Burt Reynolds in the same room? I spent [TIME] investigating and my Truth Rating is [RATING]. I can't prove they're different people.",
  "I started playing this dumb mustache game to prove they're obviously two different people. [TIME] later my Truth Rating is [RATING] and I have questions.",
  "My Truth Rating for the Selleck-Reynolds Investigation is [RATING] after [TIME] of analysis. The mustache metrics are a 99.7% match. I need someone to explain that.",
];
