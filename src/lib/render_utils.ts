import L from "leaflet";
import type { Map } from "leaflet";

import type { NormalizedPlace } from "../types/app";

export function renderQualityGrade(quality_grade: string) {
  let content = "";
  if (quality_grade === "research") {
    content += `<span class="quality-grade">
      <span class="research-grade-badge badge">Research Grade</span>
     </span>`;
  } else if (quality_grade === "needs_id") {
    content += `<span class="quality-grade">
      <span class="needs-id-badge badge">Needs ID</span>
    </span>`;
  } else if (quality_grade === "casual") {
    content += `<span class="quality-grade">
      <span class="casual-badge badge">Casual</span>
    </span>`;
  }

  return content;
}

export function renderResourceGeometryLayer(
  resource: NormalizedPlace,
  map: Map,
  layerDescription: string,
): L.GeoJSON {
  let options: any = {
    color: "red",
    fillColor: "none",
    layer_description: `${layerDescription}: ${resource.display_name}, ${resource.id}`,
  };
  let layer = L.geoJSON(resource.geometry as any, options);
  layer.addTo(map);
  return layer;
}
