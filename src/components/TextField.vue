<template>
  <div class="text-field" :class="{ 'text-field--error': !!error }">
    <input :="$attrs" class="text-field__input" @input="onInput" />
    <div class="text-field__supporting-text">{{ error || supportingText }}</div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
interface Props {
  modelValue: string;
  supportingText?: string;
  error?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{ (e: "update:model-value", value: typeof props.modelValue): void }>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:model-value", target.value);
}
</script>

<style>
.text-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.text-field__input {
  position: relative;
  height: 2.5rem;
  padding-inline: 1rem;
  border: none;
  width: 100%;
  color: hsl(var(--md-sys-color-on-surface-variant));
  background: var(--md-sys-color-surface-variant);
  border-radius: var(--md-sys-shape-corner-full);
  font-size: var(--md-sys-typescale-body-large-font-size);
  line-height: var(--md-sys-typescale-body-large-line-height);
  font-weight: var(--md-sys-typescale-body-large-font-weight);
  letter-spacing: var(--md-sys-typescale-body-large-letter-spacing);
  transition: all var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized);
}

.text-field__input:where(:focus, :focus-visible) {
  outline: 0.125rem solid var(--md-sys-color-primary);
  color: hsl(var(--md-sys-color-on-surface));
  caret-color: var(--md-sys-color-primary);
}

.text-field__input:not(:focus, :focus-visible):hover {
  outline: 0.0625rem solid hsl(var(--md-sys-color-on-surface));
  color: hsl(var(--md-sys-color-on-surface));
}

.text-field__input:not(:placeholder-shown) {
  color: hsl(var(--md-sys-color-on-surface));
  caret-color: var(--md-sys-color-primary);
}

.text-field__supporting-text {
  padding-inline: 1rem;
  font-size: var(--md-sys-typescale-body-small-font-size);
  line-height: var(--md-sys-typescale-body-small-line-height);
  font-weight: var(--md-sys-typescale-body-small-font-weight);
  letter-spacing: var(--md-sys-typescale-body-small-letter-spacing);
  color: hsl(var(--md-sys-color-on-surface-variant));
}

.text-field--error .text-field__supporting-text,
.text-field--error .text-field__input::placeholder {
  color: var(--md-sys-color-error);
}

.text-field--error .text-field__input:where(:focus, :focus-visible),
.text-field--error .text-field__input:not(:focus, :focus-visible):hover {
  outline-color: var(--md-sys-color-error);
  caret-color: var(--md-sys-color-error);
}
</style>
