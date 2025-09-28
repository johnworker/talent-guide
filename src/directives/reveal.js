export default {
  mounted(el, binding){
    const dist = binding.value?.y ?? 16
    el.style.opacity = 0
    el.style.transform = `translateY(${dist}px)`
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          el.style.transition = 'opacity .5s ease, transform .5s ease'
          el.style.opacity = 1
          el.style.transform = 'translateY(0)'
          io.disconnect()
        }
      })
    },{ threshold:.15 })
    io.observe(el)
  }
}
