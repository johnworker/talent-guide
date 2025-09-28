import anti from '@/data/role-anti.json'
export function getAntidotes(roleId){ return anti.find(x=>x.role===roleId) || { role:roleId, scenes:[] } }
export function findBySignal(keyword){
  const k = keyword.toLowerCase()
  const res = []
  anti.forEach(r => r.scenes.forEach(s=>{
    if (s.signals.some(sig => sig.toLowerCase().includes(k))){
      res.push({ role:r.role, scene:s })
    }
  }))
  return res
}
