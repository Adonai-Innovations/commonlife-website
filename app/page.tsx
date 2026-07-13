import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { value: "500+", label: "Churches Served" },
  { value: "24/7", label: "AI Availability" },
  { value: "6 Tools", label: "Ministry Features" },
  { value: "Bible-First", label: "Verified Sources" },
];

const valueProps = [
  {
    icon: "📖",
    title: "Biblically Sound Answers",
    body: "Scholar-verified responses grounded in scripture — never generic AI hallucinations.",
  },
  {
    icon: "🤝",
    title: "Accessible to All",
    body: "Designed for all ages and experience levels, from new believers to seminary students.",
  },
  {
    icon: "🏠",
    title: "Built for Real Life",
    body: "Practical answers for faith questions that arise in everyday life and ministry.",
  },
  {
    icon: "🔌",
    title: "Seamless Integration",
    body: "Embed in your church website, app, or classroom with minimal technical effort.",
  },
];

const platformFeatures = [
  {
    icon: "💬",
    title: "Biblically Verified AI Chat",
    body: "Scripture-based Q&A using only vetted Christian sources.",
  },
  {
    icon: "🎓",
    title: "Education & Classroom Mode",
    body: "Purpose-built tools for Bible colleges and seminaries.",
  },
  {
    icon: "📚",
    title: "Lesson & Study Creator",
    body: "Generate custom devotionals and study guides in minutes.",
  },
  {
    icon: "⛪",
    title: "Church Integration Tools",
    body: "Embed the AI widget directly on your church website or app.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Personal & Family Use",
    body: "Daily guidance and devotionals for individuals and families.",
  },
  {
    icon: "❤️",
    title: "Relational Focus",
    body: "Support for parenting, relationships, anxiety, and more.",
  },
];

const useCases = [
  {
    icon: "🏛️",
    title: "Large & Multi-Campus Churches",
    body: "Scale ministry support without scaling headcount.",
  },
  {
    icon: "⚡",
    title: "Youth Ministries",
    body: "Engage the next generation with biblically grounded answers.",
  },
  {
    icon: "🎓",
    title: "Bible Colleges & Seminaries",
    body: "Classroom-ready tools built for academic study.",
  },
  {
    icon: "✈️",
    title: "Mission Teams",
    body: "Access biblical resources anywhere, online or offline.",
  },
  {
    icon: "🫂",
    title: "Christian Counselors",
    body: "Scripture-backed support for pastoral care and counseling.",
  },
  {
    icon: "🏡",
    title: "Home Churches & Small Groups",
    body: "Simple, affordable discipleship for any size community.",
  },
];

const deploySteps = [
  {
    num: "01",
    icon: "📱",
    title: "App Integration",
    body: "Available on iOS, Android, and web. Your congregation accesses CommonLife from any device, anytime.",
  },
  {
    num: "02",
    icon: "🌐",
    title: "Website Embedding",
    body: "Drop our widget into your existing church website or ministry platform in minutes — no dev team needed.",
  },
  {
    num: "03",
    icon: "📊",
    title: "Community Data Insights",
    body: "Optional analytics reveal emerging prayer burdens and discipleship gaps across your congregation.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 pt-24 pb-28 text-center"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-[1000px] mx-auto">
            <div className="inline-flex items-center px-5 py-2 rounded-full border border-brand-berry/40 text-brand-lightBerry text-sm mb-8">
              AI-Powered Ministry Platform
            </div>
            <h1
              id="hero-heading"
              className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
            >
              Where Faith and Understanding Meet Clarity
            </h1>
            <p className="text-brand-lightBerry text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Instant, trustworthy, Bible-based insight for churches, schools, and families. Built
              on biblically verified sources — not generic AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 rounded bg-brand-berry text-white font-heading font-semibold text-base hover:bg-opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex justify-center items-center px-8 py-4 rounded border border-brand-lightBerry/40 text-brand-lightBerry font-heading font-semibold text-base hover:border-brand-lightBerry hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Band */}
        <section
          className="bg-brand-navyDark text-white px-5 md:px-20 py-5"
          aria-label="Key statistics"
        >
          <ul className="max-w-[1440px] mx-auto flex flex-wrap justify-around gap-6">
            {stats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-heading font-bold text-3xl text-white">{s.value}</p>
                <p className="text-brand-lightBerry text-sm mt-1">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Value Prop */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="value-prop-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              What Is CommonLife?
            </p>
            <h2
              id="value-prop-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-xl mx-auto mb-6 text-balance"
            >
              A Safe, Faithful Resource for a Digital World
            </h2>
            <p className="text-brand-navy/70 text-lg text-center max-w-2xl mx-auto mb-16">
              CommonLife uses trusted Christian sources instead of generic AI, delivering biblical
              answers for Bible study, sermons, teaching, and daily guidance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueProps.map((card) => (
                <article key={card.title} className="bg-brand-offWhite rounded-xl p-7">
                  <span className="text-3xl" role="img" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-brand-navy mt-4 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section
          className="bg-brand-offWhite px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="platform-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              The CommonLife Platform
            </p>
            <h2
              id="platform-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-3xl mx-auto mb-16 text-balance"
            >
              Faith meets technology — built for the Church, powered by truth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeatures.map((f) => (
                <article key={f.title} className="bg-white rounded-xl p-7">
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3 className="font-heading font-bold text-base text-brand-navy mt-4 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="use-cases-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              Who Is It For?
            </p>
            <h2
              id="use-cases-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-2xl mx-auto mb-16 text-balance"
            >
              Built for Every Corner of Ministry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc) => (
                <article
                  key={uc.title}
                  className="border border-brand-offWhite rounded-xl p-7 hover:border-brand-berry/30 transition-colors"
                >
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {uc.icon}
                  </span>
                  <h3 className="font-heading font-bold text-base text-brand-navy mt-4 mb-2">
                    {uc.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">{uc.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works preview */}
        <section
          className="bg-brand-offWhite px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="how-it-works-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              How It Works
            </p>
            <h2
              id="how-it-works-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-2xl mx-auto mb-16 text-balance"
            >
              Three Ways to Deploy CommonLife
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {deploySteps.map((step) => (
                <article key={step.num} className="bg-white rounded-xl p-8">
                  <div className="inline-flex items-center justify-center w-10 h-8 rounded bg-brand-navy text-brand-lightBerry text-xs font-heading font-bold mb-4">
                    {step.num}
                  </div>
                  <span className="block text-3xl mb-4" role="img" aria-hidden="true">
                    {step.icon}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-brand-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">{step.body}</p>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded bg-brand-berry text-white font-heading font-semibold hover:bg-opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2"
              >
                Schedule a Demo →
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 py-24 text-center relative overflow-hidden"
          aria-labelledby="cta-heading"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-berry/10 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl mx-auto">
            <h2
              id="cta-heading"
              className="font-heading font-bold text-3xl md:text-5xl mb-6 text-balance"
            >
              Ready to Bring CommonLife to Your Congregation?
            </h2>
            <p className="text-brand-lightBerry text-lg mb-10">
              Join churches already using CommonLife to deepen discipleship and free up pastor time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 rounded bg-brand-berry text-white font-heading font-semibold hover:bg-opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 rounded border border-brand-lightBerry/40 text-brand-lightBerry font-heading font-semibold hover:border-brand-lightBerry hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
