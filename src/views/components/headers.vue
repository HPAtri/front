<template >
    <div>
        <span  class="left">
                <!-- <img :src="logo |filter" alt=""> -->
                <!-- 如左边输入xxxx系统主页、logo图标、姓名 -->
                {{Sname}}
            <slot name="left">
                    <!-- 设置插槽，让用户有权利定义任何内容 -->
            </slot>
        </span>

        <span  class="middle">
            <slot name="middle">
                    <!-- 设置插槽，让用户有权利定义任何内容 如时间、版本等信息-->
            </slot>
        </span>

        <span  class="right">
             <!-- 如右边输入登录的用户名、等信息 -->
            {{name}}
            <slot name="right">
                    <!-- 设置插槽，让用户有权利定义任何内容-->
            </slot>
        </span>
    </div>

</template>
<script>
import Vue from "vue";
export default {
    //父传子，接受传来的父组件属性信息
    props:{
        Sname:String,
        name:String,
        logo:String,
    },

}
</script>
<style scoped>
.left{
        float: left;
        line-height: 50px;
        margin-left: 1%;
        text-align: left;
       font-family: "微软雅黑";
    }
.middle{
        float: left;
        line-height: 50px;
        margin-left: 40%;
        text-align: center;
        font-family: "微软雅黑";
    }
.right{
        float:right;
        line-height:50px;
        /* text-align: right; */
        margin-right: 10%;
       font-family: "微软雅黑";
    }
</style>
