<template>
  <div>
    <label for="authors" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      Select an option
    </label>
    <select
      v-model="selectedAuthorId"
      id="authors"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @change="handleAuthorChange"
    >
      <option value="">All Authors</option>
      <option v-for="author in authors" :key="author.id" :value="author.id">
        {{ author.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  authors: Array,
  selectedAuthorId: Number
})

const emit = defineEmits()

const selectedAuthorId = ref(props.selectedAuthorId || '')

const handleAuthorChange = () => {
  emit('update:selectedAuthorId', selectedAuthorId.value)
}
</script>
