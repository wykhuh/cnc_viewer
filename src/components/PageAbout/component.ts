import { setupComponent } from "../../lib/component_utils";
import { template } from "./template";

class PageAbout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    setupComponent(template, this);
  }
}

customElements.define("page-about", PageAbout);
