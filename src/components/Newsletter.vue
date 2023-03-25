<template>
  <label for="text-field-email" class="newsletter__label">
    Hola! 👋🏿 Suscríbete al Blog y recibe notificaciones
  </label>
  <form @submit.prevent="submit" class="newsletter__form" autocomplete="off">
    <TextField
      v-model="Email"
      id="text-field-email"
      type="email"
      placeholder="Ingresa tu correo"
      supporting-text="No compartiré tu correo con nadie"
      :error="v$.$errors[0]?.$message.toString()"
    />
    <button class="button button--primary" type="submit">Suscribir</button>
  </form>
</template>

<script lang="ts" setup>
import TextField from "./TextField.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { ref } from "vue";

const Email = ref("");

const v$ = useVuelidate(
  {
    Email: {
      required: helpers.withMessage("El correo es requerido", required),
      email: helpers.withMessage("El correo es inválido", email),
      $autoDirty: true,
    },
  },
  { Email }
);

async function submit() {
  if (await v$.value.$validate()) {
    console.log(Email.value);
  }
}
</script>

<style>
.newsletter {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 10rem;
}

.newsletter p {
  margin: 0;
}

.newsletter__label {
  font-family: var(--md-sys-typescale-headline-medium-font-family-name);
  font-style: var(--md-sys-typescale-headline-medium-font-family-style);
  font-weight: var(--md-sys-typescale-headline-medium-font-weight);
  font-size: var(--md-sys-typescale-headline-medium-font-size);
  line-height: var(--md-sys-typescale-headline-medium-line-height);
  letter-spacing: var(--md-sys-typescale-headline-medium-letter-spacing);
  color: var(--md-sys-color-on-background);
}

.newsletter__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.newsletter__form .text-field {
  flex: 1;
}

@media (min-width: 48rem) {
  .newsletter__form {
    flex-direction: row;
  }
}

@media (min-width: 62rem) {
  .newsletter {
    flex-direction: row;
  }

  .newsletter__label {
    font-family: var(--md-sys-typescale-display-small-font-family-name);
    font-style: var(--md-sys-typescale-display-small-font-family-style);
    font-weight: var(--md-sys-typescale-display-small-font-weight);
    font-size: var(--md-sys-typescale-display-small-font-size);
    line-height: var(--md-sys-typescale-display-small-line-height);
    letter-spacing: var(--md-sys-typescale-display-small-letter-spacing);
    color: var(--md-sys-color-on-background);
    flex: 1;
  }
}

@media (min-width: 75rem) {
  .newsletter {
    gap: 12rem;
  }
}
</style>
