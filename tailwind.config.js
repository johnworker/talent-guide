// 新增：
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: ['./index.html','./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: { primary:'#0ea5e9', ink:'#0f172a', accent:'#a78bfa' },
      boxShadow: { soft:'0 10px 30px -12px rgba(2, 6, 23, .18)', glow:'0 0 0 1px rgba(14,165,233,.15), 0 10px 30px -12px rgba(14,165,233,.35)' },
      keyframes:{ float:{'0%,100%':{transform:'translateY(-2%)'},'50%':{transform:'translateY(2%)'}}, marquee:{'0%':{transform:'translateX(0)'},'100%':{transform:'translateX(-50%)'}} },
      animation:{ float:'float 6s ease-in-out infinite', marquee:'marquee 30s linear infinite' },
      backgroundImage:{ 'radial-fade':'radial-gradient(1200px 600px at 50% -10%, rgba(14,165,233,.20), transparent 60%)' }
    }
  },
  plugins: [typography, forms, lineClamp],
}
