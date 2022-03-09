<template>
    <div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"  auto-complete="on"  size="large" label-position="left" >

            <el-form-item prop="user_id" >
                <el-input  v-model="loginForm.user_id" placeholder="请输入账号" auto-complete="on" clearable></el-input>
            </el-form-item>

            <el-form-item prop="password" >
                <el-input placeholder="请输入密码" :type="passwordType" v-model="loginForm.password" auto-complete="on"
                @keyup.enter.native="handleLogin" show-password>
                    <template slot="suffix">
                        <span class="show-pwd" @click="showPwd" :style="{color:fcolor}">
                        <i class="iconfont icon-originalimage"></i>
                        </span>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button :loading="loading" type="primary" plain style="width:100%;margin-bottom:18px;"  @click.native.prevent="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios'
import { errcatch } from '../errcatch'
export default {
    data(){
        const validatePassword = (rule,value,callback) =>{
            if (value.length < 6)
            callback(new Error('密码长度应大于6'))
            else callback()
        }
        return{
            fcolor:'gray',
            passwordType:'password',
            code:'',
            path:'',
            checked:true,
            baseURL:"http://47.117.68.250/", //http://10.40.11.195:8000/polls
            loginForm:{
                user_id:'',
                password:'',
            },
            loginRules:{
                user_id:[{required:true,message:'账号不允许为空',trigger:'blur'}],
                password:[{required:true,message:'密码不允许为空',trigger:'blur'},{validator:validatePassword,trigger:'blur'}],
            },
            loading:false, //加载
            is_status:false, //状态识别
            URLs:'',//路由识别
            urlt:''
        }
    },
    mounted(){
        this.creates();
    },
    methods:{
    creates(){
        this.$bus.$on('login',(val)=>{
        this.URLs = val[0];
        console.log(this.URLs);
        if(this.URLs){
            this.urlt = '/administor';
        }else{
            this.urlt = '/teacher';
            }
        });
    },
    showPwd(){
        if (this.passwordType == 'password') {
        this.passwordType = '';
        this.fcolor='black';

      } else {
        this.passwordType = 'password'
        this.fcolor='gray';
      }
    },

    handleLogin(){  //登录触发函数
        this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
            this.loading = true;

            let that = this;//记录this的地址

            //使用Axios实现Ajax的请求

            axios
            .post(that.baseURL + 'login/',
            {
                headers: {
            'Access-Control-Allow-Origin':'*',
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
            }
            ,
            params:{
                username:that.loginForm.user_id,
                password:that.loginForm.password
            }
            }
            )
            .then(function(res){
                //请求成功后执行的函数
                if(res.data.code == 1){
                    that.$router.push({path: that.urlt});
                    localStorage.setItem('token',res.data.token);
                    that.$message({
                        message:'登录成功！',
                        type:'success'
                    });
                }else {
                    //数据加载失败提示
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err){
                //请求失败后执行的函数
                errcatch(err);
                that.loading = false;
            })
        }else{
          return false
        }
      })
    }
    }
}
</script>
