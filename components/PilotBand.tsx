import { ButtonLink } from "@/components/Button";

export default function PilotBand({ href }: { href: string }) {
  return (
    <section className="flex flex-col items-center gap-7 rounded-3xl bg-cl-blue px-6 py-8 text-center text-cl-white md:gap-7 md:rounded-[28px] md:p-12 min-[1180px]:gap-8 min-[1180px]:rounded-[32px] min-[1180px]:px-[72px] min-[1180px]:py-16">
      <h2 className="max-w-[900px] font-lora text-[32px] leading-[38px] tracking-[-0.32px] md:text-[42px] md:leading-[50px] min-[1180px]:text-[52px] min-[1180px]:leading-[60px] min-[1180px]:tracking-[-0.52px]">
        Apply to Become a Pilot Church
      </h2>
      <p className="max-w-[720px] font-inter text-base leading-[26px] min-[1180px]:text-[17px] min-[1180px]:leading-7">
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
