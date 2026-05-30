import autoComplete from "@tarekraafat/autocomplete.js";

import type {
  AutoCompleteEventType,
  AppStoreType,
  NormalizedPlace,
} from "../types/app.d.ts";
import { getAutocompletePlaces } from "../lib/inat_api.ts";
import type { iNatSearchAPI } from "../types/inat_api";
import { fitBoundsPlaces, renderGeojsonLayer } from "./map_utils.ts";
import { normalizePlaceResult } from "../components/PageHome/data_utils.ts";

export function setupPlacesSearch(selector: string) {
  const autoCompletePlacesJS = new autoComplete({
    autocomplete: "off",
    selector: selector,
    placeHolder: "Enter place name",
    threshold: 2,
    searchEngine: (_query: string, record: NormalizedPlace) => {
      return renderAutocompletePlace(record);
    },
    data: {
      src: async (query: string) => {
        try {
          let data = await getAutocompletePlaces(query);
          return processAutocompletePlaces(data);
        } catch (error) {
          console.error("setupPlacesSearch ERROR:", error);
        }
      },
    },
    resultsList: {
      maxResults: 50,
    },
    events: {
      input: {
        selection: (event: AutoCompleteEventType) => {
          const selection = event.detail.selection.value as NormalizedPlace;
          autoCompletePlacesJS.input.value = selection.display_name;
        },
      },
    },
  });

  return autoCompletePlacesJS;
}

export function processAutocompletePlaces(
  data: iNatSearchAPI,
): NormalizedPlace[] {
  return data.results.map((item) => {
    return normalizePlaceResult(item.record);
  });
}

export function renderAutocompletePlace(item: NormalizedPlace): string {
  let html = `
  <div class="places-ac-option" data-testid="places-ac-option">
    <div class="place-name">
    ${item.display_name}`;
  if (item.place_type_name) {
    html += ` <span class="place-type">(${item.place_type_name})</span>`;
  }
  html += `
    </div>
  </div>`;

  return html;
}

// called by autocomplete search when an place option is selected
export function placeSelectedHandler(
  selection: NormalizedPlace,
  appStore: AppStoreType,
) {
  let place = selection;
  let map = appStore.map;
  let layer;
  if (!map) {
    return;
  }

  // remove old place layer from map
  if (appStore.placesMapLayers) {
    appStore.placesMapLayers.removeFrom(map);
  }

  // add boundaries of selected place to map
  if (place.geometry) {
    layer = renderGeojsonLayer(
      { geometry: place.geometry, color: "blue", fillOpacity: 0 },
      map,
    );
  }

  // add place to store
  if (layer) {
    appStore.placesMapLayers = layer;
  }
  appStore.selectedPlaces = place;

  // zoom to map to fit all selected places
  fitBoundsPlaces(appStore);
}

export function removePlace(appStore: AppStoreType) {
  appStore.selectedPlaces = undefined;
  appStore.data.projectsForPlace = [];

  if (appStore.map && appStore.placesMapLayers) {
    appStore.placesMapLayers.removeFrom(appStore.map);
  }

  window.dispatchEvent(new Event("placeRemoved"));
}
