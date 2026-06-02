import L from "leaflet";
import type { Map, Layer, Marker } from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";

import type { AppStoreType, Project } from "../../types/app";
import {
  fitBounds,
  getMapTiles,
  renderGeojsonLayer,
  renderMarker,
} from "../../lib/map_utils";
import { iNatProjectsUrl } from "../../data/inat_data";
import { getPlaceById } from "../../lib/inat_api";
// import leaflet markers so that markers are included in vite build
// https://github.com/vitejs/vite-plugin-vue/discussions/104
// https://cescobaz.com/2023/06/14/setup-leaflet-with-svelte-and-vite/
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

export function renderMap() {
  let map = L.map("map", {
    center: [0, 0],
    zoom: 0,
  });
  map.zoomControl.setPosition("bottomright");
  L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
  L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
  L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
  // necessary to avoid Leaflet adds some prefix to image path.
  L.Icon.Default.imagePath = "";

  // add basemaps
  let { OpenStreetMap } = getMapTiles();
  L.tileLayer(OpenStreetMap.url, OpenStreetMap.options).addTo(map);

  return map;
}

export function renderLatLine(latitudeValue: number, map: Map) {
  let factor = latitudeValue > 0 ? 1 : -1;
  return L.polygon([
    [latitudeValue, -180],
    [latitudeValue, 180],
    [latitudeValue + factor, 180],
    [latitudeValue + factor, -180],
  ]).addTo(map);
}

export async function renderProjectOnMap(appStore: AppStoreType) {
  if (!appStore.map) return;
  let project = appStore.selectedProject;
  if (!project) return;

  let geometry;
  // if project has geometry
  if (project.place_geometry) {
    geometry = project.place_geometry;
    // else fetch geometry for place
  } else {
    let placeData = await getPlaceById(project.place_uuid);
    if (!placeData) return;

    geometry = placeData.geometry_geojson;

    // add geometry to project
    project.place_geometry = placeData.geometry_geojson;
    // add geometry to data.projects
    let dataProject = appStore.data.projects.find((p) => p.id === project.id);
    if (dataProject) {
      dataProject.place_geometry = placeData.geometry_geojson;
    }
  }

  if (geometry) {
    let layer = renderGeojsonLayer(
      { geometry: geometry, color: "green" },
      appStore.map,
    );
    layer.bindPopup(formatProjectMapPopup(project, false), {
      maxWidth: 200,
    });
    fitBounds(layer, appStore.map);

    return layer;
  }
}

export function renderProjectsWithinPlaceOnMap(appStore: AppStoreType) {
  let map = appStore.map;
  if (!map) return;
  let projects = appStore.data.projectsForPlace;
  if (!projects) return;

  let markers: Marker[] = [];
  projects
    // don't draw circle marker for selected project
    .filter((p) => p.id !== appStore.selectedProject?.id)
    .forEach((project) => {
      let marker = renderMarker(
        {
          latitude: project.latitude,
          longitude: project.longitude,
        },
        map,
      );
      marker.bindPopup(formatProjectMapPopup(project, true), {
        maxWidth: 200,
      });
      markers.push(marker);
    });

  return markers;
}

function formatProjectMapPopup(project: Project, includeButton = false) {
  let container = document.createElement("div");
  container.className = "project-map-popup";

  let content = `<div><a href="${iNatProjectsUrl}/${project.id}">${project.title}</a></div>`;
  content += `<div>${project.place_display_name}</div>`;
  container.innerHTML = content;

  if (includeButton) {
    let button = document.createElement("button");
    button.textContent = "Select this project";
    button.className = "btn-primary";
    button.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("loadThisProject", {
          detail: {
            project_id: project.id,
          },
        }),
      );
    });
    container.append(button);
  }

  return container;
}

export function renderSelectedResources(
  appStore: AppStoreType,
  componentCtx: HTMLElement,
) {
  let containerEl = componentCtx.querySelector("#selected-resources-list");
  if (!containerEl) return;
  containerEl.innerHTML = "";

  if (appStore.selectedProject) {
    let component = document.createElement("selected-project");
    containerEl.appendChild(component);
  }

  if (appStore.selectedPlaces) {
    let component = document.createElement("selected-place");
    containerEl.appendChild(component);
  }
}

export function renderEcoregions(ecoregions: GeoJsonObject, map: Map) {
  function onEachFeature(feature: Feature, layer: Layer) {
    if (feature.properties && feature.properties.Bioregions) {
      layer.bindPopup(feature.properties.Bioregions);
    }
  }

  L.geoJSON(ecoregions, {
    onEachFeature: onEachFeature,
  }).addTo(map);
}

export function initFilters(appStore: AppStoreType, componentCtx: any) {
  let optionEl = componentCtx.querySelector(
    `option[value="${appStore.currentYear}"]`,
  );
  if (optionEl) {
    optionEl.selected = true;
  }
}

export function renderPlaceOnMap(appStore: AppStoreType) {
  if (!appStore.selectedPlaces) return;
  if (!appStore.map) return;
  if (!appStore.selectedPlaces.geometry) return;

  // add boundaries of selected place to map
  let layer = renderGeojsonLayer(
    {
      geometry: appStore.selectedPlaces.geometry,
      color: "blue",
      fillOpacity: 0,
      interactive: false,
    },
    appStore.map,
  );

  // add place to store
  if (layer) {
    appStore.placesMapLayers = layer;
  }

  return layer;
}
