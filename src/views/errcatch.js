//报错时的错误捕捉函数
import router from '../router/index'
import {Message} from 'element-ui'
function  errcatch(error){
    if (error.request) {
    console.log('error.request');
    console.log(error.request);
    let statuscode=error.request.status;
    // console.log(error.request.status);
    console.log(statuscode);
    if (statuscode==400){
        Message.error('用户名错误或不存在');
    }
    else if (statuscode==401){
        router.push('/index');
        alert('身份过期，请重新登录');
    }
    else if (statuscode==403){
        Message.error('没有权限')
    }
    else if (statuscode==409){
        Message.error('密码错误');
    }
    else if (statuscode==406){
        Message.error('非法数据')
    }
    else if (statuscode==412){
        Message.error('所调用的service不存在')
    }
    else if (statuscode==422){

    }
    else{
        Message.error('未定义的错误码')
    }
    }
    }
export {errcatch}