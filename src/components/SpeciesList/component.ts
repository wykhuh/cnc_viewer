import { pauseIcon, playIcon } from "../../assets/icons";
import { html, setupComponent } from "../../lib/component_utils";
import { toggleFullScreen } from "../../lib/utils";
import type { AppStoreType } from "../../types/app";
import {
  fetchObservationBasicForTaxon,
  fetchSpecies,
} from "../PageHome/data_utils";
import {
  fetchAndRenderOtherObservations,
  formatNormalizedSpeciesObservation,
  renderCarousel,
  setCurrentTaxon,
} from "./utils";

const template = html`<div
  id="carousel"
  role="region"
  aria-roledescription="carousel"
  aria-label="Species List"
></div>`;

class SpeciesList extends HTMLElement {
  constructor() {
    super();
  }

  prevEl: HTMLButtonElement | null = null;
  nextEl: HTMLButtonElement | null = null;
  toggleAnimationEl: HTMLButtonElement | null = null;
  currentIndex = 0;
  timer: any = undefined;
  fullscreenEl: HTMLButtonElement | null = null;

  connectedCallback() {
    setupComponent(template, this);

    this.render(window.app.store).then(() => {
      // updateCarouselState also assigns this.prevEl and this.nextEl
      if (this.prevEl === null) {
        this.prevEl = this.querySelector("#prev-selector");
        this.nextEl = this.querySelector("#next-selector");
      }
      if (this.toggleAnimationEl === null) {
        this.toggleAnimationEl = this.querySelector("#toggle-animation");
      }
      this.fullscreenEl = this.querySelector("#fullscreen");

      this.querySelectorAll(".carousel-item-selector").forEach((el) => {
        el.addEventListener("click", this);
      });
      this.prevEl?.addEventListener("click", this);
      this.nextEl?.addEventListener("click", this);
      this.toggleAnimationEl?.addEventListener("click", this);
      this.fullscreenEl?.addEventListener("click", this);
    });
  }

  disconnectedCallback() {
    this.querySelectorAll(".carousel-item-selector").forEach((el) => {
      el.removeEventListener("click", this);
    });
    this.prevEl?.removeEventListener("click", this);
    this.nextEl?.removeEventListener("click", this);
    this.toggleAnimationEl?.removeEventListener("click", this);
    this.fullscreenEl?.removeEventListener("click", this);

    clearInterval(this.timer);
  }

  handleEvent(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;
    let appStore = window.app.store;

    if (event.type === "click") {
      if (target.className === "carousel-item-selector") {
        let index = target.dataset.itemIndex;

        if (index) {
          this.currentIndex = Number(index);
          setCurrentTaxon(Number(index), this);
        }
        this.updateCarouselState(appStore);
      } else if (target.id === "prev-selector") {
        if (this.currentIndex === 0) return;
        this.currentIndex -= 1;
        setCurrentTaxon(this.currentIndex, this);
        this.updateCarouselState(appStore);
      } else if (target.id === "next-selector") {
        if (this.currentIndex === appStore.speciesObservations.length - 1)
          return;

        this.currentIndex += 1;
        setCurrentTaxon(this.currentIndex, this);
        this.updateCarouselState(appStore);
      } else if (
        target.closest("button")?.id === "toggle-animation" ||
        target.id === "toggle-animation"
      ) {
        if (appStore.animation.looping) {
          this.stopAnimation();
        } else {
          this.startAnimation(appStore);
        }
        appStore.animation.looping = !appStore.animation.looping;
        this.updateAnimationState(appStore);
      } else if (
        target.closest("button")?.id === "fullscreen" ||
        target.id === "fullscreen"
      ) {
        appStore.fullscreen = !appStore.fullscreen;
        let container = document.querySelector<HTMLElement>("#content");
        if (container) {
          toggleFullScreen(container);
        }
      }
    }
  }

