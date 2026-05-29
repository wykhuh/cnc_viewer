import type { AppStoreType } from "../types/app";

export const defaultStore: AppStoreType = {
  data: { projects: [] },
  speciesObservations: [],
  animation: { looping: false },
  mode: "auto_change",
  fullscreen: false,
  currentPage: "home",
  currentYear: 2026,
};

const proxiedStore = new Proxy(structuredClone(defaultStore), {
  set(target, property, value) {
    (target as any)[property] = value;

    return true;
  },
});

export default proxiedStore;
