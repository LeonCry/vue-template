// 运行时加载静态资源
export default async function staticResourcesLoad(url: string) {
  const path = await import(url);
  return path.default;
}
