<script setup lang="ts">
const authState = ref<"Login" | "Signup">("Login");

const { signup, user } = useAuth();

const toggleAuthState = () => {
  if (authState.value === "Login") authState.value = "Signup";
  else authState.value = "Login";
};

const handlerSubmit = () => {
  console.log("click");

  signup({ email: "toto@toto.com", password: "azerty" });
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center mx-auto my-5 max-w-lg rounded-lg bg-gray-100 py-7 px-6 shadow-xl ring-1 ring-purple-400 ring-offset-2"
  >
    <h1 class="mb-4">{{ authState }}</h1>
    <input
      class="mb-3 border-2 border-zinc-500 rounded-xl px-4 py-2"
      type="text"
      placeholder="Email"
    />
    <input
      class="mb-3 border-2 border-zinc-500 rounded-xl px-4 py-2"
      type="password"
      placeholder="Password"
    />
    <button
      @click.prevent="handlerSubmit"
      class="bg-green-400 py-4 px-3 w-full border-2 border-green-600 rounded-xl"
    >
      {{ authState === "Login" ? "Login" : "Submit" }}
    </button>
    <p class="cursor-pointer" @click="toggleAuthState">
      {{
        authState === "Login"
          ? "Don't have an account? Create one now"
          : "Already have an account? Go ahead an log in"
      }}
    </p>
    <pre>
      {{ user }}
    </pre>
  </div>
</template>
