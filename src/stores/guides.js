import { defineStore } from 'pinia'
import * as api from '@/lib/api'


export const useGuideStore = defineStore('guides', {
state: () => ({
items: [],
loading: false,
}),
actions: {
async fetch() {
this.loading = true
this.items = await api.listGuides()
this.loading = false
},
async create(payload) {
const g = await api.createGuide(payload)
this.items.unshift(g)
return g
},
async update(id, payload) {
const g = await api.updateGuide(id, payload)
const i = this.items.findIndex(x => x.id === id)
if (i > -1) this.items[i] = g
return g
},
async remove(id) {
await api.deleteGuide(id)
this.items = this.items.filter(x => x.id !== id)
},
},
})