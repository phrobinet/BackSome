<script setup lang="ts">
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
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>
