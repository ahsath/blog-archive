<template>
  <article>
    <span>{{ post.id }}</span>
    <h1>{{ post.title }}</h1>
  </article>
</template>

<script lang="ts" setup>
interface Props {
  post: {
    id: string;
    title: string;
    image: string;
  };
}

const props = defineProps<Props>();
</script>

<style>
h1 {
  display: inline-block;
}
</style>
