import { createApp } from "./main";
import "./assets/css/theme.css";

const apps = document.querySelectorAll("[data-ssr]");

if (!!apps.length) {
  for (const app of apps as NodeListOf<HTMLElement>) {
    const state = window.__PRELOADED_STATE__?.find(
      (state) => state.id === app.dataset.ssr
    );

    createApp(app.dataset.ssrComponent, state?.props).mount(app);
  }
}

delete window.__PRELOADED_STATE__;
