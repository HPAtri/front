<template>
    <el-container>
        <!--顶部  输入logo图片地址  name="姓名xxxxx、时间(放在右侧)"-->
        <el-header  style="height:60px;">
                <headers Sname="管理员">
				    <el-dropdown trigger="hover" slot="right">
                        <div class="demo-type">
                             <div>
                                <el-avatar icon="el-icon-user-solid"></el-avatar>
                            </div>
                        </div>
					    <!-- <span class="el-dropdown-link userinfo-inner"><img src="" />欢迎您,{{nickName}}</span>-->
					    <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
					    </el-dropdown-menu>
				     </el-dropdown>
                </headers>
        </el-header>
        <!--中央区域-->
        <el-main :style="{height:fullHeight}">
            <el-container >
                <!--左侧导航栏-->
                   <sidebarad :tableheight="fullHeight" ></sidebarad>
                <!--主内容显示区域-->
                <el-main :style="{height:fullHeight}">
                    <!--路由渲染-->
					<el-breadcrumb separator-class="el-icon-arrow-right" >
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							<router-link :to="item.path">{{ item.name }}</router-link>
						</el-breadcrumb-item>
					</el-breadcrumb>
                     <transition name="bounce" mode="out-in">
                        <router-view :tableheight="fullHeight" ></router-view>
                     </transition>
                </el-main>
            </el-container>
        </el-main>
        <!--底部-->
        <el-footer style="height:55px">
            <headers><h5 slot="middle">{{currenttime}}</h5> </headers>
        </el-footer>
    </el-container>
</template>
<script>
import headers from '../components/headers'
import sidebarad from '../components/sidebarad'
export default {
    data(){
        return{
            baseURL:"http://localhost:85/polls/",
            nickName: "管理员",
            color1: '#409EFF',
            timer:"",//设置定时器
            currenttime:'',
            fullHeight:(document.documentElement.clientHeight-115)+"px",//获得本机浏览器屏面高度，实现系统适应
            // is_status:false,
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            sizeList: ["small"]
        }
    },
    components:{
        headers,
        sidebarad
    },
    mounted(){
        //this.create();
    },
    methods:{
        //状态识别

        // create(){
        //     this.$bus.$on('setDataToBrather',(e)=>{
        //     console.log('e',e);
        //     this.is_status = e[0];
        //     console.log(this.is_status);
        //   });
        //     let that = this;
        //     //this.$bus.$off('setDataToBrather');
        //     setTimeout(function (){
		//         if(!that.is_status){
        //             that.$router.push('/index');
        //     };
        //     },15)
        // },

        handResize(event){ //获取界面本机高度实现自适应
        this.fullHeight=(document.documentElement.clientHeight-115)+"px";
        },
        logout(){
            this.$confirm('是否退出登录？','提示',{
                conformButtonText:'确定',
                concelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                sessionStorage.clear(); //清空sessionstorage
                this.$router.push('/index');
            }).catch(()=>{

            });
        }
    },
    created(){
        window.addEventListener('resize',this.handleResize);

        this.timer=setInterval(()=>{
            this.currenttime=new Date().getFullYear() +"-"+(new Date().getMonth()+1)
            +"-"+new Date().getDate() +" "+new Date().getHours()+":"+new Date().getMinutes()
            +":"+new Date().getSeconds();
            },1000)
    },
    beforeDestory(){
        window.removeEventListener('resize',this.handleResize)
        localStorage.clear;
        clearInterval(this.timer);//删除定时器
    }
}
</script>
<style scoped>
.el-container {
         padding: 0;
        margin: 0;
        height: 100%;
    }
    .el-main{
        padding: 0;
        margin: 0;
        border-left: 1px solid rgb(59, 52, 52);
    }
    .el-header, .el-footer {
        margin: 0;
        padding: 0;
        background-color:  #8c939d;
          /*rgb(148, 43, 43); #409EFF;*/
    }
    .el-color-picker{
        line-height: 55px;
    }
    .bounce-enter-active {
     animation: bounce-in .35s;
   }
   .bounce-leave-active {
     animation: bounce-in .35s reverse;
   }
   @keyframes bounce-in {
     0% {
       transform: translateY(15px);
       opacity: 0;
     }
     100% {
       transform: translateY(0px);
       opacity: 1;
     }
   }

.el-breadcrumb{
    padding: 0;
    margin: 0;
    font-size: 15px;
    margin: 15px 5px;
    font-family: "微软雅黑";
}
.userinfo-inner{
	font-family: Arial, Helvetica, sans-serif;
	color: #333;;
    font-family: "微软雅黑";
}
.userinfo-inner:hover{
	color: rgb(173, 207, 209);
}
.demo-type{

    padding-top: 7px;
}
</style>
