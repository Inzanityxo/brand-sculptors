// All visible copy of the site. Marco edits here, never inside components.
// [CONFIRM] marks a statement Marco still has to check. It renders as a small yellow tag.
// Positioning since 2026-10-01: the AI operating system is the product, for people who market
// themselves and for marketers who want their week back.

export const en = {
  meta: {
    title: "Marco Bednarz · Brand Sculptors",
    description:
      "I build AI operating systems for people who market themselves and for marketers who want their week back. One place for research, ideas, content and numbers, and every correction you make becomes a rule.",
  },

  nav: {
    brand: "Brand Sculptors",
    links: [
      { label: "How it learns", href: "#learn" },
      { label: "Workflow", href: "#workflow" },
      { label: "Three roles", href: "#roles" },
      { label: "Who it's for", href: "#for-you" },
    ],
    cta: "Book a demo",
    soundOn: "Sound on",
    soundOff: "Sound off",
  },

  hero: {
    formulaHuman: "Humanity",
    formulaCode: "Media & Code",
    formulaResult: "Leverage",
    eyebrow: "Humanity × Media & Code = Leverage",
    footnote: "leverage = trust at scale",
    h1: ["Build a marketing", "system that", "executes for you."],
    sub: "An AI operating system that does the work, from design and video to scheduling and reports, and learns from every result. For people who market themselves and for marketers who want their week back.",
    primary: "Book your demo call",
    secondary: "See how it learns",
    portraitName: "Marco Bednarz",
    portraitLine: "I run my own marketing on this system every day.",
    stageAlt: "Marco Bednarz speaking on stage in front of an audience",
    visual: {
      command: "Turn yesterday's call into Thursday's newsletter",
      draft: "Draft ready, written in your voice",
      rule: "New rule saved: hooks stay under 12 words",
      report: "Morning report: two posts beat your average",
      demo: "sample data",
    },
    boardWords: {
      human: ["story", "voice", "taste", "conviction", "why you started"],
      system: ["research", "drafts", "formats", "reports", "rules"],
      proof: ["time back", "clarity", "trust", "the final call"],
    },
    pixelBarLabel: "LEVERAGE",
    switcher: "Hero",
  },

  intro: {
    eyebrow: "Who builds this",
    title: "Hi, I'm Marco.",
    body: "I've been in marketing for more than seven years, and I did every step myself: filming, editing, design, ads and emails. Today I spend 90 to 95 percent of my day inside the system I built, because it does the work that used to take five or six marketers.",
    tags: ["Founder of Brand Sculptors", "Berlin", "Builds on Claude Code", "Speaker"],
  },

  learn: {
    eyebrow: "The idea",
    h2Pre: "Build a system that",
    h2Key: "learns.",
    sub: "Most AI tools forget everything when the chat ends. A learning system keeps every result and every correction, so your marketing gets better every week instead of starting from zero.",
    points: [
      { k: "It remembers", t: "Your audience, your voice and every past result are always loaded." },
      { k: "It measures", t: "The numbers come back on their own every morning, so you never have to pull a report." },
      { k: "It improves", t: "Every correction you make turns into a rule it keeps." },
    ],
    loop: [
      { t: "Publish", z: "AD, POST, MAIL" },
      { t: "Measure", z: "NUMBERS COME BACK" },
      { t: "Compare", z: "AGAINST YOUR GOALS" },
      { t: "Propose", z: "THE NEXT TEST" },
      { t: "Learn", z: "A NEW RULE" },
    ],
    counter: "RULES LEARNED",
    quote:
      "I wake up every morning and I don't have to do all of this by hand anymore. I have a system that learns, gives me ideas and gets better day after day.",
    quoteSource: "Marco, talk at a case study event, September 2026",
  },

  workflow: {
    eyebrow: "One workflow, start to finish",
    h2: "Here's what learning looks like in practice.",
    sub: "A real loop from my own system. One idea came from me. Everything else ran through the system.",
    steps: [
      { k: "Test", who: "system", t: "We tested a static ad that looks like an iMessage chat.", visual: "static" },
      { k: "Measure", who: "system", t: "The system pulled the numbers back in. The chat ad brought in leads for less than everything else.", visual: "numbers" },
      { k: "Ask", who: "you", t: "I asked: \"Which ads are working best right now?\" The answer: the iMessage chat.", visual: "ask" },
      { k: "Decide", who: "you", t: "My call: let's iterate on it and make it animated.", visual: "decide" },
      { k: "Build", who: "system", t: "The system built the animated version with sound design, in 4:5 and 9:16.", visual: "build" },
      { k: "Schedule", who: "system", t: "It scheduled the new ad straight into the planner, which means nobody uploaded anything by hand.", visual: "schedule" },
      { k: "Learn", who: "system", t: "The win became a rule, so the next chat ads start from what worked.", visual: "rule" },
    ],
    youLabel: "YOU",
    systemLabel: "SYSTEM",
    numbers: [
      { n: "iMessage chat, static", v: "best per lead", top: true },
      { n: "Quote card, dark", v: "average" },
      { n: "Talking head, 30 s", v: "average" },
      { n: "Before and after", v: "below average" },
    ],
    askQ: "Which ads are working best right now?",
    askA: "The iMessage chat static. It brings leads in for less than every other ad this month. Want me to build a variation?",
    decide: "Let's iterate. Make it animated, with sound.",
    chat: [
      ["them", "How do you post every day and still have time for strategy?"],
      ["me", "I stopped doing the steps a system can do."],
      ["them", "Which steps?"],
      ["me", "Everything between the idea and the upload."],
    ],
    buildLabel: "Animated chat ad · sound design · 4:5 and 9:16",
    rule: "Chat ads start from the winning iMessage format.",
    closing: "You make the one decision that matters. The system runs the rest of the loop.",
    sample: "sample data",
  },

  roles: {
    eyebrow: "What the system does",
    h2: "The system has three roles.",
    sub: "Structure, output and analysis. Together they turn a pile of AI tools into one system that learns, because each role feeds the next.",
    items: [
      {
        id: "structure",
        n: "01",
        k: "Structure",
        t: "It keeps everything in order.",
        points: ["Every document, draft and render has its place", "A visual library of styles and references", "Your tools connected, your knowledge in one map"],
        screens: [
          { image: "/os/documents.jpg", label: "Documents" },
          { image: "/os/library.jpg", label: "Visual library" },
          { image: "", label: "Connectors" },
          { image: "/os/map.jpg", label: "Context map" },
        ],
      },
      {
        id: "output",
        n: "02",
        k: "Output",
        t: "It builds the work.",
        points: ["Static ads in batches, in your style", "Videos cut from your own footage", "Posts scheduled straight into the planner"],
        screens: [
          { image: "/os/statics.jpg", label: "Static ads" },
          { image: "/os/editing.jpg", label: "Video editing" },
          { image: "/os/scheduling.jpg", label: "Scheduling" },
        ],
      },
      {
        id: "analysis",
        n: "03",
        k: "Analysis",
        t: "It reads the numbers and proposes the next test.",
        points: ["Results from every channel, every morning", "Every angle gets a call: scale, test or stop", "Decisions mapped on a board, each one becomes a rule"],
        screens: [
          { image: "/os/performance.jpg", label: "Performance" },
          { image: "/os/miro.jpg", label: "Analysis board" },
        ],
      },
    ],
    sample: "Screens from my own system, filled with sample data",
  },

  connects: {
    eyebrow: "Connected",
    h2: "It works with the tools you already use.",
    sub: "Your system plugs into your ad accounts, your channels and your planner, so the numbers come back on their own and the work goes out without copy and paste.",
    center: "Your operating system",
    clusters: [
      { k: "Ads and channels", color: "#FF4FB8", tools: ["Meta Ads", "Instagram", "Facebook", "YouTube", "TikTok", "LinkedIn"] },
      { k: "Planning and CRM", color: "#22E3D0", tools: ["Metricool", "ActiveCampaign", "Calendly", "Gmail", "Google Calendar"] },
      { k: "Knowledge and team", color: "#7B78FF", tools: ["Google Drive", "Notion", "Slack", "Miro", "Fireflies"] },
      { k: "Creation and AI", color: "#FFD23F", tools: ["Claude", "ElevenLabs", "Higgsfield", "DaVinci Resolve"] },
    ],
    note: "Every system gets built around the tools you already pay for.",
  },

  audience: {
    eyebrow: "Who it's for",
    h2: "It's built for two kinds of people.",
    doors: [
      {
        label: "You market yourself",
        title: "You have the ideas. You don't have the hours.",
        points: [
          "Your calls, notes and voice memos turn into posts, mails and ads",
          "The system becomes your marketing team: design, video editing, scheduling and reports",
          "You approve, and the system schedules",
        ],
        tone: "warm",
      },
      {
        label: "You're a marketer",
        title: "You use AI every day. Your week is still full.",
        points: [
          "All your tools connected in one place",
          "Statics, videos and reports from one command",
          "Numbers every morning, with the next test to run",
        ],
        tone: "cool",
      },
    ],
  },

  fireCode: {
    eyebrow: "Fire × Code",
    h2: "The system handles the work. You make the calls.",
    lineHuman: "A voice without a system stays small.",
    lineCode: "Volume without a voice turns into noise.",
    fire: {
      label: "The Fire",
      title: "What stays yours",
      body: "You decide where the strategy goes next, which story is true for you and what people should feel when they see your work. The conviction behind your message is yours too, and no tool gives you that certainty.",
      annotations: ["your story", "your perspective", "your conviction", "your taste", "the final call"],
    },
    code: {
      label: "The Code",
      title: "What the system handles",
      body: "The system handles the research on what already works, first drafts and variations, formats, sizes and sound, filing, uploads and reports. That's the work that eats your afternoon.",
      rows: [
        { key: "research.sources", value: 128 },
        { key: "drafts.in_your_voice", value: 34 },
        { key: "rules.learned", value: 57 },
        { key: "reports.sent", value: 12 },
        { key: "files.lost", value: 0 },
      ],
      rowsNote: "demo data",
    },
    leverage: "Leverage",
    leverageSub: "trust at scale",
    closing:
      "Humanity × Media & Code is the leverage formula I believe in, and it's how every system I build works.",
  },

  words: {
    eyebrow: "In my own words",
    h2: "I did every step by hand first.",
    story: [
      "I started making videos when I was 13. Later I spent three years building video marketing from zero at a leadership academy, and I did the editing, the scripting, the design and the briefing myself.",
      "This system isn't something you can buy off the shelf. It's a map of how I work, built from my own expertise and everything I learned as a marketer, and that's how I build yours too: around the way you already work.",
    ],
    quotesLabel: "Things I keep saying",
    quotes: [
      "Trust compounds into people's interest in working with you.",
      "If you have to explain yourself in your content, it reduces your status.",
      "People make a folder of you in their head next to the problem you solve. That is when trust compounds.",
      "Record every sales call, every one-on-one, every group coaching. The aha moment in their eyes is your data point for what to scale.",
      "You are planting seeds for decades. This is not a four month experiment you quit when it does not work.",
    ],
    quoteSource: "Marco Bednarz, interview 2026",
    stageEyebrow: "On stage",
    stageLine: "I speak about content, trust and AI systems for founders, experts and marketing teams.",
    closing: "The principles are universal. The application is always unique.",
  },

  steer: {
    eyebrow: "What you get back",
    h2: "The system keeps the ship moving. Your time goes into where you steer and what you build next.",
    body: "More output isn't the goal. You want a system that takes the operational work off your plate, so that you have time for the big picture and can set the direction based on data.",
  },

  whyNow: {
    eyebrow: "Why start now",
    h2: "Every day inside the system makes the next result better.",
    today: "You start today",
    later: "You start in a year",
    axisToday: "TODAY",
    axisLater: "IN ONE YEAR",
    caption: "The gap between starting today and starting in a year is data, rules and workflows nobody else has.",
    note: "Illustration, not measured data",
    relief: [
      "You don't need to learn to code.",
      "Nobody sets up AI alone from A to Z.",
      "You can build it one workflow at a time.",
    ],
    reliefClosing: "Start with one workflow you repeat every week, and let the system grow from every correction you give it.",
  },

  fit: {
    eyebrow: "Is this for you?",
    h2: "Five quick questions.",
    sub: "Your answers stay in your browser, and nothing is stored.",
    restart: "Start again",
    back: "Back",
    questions: [
      {
        id: "who",
        q: "Which one sounds more like you?",
        answers: [
          { label: "I market myself", fit: true },
          { label: "I do marketing for others", fit: true },
        ],
      },
      {
        id: "ai",
        q: "How much do you use AI in your work right now?",
        answers: [
          { label: "Every day", fit: true },
          { label: "Now and then", fit: true },
          { label: "Not yet", fit: true },
        ],
      },
      {
        id: "workflow",
        q: "Is there one workflow you repeat every week?",
        answers: [
          { label: "Yes", fit: true },
          { label: "Not really", fit: false },
        ],
      },
      {
        id: "patience",
        q: "Can you give the system a few weeks to learn from you?",
        answers: [
          { label: "Yes", fit: true },
          { label: "I need results tomorrow", fit: false },
        ],
      },
      {
        id: "invest",
        q: "Are you ready to invest in a new way of marketing, so you can step out of the daily hustle and focus on strategy?",
        answers: [
          { label: "Yes, I'm ready to invest", fit: true },
          { label: "I want to know the price first", fit: true },
          { label: "Not right now", fit: false },
        ],
      },
    ],
    fitTitle: "Let's talk. You're exactly who I build this for.",
    fitBody:
      "You have a workflow worth handing over and the patience to let the system learn. Send me a few lines about your week, and I'll tell you honestly where I'd start.",
    fitCta: "Book your demo call",
    notFitTitle: "Not yet, and that's completely fine.",
    notFitBody:
      "The system learns from what you repeat. Pick one workflow you do every week, run it by hand for a while, and come back when it has a shape. Until then, follow the build on LinkedIn.",
    notFitCta: "Follow the build",
    notFitHref: "https://www.linkedin.com/in/marco-bednarz/",
  },

  contact: {
    eyebrow: "Let's chat",
    h2: "Book your demo call.",
    sub: "In the demo you'll see how a system that learns changes the way you work for good. Tell me which workflow eats most of your time, in English or German, and you'll hear from me within two working days.",
    promise: "If I can help, I'll tell you how. If I can't, I'll tell you that too.",
    fields: {
      name: "Name",
      email: "Email",
      website: "Website or LinkedIn",
      optional: "optional",
      invest: "Are you ready to invest in this?",
      invests: ["Yes, I'm ready to invest", "I want to know the price first", "Not right now"],
      topic: "What are you looking for?",
      topics: [
        "An AI operating system for my own brand",
        "An AI operating system for my marketing work",
        "Not sure yet",
      ],
      message: "Your message",
      messagePlaceholder:
        "What does a normal week look like, which workflow would you hand over first, and what would a great result look like for you?",
      consent: "I agree that my details are used to answer my request.",
      consentLink: "Privacy policy",
    },
    errors: {
      name: "Please tell me your name.",
      email: "Please check your email address.",
      topic: "Please pick what you're looking for.",
      invest: "Please pick one, so I know where you stand.",
      message: "Please write at least 30 characters, so I understand where you are.",
      consent: "Please agree, so I'm allowed to answer you.",
    },
    submit: "Request my demo call",
    sending: "SENDING",
    successTitle: "Thanks, your message is with me.",
    successBody: "You'll hear from me within two working days to set up your demo call.",
    errorTitle: "Something went wrong on my side.",
    errorBody: "Your text is still in the form. You can try again or send it to me by email.",
    errorMail: "Send by email",
    calendlyLead: "Prefer to talk directly?",
    calendlyCta: "Book 30 minutes",
    social: "Or say hi on LinkedIn",
    socialHandle: "Marco Bednarz",
    socialHref: "https://www.linkedin.com/in/marco-bednarz/",
  },

  footer: {
    line: "Brand Sculptors · Marco Bednarz · Berlin",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    rocket: "Start GO mode",
  },

  go: {
    banner: "GO TIME",
  },
} as const;

export type Content = typeof en;
