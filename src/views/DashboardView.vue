<script setup>
import { useUserStore } from '../stores/user.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const isSidebarOpen = ref(false)

onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  const parsedUser = savedUser ? JSON.parse(savedUser) : null

  if (parsedUser) {
    userStore.setUser(parsedUser)
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <main class="min-h-screen bg-[#071312] text-white lg:flex">
    <div class="mb-10">
          <button
      type="button"
      class="fixed left-4 top-2 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0a1917] text-emerald-300 lg:hidden"
      aria-label="Open menu"
      @click="isSidebarOpen = true"
    >
      ☰
    </button>

    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-black/60 lg:hidden"
      @click="isSidebarOpen = false"
    ></div>

    </div>
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 shrink-0 -translate-x-full border-r border-white/10 bg-[#0a1917] p-6 transition-transform duration-300 lg:static lg:z-auto lg:block lg:translate-x-0"
      :class="{ 'translate-x-0': isSidebarOpen }"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300 font-black text-[#071312]"
            >C</span
          ><span class="font-semibold">Coinfolio</span>
        </div>
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 lg:hidden"
          aria-label="Close menu"
          @click="isSidebarOpen = false"
        >
          ✕
        </button>
      </div>
      <nav class="mt-14 space-y-2">
        <router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}`"
          @click="isSidebarOpen = false"
        >
          <span>◈</span> Overview </router-link
        ><router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}/portfolio`"
          @click="isSidebarOpen = false"
          ><span>◇</span> Portfolio </router-link
        ><router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}/settings`"
          @click="isSidebarOpen = false"
          ><span>⚙</span> Settings
        </router-link>
      </nav>
    </aside>
    <router-view />
  </main>
</template>
