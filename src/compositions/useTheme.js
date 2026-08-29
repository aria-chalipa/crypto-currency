import { ref } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'dark')
applyTheme(theme.value)

function applyTheme(value) {
  document.documentElement.classList.toggle('dark', value === 'dark')
  document.documentElement.classList.toggle('light', value === 'light')
}

export default function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', theme.value)
    applyTheme(theme.value)
  }

  return { theme, toggleTheme }
}
