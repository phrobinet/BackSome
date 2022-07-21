<script setup lang="ts">
import { useProfileStore } from '~~/store/profileStore';

definePageMeta({
  middleware: 'auth',
});

const profileStore = useProfileStore();

function checkToday() {
  profileStore.getNotesToCheck();
}

const allMemories = async () => {
  profileStore.getAllNotes();
};
</script>

<template>
  <div class="h-screen bg-gray-100 px-7">
    <h1 class="text-center text-2xl font-mono py-7">My Profile Page</h1>

    <div class="flex flex-col items-center justify-center">
      <div
        class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 max-w-md lg:max-w-xl"
      >
        <button
          @click="checkToday"
          class="mt-6 w-full px-4 py-2 tracking-wide rounded-xl bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
        >
          Check Today
        </button>
        <button
          @click="allMemories"
          class="mt-6 w-full px-4 py-2 tracking-wide rounded-xl bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
        >
          All Memory
        </button>
        <h3
          class="text-center mt-12 py-7 font-bold text-lg"
          v-if="profileStore.notes.length === 0"
        >
          Veuillez verrifier si vous avez des révisions à faire
        </h3>
        <CardCheck
          v-else
          v-for="(data, index) in profileStore.notes"
          :key="index"
          :id="data.id"
          :data="data"
          @preLevel="preLevel"
        />
      </div>
    </div>
  </div>
</template>
