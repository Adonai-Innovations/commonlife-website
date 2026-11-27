import SiteShell from "@/components/SiteShell";
import { SCHEDULE_DEMO_URL } from "@/lib/links";
import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    description: "Perfect for small churches and home groups getting started with biblical AI.",
    features: [
      "Up to 500 monthly active users",
      "CommonLife web app access",
      "Biblically verified AI chat",
      "Basic lesson & study creator",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Church",
    price: "$599",
    period: "/mo",
    description: "Designed for growing churches that want full platform access and deeper insights.",
    features: [
      "Up to 5,000 monthly active users",
      "Everything in Starter",
      "Website embed widget",
      "Community data insights dashboard",
      "Education & classroom mode",
      "Priority email & chat support",
      "Custom branding",
    ],
    cta: "Schedule a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "For multi-campus churches, denominations, and institutions with complex needs.",
    features: [
      "Unlimited users",
      "Everything in Church",
      "SSO & directory integration",
      "Dedicated success manager",
      "SLA guarantee",
      "Custom AI model tuning",
      "On-premise deployment option",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Are the pricing tiers confirmed?",
    a: "Pricing shown is indicative and subject to change. Contact us to get a confirmed quote for your organization.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — we offer a 30-day free pilot for qualified churches. No credit card required to start.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit cards and ACH bank transfer for annual plans. Enterprise customers can pay by invoice.",
  },
  {
    q: "Do you offer nonprofit or ministry discounts?",
    a: "Yes. Registered 501(c)(3) organizations and accredited ministry schools may qualify for additional discounts. Contact us to apply.",
  },
];

export const metadata = {
  title: "Pricing — CommonLife",
  description:
    "Simple, transparent pricing for churches, schools, and families. Start with a 30-day free pilot.",
};

export default function PricingPage() {
  return (
    <SiteShell>
      <main>
        {/* Hero */}
        <section
          className="bg-cl-deep-ocean text-white px-5 md:px-20 pt-24 pb-20 text-center"
          aria-labelledby="pricing-hero-heading"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-cl-blue text-xs font-lora font-semibold tracking-widest uppercase mb-4">
              Pricing
            </p>
            <h1
              id="pricing-hero-heading"
              className="font-lora font-bold text-4xl md:text-6xl leading-tight md:leading-none mb-6"
            >
              Simple, Faithful Pricing
            </h1>
            <p className="text-cl-sky text-lg md:text-xl">
              No hidden fees. Cancel anytime. Start with a 30-day free pilot and only pay when
              you&rsquo;re ready.
            </p>
          </div>
        </section>

        {/* Pricing tiers */}
        <section
          className="bg-cl-paper px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="tiers-heading"
        >
          <div className="max-w-[1440px] mx-auto">
            <h2 id="tiers-heading" className="sr-only">
              Pricing tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {tiers.map((tier) => (
                <article
                  key={tier.name}
                  className={`rounded-2xl p-8 flex flex-col ${
                    tier.highlighted
                      ? "bg-cl-deep-ocean text-white ring-2 ring-cl-blue"
                      : "bg-white text-cl-deep-ocean"
                  }`}
                >
                  <div className="mb-6">
                    {tier.highlighted && (
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-cl-blue text-white text-xs font-lora font-semibold mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3
                      className={`font-lora font-bold text-xl mb-2 ${
                        tier.highlighted ? "text-white" : "text-cl-deep-ocean"
                      }`}
                    >
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span
                        className={`font-lora font-bold text-5xl ${
                          tier.highlighted ? "text-white" : "text-cl-deep-ocean"
                        }`}
                      >
                        {tier.price}
                      </span>
                      {tier.period && (
                        <span
                          className={`text-sm ${
                            tier.highlighted ? "text-cl-sky" : "text-cl-deep-ocean/60"
                          }`}
                        >
                          {tier.period}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        tier.highlighted ? "text-cl-sky" : "text-cl-deep-ocean/70"
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-sm ${
                          tier.highlighted ? "text-cl-sky" : "text-cl-deep-ocean/80"
                        }`}
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 ${
                            tier.highlighted
                              ? "bg-cl-blue/30 text-white"
                              : "bg-cl-blue/20 text-cl-blue"
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.cta === "Schedule a Demo" ? SCHEDULE_DEMO_URL : "/contact"}
                    className={`inline-flex justify-center items-center px-6 py-3.5 rounded font-lora font-semibold text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      tier.highlighted
                        ? "bg-cl-blue text-white hover:bg-cl-blue/90 focus-visible:outline-white"
                        : "bg-cl-deep-ocean text-white hover:bg-cl-deep-oceanDark focus-visible:outline-cl-blue"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </article>
              ))}
            </div>

            <p className="text-center text-cl-deep-ocean/50 text-xs mt-8">
              * Pricing shown is indicative. Contact us for confirmed quotes and nonprofit discounts.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="bg-white px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="pricing-faq-heading"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-cl-blue text-xs font-lora font-semibold tracking-widest uppercase text-center mb-4">
              FAQ
            </p>
            <h2
              id="pricing-faq-heading"
              className="font-lora font-bold text-3xl md:text-4xl text-cl-deep-ocean text-center mb-16"
            >
              Pricing Questions
            </h2>

            <dl className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border border-cl-paper rounded-xl p-7">
                  <dt className="font-lora font-bold text-base text-cl-deep-ocean mb-3">
                    {faq.q}
                  </dt>
                  <dd className="text-cl-deep-ocean/70 text-sm leading-relaxed">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section
          className="bg-cl-deep-ocean text-white px-5 md:px-20 py-24 text-center"
          aria-labelledby="pricing-cta-heading"
        >
          <div className="max-w-xl mx-auto">
            <h2
              id="pricing-cta-heading"
              className="font-lora font-bold text-3xl md:text-4xl mb-6"
            >
              Ready to Get Started?
            </h2>
            <p className="text-cl-sky text-lg mb-10">
              Schedule a 30-minute demo and we&rsquo;ll set up your free pilot on the same call.
            </p>
            <Link
              href={SCHEDULE_DEMO_URL}
              className="inline-flex justify-center items-center px-8 py-4 rounded bg-cl-blue text-white font-lora font-semibold hover:bg-cl-blue/90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Schedule a Demo
            </Link>
          </div>
        </section>
      </main>

    </SiteShell>
  );
}
