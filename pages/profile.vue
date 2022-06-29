<script setup lang="ts">
import { useProfileStore } from "~~/store/profileStore";
const profileStore = useProfileStore();

function checkToday() {
  profileStore.getNotesToCheck();
}

const allMemories = async () => {
  profileStore.getAllNotes();
};

const nextLevel = ({ index }) => {
  profileStore.updateMemory(index);
};

const preLevel = ({ index }) => {
  console.log("enter preLevel");

  profileStore.dontRemember(index);
};

definePageMeta({
  middleware: "auth",
});
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
          class="mt-6 w-full px-4 py-2 tracking-wide text-white bg-gradient-to-r from-violet-500 to-purple-400 hover:bg-gradient-to-r hover:from-violet-700 rounded-md"
        >
          Check Today
        </button>
        <button
          @click="allMemories"
          class="mt-6 w-full px-4 py-2 tracking-wide text-white bg-gradient-to-r from-violet-500 to-purple-400 hover:bg-gradient-to-r hover:from-violet-700 rounded-md"
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
          :index="index"
          :data="data"
          @nextLevel="nextLevel"
          @preLevel="preLevel"
        />
      </div>
    </div>
  </div>
</template>
