import { setupComponent } from "../../lib/component";
import { template } from "./template";

class PageHome extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    setupComponent(template, this);

    this.render();
  }

  async render() {}
}

customElements.define("page-home", PageHome);
