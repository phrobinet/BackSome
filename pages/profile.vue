<script setup lang="ts">
import { useProfileStore } from "~~/store/profileStore";
const { user } = useAuth();
const profileStore = useProfileStore();

const datasTocheck = () => {
  return profileStore.u;
};
console.log("datasTocheck:", datasTocheck.length);

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="h-screen bg-gray-100 px-7">
    <h1 class="text-center text-2xl font-mono py-7">My Profile Page</h1>

    <div class="flex flex-col items-center justify-center">
      {{ profileStore.u }}
      <div
        class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 max-w-md lg:max-w-xl"
      >
        <button
          class="mt-6 w-full px-4 py-2 tracking-wide text-white bg-gradient-to-r from-violet-500 to-purple-400 hover:bg-gradient-to-r hover:from-violet-700 rounded-md"
        >
          Check Today
        </button>
        <button
          class="mt-6 w-full px-4 py-2 tracking-wide text-white bg-gradient-to-r from-violet-500 to-purple-400 hover:bg-gradient-to-r hover:from-violet-700 rounded-md"
        >
          All Memory
        </button>
        <h3
          class="text-center mt-12 py-7 font-bold text-lg"
          v-if="datasTocheck.length === 0"
        >
          Vous n'avez pas de révision à faire aujourd'hui
        </h3>
        <Card
          v-else
          v-for="(data, index) in datasTocheck"
          :key="index"
          :index="index"
          :data="data"
        />
      </div>
    </div>
  </div>
</template>
