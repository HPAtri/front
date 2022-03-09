<template>
<div class="root" :style="{height:tableheight.slice(0,tableheight.length-2)-50+'px'}" >
    <div style="width:100%;padding-left:15px">
        <ul>
            <router-link :to="{name:'课程签到记录',params:{id:this.id}}" tag="li" active-class="active">课程签到记录</router-link>
            <router-link :to="{name:'学生签到记录',params:{id:this.id}}" tag="li" active-class="active">学生签到记录</router-link>
        </ul>
    </div>
    <transition name="bounce" mode="out-in">
        <router-view :smheight="tableheight.slice(0,tableheight.length-2)-110+'px'"></router-view>
    </transition>
</div>
</template>
<script>
export default {
    data(){
    return{
      id:''
    }
    },
    props:{
        tableheight:String
    },
    mounted(){
        //自动加载数据
        this.id = this.$route.query.index;
    },
    methods:{
        handleClick(tab,event){
          console.log(tab,event);
          // /keqiandaoinfo /stqiandaoinfo
        }
    }
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
