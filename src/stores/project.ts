const name = import.meta.env.VITE_APP_ROUTER_PREFIX;
export const useProjectStore = defineStore(`${name}-PROJECT`, () => {}, { persist: true });
