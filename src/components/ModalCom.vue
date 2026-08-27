<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-md rounded-2xl border border-white/10 bg-[#102320] p-6 text-white shadow-2xl shadow-black/30 sm:p-8"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold tracking-tight">{{ title }}</h2>
          <button
            type="button"
            aria-label="Close"
            class="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
            @click="emit('close')"
          >
            ✕
          </button>
        </div>

        <div class="mt-4">
          <slot name="body" />
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>