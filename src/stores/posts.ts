import { defineStore } from 'pinia'
import axios from 'axios'
import type { Post, Author } from '../interface/interface'

export const usePostsStore = defineStore('posts', {

  state: () => ({
    posts: [],
    searchQuery: ''
  }),
  actions: {
    async fetchPostsAndAuthors() {
      const [postsResponse, authorsResponse] = await Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/users')
      ])

      this.posts = postsResponse.data.map((post: Post) => {
        const author = authorsResponse.data.find((author: Author) => author.id === post.userId)
      
        return { ...post, author }
      })
    },
    setSearchQuery(newQuery: string) {
      this.searchQuery = newQuery
    }
  }
})
