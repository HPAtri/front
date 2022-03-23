<template>
  <div>
    <el-form
      :model="userform"
      :rules="rules"
      ref="userform"
      auto-complete="on"
      label-position="left"
    >
      <ul>
        <li>
          <el-upload
            style="margin-left:200px;"
            action="http://localhost:85/polls/Picture/"
            :auto-upload="true"
            :data="userform"
            :http-request="imageChange"
            :beforeUpload="beforeAvatarUpload"
            accept=".jpg"
          >
            <el-button type="primary" class="buttons2">上传图片</el-button>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img wIDth="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <table>
            <tr>
              <td>ID:</td>
              <td>
                <el-form-item prop="ID">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.ID"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>备注:</td>
              <td>
                <el-form-item prop="Rem">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Rem"
                    :disabled="false"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>简介:</td>
              <td>
                <el-form-item prop="Introduction">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Introduction"
                    :disabled="false"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>更新时间</td>
              <td>
                <el-form-item prop="TimeUpdate">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.TimeUpdate"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>最后操作人ID:</td>
              <td>
                <el-form-item prop="IdManager">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.IdManager"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>部门ID:</td>
              <td>
                <el-form-item prop="Deptid">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Deptid"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>卡号:</td>
              <td>
                <el-form-item prop="NoCard">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.NoCard"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>学工号:</td>
              <td>
                <el-form-item prop="NoUser">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.NoUser"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>身份证号:</td>
              <td>
                <el-form-item prop="NoSfz">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.NoSfz"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>姓名:</td>
              <td>
                <el-form-item prop="Name">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Name"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>密码:</td>
              <td>
                <el-form-item prop="Psw">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Psw"
                    :disabled="false"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>性别:</td>
              <td>
                <el-form-item prop="sex">
                  <el-select
                    v-model="userform.sex"
                    :disabled="isView"
                    placeholder="请选择性别"
                  >
                    <el-option label="女性" value="女性"></el-option>
                    <el-option label="男性" value="男性"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>权限:</td>
              <td>
                <el-form-item prop="Attr">
                  <el-select
                    v-model="userform.Attr"
                    :disabled="isView"
                    placeholder="请选择"
                  >
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option
                      label="超级管理员"
                      value="超级管理员"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>机房权限:</td>
              <td>
                <el-form-item prop="AttrJf">
                  <el-select
                    v-model="userform.AttrJf"
                    :disabled="isView"
                    placeholder="请选择"
                  >
                    <el-option label="普通用户" value="普通用户"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                    <el-option
                      label="超级管理员"
                      value="超级管理员"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>Power:</td>
              <td>
                <el-form-item prop="Power">
                  <el-select
                    v-model="userform.Power"
                    :disabled="isView"
                    placeholder="请选择"
                  >
                    <el-option label="0" value="0"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="85" value="85"></el-option>
                    <el-option label="127" value="127"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>PowerJf:</td>
              <td>
                <el-form-item prop="PowerJf">
                  <el-select
                    v-model="userform.PowerJf"
                    :disabled="isView"
                    placeholder="请选择"
                  >
                    <el-option label="0" value="0"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="10" value="10"></el-option>
                  </el-select>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>邮箱:</td>
              <td>
                <el-form-item prop="Email">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Email"
                    :disabled="false"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>手机号码:</td>
              <td>
                <el-form-item prop="Phone">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Phone"
                    :disabled="false"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>用户余额1:</td>
              <td>
                <el-form-item prop="Yue">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Yue"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>用户余额2:</td>
              <td>
                <el-form-item prop="Yue2">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.Yue2"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td>管理员地点:</td>
              <td>
                <el-form-item prop="LocalID">
                  <el-input
                    prefix-icon="iconfont icon-edit"
                    v-model="userform.LocalID"
                    :disabled="true"
                    auto-complete="on"
                  ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>

          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              style="margin-left:200px;"
              size="medium"
              @click="submituserform()"
              >保 存</el-button
            >
          </el-form-item>
        </li>
      </ul>
    </el-form>
  </div>
