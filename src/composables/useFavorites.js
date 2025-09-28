// src/composables/useFavorites.js

function useFavorites(ns = 'tg') {
  const KEY = `${ns}:fav_guides`

  const get = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]')
    } catch {
      return []
    }
  }

  const set = (arr) => {
    localStorage.setItem(KEY, JSON.stringify(arr))
  }

  const isFav = (id) => get().includes(id)

  const toggle = (id) => {
    const arr = get()
    const i = arr.indexOf(id)
    if (i > -1) {
      arr.splice(i, 1)
    } else {
      arr.unshift(id)
    }
    set(arr)
    return arr
  }

  return { get, set, isFav, toggle }
}

// 同時提供 default 與 named export，讓兩種 import 寫法都可用
export default useFavorites
export { useFavorites }
