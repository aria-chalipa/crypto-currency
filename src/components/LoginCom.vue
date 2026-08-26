<script setup>
import { ref } from 'vue';
import axios from '../axios/axios.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user.js';


const router = useRouter();
const userStore = useUserStore();
const users = ref([]);
const username = ref('');
const password = ref('');
const email = ref('')
const success = ref(null);
const error = ref(null);
const isLoading = ref(false);

async function login() {
    isLoading.value = true;
    success.value = null;
    error.value = null;
    try{
        const res = await axios.get ('/users')
        users.value = res.data;
        const foundUser = users.value.find(user => user.name === username.value && user.password === password.value && user.email === email.value);
        if (foundUser) {
            success.value = 'Login successful';
            localStorage.setItem('user', JSON.stringify(foundUser));
            userStore.setUser(foundUser);
            await router.push(`/dashboard/${foundUser.id}`);
        } else {
            error.value = 'Invalid username, email or password';
        }
    } catch (err) {
        error.value = 'something went wrong';
        console.error(err);
    } finally {
        isLoading.value = false;
        username.value = '';
        password.value = '';
        email.value = '';
    }
}
</script>

<template>
    <main class="relative flex min-h-screen overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-10 lg:px-16">
        <div class="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"></div>
        <div class="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"></div>

        <div class="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center">
            <div class="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
                <section class="hidden flex-col justify-between border-r border-white/10 p-12 lg:flex">
                    <div>
                        <div class="mb-16 flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-bold text-slate-950">C</div>
                            <span class="text-lg font-semibold tracking-tight">Coinfolio</span>
                        </div>
                        <p class="mb-5 max-w-md text-sm font-medium uppercase tracking-[0.25em] text-emerald-300">Your wealth, in motion</p>
                        <h1 class="max-w-lg text-5xl font-semibold leading-tight tracking-tight text-white">Make every market move count.</h1>
                        <p class="mt-6 max-w-md text-base leading-7 text-slate-300">A clearer way to follow your portfolio, discover opportunities, and stay close to the numbers that matter.</p>
                    </div>
                    <div class="flex items-center gap-3 text-sm text-slate-400">
                        <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/70"></span>
                        Markets are live
                    </div>
                </section>

                <section class="p-7 sm:p-12">
                    <div class="mb-10 lg:hidden">
                        <div class="flex items-center gap-3">
                            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-bold text-slate-950">C</div>
                            <span class="text-lg font-semibold tracking-tight">Coinfolio</span>
                        </div>
                    </div>

                    <div class="mb-8">
                        <p class="mb-3 text-sm font-medium text-emerald-300">Welcome back</p>
                        <h2 class="text-3xl font-semibold tracking-tight">Log in to your account</h2>
                        <p class="mt-3 text-sm leading-6 text-slate-400">Pick up where you left off in your portfolio.</p>
                    </div>

                    <form class="space-y-5" @submit.prevent="login">
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-200" for="username">Username</label>
                            <input id="username" v-model="username" class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="text" placeholder="Enter your username" autocomplete="username" required />
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-200" for="email">email</label>
                            <input id="password" v-model="email" class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="email" placeholder="Enter your email" autocomplete="current-password" required />
                        </div>
                        <div>
                            <label class="mb-2 block text-sm font-medium text-slate-200" for="password">Password</label>
                            <input id="password" v-model="password" class="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20" type="password" placeholder="Enter your password" autocomplete="current-password" required />
                        </div>

                        <p v-if="error" class="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{{ error }}</p>
                        <p v-if="success" class="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200" role="status">Login successful.</p>

                        <button class="w-full rounded-xl bg-emerald-400 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60" type="submit" :disabled="isLoading">
                            {{ isLoading ? 'Logging in...' : 'Log in' }}
                        </button>
                    </form>

                    <p class="mt-8 text-center text-xs leading-5 text-slate-500">By continuing, you agree to our terms and privacy policy.</p>
                    <button @click="router.push('/signup')" class="mt-4 w-full rounded-xl bg-slate-800 px-4 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60" type="button">
                        Sign Up
                    </button>
                </section>
            </div>
        </div>
    </main>
</template>