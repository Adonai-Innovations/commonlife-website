import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-clDeepOcean px-6 py-24 text-clWhite min-[768px]:px-10 min-[1180px]:px-[120px] min-[1180px]:py-36">
      <div className="mx-auto max-w-[760px]">
        <h1 className="font-lora text-[36px] font-medium leading-[44px] min-[768px]:text-[48px] min-[768px]:leading-[56px] min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
          We couldn’t find the page you were looking for.
        </h1>
        <p className="mt-8 text-[17px] leading-7 text-clSky">This is either because:</p>
        <ul className="mt-4 list-disc space-y-3 pl-6 text-[17px] leading-7 text-clSky">
          <li>There is an error in the URL entered into your web browser. Please check the URL and try again.</li>
          <li>The page you are looking for has been moved or deleted.</li>
        </ul>
        <p className="mt-8 text-[17px] leading-7 text-clSky">
          You can return to our homepage by <Link className="text-clWhite underline underline-offset-4" href="/">clicking here</Link>.
        </p>
      </div>
    </main>
  );
}
