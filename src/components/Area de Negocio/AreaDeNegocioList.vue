<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  areasDeNegocio: { uuid: string; descricao: string; impacto: string; ativo: boolean }[]
}>()

</script>

<template></template>

<style scoped></style>