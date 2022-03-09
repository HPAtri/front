<template>
<div>
<el-form v-model="userform" :inline="true" style="margin-top:20px;">
<el-row style="margin-left:20px;">
    <el-col :span="12">
        <el-form-item label="请输入筛选条件：">
            <el-input  v-model="input_string" placeholder="输入筛选条件" style="width: 420px;">
            </el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8" style="text-align: right;padding-right:10px;">
        <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="queryuser()">筛选</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="getuser()">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="adduser()">添加</el-button>
        </el-button-group>
    </el-col>
</el-row>
</el-form>
    <el-table :data="pageuser" border style="width: 90%;margin-left:20px" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="用户id" width="120" align="center">
        </el-table-column>
        <el-table-column prop="nocard" label="用户的卡号" width="140" align="center">
        </el-table-column>
        <el-table-column prop="nouser" label="用户的身份id" width="140" align="center">
        </el-table-column>
        <el-table-column  width="400px" fixed="right" label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-more" size="mini" circle @click="viewuser(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="updatauser(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteuser(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
        <el-col :span="8" style="text-align: left;margin-left:20px">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteusers()">批量删除</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%"  @close="closeDialogForm('userform')">
        <el-form :model="userform" :rules="rules" ref="userform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="ID" prop="id" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.id" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="用户的卡号" prop="nocard " v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.nocard" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="用户的身份id" prop="nouser" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.nouser" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.name" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="psw" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.psw" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="deptid__name" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.deptid__name" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="userform.sex" :disabled="isView" placeholder="请选择性别">
                    <el-option label="女性" value="女性"></el-option>
                    <el-option label="男性" value="男性"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="权限" prop="attr" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="userform.attr" :disabled="isView" placeholder="请选择身份">
                    <el-option label="超级管理员" value="超级管理员"></el-option>
                    <el-option label="教务处管理员" value="教务处管理员"></el-option>
                    <el-option label="辅导员" value="辅导员"></el-option>
                    <el-option label="教师" value="教师"></el-option>
                    <el-option label="学生" value="学生"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="管理员地点" prop="localid" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.localid" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="管理员姓名" prop="userex_related_to_user_information__idmanager__name" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.userex_related_to_user_information__idmanager__name" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="userex_related_to_user_information__rem" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="userform.userex_related_to_user_information__rem" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="adddialog || viewdialog || updatedialog || deletedialog">
            <el-button type="primary" size="mini" v-show="!isView" @click="submituserform('userform')">确定</el-button>
            <el-button type="info" size="mini" @click="closeDialogForm('userform')">取消</el-button>
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
                this.baseURL + 'IDEvaluation/',
                {
                    id:value,king:1
                }
            )
            .then((res)=>{
                //请求成功
                if (true){
                    if(res.data.exists){
                        callback(new Error("用户id已存在！"));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error("检验用户id后端出现异常！"))
                }
            })
            .catch((err)=>{
                //请求失败打印
                errcatch(err);;
            });

        }

        return {
        baseURL:"http://localhost:85/polls/",
        user:[],//所有的用户信息
        pageuser:[],//分页后当前页的设备信息
        input_string:'', //输入的筛选条件
        //分页的相关参数
        total:0, //数据的总行数
        currentpage:1, //当前的所在页
        pagesize:10,//每行显示多少页
        dialogVisible:false,
        userform:{
            id:'',
            nocard:'',
            nouser:'',
            name:'',
            psw:'',
            deptid__name:'',
            sex:'',
            attr:'',
            timeupdate:'',
            localid:'',
            userex_related_to_user_information__timeupdate:'',
            userex_related_to_user_information__idmanager__name:'',
            userex_related_to_user_information__rem:'',
        },
        rules:{
            id:[
                    {required:true,message:'用户id不能为空',trigger:'blur'},
                    {validator:rulesID,trigger:'blur'},
            ],
            nocard:[
                    {required:true,message:'用户的卡号不能为空',trigger:'blur'},
            ],
            nouser:[
                    {required:true,message:'用户的身份id不能为空',trigger:'blur'},
            ],
            name:[
                    {required:true,message:'使用者的姓名不能为空',trigger:'blur'},
            ],
            psw:[
                    {required:true,message:'使用者的密码不能为空',trigger:'blur'},
            ],
            deptid:[
                    {required:true,message:'用户所属部门不能为空',trigger:'blur'},
            ],
            sex:[
                    {required:true,message:'性别不能为空',trigger:'blur'},
            ],
            attr:[
                    {required:true,message:'权限不能为空',trigger:'blur'},
            ],
            timeupdate:[
                    {required:true,message:'信息更新时间不能为空',trigger:'blur'},
            ],
            localid:[
                    {required:true,message:'管理员所在地点不能为空',trigger:'blur'},
            ],
            userex_related_to_user_information__timeupdate:[
                    {required:true,message:'timeupdate不能为空',trigger:'blur'},
            ],
            userex_related_to_user_information__rem:[
                    {required:true,message:'描述不能为空',trigger:'blur'},
            ],
            userex_related_to_user_information__idmanager__name:[
                    {required:true,message:'修改账户的管理员不能为空',trigger:'blur'},
            ],
        },

        dialogTitle: "", //弹出框的标题

        isView: false, //标识是否是查看
        isEdit: false, //标识是否是修改
        adddialog:false,
        viewdialog:false,
        updatedialog:false,
        deletedialog:false,

        selectusers: [],//选择复选时把选择记录存在这里
        selectusersid:[],

        }
    },
    mounted(){
        //自动加载数据
        this.getuser();
    },
     methods:{
         timeup(){
            this.userform.timeupdate =(new Date().getTime() - new Date
            ('2000-1-1 00:00:00').getTime())/1000;
            this.userform.userex_related_to_user_information__timeupdate = (new Date().getTime() - new Date
            ('2000-1-1 00:00:00').getTime())/1000;
        },
        datatrans1(){
             if(this.userform.attr == 0){
                        this.userform.attr = '超级管理员';
                    }else if(this.userform.attr == 1){
                        this.userform.attr = '教务处管理员';
                    }else if(this.userform.attr == 2){
                        this.userform.attr = '辅导员';
                    }else if(this.userform.attr == 3){
                        this.userform.attr = '教师';
                    }else{
                        this.userform.attr = '学生';
                    }
                    if(this.userform.sex == 0){
                        this.userform.sex = '女性';
                    }else{
                        this.userform.sex = '男性';
                    }
         },
        datatrans2(){
            if(this.userform.attr == "超级管理员"){
                    this.userform.attr = 0;
            }else if(this.userform.attr == "教务处管理员"){
                    this.userform.attr = 1;
            }else if(this.userform.attr == "辅导员"){
                    this.userform.attr = 2;
            }else if(this.userform.attr == "教师"){
                    this.userform.attr = 3;
            }else{
                    this.userform.attr = 4;
            }
            if(this.userform.sex == "女性"){
                    this.userform.sex = 0;
            }else{
                    this.userform.sex = 1;
            }
         },
        //获取所有设备信息
        getuser:function(){
            //记录this的地址
            let that = this
            //使用Axios实现Ajax请求
            axios
            .get(that.baseURL + 'TeachersInformation/')
            .then(function(res){
                //请求成功后执行的函数
                console.log(res);
                if(res.data.code == 0){
                    that.$router.push('/index');
                }else{
                    if(true){//res.data.code ===1
                    //把数据给user
                    that.user = res.data.data;
                    //获取返回记录的总行数
                    that.total = res.data.data.length;
                    //获取当前页的数据
                    that.getpageuser();
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
            .catch(function(err){
                //请求失败后执行的函数
                errcatch(err);;
            })
        },

        //获取当前页设备数据
        getpageuser(){
            //清空pageuser中的数据
            this.pageuser = [];
            //获得当前页的数据
            for(let i=(this.currentpage -1)*this.pagesize; i< this.total;i++){
                //遍历数据添加到pageshebei中
                this.pageuser.push(this.user[i]);
                //判断是否达到一页的要求
                if (this.pageuser.length === this.pagesize) break;
            }
        },
        //实现当前页的设备信息筛选
        queryuser(){
            //使用Ajax请求--POST-->传递input_string
            let that = this;
            //开始Ajax请求
            axios                                                                                                                 //Axios请求
            .post(
                that.baseURL + "TeachersInformation/",
                {
                    input_string: that.input_string
                }
            )
            .then(function(res){
                if(true){
                    //把数据给user
                    //that.user = res.data.data;
                    //获取返回记录的总行数
                    //that.total = res.data.data.length;
                    //获取当前页的数据
                    //that.getpageuser();
                    that.getuser();
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
            this.getpageuser();
        },
        //调整当前的页码
        handleCurrentChange(pageNumber){
            //修改当前的页码
            this.currentpage = pageNumber;
            //数据重新分页
            this.getpageuser();
        },
        //选择复选框触发操作
        handleSelectionChange(data){
            this.selectusers = data;
        },
        //添加设备时打开表单
        adduser(){
            //修改标题
            this.dialogTitle = "添加用户明细";
            this.adddialog = true;
            //弹出表单
            this.dialogVisible = true;
        },
        //关闭弹出框的表单
        closeDialogForm(formName){
            //清空数据
            this.userform.id ="";
            this.userform.nocard ="";
            this.userform.nouser ="";
            this.userform.name ="";
            this.userform.psw ="";
            this.userform.deptid ="";
            this.userform.sex  ="";
            this.userform.attr ="";
            this.userform.timeupdate ="";
            this.userform.localid ="";
            this.userform.userex_related_to_user_information__timeupdate ="";
            this.userform.userex_related_to_user_information__idmanager__name ="";
            this.userform.userex_related_to_user_information__rem ="";
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

        //查看设备的明细
        viewuser(row){
            //修改标题
            this.dialogTitle = "查看用户明细";
            //修改isView变量
            this.isView = true;
            this.datatrans1();
            this.viewdialog = true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.userform = JSON.parse(JSON.stringify(row))

        },
        //修改设备的信息
        updatauser(row) {
            //修改标题
            this.dialogTitle = "修改用户明细";
            //修改isEdit变量
            this.isEdit = true;
            this.datatrans1();
            this.updatedialog = true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.userform = JSON.parse(JSON.stringify(row))
        },
        //提交用户的表单（添加、修改）
        submituserform(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //校验成功后执行添加或者修改
                    if (this.isEdit){
                        this.userform.id = Number(this.userform.id);
                        this.userform.deptid__name = Number(this.userform.deptid__name);
                        this.timeup();
                        //console.log(this.timeupdate);
                        this.datatrans2();
                        this.submitupdatauser();
                    }else{
                        //添加
                        this.userform.id = Number(this.userform.id);
                        this.userform.deptid__name = Number(this.userform.deptid__name);
                        this.timeup();
                        this.datatrans2();
                        this.submitadduser();
                    }
                alert('submit!');
              } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //添加到数据库的函数
        submitadduser(){
            let that = this;
            //执行Axios请求
            axios
            .put(that.baseURL + 'TeachersInformation/', that.userform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    that.$message({
                        message:'数据添加成功！',
                        type:'success'
                    });
                    that.getuser();
                    //关闭窗体
                    that.closeDialogForm('userform');
                }else{
                    //失败提示
                    that.$message.error(res.data.error_message);
                }
            })
            .catch(err=>{
                //执行失败
                errcatch(err);;
                that.$message.error("获取后端结果出现异常！");
            });
        },
        //修改更新到数据库
        submitupdatauser(){
            let that = this;
            //执行Axios请求
            axios
            .patch(that.baseURL + 'TeachersInformation/', that.userform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有用户信息
                    // that.user = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpageuser();
                    //提示
                    that.getuser();
                    that.$message({
                        message:'数据修改成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('userform');
                }else{
                    //失败提示
                    that.$message.error(res.data.error_message);
                }
            })
            .catch(err=>{
                //执行失败
                errcatch(err);;
                that.$message.error("获取后端结果出现异常！");
            });
        },
        //删除一条用户记录
        deleteuser(row) {
            //等待确认
            this.$confirm('是否确认删除用户信息【用户id：' + row.id + '\t姓名：' + row.nocard + '】信息？',
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                .delete(that.baseURL + 'TeachersInformation/',{data:{ids:[{"data_id":row.id}]}})
                .then(res => {
                        if (true) {
                            that.getuser();
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
        //批量删除设备记录
        deleteusers() {
            //等待确认
            this.$confirm("是否确认批量删除" + this.selectusers.length + "个用户信息吗？",
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                for(var i=0;i<this.selectusers.length;i++){
                    ids.push({"data_id":this.selectusers[i].id});
                }
                //确认删除响应事件
                let that = this;
                //调用后端接口
                //console.log(that.selectusers[id])
                axios
                .delete(that.baseURL + 'TeachersInformation/',{data:{
                ids:ids}
                })
                .then(res => {
                        if (true){
                            that.getuser();
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
                    type: 'error',
                    message: '删除失败'
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
