<script setup lang="ts">
const isMenuShow = ref(false);
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gradient-to-r from-rose-50 to-teal-100">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="flex flex-row flex-between">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <nuxt-link
                to="/revision"
                class="text-gray-700 hover:border-y-2 hover:border-gray-700 px-3 py-2 text-md font-medium"
                >Révision</nuxt-link
              >

              <nuxt-link
                to="/create"
                class="text-gray-700 hover:border-y-2 hover:border-gray-700 px-3 py-2 text-md font-medium"
                >Create</nuxt-link
              >

              <nuxt-link
                to="training"
                class="text-gray-700 hover:border-y-2 hover:border-gray-700 px-3 py-2 text-md font-medium"
                >Training</nuxt-link
              >
            </div>
          </div>
        </div>
        <Avatar />
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu" v-if="isMenuShow">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <nuxt-link
          href="#"
          class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          aria-current="page"
          >Dashboard</nuxt-link
        >

        <nuxt-link
          to="/revision"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Révision</nuxt-link
        >

        <nuxt-link
          to="/create"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Create</nuxt-link
        >

        <nuxt-link
          to="/training"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Training</nuxt-link
        >
      </div>
    </div>
  </nav>
</template>
