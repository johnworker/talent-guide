import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', {
  state: () => ({ loading: false, dark: false }),
  actions: {
    setLoading(v){ this.loading = !!v },
    toggleDark(){ this.dark = !this.dark; document.documentElement.classList.toggle('dark', this.dark) },
  }
})
