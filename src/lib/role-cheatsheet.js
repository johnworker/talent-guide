import { ROLES } from './roles'
export function toCSV(){
  const head = 'id,name,intro,keywords\n'
  const body = ROLES.map(r => [r.id, r.name, r.intro, r.keywords.join(' ')].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
  return head + body
}
