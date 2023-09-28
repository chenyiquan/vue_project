<script setup>
import { watch, ref, defineExpose , toRefs, defineEmits  } from 'vue'
import { cells, evalCell } from '../stores/store.js'
import { Chart, Grid, Line } from 'vue3-charts'

const props = defineProps({
  c: Number,
  r: Number,
  
})

const editing = ref(false)
const emits = defineEmits(['update-cells'])
const newdata = ref(0)

function update(e) {
  editing.value = false
  cells[props.c][props.r] = e.target.value.trim()
  // cells[props.c][props.r]=newdata.value
// console.log(evalCell(cells[props.c][props.r]))
// console.log(props.c,props.r)
  // let newValue = e.target.value.trim();
  // let evaluatedValue = evalCell(newValue);
  // cells[props.c][props.r]=evaluatedValue
  // updateCell(props.c, props.r, evaluatedValue);
}

function updateCell(c, r, value) {
  // Update the cells array with the new value
  console.log(value)
  cells[c][r] = value;
}
function test()
{
  console.log(222)
}

</script>

<template>
  <div class="cell" :title="cells[c][r]" @click="editing = true">
    <input
      v-if="editing"
      :value="cells[c][r]"
      @focus="test"
      @change="update"
      @blur="update"
      @vue:mounted="({ el }) => el.focus()"
    >
    <span v-else>{{ evalCell(cells[c][r]) }}</span>
  </div>
</template>

<style>
.cell, .cell input {
  height: 1.5em;
  line-height: 1.5;
  font-size: 15px;
}

.cell span {
  padding: 0 6px;
}

.cell input {
  width: 100%;
  box-sizing: border-box;
}
</style>