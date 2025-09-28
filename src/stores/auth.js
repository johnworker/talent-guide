import { defineStore } from 'pinia'
import * as api from '@/lib/api'


export const useAuthStore = defineStore('auth', {
state: () => ({
user: api.getCurrentUser(), // { id, name, email, role }
token: api.getToken(),
}),
getters: {
isAuthed: (s) => !!s.token,
},
actions: {
async login(email, password) {
const { user, token } = await api.login({ email, password })
this.user = user
this.token = token
},
async register(payload) {
const { user, token } = await api.register(payload)
this.user = user
this.token = token
},
logout() { api.logout(); this.user = null; this.token = null },
},
})