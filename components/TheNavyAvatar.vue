<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useProfileStore } from '../store/profileStore';
const modal = ref(false);
const modalRef = ref(null);

const profileStore = useProfileStore();
const { isLoggedIn, signOut } = useAuth();

onClickOutside(modalRef, (event) => {
  console.log(event);
  modal.value = false;
});

const dropdown = ref(false);
const dropdownRef = ref(null);

onClickOutside(dropdownRef, (event) => {
  console.log(event);
  dropdown.value = false;
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div v-if="!profileStore.isLog">
      <nuxt-link
        class="text-gray-700 px-3 py-2 rounded-md text-md font-medium"
        to="/"
        >Connexion / Inscription</nuxt-link
      >
    </div>
    <div v-else class="ml-2 relative inline-block">
      <button
        @click="dropdown = true"
        class="text-gray-700 hover:border-y-2 hover:border-gray-700 px-3 py-2 text-md font-medium"
      >
        Hello
      </button>
      <div v-if="dropdown" ref="dropdownRef" class="dropdown-inner">
        <nuxt-link to="/profile" class="cursor-pointer">Mon Profile</nuxt-link>
        <p @click="signOut" class="cursor-pointer">Logout</p>
      </div>
    </div>
    <div v-if="modal" ref="modalRef" class="modal">
      <div class="inner">
        <button class="button small" title="Close" @click="modal = false">
          𝖷
        </button>
        <p class="heading">Demo Modal</p>
        <p>Click outside of the modal to close it.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: 100%;
  z-index: 10;
}
.inner {
  background-color: var(--vt-c-bg);
  padding: 0.4em 2em;
  border-radius: 5px;
  border: 1px solid var(--vt-c-divider-light);
  box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
}
.dropdown-inner {
  background-color: var(--vt-c-bg);
  padding: 0.5em;
  position: absolute;
  left: 0;
  border-radius: 5px;
  border: 1px solid var(--vt-c-divider-light);
  box-shadow: 2px 2px 5px rgba(10, 10, 10, 0.1);
}
.heading {
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 2rem;
}
.button {
  position: absolute;
  top: -0.9rem;
  right: -0.5rem;
  font-weight: bold;
}
</style>
