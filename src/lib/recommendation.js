import { ROLES } from './roles'

// ＝舊版＝：單選、等權重（保留以相容既有頁面）
export function scoreToRoles(answers){
  const map = {}
  Object.values(answers).forEach(r => { map[r] = (map[r]||0)+1 })
  return Object.entries(map)
    .map(([roleId, score])=>({ roleId, score, role: ROLES.find(r=>r.id===roleId) }))
    .sort((a,b)=>b.score-a.score)
    .slice(0,3)
}

// ＝新版＝：題組 + 多選 + 權重（answers: { [qid]: [ {roleId, weight}, ... ] } 或 { [qid]: roleId } 混用）
export function scoreWeighted(answers){
  const agg = Object.create(null)
  // 將多選陣列展平並累加權重；單選視為 weight=1
  Object.values(answers).forEach(val => {
    if (Array.isArray(val)) {
      val.forEach(({ roleId, weight }) => {
        const w = Number(weight || 1)
        agg[roleId] = (agg[roleId] || 0) + w
      })
    } else if (typeof val === 'string') {
      agg[val] = (agg[val] || 0) + 1
    }
  })
  const items = Object.entries(agg)
    .map(([roleId, score]) => ({ roleId, score, role: ROLES.find(r=>r.id===roleId) }))
    .sort((a,b)=> b.score - a.score)

  const max = Math.max(1, ...items.map(i => i.score))
  // 正規化 0~1（雷達圖用）
  const vector = ROLES.map(r => (agg[r.id] || 0) / max)

  return { ranked: items, vector }
}
