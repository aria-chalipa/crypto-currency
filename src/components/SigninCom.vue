<script setup>
import { ref } from 'vue'
import axios from '../axios/axios.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const lastName = ref('')
const password = ref('')
const email = ref('')
const success = ref(null)
const error = ref(null)
const isLoading = ref(false)

async function handleRepeatedEmail() {
    try {
        const res = await axios.get('/users')
        const users = res.data
        const foundUser = users.find(user => user.email === email.value)
        if (foundUser) {
            error.value = 'Email already exists'
            return true
        }
    } catch (err) {
        error.value = 'something went wrong'
        console.error(err)
    }
    return false
}

async function signIn() {
  isLoading.value = true
  success.value = null
  error.value = null
  try {
    const emailExists = await handleRepeatedEmail()
    if (emailExists) {
      return
    }
    const res = await axios.post('/users', {
      name: name.value,
      lastname: lastName.value,
      password: password.value,
      email: email.value,
    })
    success.value = 'account created successfully'
    await router.push('/login')
  } catch (err) {
    error.value = 'something went wrong'
    console.error(err)
  } finally {
    isLoading.value = false
    name.value = ''
    lastName.value = ''
    password.value = ''
    email.value = ''
  }
}
</script>

<template>
  <main
    class="relative flex min-h-screen items-center overflow-hidden bg-[#08110f] px-5 py-8 text-white sm:px-8 lg:px-12"
  >
    <div
      class="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
    ></div>
    <div
      class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl"
    ></div>

    <div
      class="relative z-10 mx-auto grid w-full max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]"
    >
      <section
        class="hidden flex-col justify-between border-r border-white/10 bg-emerald-400 p-10 text-[#08110f] lg:flex xl:p-14"
      >
        <div class="flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#08110f] text-lg font-bold text-emerald-300"
            >C</span
          >
          <span class="font-semibold tracking-tight">Coinfolio</span>
        </div>

        <div>
          <p class="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#315c4d]">
            A sharper view of wealth
          </p>
          <h1 class="max-w-sm text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
            Start building your next move.
          </h1>
          <p class="mt-6 max-w-sm text-sm leading-6 text-[#315c4d]">
            Track the markets that matter and keep your portfolio close at hand.
          </p>
        </div>

        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-[#315c4d]">
          Markets are live
        </p>
      </section>

      <section class="p-7 sm:p-12 lg:p-14">
        <div class="mb-10 flex items-center gap-3 lg:hidden">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-lg font-bold text-[#08110f]"
            >C</span
          >
          <span class="font-semibold tracking-tight">Coinfolio</span>
        </div>

        <div class="mb-8">
          <p class="mb-3 text-sm font-medium text-emerald-300">Create your account</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em]">Join Coinfolio</h2>
          <p class="mt-3 text-sm leading-6 text-slate-400">
            Your portfolio deserves a clearer home.
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="signIn">
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-200" for="name"
                >First name</label
              >
              <input
                id="name"
                v-model="name"
                class="w-full rounded-xl border border-white/10 bg-[#0b1916] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                type="text"
                placeholder="Aria"
                autocomplete="given-name"
                required
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-200" for="last-name"
                >Last name</label
              >
              <input
                id="last-name"
                v-model="lastName"
                class="w-full rounded-xl border border-white/10 bg-[#0b1916] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                type="text"
                placeholder="Chalipa"
                autocomplete="family-name"
                required
              />
            </div>
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-200" for="email"
              >Email address</label
            >
            <input
              id="email"
              v-model="email"
              class="w-full rounded-xl border border-white/10 bg-[#0b1916] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
            />
          </div>
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-200" for="password"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              class="w-full rounded-xl border border-white/10 bg-[#0b1916] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
              type="password"
              placeholder="At least 6 characters"
              minlength="6"
              autocomplete="new-password"
              required
            />
          </div>

          <p
            v-if="error"
            class="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {{ error }}
          </p>
          <p
            v-if="success"
            class="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
            role="status"
          >
            Account created successfully.
          </p>

          <button
            class="w-full rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-semibold text-[#08110f] transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#08110f] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="mt-8 text-center text-xs leading-5 text-slate-500">
          By continuing, you agree to our terms and privacy policy.
        </p>
      </section>
    </div>
  </main>
</template>
