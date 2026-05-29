// @vitest-environment jsdom

import { vi, expect, test, describe, afterEach } from "vitest";

import { initApp } from "../lib/init_app";
import { defaultStore } from "../lib/store";
import { getAndParseCSV } from "../lib/csv_utils";
import {
  placeDemo,
  placesAPIResponse,
  projectsDemo,
  projectsDemoCleaned,
} from "./fixtures/data";
import { selectRandomProject } from "../components/PageHome/data_utils";
import { getPlaceById } from "../lib/inat_api";

afterEach(() => {
  vi.restoreAllMocks();
});

vi.mock(import("../lib/csv_utils"), () => {
  return { getAndParseCSV: vi.fn() };
});
vi.mock(import("../lib/inat_api"), () => {
  return { getPlaceById: vi.fn() };
});

vi.mock(import("../components/PageHome/data_utils"), async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    selectRandomProject: vi.fn(),
    selectProjectById: vi.fn(originalModule.selectProjectById),
    loadProjectsCsv: vi.fn(originalModule.loadProjectsCsv),
    normalizePlaceResult: vi.fn(originalModule.normalizePlaceResult),
    projectsWithinPlaceHandler: vi.fn(
      originalModule.projectsWithinPlaceHandler,
    ),
  };
});

describe("initApp", () => {
  test("set data.projects and random selectProjects when no search params and home page", async () => {
    let project = projectsDemoCleaned[2];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);
    vi.mocked(selectRandomProject).mockReturnValue(project);

    let store = structuredClone(defaultStore);

    await initApp("", "/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace.length).toBe(0);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toBe(undefined);
    expect(store.currentPage).toStrictEqual("home");
  });

  test("set data.projects and random selectProjects when no search params and about page", async () => {
    let project = projectsDemoCleaned[2];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);
    vi.mocked(selectRandomProject).mockReturnValue(project);

    let store = structuredClone(defaultStore);

    await initApp("", "/about/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace.length).toBe(0);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toBe(undefined);
    expect(store.currentPage).toStrictEqual("about");
  });

  test("set projects using project_id params on home page", async () => {
    let project = projectsDemoCleaned[1];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);

    let store = structuredClone(defaultStore);

    await initApp(`?project_id=${project.id}`, "/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace.length).toBe(0);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toBe(undefined);
    expect(store.currentPage).toStrictEqual("home");
  });

  test("set place and data.projectsForPlace using place_id params on home page", async () => {
    let place = placesAPIResponse.results[0];
    let project = projectsDemoCleaned[2];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);
    vi.mocked(getPlaceById).mockResolvedValue(place);
    vi.mocked(selectRandomProject).mockReturnValue(project);

    let store = structuredClone(defaultStore);

    await initApp(`?place_id=${place}`, "/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace).toStrictEqual([
      projectsDemoCleaned[2],
      projectsDemoCleaned[3],
    ]);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toStrictEqual(placeDemo);
    expect(store.currentPage).toStrictEqual("home");
  });

  test("set project and place using project_id and place_id params on home page", async () => {
    let project = projectsDemoCleaned[3];
    let place = placesAPIResponse.results[0];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);
    vi.mocked(getPlaceById).mockResolvedValue(place);

    let store = structuredClone(defaultStore);

    await initApp(`?project_id=${project.id}&place_id=${place.id}`, "/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace).toStrictEqual([
      projectsDemoCleaned[2],
      projectsDemoCleaned[3],
    ]);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toStrictEqual(placeDemo);
    expect(store.currentPage).toStrictEqual("home");
  });

  test("ignore params and set random project on about page", async () => {
    let project = projectsDemoCleaned[3];
    vi.mocked(getAndParseCSV).mockResolvedValue(projectsDemo);
    vi.mocked(selectRandomProject).mockReturnValue(project);

    let store = structuredClone(defaultStore);

    await initApp("?project_id=10&place_id=10", "/about/", store);

    expect(store.data.projects.length).toBe(4);
    expect(store.data.projectsForPlace.length).toBe(0);
    expect(store.selectedProject).toStrictEqual(project);
    expect(store.selectedPlaces).toBe(undefined);
    expect(store.currentPage).toStrictEqual("about");
  });
});
