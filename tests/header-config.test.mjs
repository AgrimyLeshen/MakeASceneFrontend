import assert from "node:assert/strict";
import test from "node:test";
import { getHeaderConfigForPath } from "../src/components/header/header-config.mjs";

test("returns the page header config only for its matching route", () => {
  const entry = { path: "/myscene", config: { hamburgerContent: { hasUnreadNotifications: true } } };

  assert.equal(getHeaderConfigForPath(entry, "/myscene"), entry.config);
  assert.equal(getHeaderConfigForPath(entry, "/search/events"), null);
});

test("returns null when no page has published header config", () => {
  assert.equal(getHeaderConfigForPath(null, "/myscene"), null);
});
