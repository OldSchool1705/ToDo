<template>
  <div >
    <AuthorFilter :authors="uniqueAuthors" :selectedAuthorId="selectedAuthorId"
      @update:selectedAuthorId="updateSelectedAuthorId" />
    <SearchBar v-model:searchQuery="searchQuery" />
    <ul class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      <li v-for="post in paginatedFilteredPosts" :key="post.id"
        class="border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 p-3 md:p-10 text-1xl bg-gray-50 dark:bg-gray-700">
        <h3 class="text-1xl font-bold mb-5">
          {{ post.id }} {{ post.title }} by {{ getAuthorName(post.userId) }}
        </h3>
        <p class="text-sm md:text-1xl">{{ post.body }}</p>
      </li>
    </ul>
    <div class="inline-flex mt-6">
      <button @click="prevPage" :disabled="currentPage === 1" type="button"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l mr-5">
        Prev
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages" type="button"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue'
import AuthorFilter from './AuthorFilter.vue'
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue'
import { usePostsStore } from '@/stores/posts'
import type { Post } from '../interface/interface'


const props = defineProps({
  authors: Array,
  selectedAuthorId: Number
})

const postsStore = usePostsStore()

const searchQuery = ref('')
const selectedAuthorId = ref(props.selectedAuthorId)
const currentPage = ref(1)
const itemsPerPage = 8

onMounted(async () => {
  await postsStore.fetchPostsAndAuthors()
})

const updateSelectedAuthorId = (newAuthorId: number) => {
  selectedAuthorId.value = newAuthorId
  currentPage.value = 1
}

const filteredPosts = computed(() => {
  let filtered: Post[] = postsStore.posts

  if (selectedAuthorId.value) {
    filtered = filtered.filter((post: Post) => post.userId === selectedAuthorId.value)
  }

  if (searchQuery.value) {
    const search = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (post: Post) =>
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search)
    )
  }

  return filtered
})

const paginatedFilteredPosts = computed<Post[]>(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return filteredPosts.value.slice(startIndex, endIndex)
})

const uniqueAuthors = computed(() => {
  const authorSet = new Set()
  postsStore.posts.forEach((post: Post) => {
    if (post.author) {
      authorSet.add(post.author.id);
    }
  });
  return Array.from(authorSet).map((authorId) => {
    const post = postsStore.posts.find((post) => post.author?.id === authorId) as Post | undefined;
    return post ? post.author : undefined;
  })
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / itemsPerPage))

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1
  }
}

function getAuthorName(userId: number) {
  const post = postsStore.posts.find((post) => post.author?.id === userId)
  const author = post?.author
  return author ? author.name : 'Unknown'
}

</script>
