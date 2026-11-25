import type { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SiteShell({ children, padded = true }: { children: ReactNode; padded?: boolean }) {
  return (
    <div className="min-h-screen bg-cl-paper text-cl-deep-ocean">
      <Header />
      {padded ? (
        <main className="flex flex-col gap-3 px-3 pb-6 pt-1 md:gap-4 md:px-6 md:pb-8 md:pt-2 min-[1180px]:gap-6 min-[1180px]:px-12 min-[1180px]:pb-12 min-[1180px]:pt-2">
          {children}
        </main>
      ) : (
        <main>{children}</main>
      )}
      <Footer />
    </div>
  );
}
