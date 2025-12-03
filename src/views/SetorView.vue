<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import BarraLateral from '@/components/BarraLateral.vue';
import SetorPage from '@/components/Setor/SetorPage.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <SetorPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>