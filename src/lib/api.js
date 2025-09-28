// src/lib/api.js
import sampleGuides from '@/data/guides.sample.json'


// ---- 基本工具 ----
var LS = {
  users: 'tg_users',
  guides: 'tg_guides',
  token: 'tg_token',
  me: 'tg_me',
};

function sleep(ms) {
  if (typeof ms !== 'number') ms = 400;
  return new Promise(function (r) { setTimeout(r, ms); });
}

function read(k, d) {
  try {
    var raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : (d || []);
  } catch (e) {
    return d || [];
  }
}

function write(k, v) {
  localStorage.setItem(k, JSON.stringify(v));
}

// 安全的 UUID（優先用原生，否則退回隨機字串）
function safeUUID() {
  try {
    if (window && window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
  } catch (_) {}
  // fallback
  var t = Date.now();
  var r = Math.random() * 1e9 | 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var v = (t + r) % 16 | 0;
    t = Math.floor(t / 16);
    return (c === 'x' ? v : (v & 0x3 | 0x8)).toString(16);
  });
}

// ---- Auth ----
export function getToken() {
  return localStorage.getItem(LS.token);
}

export function getCurrentUser() {
  var raw = localStorage.getItem(LS.me);
  return raw ? JSON.parse(raw) : null;
}

export async function register(payload) {
  await sleep(300);
  var name = payload && payload.name ? payload.name : '';
  var email = payload && payload.email ? payload.email : '';
  var password = payload && payload.password ? payload.password : '';

  var users = read(LS.users, []);
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      throw new Error('此 Email 已註冊');
    }
  }

  var user = {
    id: safeUUID(),
    name: name,
    email: email,
    role: 'member',
    createdAt: Date.now()
  };
  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    password: password
  });
  write(LS.users, users);

  var token = btoa(user.id + '.' + email + '.' + Date.now());
  localStorage.setItem(LS.token, token);
  localStorage.setItem(LS.me, JSON.stringify(user));
  return { user: user, token: token };
}

export async function login(payload) {
  await sleep(300);
  var email = payload && payload.email ? payload.email : '';
  var password = payload && payload.password ? payload.password : '';
  var users = read(LS.users, []);

  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      found = users[i]; break;
    }
  }
  if (!found) throw new Error('帳號或密碼錯誤');

  var user = {
    id: found.id,
    name: found.name,
    email: found.email,
    role: found.role,
    createdAt: found.createdAt
  };
  var token = btoa(user.id + '.' + email + '.' + Date.now());
  localStorage.setItem(LS.token, token);
  localStorage.setItem(LS.me, JSON.stringify(user));
  return { user: user, token: token };
}

export function logout() {
  localStorage.removeItem(LS.token);
  localStorage.removeItem(LS.me);
}

// ---- Guides CRUD ----
export async function listGuides() {
  await sleep(200);
  var arr = read(LS.guides, []);
  arr.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
  return arr;
}

export async function getGuide(id) {
  await sleep(150);
  var arr = read(LS.guides, []);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return arr[i];
  }
  return null;
}

// ✅ Guides CRUD 區：在 createGuide 回傳物件加入預設欄位（避免 undefined）
export async function createGuide(payload){
  await sleep();
  const guides = read(LS.guides)
  const g = {
    id: crypto.randomUUID(),
    title: payload.title,
    content: payload.content,
    roleIds: payload.roleIds || [],
    tags: payload.tags || [],
    views: 0,
    likes: 0,
    author: getCurrentUser(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  guides.push(g)
  write(LS.guides, guides)
  return g
}

// ✅ 便捷操作：點讚 / 訪問數（Explore/Guides 會用）
export async function likeGuide(id){
  await sleep(120)
  const guides = read(LS.guides)
  const i = guides.findIndex(g=>g.id===id)
  if (i>-1) { guides[i].likes = (guides[i].likes||0)+1; write(LS.guides, guides); return guides[i] }
  throw new Error('找不到資料')
}
export async function viewGuide(id){
  const guides = read(LS.guides)
  const i = guides.findIndex(g=>g.id===id)
  if (i>-1) { guides[i].views = (guides[i].views||0)+1; write(LS.guides, guides) }
}

// ✅ 取得所有 tags（Guides 篩選用）
export async function listTags(){
  await sleep(80)
  const all = read(LS.guides)
  const set = new Set()
  all.forEach(g => (g.tags||[]).forEach(t => set.add(t)))
  return Array.from(set)
}

export async function updateGuide(id, payload) {
  await sleep(250);
  var guides = read(LS.guides, []);
  var idx = -1;
  for (var i = 0; i < guides.length; i++) {
    if (guides[i].id === id) { idx = i; break; }
  }
  if (idx === -1) throw new Error('找不到資料');

  var old = guides[idx];
  guides[idx] = {
    id: old.id,
    title: (payload && payload.title != null) ? payload.title : old.title,
    content: (payload && payload.content != null) ? payload.content : old.content,
    roleIds: (payload && payload.roleIds != null) ? payload.roleIds : old.roleIds,
    author: old.author,
    createdAt: old.createdAt,
    updatedAt: Date.now()
  };
  write(LS.guides, guides);
  return guides[idx];
}

export async function deleteGuide(id) {
  await sleep(200);
  var arr = read(LS.guides, []);
  var next = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id !== id) next.push(arr[i]);
  }
  write(LS.guides, next);
}

// ---- 一次性初始化 ----
(function seed(){
  if (!localStorage.getItem(LS.guides)) write(LS.guides, sampleGuides) // 首次有內容
  if (!localStorage.getItem(LS.users)) write(LS.users, [])
})()
