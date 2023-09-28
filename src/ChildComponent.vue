<script setup>
import { defineProps, setup } from 'vue';

const props = defineProps({
  childData: String,
});

// 在 setup 函数中返回属性和方法
setup(props) {
  // 这里可以返回子组件需要的属性和方法
  return {
    sendToParent() {
      // 调用父组件传递的回调函数，将数据传递给父组件
      props.onSendDataToParent(props.childData);
    }
  };
}
</script>
