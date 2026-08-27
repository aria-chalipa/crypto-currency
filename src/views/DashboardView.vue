<script setup>
import { useUserStore } from '../stores/user.js'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

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
    <aside class="hidden w-64 shrink-0 border-r border-white/10 bg-[#0a1917] p-6 lg:block">
      <div class="flex items-center gap-3">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-300 font-black text-[#071312]"
          >C</span
        ><span class="font-semibold">Coinfolio</span>
      </div>
      <nav class="mt-14 space-y-2">
        <router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-emerald-300 hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}`"
        >
          <span>◈</span> Overview </router-link
        ><router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}/portfolio`"
          ><span>◇</span> Portfolio </router-link
        ><router-link
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5"
          :to="`/dashboard/${userStore.user?.id}/settings`"
          ><span>⚙</span> Settings
        </router-link>
      </nav>
    </aside>
    <router-view />
  </main>
</template>
