import { ButtonLink } from "@/components/Button";

export default function PilotBand({ href }: { href: string }) {
  return (
    <section className="flex flex-col items-center gap-7 rounded-3xl bg-cl-blue px-6 py-8 text-center text-cl-white md:gap-7 md:rounded-[28px] md:p-12 desktop:gap-8 desktop:rounded-[32px] desktop:px-[72px] desktop:py-16">
      <h2 className="max-w-[900px] font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] desktop:text-[52px] desktop:leading-[60px] desktop:tracking-[-0.52px]">
        Apply to Become a Pilot Church
      </h2>
      <p className="max-w-[720px] font-inter text-base leading-[26px] desktop:text-[17px] desktop:leading-7">
        This short application helps us understand your church, your current challenges, and which level of support would be the best fit.
      </p>
      <ButtonLink href={href} variant="onColor">
        Apply to the Pilot
      </ButtonLink>
      <p className="max-w-[600px] font-inter text-base font-semibold leading-[26px]">
        No obligation, and no strings attached! Most applications take less than 2 minutes to complete.
      </p>
    </section>
  );
}
