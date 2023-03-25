<template>
  <button
    class="button icon-button"
    type="button"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'switch to light theme' : 'switch to dark theme'"
    @click="toggleColorScheme"
  >
    <Transition name="forward">
      <span v-show="isDark" class="theme-switcher" aria-hidden="true">🌙</span>
    </Transition>
    <Transition name="backward">
      <span v-show="!isDark" class="theme-switcher" aria-hidden="true">☀️</span>
    </Transition>
  </button>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import usePrefersColorScheme from "../composables/usePrefersColorScheme";

const { isDark, toggleColorScheme } = usePrefersColorScheme(inject("dark") as boolean);
</script>

<style>
.theme-switcher {
  position: absolute;
  line-height: 1;
  font-size: 1.5rem;
}

.forward-enter-from,
.forward-leave-to {
  opacity: 0;
  translate: 10px;
  rotate: 30deg;
}

.backward-enter-from,
.backward-leave-to {
  opacity: 0;
  translate: -10px;
  rotate: -30deg;
}

.forward-enter-active,
.forward-leave-active,
.backward-enter-active,
.backward-leave-active {
  transition: all 0.2s ease;
}

.forward-enter-active,
.backward-enter-active {
  transition-delay: 0.2s;
}
</style>
