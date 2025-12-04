<script setup lang="ts">
import { ref } from 'vue'
import { SegmentoService } from '@/services/SegmentoService'

const descricao = ref('')

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save'): void
}>()

async function salvar() {
  try {
    await SegmentoService.salvar({ descricao: descricao.value })
    emit('save')
    descricao.value = ''
    fechar()
  } catch (error) {
    console.error('Erro ao salvar segmento:', error)
    alert('Erro ao salvar segmento.')
  }
}

function fechar(){
  emit('close')
}

</script>

<template></template>

<style scoped></style>