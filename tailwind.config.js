/** @type {import('tailwindcss').Config} */
export default {
content: [
'./index.html',
'./src/**/*.{vue,js,ts,jsx,tsx}',
],
theme: {
extend: {
colors: {
primary: '#0ea5e9', // 天藍
ink: '#0f172a',
},
},
},
plugins: [],
}