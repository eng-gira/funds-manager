<template>
    <form class="flex flex-col w-[300px] mx-auto" @submit.prevent="login">
        <input type="email" class="border border-black p-2" v-model="email" placeholder="email" />
        <input type="password" class="border border-black p-2" v-model="password" placeholder="password" />
        <button type="submit">Login</button>

    </form>
</template>
<script setup>
import {ref} from 'vue'
import FundService from '@/services/FundService.js'

let email = ref(null)
let password = ref(null)

function login() {
    FundService.login(JSON.stringify({email: email.value, password: password.value})).then((resp) => {
        console.log(resp.data.data)
        localStorage.setItem('access_token', resp.data.data)
    })
}

</script>