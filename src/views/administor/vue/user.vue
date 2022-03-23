<template>
  <div>
    <el-form v-model="userform" :inline="true" style="margin-top:20px;">
      <el-row style="margin-left:20px;">
        <el-col :span="12">
          <el-form-item label="请输入筛选条件：">
            <el-input
              v-model="input_string"
              placeholder="输入用户ID"
              style="width: 420px;"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right;padding-right:10px;">
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="queryuser()"
              >筛选</el-button
            >
            <el-button type="primary" icon="el-icon-tickets" @click="getuser2()"
              >全部</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="adduser()"
              >添加</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="pageuser"
      height="400"
      border
      style="width: 90%;margin-left:20px"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
        fixed="left"
      >
      </el-table-column>
      <el-table-column prop="ID" label="用户ID" width="120" align="center">
      </el-table-column>
            <el-table-column
        prop="Name"
        label="用户名"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="NoCard"
        label="用户的卡号"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="NoUser"
        label="账号"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="NoSfz"
        label="身份证号"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column width="400px" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-more"
            size="mini"
            circle
            @click="viewuser(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="updateuser(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteuser(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
      <el-col :span="8" style="text-align: left;margin-left:20px">
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          @click="deleteusers()"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialogForm('userform')"
    >
      <el-form
        :model="userform"
        :rules="rules"
        ref="userform"
        :inline="true"
        style="margin-left:20px;"
        label-width="110px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="ID"
          prop="ID"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.ID"
            :disabled="isEdit || isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="Rem "
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Rem"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="简介"
          prop="Introduction"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Introduction"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门ID"
          prop="Deptid"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Deptid"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="卡号"
          prop="NoCard"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.NoCard"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号"
          prop="NoUser"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.NoUser"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="身份证号"
          prop=""
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.NoSfz"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="Name"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Name"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="Psw"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Psw"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="Sex"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select
            v-model="userform.Sex"
            :disabled="isView"
            placeholder="请选择性别"
          >
            <el-option label="女性" value="女性"></el-option>
            <el-option label="男性" value="男性"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="权限"
          prop="Attr"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select
            v-model="userform.Attr"
            :disabled="isView"
            placeholder="请选择身份"
          >
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="教务处管理员" value="教务处管理员"></el-option>
            <el-option label="教师" value="教师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="机房权限"
          prop="AttrJf"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select
            v-model="userform.AttrJf"
            :disabled="isView"
            placeholder="请选择身份"
          >
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="教务处管理员" value="教务处管理员"></el-option>
            <el-option label="教师" value="教师"></el-option>
            <el-option label="学生" value="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Power"
          prop="Power"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select
            v-model="userform.Power"
            :disabled="isView"
            placeholder="请选择"
          >
            <el-option label="0" value="0"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="85" value="5"></el-option>
            <el-option label="127" value="127"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="PowerJf"
          prop="PowerJf"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
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
        <el-form-item
          label="电子邮箱"
          prop="Email"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Email"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话号码"
          prop="Phone"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="
              userform.Phone
            "
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="余额1"
          prop="Yue"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Yue"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="余额2"
          prop="Yue2"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.Yue2"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="管理ID"
          prop="LocalID"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="userform.LocalID"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
        v-if="adddialog || viewdialog || updatedialog || deletedialog"
      >
        <el-button
          type="primary"
          size="mini"
          v-show="!isView"
          @click="submituserform('userform')"
          >确定</el-button
        >
        <el-button type="info" size="mini" @click="closeDialogForm('userform')"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { errcatch } from "../../errcatch";
export default {
  data() {
    // 校验设备id是否存在
    const rulesID = (rule, value, callback) => {
      if (this.isEdit) {
        callback();
      }
      //使用axios进行校验
      axios
        .post(this.baseURL + "IDEvaluation/", {
          id: value,
          king: 1
        })
        .then(res => {
          //请求成功
          if (true) {
            if (res.data.exists) {
              callback(new Error("用户id已存在！"));
            } else {
              callback();
            }
          } else {
            callback(new Error("检验用户id后端出现异常！"));
          }
        })
        .catch(err => {
          //请求失败打印
          errcatch(err);
        });
    };

    return {
      baseURL: "/api/",
      webtoken:localStorage.getItem("token"),
      user: [], //所有的用户信息
      pageuser: [], //分页后当前页的设备信息
      input_string: "", //输入的筛选条件
      //分页的相关参数
      total: 0, //数据的总行数
      currentpage: 1, //当前的所在页
      pagesize: 10, //每行显示多少页
      dialogVisible: false,
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
      },
      rules: {
        ID: [
          { required: true, message: "用户id不能为空", trigger: "blur" },
          // { validator: rulesID, trigger: "blur" }
        ],
        NoCard: [
          { required: true, message: "用户的卡号不能为空", trigger: "blur" }
        ],
        NoUser: [
          { required: true, message: "用户的身份id不能为空", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "使用者的姓名不能为空", trigger: "blur" }
        ],
        Psw: [
          { required: true, message: "使用者的密码不能为空", trigger: "blur" }
        ],
        Deptid: [
          { required: true, message: "用户所属部门不能为空", trigger: "blur" }
        ],
        Sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        Attr: [{ required: true, message: "权限不能为空", trigger: "blur" }],
        AttrJf: [{ required: true, message: "权限不能为空", trigger: "blur" }],
      },
      searchform:{
  "requires": {
          
        },
        service_type: 0,
        page: 1,
        size: 5
      },
      updateuserform:{
      data: [
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
  n:1
},
adduserform:{
      "data": [
        {
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
  "n": 1
},

      dialogTitle: "", //弹出框的标题

      isView: false, //标识是否是查看
      isEdit: false, //标识是否是修改
      adddialog: false,
      viewdialog: false,
      updatedialog: false,
      deletedialog: false,

      selectusers: [], //选择复选时把选择记录存在这里
      selectusersid: []
    };
  },
  mounted() {
    //自动加载数据
    this.getuser();
  },
  methods: {
    datatrans1(row) {
      if (row.Attr == 2) {
        row.Attr = "超级管理员";
      } else if (row.Attr == 1) {
        row.Attr = "管理员";
      } else if (row.Attr == 0) {
        row.Attr = "教师";
      } else {
        row.Attr = "学生";
      }
      if (row.AttrJf == 2) {
        row.AttrJf = "超级管理员";
      } else if (row.AttrJf == 1) {
        row.AttrJf = "管理员";
      } else if (row.AttrJf == 0) {
        row.AttrJf = "教师";
      } else {
        row.AttrJf = "学生";
      }
      if (row.Sex == 0) {
        row.Sex = "女性";
      } else {
        row.Sex = "男性";
      }
    },
    datatrans2() {
      if (this.userform.Attr == "超级管理员") {
        this.userform.Attr = 2;
      } else if (this.userform.Attr == "管理员") {
        this.userform.Attr = 1;
      } else if (this.userform.Attr == "教师") {
        this.userform.Attr = 0;
      }else {
        this.userform.Attr = 3;
      }
      if (this.userform.AttrJf == "超级管理员") {
        this.userform.AttrJf = 2;
      } else if (this.userform.AttrJf == "管理员") {
        this.userform.AttrJf = 1;
      } else if (this.userform.AttrJf == "教师") {
        this.userform.AttrJf = 0;
      }else {
        this.userform.AttrJf = 3;
      }
      if (this.userform.Sex == "女性") {
        this.userform.Sex = 0;
      } else {
        this.userform.Sex = 1;
      }
    },
    getuser2(){
      this.searchform.service_type=0,
      this.getuser()
    },
    //获取所有设备信息
    getuser: function() {
      //记录this的地址
      let that = this;
      this.searchform.size=this.pagesize;
      this.searchform.page=this.currentpage;
      //使用Axios实现Ajax请求
      axios
        ({url:"/api/" + "model_user/search",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.searchform,
      }).then(function(res) {
          //请求成功后执行的函数
          console.log(res);
          if (res.data.code == 0) {
            that.$router.push("/index");
          } else {
            if (true) {
              //res.data.code ===1
              //把数据给user
              that.user = res.data.items;
              //获取返回记录的总行数
              that.total = res.data.total;
              //获取当前页的数据
              that.getpageuser();
              //数据加载成功提示
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

    //获取当前页设备数据
    getpageuser() {
      //清空pageuser中的数据
      this.pageuser = [];
      //获得当前页的数据
       for (
        let i = 0;
        i < this.pagesize;
        i++
      ) {
        //遍历数据添加到pageshebei中
        this.pageuser.push(this.user[i]);
      }
    },
    //实现当前页的设备信息筛选
    queryuser() {
      //使用Ajax请求--POST-->传递input_string
      let that = this;
      this.searchform.service_type=1;
      this.searchform['requires'].ID=this.input_string*1;
      //开始Ajax请求
      axios //Axios请求
        ({url:"/api/" + "model_user/search",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.searchform,
      })
        .then(function(res) {
          if (true) {
            //把数据给user
            //that.user = res.data.data;
            //获取返回记录的总行数
            //that.total = res.data.data.length;
            //获取当前页的数据
            //that.getpageuser();
            that.getuser();
            //数据加载成功提示
            that.$message({
              message: "筛选数据加载成功！",
              type: "success"
            });
          } else {
            //数据加载失败提示
            that.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          errcatch(err);
          that.$message.error("获取后端数据出现异常!");
        });
    },
    //分页时修改每页的行数
    handleSizeChange(size) {
      //修改当前每页数据行数
      this.pagesize = size;
      //数据重新分页
      this.getuser();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getuser();
    },
    //选择复选框触发操作
    handleSelectionChange(data) {
      this.selectusers = data;
    },
    //添加设备时打开表单
    adduser() {
      //修改标题
      this.dialogTitle = "添加用户明细";
      this.adddialog = true;
      //弹出表单
      this.dialogVisible = true;
    },
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //清空数据
      this.userform.ID = "";
      this.userform.Rem = "";
      this.userform.Introduction = "";
      this.userform.Deptid = "";
      this.userform.NoCard = "";
      this.userform.NoUser = "";
      this.userform.NoSfz = "";
      this.userform.Name = "";
      this.userform.Psw = "";
      this.userform.Sex = "";
      this.userform.Attr = "";
      this.userform.AttrJf = "";
      this.userform.Power = "";
      this.userform.PowerJf = "";
      this.userform.Email = "";
      this.userform.Phone = "";
      this.userform.Yue = "";
      this.userform.Yue2 = "";
      this.userform.LocalID = "";
      this.adduserform.data[0].Rem="";
      this.adduserform.data[0].Introduction = "";
      this.adduserform.data[0].Deptid = "";
      this.adduserform.data[0].NoCard = "";
      this.adduserform.data[0].NoUser = "";
      this.adduserform.data[0].NoSfz = "";
      this.adduserform.data[0].Name = "";
      this.adduserform.data[0].Psw = "";
      this.adduserform.data[0].Sex = "";
      this.adduserform.data[0].Attr = "";
      this.adduserform.data[0].AttrJf = "";
      this.adduserform.data[0].Power = "";
      this.adduserform.data[0].PowerJf = "";
      this.adduserform.data[0].Email = "";
      this.adduserform.data[0].Phone = "";
      this.adduserform.data[0].Yue = "";
      this.adduserform.data[0].Yue2 = "";
      this.adduserform.data[0].LocalID = "";
      this.updateuserform.data[0].Rem="";
      this.updateuserform.data[0].Introduction = "";
      this.updateuserform.data[0].Deptid = "";
      this.updateuserform.data[0].NoCard = "";
      this.updateuserform.data[0].NoUser = "";
      this.updateuserform.data[0].NoSfz = "";
      this.updateuserform.data[0].Name = "";
      this.updateuserform.data[0].Psw = "";
      this.updateuserform.data[0].Sex = "";
      this.updateuserform.data[0].Attr = "";
      this.updateuserform.data[0].AttrJf = "";
      this.updateuserform.data[0].Power = "";
      this.updateuserform.data[0].PowerJf = "";
      this.updateuserform.data[0].Email = "";
      this.updateuserform.data[0].Phone = "";
      this.updateuserform.data[0].Yue = "";
      this.updateuserform.data[0].Yue2 = "";
      this.updateuserform.data[0].LocalID = "";
      this.adddialog = false;
      this.viewdialog = false;
      this.updatedialog = false;
      this.deletedialog = false;
      //重置表单的校验
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
      //关闭
      this.dialogVisible = false;
      this.isView = false;
      this.isEdit = false;
      this.adddialog = false;
      this.viewdialog = false;
      this.updatedialog = false;
      this.deletedialog = false;
    },

    //查看设备的明细
    viewuser(row) {
      //修改标题
      this.dialogTitle = "查看用户明细";
      //修改isView变量
      this.isView = true;
      this.datatrans1(row);
      this.viewdialog = true;
      //弹出表单
      this.dialogVisible = true;
      //进行深拷贝
      this.userform = JSON.parse(JSON.stringify(row));
    },
    //修改设备的信息
    updateuser(row) {
      //修改标题
      this.dialogTitle = "修改用户明细";
      //修改isEdit变量
      this.isEdit = true;
      this.datatrans1(row);
      this.updatedialog = true;
      //弹出表单
      this.dialogVisible = true;
      //进行深拷贝
      this.userform = JSON.parse(JSON.stringify(row));
    },
    //提交用户的表单（添加、修改）
    submituserform(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验成功后执行添加或者修改
          if (this.isEdit) {
            //console.log(this.timeupdate);
            this.datatrans2();
            this.submitupdateuser();
          } else {
            //添加
            this.datatrans2();
            this.submitadduser();
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitadduser() {
      let that = this;
      this.adduserform.data[0].Rem=this.userform.Rem;
      this.adduserform.data[0].Introduction=this.userform.Introduction;
      this.adduserform.data[0].Deptid=this.userform.Deptid*1;
      this.adduserform.data[0].NoCard=this.userform.NoCard;
      this.adduserform.data[0].NoUser=this.userform.NoUser;
      this.adduserform.data[0].NoSfz=this.userform.NoSfz*1;
      this.adduserform.data[0].Name=this.userform.Name;
      this.adduserform.data[0].Psw=this.userform.Psw;
      this.adduserform.data[0].Sex=this.userform.Sex;
      this.adduserform.data[0].Attr=this.userform.Attr;
      this.adduserform.data[0].AttrJf=this.userform.AttrJf;
      this.adduserform.data[0].Power=this.userform.Power*1;
      this.adduserform.data[0].PowerJf=this.userform.PowerJf*1;
      this.adduserform.data[0].Email=this.userform.Email;
      this.adduserform.data[0].Phone=this.userform.Phone*1;
      this.adduserform.data[0].Yue=this.userform.Yue*1;
      this.adduserform.data[0].Yue2=this.userform.Yue2*1;
      this.adduserform.data[0].LocalID=this.userform.LocalID;
      //执行Axios请求
      axios
        axios({url:"/api/" + "model_user/",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.adduserform,
      }).then(res => {
          //执行成功
          if (true) {
            //res.data.code == 1
            that.$message({
              message: "数据添加成功！",
              type: "success"
            });
            that.getuser();
            //关闭窗体
            that.closeDialogForm("userform");
          } else {
            //失败提示
            that.$message.error(res.data.error_message);
          }
        })
        .catch(err => {
          //执行失败
          errcatch(err);
          that.$message.error("获取后端结果出现异常！");
        });
    },
    //修改更新到数据库
    submitupdateuser() {
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
      //执行Axios请求
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
            // //获取所有用户信息
            // that.user = res.data.data;
            // //获取记录条数
            // that.total = res.data.data.length;
            // //获取分页信息
            // that.getpageuser();
            //提示
            that.getuser();
            that.$message({
              message: "数据修改成功！",
              type: "success"
            });
            //关闭窗体
            that.closeDialogForm("userform");
          } else {
            //失败提示
            that.$message.error(res.data.error_message);
          }
        })
        .catch(err => {
          //执行失败
          errcatch(err);
          that.$message.error("获取后端结果出现异常！");
        });
    },
    //删除一条用户记录
    deleteuser(row) {
      //等待确认
      this.$confirm(
        "是否确认删除用户信息【用户ID：" +
          row.ID +
          "\t姓名：" +
          row.NoCard +
          "】信息？",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          //确认删除响应事件
          let that = this;
          //调用后端接口
          axios
            ({url:"/api/" + "model_user/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{ "data": [{ 'ID': row.ID }],'n':1 }
        }).then(res => {
              if (true) {
                that.getuser();
                that.$message({
                  message: "数据删除成功！",
                  type: "success"
                });
              } else {
                that.$message.error("数据删除失败！");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除设备记录
    deleteusers() {
      //等待确认
      this.$confirm(
        "是否确认批量删除" + this.selectusers.length + "个用户信息吗？",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let data = [];
          for (var i = 0; i < this.selectusers.length; i++) {
            data.push({ ID: this.selectusers[i].ID });
          }
          //确认删除响应事件
          let that = this;
          //调用后端接口
          //console.log(that.selectusers[id])
          axios
            ({url:"/api/" + "model_user/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{
              data,
              n: this.selectusers.length
            }
        }).then(res => {
              if (true) {
                that.getuser();
                that.$message({
                  message: "数据批量删除成功！",
                  type: "success"
                });
              } else {
                that.$message.error("数据批量删除失败！");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "删除失败"
          });
        });
    }
  }
};
</script>
<style>
html,
body,
.el-container {
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.el-dialog .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-dialog .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-dialog .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-dialog .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
