<!--
通过内建的 <TransitionGroup> 实现“FLIP”列表过渡效果。
https://aerotwist.com/blog/flip-your-animations/
-->

<script setup>
import { shuffle as _shuffle } from 'lodash'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4, 8,5,7,10]
const items = ref(getInitialItems())


let count=items.value.length;
// for(let i=0;i<items.value.length-1;i++){
//   items.value.sort((a, b) => a - b)
//   const current = items.value[i];
//   const next = items.value[i + 1];
//   if (next - current > 1) {
//     id =items.value
//     break;
//   }
// } 
// console.log(items.value.length)

let id=1
let p=0
function insert() {
//   const i = Math.round(Math.random() * items.value.length)
//排序
items.value.sort((a, b) => a - b)  
//ID が存在する場合は操作せず、存在しない場合は ID を追加します
if(items.value.indexOf(id)==-1){
  for ( ; p < items.value.length; p++) {
  if (id < items.value[p]) {
    console.log(items.value[p])
    break
  }
}
items.value.splice(p, 0, id++)
}
else {
  console.log(id)
  id++
}
}

// function insert2() {
//   const i = Math.round(Math.random() * items.value.length)
//   items.value.splice(i, 0, id++)
//   items.value.sort((a, b) => a - b)
// }

function reset() {
  items.value = getInitialItems()
  id=getInitialItems().length
  id = 1
}

function shuffle() {
  items.value = _shuffle(items.value)
}

function remove(item) {
  const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}
</script>

<template>
  <h1>オーバーアニメーション付きリスト</h1>
  <h2>並び替えが最適化になる、新しいデータを添加する時、既存のデータが序列化し、
    既存のデータを検査して、古いデータと新しいデータが重複する時、データを添加しない。
    データを添加する時、順序で添加する。
  </h2>

  <button @click="insert">insert index</button>
  <!-- <button @click="insert2">insert at random index</button> -->
  <button @click="reset">reset</button>
  <button @click="shuffle">shuffle</button>

  <TransitionGroup tag="ul" name="fade" class="container">
    <div v-for="item in items" class="item" :key="item">
      {{ item }}
      <button @click="remove(item)">x</button>
    </div>
  </TransitionGroup>
<!-- 
  <h1>{{ items[7] }}=item.[7]</h1>
  <h1>{{ id }}=id</h1>
  <h1>{{ count }}=count</h1>
  <h1>{{ items}}=item</h1> -->
  
</template>

<style>
.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>