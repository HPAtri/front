<template>
   <div>
        <el-form :model="userform" :rules="rules" ref="userform"  auto-complete="on" label-position="left" >
       <ul>
           <li>
              <el-upload
              style="margin-left:200px;"
              action="http://localhost:85/polls/Picture/"
              :auto-upload="true"
              :data="uploadData"
              :http-request="imageChange"
		          :beforeUpload="beforeAvatarUpload"
		          accept=".jpg"
              >
              <el-button type="primary" class="buttons2">上传图片</el-button>
              </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img wIDth="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
               <table >
                    <tr>
                        <td>ID:</td>
                        <td><el-form-item prop="ID" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.ID" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>备注:</td>
                        <td><el-form-item prop="Rem" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Rem" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>简介:</td>
                        <td><el-form-item prop="Introduction" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Introduction" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>更新时间</td>
                        <td><el-form-item prop="TimeUpdate" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.TimeUpdate" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>最后操作人ID:</td>
                        <td><el-form-item prop="IdManager" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.IdManager" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>部门ID:</td>
                        <td><el-form-item prop="Deptid" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Deptid" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>卡号:</td>
                        <td><el-form-item prop="NoCard" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.NoCard" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>学工号:</td>
                        <td><el-form-item prop="NoUser" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.NoUser" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>身份证号:</td>
                        <td><el-form-item prop="NoSfz" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.NoSfz" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>姓名:</td>
                        <td><el-form-item prop="Name" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Name" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>密码:</td>
                        <td><el-form-item prop="Psw" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Psw" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>性别:</td>
                        <td><el-form-item prop="sex" >
                <el-select v-model="userform.sex" :disabled="isView" placeholder="请选择性别">
                    <el-option label="女性" value="女性"></el-option>
                    <el-option label="男性" value="男性"></el-option>
                </el-select>
            </el-form-item></td>
                   </tr>
                   <tr>
                        <td>权限:</td>
                        <td><el-form-item prop="Attr" >
                <el-select v-model="userform.Attr" :disabled="isView" placeholder="请选择">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
            </el-form-item></td>
            </tr>
                   <tr>
                        <td>机房权限:</td>
                        <td><el-form-item prop="AttrJf" >
                <el-select v-model="userform.AttrJf" :disabled="isView" placeholder="请选择">
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                </el-select>
            </el-form-item></td>
            </tr>
                   <tr>
                        <td>Power:</td>
                        <td><el-form-item  prop="Power" >
                <el-select v-model="userform.Power" :disabled="isView" placeholder="请选择">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="85" value="85"></el-option>
                    <el-option label="127" value="127"></el-option>
                </el-select>
            </el-form-item></td>
                   </tr>
                   <tr>
                        <td>PowerJf:</td>
                        <td><el-form-item prop="PowerJf" >
                <el-select v-model="userform.PowerJf" :disabled="isView" placeholder="请选择">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="10" value="10"></el-option>
                </el-select>
            </el-form-item></td>
                   </tr>
                    <tr>
                        <td>邮箱:</td>
                        <td><el-form-item prop="Email" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Email" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>手机号码:</td>
                        <td><el-form-item prop="Phone" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Phone" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                    <tr>
                        <td>用户余额1:</td>
                        <td><el-form-item prop="Yue" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Yue" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>用户余额2:</td>
                        <td><el-form-item prop="Yue2" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.Yue2" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   <tr>
                        <td>管理员地点:</td>
                        <td><el-form-item prop="LocalID" >
                            <el-input prefix-icon='iconfont icon-edit' v-model="userform.LocalID" :disabled="true"    auto-complete="on"></el-input>
                        </el-form-item></td>
                   </tr>
                   
               </table>
                <el-form-item>
                    <el-button :loading="loading" type="primary" style="margin-left:200px;" size="medium" @click ="IDltpwd()">保 存</el-button>
                </el-form-item>
            </li>
       </ul>
         </el-form>
   </div>
