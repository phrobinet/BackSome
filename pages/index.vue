<script setup lang="ts">
import { useProfileStore } from "~~/store/profileStore";

const profileStore = useProfileStore();
</script>

<template>
  <div
    class="relative flex flex-col justify-center min-h-screen overflow-hidden"
  >
    <AuthCard />
  </div>
</template>
