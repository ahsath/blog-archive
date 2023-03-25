<template>
  <div class="top-app-bar__left">
    <button
      class="button icon-button top-app-bar__nav-button"
      aria-label="abrir menu"
      aria-controls="header-nav-drawer"
      @click="open = !open"
    >
      <Icon icon="menu" />
    </button>
    <a href="/" class="top-app-bar__logo logo title-medium">ahsath</a>
    <MainNav class="top-app-bar__nav" is-nav />
  </div>

  <div class="top-app-bar__right">
    <ThemeSwitcher />
  </div>

  <Teleport to="#navigation-drawer">
    <NavigationDrawer v-model="open" id="header-nav-drawer" aria-label="menu principal">
      <MainNav />
    </NavigationDrawer>
  </Teleport>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { provide, ref, useAttrs } from "vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import Icon from "./Icon.vue";
import MainNav from "./MainNav.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";

const open = ref(false);
provide("dark", useAttrs().dark);
</script>

<style>
.logo {
  color: var(--md-sys-color-on-background);
  text-transform: uppercase;
  text-decoration: none;
}
</style>
