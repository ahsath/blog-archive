<template>
  <Transition name="scrim">
    <div v-show="shown" class="scrim" @click="toggle" />
  </Transition>
  <Transition name="emphasized">
    <div
      v-show="shown"
      class="navigation-drawer"
      role="dialog"
      aria-modal="true"
      :data-open="shown"
      :id="id"
      :="$attrs"
    >
      <button
        class="button icon-button navigation-drawer__close-button"
        aria-label="cerrar menu"
        :aria-controls="id"
        @click="toggle"
      >
        <Icon icon="menu_open" />
      </button>
      <slot />
    </div>
  </Transition>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { createFocusTrap, FocusTrap } from "focus-trap";
import useMediaQuery from "../composables/useMediaQuery";
import Icon from "./Icon.vue";

const props = defineProps<{ id: string; modelValue: boolean }>();
const emit = defineEmits<{ (e: "update:model-value", open: boolean): void }>();

const trap = ref<FocusTrap>();
const isMd = useMediaQuery("(min-width: 768px)");

const shown = computed({
  get() {
    return props.modelValue;
  },
  set(open) {
    emit("update:model-value", open);
  },
});

const toggle = () => (shown.value = !shown.value);

watch(isMd, (val) => val && (shown.value = !val));

watch(shown, () => {
  nextTick(() => {
    if (shown.value) {
      trap.value = createFocusTrap("#" + props.id, {
        clickOutsideDeactivates: true,
      });

      trap.value.activate();
    } else {
      trap.value?.deactivate();
    }
  });
});

// const drawer = ref<HTMLElement | null>(null);

// let pointerInitialXPos = 0;
// let drawerLastXPos = 0;
// let movementX = 0;

// function pointerdown(e: PointerEvent) {
//   if (drawer.value) {
//     drawer.value.style.transitionDuration = "0s";
//   }
//   pointerInitialXPos = e.clientX - drawerLastXPos;
// }

// function pointermove(e: PointerEvent) {
//   drawerLastXPos = e.clientX - pointerInitialXPos;
//   movementX = e.movementX;

//   if (drawer.value && e.pointerType === "touch") {
//     drawer.value.style.translate = drawerLastXPos + "px";
//   }
// }
</script>

<style>
.navigation-drawer {
  position: fixed;
  z-index: var(--md-sys-elevation-level1);
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  max-width: 20rem;
  padding: 0.75rem 1.75rem;
  background: hsl(var(--md-sys-color-surface));
  border-radius: var(--md-sys-shape-corner-large-end);
}

.navigation-drawer::before {
  content: "";
  display: block;
  position: absolute;
  inset: 0;
  background: var(--md-sys-color-surface1);
  border-radius: var(--md-sys-shape-corner-large-end);
}

.navigation-drawer__close-button {
  margin-left: -0.75rem;
}

.navigation-drawer .list {
  margin: 0 -0.75rem;
}

.navigation-drawer .list--is-nav {
  flex-direction: column;
}

.scrim {
  background-color: hsl(0 0% 0% / 0.32);
  position: fixed;
  inset: 0;
  z-index: var(--md-sys-elevation-level1);
}

.emphasized-enter-from,
.emphasized-leave-to {
  translate: -100%;
}

.emphasized-enter-active,
.emphasized-leave-active {
  transition: translate var(--md-sys-motion-duration-medium2) var(--md-sys-motion-easing-emphasized);
}

.scrim-enter-from,
.scrim-leave-to {
  opacity: 0;
}

.scrim-enter-active {
  transition: opacity var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized);
}

.scrim-leave-active {
  transition: opacity var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized);
}

/* TODO: :has is not supported on firefox yet */
body:has([data-open="true"]) {
  overflow: hidden;
  padding-right: 15px;
}
</style>
