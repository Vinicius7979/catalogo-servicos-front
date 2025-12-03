<script setup lang="ts">
import BarraLateral from '@/components/BarraLateral.vue';
import BemVindo from '@/components/BemVindo.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>
        <div class="flex min-h-[calc(100vh-120px)]">
            <BarraLateral />
            <BemVindo />
        </div>
    </DefaultLayout>
</template>

<style scoped></style>