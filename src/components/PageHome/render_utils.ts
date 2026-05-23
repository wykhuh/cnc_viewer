import L from "leaflet";
import type { Feature, GeoJsonObject } from "geojson";

import type { Project } from "../../types/app";
import { addLayerToMap, getMapTiles } from "../../lib/map_utils";

export function renderMap() {
  let map = L.map("map", {
    center: [0, 0],
    zoom: 2,
    maxZoom: 19,
  });

  const layerControl = L.control
    .layers(undefined, undefined, { collapsed: true })
    .addTo(map);

  // add basemaps
  let { OpenStreetMap, OpenTopo } = getMapTiles();
  addLayerToMap(OpenStreetMap, map, layerControl, true);
  addLayerToMap(OpenTopo, map, layerControl);

  return map;
}

export function renderLatLine(latitudeValue: number, map: L.Map) {
  let factor = latitudeValue > 0 ? 1 : -1;
  return L.polygon([
    [latitudeValue, -180],
    [latitudeValue, 180],
    [latitudeValue + factor, 180],
    [latitudeValue + factor, -180],
  ]).addTo(map);
}

export function renderMarker(lat: number, lon: number, map: L.Map) {
  return L.marker([lat, lon]).addTo(map);
}

export function renderProjectsOnMap(targetProjects: Project[], map: L.Map) {
  let markers: L.Marker[] = [];
  targetProjects.forEach((project) => {
    let marker = renderMarker(project.latitude, project.longitude, map);
    markers.push(marker);
  });
  return markers;
}

export function renderEcoregions(ecoregions: GeoJsonObject, map: L.Map) {
  function onEachFeature(feature: Feature, layer: L.Layer) {
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

  let listEl = document.createElement("ul");
  targetProjects.forEach((project) => {
    let itemEl = document.createElement("li");
    itemEl.innerText = `${project.place_name}- ${project.latitude}`;
    listEl.appendChild(itemEl);
  });
  containerEl.appendChild(listEl);
}
