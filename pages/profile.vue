<script setup lang="ts">
const { user } = useAuth();
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div>My profile</div>
  <div>{{ user.email }}</div>
</template>
