<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import LinguagemPage from '@/components/Linguagens/LinguagemPage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <LinguagemPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>