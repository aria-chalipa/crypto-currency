<script setup>
import { ref } from 'vue'
import useTheme from '@/compositions/useTheme.js'
import axios from '@/axios/axios.js';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js'
import ModalCom from '../ModalCom.vue'

const { theme, toggleTheme } = useTheme()
const router = useRouter()
const userStore = useUserStore()

const showDeleteModal = ref(false)
const isDeleting = ref(false)
const deleteError = ref('')

function closeDeleteModal() {
  if (isDeleting.value) return
  showDeleteModal.value = false
  deleteError.value = ''
}

function finishAccountDeletion() {
  userStore.clearUser()
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/signup')
}

async function handelDeleteUser() {
  const savedUser = localStorage.getItem('user')
  const userId = savedUser ? JSON.parse(savedUser).id : userStore.user?.id

  if (!userId) {
    finishAccountDeletion()
    return
  }

  isDeleting.value = true
  deleteError.value = ''
  try {
    await axios.delete(`/users/${userId}`)
    finishAccountDeletion()
  } catch (error) {
    if (error.response?.status === 404) {
      finishAccountDeletion()
      return
    }
    console.error('Error deleting user:', error)
    deleteError.value = 'An error occurred while trying to delete your account. Please try again later.'
  } finally {
    isDeleting.value = false
  }
}
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

    <div
      class="mt-8 flex max-w-xl items-center justify-between rounded-2xl border border-[#c65e5e]/30 bg-[#231510] p-6 sm:p-8"
    >
      <div>
        <p class="text-sm font-medium text-[#e08787]">Delete account</p>
        <p class="mt-1 text-sm text-slate-500">
          Permanently delete your account and all of its data. This action cannot be undone.
        </p>
      </div>
      <button
        type="button"
        class="shrink-0 rounded-xl bg-[#c65e5e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d97070] focus:outline-none focus:ring-2 focus:ring-[#c65e5e] focus:ring-offset-2 focus:ring-offset-[#231510]"
        @click="showDeleteModal = true"
      >
        Delete account
      </button>
    </div>
  </section>

  <ModalCom :show="showDeleteModal" title="Delete account" @close="closeDeleteModal">
    <template #body>
      <p class="text-sm text-slate-400">
        Are you sure you want to delete your account? This action cannot be undone and all of your
        data will be permanently lost.
      </p>
      <p v-if="deleteError" class="mt-3 text-sm text-[#e08787]">{{ deleteError }}</p>
    </template>
    <template #footer>
      <button
        type="button"
        class="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
        :disabled="isDeleting"
        @click="closeDeleteModal"
      >
        Cancel
      </button>
      <button
        type="button"
        class="rounded-xl bg-[#c65e5e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d97070] focus:outline-none focus:ring-2 focus:ring-[#c65e5e] focus:ring-offset-2 focus:ring-offset-[#102320] disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="isDeleting"
        @click="handelDeleteUser"
      >
        {{ isDeleting ? 'Deleting...' : 'Delete account' }}
      </button>
    </template>
  </ModalCom>
</template>
