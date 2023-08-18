<template>
  <div class="app container mx-auto px-4">
    <nav class="dark:bg-gray-700 rounded-lg text-3xl md:text-4xl flex justify-center py-2 mb-10">
      <RouterLink class="block mr-5" to="/">Home</RouterLink>
      <RouterLink class="block" to="/about">About</RouterLink>
    </nav>

    <router-view></router-view>
  </div>
</template>
