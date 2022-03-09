<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="id_user__name"
      label="考勤者姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="attendtimes"
      label="考勤者出勤的次数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="attendtotal"
      label="应该出勤的次数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="attendrates"
      label="出勤率"
      width="180">
    </el-table-column>
  </el-table>
</template>

<style>
  .el-table .warning-row {
    background: rgb(212, 58, 31);
  }

  .el-table .success-row {
    background: #5aee0b;
  }
</style>

<script>
import axios from 'axios';
import { errcatch } from '../../errcatch';
  export default {
    // methods: {
    //   tableRowClassName({row, rowIndex}) {
    //     if (rowIndex === 1) {
    //       return 'warning-row';
    //     } else{
    //       return 'success-row';
    //     }
    //   }
    // },
    //  <!-- :row-class-name="tableRowClassName"> -->
    data() {
      return {
        baseURL:"http://localhost:85/polls/",
        id:'',
        tableData:{
        //id_user_name:'',
        //attendtimes:'',
        //attendtotal:'',
        //attendrates:'',
        },
        // tableDatal:{
        //   id:'',
        //   idmanager:'',
        //   timeupdate:'',
        //   id_user:'',
        //   Param2:'',
        //   Time:'',
        //   Type_field:'',
        //   Paeam1:'',
        //   money:'',
        // },
      }
    },
    mounted(){
    //自动加载数据
    //console.log(e);
    this.gets2();
    //console.log(e);
    },
    methods:{
      gets2(){
        this.id = this.$route.params.id;
        if(!this.$route.params.id){
          this.$router.push({path:'kecheng/'})
        }
        let that = this;
        //that.$message.error("加载数据失败");
        axios
        .get(
            that.baseURL + 'AttendanceInformation/',{params:{course_plan_id:this.id}})
        .then(function(res){
                if(res.data.code == 0){
                  that.$router.push('/index');
                }else{
                  if(true){//true
                    that.tableData = res.data.data;
                    that.$message({
                        message:'数据加载成功！',
                        type:'success'
                    });
                    that.attendrates = that.attendtimes / that.attendtotal;
                  }else {
                    //数据加载失败提示
                    that.$message.error(res.data.msg);
                }
                }
            })
        .catch(function(err){
          errcatch(err);;
          that.$message.error("加载数据失败");
            })
      },
    }
  }
</script>