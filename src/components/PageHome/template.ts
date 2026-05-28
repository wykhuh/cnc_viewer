import { html } from "../../lib/component_utils";

export const template = html`
  <app-header></app-header>
  <main>
    <div id="content">
      <div id="side">
        <div id="map"></div>

        <div id="projects-list"></div>
        <button id="new-project" class="btn-primary">Select new project</button>
      </div>

      <div id="data-container"></div>
    </div>
  </main>
`;
