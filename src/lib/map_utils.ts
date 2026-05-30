import L from "leaflet";
import type { GeoJSON, Map } from "leaflet";

import { loggerUrl } from "./logger.ts";
import type {
  AppStoreType,
  CircleSettings,
  GeoJSONSettings,
  MarkerSettings,
  ObservationTilesSettingType,
} from "../types/app";

export function getMapTiles(): {
  [name: string]: ObservationTilesSettingType;
} {
  return {
    OpenStreetMap: {
      name: "Open Street Map",
      type: "basemap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      options: {
        layer_description: "basemap: Open Street Map",
        control_name: "Open Street Map",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
        minZoom: 0,
        maxZoom: 19,
      },
    },
    AlidadeSmooth: {
      name: "Alidade Smooth",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
      options: {
        layer_description: "basemap: Alidade Smooth",
        control_name: "Alidade Smooth",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 20,
      },
    },
    AlidadeSmoothDark: {
      name: "Alidade Smooth Dark",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      options: {
        layer_description: "basemap: Alidade Smooth Dark",
        control_name: "Alidade Smooth Dark",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 20,
      },
    },
    StadiaOutdoors: {
      name: "Stadia Outdoors",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
      options: {
        layer_description: "basemap: Stadia Outdoors",
        control_name: "Stadia Outdoors",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 20,
      },
    },
    StamenTerrain: {
      name: "Stamen Terrain",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",
      options: {
        layer_description: "basemap: Stamen Terrain",
        control_name: "Stamen Terrain",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 20,
      },
    },
    StamenWatercolor: {
      name: "Stamen Watercolor",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
      options: {
        layer_description: "basemap: Stamen Watercolor",
        control_name: "Stamen Watercolor",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 16,
      },
    },
    OSMBright: {
      name: "OSM Bright",
      type: "basemap",
      url: "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.jpg",
      options: {
        layer_description: "basemap: OSM Bright",
        control_name: "OSM Bright",
        layer_type: "basemap",
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        minZoom: 0,
        maxZoom: 20,
      },
    },

    USGSTopo: {
      name: "USGS Topo",
      type: "basemap",
      url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
      options: {
        layer_description: "basemap: USGS Topo",
        control_name: "USGS Topo",
        layer_type: "basemap",
        attribution:
          'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
        minZoom: 0,
        maxZoom: 16,
      },
    },
    USGSImagery: {
      name: "USGS Imagery",
      type: "basemap",
      url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
      options: {
        layer_description: "basemap: USGS Imagery",
        control_name: "USGS Imagery",
        layer_type: "basemap",
        attribution:
          'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>',
        minZoom: 0,
        maxZoom: 16,
      },
    },
    OpenTopo: {
      name: "Open Topo",
      type: "basemap",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      options: {
        layer_description: "basemap: Open Topo",
        control_name: "Open Topo",
        layer_type: "basemap",
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        minZoom: 0,
        maxZoom: 17,
      },
    },
    GBIFClassic: {
      name: "GBIF Classic",
      type: "basemap",
      url: "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=gbif-classic",
      options: {
        layer_description: "basemap: GBIF Classic",
        control_name: "GBIF Classic",
        layer_type: "basemap",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://www.openmaptiles.org/copyright">OpenMapTiles</a>.',
        minZoom: 0,
        maxZoom: 21,
      },
    },
    GBIFLight: {
      name: "GBIF Light",
      type: "basemap",
      url: "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=gbif-light",
      options: {
        layer_description: "basemap: GBIF light",
        control_name: "GBIF Light",
        layer_type: "basemap",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://www.openmaptiles.org/copyright">OpenMapTiles</a>.',
        minZoom: 0,
        maxZoom: 21,
      },
    },
    GBIFGeyser: {
      name: "GBIF Geyser",
      type: "basemap",
      url: "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=gbif-geyser",
      options: {
        layer_description: "basemap: GBIF Geyser",
        control_name: "GBIF Geyser",
        layer_type: "basemap",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://www.openmaptiles.org/copyright">OpenMapTiles</a>.',
        minZoom: 0,
        maxZoom: 21,
      },
    },
    GBIFBright: {
      name: "GBIF Bright",
      type: "basemap",
      url: "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=osm-bright",
      options: {
        layer_description: "basemap: GBIF Bright",
        control_name: "GBIF Bright",
        layer_type: "basemap",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://www.openmaptiles.org/copyright">OpenMapTiles</a>.',
        minZoom: 0,
        maxZoom: 21,
      },
    },
    GBIFNatural: {
      name: "GBIF Natural",
      type: "basemap",
      url: "https://tile.gbif.org/3857/omt/{z}/{x}/{y}@1x.png?style=gbif-natural",
      options: {
        layer_description: "basemap: GBIF Natural",
        control_name: "GBIF Natural",
        layer_type: "basemap",
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://www.openmaptiles.org/copyright">OpenMapTiles</a>.',
        minZoom: 0,
        maxZoom: 21,
      },
    },
  };
}

export function addLayerToMap(
  tileObj: ObservationTilesSettingType,
  map: any,
  layerControl: any,
  checked = false,
) {
  loggerUrl(tileObj.url);

  let layer = L.tileLayer(tileObj.url, tileObj.options);
  if (checked) {
    layer.addTo(map);
  }
  layerControl.addBaseLayer(layer, tileObj.options.control_name);

  return layer;
}

export function addOverlayToMap(
  tileObj: ObservationTilesSettingType,
  map: any,
  layerControl: any,
  checked = false,
) {
  if (!tileObj) return;

  loggerUrl(tileObj.url);

  let layer = L.tileLayer(tileObj.url, tileObj.options);

  try {
    if (checked) {
      layer.addTo(map);
    }
    layerControl.addOverlay(layer, tileObj.options.control_name);
    return layer;
  } catch (error) {
    console.log("addOverlayToMap ERROR:", error);
  }
}

export function fitBoundsPlaces(appStore: AppStoreType) {
  let map = appStore.map;
  if (!map) return;

  let bbox = appStore.selectedPlaces?.bounding_box;
  if (bbox) {
    map.fitBounds(L.featureGroup([L.geoJSON(bbox)]).getBounds());
  }
}

export function fitBounds(layer: GeoJSON, map: Map) {
  map.fitBounds(L.featureGroup([layer]).getBounds(), { maxZoom: 6 });
}

export function renderMarker(settings: MarkerSettings, map: Map) {
  return L.marker([settings.latitude, settings.longitude]).addTo(map);
}

export function renderGeojsonLayer(
  settings: GeoJSONSettings,
  map: Map,
): GeoJSON {
  let options: any = {
    color: settings.color,
    fillColor: settings.fillColor,
    fillOpacity:
      settings.fillOpacity === undefined ? 0.2 : settings.fillOpacity,
  };
  // make geojson not clickable
  // https://stackoverflow.com/a/58675812
  if (settings.interactive === false || settings.interactive === true) {
    options.style = { interactive: settings.interactive };
  }

  var geojsonFeature: any = {
    type: "Feature",
    geometry: settings.geometry,
  };

  return L.geoJSON(geojsonFeature, options).addTo(map);
}

export function renderCircleMarker(settings: CircleSettings, map: Map) {
  return L.circle([settings.latitude, settings.longitude], {
    color: settings.color,
    fillColor: settings.fillColor,
    fillOpacity:
      settings.fillOpacity === undefined ? 0.2 : settings.fillOpacity,
    radius: settings.radius || 500,
  }).addTo(map);
}

export function removeMap(appStore: AppStoreType) {
  if (appStore.map) {
    // remove map and event listeners
    appStore.map.remove();
    appStore.map = null;
  }
}
