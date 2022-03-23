<template>
  <div>
    <el-form v-model="courseplanform" :inline="true" style="margin-top:20px;">
      <el-row style="margin-left:20px;">
        <el-col :span="12">
          <el-form-item label="请输入筛选条件">
            <el-input
              v-model="input_string"
              placeholder="输入课程ID:"
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
              @click="querycourseplan()"
              >筛选</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-tickets"
              @click="getcourseplan2()"
              >全部</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="pagecourseplan"
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
      <el-table-column prop="ID" label="课程ID" width="120" align="center">
      </el-table-column>
      <el-table-column prop="ID_Curricula" label="对应课程ID" width="140" align="center">
      </el-table-column>
      <el-table-column
        prop="TimeBegin"
        label="开始时间"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="TimeEnd"
        label="结束时间"
        width="140"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ID_Location__name"
        label="地点ID"
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
            @click="viewcourseplan(scope.row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-view"
            size="mini"
            circle
            @click="handleclick(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
      <el-col :span="16" style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[5, 10, 25, 50, 100]"
          :page-size="pagesize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeDialogForm('courseplanform')"
    >
      <el-form
        :model="courseplanform"
        :rules="rules"
        ref="courseplanform"
        :inline="true"
        style="margin-left:20px;"
        label-width="110px"
        label-position="right"
        size="mini"
      >
        <el-form-item
          label="课程ID"
          prop="ID"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ID"
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
            v-model="courseplanform.Rem"
            maxlength="64"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="备注为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="简介"
          prop="Introduction"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.Introduction"
            maxlength="64"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="简介为空填0"
          ></el-input>
          </el-form-item>
        <el-form-item
          label="课程名"
          prop="Name"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.Name"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="对应课程ID"
          prop="ID_Curricula"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ID_Curricula"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地点ID"
          prop="ID_Location"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ID_Location"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="主讲人ID"
          prop="ID_Speaker"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ID_Speaker"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开始时间"
          prop="TimeBegin"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeBegin"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="2000-00-00 00:00:00"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="结束时间"
          prop="TimeEnd"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeEnd"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="2000-00-00 00:00:00"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考勤类型"
          prop="Attr"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.Attr" :disabled="isView">
            <el-option label="实验类型" value="1"></el-option>
            <el-option label="普通上课类型" value="2"></el-option>
            <el-option label="讲座考勤类型" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否收费"
          prop="Charge"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.Charge" :disabled="isView">
            <el-option label="免费" value="0"></el-option>
            <el-option label="收费" value="1"></el-option>
            <el-option label="开放" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="派位"
          prop="PwAccess"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.PwAccess" :disabled="isView">
            <el-option label="不派位" value="0"></el-option>
            <el-option label="刷卡派位" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="派位连续性"
          prop="PwContinuous"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.PwContinuous" :disabled="isView">
            <el-option label="连续派位" value="0"></el-option>
            <el-option label="随机派位" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="派位顺序"
          prop="PwDirection"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.PwDirection" :disabled="isView">
            <el-option label="顺序派位" value="0"></el-option>
            <el-option label="逆序派位" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="是否开门"
          prop="DoorOpen"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-select v-model="courseplanform.DoorOpen" :disabled="isView">
            <el-option label="开门" value="0"></el-option>
            <el-option label="不开门" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="考勤开始最早时间"
          prop="TimeBeginCheckBegin"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeBeginCheckBegin"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考勤开始最迟时间"
          prop="TimeBeginCheckEnd"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeBeginCheckEnd"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考勤结束最早时间"
          prop="TimeEndCheckBegin"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeEndCheckBegin"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="考勤结束最迟时间"
          prop="TimeEndCheckEnd"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.TimeEndCheckEnd"
            :disabled="isView"
            suffix-icon="el-icon-edit"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="参与学生学号"
          prop="RangeUsers"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.RangeUsers"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="学生学号为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="部门列表"
          prop="ListDepts"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ListDepts"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="部门列表为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="座位的范围表"
          prop="RangeEqus"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.RangeEqus"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="座位范围表为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="地点列表"
          prop="ListPlaces"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ListPlaces"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="地点列表为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="学生和座位对应表"
          prop="MapUser2Equ"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.MapUser2Equ"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="学生和座位对应表为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="主讲人信息"
          prop="AboutSpeaker"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.AboutSpeaker"
            maxlength="1024"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="主讲人信息为空填0"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="职工号"
          prop="ID_Speaker_NoUser"
          v-if="adddialog || viewdialog || updatedialog || deletedialog"
        >
          <el-input
            v-model="courseplanform.ID_Speaker_NoUser"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            placeholder="职工号为空填0"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="mini"
          v-show="!isView"
          @click="submitcourseplanform('courseplanform')"
          >确定</el-button
        >
        <el-button
          type="info"
          size="mini"
          @click="closeDialogForm('courseplanform')"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import { errcatch } from "../../errcatch";
