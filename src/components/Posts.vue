<template>
  <Post v-for="post in props.posts" :post="post" :key="post.id" />
</template>

<script lang="ts" setup>
interface Props {
  posts: [
    {
      id: string;
      title: string;
      image: string;
    }
  ];
}

const props = defineProps<Props>();
</script>
