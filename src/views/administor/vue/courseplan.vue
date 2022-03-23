<template>
  <div>
    <el-form v-model="courseplanform" :inline="true" style="margin-top:20px;">
      <el-row style="margin-left:20px;">
        <el-col :span="12">
          <el-form-item label="请输入筛选条件：">
            <el-input
              v-model="input_string"
              placeholder="输入筛选条件"
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
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="addcourseplan()"
              >添加</el-button
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
      <el-table-column prop="ID_Curricula" label="ID序列" width="140" align="center">
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
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="updatecourseplan(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deletecourseplan(scope.row)"
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
      <el-col :span="8" style="text-align: left;margin-left:20px">
        <el-button
          type="primary"
          icon="el-icon-delete"
          size="mini"
          @click="deletecourseplans()"
          >批量删除</el-button
        >
      </el-col>
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
          label="ID序列"
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
      rules: {
        ID: [
          { required: true, message: "课程ID不能为空", trigger: "blur" },
          // { validator: rulesID, trigger: "blur" }
        ],
        ID_Curricula: [
          { required: true, message: "ID序列不能为空", trigger: "blur" }
        ],
        ID_Location: [
          { required: true, message: "地点ID不能为空", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "课程名不能为空", trigger: "blur" }
        ],
        ID_Speaker: [
          { required: true, message: "主讲人ID不能为空", trigger: "blur" }
        ],
        TimeBegin: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        TimeEnd: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        Attr: [
          { required: true, message: "考勤类型不能为空", trigger: "blur" }
        ],
        Charge: [
          { required: true, message: "是否收费不能为空", trigger: "blur" }
        ],
        PwAccess: [
          { required: true, message: "派位不能为空", trigger: "blur" }
        ],
        PwContinuous: [
          { required: true, message: "派位连续性不能为空", trigger: "blur" }
        ],
        PwDirection: [
          { required: true, message: "派位顺序不能为空", trigger: "blur" }
        ],
        DoorOpen: [
          { required: true, message: "是否开门不能为空", trigger: "blur" }
        ],
        TimeBeginCheckBegin: [
          {
            required: true,
            message: "考勤开始最早时间不能为空",
            trigger: "blur"
          }
        ],
        TimeBeginCheckEnd: [
          {
            required: true,
            message: "考勤开始最迟时间不能为空",
            trigger: "blur"
          }
        ],
        TimeEndCheckBegin: [
          {
            required: true,
            message: "考勤结束最早时间不能为空",
            trigger: "blur"
          }
        ],
        TimeEndCheckEnd: [
          {
            required: true,
            message: "考勤结束最迟时间不能为空",
            trigger: "blur"
          }
        ]
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
      addcourseplanform: {
        data: [
          {
            Rem: "",
            Introduction: "",
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
          }
        ],
        n: 1
      },
      updatecourseplanform: {
        data: [
          {
            ID: "",
            Rem: "",
            Introduction: "",
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
          }
        ],
        n: 1
      }
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
      this.$router.push({ path: "/qiandao?index=" + row.ID });
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
          if (true) {
            //把数据给shebei
            //that.courseplan = res.data.data;
            //获取返回记录的总行数
            //that.total = res.data.data.length;
            //获取当前页的数据
            //that.getpagecourseplan();
            that.getcourseplan();
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
    addcourseplan() {
      //修改标题
      this.dialogTitle = "添加课程明细";
      this.adddialog = true;
      //弹出表单
      this.dialogVisible = true;
    },
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
      this.addcourseplanform.data[0].Rem = "";
      this.addcourseplanform.data[0].ID_Curricula = "";
      this.addcourseplanform.data[0].Introduction = "";
      this.addcourseplanform.data[0].ID_Location = "";
      this.addcourseplanform.data[0].ID_Speaker = "";
      this.addcourseplanform.data[0].TimeBegin = "";
      this.addcourseplanform.data[0].TimeEnd = "";
      this.addcourseplanform.data[0].Name = "";
      this.addcourseplanform.data[0].Attr = "";
      this.addcourseplanform.data[0].Charge = "";
      this.addcourseplanform.data[0].PwAccess = "";
      this.addcourseplanform.data[0].PwContinuous = "";
      this.addcourseplanform.data[0].PwDirection = "";
      this.addcourseplanform.data[0].DoorOpen = "";
      this.addcourseplanform.data[0].TimeBeginCheckBegin = "";
      this.addcourseplanform.data[0].TimeBeginCheckEnd = "";
      this.addcourseplanform.data[0].TimeEndCheckBegin = "";
      this.addcourseplanform.data[0].TimeEndCheckEnd = "";
      this.addcourseplanform.data[0].RangeUsers = "";
      this.addcourseplanform.data[0].ListDepts = "";
      this.addcourseplanform.data[0].RangeEqus = "";
      this.addcourseplanform.data[0].ListPlaces = "";
      this.addcourseplanform.data[0].MapUser2Equ = "";
      this.addcourseplanform.data[0].AboutSpeaker = "";
      this.addcourseplanform.data[0].ID_Speaker_NoUser = "";
      this.updatecourseplanform.data[0].ID = "";
      this.updatecourseplanform.data[0].Rem = "";
      this.updatecourseplanform.data[0].ID_Curricula = "";
      this.updatecourseplanform.data[0].Introduction = "";
      this.updatecourseplanform.data[0].ID_Location = "";
      this.updatecourseplanform.data[0].ID_Speaker = "";
      this.updatecourseplanform.data[0].TimeBegin = "";
      this.updatecourseplanform.data[0].TimeEnd = "";
      this.updatecourseplanform.data[0].Name = "";
      this.updatecourseplanform.data[0].Attr = "";
      this.updatecourseplanform.data[0].Charge = "";
      this.updatecourseplanform.data[0].PwAccess = "";
      this.updatecourseplanform.data[0].PwContinuous = "";
      this.updatecourseplanform.data[0].PwDirection = "";
      this.updatecourseplanform.data[0].DoorOpen = "";
      this.updatecourseplanform.data[0].TimeBeginCheckBegin = "";
      this.updatecourseplanform.data[0].TimeBeginCheckEnd = "";
      this.updatecourseplanform.data[0].TimeEndCheckBegin = "";
      this.updatecourseplanform.data[0].TimeEndCheckEnd = "";
      this.updatecourseplanform.data[0].RangeUsers = "";
      this.updatecourseplanform.data[0].ListDepts = "";
      this.updatecourseplanform.data[0].RangeEqus = "";
      this.updatecourseplanform.data[0].ListPlaces = "";
      this.updatecourseplanform.data[0].MapUser2Equ = "";
      this.updatecourseplanform.data[0].AboutSpeaker = "";
      this.updatecourseplanform.data[0].ID_Speaker_NoUser = "";
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
    },
    //修改设备的信息
    updatecourseplan(row) {
      //修改标题
      this.dialogTitle = "修改课程明细";
      //修改isEdit变量
      this.isEdit = true;
      this.datatrans1(row);
      this.updatedialog = true;
      //弹出表单
      this.dialogVisible = true;
      this.courseplanform = JSON.parse(JSON.stringify(row));
    },
    //提交设备的表单（添加、修改）
    submitcourseplanform(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验成功后执行添加或者修改
          if (this.isEdit) {
            this.timeup();
            this.datatrans2();
            this.submitupdatecourseplan();
          } else {
            //添加
            this.timeup();
            this.datatrans2();
            this.submitaddcourseplan();
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitaddcourseplan() {
      this.addcourseplanform.data[0].Rem = this.courseplanform.Rem;
      this.addcourseplanform.data[0].Introduction = this.courseplanform.Introduction;
      this.addcourseplanform.data[0].ID_Location =
        this.courseplanform.ID_Location * 1;
      this.addcourseplanform.data[0].ID_Curricula=this.courseplanform.ID_Curricula;
      this.addcourseplanform.data[0].ID_Speaker = this.courseplanform.ID_Speaker * 1;
      this.addcourseplanform.data[0].TimeBegin =formatDate3(
        this.courseplanform.TimeBegin
      );
      this.addcourseplanform.data[0].TimeEnd =formatDate3(
        this.courseplanform.TimeEnd
      );
      this.addcourseplanform.data[0].Attr = this.courseplanform.Attr * 1;
      this.addcourseplanform.data[0].Charge = this.courseplanform.Charge * 1;
      this.addcourseplanform.data[0].PwAccess = this.courseplanform.PwAccess * 1;
      this.addcourseplanform.data[0].PwContinuous =
        this.courseplanform.PwContinuous * 1;
      this.addcourseplanform.data[0].PwDirection =
        this.courseplanform.PwDirection * 1;
      this.addcourseplanform.data[0].DoorOpen = this.courseplanform.DoorOpen * 1;
      this.addcourseplanform.data[0].TimeBeginCheckBegin =
        this.courseplanform.TimeBeginCheckBegin * 1;
      this.addcourseplanform.data[0].TimeBeginCheckEnd =
        this.courseplanform.TimeBeginCheckEnd * 1;
      this.addcourseplanform.data[0].TimeEndCheckBegin =
        this.courseplanform.TimeEndCheckBegin * 1;
      this.addcourseplanform.data[0].TimeEndCheckEnd =
        this.courseplanform.TimeEndCheckEnd * 1;
      this.addcourseplanform.data[0].RangeUsers = this.courseplanform.RangeUsers;
      this.addcourseplanform.data[0].ListDepts = this.courseplanform.ListDepts;
      this.addcourseplanform.data[0].RangeEqus = this.courseplanform.RangeEqus;
      this.addcourseplanform.data[0].ListPlaces = this.courseplanform.ListPlaces;
      this.addcourseplanform.data[0].MapUser2Equ = this.courseplanform.MapUser2Equ;
      this.addcourseplanform.data[0].AboutSpeaker = this.courseplanform.AboutSpeaker;
      this.addcourseplanform.data[0].ID_Speaker_NoUser =
        this.courseplanform.ID_Speaker_NoUser * 1;
      let that = this;
      //执行Axios请求
      axios({url:"/api/" + "model_courseplan/",
        method:'post',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
      data:this.addcourseplanform,
      })
        .then(res => {
          //执行成功
          if (true) {
            //res.data.code == 1
            // //获取所有课程信息
            // that.courseplan = res.data.data;
            // //获取记录条数
            // that.total = res.data.data.length;
            // //获取分页信息
            // that.getpagecourseplan();
            that.getcourseplan();
            //提示
            that.$message({
              message: "数据加载成功！",
              type: "success"
            });
            //关闭窗体
            that.closeDialogForm("courseplanform");
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
    submitupdatecourseplan() {
      this.updatecourseplanform.data[0].ID = this.courseplanform.ID * 1;
      this.updatecourseplanform.data[0].Rem = this.courseplanform.Rem;
      this.updatecourseplanform.data[0].Introduction = this.courseplanform.Introduction;
      this.updatecourseplanform.data[0].ID_Curricula=this.courseplanform.ID_Curricula
      this.updatecourseplanform.data[0].ID_Location =
        this.courseplanform.ID_Location * 1;
      this.updatecourseplanform.data[0].ID_Speaker =
        this.courseplanform.ID_Speaker * 1;
      this.updatecourseplanform.data[0].TimeBegin = formatDate3(
        this.courseplanform.TimeBegin
      );
      this.updatecourseplanform.data[0].TimeEnd = formatDate3(
        this.courseplanform.TimeEnd
      );
      this.updatecourseplanform.data[0].Attr = this.courseplanform.Attr * 1;
      this.updatecourseplanform.data[0].Charge = this.courseplanform.Charge * 1;
      this.updatecourseplanform.data[0].PwAccess = this.courseplanform.PwAccess * 1;
      this.updatecourseplanform.data[0].PwContinuous =
        this.courseplanform.PwContinuous * 1;
      this.updatecourseplanform.data[0].PwDirection =
        this.courseplanform.PwDirection * 1;
      this.updatecourseplanform.data[0].DoorOpen = this.courseplanform.DoorOpen * 1;
      this.updatecourseplanform.data[0].TimeBeginCheckBegin =
        this.courseplanform.TimeBeginCheckBegin * 1;
      this.updatecourseplanform.data[0].TimeBeginCheckEnd =
        this.courseplanform.TimeBeginCheckEnd * 1;
      this.updatecourseplanform.data[0].TimeEndCheckBegin =
        this.courseplanform.TimeEndCheckBegin * 1;
      this.updatecourseplanform.data[0].TimeEndCheckEnd =
        this.courseplanform.TimeEndCheckEnd * 1;
      this.updatecourseplanform.data[0].RangeUsers = this.courseplanform.RangeUsers;
      this.updatecourseplanform.data[0].ListDepts = this.courseplanform.ListDepts;
      this.updatecourseplanform.data[0].RangeEqus = this.courseplanform.RangeEqus;
      this.updatecourseplanform.data[0].ListPlaces = this.courseplanform.ListPlaces;
      this.updatecourseplanform.data[0].MapUser2Equ = this.courseplanform.MapUser2Equ;
      this.updatecourseplanform.data[0].AboutSpeaker = this.courseplanform.AboutSpeaker;
      this.updatecourseplanform.data[0].ID_Speaker_NoUser =
        this.courseplanform.ID_Speaker_NoUser * 1;
      let that = this;
      //执行Axios请求
      axios
        ({url:"/api/" + "model_courseplan/", 
        method:'put',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:that.updatecourseplanform}).then(res => {
          //执行成功
          if (true) {
            //res.data.code == 1
            // //获取所有课程信息
            // that.courseplan = res.data.data;
            // //获取记录条数
            // that.total = res.data.data.length;
            // //获取分页信息
            // that.getpagecourseplan();
            that.getcourseplan();
            //提示
            that.$message({
              message: "数据修改成功！",
              type: "success"
            });
            //关闭窗体
            that.closeDialogForm("courseplanform");
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
    //删除一条课程信息
    deletecourseplan(row) {
      //等待确认
      this.$confirm(
        "是否确认删除课程信息【课程ID：" +
          row.ID +
         +
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
            ({url:"/api/" + "model_courseplan/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{ "data": [{ 'ID': row.ID }],'n':1 }
        })
            .then(res => {
              if (true) {
                // //获取所有课程信息
                // that.courseplan = res.data.data;
                // //获取记录数
                // that.total = res.data.data.length;
                // //分页
                // that.getpagecourseplan();
                that.getcourseplan();
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
    //批量删除课程信息
    deletecourseplans() {
      //等待确认
      this.$confirm(
        "是否确认批量删除" + this.selectcourseplans.length + "个课程信息吗？",
        "提示",
        {
          confirmButtonText: "确定删除",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let data = [];
          for (var i = 0; i < this.selectcourseplans.length; i++) {
            data.push({ ID: this.selectcourseplans[i].ID * 1 });
          }
          //确认删除响应事件
          let that = this;
          //调用后端接口
          axios
             ({url:"/api/" + "model_courseplan/", 
        method:'delete',
        headers:{
        'accept': "application/json",
        'Authorization':'Bearer'+" "+this.webtoken
      },
        data:{
              data,
              n: this.selectcourseplans.length
            }
        })
            .then(res => {
              if (true) {
                // //获取所有课程信息
                // that.courseplan = res.data.data;
                // //获取记录数
                // that.total = res.data.data.length;
                // //分页
                // that.getpagecourseplan();
                that.getcourseplan();
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
