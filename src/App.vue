<template>
  <div class="py-8 pl-6 pr-8">
    <div class="flex justify-between items-center mb-8">
      <router-link to="/" class="self-start font-bold lg:text-2xl text-base">
        Funds Manager
      </router-link>
    
      <h1 v-if="route.meta && route.meta.requiresAuth" class="hover:cursor-pointer lg:text-xs text-[10px] font-bold" @click="logout">Logout</h1>
    </div>
    <router-view />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function logout() {
  localStorage.removeItem('access_token')
  router.push('/auth/login')
}
</script>