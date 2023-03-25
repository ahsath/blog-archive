<template>
  <a href="/" v-for="post in posts" class="card">
    <img class="card__image" :src="post.thumbnail" alt="" />
    <div class="card__subhead">{{ post.date }}</div>
    <div class="card__headline">{{ post.title }}</div>
    <p class="card__text">{{ post.excerpt }}</p>
  </a>
</template>

<script lang="ts" setup>
const posts = [
  {
    id: 1,
    date: "10 Enero, 2023",
    title: "Data binding in React",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/Igeg-fNOpcw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDBi_wicaeeyGGizNdWoyXgFPG6AA",
    excerpt:
      "As developers, we don't like working with forms, but they're a critical part of most web applications! In this tutorial, you'll learn exactly how to wire up all of the different form controls in React.",
  },
  {
    id: 2,
    date: "15 Enero, 2023",
    title: "Color Formats in CSS",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/lCD4kJ4rYq8/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAM3uEoGh6ve6QtrMJuvLjfn8oXNw",
    excerpt:
      "CSS gives us so many options when it comes to expressing color—we can use hex codes, rgb, hsl, and more. Which option should we choose?",
  },
  {
    id: 3,
    date: "24 Enero, 2023",
    title: "An Interactive Guide to Flexbox",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/rkXhKgKQ8Vs/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBI6PL4vMRCU3Qcu_DjTpQw4GsiUQ",
    excerpt:
      "When we truly learn the secrets of the Flexbox layout mode, we can build absolutely incredible things.",
  },
  {
    id: 4,
    title: "A World-Class Code Playground with Sandpack",
    date: "31 Diciembre, 2022",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/Lk8O2SCGmlQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCbmeXYsYUFz99a4CUi5UhFmEpmLg",
    excerpt:
      "No developer blog or technical documentation site is complete without an interactive code playground. The CodeSandbox team recently released a wonderful tool called Sandpack.",
  },
  {
    id: 5,
    title: "Understanding useMemo and useCallback",
    date: "29 Diciembre, 2022",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/_AyFP5s69N4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBXaWvIXhbOCBEw8FZcgnJMEZj1rA",
    excerpt:
      "What's the deal with these two hooks?! Lots of devs find them confusing, for a whole host of reasons. In this tutorial, we'll dig deep and understand what they do, why they're useful.",
  },
  {
    id: 6,
    title: "Why React Re-Renders",
    date: "20 Diciembre, 2022",
    description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
    category: "Tutorials",
    thumbnail:
      "https://i.ytimg.com/vi/k1Zyj4Qw56M/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAJHbNNh2FmEYax5w5XxQWNw_q2FQ",
    excerpt:
      "In React, we don't update the DOM directly, we tell React what we want the DOM to look like, and React tackles the rest. But how exactly does it do this?",
  },
  // {
  //   id: 7,
  //   title: "Statements Vs. Expressions",
  //   date: "4 Diciembre, 2022",
  //   category: "Tutorials",
  //   thumbnail:
  //     "https://i.ytimg.com/vi/qz7Nq1tV7Io/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC2Kuj9H-Icg5AzRhNsOxrK-PFddg",
  //   excerpt:
  //     "One of the most foundational things to understand about JavaScript is that programs are made up of statements, and statements have slots for expressions.",
  // },
  // {
  //   id: 8,
  //   title: "My Wonderful HTML Email Workflow",
  //   date: "23 Noviembre, 2022",
  //   category: "Tutorials",
  //   thumbnail:
  //     "https://i.ytimg.com/vi/1hYCn5yug6c/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACxDzUlhqUW2XDGXTi38i-hLxppw",
  //   excerpt:
  //     "If you've ever had the misfortune of being tasked with building a template for HTML emails, you know it's tricky business! In this blog post, I share the approach I took to build responsive.",
  // },
  // {
  //   id: 9,
  //   title: "The Surprising Truth About Pixels and Accessibility",
  //   date: "16 Noviembre, 2022",
  //   category: "Tutorials",
  //   thumbnail:
  //     "https://i.ytimg.com/vi/rIebSHUZz_w/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDR9BeFcHgf-qQo0Ksv-38fUuakYQ",
  //   excerpt:
  //     "“Should I use pixels or rems?”. In this comprehensive blog post, we'll answer this question once and for all. You'll learn about the accessibility implications, and how to determine the best unit to use in any scenario.",
  // },
  // {
  //   id: 10,
  //   title: "You Don't Need a UI Framework",
  //   date: "1 Noviembre, 2022",
  //   category: "Tutorials",
  //   thumbnail:
  //     "https://i.ytimg.com/vi/lHZwlzOUOZ4/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGKrHfD7tUgBA-YFcgV5bPZNulqw",
  //   excerpt:
  //     "As developers, it can be tempting to grab a pre-styled UI framework like Material UI or Bootstrap. Seems like a great way to outsource design and save a bunch of time.",
  // },
];

// interface Posts {
//   title: string;
//   excerpt: string;
//   thumbnail: string;
//   date: string;
// }

// defineProps<{ posts: Posts[] }>();
</script>

<style>
.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
