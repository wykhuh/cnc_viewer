import { html } from "../../lib/component_utils";

export const template = html`
  <main>
    <section class="hero">
      <h1>City Nature Challenge 2026</h1>
      <p>Top observed species for each CNC project.</p>
    </section>
    <div id="content">
      <div id="side">
        <div id="map"></div>
        <div>
          <label for="mode">Mode</label>
          <select id="mode">
            <option value="auto_change">Automatically change photos</option>
          </select>
        </div>
        <div id="projects-list"></div>
        <button id="new-project" class="btn-primary">Select new project</button>
      </div>

      <div id="data-container"></div>
    </div>
  </main>
`;
