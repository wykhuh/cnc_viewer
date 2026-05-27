import { expect, test, describe } from "vitest";
import { decodeAppUrl } from "../lib/url_utils";

describe("decodeAppUrl", () => {
  test("returns empty object if no search params", () => {
    let results = decodeAppUrl("");

    expect(results).toStrictEqual({});
  });

  test("returns string project_id if for project_id search params", () => {
    let results = decodeAppUrl("?project_id=abc");

    expect(results).toStrictEqual({ project_id: "abc" });
  });

  test("returns number project_id for project_id search params", () => {
    let results = decodeAppUrl("?project_id=123");

    expect(results).toStrictEqual({ project_id: "123" });
  });

  test("ignores invalid search params", () => {
    let results = decodeAppUrl("?foo=1");

    expect(results).toStrictEqual({});
  });
});