</template>
<script>
//action="https://jsonplaceholder.typicode.com/posts/"
import axios from "axios";
import { errcatch } from "../../errcatch";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      loading: false,
      isView:true,
      baseURL: "/api/",
      webtoken:localStorage.getItem("token"),
      userform: {
        ID: "",
        Rem: "",
        Introduction: "",
        TimeUpdate: "",
        IdManager: "",
        Deptid: "",
        NoCard: "",
        NoUser: "",
        NoSfz: "",
        Name: "",
        Psw: "",
        Sex: "",
        Attr: "",
        AttrJf: "",
        Power: "",
        PowerJf: "",
        Email: "",
        Phone: "",
        Yue: "",
        Yue2: "",
        LocalID: "",
        ID_Manager_Name: "",
      },
      updateuserform:{
      "data": [
        {
          ID: 0,
          Rem: "string",
          Introduction: "string",
          Deptid: 0,
          NoCard: "string",
          NoUser: "string",
          NoSfz: 0,
          Name: "string",
          Psw: "string",
          Sex: 0,
          Attr: 0,
          AttrJf: 0,
          Power: 0,
          PowerJf: 0,
          Email: "string",
          Phone: 0,
          Yue: 0,
          Yue2: 0,
          LocalID: "string"
    }
  ],
  "n": 0
},
      rules: {
        psw: [{ required: true, message: "密码不允许为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    //自动加载数据
    this.getuser();
  },
  methods: {
    timeup() {
      this.userform.TimeUpdate =
        new Date().getTime() - new Date("2000-1-1 00:00:00").getTime();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getuser() {
      let that = this;
      axios
        ({url:"/api/" + "model_user/current_user",
        method:'get',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      }
      }).then(function(res) {
          //请求成功后执行的函数
          if (res.data.code == 0) {
            that.$router.push("/index");
          } else {
            if (true) {
              //res.data.code == 1
              //把数据给userform
              that.userform = res.data;
              if (that.userform.Attr == 2) {
                that.userform.Attr = "超级管理员";
              } else if (that.userform.Attr == 1) {
                that.userform.Attr = "管理员";
              } else if (that.userform.Attr == 0) {
                that.userform.Attr = "普通用户";
              }else if (that.userform.Attr == 3) {
                that.userform.Attr = "学生";
              }

              if (that.userform.sex == 0) {
                that.userform.sex = "女性";
              } else {
                that.userform.sex = "男性";
              }
              that.$message({
                message: "数据加载成功！",
                type: "success"
              });
            } else {
              //数据加载失败提示
              that.$message.error("获取数据出现异常");
            }
          }
        })
        .catch(function(err) {
          //请求失败后执行的函数
          errcatch(err);
        });
    },
    beforeAvatarUpload(file) {
      //图片格式
      console.log(file.type);
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/PNG" ||
        file.type === "image/JPG";

      if (!isJPG) {
        this.$message.error("上传图片只能为jpg或png格式");
      }
      return isJPG;
    },
    // 提交图片
    imageChange(param, type, file) {
      let formData = new FormData();
      formData.append("Rem", that.userform.Rem);
      formData.append("Introduction", that.userform.Introduction);
      formData.append("NoUser", that.userform.NoUser);
      formData.append("NoSfz", that.userform.NoSfz);
      //   formData.append("FaceFearture", that.userform.FaceFearture);
      //   formData.append("Photo",that.userform.Photo,);
      formData.append("Photo_dataF", param.file);

      this.$http
        .post("http://localhost:85/polls/Picture/", formData)
        .then(res => {
          this.$message.success("上传成功");
        })
        .catch(err => {
          this.$message.error("上传失败");
        });
    },
    submituserform() {
      let that = this;
      this.updateuserform.data[0].ID=this.userform.ID*1;
      this.updateuserform.data[0].Rem=this.userform.Rem;
      this.updateuserform.data[0].Introduction=this.userform.Introduction;
      this.updateuserform.data[0].Deptid=this.userform.Deptid*1;
      this.updateuserform.data[0].NoCard=this.userform.NoCard;
      this.updateuserform.data[0].NoUser=this.userform.NoUser;
      this.updateuserform.data[0].NoSfz=this.userform.NoSfz*1;
      this.updateuserform.data[0].Name=this.userform.Name;
      this.updateuserform.data[0].Psw=this.userform.Psw;
      this.updateuserform.data[0].Sex=this.userform.Sex;
      this.updateuserform.data[0].Attr=this.userform.Attr;
      this.updateuserform.data[0].AttrJf=this.userform.AttrJf;
      this.updateuserform.data[0].Power=this.userform.Power*1;
      this.updateuserform.data[0].PowerJf=this.userform.PowerJf*1;
      this.updateuserform.data[0].Email=this.userform.Email;
      this.updateuserform.data[0].Phone=this.userform.Phone*1;
      this.updateuserform.data[0].Yue=this.userform.Yue*1;
      this.updateuserform.data[0].Yue2=this.userform.Yue2*1;
      this.updateuserform.data[0].LocalID=this.userform.LocalID;
      if (this.updateuserform.data[0].Attr == "超级管理员") {
              this.updateuserform.data[0].Attr = 2;
      } else if (this.updateuserform.data[0].Attr == "管理员") {
        this.updateuserform.data[0].Attr = 1;
      } else if (this.updateuserform.data[0].Attr == "普通用户") {
        this.updateuserform.data[0].Attr = 0;
      }else if (this.updateuserform.data[0].Attr == "学生") {
        this.updateuserform.data[0].Attr = 3;
      };
      if (this.updateuserform.data[0].Attr == "超级管理员") {
        this.updateuserform.data[0].Attr = 2;
      } else if (this.updateuserform.data[0].Attr == "管理员") {
        this.updateuserform.data[0].Attr = 1;
      } else if (this.updateuserform.data[0].Attr == "普通用户") {
        this.updateuserform.data[0].Attr = 0;
      };
      if (this.updateuserform.data[0].sex == "女性") {
        this.updateuserform.data[0].sex = 0;
      } else {
        this.updateuserform.data[0].sex = 1;
      };
      this.timeup();
      axios({url:"/api/" + "model_user/",
        method:'put',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.updateuserform,
      }).then(res => {
          //执行成功
          if (true) {
            //res.data.code == 1
            that.$message({
              message: "保存成功！",
              type: "success"
            });
            that.getuser();
          } else {
            //失败提示
          }
        })
        .catch(function(err) {
          //请求失败后执行的函数
          console.log("保存失败！");
        });
    }
  },
  submitpic() {
    let that = this;
    this.timeup();
    axios
      .patch("/api/" + "PersonInformation/", {
        Rem: that.userform.Rem,
        Introduction: that.userform.Introduction,
        NoUser: that.userform.NoUser,
        NoSfz: that.userform.NoSfz,
        FaceFearture: that.userform.FaceFearture,
        Photo: that.userform.Photo,
        Photo_dataF: that.userform.Photo_dataF
      })
      .then(res => {
        //执行成功
        if (true) {
          //res.data.code == 1
          that.getuser();
        } else {
          //数据加载失败提示
          that.$message.error(res.data.msg);
        }
      })
      .catch(function(err) {
        //请求失败后执行的函数
        console.log("保存失败！");
      });
  }
};
</script>
<style scoped>
table {
  width: 500px;
}
tr td {
  font-family: "微软雅黑";
}
tr td:nth-child(1) {
  width: 85px;
  padding: 10px 30px 10px 70px;
}
.el-form-item,
.el-form-item .el-date-picker {
  width: 260px;
}
.el-form-item .el-button {
  width: 160px;
  padding: 10px;
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
