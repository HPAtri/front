<template>
    <div>
        <el-select v-model="value" placeholder="请选择角色" @change="handlechange">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>  
    </div>
</template>

<script>
export default {
    data(){
        return {
            options:[{value:'manager',label:'管理员'},
                     {value:'students',label:'学生'},
                     {value:'teacher',label:'教师'}],
            value:'',
        }
    },
    methods:{
        handlechange(){
            let that = this;
            console.log(that.value);
            if (that.value == 'manager'){
                setTimeout(function (){
		                that.$nextTick(function (){
		                that.$bus.$emit('login',[true]);
		        })},500);

            }else if(that.value == 'teacher'){
                setTimeout(function (){
		                that.$nextTick(function (){
		                that.$bus.$emit('login',[false]);
		        })},500);
            }
        }
    }
    
}
</script>
<style scoped>
.el-select{
    width:100%
}
</style>