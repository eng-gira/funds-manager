<template>
  <div class="bg-gray-200 hover:bg-gray-300 duration-300 mb-6 rounded-xl lg:w-[600px] p-3 border-gray-900 shadow-[0px_3px_5px] hover:shadow-[0px_6px_10px]">
      <!-- Header -->
      <div class="flex justify-between">
          <div class="flex-col">
            <div class="lg:text-xl text-sm">
              <router-link :to="{name: 'Fund', query: {fund: fund.id  }}">{{ fund.name }}</router-link>
            </div>
          </div>
          <div class="">
              <div class="text-xs lg:text-sm">Last Session</div>
              <div class="text-xs lg:text-sm">{{ setData.exercise.lastSessionDate }}</div>
              <table class="table-fixed text-xs">
                <thead class="border-2 border-black">
                  <th class="border border-black px-3">Round</th>
                  <th class="border border-black px-3">Set</th>
                  <th class="border border-black px-3">Reps</th>
                </thead>
                <tbody>
                  <tr v-for="rep in lastSession" :key="rep.id" class="border-2 border-black">
                    <td class="border border-black px-3" v-show="rep.round == setData.roundNumber && rep.set == setData.setNumber"> {{ rep.round }} </td>
                    <td class="border border-black px-3" v-show="rep.round == setData.roundNumber && rep.set == setData.setNumber"> {{ rep.set }}</td>
                    <td class="border border-black px-3" v-show="rep.round == setData.roundNumber && rep.set == setData.setNumber"> {{ rep.countReps }}</td>
                  </tr>
                </tbody>
              </table>
          </div>
      </div>

      <!-- Body -->
      <div class="flex text-xs lg:text-md">
        <div>Target Reps Count: <strong>{{ setData.targetRepsCount }}</strong></div>
      </div>
      
      <!-- Footer -->
      <div class="flex justify-between mt-6 items-center">
        <form class="" @submit.prevent="submitReps()">
          <CustomInput type="number" class="border border-black rounded-lg w-[80px] h-[25px] text-center lg:text-md text-xs" v-model="repsInput" placeholder="Reps"/>
          <button type="submit" class="height-[30px] ml-3 bg-blue-500 text-white p-1 px-2 rounded-lg lg:text-md font-bold hover:bg-blue-800 focus:bg-blue-500 duration-300 text-xs">Submit</button>
        </form>
        <div>
        <div v-if="recentlyAccepted" class="text-xs lg:text-md">
          Just submitted <strong>{{ currentSessionValue }}!</strong>
        </div>
        <div v-else class="text-xs lg:text-md">
          Value in current session: <strong>{{ currentSessionValue }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>