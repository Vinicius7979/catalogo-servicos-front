<script setup lang="ts">
import { ref } from "vue"

import { useClickFora } from "@/composables/ClickFora";

const isMenuSuspensoAtivo = ref(false);
const menuSuspenso = ref<HTMLElement | null>(null);

const mudarStatusMenuSuspenso = () => {
  isMenuSuspensoAtivo.value = !isMenuSuspensoAtivo.value;
};

useClickFora(menuSuspenso, () => (isMenuSuspensoAtivo.value = false));

</script>

<template>
    <header class="flex justify-between items-center bg-zinc-800 text-white px-8 h-20">
        <div class="w-[60px] h-[60px] bg-white rounded-[8px] flex items-center justify-center overflow-hidden">
                <RouterLink to="/">
                    <img src="/src/assets/prefeitura-de-Manaus.jpeg" alt="Logo" class="w-full h-full object-cover"/>
                </RouterLink>
        </div>
        <div class="relative flex items-center" ref="menuSuspenso">
            <img
                @click="mudarStatusMenuSuspenso"
                src="/src/assets/usuario.png"
                alt="Usuário"
                class="w-[48px] h-[48px] rounded-full border-2 border-white object-cover cursor-pointer"
            />
            <div
                v-if="isMenuSuspensoAtivo"
                class="absolute top-[60px] right-0 bg-white text-zinc-800 border rounded-lg shadow-md min-w-[120px] z-10"
            >
                <ul class="list-none m-0 p-0">
                    <li class="py-3 px-4 cursor-pointer hover:bg-gray-100">Perfil</li>
                    <li class="py-3 px-4 cursor-pointer hover:bg-gray-100">Sair</li>
                </ul>
            </div>
        </div>
    </header>
</template>

<style scoped></style>