  async render(appStore: AppStoreType) {
    let project = appStore.selectedProject;
    if (!project) return;

    // make fullscrren
    if (appStore.fullscreen) {
      let container = document.querySelector<HTMLElement>("#content");
      if (container) {
        container.requestFullscreen();
      }
    }

    // get list of taxa
    let taxa = await fetchSpecies(project);
    if (!taxa) return;

    // Because of API rate limits, fetching 10 observations can take 10
    // ten seconds. We first fetch one observation, render the HTML, then fetch
    // the observations for remaining taxa.
    let firstTaxon = taxa[0];
    const observations = await fetchObservationBasicForTaxon(
      firstTaxon.taxon,
      project,
    );

    // set store speciesObservations
    if (observations) {
      appStore.speciesObservations = taxa.map((t, i) => {
        // combine taxa data with observations data for first taxa
        if (i === 0) {
          return formatNormalizedSpeciesObservation(firstTaxon, observations);
          // use taxa data for rest of the taxa
        } else {
          return formatNormalizedSpeciesObservation(t, []);
        }
      });
    } else {
      this.innerText = "No records found";
      return;
    }

    renderCarousel(appStore, this);

    if (appStore.mode === "auto_change" && appStore.animation.looping) {
      this.updateAnimationState(appStore);
      this.startAnimation(appStore);
    } else {
      this.updateCarouselState(appStore);
    }

    // get observations for remaining taxa
    if (appStore.speciesObservations.length > 1) {
      fetchAndRenderOtherObservations(
        appStore.speciesObservations.slice(
          1,
          appStore.speciesObservations.length,
        ),
        project,
        this,
      );
    }
  }

  startAnimation(appStore: AppStoreType) {
    this.timer = setInterval(() => {
      // load new project at end of observations
      if (this.currentIndex === appStore.speciesObservations.length - 1) {
        this.stopAnimation();
        window.dispatchEvent(new Event("loadRandomProject"));
        return;
      }

      // load next observation
      this.currentIndex += 1;
      setCurrentTaxon(this.currentIndex, this);
      this.updateCarouselState(appStore);
    }, 5000);
  }

  stopAnimation() {
    clearInterval(this.timer);
  }

  updateAnimationState(appStore: AppStoreType) {
    if (this.toggleAnimationEl === null) {
      this.toggleAnimationEl = this.querySelector("#toggle-animation");
    }
    if (!this.toggleAnimationEl) return;

    if (appStore.animation.looping) {
      this.toggleAnimationEl.ariaLabel = "Stop animation";
      this.toggleAnimationEl.title = "Stop animation";
      this.toggleAnimationEl.innerHTML = pauseIcon;
    } else {
      this.toggleAnimationEl.ariaLabel = "Start animation";
      this.toggleAnimationEl.title = "Start animation";
      this.toggleAnimationEl.innerHTML = playIcon;
    }
  }

  updateCarouselState(appStore: AppStoreType) {
    // update prev/next
    if (this.prevEl === null) {
      this.prevEl = this.querySelector("#prev-selector");
      this.nextEl = this.querySelector("#next-selector");
    }
    if (!this.prevEl) return;
    if (!this.nextEl) return;

    if (this.currentIndex === 0) {
      this.prevEl.disabled = true;
    } else {
      this.prevEl.disabled = false;
    }
    if (this.currentIndex === appStore.speciesObservations.length - 1) {
      this.nextEl.disabled = true;
    } else {
      this.nextEl.disabled = false;
    }

    // update current item
    let oldCurrent = this.querySelector(".carousel-item-selector.current");
    if (oldCurrent) {
      oldCurrent.classList.remove("current");
    }

    let newCurrent = this.querySelector(
      `.carousel-item-selector[data-item-index="${this.currentIndex}"]`,
    );
    if (newCurrent) {
      newCurrent.classList.add("current");
    }
  }
}

customElements.define("species-list", SpeciesList);
