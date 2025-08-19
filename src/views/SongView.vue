<template>
  <div class="min-h-screen bg-[#121212]">
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#03050a]"></div>
      </div>
      
      <div v-else-if="error" class="text-center text-[#CF6679] py-8">
        {{ error }}
      </div>
      
      <div v-else-if="songData" class="max-w-2xl mx-auto">
        <div class="bg-[#1E1E1E] rounded-2xl p-8 shadow-xl">
          <div class="flex flex-col items-center space-y-6">
            <img
              :src="songData.thumbnailUrl"
              :alt="songData.title"
              class="w-64 h-64 rounded-xl shadow-lg"
            />
            
            <div class="text-center">
              <h1 class="text-2xl font-bold mb-2 text-[#ECEDEE]">{{ songData.title }}</h1>
              <p class="text-[#9BA1A6]">{{ songData.artistName }}</p>
            </div>

            <!-- YouTube Video Embed -->
            <div v-if="songData.linksByPlatform.youtube" class="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <iframe
                :src="`https://www.youtube.com/embed/${getYouTubeVideoId(songData.linksByPlatform.youtube.url)}`"
                class="w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            
            <div class="w-full space-y-4">
              <a
                v-if="songData.linksByPlatform.youtube"
                :href="songData.linksByPlatform.youtube.url"
                target="_blank"
                class="platform-button youtube-button"
              >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>

              <a
                v-if="songData.linksByPlatform.appleMusic"
                :href="songData.linksByPlatform.appleMusic.url"
                target="_blank"
                class="platform-button apple-music-button"
              >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple Music
              </a>

              <a
                v-if="songData.linksByPlatform.spotify"
                :href="songData.linksByPlatform.spotify.url"
                target="_blank"
                class="platform-button spotify-button"
              >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>            
              
              <a
                v-if="songData.linksByPlatform.tidal"
                :href="songData.linksByPlatform.tidal.url"
                target="_blank"
                class="platform-button tidal-button"
              >
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <g transform="scale(1,-1) translate(0,-20)">
                    <path d="M12 2.25 14.25 4.5 12 6.75 9.75 4.5 12 2.25ZM5.25 9 7.5 11.25 5.25 13.5 3 11.25 5.25 9ZM12 9l2.25 2.25L12 13.5 9.75 11.25 12 9ZM18.75 9 21 11.25 18.75 13.5 16.5 11.25 18.75 9Z"/>
                  </g>
                </svg>
                Tidal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const route = useRoute()
const songData = ref(null)
const loading = ref(true)
const error = ref(null)

const updateMetaTags = () => {
  if (!songData.value) return

  const title = `${songData.value.title} - ${songData.value.artistName}`
  const description = songData.value.artistName
  const image = songData.value.thumbnailUrl
  const url = typeof window !== 'undefined' ? window.location.href : ''

  document.title = title

  const propertyTags = {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'music.song',
  }

  const nameTags = {
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    // Also update standard description
    description,
  }

  const upsertMeta = (attr, tags) => {
    Object.entries(tags).forEach(([key, content]) => {
      let meta = document.querySelector(`meta[${attr}="${key}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attr, key)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content || '')
    })
  }

  upsertMeta('property', propertyTags)
  upsertMeta('name', nameTags)
}

watch(songData, () => {
  updateMetaTags()
})

const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

async function fetchAndCacheFromSongLink(songId) {
  const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=https://song.link/s/${songId}`)
  const data = await response.json()
  if (!data.entitiesByUniqueId) {
    throw new Error('Song not found')
  }
  const entity = Object.values(data.entitiesByUniqueId)[0]
  const inputLinks = data.linksByPlatform || {}
  const linksByPlatform = {}
  ;['youtube', 'spotify', 'appleMusic', 'tidal'].forEach((k) => {
    if (inputLinks[k]?.url) linksByPlatform[k] = { url: inputLinks[k].url }
  })
  const payload = {
    title: entity.title,
    artistName: entity.artistName,
    thumbnailUrl: entity.thumbnailUrl,
    linksByPlatform,
    pageUrl: data.pageUrl,
    updatedAt: serverTimestamp(),
  }
  const songRef = doc(db, 'music', songId)
  await setDoc(songRef, { ...payload, createdAt: serverTimestamp() }, { merge: true })
  return payload
}

onMounted(async () => {
  try {
    const songId = route.params.id
    const songRef = doc(db, 'music', songId)
    const snap = await getDoc(songRef)

    if (snap.exists()) {
      songData.value = snap.data()
    } else {
      // Fallback: fetch from song.link and cache in Firestore
      songData.value = await fetchAndCacheFromSongLink(songId)
    }
  } catch (err) {
    console.error('Error loading song:', err)
    error.value = 'Failed to load song information'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.platform-button {
  @apply flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-medium transition-colors duration-200;
}

.youtube-button {
  @apply bg-[#FF0000] hover:bg-opacity-90;
}

.spotify-button {
  @apply bg-[#1DB954] hover:bg-opacity-90;
}

.apple-button {
  @apply bg-[#FC3C44] hover:bg-opacity-90;
}

.tidal-button {
  @apply bg-[#000000] hover:bg-opacity-90;
}

.deezer-button {
  @apply bg-[#00C7F2] hover:bg-opacity-90;
}

.amazon-button {
  @apply bg-[#FF9900] hover:bg-opacity-90;
}

.pandora-button {
  @apply bg-[#224099] hover:bg-opacity-90;
}

.soundcloud-button {
  @apply bg-[#FF3300] hover:bg-opacity-90;
}

.napster-button {
  @apply bg-[#000000] hover:bg-opacity-90;
}

.yandex-button {
  @apply bg-[#FF0000] hover:bg-opacity-90;
}

.audius-button {
  @apply bg-[#8222ce] hover:bg-opacity-90;
}
</style>