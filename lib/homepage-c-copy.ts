/**
 * Approved Direction C copy and routes.
 * Strings marked PENDING in the design packet are intentionally absent.
 */

export const APP_URL = "https://app.commonlife.ai";

export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  app: APP_URL,
} as const;

export const hero = {
  title: "Faith meets technology",
  subline: "Built for the Church, powered by truth",
  counter: "00 / 05",
} as const;

export const chapters = [
  {
    id: "ask",
    counter: "01 / 05",
    label: "Ask",
    title: "Ask anything",
    body: "Ask spiritual, moral, or personal questions and get answers based on the Bible, not opinions or popular culture. Every answer includes scripture and explanations, not internet comments.",
    mobileBody:
      "Ask spiritual, moral, or personal questions and get answers based on the Bible, not opinions or popular culture.",
    image: "/homepage-c/app-screen-ask.jpeg",
    width: 606,
    height: 1281,
    alt: "CommonLife answering a request for a sermon on forgiveness with Matthew 18",
  },
  {
    id: "read",
    counter: "02 / 05",
    label: "Read",
    title: null,
    body: "Our Bible reader supports many translations and allows the conveniences of an “always with me” digital Bible.",
    mobileBody: null,
    image: "/homepage-c/app-bible-reader.jpeg",
    width: 970,
    height: 1920,
    alt: "CommonLife Bible reader open to Genesis 1 in the NIV",
  },
  {
    id: "study",
    counter: "03 / 05",
    label: "Study",
    title: null,
    body: "Create Bible study outlines, devotionals, and teaching guides quickly—tailored for adults, youth, or kids. Ideal for pastors, group leaders, and teachers.",
    mobileBody: null,
    image: "/homepage-c/app-screen-study-perspectives.jpeg",
    width: 606,
    height: 1281,
    alt: "CommonLife study screen with linguistic insights and theological perspectives",
  },
  {
    id: "share",
    counter: "04 / 05",
    label: "Share",
    title: "Share with friends to study together.",
    body: "Join a trusted community using technology to deepen faith safely and wisely.",
    mobileBody: null,
    image: "/homepage-c/app-screen-share.jpeg",
    width: 606,
    height: 1281,
    alt: "CommonLife sharing a study of Ephesians 2",
  },
  {
    id: "every-language",
    counter: "05 / 05",
    label: "Every language",
    title: "Multi-language support available.",
    body: "Generate study materials in multiple languages, ensuring scriptural accuracy across borders.",
    mobileBody: null,
    image: "/homepage-c/app-screen-every-language.jpeg",
    width: 607,
    height: 1281,
    alt: "CommonLife answering a Spanish question about James and Jesus",
  },
] as const;

export const statement = {
  lead: "Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources.",
  scripture:
    "“Do not conform to the pattern of this world, but be transformed by the renewing of your mind.”",
  reference: "Romans 12:2",
} as const;

export const media = {
  openBible: {
    src: "/homepage-c/photo-open-bible.jpeg",
    width: 2000,
    height: 1500,
    alt: "An open Bible resting on a stone outdoors",
  },
  morning: {
    src: "/homepage-c/photo-morning-devotion.jpeg",
    width: 2000,
    height: 1500,
    alt: "An open Bible and a green mug in morning light",
  },
  study: {
    src: "/homepage-c/app-screen-study-perspectives.jpeg",
    width: 606,
    height: 1281,
    alt: "CommonLife Perspectives study on a phone",
  },
} as const;

export const pilot = {
  statement: "Extend Pastoral Care Beyond Sunday",
  heading: "Apply to Become a Pilot Church",
  body: "This short application helps us understand your church, your current challenges, and which level of support would be the best fit. Most applications take less than 2 minutes to complete.",
  ministries: [
    "Large Churches & Multi-Campus",
    "Youth Ministries",
    "Bible Colleges / Seminaries",
    "Mission Teams",
    "Christian Counselors",
    "Home Churches & Small Groups",
  ],
} as const;

export const footer = {
  columnLabel: "CommonLife",
  about: "About Us",
  contact: "Contact",
  app: "CommonLife App",
  demo: "Schedule a Demo",
  contactUs: "Contact Us",
  legal: "© CommonLife, Inc. All rights reserved.",
  tagline: "Built for the Church, powered by truth.",
} as const;

export const nav = {
  about: "About",
  contact: "Contact",
  demo: "Schedule a demo",
} as const;

export function chapterIndexFromProgress(progress: number, count: number) {
  if (count <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(count - 1, Math.floor(Math.min(clamped, 0.999999) * count));
}

export function storyProgress(
  heroProgress: number,
  heroSpan: number,
  chapterProgress: number,
  chapterSpan: number,
) {
  const total = heroSpan + chapterSpan;
  if (total <= 0) return 0;
  const value = (heroProgress * heroSpan + chapterProgress * chapterSpan) / total;
  return Math.min(1, Math.max(0, value));
}

export function rangeProgress(top: number, height: number, viewport: number) {
  const span = height - viewport;
  if (span <= 0) return 1;
  const scrolled = Math.min(span, Math.max(0, -top));
  return scrolled / span;
}
