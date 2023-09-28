<template>
    <div>
      城市：{{city}}
      <button type="button" @click="myfun('大连')">点击</button>
    </div>
</template>
<script>
export default{
//把变量city暴露到父组件，通过父组件来修改
    props:["city"],
    methods:{
        myfun(x){
        //通过$emit定义一个事件，x表示需要传递的参数
            this.$emit('showCityName',x);
            //如果$emit传递多个参数，如下
            this.$emit("showCityName",x,y,z);
        }
    }
}
</script>
