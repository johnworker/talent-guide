import ClipboardJS from 'clipboard'
import { toast } from 'vue3-toastify'


export default function useClipboard(){
const copy = (text) => {
const tempBtn = document.createElement('button')
tempBtn.setAttribute('data-clipboard-text', text)
document.body.appendChild(tempBtn)
const c = new ClipboardJS(tempBtn)
tempBtn.click()
c.on('success', ()=> toast.success('已複製到剪貼簿'))
c.on('error', ()=> toast.error('複製失敗'))
setTimeout(()=>{ c.destroy(); tempBtn.remove() }, 0)
}
return { copy }
}