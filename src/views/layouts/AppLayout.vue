<template>
    <!-- Navigation -->
    <div class="mx-auto mb-12 flex justify-between w-[350px] lg:w-[650px] bg-gray-100 p-3 rounded-lg">
        <router-link class="font-bold lg:text-base text-[10px]" :to="{ name: 'DepositsHistoryView'}">Deposits</router-link>
        <router-link class="font-bold lg:text-base text-[10px]" :to="{name: 'WithdrawalsHistoryView'}">Withdrawals</router-link>
        <router-link class="font-bold lg:text-base text-[10px]" :to="{name: 'DepositFormView'}">Make Deposit</router-link>
    </div>
    <!-- End of Navigation -->

    <router-view />
</template>