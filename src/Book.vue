<script setup>
import { ref, computed } from 'vue'

const flightType = ref('one-way flight')
const today = new Date()
const today1=ref(dateToString(new Date(today)))
const departureDate = ref(dateToString(new Date(today)))
const returnDate = ref(departureDate.value)
// const tomorrow = new Date(today)
// tomorrow.setDate(today.getDate() + 1)
// const returnDate = ref(dateToString(tomorrow))


const isReturn = computed(() => flightType.value === 'return flight')

const canBook = computed(
  () =>
    (!isReturn.value || stringToDate(returnDate.value) > stringToDate(departureDate.value))
    && stringToDate(departureDate.value) >= stringToDate(today1.value) // 本日より前にチケットを予約することはできない
)


function book() {
  alert(
    isReturn.value
      ? `You have booked a return flight leaving on ${departureDate.value} and returning on ${returnDate.value}.`
      : `You have booked a one-way flight leaving on ${departureDate.value}.`
  )
}

function stringToDate(str) {
  const [y, m, d] = str.split('-')
  return new Date(+y, m - 1, +d)
}

function dateToString(date) {
  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate())
  )
}

function pad(n, s = String(n)) {
  return s.length < 2 ? `0${s}` : s
}
</script>

<template>
 <h1>フライト予約</h1>
  <h2>「片道フライト」と「往復フライト」の 2 つのオプションを含む。
    「往復フライト」を選択する時、帰国日は出発日とより早いことができない。
  </h2> 
  <select v-model="flightType">
    <option value="one-way flight">One-way Flight</option>
    <option value="return flight">Return Flight</option>
  </select>

  <input type="date" v-model="departureDate" :min="dateToString(today)">
  <input type="date" v-model="returnDate" :disabled="!isReturn" :min="departureDate">

  <button :disabled="!canBook" @click="book">Book</button>

  <p>{{ canBook ? '' : 'Return date must be after departure date.' }}</p>
</template>

<style>
select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>