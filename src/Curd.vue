<!--
https://eugenkiss.github.io/7guis/tasks/#crud
-->

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const storeData = ref(false)
// データが存在する場合、取り出す
const names = reactive(JSON.parse(localStorage.getItem('names')) || ['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])

const selected = ref('')
const prefix = ref('')
const first = ref('')
const last = ref('')

const filteredNames = computed(() =>
  names.filter((n) =>
    n.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

watch(selected, (name) => {
  ;[last.value, first.value] = name.split(', ')
})

// データ変化する時、自動的に本ページでupudata
function toggleLocalStorage() {
  storeData.value = !storeData.value;
  console.log(storeData.value)
  //プライバシーモード
  if (storeData.value) {
      console.log(storeData.value)
      watch(names, (newData) => {
      localStorage.setItem('names', JSON.stringify(newData))
      console.log(JSON.stringify(newData))
      })
      } 
}

function create() {
  if (hasValidInput()) {
    const fullName = `${last.value}, ${first.value}`
        if (!names.includes(fullName)) {
        names.push(fullName)
        first.value = last.value = ''
      }
    }
  }

//バッファリングを削除する
function deleteData() {
  localStorage.removeItem('names');
  alert('本ページデータが削除しました！');
}

function update() {
  if (hasValidInput() && selected.value) {
    const i = names.indexOf(selected.value)
    names[i] = selected.value = `${last.value}, ${first.value}`
  }
}

function del() {
  if (selected.value) {
    const i = names.indexOf(selected.value)
    names.splice(i, 1)
    selected.value = first.value = last.value = ''
  }
}

function hasValidInput() {
  return first.value.trim() && last.value.trim()
}
</script>

<template>

<h1>クラッド</h1>
  <h2>データ状態の永久化になった。
    プライバシーモードがオンする時、創造したデータを保存しない。
    プライバシーモードがオフする時、創造したデータを本で保存しない。
    「削除本ページデータ」ボタンを押すと、本ページでのバッファリングを削除する
  </h2>


  <div><input v-model="prefix" placeholder="Filter prefix"></div>

  <select size="5" v-model="selected">
    <option v-for="name in filteredNames" :key="name">{{ name }}</option>
  </select>

  <label>Name: <input v-model="first"></label>
  <label>Surname: <input v-model="last"></label>

  <div class="buttons">
    <button @click="create">Create</button>
    <button @click="update">Update</button>
    <button @click="del">Delete</button>
  </div>

  <div>
    <label class="switch">
      <input type="checkbox" v-model="saveData" @change="toggleLocalStorage">
      <span class="slider"></span>
    </label>
  <!-- <h1>{{ storeData }}</h1> -->
    <span v-if="storeData" >プライバシーモードがオフになっています</span>
    <span v-else>プライバシーモードがオンになっています</span>
    
  </div>

  <div>
    <button @click="deleteData">削除本ページデータ</button>
  </div>
</template>

<style>
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>