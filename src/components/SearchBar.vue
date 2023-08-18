<template>
  <div>
    <div class="mb-10">
      <label for="search" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
      <input
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event.target.value)"
        type="text"
        id="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search posts..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
const { searchQuery } = defineProps(['searchQuery'])

watch(searchQuery, (newQuery: string) => {
  searchStore.setSearchQuery(newQuery)
})
</script>
