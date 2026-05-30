import L from "leaflet";
import type { Map, Layer, Circle } from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";

import type { AppStoreType, Project } from "../../types/app";
import {
  fitBounds,
  getMapTiles,
  renderCircleMarker,
  renderGeojsonLayer,
} from "../../lib/map_utils";
import { iNatPlacesUrl, iNatProjectsUrl } from "../../data/inat_data";
import { getPlaceById } from "../../lib/inat_api";

export function renderMap() {
  let map = L.map("map", {
    center: [0, 0],
    zoom: 0,
    maxZoom: 10,
  });

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
      {
        geometry: geometry,
        popupContent: formatProjectDisplay(project, "project-map-popup"),
        color: "green",
      },
      appStore.map,
    );
    fitBounds(layer, appStore.map);

    return layer;
  }
}

export function renderProjectsWithinPlaceOnMap(appStore: AppStoreType) {
  let map = appStore.map;
  if (!map) return;
  let projects = appStore.data.projectsForPlace;
  if (!projects) return;

  let markers: Circle[] = [];
  projects.forEach((project) => {
    let marker = renderCircleMarker(
      {
        latitude: project.latitude,
        longitude: project.longitude,
        color: "red",
      },
      map,
    );
    marker.bindPopup(formatProjectDisplay(project, "project-map-popup"));
    markers.push(marker);
  });

  return markers;
}

function formatProjectDisplay(
  project: Project,
  className: string,
  titleTag = "div",
) {
  return `<div class="${className}">
        <div>
          <${titleTag}><a href="${iNatProjectsUrl}/${project.id}">${project.title}</a></${titleTag}>
          <dl>
            <div>
              <dt>Place:</dt>
              <dd>
                &nbsp;<a href="${iNatPlacesUrl}/${project.place_id}"
                  >${project.place_display_name}</a
                >
              </dd>
            </div>
          </dl>
        </div>
      </div>`;
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

export function renderSelectedProject(
  project: Project,
  componentCtx: HTMLElement,
) {
  let containerEl = componentCtx.querySelector("#projects-list");
  if (!containerEl) return;
  containerEl.innerHTML = "";

  let itemEl = document.createElement("div");
  let content = formatProjectDisplay(project, "project-list-item", "h2");
  itemEl.innerHTML = content;
  containerEl.appendChild(itemEl);
}

export function initFilters(appStore: AppStoreType, componentCtx: any) {
  let optionEl = componentCtx.querySelector(
    `option[value="${appStore.currentYear}"]`,
  );
  if (optionEl) {
    optionEl.selected = true;
  }
}

export function renderSelectedPlaces(appStore: AppStoreType) {
  if (!appStore.selectedPlaces) return;
  if (!appStore.map) return;
  if (!appStore.selectedPlaces.geometry) return;

  // add boundaries of selected place to map
  let layer = renderGeojsonLayer(
    {
      geometry: appStore.selectedPlaces.geometry,
      color: "blue",
      fillOpacity: 0,
    },
    appStore.map,
  );

  // add place to store
  if (layer) {
    appStore.placesMapLayers = layer;
  }

  return layer;
}
