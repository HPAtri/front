<template>
<div>
<el-form v-model="shebeiform" :inline="true" style="margin-top:20px;">
<el-row style="margin-left:20px;">
    <el-col :span="12">
        <el-form-item label="请输入筛选条件：">
            <el-input v-model="input_string" placeholder="输入筛选条件" style="width: 420px;">
            </el-input>
        </el-form-item>
    </el-col>
    <el-col :span="8" style="text-align: right;padding-right:10px;">
        <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="queryshebei()">筛选</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="getshebei()">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addshebei()">添加</el-button>
        </el-button-group>
    </el-col>
</el-row>

</el-form>
    <el-table :data="pageshebei" border style="width: 90%;margin-left:20px" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="设备ID" width="120" align="center">
        </el-table-column>
        <el-table-column prop="ID_Location" label="设备所在地点" width="140" align="center">
        </el-table-column>
        <el-table-column prop="ID_IP" label="设备的ip地址" width="140" align="center">
        </el-table-column>
        <el-table-column prop="timeupdate" label="更新时间" width="140" align="center">
        </el-table-column>
        <el-table-column prop="PortListen" label="数据端口" width="140" align="center">
        </el-table-column>
        <el-table-column prop="type_field" label="刷卡器类型" width="140" align="center">
        </el-table-column>
         <el-table-column  width="400px" fixed="right" label="操作" align="center" >
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-more" size="mini" circle @click="viewshebei(scope.row)"></el-button>
                <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="updateshebei(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteshebei(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row style="margin-top: 10px;">
        <el-col :span="8" style="text-align: left;margin-left:20px">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteshebeis()">批量删除</el-button>
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
    <!-- <el-scrollbar style="height:300px;"> -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%"  @close="closeDialogForm('shebeiform')">
        <el-form :model="shebeiform" :rules="rules" ref="shebeiform" :inline=true style="margin-left:20px;" label-width="110px" label-position="right" size="mini">
            <el-form-item label="设备种类" prop="Class_field" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="shebeiform.Class_field" :disabled="isView" placeholder="请选择设备种类">
                    <el-option label="PC 设备" value="0"></el-option>
                    <el-option label="刷卡门禁设备" value="2"></el-option>
                    <el-option label="服务器设备" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="ID" prop="ID" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Rem" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.Rem" maxlength="254" :disabled="isView" suffix-icon="el-icon-edit" ></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="Introduction" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.Introduction" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="ID地点" prop="ID_Location" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID_Location" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="持有者ID" prop="ID_User" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID_User" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="设备名称" prop="Name" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.Name" maxlength="32" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="位置内编号" prop="ID_Location_SN" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID_Location_SN" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="IP地址" prop="ID_IP" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID_IP" maxlength="16" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="MAC地址" prop="MAC" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.MAC" maxlength="24" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="设备状态" prop="State" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="shebeiform.State" :disabled="isView" placeholder="请选择设备状态">
                    <el-option label="正常空闲" value="0"></el-option>
                    <el-option label="故障" value="1"></el-option>
                    <el-option label="其他" value="2"></el-option>
                    <el-option label="正常使用中" value="3"></el-option>
                    <el-option label="开放" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="登录状态" prop="Login" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="shebeiform.Login" :disabled="isView" placeholder="请选择登陆状态">
                    <el-option label="未登录" value="0"></el-option>
                    <el-option label="已经登录" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="网络状态" prop="Link" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="shebeiform.Link" :disabled="isView" placeholder="请选择网络状态">
                    <el-option label="脱机" value="0"></el-option>
                    <el-option label="在线" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="坐标位置X" prop="Dx" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.Dx" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="坐标位置Y" prop="Dy" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.Dy" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="iTimeBegin" prop="iTimeBegin" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.iTimeBegin" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="iTimeLogin" prop="iTimeLogin" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.iTimeLogin" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
          <el-form-item label="白名单" prop="WhiteList" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.WhiteList" maxlength="1024" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="接收数据端口" prop="PortListen" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.PortListen" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="刷卡器类型" prop="Type" v-if="adddialog || viewdialog || updatedialog || deletedialog"> 
                <el-input v-model="shebeiform.Type" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="开门延迟时间" prop="TimeDelay" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.TimeDelay" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="确定键键码" prop="KeyOk" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.KeyOk" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="取消键键码" prop="KeyCancel" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.KeyCancel" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="删除键键码" prop="KeyDel" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.KeyDel" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="功能键键码" prop="KeyF1" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.KeyF1" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="门禁总是开门" prop="OnAll" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-select v-model="shebeiform.OnAll" :disabled="isView" placeholder="请选择开门状态">
                    <el-option label="总是开门" value="0"></el-option>
                    <el-option label="校验成功后开门" value="1"></el-option>
                </el-select>
                 </el-form-item>
            <el-form-item label="管理设备范围" prop="RangeEqus" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.RangeEqus" maxlength="64" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="管理地点范围" prop="ListPlaces" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ListPlaces" maxlength="64" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="计划ID" prop="ID_Plan" v-if="adddialog || viewdialog || updatedialog || deletedialog">
                <el-input v-model="shebeiform.ID_Plan" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" v-show="!isView" @click="submitshebeiform('shebeiform')">确定</el-button>
            <el-button type="info" size="mini" @click="closeDialogForm('shebeiform')">取消</el-button>
        </span>
    </el-dialog>
    <!-- </el-scrollbar> -->
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
                this.baseURL + "model_equipment/",
                {
                    id:value,kind:2
                }
            )
            .then((res)=>{
                //请求成功
                if (true){
                    if(res.data.exists){
                        callback(new Error("设备ID已存在！"));
                    }else{
                        callback();
                    }
                }else{
                    callback(new Error("检验设备ID后端出现异常！"))
                }
            })
            .catch((err)=>{
                //请求失败打印
                errcatch(err);
            });
        }
        return {
        baseURL:"http://47.117.68.250/",
        // baseURL1:"http://localhost:8080/",
        shebei:[],//所有的设备信息
        pageshebei:[],//分页后当前页的设备信息
        input_string:'', //输入的筛选条件
        //分页的相关参数
        total:0, //数据的总行数
        currentpage:1, //当前的所在页
        pagesize:10,//每行显示多少页
        dialogVisible:false,
        shebeiform:{
            Class_field:'',
            ID:'',
            Rem:'',
            Introduction:'',
            ID_Location:'',
            ID_User:'',
            Name:'',
            ID_Location_SN:'',
            ID_IP:'',
            MAC:'',
            State:'',
            Login:'',
            Link:'',
            Dx:'',
            Dy:'',
            iTimeBegin:'',
            iTimeLogin:'',
            WhiteList:'',
            PortListen:'',
            timeupdate:'',
            Type:'',
            TimeDelay:'',
            KeyCancel:'',
            KeyDel:'',
            KeyF1:'',
            OnAll:'',
            RangeEqus:'',
            ListPlaces:'',
            ID_Plan:'',
            KeyOk:'',
        },
        rules:{
            Class_field:[
                    {required:true,message:'设备种类不能为空',trigger:'blur'},
                    {validator:rulesID,trigger:'blur'},
            ],
            Introduction:[
                    {required:true,message:'介绍为空填0',trigger:'blur'},

            ],
            ID_User:[
                    {required:true,message:'拥有者ID不能为空',trigger:'blur'},

            ],
            ID:[
                    {required:true,message:'ID不能为空',trigger:'blur'},

            ],
            Name:[
                    {required:true,message:'设备名称不能为空',trigger:'blur'},

            ],
            ID_Location:[
                    {required:true,message:'设备所在地点名称不能为空',trigger:'blur'},

            ],
            ID_Location_SN:[
                    {required:true,message:'设备所在位置的内部编号不能为空',trigger:'blur'},

            ],
            ID_IP:[
                    {required:true,message:'设备的ip地址为空填0',trigger:'blur'},

            ],
            MAC:[
                    {required:true,message:'设备的mac地址为空填0',trigger:'blur'},

            ],
            State:[
                    {required:true,message:'设备状态不能为空',trigger:'blur'},

            ],
            Login:[
                    {required:true,message:'登录状态不能为空',trigger:'blur'},

            ],
            Link:[
                    {required:true,message:'设备网络连接状态不能为空',trigger:'blur'},

            ],
            Dx:[
                    {required:true,message:'设备的像素x位置信息不能为空',trigger:'blur'},

            ],
            Dy:[
                    {required:true,message:'设备的像素y位置信息不能为空',trigger:'blur'},

            ],

            ID_Plan:[
                    {required:true,message:'设备所关联的课程安排表id不能为空',trigger:'blur'},

            ],
            WhiteList:[
                    {required:true,message:'白名单为空填0',trigger:'blur'},

            ],
            iTimeBegin:[
                    {required:true,message:'为空填0',trigger:'blur'},

            ],
            iTimeLogin:[
                    {required:true,message:'为空填0',trigger:'blur'},

            ],
            Rem:[
                    {required:true,message:'设备说明为空填0',trigger:'blur'},

            ],
            PortListen:[
                    {required:true,message:'数据端口不能为空',trigger:'blur'},

            ],
            Type:[
                    {required:true,message:'刷卡器类型不能为空',trigger:'blur'},

            ],
            TimeDelay:[
                    {required:true,message:'开门延迟时间不能为空',trigger:'blur'},

            ],
            KeyCancel:[
                    {required:true,message:'取消键键码不能为空',trigger:'blur'},
            ],
            KeyOk:[
                    {required:true,message:'确定键键码不能为空',trigger:'blur'},
            ],
            KeyDel:[
                    {required:true,message:'删除键键码不能为空',trigger:'blur'},

            ],
            KeyF1:[
                    {required:true,message:'功能键键码不能为空',trigger:'blur'},

            ],
            OnAll:[
                    {required:true,message:'门禁刷卡总是开门不能为空',trigger:'blur'},

            ],
            RangeEqus:[
                    {required:true,message:'管理设备范围不能为空',trigger:'blur'},

            ],
            ListPlaces:[
                    {required:true,message:'管理地点范围不能为空',trigger:'blur'},

            ]
        },

        dialogTitle: "", //弹出框的标题

        isView: false, //标识是否是查看
        isEdit: false, //标识是否是修改
        adddialog:false,
        viewdialog:false,
        updatedialog:false,
        deletedialog:false,

        selectshebeis: [],//选择复选时把选择记录存在这里
        is_status:false,
        addshebeiform:{
            data:
        [
            {
            Class_field:'',
            Rem:'',
            Introduction:'',
            ID_Location:'',
            ID_User:'',
            Name:'',
            ID_Location_SN:'',
            ID_IP:'',
            MAC:'',
            State:'',
            Login:'',
            Link:'',
            Dx:'',
            Dy:'',
            iTimeBegin:'',
            iTimeLogin:'',
            WhiteList:'',
            PortListen:'',
            Type:'',
            TimeDelay:'',
            KeyCancel:'',
            KeyDel:'',
            KeyF1:'',
            OnAll:'',
            RangeEqus:'',
            ListPlaces:'',
            ID_Plan:'',
            KeyOk:'',
            }
            ],
            n:1
        },
        updateshebeiform:{
            data:
            [
                {
            Class_field:'',
            ID:'',
            Rem:'',
            Introduction:'',
            ID_Location:'',
            ID_User:'',
            Name:'',
            ID_Location_SN:'',
            ID_IP:'',
            MAC:'',
            State:'',
            Login:'',
            Link:'',
            Dx:'',
            Dy:'',
            iTimeBegin:'',
            iTimeLogin:'',
            WhiteList:'',
            PortListen:'',
            Type:'',
            TimeDelay:'',
            KeyCancel:'',
            KeyDel:'',
            KeyF1:'',
            OnAll:'',
            RangeEqus:'',
            ListPlaces:'',
            ID_Plan:'',
            KeyOk:'',
            }
            ],
            n:1
        },
        }
    },
    mounted(){
        //自动加载数据
        this.getshebei();
        //this.created();
    },
    methods:{
        //数据转换
        timeup(){
            this.userform.timeupdate =(new Date().getTime() - new Date
            ('2000-1-1 00:00:00').getTime())/1000;
        },

        datatrans1(){
            if(this.shebeiform.State == 0){
                this.shebeiform.State="正常空闲";
            }else if(this.shebeiform.State == 1){
                this.shebeiform.State="故障";
            }else if(this.shebeiform.State == 2){
                this.shebeiform.State="其它";
            }else if(this.shebeiform.State == 3){
                this.shebeiform.State="正常使用中";
            }else{
                this.shebeiform.State="开放";
            }
            if(this.shebeiform.Login == 0){
                this.shebeiform.Login="未登录";
            }else{
                this.shebeiform.Login="已经登录";
            }

            if(this.shebeiform.Link == 0){
                this.shebeiform.Link="脱机";
            }else{
                this.shebeiform.Link="在线";
            }
            if(this.shebeiform.OnAll == 0){
                this.shebeiform.OnAll="总是开门";
            }else{
                this.shebeiform.OnAll="校验成功后开门";
            }

            if(this.shebeiform.Class_field == 0){
                this.shebeiform.Class_field="PC设备";
            }else if(this.shebeiform.Class_field == 2){
                this.shebeiform.Class_field="刷卡门禁设备";
            }else{
                this.shebeiform.Class_field="服务器设备"
                }
        },

        datatrans2(){
            if(this.shebeiform.State == "正常空闲"){
                this.shebeiform.State=0;
            }else if(this.shebeiform.State == "故障"){
                this.shebeiform.State=1;
            }else if(this.shebeiform.State == "其它"){
                this.shebeiform.State=2;
            }else if(this.shebeiform.State == "正常使用中"){
                this.shebeiform.State=3;
            }else{
                this.shebeiform.State=4;
            }
             if(this.shebeiform.OnAll == "总是开门"){
                this.shebeiform.OnAll=0;
            }else{
                this.shebeiform.OnAll=1;
            }

            if(this.shebeiform.Login == "未登录"){
                this.shebeiform.Login=0;
            }else{
                this.shebeiform.Login=1;
            }

            if(this.shebeiform.Link == "脱机"){
                this.shebeiform.Link=0;
            }else{
                this.shebeiform.Link=1;
            }

            if(this.shebeiform.Class_field == "PC设备"){
                this.shebeiform.Class_field=0;
            }else if(this.shebeiform.Class_field =="刷卡门禁设备"){
                this.shebeiform.Class_field=2;
            }else{
                this.shebeiform.Class_field=1;
                }
        },
        //获取所有设备信息
        getshebei:function(){
            //记录this的地址
            let that = this
            //使用Axios实现Ajax请求
            axios
            .get(that.baseURL + "model_equipment/")
            .then(function(res){
                if(res.data.code == 0){
                    that.$router.push('/index');
                }else{
                    //请求成功后执行的函数
                console.log(res);
                if(true){ //res.data.code == 1
                    //把数据给shebei
                        that.shebei = res.data.data;
                    //获取返回记录的总行数
                    if(res.data.data){
                        that.total = res.data.data.length;
                    }
                    //获取当前页的数据
                    that.getpageshebei();
                    //数据加载成功提示
                    that.$message({
                        message:'数据加载成功！',
                        type:'success'
                    });
                }else{
                    //数据加载失败提示
                    }
                }
            })
            .catch(function(err){
                //请求失败后执行的函数
                errcatch(err);
            })
        },

        //获取当前页设备数据
        getpageshebei(){
            //清空pageshebei中的数据
            this.pageshebei = [];
            //获得当前页的数据
            for(let i=(this.currentpage -1)*this.pagesize; i< this.total;i++){
                //遍历数据添加到pageshebei中
                this.pageshebei.push(this.shebei[i]);
                //判断是否达到一页的要求
                if (this.pageshebei.length === this.pagesize) break;
            }
        },

        //实现当前页的设备信息筛选
        queryshebei(){
            //使用Ajax请求--POST-->传递input_string
            let that = this;
            //开始Ajax请求
            axios
            .post(
                that.baseURL + "model_equipment/",
                {
                    input_string: that.input_string
                }
            )
            .then(function(res){
                if(true){
                    //把数据给shebei
                    //that.shebei = res.data.data;
                    //获取返回记录的总行数
                    //that.total = res.data.data.length;
                    //获取当前页的数据
                    //that.getpageshebei();
                    that.getshebei();
                    //数据加载成功提示
                    that.$message({
                        message:'筛选数据加载成功！',
                        type:'success'
                    });
                }else {
                    //数据加载失败提示
                }
            })
            .catch(function(err){
                errcatch(err);;
            })
        },
        //分页时修改每页的行数
        handleSizeChange(size){
            //修改当前每页数据行数
            this.pagesize = size;
            //数据重新分页
            this.getpageshebei();
        },
        //调整当前的页码
        handleCurrentChange(pageNumber){
            //修改当前的页码
            this.currentpage = pageNumber;
            //数据重新分页
            this.getpageshebei();
        },
        //选择复选框触发操作
        handleSelectionChange(data){
            this.selectshebeis = data;
        },
        //添加设备时打开表单
        addshebei(){
            //修改标题
            this.dialogTitle = "添加设备明细";
            this.shebeiform.PortListen=1234;
            this.shebeiform.Type=31;
            this.shebeiform.TimeDelay=5;
            this.shebeiform.KeyCancel=11;
            this.shebeiform.KeyDel=13;
            this.shebeiform.KeyF1=12;
            this.shebeiform.KeyOk=14;
            this.dialogVisible = true;
            this.adddialog=true;
        },
        //关闭弹出框的表单
        closeDialogForm(formName){
            //清空数据
            this.shebeiform.Introduction='';
            this.shebeiform.ID_User='';
            this.shebeiform.ID='';
            this.shebeiform.Name='';
            this.shebeiform.ID_Location='';
            this.shebeiform.ID_Location_SN='';
            this.shebeiform.ID_IP='';
            this.shebeiform.MAC='';
            this.shebeiform.State='';
            this.shebeiform.Login='';
            this.shebeiform.Link='';
            this.shebeiform.Class_field='';
            this.shebeiform.Dx='';
            this.shebeiform.Dy='';
            this.shebeiform.ID_Plan='';
            this.shebeiform.iTimeBegin='';
            this.shebeiform.iTimeLogin='';
            this.shebeiform.whitelist='';
            this.shebeiform.Rem='';
            this.shebeiform.PortListen='';
            this.shebeiform.Type='';
            this.shebeiform.TimeDelay='';
            this.shebeiform.KeyCancel='';
            this.shebeiform.KeyOk='';
            this.shebeiform.KeyDel='';
            this.shebeiform.KeyF1='';
            this.shebeiform.OnAll='';
            this.shebeiform.RangeEqus='';
            this.shebeiform.ListPlaces='';
            this.addshebeiform.data[0].Class_field='';;
            this.addshebeiform.data[0].Rem='';
            this.addshebeiform.data[0].Introduction='';
            this.addshebeiform.data[0].ID_Location='';
            this.addshebeiform.data[0].ID_User='';
            this.addshebeiform.data[0].Name='';
            this.addshebeiform.data[0].ID_Location_SN='';
            this.addshebeiform.data[0].ID_IP='';
            this.addshebeiform.data[0].MAC='';
            this.addshebeiform.data[0].State='';
            this.addshebeiform.data[0].Login='';
            this.addshebeiform.data[0].Link='';
            this.addshebeiform.data[0].Dx='';
            this.addshebeiform.data[0].Dy='';
            this.addshebeiform.data[0].iTimeBegin='';
            this.addshebeiform.data[0].iTimeLogin='';
            this.addshebeiform.data[0].WhiteList='';
            this.addshebeiform.data[0].PortListen='';
            this.addshebeiform.data[0].Type='';
            this.addshebeiform.data[0].TimeDelay='';
            this.addshebeiform.data[0].KeyCancel='';
            this.addshebeiform.data[0].KeyDel='';
            this.addshebeiform.data[0].KeyF1='';
            this.addshebeiform.data[0].OnAll='';
            this.addshebeiform.data[0].RangeEqus='';
            this.addshebeiform.data[0].ListPlaces='';
            this.addshebeiform.data[0].ID_Plan='';
            this.addshebeiform.data[0].KeyOk='';
            this.updateshebeiform.data[0].Class_field='';;
            this.updateshebeiform.data[0].ID='';
            this.updateshebeiform.data[0].Rem='';
            this.updateshebeiform.data[0].Introduction='';
            this.updateshebeiform.data[0].ID_Location='';
            this.updateshebeiform.data[0].ID_User='';
            this.updateshebeiform.data[0].Name='';
            this.updateshebeiform.data[0].ID_Location_SN='';
            this.updateshebeiform.data[0].ID_IP='';
            this.updateshebeiform.data[0].MAC='';
            this.updateshebeiform.data[0].State='';
            this.updateshebeiform.data[0].Login='';
            this.updateshebeiform.data[0].Link='';
            this.updateshebeiform.data[0].Dx='';
            this.updateshebeiform.data[0].Dy='';
            this.updateshebeiform.data[0].iTimeBegin='';
            this.updateshebeiform.data[0].iTimeLogin='';
            this.updateshebeiform.data[0].WhiteList='';
            this.updateshebeiform.data[0].PortListen='';
            this.updateshebeiform.data[0].Type='';
            this.updateshebeiform.data[0].TimeDelay='';
            this.updateshebeiform.data[0].KeyCancel='';
            this.updateshebeiform.data[0].KeyDel='';
            this.updateshebeiform.data[0].KeyF1='';
            this.updateshebeiform.data[0].OnAll='';
            this.updateshebeiform.data[0].RangeEqus='';
            this.updateshebeiform.data[0].ListPlaces='';
            this.updateshebeiform.data[0].ID_Plan='';
            this.updateshebeiform.data[0].KeyOk='';
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
        viewshebei(row){
            //修改标题
            this.dialogTitle = "查看设备明细";
            //修改isView变量
            this.isView = true;
            this.datatrans1();
            this.viewdialog=true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.shebeiform = JSON.parse(JSON.stringify(row))

        },
        //修改设备的信息
        updateshebei(row) {

            //修改标题
            this.dialogTitle = "修改设备明细";
            //修改isEdit变量
            this.isEdit = true;
            this.datatrans1();
            this.updatedialog=true;
            //弹出表单
            this.dialogVisible = true;
            //进行深拷贝
            this.shebeiform = JSON.parse(JSON.stringify(row))
        },
        //提交设备的表单（添加、修改）
        submitshebeiform(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //校验成功后执行添加或者修改
                    if (this.isEdit){
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.timeup();
                        this.datatrans2();
                        this.submitupdatashebei();
                    }else{
                        //添加
                        this.shebeiform.ID = Number(this.shebeiform.ID);
                        this.timeup();
                        this.datatrans2();
                        this.submitaddshebei()
                    }
                alert('submit!');
              } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //添加到数据库的函数
        submitaddshebei(){
            this.addshebeiform.data[0].Class_field=this.shebeiform.Class_field*1;
            this.addshebeiform.data[0].Rem=this.shebeiform.Rem;
            this.addshebeiform.data[0].Introduction=this.shebeiform.Introduction;
            this.addshebeiform.data[0].ID_Location=this.shebeiform.ID_Location*1;
            this.addshebeiform.data[0].ID_User=this.shebeiform.ID_User*1;
            this.addshebeiform.data[0].Name=this.shebeiform.Name;
            this.addshebeiform.data[0].ID_Location_SN=this.shebeiform.ID_Location_SN*1;
            this.addshebeiform.data[0].ID_IP=this.this.shebeiform.ID_IP;
            this.addshebeiform.data[0].MAC=this.shebeiform.MAC;
            this.addshebeiform.data[0].State=this.shebeiform.State*1;
            this.addshebeiform.data[0].Login=this.shebeiform.Login*1;
            this.addshebeiform.data[0].Link=this.shebeiform.Link*1;
            this.addshebeiform.data[0].Dx=this.shebeiform.Dx*1;
            this.addshebeiform.data[0].Dy=this.shebeiform.Dy*1;
            this.addshebeiform.data[0].iTimeBegin=this.shebeiform.iTimeBegin*1;
            this.addshebeiform.data[0].iTimeLogin=this.shebeiform.iTimeLogin*1;
            this.addshebeiform.data[0].WhiteList=this.shebeiform.WhiteList;
            this.addshebeiform.data[0].PortListen=this.shebeiform.PortListen*1;
            this.addshebeiform.data[0].Type=this.this.shebeiform.Type*1;
            this.addshebeiform.data[0].TimeDelay=this.shebeiform.TimeDelay*1;
            this.addshebeiform.data[0].KeyCancel=this.shebeiform.KeyCancel*1;
            this.addshebeiform.data[0].KeyDel=this.shebeiform.KeyDel*1;
            this.addshebeiform.data[0].KeyF1=this.shebeiform.KeyF1*1;
            this.addshebeiform.data[0].OnAll=this.shebeiform.OnAll*1;
            this.addshebeiform.data[0].RangeEqus=this.shebeiform.RangeEqus;
            this.addshebeiform.data[0].ListPlaces=this.shebeiform.ListPlaces;
            this.addshebeiform.data[0].ID_Plan=this.shebeiform.ID_Plan*1;
            this.addshebeiform.data[0].KeyOk=this.shebeiform.KeyOk*1;
            let that = this;
            //执行Axios请求
            axios
            .put(that.baseURL + 'model_equipment/', that.addshebeiform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有设备信息
                    // that.shebei = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpageshebei();
                    that.getshebei();
                    //提示
                    that.$message({
                        message:'数据加载成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('shebeiform');
                }else{
                    //失败提示
                }
            })
            .catch(res=>{
                //执行失败
                errcatch(err);
                that.$message.error("后端数据异常！");
            });
        },
        //修改更新到数据库
        submitupdatashebei(){
            this.updateshebeiform.data[0].Class_field=this.shebeiform.Class_field*1;
            this.updateshebeiform.data[0].ID=this.shebeiform.ID*1;
            this.updateshebeiform.data[0].Rem=this.shebeiform.Rem;
            this.updateshebeiform.data[0].Introduction=this.shebeiform.Introduction;
            this.updateshebeiform.data[0].ID_Location=this.shebeiform.ID_Location*1;
            this.updateshebeiform.data[0].ID_User=this.shebeiform.ID_User*1;
            this.updateshebeiform.data[0].Name=this.shebeiform.Name;
            this.updateshebeiform.data[0].ID_Location_SN=this.shebeiform.ID_Location_SN*1;
            this.updateshebeiform.data[0].ID_IP=this.this.shebeiform.ID_IP;
            this.updateshebeiform.data[0].MAC=this.shebeiform.MAC;
            this.updateshebeiform.data[0].State=this.shebeiform.State*1;
            this.updateshebeiform.data[0].Login=this.shebeiform.Login*1;
            this.updateshebeiform.data[0].Link=this.shebeiform.Link*1;
            this.updateshebeiform.data[0].Dx=this.shebeiform.Dx*1;
            this.updateshebeiform.data[0].Dy=this.shebeiform.Dy*1;
            this.updateshebeiform.data[0].iTimeBegin=this.shebeiform.iTimeBegin*1;
            this.updateshebeiform.data[0].iTimeLogin=this.shebeiform.iTimeLogin*1;
            this.updateshebeiform.data[0].WhiteList=this.shebeiform.WhiteList;
            this.updateshebeiform.data[0].PortListen=this.shebeiform.PortListen*1;
            this.updateshebeiform.data[0].Type=this.this.shebeiform.Type*1;
            this.updateshebeiform.data[0].TimeDelay=this.shebeiform.TimeDelay*1;
            this.updateshebeiform.data[0].KeyCancel=this.shebeiform.KeyCancel*1;
            this.updateshebeiform.data[0].KeyDel=this.shebeiform.KeyDel*1;
            this.updateshebeiform.data[0].KeyF1=this.shebeiform.KeyF1*1;
            this.updateshebeiform.data[0].OnAll=this.shebeiform.OnAll*1;
            this.updateshebeiform.data[0].RangeEqus=this.shebeiform.RangeEqus;
            this.updateshebeiform.data[0].ListPlaces=this.shebeiform.ListPlaces;
            this.updateshebeiform.data[0].ID_Plan=this.shebeiform.ID_Plan*1;
            this.updateshebeiform.data[0].KeyOk=this.shebeiform.KeyOk*1;
            let that = this;
            //执行Axios请求
            axios
            .patch(that.baseURL + 'model_equipment/', that.updateshebeiform)
            .then(res=>{
                //执行成功
                if(true){//res.data.code == 1
                    // //获取所有设备信息
                    // that.shebei = res.data.data;
                    // //获取记录条数
                    // that.total = res.data.data.length;
                    // //获取分页信息
                    // that.getpageshebei();
                    that.getshebei();
                    //提示
                    that.$message({
                        message:'数据修改成功！',
                        type:'success'
                    });
                    //关闭窗体
                    that.closeDialogForm('shebeiform');
                }else{
                    //失败提示
                }
            })
            .catch(err=>{
                //执行失败
                errcatch(err);
                that.$message.error("获取后端数据异常");
            });
        },
        //删除一条设备记录
        deleteshebei(row) {
            //等待确认
            this.$confirm('是否确认删除设备【设备ID：' + row.ID + '\t地点：' + row.ID_Location + '】信息？',
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                .delete(that.baseURL + 'model_equipment/',{data:{ids:[{"data_id":row.ID}]}})
                .then(res => {
                        if (true) {
                            // that.shebei = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpageshebei();
                            that.getshebei();
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
        //批量删除设备记录
        deleteshebeis() {
            //等待确认
          this.$confirm("是否确认批量删除" + this.selectshebeis.length + "个设备信息吗？",
                '提示', {
                confirmButtonText: '确定删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let ids = [];
                for(var i=0;i<this.selectshebeis.length;i++){
                    ids.push({"data_id":this.selectshebeis[i].ID});
                }
                //确认删除响应事件
                let that = this
                //调用后端接口
                axios
                .delete(that.baseURL + 'model_equipment/',{data:[{
                ids:ids}],
                n:this.selectshebeis.length
                })
                .then(res => {
                        if (true) {
                            // that.shebei = res.data.data;
                            // //获取记录数
                            // that.total = res.data.data.length;
                            // //分页
                            // that.getpageshebei();
                            that.getshebei();
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