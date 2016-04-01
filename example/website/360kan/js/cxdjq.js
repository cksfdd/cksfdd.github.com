/**
 * Created by Administrator on 2015/12/28.
 */
//生成一组x-y的随机数
function rnd(x,y){
    return parseInt(Math.random()*(y-x)+x);
}
//数组去重
function findInArr(num,arr){
    for(var i=0;i<arr.length;i++){
        if(num==arr[i]){
            return true;
        }
    }
    return false;
}
//补全
function toDou(n){
    return n<10?'0'+n:''+n;
}
//获取非行间样式
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}
function getByClass(oParent,sClass){
    //获取所有oParent下面的标签
    var aEle = oParent.getElementsByTagName('*');
    var result = [];
    for(var i = 0;i<aEle.length;i++){
        //所有标签 类名的数组
        var arr = aEle[i].className.split(' ');
        //判断我们要的那个类名是不是在数组中
        if(findInArr(sClass,arr)){
            result.push(aEle[i]);   //带box类名的元素
        }
    }
    return result;
}