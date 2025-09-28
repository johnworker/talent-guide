export function useLocalStore(ns='tg'){
  const get = (k, d=[]) => JSON.parse(localStorage.getItem(`${ns}:${k}`) || JSON.stringify(d))
  const set = (k, v) => localStorage.setItem(`${ns}:${k}`, JSON.stringify(v))
  const toggleSet = (k, item, idKey='id') => {
    const arr = get(k, [])
    const i = arr.findIndex(x => x[idKey] ? x[idKey]===item[idKey] : JSON.stringify(x)===JSON.stringify(item))
    if (i>-1) arr.splice(i,1); else arr.unshift(item)
    set(k, arr); return arr
  }
  return { get, set, toggleSet }
}
