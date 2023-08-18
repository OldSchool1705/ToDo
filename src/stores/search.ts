import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    searchQuery: '',
    filteredPosts: [] as Array<any>, 
  }),
  actions: {
    setSearchQuery(newQuery: string) {
      this.searchQuery = newQuery;
    },
    setFilteredPosts(posts: Array<any>) {
      this.filteredPosts = posts;
    },
  },
});