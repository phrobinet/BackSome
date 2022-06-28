<script setup lang="ts"></script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <nav class="bg-gradient-to-r from-violet-500 to-white">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="flex flex-row flex-between">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <nuxt-link
                to="/profile"
                class="text-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >Profile</nuxt-link
              >

              <nuxt-link
                to="/create"
                class="text-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >Create</nuxt-link
              >

              <nuxt-link
                to="training"
                class="text-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                >Training</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
  </nav>
</template>

<style lang="scss" scoped></style>
