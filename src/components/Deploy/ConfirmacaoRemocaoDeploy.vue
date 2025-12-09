<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'confirm'): void
}>()
</script>

<template></template>

<style scoped></style>