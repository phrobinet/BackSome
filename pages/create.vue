<script setup lang="ts">
import { ref, reactive } from "vue";
import { useProfileStore } from "~~/store/profileStore";
import { startOfDay } from "date-fns";

const profileStore = useProfileStore();

const router = useRouter();

let item = reactive({
  title: "",
  notes: [],
  location: "",
});

//Add point
const idea = ref("");
const image = ref("");
function addPoint(idea, image) {
  const point = {
    idea,
    image,
  };
  item.notes.push(point);
  this.idea = "";
  this.image = "";
}

// SendMomory
function sendMemory() {
  const data = {
    id: Date.now(),
    title: item.title,
    location: item.location,
    layer: 0,
    createdAt: startOfDay(new Date()),
    notes: item.notes,
    updatedAt: null,
  };
  console.log("data: ", data);

  profileStore.u.notes.push(data);
  profileStore.createMemory(data);
  item.title = "";
  item.location = "";
  item.notes = [];
}

// Middleware
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="h-screen bg-gray-100 px-7">
    <h1 class="text-center text-2xl font-mono py-7">Create Page</h1>

    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <form class="mt-6">
        <div>
          <label for="title" class="block text-sm-text-gray-800">Title</label>
          <input
            type="text"
            id="title"
            v-model="item.title"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div class="mt-4">
          <label for="location" class="block text-sm-text-gray-800"
            >Location</label
          >
          <input
            type="text"
            id="location"
            v-model="item.location"
            class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div class="mt-4">
          <label class="block text-sm-text-gray-800"
            >Your note to memorise</label
          >

          <div class="flex">
            <input
              type="text"
              placeholder="Idea"
              v-model="idea"
              class="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="text"
              placeholder="Image"
              v-model="image"
              class="ml-2 block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <button
          class="px-4 flex items-center mx-auto py-2 tracking-wide text-white bg-gradient-to-l from-violet-500 to-purple-400 hover:bg-gradient-to-l hover:from-violet-700 rounded-md mt-5"
          @click.prevent="addPoint(idea, image)"
        >
          Add Item
        </button>

        <div class="text-center">
          <p v-for="(item, index) in item.notes" :key="index">
            {{ item.idea }} - {{ item.image }}
          </p>
        </div>

        <button
          class="mt-6 w-full px-4 py-2 tracking-wide text-white bg-gradient-to-r from-violet-500 to-purple-400 hover:bg-gradient-to-r hover:from-violet-700 rounded-md"
          @click.prevent="sendMemory"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>
