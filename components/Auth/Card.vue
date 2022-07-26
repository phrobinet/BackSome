<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useProfileStore } from '../../store/profileStore';
import { useStorage } from '@vueuse/core';
const { signUp, signIn, signOut, user } = useAuth();
const { getUser } = useProfileUrl();

const authState = ref<'Login' | 'Signup'>('Login');
const authErrorMessage = ref('');
const profileStore = useProfileStore();
const showConfirmationEmail = ref(false);
const router = useRouter();

const input = reactive({
  password: '',
  email: '',
});

const toggleAuthState = () => {
  if (authState.value === 'Login') authState.value = 'Signup';
  else authState.value = 'Login';
};

const handlerSubmit = async () => {
  try {
    if (authState.value === 'Login') {
      console.log('enter Card/Login');
      await signIn({ email: input.email, password: input.password });
      const user = await getUser(input.email);
      profileStore.addUser(user);
      useStorage('backStorage', input.email);
      router.push('/profile');
    } else {
      await signUp({ email: input.email, password: input.password });
      showConfirmationEmail.value = true;
    }

    input.email = '';
    input.password = '';
  } catch (error) {
    authErrorMessage.value = error.message;
  }
};

const logout = () => {
  signOut();
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center mx-auto my-5 max-w-lg rounded-lg bg-gray-100 py-7 px-6 shadow-xl ring-1 ring-purple-400 ring-offset-2"
  >
    <div
      v-if="!showConfirmationEmail"
      class="flex flex-col justify-center items-center"
    >
      <h1 class="mb-4">{{ authState }}</h1>
      <input
        class="mb-3 border-2 border-zinc-500 rounded-xl px-4 py-2"
        type="text"
        placeholder="Email"
        v-model="input.email"
      />
      <input
        class="mb-3 border-2 border-zinc-500 rounded-xl px-4 py-2"
        type="password"
        placeholder="Password"
        v-model="input.password"
      />
      <p v-if="authErrorMessage" class="text-sm text-red-500">
        {{ authErrorMessage }}
      </p>
      <button
        @click.prevent="handlerSubmit"
        class="gradient py-4 px-3 w-2/3 rounded-xl bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
      >
        {{ authState === 'Login' ? 'Login' : 'Submit' }}
      </button>

      <button
        @click.prevent="logout"
        v-if="user"
        class="py-4 px-3 w-2/3 mt-4 bg-gradient-to-r from-teal-300 via-sky-500 to-purple-500 rounded-xl hover:shadow-xl hover:ring-1 hover:ring-purple-400 hover:ring-offset-2"
      >
        Logout
      </button>
      <p class="cursor-pointer" @click="toggleAuthState">
        {{
          authState === 'Login'
            ? "Don't have an account? Create one now"
            : 'Already have an account? Go ahead an log in'
        }}
      </p>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
      <h1 class="mb-4">Check email for confirmation</h1>
    </div>
  </div>
</template>