</template>
<script>
//action="https://jsonplaceholder.typicode.com/posts/"
import axios from 'axios';
import { errcatch } from '../../errcatch';
export default {
    data(){
        return{
        dialogImageUrl: '',
        dialogVisible: false,
        loading:false,
        baseURL:"http://localhost:85/polls/",
        uploadData:{
          pic:{},
          user_ID:'',
        },
        userform:{
            ID:'',
            Rem:'',
            Introduction:'',
            TimeUpdate:'',
            IdManager:'',
            Deptid:'',
            NoCard:'',
            NoUser:'',
            NoSfz:'',
            Name:'',
            Psw:'',
            Sex:'',
            Attr:'',
            AttrJf:'',
            Power:'',
            PowerJf:'',
            Email:'',
            Phone:'',
            Yue:'',
            Yue2:'',
            LocalID:'',
        },
        rules:{
            psw:[{ required: true, message: '密码不允许为空', trigger: 'blur' }]
        },
    }
    },
    mounted(){
        //自动加载数据
        this.getuser();
    },
    methods: {


        timeup(){
            this.userform.TimeUpdate = new Date().getTime() - new Date
            ('2000-1-1 00:00:00').getTime();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
      },
        getuser(){
            let that = this;
            axios
            .get(that.baseURL + 'PersonInformation/')
            .then(function(res){
                //请求成功后执行的函数
                console.log(res);
                if(res.data.code == 0){
                    that.$router.push('/index');
                }else{
                if(true){ //res.data.code == 1
                //把数据给userform
                that.userform = res.data.data[0];
                if(that.userform.Attr == 2){
                        that.userform.Attr = '超级管理员';
                    }else if(that.userform.Attr == 1){
                        that.userform.Attr = '管理员';
                    }else if(that.userform.Attr ==0){
                        that.userform.Attr = '普通用户';
                        }
                    if(that.userform.sex == 0){
                        that.userform.sex = '女性';
                    }else{
                        that.userform.sex = '男性';
                    }
                that.$message({
                    message:'数据加载成功！',
                    type:'success'
                });
                }else {
                    //数据加载失败提示
                    that.$message.error('获取数据出现异常');
                }
                }
            })
            .catch(function(err){
                //请求失败后执行的函数
                errcatch(err);
            })
        },
        beforeAvatarUpload(file) {
	    //图片格式
		console.log(file.type)
		const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'|| file.type === 'image/PNG'|| file.type === 'image/JPG';

		if (!isJPG) {
			this.$message.error('上传图片只能为jpg或png格式');
		}
			return isJPG ;
		},
		 // 提交图片
    imageChange(param,type,file){
      let formData = new FormData()
      formData.append("Rem", that.userform.Rem);
      formData.append("Introduction", that.userform.Introduction,);
      formData.append("NoUser", that.userform.NoUser);
      formData.append("NoSfz", that.userform.NoSfz,);
    //   formData.append("FaceFearture", that.userform.FaceFearture);
    //   formData.append("Photo",that.userform.Photo,);
      formData.append('Photo_dataF', param.file);

      this.$http.post('http://localhost:85/polls/Picture/', formData).then(res => {
		  this.$message.success('上传成功')
      }).catch(err=>{
        this.$message.error('上传失败')
      });
    },
    submituserform(){
         let that = this;
         this.timeup();
         axios.put(that.baseURL + 'TeachersInformation/', that.userform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    that.$message({
                        message:'保存成功！',
                        type:'success'
                    });
                    that.getuser();
                }else{
                    //失败提示
                }
            })
            .catch(function(err){
                //请求失败后执行的函数
                console.log("保存失败！");
            });
        },

    },
    submitpic(){
        let that = this;
            this.timeup();
            axios
            .patch(that.baseURL + 'PersonInformation/',
                 {
                    "Rem": that.userform.Rem,
                    "Introduction": that.userform.Introduction,
                    "NoUser": that.userform.NoUser,
                    "NoSfz": that.userform.NoSfz,
                    "FaceFearture": that.userform.FaceFearture,
                    "Photo": that.userform.Photo,
                    "Photo_dataF": that.userform.Photo_dataF
                 }
                 ).then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    that.getuser();
                }else{
                    //数据加载失败提示
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err){
                //请求失败后执行的函数
                console.log("保存失败！");
            })
    },
    }




</script>
<style scoped>
table{
    wIDth:500px;
}
tr td{
    font-family: "微软雅黑";
}
tr td:nth-child(1){
    wIDth:85px;
    padding: 10px 30px 10px 70px;
}
.el-form-item,.el-form-item .el-date-picker{
    wIDth: 260px;
}
.el-form-item .el-button{
    wIDth: 160px;
    padding: 10px ;
    margin-left: 70px;
    margin-top: 15px;
}
/* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hIDden;
  } */
  /* .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    wIDth: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    wIDth: 178px;
    height: 178px;
    display: block;
  } */
</style>