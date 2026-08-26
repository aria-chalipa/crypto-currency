<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import axios from '../axios/axios.js'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user || { name: 'Investor' })
const firstName = computed(() => user.value.name.charAt(0).toUpperCase() + user.value.name.slice(1))
const holdings = ref([])

async function handleHoldings(userId) {
  try {
    const res = await axios.get(`/users/${userId}`)
    holdings.value = res.data.holdings || []
  } catch (error) {
    console.error('Could not load holdings:', error)
  }
}
onMounted(async () => {
  const savedUser = localStorage.getItem('user')
  const parsedUser = savedUser ? JSON.parse(savedUser) : null

  if (parsedUser) {
    userStore.setUser(parsedUser)
    await handleHoldings(parsedUser.id)
  } else {
    router.push('/login')
  }
})

function logout() {
  userStore.clearUser()
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<template>
  <main class="min-h-screen bg-[#071312] text-white lg:flex">

    <section class="w-full px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
      <header class="flex items-center justify-between">
        <div>
          <p class="text-sm text-slate-400">Good morning, {{ firstName }}</p>
          <h1 class="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Your overview</h1>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:bg-white/5"
            aria-label="Notifications"
          >
            ♢</button
          ><button
            class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 font-semibold text-[#071312]"
            aria-label="Account settings"
          >
            {{ firstName.charAt(0) }}
          </button>
        </div>
      </header>

      <div class="mt-8 grid gap-5 xl:grid-cols-[1.45fr_0.8fr]">
        <div class="rounded-2xl border border-white/10 bg-[#102320] p-6 sm:p-8">
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-slate-400">Total portfolio value</p>
              <p class="mt-3 text-4xl font-semibold tracking-tight">$23,475.59</p>
              <p class="mt-3 text-sm text-emerald-300">
                +$1,248.22 <span class="text-slate-500">this month</span>
              </p>
            </div>
            <span class="text-3xl text-emerald-300">↗</span>
          </div>
          <div class="mt-10 flex h-40 items-end gap-2 border-b border-white/10 pb-3 sm:gap-3">
            <span
              v-for="height in [44, 58, 52, 76, 68, 88, 78, 112, 96, 126, 116, 142, 134, 156]"
              :key="height"
              class="flex-1 rounded-t bg-emerald-300/70"
              :style="{ height: `${height}px` }"
            ></span>
          </div>
          <div class="mt-4 flex justify-between text-xs text-slate-500">
            <span>May 01</span><span>Jun 01</span><span>Today</span>
          </div>
        </div>
        <div class="rounded-2xl border border-white/10 bg-emerald-300 p-6 text-[#071312]">
          <p class="text-sm font-medium text-emerald-950/70">Your performance</p>
          <p class="mt-4 text-4xl font-semibold">+18.42%</p>
          <p class="mt-3 text-sm leading-6 text-emerald-950/70">
            You are outperforming the market average this month.
          </p>
          <button
            class="mt-8 rounded-xl bg-[#071312] px-4 py-3 text-sm font-semibold text-emerald-200"
          >
            View analytics <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      <div class="mt-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">Your holdings</h2>
          <button class="text-sm text-emerald-300 transition hover:text-emerald-200">
            See all <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div class="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1c19]">
          <div
            v-for="holding in holdings"
            :key="holding.symbol"
            class="flex items-center justify-between border-b border-white/5 px-5 py-5 last:border-0 sm:px-6"
          >
            <div class="flex items-center gap-3">
              <span class="h-9 w-9 rounded-full" :class="holding.color"></span>
              <div>
                <p class="text-sm font-medium">{{ holding.name }}</p>
                <p class="text-xs text-slate-500">{{ holding.amount }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium">{{ holding.value }}</p>
              <p
                class="text-xs"
                :class="holding.change.startsWith('+') ? 'text-emerald-300' : 'text-rose-300'"
              >
                {{ holding.change }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        class="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5"
        @click="logout"
      >
        <span>↪</span> Log out
      </button>
    </section>
  </main>
</template>
