<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="attendnumbers"
      label="学生出勤次数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="totalnumbers"
      label="考勤总次数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="attendrates"
      label="签到率">
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
    //     } else if (rowIndex === 3) {
    //       return 'success-row';
    //     }
    //     return '';
    //   }
    // },:row-class-name="tableRowClassName"
    data() {
      return {
      baseURL:"http://localhost:85/polls/",
      id:'',
      tableData:{
        //attendnumbers:'',
        //totalnumbers:'',
        //attendrates:'',
      },
      }
    },
    mounted(){
    //自动加载数据
    this.gets();
    },
    methods:{
      gets(){
        // this.$bus.$on('kaoqing',(val)=>{
        // this.id = val;
        // });
        //this.id = this.$route.query.index;
        this.id = this.$route.params.id;
        if(!this.$route.params.id){
          this.$router.push({path:'kecheng/'})
        }
        let that = this;
        axios
        .get(
          that.baseURL + 'AttendanceInformationClass/',{params:{course_plan_id:this.id}})
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
                    that.attendrates = that.attendnumbers / that.totalnumbers;
                }else {
                    //数据加载失败提示
                    that.$message.error(res.data.msg);
                }
          }
            })
        .catch(function(err){
       errcatch(err);;
        })
      },
    }
  }
</script>
