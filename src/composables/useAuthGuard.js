import { useAuthStore } from '@/stores/auth'
import { useRouter, useRoute } from 'vue-router'

export default function useAuthGuard(){
  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const ensure = () => {
    if (!auth.isAuthed) router.push({ name:'login', query:{ redirect: route.fullPath } })
  }
  return { ensure }
}
