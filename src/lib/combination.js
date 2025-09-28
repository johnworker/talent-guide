import combos from '@/data/role-combos.json'
import { ROLES } from './roles'

const id2 = id => ROLES.find(r=>r.id===id) || { id, name: id }
export function topCombos(top3){
  // top3: [{roleId, score}]
  const ids = top3.map(x=>x.roleId)
  return combos
    .map(c => ({ ...c,
      pairDetail: c.pair.map(id2),
      hitCount: c.pair.filter(p=>ids.includes(p)).length
    }))
    .sort((a,b)=> b.hitCount - a.hitCount )
}
export function suggestTrio(top3){
  if (!top3?.length) return null
  const base = top3.map(x=>x.roleId)
  const title = `三人小隊建議：${base.map(id=>id2(id).name).join(' × ')}`
  const team = base.map((id, idx)=>({ roleId:id, slot:['主攻','副攻','支援'][idx]||'支援', why:'依你的偏好排序建議分工' }))
  return { title, team }
}
