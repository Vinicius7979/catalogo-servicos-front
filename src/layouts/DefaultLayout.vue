<script setup lang="ts">
import Cabecalho from '@/components/HeaderCabecalho.vue';
import Rodape from '@/components/FooterRodape.vue';

</script>

<template>
    <div class="min-h-screen flex flex-col bg-neutral-100">
        <Cabecalho />

        <main>
           <slot />
        </main>

        <Rodape />
    </div>
</template>

<style scoped></style>