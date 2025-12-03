<script setup lang="ts">
import AreaDeNegocioPage from '@/components/Area de Negocio/AreaDeNegocioPage.vue';
import BarraLateral from '@/components/BarraLateral.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div>
            <BarraLateral />
            <AreaDeNegocioPage />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>