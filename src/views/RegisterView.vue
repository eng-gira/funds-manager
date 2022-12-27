<template>
    <form class="w-[300px] lg:w-[400px]  flex flex-col mx-auto p-4 mb-6 border border-gray-500 rounded-lg" @submit.prevent="register">
        <h1 class="font-bold lg:text-xl text-lg mb-3">Register</h1>
        <div class="flex flex-col space-y-2 mb-3">
            <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="name">Name</label>
            <input id="name" type="text" class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black" v-model="name" />
        </div>
        <div class="flex flex-col space-y-2 mb-3">
            <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="email">Email</label>
            <input id="email" type="email" class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black" v-model="email" />
        </div>
        <div class="flex flex-col space-y-2 mb-3">
            <label class="self-start uppercase lg:text-xs text-[10px] text-gray-500 font-bold" for="password">Password</label>
            <input id="password" type="password" class="rounded-lg p-2 text-sm lg:text-base font-bold border border-black" v-model="password"/>
        </div>

        <button type="submit" class="self-center p-2 bg-blue-900 text-white rounded-lg">Register</button>

        <h1 class="mt-3 lg:text-xs text-[10px] text-red-500" v-if="error">{{ error }}</h1>
    </form>
    <h1 class="mb-3">Already have an account? <router-link to="/auth/login" class="underline">Login</router-link> instead.</h1>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import FundService from '@/services/FundService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

let email = ref(null)
let name = ref(null)
let password = ref(null)
let error = ref(null)

onMounted(() => {
    if(localStorage.getItem('access_token')) router.push('/')
})

function register() {
    if(name.value == null || name.value.length < 1 || email.value == null || email.value.length < 5 || password.value == null || password.value.length < 1) {
        error.value = 'Please fill the required fields'
        return false
    }

    error.value = ''

    FundService.register(JSON.stringify({ name: name.value, email: email.value, password: password.value })).then((resp) => {
        if(resp.data.message != 'failed') {
            console.log(resp.data.data)
            localStorage.setItem('access_token', resp.data.data)
            router.push('/')
        } else {
            error.value = resp.data.data
        }
    }).catch((err) => {
        console.log(err)
    })
}

</script>