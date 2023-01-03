<template>
  <Post v-for="post in props.posts" :post="post" :key="post.id" />
</template>

<script lang="ts" setup>
import Post from "./Post.vue";

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
