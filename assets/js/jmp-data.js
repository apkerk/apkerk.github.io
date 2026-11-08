/* ==========================================================================
   jmp-data.js — content for the JMP deep-dive (Approval Without Amplification)
   Plain language. Numbers synced 2026-11-07 to manuscript v86 (comment tone +
   comment disagreement; profanity retired; Gelbach on 8,688). Earlier: 2026-09-28 analysis (LIWC-coded comment
   tone, analytic N 9,096). Pre-v86 copy: _archive/pre-v86-sync-2026-11-07/. Text from the approved 2026-09-28 Paperpal rounds
   (WEB 1 r4, WEB 2 r2/r3, WEB 3 r3). Framing locks apply (see data.js).
   Pre-refresh version: _archive/pre-2026-09-28-refresh/assets/js/jmp-data.js
   ========================================================================== */

window.JMP = {
  title: "Approval Without Amplification",
  sub: "Gender and visibility in algorithmically mediated entrepreneurship",

  plain:
    "Women’s YouTube channels receive about 20 percent fewer views than men’s channels of the same age, video count, and content category. More negative and more divided comment sections are associated with more views, both across creators and within creators’ own videos. Women’s channels receive comments that are more positive in tone and less divided, consistent with courtesy norms in which audiences treat women creators in a more positive, less combative way. Because negative and divided reactions tend to draw more engagement, this courtesy is associated with less visibility, a dynamic I term the courtesy penalty. In a Gelbach decomposition, comment tone accounts for about 90 percent and comment disagreement about 12 percent of the within-category gap in views. The association between comment tone and views does not differ significantly between women’s and men’s videos within creators.",
  plainSub:
    "Same finding, in one line: women get approval, men get amplification.",

  heroStats: [
    { n: "20%", d: "fewer views for women's channels, comparing channels of the same age, video count, and content category", kind: "gap" },
    { n: "90%", d: "of the within-category gap accounted for by comment tone; comment disagreement accounts for another 12% (Gelbach decomposition)", kind: "resolved" },
  ],

  /* ---- decomposition bars: share of the 20% gap accounted for by each block
     (Gelbach decomposition; same channel age, video count, and content
     category; blocks held equal together, so order does not matter).
     sig: true = significant at the .05 level (lava); false = n.s. (light). ---- */
  decomp: {
    heading: "Decomposition of the Visibility Gap",
    axis: "Share of the 21.6% gap (same channel age, video count, and content category; 8,688 channels), percent",
    min: -20,
    max: 100,
    ticks: [-20, 0, 20, 40, 60, 80, 100],
    families: [
      { name: "Creator side",
        caption: "Bars show the share accounted for by creator-controlled content tone and profanity, which widens the gap, with channel trailer and HD video quality not distinguishable from zero.",
        items: [
          { label: "Creator content", share: -7.1, sig: true },
          { label: "Channel trailer", share: 2.1, sig: false },
          { label: "HD video", share: 0.9, sig: false },
        ] },
      { name: "Amount of reception",
        caption: "Bars show the share accounted for by comment volume, which is not statistically distinguishable from zero.",
        items: [
          { label: "Comment volume", share: 3.7, sig: false },
        ] },
      { name: "Comment reception",
        caption: "Bars show the share of the gap accounted for by audience comment tone and comment disagreement.",
        items: [
          { label: "Comment tone", share: 89.7, sig: true },
          { label: "Comment disagreement", share: 12.0, sig: true },
        ] },
      { name: "Not accounted for",
        caption: "Bars show the remaining share of the gap not accounted for by included factors; the full model’s gap is not statistically distinguishable from zero.",
        items: [
          { label: "Left over", share: -1.3, sig: false },
        ] },
    ],
    note: "Each share represents the portion of the 21.6 percent gap accounted for by a factor when all factors are held equal together. Shares are an accounting of the change in the creator-gender coefficient between the model with creator gender, channel age, video count, and content category and the model that adds every block at once. Shares do not indicate causal effects. Negative shares mean holding that factor equal widens the gap. The order of factors does not affect shares.",
    rawGap: "In the raw 34 percent gap without controls, channel age and video count account for 49.6 percent of the gap, while content category’s share is minus 15.9 percent, meaning holding category equal widens the gap.",
  },

  /* ---- what does NOT explain it (the ten rule-outs) ---- */
  ruleoutLede: "",
  ruleouts: [
    { tag: "Topic", q: "Do women just pick lower-traffic topics?",
      v: "No. In a Gelbach decomposition of the gap at the same channel age and video count, content category's share is minus 26.9 percent, widening the gap.",
      detail: "Comparing channels within the same 40 content categories the gap is about 20 percent, versus about 19 percent without category. Women’s categories average fewer views, but within 128 finer subtopics the gap remains about 16 percent. Women’s channels still receive more positive and less divided comments within subtopics." },
    { tag: "Output", q: "Do women post fewer videos?",
      v: "Partly. In a Gelbach decomposition of the raw 34 percent gap, channel age and video count account for 49.6 percent.",
      detail: "Men’s channels are about 0.9 years older and have more videos (geometric means of 589 versus 466). At the same age, video count, and category, women’s channels still receive about 20 percent fewer views." },
    { tag: "Titles and descriptions", q: "Is it how women title and describe their videos?",
      v: "No. Creator content accounts for minus 7.1 percent of the within-category gap in a Gelbach decomposition, widening it.",
      detail: "Women’s titles and descriptions are more positive, but this does not close the gap." },
    { tag: "Transcripts", q: "Is it what women say in their videos?",
      v: "No. When titles, descriptions, transcripts, and thumbnails all enter alongside comment tone and disagreement, the creator-side elements account for minus 22.9 percent of the gap (6,503 channels), widening it.",
      detail: "Women’s spoken content is more positive. Transcript missingness is not significantly different by gender." },
    { tag: "Thumbnails", q: "Is it how women package their videos?",
      v: "No. None of the content elements accounts for the gap in models including all creator content and comment reception.",
      detail: "Women’s thumbnails show more positive facial expressions, warmer colors, and less clickbait." },
    { tag: "Subscribers", q: "Do audiences subscribe to women less?",
      v: "No. At the same channel age and video count, the difference is not statistically distinguishable from zero (p = .873).",
      detail: "Without controls, women’s channels have about 10 percent fewer subscribers." },
    { tag: "Engagement", q: "Do audiences engage less with women’s channels?",
      v: "No. At the same channel age and video count, engagement per view is 24.7 percent higher and engagement per subscriber is 14.2 percent higher on women’s channels, both significant at the .05 level.",
      detail: "Women’s channels also receive more comments." },
    { tag: "Who comments", q: "Is it just male commenters?",
      v: "No. Male-coded and female-coded commenters write 10.0 and 9.8 tone points more positively, respectively, and leave less divided comment sections on women’s channels, both significant at the .05 level.",
      detail: "Holding the share of female-coded commenters equal leaves a gap of about 17 percent fewer views, which becomes not distinguishable from zero once comment tone and disagreement are included." },
    { tag: "Self-promotion", q: "Do women promote themselves less on other platforms?",
      v: "No. Women’s channels link out more often (20.7 percent versus 16.4 percent, significant at the .05 level).",
      detail: "Holding linking equal leaves the gap unchanged, and linking’s association with views does not differ by gender." },
    { tag: "Backlash", q: "Are women penalized differently in female-typed categories?",
      v: "No. The three-way interaction of gender, comment tone, and female-typed category is -0.04 and not statistically distinguishable from zero (p = .61).",
      detail: "The link between positive tone and fewer views is steeper in female-typed categories for both genders." },
  ],
  ruleoutExtra: "The visibility gap and its association with comment tone and disagreement hold under robustness checks including content-category clustered standard errors and wild cluster bootstrap, trimmed and winsorized views, channels active at least twelve months, quantile regressions, excluding the gaming categories, VADER sentiment, holding like rate equal, and alternative constructions of comment disagreement.",

  mechanism: {
    headline: "Positive Comments Associate with Fewer Views",
    body: "Women’s channels receive more positive and less divided comments, with commenters of both genders writing about 10 tone points more positively on women’s channels. At the same channel age, video count, and comment volume, a one standard deviation increase in positive comment tone corresponds to about 34 percent fewer views; within content categories, a one standard deviation increase in comment disagreement corresponds to about 7 percent more views. Within individual creators’ own videos, more positive comment tone is also associated with fewer views, and that association does not differ significantly between women’s and men’s videos. Softer, less divided reception statistically accounts for most of women’s visibility gap, which I term the courtesy penalty. The suggested explanation, consistent with the data and prior research, is that recommendation systems and resharing audiences amplify visibility based on these engagement signals.",
    lanes: [
      { h: "Women’s channels", traits: ["More positive comments (tone 62.8)", "Less divided comments (disagreement 0.436)", "More comments and higher engagement"], signal: "This reception is associated with fewer views" },
      { h: "Men’s channels", traits: ["Less positive comments (tone 52.7)", "More divided comments (disagreement 0.502)", "Fewer comments and lower engagement"], signal: "This reception is associated with more views" },
    ],
    figCaption: "Diagram showing the suggested path from creator gender through expressed reception (comment tone and comment disagreement), amplified by resharing viewers and recommendation, to visibility, alongside a direct path from creator gender to views.",
  },

  talkOverview: "This study asks how audience evaluation relates to entrepreneurial visibility on YouTube and whether these dynamics differ by gender. The analysis uses the 9,096 channels with comment data among creators drawn at random from the Infludata frame of U.S. individual creators with at least 2,000 subscribers. Creator gender was hand-coded, and the dataset includes over 5.7 million audience comments. I find that women’s channels receive about 20 percent fewer views than men’s when controlling for channel age, video count, and content category. More positive comment tone is associated with fewer views, and more divided comment sections with more views, both across and within creators’ videos. Women’s channels receive more positive and less divided comments, consistent with courtesy norms. A Gelbach decomposition attributes about 90 percent of the within-category gap to comment tone and about 12 percent to comment disagreement, with women’s own content positivity widening the gap rather than reducing it.",

  bibtex:
`@unpublished{apker_approval_2026,
  author = {Apker, Katie},
  title  = {Approval Without Amplification: Gender and Visibility
            in Algorithmically Mediated Entrepreneurship},
  note   = {Working paper, Cornell University, ILR School},
  year   = {2026}
}`,
};
