

<script setup>
import Modal from './components/Modal.vue'
import { ref ,watch} from 'vue'


const showModal = ref(false)
const storedCount = localStorage.getItem('count')
const count = ref(storedCount ? parseInt(storedCount) : 0)
watch(count, (newData) => {
  localStorage.setItem('count', newData.toString())
})
</script>

<template>
  <h1>カウンター</h1>
  <h2>ボタンを押す時、回数を統計する
  </h2>
  <button id="show-modal" @click="showModal = true,count++">Show Modal</button>
  <!-- <h1>{{count}}</h1> -->
  <Teleport to="body">
    <!-- 使用这个 modal 组件，传入 prop -->
    
    <modal :show="showModal" @close="showModal = false" :countnumbe="count">
      <template #header>
        <h3>custom header</h3>
      </template>
    </modal>
  </Teleport>
</template>