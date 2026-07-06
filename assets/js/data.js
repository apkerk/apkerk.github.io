/* ==========================================================================
   data.js — single source of truth for katieapker.com
   Plain language everywhere. Jargon lives in the manuscripts, not here.

   FRAMING LOCKS (from the JMP analysis file — do not violate):
   - Never "the gap reverses." Say "not statistically distinguishable from zero."
   - Never "women are not penalized." Softer treatment is benevolent sexism;
     women are penalized in amplification.
   - Name BOTH amplification channels (recommendation algorithm AND resharing),
     algorithm foregrounded as the larger force on YouTube.

   DATA FRESHNESS: numbers below come from the canonical analysis dated
   2026-06-10. Katie re-ran with new data as of 2026-06-17 — these are to be
   refreshed against that run. Update here once; every page re-renders.
   ========================================================================== */

window.SITE = {
  person: {
    name: "Katie Apker",
    role: "PhD Candidate, Organizational Behavior",
    affiliation: "Cornell University, ILR School",
    email: "kaa82@cornell.edu",            // confirm
    cv: "/assets/cv.pdf",
    positioning: "I study digital entrepreneurship, creators, and content creation on platforms like YouTube, with gender as the empirical lens.",
    snapshot:
      "I study digital entrepreneurship: how creators build businesses on platforms like YouTube, and how those platforms shape who becomes visible and economically successful. My research brings sociology of entrepreneurship, economic sociology, and advanced quantitative methods to markets that are easy to enter but hard to measure. I build large original datasets to show how gender shapes visibility, evaluation, and opportunity in platform-based work.",
  },

  /* ---- curiosity themes (dual entry, parallel to papers) ---- */
  themes: [
    { slug: "ai-and-work", accent: "lava",
      question: "Is Katie studying AI?",
      short: "Yes. I study how automated systems, especially recommendation algorithms, shape visibility and rewards for creators and workers online.",
      papers: ["jmp", "yt-panel"] },
    { slug: "gender-as-lens", accent: "pink",
      question: "Why gender as the lens?",
      short: "I use gender to identify how platforms and organizations sort visibility, evaluation, and opportunity.",
      papers: ["jmp", "founder-identity", "separate-spheres", "board-diversity"] },
    { slug: "creator-economy", accent: "green",
      question: "What is the creator economy?",
      short: "Creators are entrepreneurs who build businesses around online audiences. I study how platform systems shape their work, visibility, and careers.",
      papers: ["jmp", "creator-mapping", "yt-panel"] },
  ],

  /* ---- papers (status-grouped portfolio + per-paper detail) ----
     featured: "full" (JMP) | "page" (Founder Identity) | "card" | "title-only" (embargo)
     statusClass: jmp | review | editing | field
  */
  papers: [
    { id: "jmp", featured: "full", group: "Job market paper", statusClass: "jmp",
      title: "Approval Without Amplification",
      sub: "Gender and Visibility on Algorithmically Mediated Platforms",
      authors: "Katie Apker",
      status: "Job market paper · manuscript in progress",
      themes: ["ai-and-work", "gender-as-lens", "creator-economy"],
      href: "/research/youtube-gender-gap/",
      twoLine: "On YouTube, women's channels receive more positive and less profane comments, but get fewer views. I show that human resharing and an inferred engagement-optimizing recommender system convert softer treatment into lower visibility." },

    { id: "founder-identity", featured: "page", group: "Under review", statusClass: "review",
      title: "Putting the “I” in Entrepreneurship",
      sub: "Individualist Founder Identity and Opportunity Orientation among Digital Entrepreneurs",
      authors: "Katie Apker",
      status: "Under review",
      themes: ["gender-as-lens"],
      href: "/research/founder-identity/",
      twoLine: "How digital entrepreneurs' individualist or collective founder identity shapes the opportunities they pursue online, and how that identity is gendered." },

    { id: "separate-spheres", featured: "title-only", group: "Under review", statusClass: "review",
      title: "Gender Ideology, Separate Spheres, and the Decline of Women's Entrepreneurship",
      authors: "Polhill, P., Raines, G., & Apker, K.",
      status: "Under review at Organization Science",
      themes: ["gender-as-lens"],
      href: null,
      embargo: true },

    { id: "creator-mapping", featured: "card", group: "Editing for submission", statusClass: "editing",
      title: "Mapping the Creator Economy",
      sub: "A Framework and Research Agenda for Management Scholarship",
      authors: "Cho, Apker, Ghaedipour, Pillemer, Sackett, Sonal, & Thomas",  // confirm list
      status: "Editing for submission",
      themes: ["creator-economy"],
      href: null,
      twoLine: "A framework for management researchers studying the creator economy: what defines the field, why it matters, and which questions remain open." },

    { id: "board-diversity", featured: "card", group: "Editing for submission", statusClass: "editing",
      title: "Corporate Responsibility Ratings as Drivers of Diversity Norms",
      sub: "An Examination of Board Gender Diversity",
      authors: "Apker, Checketts, Christensen, Howell, Lewis, & Scott",
      status: "Editing for submission",
      themes: ["gender-as-lens"],
      href: null,
      twoLine: "Whether corporate social responsibility ratings push boards toward adding women, or mainly reward firms that already have women directors." },

    { id: "gov-mandates", featured: "card", group: "Editing for submission", statusClass: "editing",
      title: "Government Mandates, Manager Compliance, and a Partisan Filter in Enforcement",
      authors: "Rissing, Apker, & Carver",
      status: "Editing for submission",
      themes: [],
      href: null,
      twoLine: "How managers' political views shape their expectations about enforcement and their compliance with government mandates." },

    { id: "tolbert-diversity", featured: "card", group: "Data collection / analysis", statusClass: "field",
      title: "Increasing Diversity and Organizational Outcomes: Past and Present",
      authors: "Tolbert, P., & Apker, K.",
      status: "Data collection complete · analysis in progress",
      themes: ["gender-as-lens"],
      href: null,
      twoLine: "How the link between workforce diversity and organizational outcomes has changed across decades." },

    { id: "yt-panel", featured: "card", group: "Data collection / analysis", statusClass: "field",
      title: "Longitudinal Creator Panel: AI Adoption, Gender, and Careers",
      sub: "Tracking YouTube creators over time as AI tools enter their work",
      authors: "Katie Apker",
      status: "In the field",
      themes: ["ai-and-work", "creator-economy"],
      href: null,
      twoLine: "A panel following YouTube creators over time as AI tools enter their work, with attention to career effects for women and men." },

    { id: "sipp", featured: "card", group: "Data collection / analysis", statusClass: "field",
      title: "Spousal Overwork, Family Structure, and Who Starts a Business",
      authors: "Katie Apker",
      status: "In the field",
      themes: [],
      href: null,
      twoLine: "Whether one spouse's long work hours change the other spouse's likelihood of starting a business, and how that pattern differs by gender." },
  ],

  /* ---- JMP manuscript access ---- */
  jmpManuscript: {
    ready: false,                 // flip true + set url when the PDF is hosted
    url: "/manuscripts/jmp.pdf",
    note: "The full manuscript is in progress. Email me for the current draft.",
  },
};
