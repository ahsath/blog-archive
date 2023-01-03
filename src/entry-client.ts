import { createApp } from "./main";
import "./style.css";

declare global {
  interface Window {
    __PRELOADED_STATE__?: {
      id: string;
      props: Record<string, unknown>;
    }[];
  }
}

const apps = document.querySelectorAll("[data-ssr]");

for (const app of apps as NodeListOf<HTMLElement>) {
  if (app) {
    const state = window.__PRELOADED_STATE__?.find(
      (state) => state.id === app.dataset.ssr
    );

    createApp(app.dataset.ssrComponent as string, state?.props).mount(app);
  }
}

delete window.__PRELOADED_STATE__;
