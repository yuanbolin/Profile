


//开启webSocket
function StartWebSocket(){
	 var url = "ws://localhost:9000/";

	if('WebSocket' in window){
            ws = new WebSocket(url);
    }
    else if('MozWebSocket' in window){
        ws = new MozWebSocket(url);
    }else{
		alert("浏览器版本过低，请升级您的浏览器。\r\n浏览器要求：IE10+/Chrome14+/FireFox7+/Opera11+");
	}
   
	ws.onopen = function()
   {
      m_isConnectWS = true;
	  sendInitMsg();//初始化
	  m_closed = false;
   };
	
	
   ws.onmessage = function (evt) 
   { 
   	
   	
   	if(typeof(evt.data)=="string"){
   		
   		var str = evt.data;
   		
   		if(str.length <= 0){
   			
   			return;
   		}
		
		if(str.indexOf("FileEncodeBase64") >=0){
			//base64
			var strs= new Array(); 
		
			strs=str.split(m_splitTag);
			var score = strs[2];
			if(m_ComparePicBase64){
				//设置人脸比对的base64图片
				 var myimg = document.getElementById(m_compareShowID); 
				myimg.src = "data:image/png;base64,"+score;	
				m_ComparePicBase64 = false;
			}else if(m_idcardBase64){
				//设置二代证读卡器base64图片
//				var myimg = document.getElementById("head"); 
//				myimg.src = "data:image/png;base64,"+score;	
//				m_idcardBase64 = false;
			}
			else {
				alert(score);			
			}			
			return;
		}
		
		if(str.indexOf("$$$")>=0){
			
			var strs= new Array();
			strs=str.split("$$$"); 
			alert(strs[1]);
		}
		
		if(str.indexOf(m_splitTag)>=0){
			//视频的每一帧
			var strs= new Array();
			strs=str.split(m_splitTag); 
			setImageWithBase64(strs[1]);
		}else{
			//处理其他请求
			console.log(str);
			handleJsonStrMessage(str);
		}
		
		
   		
   	}
  
 	};
	
   ws.onclose = function()
   { 
      m_isConnectWS = false;
	
      alert("请开启server");
   };
	
}

function sendWsMessage(jsonObj){
	var jsonStr = JSON.stringify(jsonObj);
	ws.send(jsonStr);
}

