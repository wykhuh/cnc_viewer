import type { AppStoreType } from "../types/app";

export const defaultStore: AppStoreType = {
  data: { projects: [] },
  speciesObservations: [],
  animation: { looping: false },
  mode: "auto_change",
  fullscreen: false,
};

const proxiedStore = new Proxy(structuredClone(defaultStore), {
  set(target, property, value) {
    (target as any)[property] = value;

    return true;
  },
});

export default proxiedStore;
