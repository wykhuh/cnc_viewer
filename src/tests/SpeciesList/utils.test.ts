// @vitest-environment jsdom

import { expect, test, describe } from "vitest";
import { formatNormalizedSpeciesObservation } from "../../components/SpeciesList/utils";
import type {
  ObservationsBasicResult,
  ObservationsSpeciesBasicResult,
} from "../../types/inat_api";
import type { NormalizedSpeciesObservation } from "../../types/app";

describe("formatNormalizedSpeciesObservation", () => {
  let taxon: ObservationsSpeciesBasicResult = {
    count: 1,
    taxon: {
      id: 1,
      name: "name",
      default_photo: {
        id: 10,
        url: "https://image.com",
        attribution: "attribution",
        license_code: "cc-by-nc",
      },
      preferred_common_name: "common name",
      rank: "species",
    },
  };

  let ccPhoto = {
    id: 20,
    url: "https://image.com",
    attribution: "attribution",
    license_code: "cc-by-nc",
  };

  let allRightsReservedPhoto = {
    id: 21,
    url: "https://image.com",
    attribution: "attribution",
    license_code: null,
  };

  let ndPhoto = {
    id: 22,
    url: "https://image.com",
    attribution: "attribution",
    license_code: "cc-by-nd",
  };

  let ccObservation = {
    uuid: "uuid",
    id: 100,
    user: { id: 200, login: "login" },
    place_guess: "place guess",
    observed_on: "2026-01-01",
    time_observed_at: "2026-01-01T12:00:0001:00",
    quality_grade: "research",
    license_code: "cc-by-nc",
    taxon: {
      id: 1,
      name: "name",
      preferred_common_name: "common name",
      rank: "species",
    },
    photos: [ccPhoto],
  };

  let allRightsReservedObservation = {
    uuid: "uuid",
    id: 101,
    user: { id: 200, login: "login" },
    place_guess: "place guess",
    observed_on: "2026-01-01",
    time_observed_at: "2026-01-01T12:00:0001:00",
    quality_grade: "research",
    license_code: null,
    taxon: {
      id: 1,
      name: "name",
      preferred_common_name: "common name",
      rank: "species",
    },
    photos: [allRightsReservedPhoto],
  };

  let ndObservation = {
    uuid: "uuid",
    id: 102,
    user: { id: 200, login: "login" },
    place_guess: "place guess",
    observed_on: "2026-01-01",
    time_observed_at: "2026-01-01T12:00:0001:00",
    quality_grade: "research",
    license_code: "cc-by-nd",
    taxon: {
      id: 1,
      name: "name",
      preferred_common_name: "common name",
      rank: "species",
    },
    photos: [ndPhoto],
  };

  let expectedResult: NormalizedSpeciesObservation = {
    count: 1,
    id: 0,
    license_code: undefined,
    observed_on: "2026-01-01",
    photos: [
      {
        attribution: "attribution",
        id: 0,
        license_code: undefined,
        url: "https://image.com",
      },
    ],
    place_guess: "place guess",
    quality_grade: "research",
    taxon: {
      default_photo: {
        attribution: "attribution",
        id: 10,
        license_code: "cc-by-nc",
        url: "https://image.com",
      },
      id: 1,
      name: "name",
      preferred_common_name: "common name",
      rank: "species",
    },
    time_observed_at: "2026-01-01T12:00:0001:00",
    user: {
      id: 200,
      login: "login",
    },
  };

  test("converts taxon into species observation", () => {
    let observations: ObservationsBasicResult[] = [];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected: NormalizedSpeciesObservation = {
      count: 1,
      taxon: {
        default_photo: {
          attribution: "attribution",
          id: 10,
          license_code: "cc-by-nc",
          url: "https://image.com",
        },
        id: 1,
        name: "name",
        preferred_common_name: "common name",
        rank: "species",
      },
    };
    expect(results).toStrictEqual(expected);
  });

  test("converts taxon and observation into species observation", () => {
    let observations: ObservationsBasicResult[] = [ccObservation];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected: NormalizedSpeciesObservation = {
      count: 1,
      id: 100,
      license_code: "cc-by-nc",
      observed_on: "2026-01-01",
      photos: [
        {
          attribution: "attribution",
          id: 20,
          license_code: "cc-by-nc",
          url: "https://image.com",
        },
      ],
      place_guess: "place guess",
      quality_grade: "research",
      taxon: {
        default_photo: {
          attribution: "attribution",
          id: 10,
          license_code: "cc-by-nc",
          url: "https://image.com",
        },
        id: 1,
        name: "name",
        preferred_common_name: "common name",
        rank: "species",
      },
      time_observed_at: "2026-01-01T12:00:0001:00",
      user: {
        id: 200,
        login: "login",
      },
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with allowed CC license if observation with allowed CC license exists", () => {
    let observations: ObservationsBasicResult[] = [
      ndObservation,
      allRightsReservedObservation,
      ccObservation,
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ccObservation.id,
      license_code: ccObservation.license_code,
      photos: [ccPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with all rights reserved if observation with allowed CC license does not exists", () => {
    let observations: ObservationsBasicResult[] = [
      allRightsReservedObservation,
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: allRightsReservedObservation.id,
      license_code: allRightsReservedObservation.license_code,
      photos: [allRightsReservedPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with ND if observation with allowed CC license does not exists", () => {
    let observations: ObservationsBasicResult[] = [ndObservation];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ndObservation.id,
      license_code: ndObservation.license_code,
      photos: [ndPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select photo with cc license if photo with allowed CC license does exists", () => {
    let observations: ObservationsBasicResult[] = [
      { ...ndObservation, photos: [ndPhoto, allRightsReservedPhoto, ccPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ndObservation.id,
      license_code: ndObservation.license_code,
      photos: [ccPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select photo with all rights reserved if photo with allowed CC license does not exists", () => {
    let observations: ObservationsBasicResult[] = [
      { ...ndObservation, photos: [allRightsReservedPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ndObservation.id,
      license_code: ndObservation.license_code,
      photos: [allRightsReservedPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select photo with ND if photo with allowed CC license does not exists", () => {
    let observations: ObservationsBasicResult[] = [
      { ...allRightsReservedObservation, photos: [ndPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: allRightsReservedObservation.id,
      license_code: allRightsReservedObservation.license_code,
      photos: [ndPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with allowed observation and photo CC license", () => {
    let observations: ObservationsBasicResult[] = [
      { ...ccObservation, photos: [ndPhoto] },
      { ...ccObservation, photos: [allRightsReservedPhoto] },
      { ...ccObservation, photos: [ccPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ccObservation.id,
      license_code: ccObservation.license_code,
      photos: [ccPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with allowed photo CC license", () => {
    let observations: ObservationsBasicResult[] = [
      { ...ccObservation, photos: [ndPhoto] },
      { ...ccObservation, photos: [allRightsReservedPhoto] },
      { ...ndObservation, photos: [ccPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ndObservation.id,
      license_code: ndObservation.license_code,
      photos: [ccPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select observation with allowed observation CC license", () => {
    let observations: ObservationsBasicResult[] = [
      { ...allRightsReservedObservation, photos: [ndPhoto] },
      { ...ndObservation, photos: [allRightsReservedPhoto] },
      { ...ccObservation, photos: [ndPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: ccObservation.id,
      license_code: ccObservation.license_code,
      photos: [ndPhoto],
    };
    expect(results).toStrictEqual(expected);
  });

  test("select first observation with invalid observation & photo CC license", () => {
    let observations: ObservationsBasicResult[] = [
      { ...allRightsReservedObservation, photos: [ndPhoto] },
      { ...ndObservation, photos: [allRightsReservedPhoto] },
    ];

    let results = formatNormalizedSpeciesObservation(taxon, observations);

    let expected = {
      ...expectedResult,
      id: allRightsReservedObservation.id,
      license_code: allRightsReservedObservation.license_code,
      photos: [ndPhoto],
    };
    expect(results).toStrictEqual(expected);
  });
});
