<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import SistemaPage from '@/components/Sistemas/SistemaPage.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <SistemaPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>