<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import currencyAxios from '../axios/currency-axios'
import ModalCom from './ModalCom.vue'

const router = useRouter()
const userId = ref(null)
const currencies = ref([])
const isLoading = ref(false)
const error = ref(null)
const showModal = ref(false)
const selectedCurrency = ref(null)
const amount = ref(0)
let totalValue = ref(0)

watch(amount, (newAmount) => {
  handelExchange()
})

async function getCurrencies() {
  isLoading.value = true
  error.value = null
  try {
    const res = await currencyAxios.get('/coins/markets', {
      params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 20, page: 1 },
    })
    currencies.value = res.data
  } catch (err) {
    error.value = 'Could not load market data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

function formatPrice(value) {
  return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

function formatMarketCap(value) {
  return value?.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 2 })
}

async function handelCurrency(name) {
  selectedCurrency.value = null
  try {
    const res = await currencyAxios.get(`/coins/markets`, {
      params: { vs_currency: 'usd', ids: name.toLowerCase() },
    })
    selectedCurrency.value = res.data[0]
    showModal.value = true
  } catch (err) {
    error.value = 'Could not load currency data'
    console.error(err)
  }
}

function handelExchange() {
  if (selectedCurrency.value) {
    totalValue = amount.value / selectedCurrency.value.current_price
  }
}

function handelHolds() {
  const savedUser = localStorage.getItem('user')
  const parsedUser = savedUser ? JSON.parse(savedUser) : null

  if (parsedUser && selectedCurrency.value) {
    const holding = {
      currency: selectedCurrency.value.name,
      amount: totalValue,
      price: selectedCurrency.value.current_price,
      img: selectedCurrency.value.image,
      change: selectedCurrency.value.price_change_percentage_24h,
    }

    const userHoldings = parsedUser.holdings || []
    userHoldings.push(holding)
    parsedUser.holdings = userHoldings
    localStorage.setItem('user', JSON.stringify(parsedUser))
    showModal.value = false
    router.push(`/dashboard/${parsedUser.id}`)
  }
}

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  const parsedUser = savedUser ? JSON.parse(savedUser) : null
  userId.value = parsedUser?.id ?? null
  getCurrencies()
})
</script>

<template>
  <main class="min-h-screen bg-[#071312] px-5 py-6 text-white sm:px-8 lg:px-12 lg:py-10">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-sm text-slate-400">Live prices</p>
        <h1 class="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Markets</h1>
      </div>
      <router-link
        :to="`/dashboard/${userId ?? ''}`"
        class="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5"
      >
        ← Dashboard
      </router-link>
    </header>

    <p
      v-if="error"
      class="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
    >
      {{ error }}
    </p>

    <div v-if="isLoading" class="mt-8 grid gap-3">
      <div
        v-for="n in 6"
        :key="n"
        class="h-16 animate-pulse rounded-2xl border border-white/10 bg-[#102320]"
      ></div>
    </div>

    <div v-else class="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1c19]">
      <div
        class="hidden grid-cols-[2fr_1fr_1fr_1fr] gap-4 border-b border-white/10 px-5 py-4 text-xs font-medium uppercase tracking-wide text-slate-500 sm:grid sm:px-6"
      >
        <span>Name</span>
        <span class="text-right">Price</span>
        <span class="text-right">24h</span>
        <span class="text-right">Market cap</span>
      </div>
      <div
        v-for="coin in currencies"
        :key="coin.id"
        class="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-white/5 px-5 py-4 last:border-0 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:px-6"
      >
        <div class="flex items-center gap-3">
          <img :src="coin.image" :alt="coin.name" class="h-8 w-8 rounded-full" />
          <div>
            <button @click="handelCurrency(coin.name)" type="button" class="text-sm font-medium">
              {{ coin.name }}
            </button>
            <p class="text-xs uppercase text-slate-500">{{ coin.symbol }}</p>
          </div>
        </div>
        <p class="text-right text-sm font-medium sm:text-sm">
          ${{ formatPrice(coin.current_price) }}
        </p>
        <p
          class="text-right text-sm font-medium"
          :class="coin.price_change_percentage_24h >= 0 ? 'text-emerald-300' : 'text-rose-300'"
        >
          {{ coin.price_change_percentage_24h >= 0 ? '+' : ''
          }}{{ coin.price_change_percentage_24h?.toFixed(2) }}%
        </p>
        <p class="hidden text-right text-sm text-slate-400 sm:block">
          ${{ formatMarketCap(coin.market_cap) }}
        </p>
      </div>
    </div>
    <ModalCom
      v-if="showModal && selectedCurrency"
      :show="showModal"
      :title="selectedCurrency.name"
      @close="showModal = false"
    >
      <template #body>
        <div>
          <p class="text-sm text-slate-400">Current Price</p>
          <p class="mt-1 text-lg font-semibold">
            ${{ formatPrice(selectedCurrency.current_price) }}
          </p>
          <p class="text-sm text-slate-400">last update</p>
          <p class="mt-1 text-lg font-semibold">{{ selectedCurrency.last_updated }}</p>
          <p class="text-sm text-slate-400">changed</p>
          <p
            class="mt-1 text-lg font-semibold"
            :class="
              selectedCurrency.price_change_percentage_24h >= 0
                ? 'text-emerald-300'
                : 'text-rose-300'
            "
          >
            {{ selectedCurrency.price_change_percentage_24h >= 0 ? '+' : ''
            }}{{ selectedCurrency.price_change_percentage_24h?.toFixed(2) }}%
          </p>
        </div>
      </template>
      <template #footer>
        <input
          type="number"
          placeholder="Enter USD amount"
          class="rounded-xl border border-white/10 bg-[#102320] px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-[#071312]"
          v-model="amount"
          @change="handelExchange"
        />
        <div>
          <p class="text-sm text-slate-400">Total Value</p>
          <p class="mt-1 text-lg font-semibold">
            {{ formatPrice(totalValue) }},{{ selectedCurrency.symbol.toUpperCase() }}
          </p>
        </div>
        <button type="button" @click="handelHolds">save</button>
      </template>
    </ModalCom>
  </main>
</template>