import { formatDate3,formatDate1} from "../../timeset";
export default {
  data() {
    // 校验设备id是否存在
    const rulesID = (rule, value, callback) => {
      if (this.isEdit) {
        callback();
      }
      //使用axios进行校验
      axios
        .post(this.baseURL + "model_courseplan/", {
          ID: value,
          kind: 7
        })
        .then(res => {
          //请求成功
          if (true) {
            if (res.data.exists) {
              callback(new Error("课程ID已存在！"));
            } else {
              callback();
            }
          } else {
            callback(new Error("检验课程ID后端出现异常！"));
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
      courseplan: [], //所有的设备信息
      pagecourseplan: [], //分页后当前页的设备信息
      input_string: "", //输入的筛选条件
      //分页的相关参数
      total: 0, //数据的总行数
      currentpage: 1, //当前的所在页
      pagesize: 10, //每行显示多少页
      dialogVisible: false,
      courseplanform: {
        ID: "",
        Rem: "",
        Introduction: "",
        Name:"",
        ID_Curricula: "",
        ID_Location: "",
        ID_Speaker: "",
        TimeBegin: "",
        TimeEnd: "",
        Attr: "",
        Charge: "",
        PwAccess: "",
        PwContinuous: "",
        PwDirection: "",
        DoorOpen: "",
        TimeBeginCheckBegin: "",
        TimeBeginCheckEnd: "",
        TimeEndCheckBegin: "",
        TimeEndCheckEnd: "",
        RangeUsers: "",
        ListDepts: "",
        RangeEqus: "",
        ListPlaces: "",
        MapUser2Equ: "",
        AboutSpeaker: "",
        ID_Speaker_NoUser: ""
      },
      searchform:{
    "requires": {},
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

      selectcourseplans: [], //选择复选时把选择记录存在这里
    };
  },
  mounted() {
    //自动加载数据
    this.getcourseplan();
  },
  methods: {
    timeup() {},
    datatrans1(row) {
      if (row.Attr == 1) {
        row.Attr = "实验类型";
      } else if (row.Attr == 2) {
        row.Attr = "普通上课类型";
      } else {
        row.Attr = "讲座考勤类型";
      }

      if (row.Charge == 0) {
        row.Charge = "免费";
      } else if (row.Charge == 1) {
        row.Charge = "收费";
      } else {
        row.Charge = "开放";
      }

      if (row.PwAccess == 0) {
        row.PwAccess = "不派位";
      } else {
        row.PwAccess = "刷卡派位";
      }

      if (row.PwContinuous == 0) {
        row.PwContinuous = "连续派位";
      } else {
        row.PwContinuous = "随机派位";
      }
      if (row.PwDirection == 0) {
        row.PwDirection = "顺序派位";
      } else {
        row.PwDirection = "逆序派位";
      }

      if (row.DoorOpen == 0) {
        row.DoorOpen = "开门";
      } else {
        row.DoorOpen = "不开门";
      }
    },
    datatrans2() {
      if (this.courseplanform.Attr == "实验类型") {
        this.courseplanform.Attr = 0;
      } else if (this.courseplanform.Attr == "普通上课类型") {
        this.courseplanform.Attr = 1;
      } else {
        this.courseplanform.Attr = 2;
      }

      if (this.courseplanform.Charge == "免费") {
        this.courseplanform.Charge = 0;
      } else if (this.courseplanform.Charge == "收费") {
        this.courseplanform.Charge = 1;
      } else {
        this.courseplanform.Charge = 3;
      }

      if (this.courseplanform.PwAccess == "不派位") {
        this.courseplanform.PwAccess = 0;
      } else {
        this.courseplanform.PwAccess = 1;
      }

      if (this.courseplanform.PwContinuous == "连续派位") {
        this.courseplanform.PwContinuous = 0;
      } else {
        this.courseplanform.PwContinuous = 1;
      }
      if (this.courseplanform.PwDirection == "顺序派位") {
        this.courseplanform.PwDirection = 0;
      } else {
        this.courseplanform.PwDirection = 1;
      }

      if (this.courseplanform.DoorOpen == "开门") {
        this.courseplanform.DoorOpen = 0;
      } else {
        this.courseplanform.DoorOpen = 1;
      }
    },
    //详情生成该课程签到记录表
    handleclick(row) {
      localStorage.setItem('courseplan_ID', row.ID);
      this.$router.push({ path: "/qiandaost" });
    },
    getcourseplan2(){
      localStorage.removeItem('kecheng_ID');
      this.getcourseplan()
    },
    //获取所有设备信息
    getcourseplan: function() {
      //记录this的地址
      let that = this;
      this.searchform.size=this.pagesize;
      this.searchform.page=this.currentpage;
      if(localStorage.getItem('kecheng_ID')){
      this.searchform['requires'].ID_Curricula=localStorage.getItem('kecheng_ID')
      this.searchform.service_type=3;
      }
      else{
      this.searchform.service_type=0;
      }
      axios
        ({url:"/api/" + "model_courseplan/search",
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
              //把数据给课程
              that.courseplan = res.data.items;
              //获取返回记录的总行数
              that.total = res.data.total;
              //获取当前页的数据
              that.getpagecourseplan();
              //数据加载成功提示
              that.$message({
                message: "数据加载成功！",
                type: "success"
              });
            } else {
              //数据加载失败提示
            }
          }
        })
        .catch(err=> {
          //请求失败后执行的函数
          errcatch(err);
        });
    },
    //获取当前页设备数据
    getpagecourseplan() {
      //清空pagescourseplan中的数据
      this.pagecourseplan = [];
      //获得当前页的数据
      for (
        let i = 0;
        i < this.pagesize;
        i++
      ) {
        //遍历数据添加到pageshebei中
        this.courseplan[i].TimeBegin=formatDate1(this.courseplan[i].TimeBegin)
        this.courseplan[i].TimeEnd=formatDate1(this.courseplan[i].TimeEnd)
        this.pagecourseplan.push(this.courseplan[i]);
      }
    },
    //实现当前页的设备信息筛选
    querycourseplan() {
      //使用Ajax请求--POST-->传递input_string
      let that = this;
      this.searchform.service_type=3;
      delete this.searchform['requires'].ID_Curricula
      this.searchform['requires'].ID=this.input_string*1;
      //开始Ajax请求
      axios //Axios请求
        ({url:"/api/" + "model_courseplan/search",
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
              //把数据给课程
              that.courseplan = res.data.items;
              //获取返回记录的总行数
              that.total = res.data.total;
              //获取当前页的数据
              that.getpagecourseplan();
              //数据加载成功提示
              that.$message({
                message: "数据加载成功！",
                type: "success"
              });
            } else {
              //数据加载失败提示
            }
          }
        })
        .catch(err=> {
          //请求失败后执行的函数
          errcatch(err);
        });
    },
    //分页时修改每页的行数
    handleSizeChange(pageNumber) {
      //修改当前每页数据行数
      this.pagesize = pageNumber;
      //数据重新分页
      this.getcourseplan();
    },
    //调整当前的页码
    handleCurrentChange(pageNumber) {
      //修改当前的页码
      this.currentpage = pageNumber;
      //数据重新分页
      this.getcourseplan();
    },
    //选择复选框触发操作
    handleSelectionChange(data) {
      this.selectcourseplans = data;
    },
    //添加课程时打开表单
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //清空数据
      this.courseplanform.ID = "";
      this.courseplanform.Rem = "";
      this.courseplanform.Introduction = "";
      this.courseplanform.ID_Curricula = "";
      this.courseplanform.ID_Location = "";
      this.courseplanform.ID_Speaker = "";
      this.courseplanform.TimeBegin = "";
      this.courseplanform.TimeEnd = "";
      this.courseplanform.Attr = "";
      this.courseplanform.Charge = "";
      this.courseplanform.Name = "";
      this.courseplanform.PwAccess = "";
      this.courseplanform.PwContinuous = "";
      this.courseplanform.PwDirection = "";
      this.courseplanform.DoorOpen = "";
      this.courseplanform.TimeBeginCheckBegin = "";
      this.courseplanform.TimeBeginCheckEnd = "";
      this.courseplanform.TimeEndCheckBegin = "";
      this.courseplanform.TimeEndCheckEnd = "";
      this.courseplanform.RangeUsers = "";
      this.courseplanform.ListDepts = "";
      this.courseplanform.RangeEqus = "";
      this.courseplanform.ListPlaces = "";
      this.courseplanform.MapUser2Equ = "";
      this.courseplanform.AboutSpeaker = "";
      this.courseplanform.ID_Speaker_NoUser = "";
      this.adddialog = false;
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

    //查看课程的明细
    viewcourseplan(row) {
      //修改标题
      this.dialogTitle = "查看课程明细";
      //修改isView变量
      this.datatrans1(row);
      this.isView = true;
      this.viewdialog = true;
      //弹出表单
      this.dialogVisible = true;
      //进行深拷贝
      this.courseplanform = JSON.parse(JSON.stringify(row));
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
