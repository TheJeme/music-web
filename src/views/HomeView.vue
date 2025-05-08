<template>
  <div class="min-h-screen bg-[#121212]">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold mb-4 text-[#ECEDEE]">Music Link Share</h1>
          <p class="text-[#9BA1A6]">Share music across all platforms</p>
        </div>

        <div class="bg-[#1E1E1E] rounded-2xl p-8 shadow-xl">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="url" class="block text-sm font-medium text-[#9BA1A6] mb-2">Music URL</label>
              <input
                type="text"
                id="url"
                v-model="url"
                placeholder="Paste your music link here..."
                class="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] text-[#ECEDEE] placeholder-[#9BA1A6] focus:outline-none focus:ring-2 focus:ring-[#03050a]"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-[#03050a] text-white py-3 px-6 rounded-xl hover:bg-opacity-90 transition-colors duration-200"
              :disabled="loading"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Share Music</span>
            </button>
          </form>

          <div v-if="error" class="mt-4 p-4 bg-[#2A2A2A] rounded-xl text-[#CF6679]">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const url = ref('')
const loading = ref(false)
const error = ref(null)

const handleSubmit = async () => {
  try {
    loading.value = true
    
    // First, get the song.link data
    const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url.value)}`)
    const data = await response.json()
    
    if (!data.pageUrl) {
      throw new Error('Invalid music URL')
    }
    
    // Extract the ID from the song.link pageUrl
    const match = data.pageUrl.match(/song\.link\/s\/([^/?]+)/)
    if (!match) {
      throw new Error('Could not extract song ID')
    }
    
    const songId = match[1]
    router.push(`/${songId}`)
  } catch (err) {
    console.error('Error:', err)
    error.value = 'Invalid music URL. Please try again.'
  } finally {
    loading.value = false
  }
}
</script> 