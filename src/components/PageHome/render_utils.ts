import L from "leaflet";
import type { Map, Marker, Layer } from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";

import type { AppStoreType, Project } from "../../types/app";
import { getMapTiles } from "../../lib/map_utils";
import { iNatPlacesUrl, iNatProjectsUrl } from "../../data/inat_data";

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

export function renderMarker(lat: number, lon: number, map: Map) {
  return L.marker([lat, lon]).addTo(map);
}

export function renderProjectsOnMap(targetProjects: Project[], map: Map) {
  let markers: Marker[] = [];
  targetProjects.forEach((project) => {
    let marker = renderMarker(project.latitude, project.longitude, map);
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

export function renderProjectsList(
  targetProjects: Project[],
  componentCtx: HTMLElement,
) {
  let containerEl = componentCtx.querySelector("#projects-list");
  if (!containerEl) return;
  containerEl.innerHTML = "";

  targetProjects.forEach((project) => {
    let itemEl = document.createElement("div");
    let content = formatProjectDisplay(project, "project-list-item", "h2");
    itemEl.innerHTML = content;
    containerEl.appendChild(itemEl);
  });
}

export function initFilters(appStore: AppStoreType, componentCtx: any) {
  let optionEl = componentCtx.querySelector(
    `option[value="${appStore.currentYear}"]`,
  );
  if (optionEl) {
    optionEl.selected = true;
  }
}
