import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  APP_URL,
  chapterIndexFromProgress,
  chapters,
  footer,
  hero,
  pilot,
  rangeProgress,
  routes,
  storyProgress,
} from "./homepage-c-copy";

const root = path.resolve(import.meta.dirname, "..");

function sourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...sourceFiles(full));
    else if (/\.(tsx|ts|css)$/.test(entry)) files.push(full);
  }
  return files;
}

test("chapter scrub maps the five states and the combined story progress", () => {
  assert.equal(chapterIndexFromProgress(0, 5), 0);
  assert.equal(chapterIndexFromProgress(0.2, 5), 1);
  assert.equal(chapterIndexFromProgress(0.999, 5), 4);
  assert.equal(chapterIndexFromProgress(1, 5), 4);
  assert.equal(storyProgress(1, 150, 0, 400), 150 / 550);
  assert.equal(storyProgress(1, 150, 1, 400), 1);
  assert.equal(rangeProgress(0, 250, 100), 0);
  assert.equal(rangeProgress(-150, 250, 100), 1);
});

test("homepage sources keep approved routes and drop pending copy", () => {
  assert.equal(APP_URL, "https://app.commonlife.ai");
  assert.equal(routes.about, "/about");
  assert.equal(routes.contact, "/contact");
  assert.equal("pilot" in routes, false);
  assert.equal(chapters.length, 5);
  assert.equal(hero.title, "Faith meets technology");
  assert.equal(chapters[1].title, null);
  assert.equal(chapters[2].title, null);
  assert.equal(footer.legal.includes("2025"), false);
  assert.equal(pilot.ministries[0], "Large Churches & Multi-Campus");

  const files = [
    path.join(root, "app/page.tsx"),
    ...sourceFiles(path.join(root, "components/home-c")),
    path.join(root, "lib/homepage-c-copy.ts"),
  ];
  const source = files.map((file) => readFileSync(file, "utf8")).join("\n");
  const forbidden = [
    "Apply for the pilot",
    "Read in many translations",
    "Study and teach",
    "Christian AI platform",
    "Get in touch",
    "© 2025",
    "May 1",
    "Capacity may not be",
    "#070708",
    "#4A6CD4",
    "Cormorant",
    "Cabin",
    "font-heading",
    "brand-berry",
    "lorem ipsum",
    "/commonlife-pilot",
    "CommonLife Pilot",
  ];
  for (const phrase of forbidden) {
    assert.equal(source.includes(phrase), false, phrase);
  }
  assert.equal(source.includes("https://app.commonlife.ai"), true);
});
