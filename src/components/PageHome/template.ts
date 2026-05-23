import { html } from "../../lib/component_utils";

export const template = html`
  <main>
    <div id="content">
      <div id="side">
        Latitude
        <input
          id="latitude-control"
          value="0"
          type="number"
          min="-90"
          max="90"
          step="1"
        />
        <div id="projects-list"></div>
      </div>
      <div id="map"></div>
    </div>
  </main>
`;
