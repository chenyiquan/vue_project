<script setup>
const props = defineProps({
  todo: Object
})
</script>

<template>
  <li>{{ todo.text }}{{ todo.id }}{{ todo.kbj }}</li>
</template>