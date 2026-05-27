import type { AppStoreType } from "../types/app";

const store: AppStoreType = {
  data: { projects: [] },
  speciesObservations: [],
  animation: { looping: false },
  mode: "auto_change",
};

const proxiedStore = new Proxy(structuredClone(store), {
  set(target, property, value) {
    (target as any)[property] = value;

    return true;
  },
});

export default proxiedStore;
