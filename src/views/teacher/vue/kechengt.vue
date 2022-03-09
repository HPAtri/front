<template>
<div>
<el-form v-model="kechengform" :inline="true" style="margin-top:20px;">
<el-row style="margin-left:20px;">
    <el-col :span="12">
        <el-form-item label="请输入筛选条件：">
            <el-input v-model="input_string" placeholder="输入筛选条件" style="width: 420px;">
            </el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8" style="text-align: right;padding-right:10px;">
        <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="querykecheng()">筛选</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="getkecheng()">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addkecheng()">添加</el-button>
        </el-button-group>
    </el-col>
</el-row>
</el-form>
    <el-table :data="pagekecheng" border style="width: 90%;margin-left:20px" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
        </el-table-column>
        <el-table-column prop="ID" label="课程ID" width="120" align="center">
        </el-table-column>
        <el-table-column prop="name" label="课程编号" width="140" align="center">
        </el-table-column>
        <el-table-column prop="TimeBegin" label="开始时间" width="140" align="center">
        </el-table-column>
        <el-table-column prop="TimeEnd" label="结束时间" width="140" align="center">
        </el-table-column>
        <el-table-column prop="ID_Location__name" label="地点id" width="140" align="center">
        </el-table-column>
        <el-table-column width="400px" fixed="right" label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-more" size="mini" circle @click="viewkecheng(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="updatekecheng(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deletekecheng(scope.row)"></el-button>
                <el-button type="info" icon="el-icon-view" size="mini" circle @click="handleclick(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
        <el-col :span="8" style="text-align: left;margin-left:20px">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deletekechengs()">批量删除</el-button>
        </el-col>
        <el-col :span="16" style="text-align: right">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentpage"
                :page-sizes="[5, 10, 50, 100]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-col>
    </el-row>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%"  @close="closeDialogForm('kechengform')">
        <el-form :model="kechengform" :rules="rules" ref="kechengform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="课程ID" prop="ID" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ID" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Rem" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.Rem" maxlength="64" :disabled="isView" suffix-icon="el-icon-edit" placeholder="备注为空填0"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="Introduction" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.Introduction" maxlength="64" :disabled="isView" suffix-icon="el-icon-edit" placeholder="简介为空填0"></el-input>
            </el-form-item>
            <el-form-item label="ID序列" prop="ID_Curricula" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ID_Curricula"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="地点ID" prop="ID_Location" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ID_Location" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="主讲人ID" prop="ID_Speaker" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ID_Speaker" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="TimeBegin" v-if="adddialog || viewdialog || updatedialog || deletedialog" >
                <el-input v-model="kechengform.TimeBegin" :disabled="isView" suffix-icon="el-icon-edit" placeholder="00:00:00"></el-input>
            </el-form-item>
            <el-form-item label="结束时间" prop="TimeEnd" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.TimeEnd" :disabled="isView" suffix-icon="el-icon-edit" placeholder="00:00:00"></el-input>
            </el-form-item>
            <el-form-item label="考勤类型" prop="Attr" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.Attr" :disabled="isView">
                    <el-option label="实验类型" value="1"></el-option>
                    <el-option label="普通上课类型" value="2"></el-option>
                    <el-option label="讲座考勤类型" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否收费" prop="Charge" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.Charge" :disabled="isView">
                    <el-option label="免费" value="0"></el-option>
                    <el-option label="收费" value="1"></el-option>
                    <el-option label="开放" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="派位" prop="PwAccess" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.PwAccess" :disabled="isView">
                    <el-option label="不派位" value="0"></el-option>
                    <el-option label="刷卡派位" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="派位连续性" prop="PwContinuous" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.PwContinuous" :disabled="isView">
                    <el-option label="连续派位" value="0"></el-option>
                    <el-option label="随机派位" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="派位顺序" prop="PwDirection" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.PwDirection" :disabled="isView">
                    <el-option label="顺序派位" value="0"></el-option>
                    <el-option label="逆序派位" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否开门" prop="DoorOpen" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="kechengform.DoorOpen" :disabled="isView">
                    <el-option label="开门" value="0"></el-option>
                    <el-option label="不开门" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考勤开始最早时间" prop="TimeBeginCheckBegin" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.TimeBeginCheckBegin" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="考勤开始最迟时间" prop="TimeBeginCheckEnd" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.TimeBeginCheckEnd" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="考勤结束最早时间" prop="TimeEndCheckBegin" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.TimeEndCheckBegin" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="考勤结束最迟时间" prop="TimeEndCheckEnd" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.TimeEndCheckEnd" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="参与学生学号" prop="RangeUsers" v-if="adddialog || viewdialog || updatedialog || deletedialog"> 
                <el-input v-model="kechengform.RangeUsers" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="学生学号为空填0"></el-input>
            </el-form-item>
            <el-form-item label="部门列表" prop="ListDepts" v-if="adddialog || viewdialog || updatedialog || deletedialog"> 
                <el-input v-model="kechengform.ListDepts" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="部门列表为空填0"></el-input>
            </el-form-item>
            <el-form-item label="座位的范围表" prop="RangeEqus" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.RangeEqus" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="座位范围表为空填0"></el-input>
            </el-form-item>
            <el-form-item label="地点列表" prop="ListPlaces" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ListPlaces" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="地点列表为空填0"></el-input>
            </el-form-item>
            <el-form-item label="学生和座位对应表" prop="MapUser2Equ" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.MapUser2Equ" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="学生和座位对应表为空填0"></el-input>
            </el-form-item>
            <el-form-item label="主讲人信息" prop="AboutSpeaker" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.AboutSpeaker" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit" placeholder="主讲人信息为空填0"></el-input>
            </el-form-item>
            <el-form-item label="职工号" prop="ID_Speaker_NoUser" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="kechengform.ID_Speaker_NoUser" :disabled="isView" suffix-icon="el-icon-edit" placeholder="职工号为空填0"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" v-show="!isView" @click="submitkechengform('kechengform')">确定</el-button>
            <el-button type="info" size="mini" @click="closeDialogForm('kechengform')">取消</el-button>
        </span>
      </el-dialog>
</div>
</template>
<script>
import axios from 'axios'
import { errcatch } from '../../errcatch';
import { changetime1,changetime2 } from '../../timeset';
export default {
    data(){
        // 校验设备id是否存在
        const rulesID = (rule,value,callback) =>{
            if(this.isEdit){
                callback();
            }
            //使用axios进行校验
            axios
            .post(
                this.baseURL + 'model_courseplan/',
                {
                    ID:value,kind:7
                }
            )
            .then((res)=>{
                //请求成功
                if (true){
                    if(res.data.exists){
                        callback(new Error("课程ID已存在！"));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error("检验课程ID后端出现异常！"))
                }
            })
            .catch((err)=>{
                //请求失败打印
                errcatch(err);;
            });

        }

        return {
        baseURL:"http://47.117.68.250/",
        kecheng:[],//所有的设备信息
        pagekecheng:[],//分页后当前页的设备信息
        input_string:'', //输入的筛选条件
        //分页的相关参数
        total:0, //数据的总行数
        currentpage:1, //当前的所在页
        pagesize:10,//每行显示多少页
        dialogVisible:false,
        kechengform:{
            ID:'',
            Rem:'',
            Introduction:'',
            ID_Curricula:'',
            ID_Location:'',
            ID_Speaker:'',
            TimeBegin:'',
            TimeEnd:'',
            Attr:'',
            Charge:'',
            PwAccess:'',
            PwContinuous:'',
            PwDirection:'',
            DoorOpen:'',
            TimeBeginCheckBegin:'',
            TimeBeginCheckEnd:'',
            TimeEndCheckBegin:'',
            TimeEndCheckEnd:'',
            RangeUsers:'',
            ListDepts:'',
            RangeEqus:'',
            ListPlaces:'',
            MapUser2Equ:'',
            AboutSpeaker:'',
            ID_Speaker_NoUser:'',
        },
        rules:{
            ID:[
                    {required:true,message:'课程ID不能为空',trigger:'blur'},
                    {validator:rulesID,trigger:'blur'},
            ],
            ID_Curricula:[
                    {required:true,message:'ID序列不能为空',trigger:'blur'},

            ],
            ID_Location:[
                    {required:true,message:'地点ID不能为空',trigger:'blur'},

            ],
            ID_Speaker:[
                    {required:true,message:'主讲人ID不能为空',trigger:'blur'},

            ],
            TimeBegin:[
                    {required:true,message:'开始时间不能为空',trigger:'blur'},

            ],
            TimeEnd:[
                    {required:true,message:'结束时间不能为空',trigger:'blur'},

            ],
            Attr:[
                    {required:true,message:'考勤类型不能为空',trigger:'blur'},

            ],
            Charge:[
                    {required:true,message:'是否收费不能为空',trigger:'blur'},

            ],
            PwAccess:[
                    {required:true,message:'派位不能为空',trigger:'blur'},

            ],
            PwContinuous:[
                    {required:true,message:'派位连续性不能为空',trigger:'blur'},

            ],
            PwDirection:[
                    {required:true,message:'派位顺序不能为空',trigger:'blur'},

            ],
            DoorOpen:[
                    {required:true,message:'是否开门不能为空',trigger:'blur'},

            ],
            TimeBeginCheckBegin:[
                    {required:true,message:'考勤开始最早时间不能为空',trigger:'blur'},

            ],
            TimeBeginCheckEnd:[
                    {required:true,message:'考勤开始最迟时间不能为空',trigger:'blur'},

            ],
            TimeEndCheckBegin:[
                    {required:true,message:'考勤结束最早时间不能为空',trigger:'blur'},

            ],
            TimeEndCheckEnd:[
                    {required:true,message:'考勤结束最迟时间不能为空',trigger:'blur'},

            ],
        },

        dialogTitle: "", //弹出框的标题

        isView: false, //标识是否是查看
        isEdit: false, //标识是否是修改
        adddialog:false,
        viewdialog:false,
        updatedialog:false,
        deletedialog:false,

        selectkechengs: [],//选择复选时把选择记录存在这里
        addkechengform:{
                    data:[
                        {
                        Rem:'',
                        Introduction:'',
                        ID_Curricula: '',
                        ID_Location:'',
                        ID_Speaker: '',
                        TimeBegin: '',
                        TimeEnd: '',
                        Attr: '',
                        Charge:'',
                        PwAccess:'',
                        PwContinuous:'',
                        PwDirection: '',
                        DoorOpen:'',
                        TimeBeginCheckBegin:'',
                        TimeBeginCheckEnd: '',
                        TimeEndCheckBegin: '',
                        TimeEndCheckEnd: '',
                        RangeUsers:'',
                        ListDepts:'',
                        RangeEqus:'',
                        ListPlaces:'',
                        MapUser2Equ:'',
                        AboutSpeaker:'',
                        ID_Speaker_NoUser:'', 
                        },
                    ],
                    n:1
                },
        updatekechengform:{
                    data:[
                        {
                        ID: '',
                        Rem:'',
                        Introduction:'',
                        ID_Curricula: '',
                        ID_Location:'',
                        ID_Speaker: '',
                        TimeBegin: '',
                        TimeEnd: '',
                        Attr: '',
                        Charge:'',
                        PwAccess:'',
                        PwContinuous:'',
                        PwDirection: '',
                        DoorOpen:'',
                        TimeBeginCheckBegin:'',
                        TimeBeginCheckEnd: '',
                        TimeEndCheckBegin: '',
                        TimeEndCheckEnd: '',
                        RangeUsers:'',
                        ListDepts:'',
                        RangeEqus:'',
                        ListPlaces:'',
                        MapUser2Equ:'',
                        AboutSpeaker:'',
                        ID_Speaker_NoUser:'', 
                        },
            ],
            n:1
        }

        }
    },
    mounted(){
        //自动加载数据
        this.getkecheng();
    },
     methods:{
        timeup(){   

             },
        datatrans1(){
                    if(this.kechengform.Attr == 1){
                        this.kechengform.Attr="实验类型";
                    }else if(this.kechengform.Attr == 2){
                        this.kechengform.Attr="普通上课类型";
                    }else{
                        this.kechengform.Attr="讲座考勤类型";
                    }

                    if(this.kechengform.Charge == 0){
                        this.kechengform.Charge="免费";
                    }else if(this.kechengform.Charge == 1){
                        this.kechengform.Charge="收费";
                    }else{
                        this.kechengform.Charge="开放";
                    }

                    if(this.kechengform.PwAccess == 0){
                        this.kechengform.PwAccess="不派位";
                    }else{
                        this.kechengform.PwAccess="刷卡派位";
                    }

                    if(this.kechengform.PwContinuous == 0){
                        this.kechengform.PwContinuous="连续派位";
                    }else{
                        this.kechengform.PwContinuous="随机派位";
                    }
                    if(this.kechengform.PwDirection == 0){
                        this.kechengform.PwDirection="顺序派位";
                    }else{
                        this.kechengform.PwDirection="逆序派位";
                    }

                    if(this.kechengform.DoorOpen == 0){
                        this.kechengform.DoorOpen="开门";
                    }else{
                        this.kechengform.DoorOpen="不开门";
                    }
        },
        datatrans2(){
                    if(this.kechengform.Attr == "实验类型"){
                        this.kechengform.Attr=0;
                    }else if(this.kechengform.Attr == "普通上课类型"){
                        this.kechengform.Attr=1;
                    }else{
                        this.kechengform.Attr=2;
                    }

                    if(this.kechengform.Charge == "免费"){
                        this.kechengform.Charge=0;
                    }else if(this.kechengform.Charge == "收费"){
                        this.kechengform.Charge=1;
                    }else{
                        this.kechengform.Charge=3;
                    }

                    if(this.kechengform.PwAccess == "不派位"){
                        this.kechengform.PwAccess=0;
                    }else{
                        this.kechengform.PwAccess=1;
                    }

                    if(this.kechengform.PwContinuous == "连续派位"){
                        this.kechengform.PwContinuous=0;
                    }else{
                        this.kechengform.PwContinuous=1;
                    }
                    if(this.kechengform.PwDirection == "顺序派位"){
                        this.kechengform.PwDirection=0;
                    }else{
                        this.kechengform.PwDirection="逆序派位";
                    }

                    if(this.kechengform.DoorOpen == "开门"){
                        this.kechengform.DoorOpen=0;
                    }else{
                        this.kechengform.DoorOpen=1;
                    }
        },
        //详情生成该课程签到记录表
        handleclick(row){
        //跳转路由
//         setTimeout(function (){
// 	      this.$nextTick(function (){
// 	      this.$bus.$emit('kaoqing',[row.ID]);
// })},500);
         this.$router.push({path:'/qiandao?index='+row.ID})
        },
        //获取所有设备信息
        getkecheng:function(){
            //记录this的地址
            let that = this
            //使用Axios实现Ajax请求
            axios
            .get(that.baseURL + "model_courseplan/")
            .then(function(res){
                //请求成功后执行的函数
                //console.log(res);
                if(res.data.code == 0){
                    that.$router.push('/index');
                }else{
                    if(true){//res.data.code ===1
                    //把数据给课程
                    that.kecheng = res.data.data;
                    //获取返回记录的总行数
                    that.total = res.data.data.length;
                    //获取当前页的数据
                    that.getpagekecheng();
                    //数据加载成功提示
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
            .catch(function(res){
                //请求失败后执行的函数
                errcatch(err);;
                that.$message.error('获取后端数据出现异常');
            })
        },
        //获取当前页设备数据
        getpagekecheng(){
            //清空pageskecheng中的数据
            this.pagekecheng = [];
            //获得当前页的数据
            for(let i=(this.currentpage -1)*this.pagesize; i< this.total;i++){
                //遍历数据添加到pageshebei中
                this.pagekecheng.push(this.kecheng[i]);
                //判断是否达到一页的要求
                if (this.pagekecheng.length === this.pagesize) break;
            }
        },
        //实现当前页的设备信息筛选
        querykecheng(){
            //使用Ajax请求--POST-->传递input_string
            let that = this;
            //开始Ajax请求
            axios                                                                                                                 //Axios请求
            .get(
                that.baseURL + "model_courseplan/",
                {
                    input_string: that.input_string
                }
            )
            .then(function(res){
                if(true){
                    //把数据给shebei
                    //that.kecheng = res.data.data;
                    //获取返回记录的总行数
                    //that.total = res.data.data.length;
                    //获取当前页的数据
                    //that.getpagekecheng();
                    that.getkecheng();
                    //数据加载成功提示
                    that.$message({
                        message:'筛选数据加载成功！',
                        type:'success'
                    });
                }else {
                    //数据加载失败提示
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err){
                errcatch(err);;
                that.$message.error("获取后端数据出现异常!");
            })
        },
        //分页时修改每页的行数
        handleSizeChange(size){
            //修改当前每页数据行数
            this.pagesize = size;
            //数据重新分页
            this.getpagekecheng();
        },
        //调整当前的页码
        handleCurrentChange(pageNumber){
            //修改当前的页码
            this.currentpage = pageNumber;
            //数据重新分页
            this.getpagekecheng();
        },
        //选择复选框触发操作
        handleSelectionChange(data){
            this.selectkechengs = data;
        },
        //添加课程时打开表单
        addkecheng(){
            //修改标题
            this.dialogTitle = "添加课程明细";
            this.adddialog = true;
            //弹出表单
            this.dialogVisible = true;
        },
        //关闭弹出框的表单
        closeDialogForm(formName){
            //清空数据
            this.kechengform.ID ="";
            this.kechengform.Rem="";
            this.kechengform.Introduction="";
            this.kechengform.ID_Curricula="";
            this.kechengform.ID_Location="";
            this.kechengform.ID_Speaker="";
            this.kechengform.TimeBegin ="";
            this.kechengform.TimeEnd ="";
            this.kechengform.Attr="";
            this.kechengform.Charge ="";
            this.kechengform.PwAccess ="";
            this.kechengform.PwContinuous ="";
            this.kechengform.PwDirection ="";
            this.kechengform.DoorOpen ="";
            this.kechengform.TimeBeginCheckBegin ="";
            this.kechengform.TimeBeginCheckEnd ="";
            this.kechengform.TimeEndCheckBegin ="";
            this.kechengform.TimeEndCheckEnd ="";
            this.kechengform.RangeUsers ="";
            this.kechengform.ListDepts="";
            this.kechengform.RangeEqus ="";
            this.kechengform.ListPlaces ="";
            this.kechengform.MapUser2Equ ="";
            this.kechengform.AboutSpeaker ="";
            this.kechengform.ID_Speaker_NoUser="";
            this.addkechengform.data[0].Rem="";
            this.addkechengform.data[0].Introduction="";
            this.addkechengform.data[0].ID_Curricula="";
            this.addkechengform.data[0].ID_Location="";
            this.addkechengform.data[0].ID_Speaker="";
            this.addkechengform.data[0].TimeBegin="";
            this.addkechengform.data[0].TimeEnd="";
            this.addkechengform.data[0].Attr="";
            this.addkechengform.data[0].Charge="";
            this.addkechengform.data[0].PwAccess="";
            this.addkechengform.data[0].PwContinuous="";
            this.addkechengform.data[0].PwDirection="";
            this.addkechengform.data[0].DoorOpen="";
            this.addkechengform.data[0].TimeBeginCheckBegin="";
            this.addkechengform.data[0].TimeBeginCheckEnd="";
            this.addkechengform.data[0].TimeEndCheckBegin="";
            this.addkechengform.data[0].TimeEndCheckEnd="";
            this.addkechengform.data[0].RangeUsers="";
            this.addkechengform.data[0].ListDepts="";
            this.addkechengform.data[0].RangeEqus="";
            this.addkechengform.data[0].ListPlaces="";
            this.addkechengform.data[0].MapUser2Equ="";
            this.addkechengform.data[0].AboutSpeaker="";
            this.addkechengform.data[0].ID_Speaker_NoUser="";
            this.updatekechengform.data[0].ID='';
            this.updatekechengform.data[0].Rem="";
            this.updatekechengform.data[0].Introduction="";
            this.updatekechengform.data[0].ID_Curricula="";
            this.updatekechengform.data[0].ID_Location="";
            this.updatekechengform.data[0].ID_Speaker="";
            this.updatekechengform.data[0].TimeBegin="";
            this.updatekechengform.data[0].TimeEnd="";
            this.updatekechengform.data[0].Attr="";
            this.updatekechengform.data[0].Charge="";
            this.updatekechengform.data[0].PwAccess="";
            this.updatekechengform.data[0].PwContinuous="";
            this.updatekechengform.data[0].PwDirection="";
            this.updatekechengform.data[0].DoorOpen="";
            this.updatekechengform.data[0].TimeBeginCheckBegin="";
            this.updatekechengform.data[0].TimeBeginCheckEnd="";
            this.updatekechengform.data[0].TimeEndCheckBegin="";
            this.updatekechengform.data[0].TimeEndCheckEnd="";
            this.updatekechengform.data[0].RangeUsers="";
            this.updatekechengform.data[0].ListDepts="";
            this.updatekechengform.data[0].RangeEqus="";
            this.updatekechengform.data[0].ListPlaces="";
            this.updatekechengform.data[0].MapUser2Equ="";
            this.updatekechengform.data[0].AboutSpeaker="";
            this.updatekechengform.data[0].ID_Speaker_NoUser="";
            this.adddialog = false;
            this.adddialog = false;
            this.viewdialog = false;
            this.updatedialog = false;
            this.deletedialog = false;

            //重置表单的校验
            this.$nextTick(()=>{
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
        viewkecheng(row){
            //修改标题
            this.dialogTitle = "查看课程明细";
            //修改isView变量
            this.isView = true;
            this.datatrans1();
            this.kechengform.TimeBegin =changetime2(this.kechengform.TimeBegin);
            this.kechengform.TimeEnd =changetime2(this.kechengform.TimeEnd);
            this.viewdialog = true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.kechengform = JSON.parse(JSON.stringify(row))

        },
        //修改设备的信息
        updatekecheng(row) {
            //修改标题
            this.dialogTitle = "修改课程明细";
            //修改isEdit变量
            this.isEdit = true;
            this.datatrans1();
            this.kechengform.TimeBegin =changetime2(this.kechengform.TimeBegin);
            this.kechengform.TimeEnd =changetime2(this.kechengform.TimeEnd);
            this.updatedialog = true;
            //弹出表单
            this.dialogVisible = true;
            this.kechengform = JSON.parse(JSON.stringify(row))
        },
        //提交设备的表单（添加、修改）
        submitkechengform(formName) {
            this.$refs[formName].validate((valid) =>{
                if (valid) {
                    //校验成功后执行添加或者修改
                    if (this.isEdit){
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.timeup();
                        this.datatrans2();
                        this.submitupdatakecheng();
                    }else{
                        //添加
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.timeup();
                        this.datatrans2();
                        this.submitaddkecheng()
                    }
                alert('submit!');
              } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //添加到数据库的函数
        submitaddkecheng(){
            this.addkechengform.data[0].Rem=this.kechengform.Rem;
            this.addkechengform.data[0].Introduction=this.kechengform.Introduction;
            this.addkechengform.data[0].ID_Curricula=this.kechengform.ID_Curricula*1;
            this.addkechengform.data[0].ID_Location=this.kechengform.ID_Location*1;
            this.addkechengform.data[0].ID_Speaker=this.kechengform.ID_Speaker*1;
            this.addkechengform.data[0].TimeBegin=timechange1(this.kechengform.TimeBegin);
            this.addkechengform.data[0].TimeEnd=timechange1(this.kechengform.TimeEnd);
            this.addkechengform.data[0].Attr=this.kechengform.Attr*1;
            this.addkechengform.data[0].Charge=this.kechengform.Charge*1;
            this.addkechengform.data[0].PwAccess=this.kechengform.PwAccess*1;
            this.addkechengform.data[0].PwContinuous=this.kechengform.PwContinuous*1;
            this.addkechengform.data[0].PwDirection=this.kechengform.PwDirection*1;
            this.addkechengform.data[0].DoorOpen=this.kechengform.DoorOpen*1;
            this.addkechengform.data[0].TimeBeginCheckBegin=this.kechengform.TimeBeginCheckBegin*1;
            this.addkechengform.data[0].TimeBeginCheckEnd=this.kechengform.TimeBeginCheckEnd*1;
            this.addkechengform.data[0].TimeEndCheckBegin=this.kechengform.TimeEndCheckBegin*1;
            this.addkechengform.data[0].TimeEndCheckEnd=this.kechengform.TimeEndCheckEnd*1;
            this.addkechengform.data[0].RangeUsers=this.kechengform.RangeUsers;
            this.addkechengform.data[0].ListDepts=this.kechengform.ListDepts;
            this.addkechengform.data[0].RangeEqus=this.kechengform.RangeEqus;
            this.addkechengform.data[0].ListPlaces=this.kechengform.ListPlaces;
            this.addkechengform.data[0].MapUser2Equ=this.kechengform.MapUser2Equ;
            this.addkechengform.data[0].AboutSpeaker=this.kechengform.AboutSpeaker;
            this.addkechengform.data[0].ID_Speaker_NoUser=this.kechengform.ID_Speaker_NoUser*1;
            let that = this;
            //执行Axios请求
            axios
            .post(that.baseURL + 'model_courseplan/', that.addkechengform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有课程信息
                    // that.kecheng = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpagekecheng();
                    that.getkecheng();
                    //提示
                    that.$message({
                        message:'数据加载成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('kechengform');
                }else{
                    //失败提示
                    that.$message.error(res.data.error_message);
                }
            })
            .catch(err=>{
                //执行失败
                console.log(err);
                that.$message.error("获取后端结果出现异常");
            });
        },
        //修改更新到数据库
        submitupdatakecheng(){
            this.updatekechengform.data[0].ID=this.kechengform.ID*1;
            this.updatekechengform.data[0].Rem=this.kechengform.Rem;
            this.updatekechengform.data[0].Introduction=this.kechengform.Introduction
            this.updatekechengform.data[0].ID_Curricula=this.kechengform.ID_Curricula*1;
            this.updatekechengform.data[0].ID_Location=this.kechengform.ID_Location*1;
            this.updatekechengform.data[0].ID_Speaker=this.kechengform.ID_Speaker*1;
            this.updatekechengform.data[0].TimeBegin=changetime1(this.kechengform.TimeBegin);
            this.updatekechengform.data[0].TimeEnd=changetime1(this.kechengform.TimeEnd);
            this.updatekechengform.data[0].Attr=this.kechengform.Attr*1;
            this.updatekechengform.data[0].Charge=this.kechengform.Charge*1;
            this.updatekechengform.data[0].PwAccess=this.kechengform.PwAccess*1;
            this.updatekechengform.data[0].PwContinuous=this.kechengform.PwContinuous*1;
            this.updatekechengform.data[0].PwDirection=this.kechengform.PwDirection*1;
            this.updatekechengform.data[0].DoorOpen=this.kechengform.DoorOpen*1;
            this.updatekechengform.data[0].TimeBeginCheckBegin=this.kechengform.TimeBeginCheckBegin*1;
            this.updatekechengform.data[0].TimeBeginCheckEnd=this.kechengform.TimeBeginCheckEnd*1;
            this.updatekechengform.data[0].TimeEndCheckBegin=this.kechengform.TimeEndCheckBegin*1;
            this.updatekechengform.data[0].TimeEndCheckEnd=this.kechengform.TimeEndCheckEnd*1;
            this.updatekechengform.data[0].RangeUsers=this.kechengform.RangeUsers;
            this.updatekechengform.data[0].ListDepts=this.kechengform.ListDepts;
            this.updatekechengform.data[0].RangeEqus=this.kechengform.RangeEqus;
            this.updatekechengform.data[0].ListPlaces=this.kechengform.ListPlaces;
            this.updatekechengform.data[0].MapUser2Equ=this.kechengform.MapUser2Equ;
            this.updatekechengform.data[0].AboutSpeaker=this.kechengform.AboutSpeaker;
            this.updatekechengform.data[0].ID_Speaker_NoUser=this.kechengform.ID_Speaker_NoUser*1;
            let that = this;
            //执行Axios请求
            axios
            .put(that.baseURL + 'model_courseplan/', that.updatekechengform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有课程信息
                    // that.kecheng = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpagekecheng();
                    that.getkecheng();
                    //提示
                    that.$message({
                        message:'数据修改成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('kechengform');
                }else{
                    //失败提示
                    that.$message.error(res.data.error_message);
                }
            })
            .catch(err=>{
                //执行失败
                console.log(err);
                that.$message.error("获取后端结果出现异常！");
            });
        },
        //删除一条课程信息
        deletekecheng(row) {
            //等待确认
            this.$confirm('是否确认删除课程信息【课程ID：' + row.ID + '\t课程名称：' + row.name + '】信息？',
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                .delete(that.baseURL + 'model_courseplan/',{data:{ids:[{"data_id":row.ID}],n:1}})
                .then(res => {
                        if (true) {
                            // //获取所有课程信息
                            // that.kecheng = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpagekecheng();
                            that.getkecheng();
                            //提示
                            that.$message({
                                message: '数据删除成功！',
                                type: 'success'
                            });
                        } else {
                            that.$message.error('数据删除失败！');
                        }
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //批量删除课程信息
        deletekechengs() {
            //等待确认
            this.$confirm("是否确认批量删除" + this.selectkechengs.length + "个课程信息吗？",
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                for(var i=0;i<this.selectkechengs.length;i++){
                    ids.push({"data_id":this.selectkechengs[i].ID*1});
                }
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                    .delete(this.baseURL + 'model_courseplan/',{data:[{
                    ids:ids}
                    ],n:this.selectkechengs.length})
                    .then(res => {
                        if (true) {
                            // //获取所有课程信息
                            // that.kecheng = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpagekecheng();
                            that.getkecheng();
                            //提示
                            that.$message({
                                message: '数据批量删除成功！',
                                type: 'success'
                            });
                        } else {
                            that.$message.error('数据批量删除失败！');
                        }
                    })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

    },
}
</script>
<style>
html,body,.el-container{
    margin: 0px;
    padding:0px;
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
  border-color: #409EFF;
}
.el-dialog  .avatar-uploader-icon {
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
