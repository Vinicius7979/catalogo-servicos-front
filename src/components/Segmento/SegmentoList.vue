<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  segmentos: { uuid: string; descricao: string; ativo: boolean }[]
}>()
</script>

<template></template>

<style scoped></style>