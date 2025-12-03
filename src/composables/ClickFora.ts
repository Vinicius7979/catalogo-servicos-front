import { onMounted, onBeforeUnmount, type Ref } from "vue"

export function useClickFora(
  elementRef: Ref<HTMLElement | null>,
  callback: () => void
) {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as Node;
    if (elementRef.value && !elementRef.value.contains(target)) {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", handleClick));
  onBeforeUnmount(() => document.removeEventListener("click", handleClick));
}
