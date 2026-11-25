import Link from "next/link";

const pillars = [
  {
    num: "01",
    icon: "📱",
    title: "App Integration",
    body: "Available on iOS, Android, and web. Your congregation accesses CommonLife from any device, anytime. Onboarding takes minutes — just download the app and start asking questions.",
    benefits: [
      "Native iOS & Android apps",
      "Progressive web app (offline-capable)",
      "Single sign-on with your church email",
    ],
  },
  {
    num: "02",
    icon: "🌐",
    title: "Website Embedding",
    body: "Drop our widget into your existing church website or ministry platform in minutes — no dev team needed. One script tag. Instant biblical AI on your domain.",
    benefits: [
      "One-line embed code",
      "Fully branded to your church",
      "Works with any CMS or website builder",
    ],
  },
  {
    num: "03",
    icon: "📊",
    title: "Community Data Insights",
    body: "Optional analytics reveal emerging prayer burdens and discipleship gaps across your congregation — so you can preach and minister to what your people actually need.",
    benefits: [
      "Anonymized question analytics",
      "Weekly pastoral digest report",
      "Trend detection across campuses",
    ],
  },
];

const faqs = [
  {
    q: "Is CommonLife safe for children?",
    a: "Yes. CommonLife uses only vetted Christian sources and includes age-appropriate filters. It is designed for all ages, from young children to seminary students.",
  },
  {
    q: "How long does setup take?",
    a: "For the web embed, setup takes under 5 minutes. App onboarding is immediate. Enterprise integrations with SSO and custom branding typically take 1-2 business days.",
  },
  {
    q: "What sources does CommonLife use?",
    a: "CommonLife is trained exclusively on biblically verified sources: major Bible translations, renowned commentaries, theological dictionaries, and peer-reviewed Christian scholarship.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. We offer a 30-day free pilot for qualified churches and institutions. Schedule a demo to get started.",
  },
];

export const metadata = {
  title: "How It Works — CommonLife",
  description:
    "Three ways to deploy CommonLife: mobile app, website widget, and community analytics. Get biblical AI in your hands in minutes.",
};

export default function HowItWorksPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 pt-24 pb-20 text-center"
          aria-labelledby="hiw-hero-heading"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase mb-4">
              How It Works
            </p>
            <h1
              id="hiw-hero-heading"
              className="font-heading font-bold text-4xl md:text-6xl leading-tight md:leading-none mb-8"
            >
              Three Ways to Deploy CommonLife
            </h1>
            <p className="text-brand-lightBerry text-lg md:text-xl">
              From mobile app to website widget to deep analytics — CommonLife meets your
              congregation wherever they are.
            </p>
          </div>
        </section>

        {/* Three pillars */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="pillars-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <h2 id="pillars-heading" className="sr-only">
              Integration pillars
            </h2>
            <div className="flex flex-col gap-20">
              {pillars.map((pillar, i) => (
                <article
                  key={pillar.num}
                  className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="inline-flex items-center justify-center w-12 h-10 rounded bg-brand-navy text-brand-lightBerry text-sm font-heading font-bold mb-6">
                      {pillar.num}
                    </div>
                    <span className="block text-5xl mb-4" role="img" aria-hidden="true">
                      {pillar.icon}
                    </span>
                    <h3 className="font-heading font-bold text-2xl md:text-3xl text-brand-navy mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-brand-navy/70 text-base leading-relaxed mb-6">{pillar.body}</p>
                    <ul className="space-y-2">
                      {pillar.benefits.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm text-brand-navy/80">
                          <span className="w-5 h-5 rounded-full bg-brand-berry/20 flex items-center justify-center text-brand-berry text-xs shrink-0" aria-hidden="true">
                            ✓
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 bg-brand-offWhite rounded-2xl h-64 flex items-center justify-center" aria-hidden="true">
                    <span className="text-8xl opacity-30">{pillar.icon}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pilot CTA */}
        <section
          className="bg-brand-berry text-white px-5 md:px-20 py-20 text-center"
          aria-labelledby="pilot-heading"
        >
          <div className="max-w-2xl mx-auto">
            <h2
              id="pilot-heading"
              className="font-heading font-bold text-3xl md:text-4xl mb-6"
            >
              Start Your 30-Day Free Pilot
            </h2>
            <p className="text-white/80 text-lg mb-10">
              No credit card required. Full access. Real results in 30 days or we help you onboard
              free for another month.
            </p>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center px-8 py-4 rounded bg-white text-brand-berry font-heading font-semibold hover:bg-brand-offWhite transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Schedule a Demo →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="font-heading font-bold text-3xl md:text-4xl text-brand-navy text-center mb-16"
            >
              Common Questions
            </h2>

            <dl className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="border border-brand-offWhite rounded-xl p-7"
                >
                  <dt className="font-heading font-bold text-base text-brand-navy mb-3">
                    {faq.q}
                  </dt>
                  <dd className="text-brand-navy/70 text-sm leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

    </>
  );
}
