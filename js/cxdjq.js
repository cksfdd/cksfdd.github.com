/**
 * Created by Administrator on 2015/12/28.
 */
//生成一组x-y的随机数
function rnd(x, y) {
    return parseInt(Math.random() * (y - x) + x);
}
//数组去重
function findInArr(num, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (num == arr[i]) {
            return true;
        }
    }
    return false;
}
//补全
function toDou(n) {
    return n < 10 ? '0' + n : '' + n;
}
//获取非行间样式
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}
//获取带class名字的标签
function getByClass(oParent, sClass) {
    if (oParent.getElementsByClassName) {
        return oParent.getElementsByClassName(sClass);
    } else {
        //获取所有oParent下面的标签
        var aEle = oParent.getElementsByTagName('*');
        var result = [];
        for (var i = 0; i < aEle.length; i++) {
            //所有标签 类名的数组
            var arr = aEle[i].className.split(' ');
            //判断我们要的那个类名是不是在数组中
            if (findInArr(sClass, arr)) {
                result.push(aEle[i]);   //带box类名的元素
            }
        }
        return result;
    }
}
//批量修改样式
function setStyle() {
    //两个参数
    //obj.style[样式名] = 样式值
    if (arguments.length == 2) {
        for (var i in arguments[1]) {
            //alert(i);样式的名字
            //alert(name[i]);样式的值
            arguments[0].style[i] = arguments[1][i];
        }
    } else {
        //三个参数
        arguments[0].style[arguments[1]] = arguments[2];
    }
}
//字符串转json
function url2json(str) {
    var arr = str.split('&');
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        json[arr[i].split('=')[0]] = arr[i].split('=')[1];
    }
    return json;
}
//json转字符串
function json2url(json) {
    var arr = [];
    for (var i in json) {
        arr.push(i + '=' + json[i]);
    }
    return arr.join('&');
}
//获取今天日期
function getToday() {
    var oDate = new Date();
    var y = oDate.getFullYear();
    var m = oDate.getMonth() + 1;
    var d = oDate.getDate();
    return y + '/' + m + '/' + d;
}
//找出数组中最小的
function findMin(start) {
    var iMinIndex = start;
    var iMin = arr[start];
    for (var i = start + 1; i < arr.length; i++) {
        if (arr[i] < iMin) {
            iMin = arr[i];
            iMinIndex = i;
        }
    }
    return iMinIndex;
}
//获取到可视区的距离
function getPos(obj) {
    var l = 0;
    var t = 0;
    while (obj) {
        l += obj.offsetLeft;
        t += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return {
        "left": l,
        "top": t
    }
}
//绑定事件
function addEvent(obj, sEv, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(sEv, fn, false);
    } else {
        obj.attachEvent('on' + sEv, fn);
    }
}
//解除绑定
function removeEvent(obj, sEv, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(sEv, fn, false);
    } else {
        obj.detachEvent('on' + sEv, fn);
    }
}
//添加滚轮事件
function addWheel(obj, fn) {
    if (navigator.userAgent.indexOf('Firefox') != -1) {           //ff
        obj.addEventListener('DOMMouseScroll', fnWheel, false);
    } else {
        obj.onmousewheel = fnWheel;
    }
    function fnWheel(ev) {
        var oEvent = ev || event;
        var down = false;
        //chrome IE
        if (oEvent.wheelDelta) {
            down = oEvent.wheelDelta < 0 ? true : false;
        } else {
            //oEvent.detail
            down = oEvent.detail < 0 ? false : true;
        }
        //down鼠标方向 向下为true
        fn(down);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
}
//设置cookie
function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
}
//获取cookie
function getCookie(name) {
    var arr = document.cookie.split('; ');
    console.log(arr);

    for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=');
        console.log(arr2);
        if (arr2[0] == name) {
            return arr2[1];
        }
    }
    return '';
}
//删除cookie
function removeCookie(name) {
    setCookie(name, '', -1)
}
//addReady
function addReady(fn) {
    //ff chrome addEventListener
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn, false);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                fn();
            }
        });
    }
}




