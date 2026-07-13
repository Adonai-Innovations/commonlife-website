import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const discipleshipStats = [
  { value: "500+", label: "Churches Served" },
  { value: "50K+", label: "Believers Reached" },
  { value: "6", label: "Ministry Tools" },
  { value: "100%", label: "Bible-First" },
];

const values = [
  {
    icon: "✝️",
    title: "Scripture Authority",
    body: "Every answer is grounded in the Bible and verified by Christian scholars.",
  },
  {
    icon: "🙏",
    title: "Faithful Stewardship",
    body: "We build technology that honors God and serves His people well.",
  },
  {
    icon: "🌍",
    title: "Radical Accessibility",
    body: "Ministry tools shouldn't require a tech budget. CommonLife is affordable for every church.",
  },
  {
    icon: "🤲",
    title: "Community Discipleship",
    body: "We believe discipleship happens in community, not in isolation — our tools reflect that.",
  },
  {
    icon: "🔒",
    title: "Trust & Safety",
    body: "No hallucinations. No generic AI. Only sources your congregation can trust.",
  },
  {
    icon: "💡",
    title: "Continuous Innovation",
    body: "We listen to pastors, educators, and families to keep building what the Church actually needs.",
  },
];

const team = [
  {
    name: "Keven Valdez",
    role: "Chief Executive Officer",
    description: "Visionary leader with a passion for faith-driven technology.",
  },
  {
    name: "CTO Agent",
    role: "Chief Technology Officer",
    description: "Architecting scalable, trustworthy AI systems for ministry.",
  },
];

export const metadata = {
  title: "About CommonLife — Mission & Values",
  description:
    "CommonLife exists to bring biblically faithful AI to every church, school, and family. Learn our mission, values, and story.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 pt-24 pb-20 text-center"
          aria-labelledby="about-hero-heading"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase mb-4">
              Our Mission
            </p>
            <h1
              id="about-hero-heading"
              className="font-heading font-bold text-4xl md:text-6xl leading-tight mb-8"
            >
              Faith-First AI for the Church
            </h1>
            <p className="text-brand-lightBerry text-lg md:text-xl">
              CommonLife exists to bring biblically faithful, accessible AI to every church, school,
              and family — so the next generation encounters truth, not confusion.
            </p>
          </div>
        </section>

        {/* Scripture quote */}
        <section
          className="bg-brand-berry text-white px-5 md:px-20 py-16 text-center"
          aria-label="Scripture quote"
        >
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-heading font-bold text-2xl md:text-3xl italic mb-4">
              &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
            </p>
            <cite className="text-white/70 text-sm not-italic">— Psalm 119:105</cite>
          </blockquote>
        </section>

        {/* Discipleship stats */}
        <section
          className="bg-brand-navyDark text-white px-5 md:px-20 py-10"
          aria-label="Impact statistics"
        >
          <ul className="max-w-[1440px] mx-auto flex flex-wrap justify-around gap-8">
            {discipleshipStats.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-heading font-bold text-4xl text-white">{s.value}</p>
                <p className="text-brand-lightBerry text-sm mt-1">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Values grid */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="values-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              What We Stand For
            </p>
            <h2
              id="values-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-2xl mx-auto mb-16 text-balance"
            >
              Built on Principles That Matter
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <article key={v.title} className="bg-brand-offWhite rounded-xl p-7">
                  <span className="text-3xl" role="img" aria-hidden="true">
                    {v.icon}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-brand-navy mt-4 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-brand-navy/70 text-sm leading-relaxed">{v.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          className="bg-brand-offWhite px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="team-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase text-center mb-4">
              The Team
            </p>
            <h2
              id="team-heading"
              className="font-heading font-bold text-3xl md:text-5xl text-brand-navy text-center max-w-xl mx-auto mb-16 text-balance"
            >
              People Who Believe in This Mission
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="bg-white rounded-xl p-8 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full bg-brand-berry/20 flex items-center justify-center mx-auto mb-4"
                    aria-hidden="true"
                  >
                    <span className="font-heading font-bold text-brand-berry text-xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-berry text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-brand-navy/70 text-sm">{member.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 py-24 text-center"
          aria-labelledby="about-cta-heading"
        >
          <div className="max-w-xl mx-auto">
            <h2
              id="about-cta-heading"
              className="font-heading font-bold text-3xl md:text-4xl mb-6"
            >
              Join the Movement
            </h2>
            <p className="text-brand-lightBerry text-lg mb-10">
              Help us bring faithful AI to every congregation. Schedule a demo and see CommonLife in
              action.
            </p>
            <Link
              href="/contact"
              className="inline-flex justify-center items-center px-8 py-4 rounded bg-brand-berry text-white font-heading font-semibold hover:bg-opacity-90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Schedule a Demo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
