<template>
    <div>
        <el-aside width="200px">
            <!--default-active代表选中哪个index, :collapse决定导航栏是否展开，:router决定导航栏是否开启路由模式-->
            <el-menu  default-active="0" :router="true"  :style="{height:tableheight}">
                <!--index设置当前item的下标，:route则是传一个对象进行，指定路由-->
                <el-menu-item index="0" :route="{name:'设备管理'}">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title"> 设备管理</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-user-solid"></i>
                        <span>用户管理</span>
                    </template>
                        <el-menu-item index="1-1" :route="{name:'教师信息管理'}">教师信息管理</el-menu-item>
                        <el-menu-item index="1-2" :route="{name:'学生信息管理'}">学生信息管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="2" :route="{name:'课程管理'}">
                    <i class="el-icon-document"></i>
                    <span slot="title"> 课程管理</span>
                </el-menu-item>
                <el-menu-item index="3" :route="{name:'签到管理'}">
                    <i class="el-icon-document-checked"></i>
                    <span slot="title"> 签到管理</span>
                </el-menu-item>
                <el-menu-item index="4" :route="{name:'部门管理'}">
                    <i class="el-icon-s-cooperation"></i>
                    <span slot="title"> 部门管理</span>
                </el-menu-item>
                <el-menu-item index="5" :route="{name:'位置管理'}">
                    <i class="el-icon-s-grid"></i>
                    <span slot="title"> 位置管理</span>
                </el-menu-item>
                <el-menu-item index="6" :route="{name:'管理员个人中心'}">
                    <i class="el-icon-user"></i>
                    <span slot="title"> 个人中心</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
    </div>
</template>
<script>
export default {
    props:{
        tableheight:String
    }
 }
</script>

<style lang="css" scoped>
.el-menu{
     height: 100%;
   }
.el-aside .el-menu .el-menu-item,span,i{
    color: #333;
    
   }

</style>