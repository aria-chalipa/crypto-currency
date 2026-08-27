<script setup>
import axios from '@/axios/axios.js'
import { ref, onMounted, watch } from 'vue'
import ModalCom from '../ModalCom.vue'

const user = ref([])
const showModal = ref(false)
const currentPassword = ref('')
const currentPassErr = ref(false)
const disabled = ref(true)
const newPass = ref('')
const newPassConfirm = ref('')
const confirmPassErr = ref(false)

watch((currentPassword), () => {
  currentPassErr.value = false

})

function fetchUserData() {
  const savedUser = localStorage.getItem('user')
  const parsedUser = savedUser ? JSON.parse(savedUser) : null

  if (parsedUser) {
    user.value = parsedUser
  }
}

async function changeApiInfo(field, value) {
  try {
    await axios.put(`/users/${user.value.id}`, {
      name: user.value.name,
      lastname: user.value.lastname,
      email: user.value.email,
      password: user.value.password,
      [field]: value,
    })
    localStorage.setItem('user', JSON.stringify(user.value))
  } catch (err) {
    console.error('failed to update user info', err)
  }
}

function handelUserInfo(e) {
  const target = e.target
  if (target.name === 'name') {
    user.value.name = target.value
  } else if (target.name === 'lastname') {
    user.value.lastname = target.value
  } else if (target.name === 'email') {
    user.value.email = target.value
  }
  changeApiInfo(target.name, target.value)
}

function resetPasswordModal() {
  currentPassword.value = ''
  newPass.value = ''
  newPassConfirm.value = ''
  currentPassErr.value = false
  confirmPassErr.value = false
  disabled.value = true
}

function closePasswordModal() {
  showModal.value = false
  resetPasswordModal()
}

function handelNewPassword() {
  if (!newPass.value || newPass.value !== newPassConfirm.value) {
    confirmPassErr.value = true
    return
  }
  confirmPassErr.value = false
  user.value.password = newPass.value
  changeApiInfo('password', user.value.password)
  closePasswordModal()
}

function handelChangePassword() {
  if (disabled.value) {
    if (user.value.password !== currentPassword.value) {
      currentPassErr.value = true
      console.log(`${user.value.password} !== ${currentPassword.value}`)
      return
    }
    currentPassErr.value = false
    disabled.value = false
    return
  }
  handelNewPassword()
}
onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <section class="w-full px-5 py-6 text-white sm:px-8 lg:px-12 lg:py-10">
    <header>
      <p class="text-sm text-slate-400">Manage your details</p>
      <h1 class="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        Welcome, <span class="text-emerald-300">{{ user.name }}</span>
      </h1>
    </header>

    <div class="mt-8 max-w-xl rounded-2xl border border-white/10 bg-[#102320] p-6 sm:p-8">
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="name">First name</label>
          <input
            id="name"
            type="text"
            name="name"
            :placeholder="user.name"
            @change="handelUserInfo($event)"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="lastname">Last name</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            :placeholder="user.lastname"
            @change="handelUserInfo($event)"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            :placeholder="user.email"
            @change="handelUserInfo($event)"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
          />
        </div>
      </div>

      <label for="password" class="text-sm font-medium text-slate-300">password</label>
      <p
        class="mt-5 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
      >
        ********
      </p>
      <button
        type="button"
        class="mt-8 w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#102320]"
        @click="showModal = true"
      >
        Change password
      </button>
    </div>
  </section>
  <ModalCom :show="showModal" title="change password" @close="closePasswordModal">
    <template #body>
      <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="currentPassword"
            >Current password</label
          >
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            placeholder="Enter your current password"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            v-model="currentPassword"
          />
          <p v-if="currentPassErr" class="text-sm font-sm text-orange-700">
            password does'n mach the password
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="newPassword">New password</label>
          <input
            id="newPassword"
            type="password"
            name="newPassword"
            placeholder="Enter your new password"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            :disabled="disabled"
            v-model="newPass"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-slate-300" for="confirmNewPassword"
            >Confirm new password</label
          >
          <input
            id="confirmNewPassword"
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm your new password"
            class="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            :disabled="disabled"
            v-model="newPassConfirm"
          />
        </div>
        <p v-if="confirmPassErr" class="text-sm font-sm text-orange-700">
          passwords does't match with each other
        </p>
      </div>
    </template>
    <template #footer>
      <button
        type="button"
        class="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#102320]"
        @click="handelChangePassword"
      >
        {{ disabled ? 'Verify password' : 'Save changes' }}
      </button>
    </template>
  </ModalCom>
</template>
