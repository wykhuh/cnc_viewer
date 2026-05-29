import { expect, test, describe } from "vitest";
import { decodeAppUrl, formatAppParams } from "../lib/url_utils";
import { defaultStore } from "../lib/store";
import { placeDemo, projectDemo } from "./fixtures/data";

describe("decodeAppUrl", () => {
  test("returns empty object if no search params", () => {
    let results = decodeAppUrl("", "/");

    expect(results).toStrictEqual({});
  });

  test("returns string project_id if for project_id search params", () => {
    let results = decodeAppUrl("?project_id=abc", "/");

    expect(results).toStrictEqual({ project_id: "abc" });
  });

  test("returns number project_id for project_id search params", () => {
    let results = decodeAppUrl("?project_id=123", "/");

    expect(results).toStrictEqual({ project_id: "123" });
  });

  test("returns number place_id for place_id search params", () => {
    let results = decodeAppUrl("?place_id=123", "/");

    expect(results).toStrictEqual({ place_id: "123" });
  });

  test("ignores invalid search params", () => {
    let results = decodeAppUrl("?foo=1", "/");

    expect(results).toStrictEqual({});
  });

  test("ignore search params on about page", () => {
    let results = decodeAppUrl("?project_id=abc&place_id=456", "/about/");

    expect(results).toStrictEqual({});
  });
});

describe("formatAppParams", () => {
  test("return empty string for default store", () => {
    let store = structuredClone(defaultStore);

    let result = formatAppParams(store);

    expect(result).toBe("");
  });

  test("returns project_id if store has project", () => {
    let store = structuredClone(defaultStore);
    store.selectedProject = projectDemo;

    let result = formatAppParams(store);

    expect(result).toBe(`project_id=${projectDemo.slug}`);
  });

  test("returns place_id if store has place", () => {
    let store = structuredClone(defaultStore);
    store.selectedPlaces = placeDemo;

    let result = formatAppParams(store);

    expect(result).toBe(`place_id=${placeDemo.id}`);
  });

  test("returns undefined if page is about", () => {
    let store = structuredClone(defaultStore);
    store.currentPage = "about";
    store.selectedProject = projectDemo;

    let result = formatAppParams(store);

    expect(result).toBe(undefined);
  });
});
