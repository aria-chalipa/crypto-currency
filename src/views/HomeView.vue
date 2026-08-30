<script setup>
const features = [
  {
    icon: '◈',
    title: 'Real-time markets',
    description: 'Track live prices across every asset you hold, updated the moment things move.',
  },
  {
    icon: '◇',
    title: 'Unified portfolio',
    description: 'See every holding, gain, and loss in one clean dashboard built for clarity.',
  },
  {
    icon: '⚙',
    title: 'Full control',
    description: 'Manage your account, security, and preferences without digging through menus.',
  },
]
</script>

<template>
  <main class="relative min-h-screen overflow-hidden bg-slate-950 text-white">
    <div
      class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
    ></div>

    <div class="relative z-10 mx-auto flex max-w-6xl flex-col px-6 sm:px-10 lg:px-16">
      <header class="flex items-center justify-between py-6">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-bold text-slate-950"
          >
            C
          </div>
          <span class="text-lg font-semibold tracking-tight">Coinfolio</span>
        </div>
        <nav class="flex items-center gap-3">
          <router-link
            to="/login"
            class="rounded-xl border border-transparent px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
          >
            Log in
          </router-link>
          <router-link
            to="/signup"
            class="rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950 active:translate-y-0"
          >
            Sign up
          </router-link>
        </nav>
      </header>

      <section class="flex flex-1 flex-col items-center py-16 text-center sm:py-24">
        <p class="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">
          Your wealth, in motion
        </p>
        <h1 class="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Make every market move count.
        </h1>
        <p class="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
          A clearer way to follow your portfolio, discover opportunities, and stay close to the
          numbers that matter.
        </p>

        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <router-link
            to="/signup"
            class="group  flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/20 transition hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-xl hover:shadow-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950 active:translate-y-0"
          >
            Get started
          </router-link>
          <router-link
            to="/login"
            class="rounded-xl m-2 border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-slate-950 active:translate-y-0"
          >
            already have an account
          </router-link>
        </div>

        <div class="mt-8 flex items-center gap-3 text-sm text-slate-400">
          <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/70"></span>
          Markets are live
        </div>
      </section>

      <section class="grid gap-5 pb-20 sm:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-2xl border border-white/10 bg-white/6 p-6 text-left shadow-2xl shadow-black/30 backdrop-blur-xl"
        >
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-lg text-emerald-300"
          >
            {{ feature.icon }}
          </span>
          <h3 class="mt-4 text-base font-semibold tracking-tight">{{ feature.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-400">{{ feature.description }}</p>
        </div>
      </section>
    </div>
  </main>
</template>
