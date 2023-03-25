<template>
  <nav class="list" :class="{ 'list--is-nav': isNav }">
    <a class="list__item label-large" href="/programacion" data-nav-link> Programación </a>
    <a class="list__item label-large" href="/tutoriales" data-nav-link> Tutoriales </a>
    <a class="list__item label-large" href="/recetas" data-nav-link> Recetas </a>
    <a class="list__item label-large" href="/tienda" data-nav-link> Tienda </a>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const props = withDefaults(defineProps<{ isNav?: boolean }>(), { isNav: false });

onMounted(() => {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if ((link as HTMLAnchorElement).href === location.href) {
      link.setAttribute("aria-current", "page");
    }
  });
});
</script>
