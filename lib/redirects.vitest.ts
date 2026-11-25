import { describe, expect, it } from "vitest";

import nextConfig from "../next.config.mjs";
import { siteRedirects } from "./redirects.mjs";

describe("about-commonlife redirect", () => {
  it("is a 301 to /about in the redirect table", () => {
    expect(siteRedirects()).toEqual([
      { source: "/about-commonlife", destination: "/about", statusCode: 301 },
    ]);
  });

  it("is the redirect Next will serve", async () => {
    if (!nextConfig.redirects) throw new Error("redirects missing");
    const redirects = await nextConfig.redirects();
    expect(redirects).toContainEqual({
      source: "/about-commonlife",
      destination: "/about",
      statusCode: 301,
    });
  });
});
