import { ButtonLink } from "@/components/Button";

export default function PilotBand({ href }: { href: string }) {
  return (
    <section data-reveal className="bg-cl-deep-ocean text-cl-white">
      <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-5 py-16 md:px-6 md:py-20 desktop:py-24">
        <h2 data-reveal-item className="f-h2">
          Apply to Become a Pilot Church
        </h2>
        <p data-reveal-item className="f-body text-cl-sky">
          This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
        </p>
        <div data-reveal-item>
          <ButtonLink href={href} variant="on-color">
            Apply to the Pilot
          </ButtonLink>
        </div>
        <p data-reveal-item className="font-inter text-[15px] leading-6 text-cl-sky">
          No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
        </p>
      </div>
    </section>
  );
}
