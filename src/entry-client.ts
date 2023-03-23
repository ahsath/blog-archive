import { createApp } from "./main";
import "./assets/css/theme.css";

const apps = document.querySelectorAll("[data-ssr-component]");

if (!!apps.length) {
  for (const app of apps as NodeListOf<HTMLElement>) {
    const state = window.__PRELOADED_STATE__?.find(
      (state) => state.component === app.dataset.ssrComponent
    );

    createApp(app.dataset.ssrComponent, state?.data).mount(app);
  }
}

delete window.__PRELOADED_STATE__;
