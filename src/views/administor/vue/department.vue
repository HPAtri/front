<template>
  <div>
    <el-form v-model="departmentform" :inline="true" style="margin-top:20px;">
      <el-row style="margin-left:20px;">
        <el-col :span="12">
          <el-form-item label="请输入筛选条件：">
            <el-input
              v-model="input_string"
              placeholder="输入部门ID"
              style="width: 420px;"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right;padding-right:10px;">
          <el-button-group>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="querydepartment()"
              >筛选</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-tickets"
              @click="getdepartment2()"
              >全部</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="adddepartment()"
              >添加</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="pagedepartment"
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
      <el-table-column prop="ID" label="部门ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="Name" label="部门编号" width="140" align="center">
      </el-table-column>
      <el-table-column
        prop="ID_Parent"
        label="父级部门"
        width="140"
        align="center"
      >
      </el-table-column>
            <el-table-column
        prop="IdManager"
        label="最后操作人ID"
        width="140"
        align="center"
      >
      </el-table-column>
           <el-table-column
        prop="IMark"
        label="存在标记"
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
            @click="viewdepartment(scope.row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="updatedepartment(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deletedepartment(scope.row)"
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
          @click="deletedepartments()"
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
      @close="closeDialogForm('departmentform')"
    >
      <el-form
        :model="departmentform"
        :rules="rules"
        ref="departmentform"
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
            v-model="departmentform.ID"
            :disabled="isEdit || isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="备注"
          prop="Rem"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.Rem"
            maxlength="64"
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
            v-model="departmentform.Introduction"
            maxlength="254"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="最后操作人ID"
          prop="IdManager"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.IdManager"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="更新时间"
          prop="TimeUpdate"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.TimeUpdate"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="存在标记"
          prop="IMark"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.IMark"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父级部门"
          prop="ID_Parent"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.ID_Parent"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门名称"
          prop="Name"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.Name"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门简称"
          prop="Name2"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.Name2"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="修改者名字"
          prop="ID_Manager_Name"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="departmentform.ID_Manager_Name"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          v-show="!isView"
          @click="submitdepartmentform('departmentform')"
          >确定</el-button
        >
        <el-button
          type="info"
          size="mini"
          @click="closeDialogForm('departmentform')"
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
        .post(this.baseURL + "model_department/", {
          ID: value,
          kind: 7
        })
        .then(res => {
          //请求成功
          if (true) {
            if (res.data.exists) {
              callback(new Error("ID已存在！"));
            } else {
              callback();
            }
          } else {
            callback(new Error("检验ID后端出现异常！"));
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
      department: [], //所有的设备信息
      pagedepartment: [], //分页后当前页的设备信息
      input_string: "", //输入的筛选条件
      //分页的相关参数
      total: 0, //数据的总行数
      currentpage: 1, //当前的所在页
      pagesize: 10, //每行显示多少页
      dialogVisible: false,
      departmentform: {
        ID: "",
        Rem: "",
        Introduction: "",
        TimeUpdate: "",
        IdManager: "",
        IMark: "",
        ID_Parent: "",
        Name: "",
        Name2: "",
        ID_Manager_Name: ""
      },
      rules: {
        ID: [
          { required: true, message: "部门ID不能为空", trigger: "blur" },
          // { validator: rulesID, trigger: "blur" }
        ],
        Rem: [{ required: true, message: "备注为空填0", trigger: "blur" }],
        Introduction: [
          { required: true, message: "简介为空填0", trigger: "blur" }
        ],
        ID_Parent: [
          { required: true, message: "父级部门不能为空", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" }
        ],
        Name2: [
          { required: true, message: "部门简称不能为空", trigger: "blur" }
        ],
        ID_Manager_Name: [
          { required: true, message: "最后操作人ID不能为空", trigger: "blur" }
        ],
        TimeUpdate: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        IdManager: [
          { required: true, message: "修改者名字不能为空", trigger: "blur" }
        ],
        IMark: [
          { required: true, message: "存在标记不能为空", trigger: "blur" }
        ]
      },
      searchform:{
      requires: {
      },
      service_type: 0,
      page: 1,
      size: 5
    },

      dialogTitle: "", //弹出框的标题
      isView: false, //标识是否是查看
      isEdit: false, //标识是否是修改
      adddialog: false,
      viewdialog: false,
      updatedialog: false,
      deletedialog: false,

      selectdepartments: [], //选择复选时把选择记录存在这里
      adddepartmentform: {
        data: [
          {
            Rem: "",
            Introduction: "",
            ID_Parent: "",
            Name: "",
            Name2: ""
          }
        ],
        n: 1
      },
      updatedepartmentform: {
        data: [
          {
            ID: "",
            Rem: "",
            Introduction: "",
            ID_Parent: "",
            Name: "",
            Name2: ""
          }
        ],
        n: 1
      }
    };
  },
  mounted() {
    //自动加载数据
    this.getdepartment();
  },
  methods: {
    timeup1() {
      this.adddepartmentform.data[0].TimeUpdate =
        new Date().getTime() - new Date("2000-1-1 00:00:00").getTime();
    },
    timeup2() {
      this.updatedepartmentform.data[0].TimeUpdate =
        new Date().getTime() - new Date("2000-1-1 00:00:00").getTime();
    },
    //详情生成该部门签到记录表
    handleclick(row) {
      //跳转路由
      //         setTimeout(function (){
      // 	      this.$nextTick(function (){
      // 	      this.$bus.$emit('kaoqing',[row.ID]);
      // })},500);
      this.$router.push({ path: "/qiandao?index=" + row.ID });
    },
      getdepartment(){
      this.searchform.service_type=0,
      this.getdepartment()
    },
    //获取所有设备信息
    getdepartment: function() {
      //记录this的地址
      let that = this;
      this.searchform.size=this.pagesize;
      this.searchform.page=this.currentpage;
      //使用Axios实现Ajax请求
      axios
        ({url:"/api/" + "model_department/search",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.searchform,
      })
        .then(function(res) {
          //请求成功后执行的函数
          //console.log(res);
          if (res.data.code == 0) {
            that.$router.push("/index");
          } else {
            if (true) {
              //res.data.code ===1
              //把数据给部门
              that.department = res.data.items;
              //获取返回记录的总行数
              that.total = res.data.total;
              //获取当前页的数据
              that.getpagedepartment();
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
        .catch(function(res) {
          //请求失败后执行的函数
          that.$message.error("获取后端数据出现异常");
        });
    },
    //获取当前页设备数据
    getpagedepartment() {
      //清空pagesdepartment中的数据
      this.pagedepartment = [];
      //获得当前页的数据
      for (
        let i = 0;
        i < this.pagesize;
        i++
      ) {
        //遍历数据添加到pageshebei中
        this.pagedepartment.push(this.department[i]);
      }
    },
    //实现当前页的设备信息筛选
    querydepartment() {
      let that = this;
      this.searchform.service_type=3;
      this.searchform['requires'].ID=this.input_string*1;
      //开始Ajax请求
      axios //Axios请求
        ({url:"/api/" + "model_department/search",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.searchform,
      })
        .then(function(res) {
          if (true) {
            that.getdepartment();
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
          that.$message.error("获取后端数据出现异常!");
        });
    },
    //分页时修改每页的行数
    handleSizeChange(size) {
      //修改当前每页数据行数
      this.pagesize = size;
      //数据重新分页
      this.getdepartment();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getdepartment();
    },
    //选择复选框触发操作
    handleSelectionChange(data) {
      this.selectdepartments = data;
    },
    //添加部门时打开表单
    adddepartment() {
      //修改标题
      this.dialogTitle = "添加部门明细";
      this.adddialog = true;
      this.dialogVisible = true;
    },
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //清空数据
      this.departmentform.ID = "";
      this.departmentform.Rem = "";
      this.departmentform.Introduction = "";
      this.departmentform.ID_Parent = "";
      this.departmentform.Name = "";
      this.departmentform.Name2 = "";
      this.departmentform.TimeUpdate = "";
      this.departmentform.IdManager = "";
      this.departmentform.IMark = "";
      this.departmentform.ID_Manager_Name = "";
      this.adddepartmentform.data[0].Rem = "";
      this.adddepartmentform.data[0].Introduction = "";
      this.adddepartmentform.data[0].ID_Parent = "";
      this.adddepartmentform.data[0].Name = "";
      this.adddepartmentform.data[0].Name2 = "";
      this.updatedepartmentform.data[0].ID = "";
      this.updatedepartmentform.data[0].Rem = "";
      this.updatedepartmentform.data[0].Introduction = "";
      this.updatedepartmentform.data[0].ID_Parent = "";
      this.updatedepartmentform.data[0].Name = "";
      this.updatedepartmentform.data[0].Name2 = "";
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

    //查看部门的明细
    viewdepartment(row) {
      //修改标题
      this.dialogTitle = "查看部门明细";
      //修改isView变量
      this.isView = true;
      this.viewdialog = true;
      //弹出表单
      this.dialogVisible = true;
      //进行深拷贝
      this.departmentform = JSON.parse(JSON.stringify(row));
    },
    //修改设备的信息
    updatedepartment(row) {
      //修改标题
      this.dialogTitle = "修改部门明细";
      //修改isEdit变量
      this.isEdit = true;
      this.updatedialog = true;
      //弹出表单
      this.dialogVisible = true;
      this.dialogVisible = true;
      this.departmentform = JSON.parse(JSON.stringify(row));
    },
    //提交设备的表单（添加、修改）
    submitdepartmentform(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验成功后执行添加或者修改
          if (this.isEdit) {
            this.submitupdatedepartment();
          } else {
            //添加
            this.submitadddepartment();
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitadddepartment() {
      this.adddepartmentform.data[0].Rem = this.departmentform.Rem;
      this.adddepartmentform.data[0].Introduction = this.departmentform.Introduction;
      this.adddepartmentform.data[0].ID_Parent =
        this.departmentform.ID_Parent * 1;
      this.adddepartmentform.data[0].Name = this.departmentform.Name;
      this.adddepartmentform.data[0].Name2 = this.departmentform.Name2;
      let that = this;
      //执行Axios请求
      axios({url:"/api/" + "model_department/",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.adddepartmentform,
      }).then(res => {
          //执行成功
          if (true) {
            that.getdepartment();
            //提示
            that.$message({
              message: "数据加载成功！",
              type: "success"
            });
            //关闭窗体
            that.closeDialogForm("departmentform");
          } else {
            //失败提示
            that.$message.error(res.data.error_message);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("获取后端结果出现异常");
        });
    },
    //修改更新到数据库
    submitupdatedepartment() {
      this.updatedepartmentform.data[0].ID = this.departmentform.ID * 1;
      this.updatedepartmentform.data[0].Rem = this.departmentform.Rem;
      this.updatedepartmentform.data[0].Introduction = this.departmentform.Introduction;
      this.updatedepartmentform.data[0].ID_Parent =
        this.departmentform.ID_Parent * 1;
      this.updatedepartmentform.data[0].Name = this.departmentform.Name;
      this.updatedepartmentform.data[0].Name2 = this.departmentform.Name2;
      let that = this;
      //执行Axios请求
      axios({url:"/api/" + "model_department/",
        method:'put',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.updatedepartmentform,
      }).then(res => {
          //执行成功
          if (true) {
            //res.data.code == 1
            // //获取所有部门信息
            // that.department = res.data.data;
            // //获取记录条数
            // that.total = res.data.data.length;
            // //获取分页信息
            // that.getpagedepartment();
            that.getdepartment();
            //提示
            that.$message({
              message: "数据修改成功！",
              type: "success"
            });
            //关闭窗体
            that.closeDialogForm("departmentform");
          } else {
            //失败提示
            that.$message.error(res.data.error_message);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("获取后端结果出现异常！");
        });
    },
    //删除一条部门信息
    deletedepartment(row) {
      //等待确认
      this.$confirm(
        "是否确认删除部门信息【部门ID：" +
          row.ID +
          "\t部门名称：" +
          row.Name +
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
            ({url:"/api/" + "model_department/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{ "data": [{ 'ID': row.ID }],'n':1 }
        }).then(res => {
              if (true) {
                // //获取所有部门信息
                // that.department = res.data.data;
                // //获取记录数
                // that.total = res.data.data.length;
                // //分页
                // that.getpagedepartment();
                that.getdepartment();
                //提示
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
    //批量删除部门信息
    deletedepartments() {
      //等待确认
      this.$confirm(
        "是否确认批量删除" + this.selectdepartments.length + "个部门信息吗？",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let data = [];
          for (var i = 0; i < this.selectdepartments.length; i++) {
            data.push({ ID: this.selectdepartments[i].ID * 1 });
          }
          //确认删除响应事件
          let that = this;
          //调用后端接口
          axios
             ({url:"/api/" + "model_department/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{
              data,
              n: this.selectdepartments.length
            }
        }).then(res => {
              if (true) {
                // //获取所有部门信息
                // that.department = res.data.data;
                // //获取记录数
                // that.total = res.data.data.length;
                // //分页
                // that.getpagedepartment();
                that.getdepartment();
                //提示
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
            type: "info",
            message: "已取消删除"
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
