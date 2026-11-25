import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { focusRing, shell } from "@/lib/chrome";

export default function NotFound() {
  return (
    <div className="bg-clWhite font-inter text-clDeepOcean">
      <Navbar />
      <main>
        <section className={`${shell} py-20 min-[1180px]:py-32`}>
          <div className="flex max-w-[760px] flex-col gap-6">
            <h1 className="font-lora text-[34px] font-bold leading-[42px] tracking-[-0.015em] min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
              We couldn’t find the page you were looking for.
            </h1>
            <p className="font-inter text-[17px] leading-7">This is either because:</p>
            <ul className="list-disc space-y-3 pl-5 font-inter text-[17px] leading-7">
              <li>There is an error in the URL entered into your web browser. Please check the URL and try again.</li>
              <li>The page you are looking for has been moved or deleted.</li>
            </ul>
            <p className="font-inter text-[17px] leading-7">
              You can return to our homepage by{" "}
              <Link href="/" className={`text-clBlue underline underline-offset-4 ${focusRing}`}>
                clicking here
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
