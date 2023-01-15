<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="count++">Increment</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = withDefaults(defineProps<{ count?: number }>(), { count: 0 });

const count = ref(props.count);
</script>
