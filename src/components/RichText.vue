<template>
<div>
<div class="mb-2 flex flex-wrap gap-2">
<button class="btn-outline" @click="editor?.chain().focus().toggleBold().run()">粗體</button>
<button class="btn-outline" @click="editor?.chain().focus().toggleItalic().run()">斜體</button>
<button class="btn-outline" @click="editor?.chain().focus().toggleBulletList().run()">清單</button>
</div>
<EditorContent :editor="editor" class="prose max-w-none" />
</div>
</template>
<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
const editor = useEditor({ extensions: [StarterKit], content: props.modelValue || '<p>請開始撰寫...</p>' })
watch(() => editor?.value?.getHTML(), html => emit('update:modelValue', html))
onBeforeUnmount(() => editor?.value?.destroy())
</script>