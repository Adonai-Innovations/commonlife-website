import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { LinkButton } from "@/components/horizon/Button";
import { FullSection, Phone, SpecSheet } from "@/components/horizon/Sections";
import SiteFrame from "@/components/horizon/SiteFrame";
import { SCHEDULE_DEMO_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Where Faith and Understanding meet Clarity.",
  description: "Faith meets technology—built for the Church, powered by truth.",
};

const howItWorks = [
  {
    label: "App Integration",
    value:
      "Add CommonLife to your church’s app. Members can open a “Biblical Guidance” or “Ask About Scripture” section and quickly chat with an AI that knows only the Bible and trusted commentaries.",
  },
  {
    label: "Website Embedding",
    value:
      "Add CommonLife as a discreet chat widget on your church site for sermon follow-ups, small-group support, or answering spiritual questions from visitors and new believers.",
  },
  {
    label: "Community Data Insights (Optional)",
    value:
      "Church admins can view anonymous analytics on key topics (e.g., prayer, anxiety, forgiveness) to help pastors tailor sermons, groups, or resources.",
  },
];

const useCasesA = [
  {
    label: "Large Churches & Multi-Campus Ministries",
    value:
      "Large multi-site churches can engage thousands of members with CommonLife, a personalized, biblically accurate assistant available 24/7 via your church app or website.",
  },
  {
    label: "Youth Ministries",
    value: "Create interactive lessons and digital devotionals that keep students engaged.",
  },
  {
    label: "Bible Colleges / Seminaries",
    value: "Supplement study with verified contextual insights and theological cross-references.",
  },
];

const useCasesB = [
  {
    label: "Mission Teams",
    value: "Generate study materials in multiple languages, ensuring scriptural accuracy across borders.",
  },
  {
    label: "Christian Counselors",
    value: "Use AI-supported, Scripture-anchored responses for pastoral care and counseling preparation.",
  },
  {
    label: "Home Churches & Small Groups",
    value: "Quickly craft discussion guides, prayers, and Scripture-based answers during study sessions.",
  },
];

const features = [
  {
    title: "Biblically Sound Answers.",
    body: "Every answer is based on Scripture and verified by scholars and trusted biblical commentaries.",
  },
  {
    title: "Accessible to All.",
    body: "From kids learning their first Bible stories to adults wrestling with faith’s toughest questions, CommonLife meets each person where they are.",
  },
  {
    title: "Built for Real Life.",
    body: "Ask anything—“How do I forgive someone?” “What does the Bible say about anxiety?” “How can I teach kids about prayer?”—and receive a biblical, compassionate response.",
  },
  {
    title: "Seamless Integration.",
    body: "CommonLife can plug directly into your church or Christian school’s existing tech, or operate as a standalone tool for small groups, ministries, or individual users.",
  },
];

export default function HomePage() {
  return (
    <SiteFrame overlay>
      <FullSection image="light-rays" copyWidth={980} priority hero>
        <h1 className="t-display" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          Where Faith and Understanding meet Clarity.
        </h1>
        <p className="t-hero-lede" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          Faith meets technology—built for the Church, powered by truth.
        </p>
        <div className="actions" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
          <LinkButton href={SCHEDULE_DEMO_URL} external>
            Schedule a Demo
          </LinkButton>
          <LinkButton href={SCHEDULE_DEMO_URL} external>
            CommonLife App
          </LinkButton>
        </div>
      </FullSection>

      <FullSection image="pew" side="right" copyWidth={600}>
        <h2 className="t-h2" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          What is CommonLife?
        </h2>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          CommonLife is a Christian AI resource that helps people explore and live Scripture confidently. Built on biblically verified sources, it ensures all responses align with the Word.
        </p>
        <div className="actions" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
          <LinkButton href="/about">About CommonLife</LinkButton>
        </div>
      </FullSection>

      <FullSection image="open-bible" copyWidth={780}>
        <h2 className="t-safe" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          A Safe, Faithful Resource for a Digital World
        </h2>
        <p className="scripture" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          “Do not conform to the pattern of this world, but be transformed by the renewing of your mind.”
        </p>
        <p className="cite" data-reveal="" data-contrast="white" style={{ "--stagger": 2 } as CSSProperties}>
          Romans 12:2
        </p>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 3 } as CSSProperties}>
          Unlike generic AI, CommonLife uses only trusted, doctrinally sound Christian sources, ensuring every response is truth-based for your community’s confidence.
        </p>
      </FullSection>

      <section className="solid">
        <div className="platform">
          <div className="platform-copy">
            <h2 className="t-h2" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
              The CommonLife Platform
            </h2>
            <p className="t-body" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
              CommonLife is a Christian AI platform that brings Scripture to life through intelligent, biblically grounded conversation and study tools. It’s more than just a chatbot—it’s a discipleship companion, a Bible study helper, and a teaching resource for modern Christian communities.
            </p>
            <p className="eyebrow" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
              How it Works
            </p>
            <div data-reveal="" style={{ "--stagger": 3 } as CSSProperties}>
              <SpecSheet rows={howItWorks} />
            </div>
          </div>
          <Phone />
        </div>
      </section>

      <FullSection image="bibles-group" copyWidth={1328}>
        <h2 className="t-h2 cap" data-reveal="" data-contrast="white" style={{ "--stagger": 0, maxWidth: 1000 } as CSSProperties}>
          CommonLife offers quick, reliable Bible-based advice in simple words.
        </h2>
        <div className="features" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          {features.map((feature) => (
            <div className="feature" key={feature.title}>
              <h3 className="t-feature">{feature.title}</h3>
              <p className="t-small">{feature.body}</p>
            </div>
          ))}
        </div>
      </FullSection>

      <section className="solid">
        <div className="stack">
          <h2 className="t-h2" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
            Common Use Cases
          </h2>
          <div className="sheets" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
            <SpecSheet rows={useCasesA} />
            <SpecSheet rows={useCasesB} />
          </div>
        </div>
      </section>

      <FullSection image="coffee-bible" copyWidth={680}>
        <h2 className="t-h2" data-reveal="" data-contrast="white" style={{ "--stagger": 0 } as CSSProperties}>
          Extend Pastoral Care Beyond Sunday
        </h2>
        <p className="t-body" data-reveal="" data-contrast="white" style={{ "--stagger": 1 } as CSSProperties}>
          Church leaders are facing increasing demand for guidance without additional staff or time. The CommonLife Pilot Program helps extend pastoral care, reduce repetitive workload, and support your congregation throughout the week.
        </p>
        <div className="actions" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
          <LinkButton href="/pilot-application" variant="solid">
            Apply to the Pilot
          </LinkButton>
        </div>
      </FullSection>

      <section className="solid solid-center">
        <h2 className="t-h2" data-reveal="" style={{ "--stagger": 0 } as CSSProperties}>
          Ready to Bring CommonLife to Your Congregation?
        </h2>
        <p className="t-body" data-reveal="" style={{ "--stagger": 1 } as CSSProperties}>
          CommonLife is fully customizable for church networks, multi-campus ministries, and denominations. Integrate it into your digital ecosystem to empower your community’s growth anytime, anywhere.
        </p>
        <div className="actions center" data-reveal="" style={{ "--stagger": 2 } as CSSProperties}>
          <LinkButton href={SCHEDULE_DEMO_URL} variant="solid" external>
            Schedule a Demo
          </LinkButton>
          <LinkButton href="/contact">Contact Us</LinkButton>
        </div>
      </section>
    </SiteFrame>
  );
}
