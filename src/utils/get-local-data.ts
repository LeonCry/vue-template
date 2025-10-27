const name = import.meta.env.VITE_APP_ROUTER_PREFIX;

export function getLocalData(key: string) {
  const data = localStorage.getItem(`${name}-${key}`);
  if (!data) return null;
  return JSON.parse(data);
}
