<script setup>
import useTheme from '@/compositions/useTheme.js'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <section class="w-full px-5 py-6 text-white sm:px-8 lg:px-12 lg:py-10">
    <header>
      <p class="text-sm text-slate-400">Manage your preferences</p>
      <h1 class="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
    </header>

    <div
      class="mt-8 flex max-w-xl items-center justify-between rounded-2xl border border-white/10 bg-[#102320] p-6 sm:p-8"
    >
      <div>
        <p class="text-sm font-medium text-slate-300">Theme</p>
        <p class="mt-1 text-sm text-slate-500">Currently using {{ theme }} mode.</p>
      </div>
      <button
        type="button"
        @click="toggleTheme"
        class="rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#102320]"
      >
        Switch to {{ theme === 'dark' ? 'light' : 'dark' }} mode
      </button>
    </div>
  </section>
</template>
