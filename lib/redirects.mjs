/** Permanent move from the legacy About path. */
export function siteRedirects() {
  return [
    {
      source: "/about-commonlife",
      destination: "/about",
      statusCode: 301,
    },
  ];
}
