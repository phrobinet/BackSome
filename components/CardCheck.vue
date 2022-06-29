<script setup lang="ts">
import { ref } from "vue";
import { useProfileStore } from "../store/profileStore";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const profileStore = useProfileStore();
const showLocation = ref(false);
const showImage = ref(false);
const showIdea = ref(false);

function toggleLocation() {
  showLocation.value = !showLocation.value;
}

function toggleImage() {
  showImage.value = !showImage.value;
}

function toggleIdea() {
  showIdea.value = !showIdea.value;
}
</script>
<template>
  <div
    class="mx-auto my-5 max-w-lg rounded-lg bg-gray-100 py-7 px-6 shadow-xl ring-1 ring-purple-400 ring-offset-2"
  >
    <h2 class="text-center text-2xl text-gray-900">
      {{ data.title }}
    </h2>

    <p @click="toggleLocation" class="cursor-pointer py-4 text-gray-600">
      A quel endroit ?
      <span v-if="showLocation" class="font-bold">{{ data.location }}</span>
    </p>

    <div class="flex flex-col sm:flex-row">
      <button
        @click="toggleImage"
        class="rounded-lg bg-gradient-to-r from-orange-500 to-yellow-600 py-3 px-2 text-white sm:w-1/2"
      >
        Show Image
      </button>

      <button
        @click="toggleIdea"
        class="sm:ml-2 mt-2 sm:mt-0 rounded-lg bg-gradient-to-l from-orange-500 to-yellow-600 py-3 px-2 text-white sm:w-1/2"
      >
        Show Idea
      </button>
    </div>

    <div class="flex flex-col items-center justify-center py-7">
      <p v-for="(item, index) in data.notes" :key="index">
        <span v-if="showImage">{{ item.image }}</span>
        <span v-if="showIdea"> - {{ item.idea }}</span>
      </p>
    </div>

    <div
      v-if="profileStore.isToCheck"
      class="flex flex-col items-center justify-center"
    >
      <button
        @click="$emit('nextLevel', { data, index })"
        class="rounded-lg w-full bg-gradient-to-r from-indigo-500 to-violet-600 py-3 px-2 text-white hover:bg-gradient-to-l hover:from-indigo-500 hover:to-violet-600"
      >
        Next Level
      </button>
      <button
        @click="$emit('preLevel', { data, index })"
        class="rounded-lg mt-3 w-full bg-gradient-to-r from-indigo-500 to-violet-600 py-3 px-2 text-white hover:bg-gradient-to-l hover:from-indigo-500 hover:to-violet-600"
      >
        Don't remember
      </button>
    </div>
  </div>
</template>
