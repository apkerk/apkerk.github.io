/* ==========================================================================
   jmp-data.js — content for the JMP deep-dive (Approval Without Amplification)
   Plain language. Numbers from the canonical analysis (2026-06-10), to be
   refreshed against the 2026-06-17 re-run. Framing locks apply (see data.js).
   ========================================================================== */

window.JMP = {
  title: "Approval Without Amplification",
  sub: "Gender and visibility on algorithmically mediated platforms",

  plain:
    "In a random sample of 9,232 U.S. YouTube creators and more than 6 million comments, women's channels get about 33% fewer views. About a third of the raw gap is explained by production differences. The remaining gap is not explained by topics, titles, transcripts, or thumbnails. Women's channels receive more positive and less profane comments, and those softer signals are less rewarded by human resharing and an inferred engagement-optimizing recommender system.",
  plainSub:
    "Same finding, in one line: women get approval, men get amplification.",

  heroStats: [
    { n: "33%", d: "fewer views for women's channels at the start (about 22% after the usual controls)", kind: "gap" },
    { n: "≈ 0", d: "the gap that remains once you account for the positivity and profanity of the comments each channel receives", kind: "resolved" },
  ],

  /* ---- the decomposition explorer: how much of the gap each thing explains ----
     residual = how much of the gap is still unexplained after this factor.
     barFrom raw 33%. The last step is the punchline. */
  decomp: [
    { key: "The starting gap", factor: "nothing yet",
      residual: 33, label: "33%", sig: true,
      explains: "Women's channels get about 33% fewer views than comparable men's.",
      sub: "This is the whole gap, before accounting for anything." },
    { key: "Production", factor: "channel age and number of videos",
      residual: 22, label: "22%", sig: true,
      explains: "About a third of the gap is production: women's channels are younger and post fewer videos.",
      sub: "Compare channels of similar age and output, and about 22% fewer views is still left." },
    { key: "Topic", factor: "content category",
      residual: 20, label: "20%", sig: true,
      explains: "Topic barely matters. Women and men in the same categories show almost the same gap.",
      sub: "Only about a tenth of the gap is about which topics women choose." },
    { key: "Their own videos", factor: "how women title and frame their videos",
      residual: 19, label: "19%", sig: true,
      explains: "How women title and frame their own videos barely moves the gap either.",
      sub: "So it is not what women are making or how they present it." },
    { key: "The comments they get", factor: "how warm and how profane the comments are",
      residual: 2, label: "≈ 0", sig: false, punch: true,
      explains: "The comments explain almost all of what is left. Account for how warm and how profane each channel's comments are, and the gap is no longer distinguishable from zero.",
      sub: "Women get warmer, less profane comments. Resharing and the recommendation system reward heat, so warmer treatment becomes fewer views. About 90% of the remaining gap runs through this difference." },
  ],

  /* ---- what does NOT explain it (the eight rule-outs, plain) ---- */
  ruleouts: [
    { tag: "Topic", q: "Do women just pick lower-traffic topics?", v: "No, within the same categories, women still get about 20% fewer views.",
      detail: "Comparing only within the same 40 content categories removes just ~11% of the gap. Nearly 9 in 10 of it is within-category." },
    { tag: "Output", q: "Do women post fewer videos?", v: "Partly, output is the biggest ordinary factor, but a 22% gap remains after holding it constant.",
      detail: "Video count is the single largest controllable piece of the raw gap. Once it and the other channel basics are held constant, about 22% fewer views still remains." },
    { tag: "Their content", q: "Is it how women title and frame their own videos?", v: "No, their own word choices move the gap by under 3%.",
      detail: "Scoring every title and description with the same language tools and holding them constant removes only a few percent of the gap." },
    { tag: "Subscribers", q: "Do audiences subscribe to women less?", v: "No, there is no real subscriber gap. The shortfall is only in views.",
      detail: "Run the same models with subscribers as the outcome and the gap essentially disappears. It is specific to views." },
    { tag: "Engagement", q: "Do audiences value women's content less?", v: "No, women's channels get higher engagement, not lower.",
      detail: "More likes and comments relative to audience size, on women's channels, not fewer." },
    { tag: "Who comments", q: "Is it just male commenters?", v: "No, male and female commenters both soften on women's channels.",
      detail: "Measured separately, both groups address women's channels with warmer, lower-heat language. The pattern does not depend on who is commenting." },
    { tag: "Self-promotion", q: "Do women promote themselves less elsewhere?", v: "No, women link out more than men, and it does not change the gap.",
      detail: "Women link to other platforms more often (about 20% vs 16%); accounting for it leaves the view gap intact." },
    { tag: "Backlash", q: "Is it backlash against women in male-typed fields?", v: "No, the backlash test comes back null.",
      detail: "The three-way interaction is not statistically significant (beta=0.026, p=.73), so the visibility penalty attaches to the affective signal itself, not specifically to women as a category." },
  ],
  ruleoutExtra: "It also holds up under the usual robustness checks: outliers, missing data, comment length, alternative codings, and alternative ways of computing the statistics.",

  mechanism: {
    headline: "Amplification rewards high-arousal signals.",
    body: "Both human resharing and an inferred engagement-optimizing recommender system reward high-arousal signals. In the models, positive comment tone is associated with fewer views (about -0.43), while profanity is associated with more views (about +0.20). Because women's channels receive more positive and less profane comments, softer treatment becomes lower visibility.",
    lanes: [
      { h: "Women's channels", traits: ["Warmer, more positive comments", "About half as much profanity", "Calmer, lower-heat engagement"], signal: "→ weaker amplification, fewer views" },
      { h: "Men's channels", traits: ["More contentious comments", "More profanity", "Hotter, higher-arousal engagement"], signal: "→ stronger amplification, more views" },
    ],
  },

  /* ---- the web-native talk (inspired by the M&O Research Camp deck) ---- */
  talk: [
    { sn: "The setting", h: "YouTube creators build businesses through visibility", body: "On platforms, audience reception and visibility are linked by recommendation systems rather than by a single evaluator who also allocates resources." },
    { sn: "The question", h: "Does favorable evaluation still protect entrepreneurs?", body: "Gender-and-entrepreneurship research often explains women's disadvantage through unfavorable evaluation. I ask whether that account holds when platform amplification sits between evaluation and allocation." },
    { sn: "The evidence", h: "9,232 creators, 6 million+ comments", body: "I study a random sample of U.S. YouTube creators, audience comments, creator information, YouTube Data API metrics, and text and image measures of content." },
    { sn: "The mechanism", h: "Visibility depends on audience signals", body: "Both human resharing and an inferred engagement-optimizing recommender system amplify high-arousal signals more strongly than positive reception." },
    { sn: "Two possibilities", h: "Audience treatment could help or hurt", html: '<ul><li><strong>Hostility:</strong> if audiences attack women, high-arousal negativity could produce more visibility.</li><li><strong>Softer treatment:</strong> if audiences respond more positively to women, lower-arousal signals could produce less visibility.</li></ul><p>The data support the second pattern.</p>' },
    { sn: "The setting", h: "Creator data plus audience comments", body: "The analysis combines creator information, YouTube Data API metrics, more than 6 million audience comments, and text and image measures of content." },
    { sn: "Finding 1", h: "Women get about 33% fewer views", body: "Despite equivalent subscribers and higher engagement rates. The shortfall is specific to views, the thing that pays." },
    { sn: "Finding 2", h: "The usual explanations do not hold", body: "The gap survives controls for output, quality, content category, and how women title their own videos. It is not what women are making." },
    { sn: "Finding 3", h: "Women receive softer audience treatment", html: '<ul><li><strong>53.5 vs 43.1</strong> comment tone for women\'s versus men\'s channels</li><li><strong>0.19% vs 0.43%</strong> profanity in comments on women\'s versus men\'s channels</li></ul><p>Women also have higher engagement and no statistically significant controlled subscriber gap.</p>' },
    { sn: "Finding 4", h: "Comment treatment explains the remaining gap", body: "Put the positivity and profanity of the comments into the model and the gender gap is no longer distinguishable from zero. Comment treatment accounts for approximately 90% of the remaining gap." },
    { sn: "The mechanism", h: "A negative arousal bonus", body: "Positive comment tone is associated with fewer views, while profanity is associated with more views. Human resharing and an inferred engagement-optimizing recommender system convert softer treatment into lower visibility." },
    { sn: "Why it matters", h: "A boundary condition on favorable evaluation", body: "More favorable treatment can coexist with lower visibility. When algorithmic intermediaries stand between evaluation and allocation, positive reception can lose its protective force." },
  ],

  bibtex:
`@unpublished{apker_approval_2026,
  author = {Apker, Katie},
  title  = {Approval Without Amplification: Gender and Entrepreneurial
            Visibility on Algorithmically Mediated Platforms},
  note   = {Working paper, Cornell University, ILR School},
  year   = {2026}
}`,
};
