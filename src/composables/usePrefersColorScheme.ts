import { ref } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import useMediaQuery from "./useMediaQuery";

export default function usePrefersColorScheme(dark: boolean) {
  const cookies = useCookies([]);
  const isDark = ref<boolean>(dark);

  useMediaQuery("(prefers-color-scheme: dark)", {
    onChange({ matches }) {
      isDark.value = matches;
      updatePreference();
    },
  });

  function updatePreference() {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
      cookies.set("color_scheme", "dark", { expires: new Date(9999, 0) });
    } else {
      document.documentElement.classList.remove("dark");
      cookies.remove("color_scheme");
    }
  }

  function toggleColorScheme() {
    isDark.value = !isDark.value;
    updatePreference();
  }

  return { isDark, toggleColorScheme };
}