function handleJsonStrMessage(str){
	
	var jsonOBJ = JSON.parse(str);
	var name = jsonOBJ.FuncName;
	var re = jsonOBJ.result;
	//初始化
	if( name == "camInitCameraLib"){
		
		if (re == "0"){
			//alert("初始化成功");
			openDev();
		}else{
			alert("初始化失败" + re);
		}
			
	}
	//打开设备
	else if(name == "camOpenDev"){
		
		if(re == 0){
//			alert("打开身份证摄像头成功");
		
			//获取分辨率
			var jsonObj = {FuncName:'camGetResolution'};
			sendWsMessage(jsonObj);

		
		}else{
			alert("打开失败" + re);
		}
		
	}
	//获取设备名
	else if(name == "camGetDevName"){
		
		configureDevInfo(re);
		
	}
	//获取分辨率
	else if(name == "camGetResolution"){
		
		configureRestionInfo(re);
	}
	//设置分辨率
	else if(name == "camSetResolution"){
		
		if(re !=0){
			
			alert("设置分辨率失败");
		}
	}
	//拍照
	else if(name == "camCaptureImageFile"){
		
		if(re != 0){
			
			alert("拍照失败");
		}
		
		
	}
	//自动裁切
	else if(name == "camSetImageAutoCrop"){
		if(re != 0){
			
			alert("自动裁切失败");
		}
	}
	//旋转
	else if(name == "camSetImageRotateMode"){
		
		if(re != 0){
			
			alert("旋转失败");
		}
	}
	//二代证
	else if(name == "idcardrfidReadIDCard"){
		console.log(re);
		document.getElementById("IDCard").innerHTML = re;
		var reList = re.split("|");
		console.log(reList);
//		var reList = ["刘路超", "372330199306225458", "男", "汉", "19930622", "山东省邹平县明集镇许道口村329号", "邹平县公安局", "20101123", "20201123"]
		window.parent.document.getElementById("xingming").value = reList[0];
		window.parent.document.getElementById("shenfenzhenghao").value = reList[1];
		window.parent.document.getElementById("xingbie").value = reList[2];
		window.parent.document.getElementById("minzu").value = reList[3];
		window.parent.document.getElementById("zhuzhi").value = reList[5];
		window.parent.document.getElementById("qianfajiguan").value = reList[6];
		window.parent.document.getElementById("zhengjianyouxiaoqi").value = reList[7] + " ~ "+ reList[8];
		m_ComparePicBase64 = false;
		showHead();
	}
	//文件上传
	else if(name == "camUpdataFileHttp"){
		var jsonStrRe = JSON.stringify(re)
		alert(jsonStrRe);
	}
	//社保卡
	else if(name == "ReadSBKCaard"){
		
		alert(re);
	}
	//遍历文件夹
	else if(name == "getFolderDayFileA")
	{
		alert(re);
	}
	//删除文件
	else if(name == "camDeleteFile")
	{
		if(re ==0)
		{
			alert("文件删除成功！");
			
		}
		else
		{
			
			alert("文件删除失败！");
		}
		
	}
	
	//设置DPI
	else if(name == "camSetImageDPI")
	{
		if(re ==0)
		{
			alert("DPI设置成功！");
			
		}
		else
		{
			
			alert("DPI设置失败！");
		}
		
	}
	//设置JPG压缩率
	else if(name == "camSetImageJPGQuanlity")
	{
		if(re ==0)
		{
			alert("JPG压缩设置成功！");
			
		}
		else
		{
			
			alert("JPG压缩设置失败！");
		}
		
		
	}
	//删除文件夹
	else if(name == "DeleteFolderDayFileA")
	{
		if(re ==0)
		{
			alert("删除文件夹成功！");
			
		}
		else
		{
			
			alert("删除文件夹失败！");
		}
		
		
	}
	//读取的银行卡
	else if(name == "ReadBankCard"){
		
		alert(re);
	}
	//读取的磁条卡
	else if(name == "ReadMagneticCard"){
		alert(re);
	}
	//初始化指纹仪
	else if(name == "fingerprintInit"){
		if (re == "0"){
			
			alert("初始化指纹仪成功");
			
		}else{
			
			alert("初始化指纹仪失败");
		}
		
	}
	//反初始化指纹仪
	else if(name == "fingerprintUnInit"){
		if (re == "0"){
			
			alert("反初始化指纹仪成功");
			
		}else{
			
			alert("反初始化指纹仪失败");
		}
	}
	//采集指纹
	else if(name == "CollectFingerFeature"){
		
		if(re == "0"){
			
			alert("采集指纹成功");
		}else{
			alert("采集失败");
		}
		
	}
	//比对指纹
	else if(name == "CompareFingerFeature"){
		
		if(re == "-100"){
			
			alert("请先采集指纹");
			
		}else if(re == "0"){
			
			alert("比对成功");
		}else {
			
			alert("比对失败");
		}
		
	}
	//连拍
	else if(name == "camStartAutoCapture"){

		if(re == "0"){
			alert("连拍开启成功");
		}

	}
	//停止连拍
	else if(name == "camStopAutoCapture"){

		if(re == "0"){
			alert("停止连拍成功");
			AutoCaptureBack("-1000");
		}

	}
	//连拍回调
	else if(name == "AutoCaptureBack"){
		
		if(re == "0"){
			
			AutoCaptureBack(re);
		}else {
			AutoCaptureBack("-1000");
			alert("连拍回调出错"+String(re));
		}
		
	}
	//初始化人脸识别模块
	else if(name == "InitFaceSDK"){
		
		if(re == "0"){
			alert("初始化人脸识别成功");
		}else {
			alert("初始化人脸识别失败");
		}
		
	}
	//反初始化人脸识别模块
	else if(name == "UinitFaceSDK"){
		
		alert(re);
	}
	//打开人脸视频
	else if(name == "OpenFaceCamera"){
		
		if(re == "0"){
//			alert("打开人脸摄像头成功");
		}else {
			alert("打开人脸摄像头失败");
		}
	}
	//设置比对图片
	else if(name == "SetHeadByFile"){
		if(re == "0"){
			
			m_ComparePicBase64 = true;
			m_compareShowID = "ComparePic";
			var url = document.getElementById("imgOne").value;
			var jsonObj = {FuncName:'FileEncodeBase64',argument:{filePath:url}};
			sendWsMessage(jsonObj);
            	
		}
		else if(re == "-10002"){
			alert("请打开FaceServer");
		}else if(re == "-10003"){
			alert("未检测出人脸，请重新设置");
		}else {
			alert(re);
		}
		
	}
	//设置比对base64
	else if(name == "SetHeadByBaseStr"){
		
		if(re == "0"){
			var url = document.getElementById("imgBase64").value;
			var myimg = document.getElementById("ComparePic"); 
			myimg.src = "data:image/png;base64,"+url;
		}
		else if(re == "-10002"){
			alert("请打开FaceServer");
		}else if(re == "-10003"){
			alert("未检测出人脸，请重新设置");
		}else {
			alert(re);
		}
		
	}
	//匹配图片
	else if(name == "MatchFace") {
		
		if(re == "-10002"){
			alert("请打开FaceServer");
		}else if(re == "-10003" || re == "-10001"){
			alert("未检测出人脸，请重新匹配");
		}else {
			
			var score = parseInt(re);
			if(score>=0 && score<=100){
				
				
				m_ComparePicBase64 = true;
				m_compareShowID = "RealPic";
				var jsonObj = {FuncName:'FileEncodeBase64',argument:{filePath:"D:\\123.jpg"}};
				sendWsMessage(jsonObj);
				alert("分数：" + re);			
			}		
		}
	}
	//选择麦克风
	else if(name == "camGetAudioDevName"){
		MicrophoneName(re);
		//console.log(re);
	}
	//录像格式
	else if (name == "camGetVideoEncodeName"){	
		//console.log(re);
		VideoName(re);
	}
	//开始录像
	else if(name == "camStartRecord"){
		if(re == 0) {
			alert("开始录像");
			GetVoice();
		}
		else {
			alert("录像失败");
		}
	}
	//关闭录像
	else if(name == "camStopRecord"){
		if(re == 0) alert("录制成功");
		else alert("录制失败");
	}
	else if (name == "camGetMicrophoneVolumeLevel"){
		ShowVioce(re);
	}
	else if(name == "camSetImageAdjust"){
		if(re != 0){		
			alert("设置失败");
		}
	}
	//合并pdf
	else if(name == "camAddFileToPDFList"){
		if(re != 0){		
			alert("添加pdf失败");
		}
	}
	else if(name == "camCombinePDF"){
		if(re == 0){		
			alert("合并pdf成功");
		}
		else{		
			alert("合并pdf失败");
		}
	}
	else if(name == "camCombineImage"){
		if(re == 0){		
			alert("合并图片成功");
		}
		else{		
			alert("合并图片失败");
		}
	}
}

	
	

