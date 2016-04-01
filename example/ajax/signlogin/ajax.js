'use strict';
function json2url(json){
	json.t = Math.random();		//清除缓存
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));		//中文在ie6有问题需编码
	}
	return arr.join('&');
}
/*
**	ajax 		ajax交互函数
** 	params
** 				json [object]
*/
function ajax(json){
	//json    (url,[data],[type],success,error,[timeout]);
	json = json||{};
	if(!json.url)return;		//如果没有url啥也不用做返回
	json.data = json.data || {};
	json.type = json.type || 'get';
	json.timeout = json.timeout || 5000;
	//判断浏览器兼容，然后创建AJAX对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}
	//匹配以什么方式交互
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	//开个定时器，用来做超时。
	//如果时间到了还没有返回数据，就代表超时
	var timer = setTimeout(function(){
		//如果超时，就不许要服务器的响应
		oAjax.onreadystatechange=null;
		//并且调用失败回调函数，告诉人家怎么回事。
		json.error&&json.error('亲，网络不给力');
	},json.timeout);
	//接收服务器响应事件
	oAjax.onreadystatechange=function(){
		//判断http步骤是否是完成
		//0 未发送  1 发送成功 2 接收原始成功 3 解析 4 完成
		if(oAjax.readyState==4){
			//判断http状态码是否是成功
			//注:2字头的都是成功，304是没有修改，也算成功。
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				//如果成功，就不需要超时的定时器了。
				clearTimeout(timer);
				//调用成功的回调函数，并返回服务器返回结果
				//oAjax.responseText 服务器响应文本
				json.success&&json.success(oAjax.responseText);
			}else{
				clearTimeout(timer);
				json.error&&json.error(oAjax.status);
			}
		}
	};
}