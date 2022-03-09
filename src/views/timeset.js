import moment from "moment"
export function formatDate1(timestamp) {     
 //时间戳为10位需*1000，时间戳为13位的话不需乘1000   946656000000
    let newdata=new Date(timestamp*1+946656000000)
    let Y = newdata.getFullYear() + '-';
    let M = (newdata.getMonth()+1 < 10 ? '0'+(newdata.getMonth()+1) :newdata.getMonth()+1) + '-';
    let D = newdata.getDate() + ' ';
    let h = newdata.getHours() + ':';
    let m = newdata.getMinutes() + ':';
    let s = newdata.getSeconds();
    console.log(Y+M+D+h+m+s);
}
export function formatDate2() {  
    var time = new Date(); 
    let data= new moment(time).valueOf()*1-946656000000
    console.log(new moment(time).valueOf());
    console.log(data);
   }
export function formatDate3(time) {  
    let date = new Date(time);
   }
export function changetime1(time){
    let timelst=time.split(':')
        return timelst[0]*3600+timelst[1]*60+timelst[2]*1

}
export function changetime2(time){
    if(typeof time=='number'){
    let h= Math.floor(time / 3600); 
    let m= Math.floor((time-3600*h) /60);
    let s=time-3600*h-60*m;
   return h+':'+m+':'+s 
    }
    else{
        return time
    }
}