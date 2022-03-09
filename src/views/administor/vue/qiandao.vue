<template>
<div>
<el-form v-model="qiandaoform" :inline="true" style="margin-top:20px;">
<el-row style="margin-left:20px;">
    <el-col :span="12">
        <el-form-item label="请输入筛选条件：">
            <el-input v-model="input_string" placeholder="输入筛选条件" style="width: 420px;">
            </el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8" style="text-align: right;padding-right:10px;">
        <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="queryqiandao()">筛选</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="getqiandao()">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addqiandao()">添加</el-button>
        </el-button-group>
    </el-col>
</el-row>
</el-form>
    <el-table :data="pageqiandao" border style="width: 90%;margin-left:20px" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
        </el-table-column>
        <el-table-column prop="ID" label="位置ID" width="120" align="center">
        </el-table-column>
        <el-table-column prop="name" label="位置编号" width="140" align="center">
        </el-table-column>
        <el-table-column prop="TimeBegin" label="开始时间" width="140" align="center">
        </el-table-column>
        <el-table-column prop="TimeEnd" label="结束时间" width="140" align="center">
        </el-table-column>
        <el-table-column prop="ID_Location__name" label="地点id" width="140" align="center">
        </el-table-column>
        <el-table-column width="400px" fixed="right" label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-more" size="mini" circle @click="viewqiandao(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="updateqiandao(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteqiandao(scope.row)"></el-button>
                <el-button type="info" icon="el-icon-view" size="mini" circle @click="handleclick(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
        <el-col :span="8" style="text-align: left;margin-left:20px">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteqiandaos()">批量删除</el-button>
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
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%"  @close="closeDialogForm('qiandaoform')">
        <el-form :model="qiandaoform" :rules="rules" ref="qiandaoform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="类型" prop="Type_field" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Type_field" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="数据库ID" prop="ID" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.ID" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Rem" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Rem" maxlength="64" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="Introduction" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Introduction" maxlength="254" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="最后操作人ID" prop="IdManager" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.IdManager"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="更新时间" prop="TimeUpdate" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.TimeUpdate"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="用户ID" prop="ID_User" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.ID_User"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="生成时间" prop="Time" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Time"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="费用" prop="Money" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Money"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="考勤机编号" prop="Param1" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Param1"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="安排编号" prop="Param2" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.Param2"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="打卡者学号" prop="ID_User_NoUser" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="qiandaoform.ID_User_NoUser"  :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" v-show="!isView" @click="submitqiandaoform('qiandaoform')">确定</el-button>
            <el-button type="info" size="mini" @click="closeDialogForm('qiandaoform')">取消</el-button>
        </span>
      </el-dialog>
</div>
</template>
<script>
import axios from 'axios'
import { errcatch } from '../../errcatch';
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
                this.baseURL + 'model_runningaccount/',
                {
                    ID:value,kind:7
                }
            )
            .then((res)=>{
                //请求成功
                if (true){
                    if(res.data.exists){
                        callback(new Error("ID已存在！"));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error("检验ID后端出现异常！"))
                }
            })
            .catch((err)=>{
                //请求失败打印
                errcatch(err);;
            });

        }

        return {
        baseURL:"http://47.117.68.250/",
        qiandao:[],//所有的设备信息
        pageqiandao:[],//分页后当前页的设备信息
        input_string:'', //输入的筛选条件
        //分页的相关参数
        total:0, //数据的总行数
        currentpage:1, //当前的所在页
        pagesize:10,//每行显示多少页
        dialogVisible:false,
        qiandaoform:{
            Type_field:'',
            ID:'',
            Rem:'',
            Introduction:'',
            TimeUpdate:'',
            IdManager:'',
            ID_User:'',
            Time:'',
            Money:'',
            Param1:'',
            Param2:'',   
            ID_User_NoUser:'',  
        },
        rules:{
            Type_field:[
                    {required:true,message:'类型不能为空',trigger:'blur'},
                    {validator:rulesID,trigger:'blur'},
            ],
            ID:[
                    {required:true,message:'数据库ID不能为空',trigger:'blur'},
                    {validator:rulesID,trigger:'blur'},
            ],
            Rem:[
                    {required:true,message:'备注为空填0',trigger:'blur'},

            ],
            Introduction:[
                    {required:true,message:'简介为空填0',trigger:'blur'},

            ],
            TimeUpdate:[
                    {required:true,message:'修改时间不能为空',trigger:'blur'},

            ],
            IdManager:[
                    {required:true,message:'修改者ID不能为空',trigger:'blur'},

            ],
            ID_User:[
                    {required:true,message:'用户ID不能为空',trigger:'blur'},

            ],
            Time:[
                    {required:true,message:'记录时间不能为空',trigger:'blur'},

            ],
            Money:[
                    {required:true,message:'费用为空填0',trigger:'blur'},

            ],
            Time:[
                    {required:true,message:'记录时间不能为空',trigger:'blur'},

            ],
            Param1:[
                    {required:true,message:'考勤机编号不能为空',trigger:'blur'},

            ],
            Param2:[
                    {required:true,message:'安排编号不能为空',trigger:'blur'},

            ],
            ID_User_NoUser:[
                    {required:true,message:'打卡者学号不能为空',trigger:'blur'},

            ],

        },
        

        dialogTitle: "", //弹出框的标题

        isView: false, //标识是否是查看
        isEdit: false, //标识是否是修改
        adddialog:false,
        viewdialog:false,
        updatedialog:false,
        deletedialog:false,

        selectqiandaos: [],//选择复选时把选择记录存在这里
        addqiandaoform:{
            data:[
                {
                  Type_field:'',
                  Rem:'',
                  Introduction:'',
                  ID_User:'',
                  Time:'',
                  Money:'',
                  Param1:'',
                  Param2:'',
                  ID_User_NoUser:'',   
                },
            ],
            n:1
        },
        updateqiandaoform:{
            data:[
                {
                  Type_field:'',
                  ID:'',
                  Rem:'',
                  Introduction:'',
                  ID_User:'',
                  Time:'',
                  Money:'',
                  Param1:'',
                  Param2:'', 
                  ID_User_NoUser:'',  
            }
            ],
            n:1
        },

        }
    },
    mounted(){
        //自动加载数据
        this.getqiandao();
    },
     methods:{
        //详情生成该位置签到记录表
        handleclick(row){
        //跳转路由
//         setTimeout(function (){
// 	      this.$nextTick(function (){
// 	      this.$bus.$emit('kaoqing',[row.ID]);
// })},500);
         this.$router.push({path:'/qiandao?index='+row.ID})
        },
        //获取所有设备信息
        getqiandao:function(){
            //记录this的地址
            let that = this
            //使用Axios实现Ajax请求
            axios
            .get(that.baseURL + "model_runningaccount/")
            .then(function(res){
                //请求成功后执行的函数
                //console.log(res);
                if(res.data.code == 0){
                    that.$router.push('/index');
                }else{
                    if(true){//res.data.code ===1
                    //把数据给位置
                    that.qiandao = res.data.data;
                    //获取返回记录的总行数
                    that.total = res.data.data.length;
                    //获取当前页的数据
                    that.getpageqiandao();
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
        getpageqiandao(){
            //清空pagesqiandao中的数据
            this.pageqiandao = [];
            //获得当前页的数据
            for(let i=(this.currentpage -1)*this.pagesize; i< this.total;i++){
                //遍历数据添加到pageshebei中
                this.pageqiandao.push(this.qiandao[i]);
                //判断是否达到一页的要求
                if (this.pageqiandao.length === this.pagesize) break;
            }
        },
        //实现当前页的设备信息筛选
        queryqiandao(){
            //使用Ajax请求--POST-->传递input_string
            let that = this;
            //开始Ajax请求
            axios                                                                                                                 //Axios请求
            .post(
                that.baseURL + "model_runningaccount/",
                {
                    input_string: that.input_string
                }
            )
            .then(function(res){
                if(true){
                    //把数据给shebei
                    //that.qiandao = res.data.data;
                    //获取返回记录的总行数
                    //that.total = res.data.data.length;
                    //获取当前页的数据
                    //that.getpageqiandao();
                    that.getqiandao();
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
            this.getpageqiandao();
        },
        //调整当前的页码
        handleCurrentChange(pageNumber){
            //修改当前的页码
            this.currentpage = pageNumber;
            //数据重新分页
            this.getpageqiandao();
        },
        //选择复选框触发操作
        handleSelectionChange(data){
            this.selectqiandaos = data;
        },
        //添加位置时打开表单
        addqiandao(){
            //修改标题
            this.dialogTitle = "添加位置明细";
            this.adddialog = true;
            //弹出表单
            this.dialogVisible = true;
        },
        //关闭弹出框的表单
        closeDialogForm(formName){
            //清空数据
            this.qiandaoform.Type_field ="";
            this.qiandaoform.ID ="";
            this.qiandaoform.Rem="";
            this.qiandaoform.Introduction="";
            this.qiandaoform.TimeUpdate="";
            this.qiandaoform.IdManager="";
            this.qiandaoform.ID_User="";
            this.qiandaoform.Time="";
            this.qiandaoform.Money="";
            this.qiandaoform.Param1="";
            this.qiandaoform.Param2="";
            this.qiandaoform.ID_User_NoUser="";
            this.addqiandaoform.data[0].Type_field="",
            this.addqiandaoform.data[0].Rem="",
            this.addqiandaoform.data[0].Introduction ="",
            this.addqiandaoform.data[0].ID_User ="",
            this.addqiandaoform.data[0].Time="",
            this.addqiandaoform.data[0].Money="",
            this.addqiandaoform.data[0].Param1="",
            this.addqiandaoform.data[0].Param2="",
            this.addqiandaoform.data[0].ID_User_NoUser ="",
            this.updateqiandaoform.data[0].Type_field="",
            this.updateqiandaoform.data[0].ID="",
            this.updateqiandaoform.data[0].Rem="",
            this.updateqiandaoform.data[0].Introduction ="",
            this.updateqiandaoform.data[0].ID_User ="",
            this.updateqiandaoform.data[0].Time="",
            this.updateqiandaoform.data[0].Money="",
            this.updateqiandaoform.data[0].Param1="",
            this.updateqiandaoform.data[0].Param2="",
            this.updateqiandaoform.data[0].ID_User_NoUser ="",
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

        //查看位置的明细
        viewqiandao(row){
            //修改标题
            this.dialogTitle = "查看位置明细";
            //修改isView变量
            this.isView = true;
            this.viewdialog = true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.qiandaoform = JSON.parse(JSON.stringify(row))

        },
        //修改设备的信息
        updateqiandao(row) {
            //修改标题
            this.dialogTitle = "修改位置明细";
            //修改isEdit变量
            this.isEdit = true;
            this.updatedialog = true;
            //弹出表单
            this.dialogVisible = true;
            this.qiandaoform = JSON.parse(JSON.stringify(row))
        },
        //提交设备的表单（添加、修改）
        submitqiandaoform(formName) {
            this.$refs[formName].validate((valid) =>{
                if (valid) {
                    //校验成功后执行添加或者修改
                    if (this.isEdit){
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.submitupdataqiandao();
                    }else{
                        //添加
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.submitaddqiandao()
                    }
                alert('submit!');
              } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //添加到数据库的函数
        submitaddqiandao(){
            this.addqiandaoform.data[0].Type_field=this.qiandaoform.Type_field
            this.addqiandaoform.data[0].Rem=this.qiandaoform.Rem
            this.addqiandaoform.data[0].Introduction =this.qiandaoform.Introduction
            this.addqiandaoform.data[0].ID_User =this.qiandaoform.ID_User
            this.addqiandaoform.data[0].Time=this.qiandaoform.Time
            this.addqiandaoform.data[0].Money=this.qiandaoform.Money
            this.addqiandaoform.data[0].Param1=this.qiandaoform.Param1
            this.addqiandaoform.data[0].Param2=this.qiandaoform.Param2
            this.addqiandaoform.data[0].ID_User_NoUser=this.qiandaoform.ID_User_NoUser
            let that = this;
            //执行Axios请求
            axios
            .post(that.baseURL + 'model_runningaccount/', that.addqiandaoform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有位置信息
                    // that.qiandao = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpageqiandao();
                    that.getqiandao();
                    //提示
                    that.$message({
                        message:'数据加载成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('qiandaoform');
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
        submitupdataqiandao(){
            this.updataqiandaoform.data[0].Type_field=this.qiandaoform.Type_field
            this.updataqiandaoform.data[0].ID=this.qiandaoform.ID
            this.updataqiandaoform.data[0].Rem=this.qiandaoform.Rem
            this.updataqiandaoform.data[0].Introduction =this.qiandaoform.Introduction
            this.updataqiandaoform.data[0].ID_User =this.qiandaoform.ID_User
            this.updataqiandaoform.data[0].Time=this.qiandaoform.Time
            this.updataqiandaoform.data[0].Money=this.qiandaoform.Money
            this.updataqiandaoform.data[0].Param1=this.qiandaoform.Param1
            this.updataqiandaoform.data[0].Param2=this.qiandaoform.Param2
            this.updataqiandaoform.data[0].ID_User_NoUser=this.qiandaoform.ID_User_NoUser
            let that = this;
            //执行Axios请求
            axios
            .put(that.baseURL + 'model_runningaccount/', that.updateqiandaoform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有位置信息
                    // that.qiandao = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpageqiandao();
                    that.getqiandao();
                    //提示
                    that.$message({
                        message:'数据修改成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('qiandaoform');
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
        //删除一条位置信息
        deleteqiandao(row) {
            //等待确认
            this.$confirm('是否确认删除位置信息【位置ID：' + row.ID + '\t位置名称：' + row.name + '】信息？',
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                .delete(that.baseURL + 'model_runningaccount/',{data:{ids:[{"data_id":row.ID}],n:1}})
                .then(res => {
                        if (true) {
                            // //获取所有位置信息
                            // that.qiandao = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpageqiandao();
                            that.getqiandao();
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
        //批量删除位置信息
        deleteqiandaos() {
            //等待确认
            this.$confirm("是否确认批量删除" + this.selectqiandaos.length + "个位置信息吗？",
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                for(var i=0;i<this.selectqiandaos.length;i++){
                    ids.push({"data_id":this.selectqiandaos[i].ID*1});
                }
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                    .delete(this.baseURL + 'model_runningaccount/',{data:[{
                    ids:ids}],n:selectqiandaos.length
                    })
                    .then(res => {
                        if (true) {
                            // //获取所有位置信息
                            // that.qiandao = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpageqiandao();
                            that.getqiandao();
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
