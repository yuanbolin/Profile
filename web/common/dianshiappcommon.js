var SERVERADDR;
var SERVER;
SERVERADDR ="https://xunte.vip/";
SERVER = SERVERADDR +"api/";
var mode = "dev1";
$.ajaxSetup({
	dataType:"json",
	async:true,
	cache:true,//false可防止缓存，但由于url拼接问题，暂时去掉
	beforeSend:function(xhr){
		beforeSend(xhr);
	},
	//登录验证1
	complete:function(event, xhr, options){
		if (xhr == "success" && event.responseJSON["status"] == -600) {
			alert("用户名或密码错误");
			window.event.returnValue = false;
			return false;
		}
	},
   	error:function(jqXHR, textStatus, errorThrown){
		handleError(jqXHR,textStatus,errorThrown);
	}
});
var successStr = "OK!";
var errorStr = "稍安勿躁，服务器偷懒了...";
var noContect_error = "网络不通了，请稍后再试";

function handleError(jqXHR,textStatus,errorThrown){
	if(jqXHR.status == 0){
		alert(noContect_error);
	}
	else if(jqXHR.status == 401){
		alert("请重新登录");
		window.location.href = "../login.html";
		window.event.returnValue = false;
		return false;
	}
	else{
		alert(errorStr);
	}
}
function beforeSend(xhr){
	xhr.setRequestHeader("Authorization","Bearer "+sessionStorage.getItem("token"));
}

function GetQueryString(name) {
  	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  	var r = window.location.search.substr(1).match(reg);
  	if (r != null) {
    	return decodeURI(r[2]);
  	}
  	return null;
}




