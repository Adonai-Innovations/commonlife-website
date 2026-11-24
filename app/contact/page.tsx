"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT_ERRORS, CONTACT_LIMITS } from "@/lib/contact-fields";

const inquiryTypes = [
  { id: "demo", label: "Schedule a Demo" },
  { id: "pricing", label: "Pricing & Plans" },
  { id: "pilot", label: "Free Pilot" },
  { id: "partnership", label: "Partnership" },
  { id: "support", label: "Support" },
  { id: "other", label: "Other" },
];

const KNOWN_ERRORS = new Set<string>(Object.values(CONTACT_ERRORS));

function messageFromResponse(data: unknown): string {
  if (!data || typeof data !== "object" || !("error" in data)) return CONTACT_ERRORS.delivery;
  const error = (data as { error?: unknown }).error;
  return typeof error === "string" && KNOWN_ERRORS.has(error) ? error : CONTACT_ERRORS.delivery;
}

export default function ContactPage() {
  const [selectedInquiry, setSelectedInquiry] = useState("demo");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          inquiry: selectedInquiry,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          organization: form.organization,
          role: form.role,
          message: form.message,
          cl_hp: honeypot,
        }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        setError(messageFromResponse(data));
        return;
      }
      setSubmitted(true);
    } catch {
      setError(CONTACT_ERRORS.delivery);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="bg-brand-navy text-white px-5 md:px-20 pt-24 pb-20 text-center"
          aria-labelledby="contact-hero-heading"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-brand-berry text-xs font-heading font-semibold tracking-widest uppercase mb-4">
              Contact
            </p>
            <h1
              id="contact-hero-heading"
              className="font-heading font-bold text-4xl md:text-6xl leading-tight md:leading-none mb-6"
            >
              Let&rsquo;s Talk
            </h1>
            <p className="text-brand-lightBerry text-lg md:text-xl">
              Tell us about your church, school, or organization and we&rsquo;ll get back to you
              within one business day.
            </p>
          </div>
        </section>

        {/* Contact form + sidebar */}
        <section
          className="bg-brand-offWhite px-5 md:px-20 py-20 md:py-28"
          aria-labelledby="contact-form-heading"
        >
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2
                id="contact-form-heading"
                className="font-heading font-bold text-2xl text-brand-navy mb-8"
              >
                Send Us a Message
              </h2>

              {/* Inquiry type chips */}
              <div className="mb-8" role="group" aria-label="Inquiry type">
                <p className="text-sm font-heading font-semibold text-brand-navy mb-3">
                  What can we help with?
                </p>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedInquiry(t.id)}
                      className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-berry focus-visible:outline-offset-2 ${
                        selectedInquiry === t.id
                          ? "bg-brand-berry text-white"
                          : "bg-white text-brand-navy border border-brand-offWhite hover:border-brand-berry/30"
                      }`}
                      aria-pressed={selectedInquiry === t.id}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div
                  className="bg-white rounded-xl p-10 text-center"
                  role="alert"
                  aria-live="polite"
                >
                  <span className="text-5xl block mb-4" aria-hidden="true">
                    🙏
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-brand-navy mb-3">
                    Message Received!
                  </h3>
                  <p className="text-brand-navy/70">
                    Thank you for reaching out. Our team will respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 space-y-6 relative">
                  <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="cl_hp">Leave this field empty</label>
                    <input
                      id="cl_hp"
                      name="cl_hp"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  {/* Tailwind 4 space-y ignores this absolute honeypot, so keep the previous 1.5rem gap. */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                      >
                        First Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        maxLength={CONTACT_LIMITS.firstName}
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                      >
                        Last Name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        maxLength={CONTACT_LIMITS.lastName}
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                    >
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={CONTACT_LIMITS.email}
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent"
                      placeholder="pastor@yourchurch.org"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                    >
                      Organization <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      required
                      maxLength={CONTACT_LIMITS.organization}
                      autoComplete="organization"
                      value={form.organization}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent"
                      placeholder="First Baptist Church"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                    >
                      Your Role
                    </label>
                    <input
                      id="role"
                      name="role"
                      type="text"
                      maxLength={CONTACT_LIMITS.role}
                      autoComplete="organization-title"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent"
                      placeholder="Lead Pastor, Tech Director, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-heading font-semibold text-brand-navy mb-2"
                    >
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      maxLength={CONTACT_LIMITS.message}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-brand-offWhite px-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-hidden focus:ring-2 focus:ring-brand-berry focus:border-transparent resize-none"
                      placeholder="Tell us about your church and what you're looking for..."
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-brand-berry" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="w-full inline-flex justify-center items-center px-8 py-4 rounded bg-brand-berry text-white font-heading font-semibold hover:bg-brand-berry/90 transition-colors focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2 disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6" aria-label="What happens next">
              <div className="bg-white rounded-xl p-7">
                <h3 className="font-heading font-bold text-lg text-brand-navy mb-5">
                  What happens next?
                </h3>
                <ol className="space-y-5">
                  {[
                    {
                      step: "1",
                      title: "We review your message",
                      body: "Our team reads every submission personally — usually within a few hours.",
                    },
                    {
                      step: "2",
                      title: "You get a personal reply",
                      body: "A CommonLife team member will reach out within one business day to schedule a call.",
                    },
                    {
                      step: "3",
                      title: "We set up your pilot",
                      body: "On the demo call we can activate your 30-day free pilot on the spot.",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <div
                        className="shrink-0 w-7 h-7 rounded-full bg-brand-berry text-white flex items-center justify-center text-xs font-heading font-bold"
                        aria-hidden="true"
                      >
                        {item.step}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-brand-navy mb-1">
                          {item.title}
                        </p>
                        <p className="text-brand-navy/60 text-xs leading-relaxed">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-brand-navy text-white rounded-xl p-7">
                <h3 className="font-heading font-bold text-base mb-3">
                  Need help right away?
                </h3>
                <p className="text-brand-lightBerry text-sm mb-4">
                  Email us directly and we&rsquo;ll respond within 4 business hours.
                </p>
                <a
                  href="mailto:hello@commonlife.ai"
                  className="text-white underline underline-offset-2 text-sm hover:text-brand-lightBerry transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
                >
                  hello@commonlife.ai
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
