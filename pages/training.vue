<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useProfileStore } from '../store/profileStore';
import datas from '../db.json';

const { dbMemory } = useProfileUrl();
const profileStore = useProfileStore();
// profileStore.addDBNumber();

let min = ref(1);
let max = ref(10);
let showReponse = ref(false);
let arrNumbers = ref([]);

function getNumber(min, max) {
  showReponse.value = false;
  let i = 0;
  arrNumbers.value = [];
  while (i < 3) {
    let num = Math.floor(Math.random() * (max - min)) + min;
    i++;
    // if (num < 10) num = "0" + num;
    arrNumbers.value.push(num);
  }
  console.log('arrNumber: ', arrNumbers);

  return arrNumbers;
}

function toggleReponse() {
  showReponse.value = !showReponse.value;
}

// Middleware
definePageMeta({
  middleware: 'auth',
});
</script>
<template>
  <div class="bg-gray100 px-7">
    <h1 class="text-center text-2xl font-mono py-7">Training Page</h1>

    <div
      class="flex flex-col items-center justify-center w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 max-w-md lg:max-w-xl"
    >
      <div class="relative max-w-xl">
        <input
          type="text"
          id="number"
          placeholder="Enter your max number"
          v-model="max"
          class="w-full text-center px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        <button
          @click.prevent="getNumber(min, max)"
          class="mt-6 w-full px-4 py-2 tracking-wide rounded-xl text-white bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
        >
          Let's go Training
        </button>
        <div class="flex flex-row mt-5">
          <p
            class="border-2 border-stone-300 w-full text-center"
            v-for="(arrNumber, index) in arrNumbers"
            :key="index"
          >
            {{ arrNumber < 10 ? '0' + arrNumber : arrNumber }}
          </p>
        </div>
        <div v-if="arrNumbers.length > 0">
          <button
            @click="toggleReponse"
            class="mt-6 w-full px-4 py-2 tracking-wide text-white rounded-xl text-white bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
          >
            Réponse
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="showReponse"
      class="flex flex-col mt-7 items-center justify-center w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 max-w-md lg:max-w-xl"
    >
      <p class="text-center mt-7 text-xl">
        <span class="text-blue-500"
          >{{ datas[arrNumbers[0] - 1].pers + ' ' }}
        </span>
        <span class="text-green-600">
          {{ datas[arrNumbers[1] - 1].action }}</span
        >
        avec
        <span class="text-purple-700">
          {{ datas[arrNumbers[2] - 1].objet }}</span
        >
      </p>
    </div>
  </div>
</template>
