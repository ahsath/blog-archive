import { createSSRApp, defineAsyncComponent, AsyncComponentLoader } from "vue";

export type Props = Record<string, unknown> | undefined;
type Modules = Record<string, () => Promise<AsyncComponentLoader>>;

const modules: Modules = import.meta.glob("./components/*.vue");

for (const path in modules) {
  modules[path.split("./components/")[1].split(".vue")[0]] = modules[path];
  delete modules[path];
}

export function createApp(component: string, props: Props) {
  const app = createSSRApp(defineAsyncComponent(modules[component]), props);

  return app;
}
