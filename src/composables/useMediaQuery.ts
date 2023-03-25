import { onMounted, onUnmounted, ref } from "vue";

interface Opts {
  onChange(mqle: MediaQueryListEvent): void;
}

export default function useMediaQuery(query: string, opts: Opts) {
  const matches = ref(false);
  let mql: MediaQueryList | undefined = undefined;

  const handleMatchMedia = (mqle: MediaQueryListEvent) => (matches.value = mqle.matches);

  onMounted(() => {
    mql = window.matchMedia(query);
    mql.addEventListener("change", opts?.onChange || handleMatchMedia);
    matches.value = mql.matches;
  });

  onUnmounted(() => mql?.removeEventListener("change", opts?.onChange || handleMatchMedia));

  return matches;
}
