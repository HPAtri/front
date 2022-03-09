<template>
<div class="root" :style="{height:tableheight.slice(0,tableheight.length-2)-50+'px'}" >
    <transition name="bounce" mode="out-in">
        <router-view :smheight="tableheight.slice(0,tableheight.length-2)-110+'px'"></router-view>
    </transition>
</div>
</template>
<script>
export default {
    props:{
        tableheight:String
    },
    data(){
      return{
        is_status:false,
      }
    },
}
</script>
<style scoped>
.root{
  overflow: hidden;
}
.active{
  color: rgb(15, 14, 19);
  border-bottom: 1px solid rgb(20, 15, 15);
}
  ul{
        height: 30px;
        margin-bottom: 30px;
    }
  ul li {
       display: inline;
        margin-left:15px;
        text-align: center;
        line-height: 40px;
        list-style: none;
        font-family: "微软雅黑";
    }
  .bounce-enter-active {
     animation: bounce-in .5s;
   }
  .bounce-leave-active {
     animation: bounce-in .5s reverse;
   }
     @keyframes bounce-in {
     0% {
       transform: translateX(10px);
       opacity: 0;
     }
     100% {
       transform: translateX(0px);
       opacity: 1;
     }
     }
</style>