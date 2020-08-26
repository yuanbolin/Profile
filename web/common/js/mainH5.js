
function load(){
	//连接服务
	StartWebSocket();
	
}

function unload(){
	
	if(m_closed){
		return;
	}
	clearInterval();
	//反初始化
	var jsonObj = {FuncName:'camUnInitCameraLib'};
	sendWsMessage(jsonObj);
}
//初始化
function sendInitMsg(){
	
	var jsonObj = {FuncName:'camInitCameraLib'};
	sendWsMessage(jsonObj);
}
//设置预览区域
function sendPreZoneSize(){
	
	var w = document.getElementById("myCanvas").width;
	var h = document.getElementById("myCanvas").height;
	
	var jsonObj = {FuncName:'PreZoneSize',argument:{width:w,height:h}};
	sendWsMessage(jsonObj);
	
}

//打开设备
function openDevNew(){
	
	if(m_closed){
		
		StartWebSocket();
	}
	setTimeout(function(){
		
		sendPreZoneSize();
		//打开摄像头
		var jsonObj = {FuncName:'camOpenDev',argument:{devIndex:0, subtype:0,width:0,height:0}};
		sendWsMessage(jsonObj);
		//开始预览
		jsonObj = {FuncName:'camStartPreview'};
		sendWsMessage(jsonObj);
		
		//获取设备名
	    jsonObj = {FuncName:'camGetDevName'};
		sendWsMessage(jsonObj);
		
		//获得麦克风
		jsonObj = {FuncName:'camGetAudioDevName'};
		sendWsMessage(jsonObj);
		
		//获得录像格式
		jsonObj = {FuncName:'camGetVideoEncodeName'};
		sendWsMessage(jsonObj);
		
	},500);
	CaptureNew();
}

function CaptureNew(){
	
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camCaptureImageFile',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}

//打开设备
function openDev(){
	
	if(m_closed){
		
		StartWebSocket();
	}
	setTimeout(function(){
		
		sendPreZoneSize();
		//打开摄像头
		var jsonObj = {FuncName:'camOpenDev',argument:{devIndex:0, subtype:0,width:0,height:0}};
		sendWsMessage(jsonObj);
		//开始预览
		jsonObj = {FuncName:'camStartPreview'};
		sendWsMessage(jsonObj);
		
		//获取设备名
	    jsonObj = {FuncName:'camGetDevName'};
		sendWsMessage(jsonObj);
		
		//获得麦克风
		jsonObj = {FuncName:'camGetAudioDevName'};
		sendWsMessage(jsonObj);
		
		//获得录像格式
		jsonObj = {FuncName:'camGetVideoEncodeName'};
		sendWsMessage(jsonObj);
		
	},500);
	
}

//关闭设备
function closeDev(){
	
	var objSelect = document.getElementById("device");
	var jsonObj = {FuncName:'camCloseDev',argument:{devIndex:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
}

//显示设备名
function configureDevInfo(names){	

//	//设备名字
//	var objSelect = document.getElementById("device");
//	objSelect.options.length = 0;
//	
//	for (var i = 0; i < names.length;i++ ) {
//	
//		var op = new Option(names[i],i);
//		objSelect.options[objSelect.length] = op;
//		
//	}
//
//	//设置设备
//	objSelect.onchange = function(){
//		
//		//打开摄像头
//		var jsonObj = {FuncName:'camOpenDev',argument:{devIndex:objSelect.selectedIndex, subtype:0,width:0,height:0}};
//		sendWsMessage(jsonObj);
//		
//	}
	
}
//设置 分辨率
function configureRestionInfo(names){
	
//	var objSelect = document.getElementById("resoultion");
//	objSelect.options.length = 0;
//	
//	for (var i = 0; i < names.length;i++ ) {
//		if(names[i].length <=0){
//			continue;
//		}
//		var op = new Option(names[i],i);
//		objSelect.options[objSelect.length] = op;
//		
//	}
//
//	//设置分辨率
//	objSelect.onchange = function(){
//		
//		var jsonObj = {FuncName:'camSetResolution',argument:{index:objSelect.selectedIndex}};
//		sendWsMessage(jsonObj);
//	
//	}
}

function configureVideoStyle(names){
	
	var objSelect = document.getElementById("videoStyle");
	objSelect.options.length = 0;
	
	for (var i = 1; i < names.length;i++ ) {
	
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}

	//设置视频格式
	objSelect.onchange = function(){
		
		//sendWsMessage("SetMediaType"+m_splitTag+String(objSelect.selectedIndex));
	
	}
	
}
//






function ResizeImage(imageDest, W, H)
{
//显示框宽度W,高度H 
var image = new Image();
image.src = imageDest.src;
image.width = 2592;
image.height = 1944;
if(image.width>0 && image.height>0)
{
    //比较纵横比
    if(image.width/image.height >= W/H)//相对显示框：宽>高
    {
     if(image.width > W) //宽度大于显示框宽度W，应压缩高度
     {
               imageDest.width = W; 
               imageDest.height = (image.height*W)/image.width;   
              }
     else //宽度少于或等于显示框宽度W，图片完全显示
     {
               imageDest.width = image.width;       
               imageDest.height = image.height;   
              }
    }
    else//同理
    {
     if(image.height > H)
     {
               imageDest.height = H;
               imageDest.width = (image.width*H)/image.height;
              }
     else
     {
               imageDest.width = image.width;
               imageDest.height = image.height;
              }
    }
}
}
//
//显示每一帧
function setImageWithBase64(str){

	var myimg = document.getElementById("myCanvas"); 
	myimg.src = "data:image/png;base64,"+str;
	//ResizeImage(myimg, myimg.width, myimg.height);
}


//旋转
function SetRotationStyle(){
	var objSelect = document.getElementById("rotationStyle");
	var jsonObj = {FuncName:'camSetImageRotateMode',argument:{rotateMode:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
}
//自动裁切
function SetCutStyle(){
	
	var objSelect = document.getElementById("cutStyle");
	
	var jsonObj = {FuncName:'camSetImageAutoCrop',argument:{CropType:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
	if(objSelect.selectedIndex > 4)
	{
		SavePara();		
	}
}
//图像处理
function setImageAdjust(){
	var objectSelect = document.getElementById("imageAdjust");
	var jsonObj = {FuncName:'camSetImageAdjust',argument:{Type:objectSelect.selectedIndex}};
	sendWsMessage(jsonObj);
}
//拍照
function Capture(){
	
	var filepath = window.parent.document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camCaptureImageFile',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
	
}
//身份证拍照
function Capture1(){
	
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camCaptureImageFile',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
	
}
//人脸拍照
function Capture2(){
	
	var filepath = window.parent.document.getElementById("saveText2").value;
	var jsonObj = {FuncName:'camCaptureImageFile',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
	
}

//文件上传
function HttpUpload(){
	
	var filepath = document.getElementById("saveText").value;
	var urlpath = document.getElementById("urlText").value;
	var jsonObj = {FuncName:'camUpdataFileHttp',argument:{filePath:filepath, url:urlpath,param:"",response:""}};
	sendWsMessage(jsonObj);
	
}
//读取二代证
function ReadIDCard()
{
	var filepath = document.getElementById("HeadPath").value;
	var jsonObj = {FuncName:'idcardrfidReadIDCard',argument:{HeadPath:filepath}};
	sendWsMessage(jsonObj);
}
function showHead(){
	m_idcardBase64 = true;
	var filepath = document.getElementById("HeadPath").value;	
	var jsonObj = {FuncName:'FileEncodeBase64',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}
//读取银行卡
function ReadBankCard(sort){
	
	var jsonObj = {FuncName:'ReadBankCard',argument:{sort:sort}};
	sendWsMessage(jsonObj);
	
}

//读取磁条卡
function ReadMagneticCard(sort){
	
	var jsonObj = {FuncName:'ReadMagneticCard',argument:{sort:sort}};
	sendWsMessage(jsonObj);
}

//读取社保卡
function ReadSBKCard()
{
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'ReadSBKCaard',argument:{}};
	sendWsMessage(jsonObj);	
}

//初始化指纹仪
function InitFingerData(){
	
	var jsonObj = {FuncName:'fingerprintInit',argument:{}};
	sendWsMessage(jsonObj);
}

//反初始化指纹仪
function UinitFingerData(){
	
	var jsonObj = {FuncName:'fingerprintInit',argument:{}};
	sendWsMessage(jsonObj);
	
}

//采集指纹
function GetFingerPic(num){
	
	var jsonObj = {FuncName:'CollectFingerFeature',argument:{number:num}};
	sendWsMessage(jsonObj);
	
}

//对比指纹
function ComperaFingerPic(){
	
	var jsonObj = {FuncName:'CompareFingerFeature',argument:{}};
	sendWsMessage(jsonObj);
	
}

//图片base64
function CaptureBase64()
{
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'FileEncodeBase64',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}
//删除文件
function DeleteFile(){
	
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camDeleteFile',argument:{FilePath:filepath}};
	sendWsMessage(jsonObj);
}

//遍历文件夹
function FindJPGFile()
{
	var filepath = document.getElementById("Distory").value;
	var jsonObj = {FuncName:'getFolderDayFileA',argument:{Dictpry:filepath}};
	sendWsMessage(jsonObj);
}
//删除文件夹
function RemoveDictory()
{
	var filepath = document.getElementById("Distory").value;
	var jsonObj = {FuncName:'DeleteFolderDayFileA',argument:{Dictpry:filepath}};
	sendWsMessage(jsonObj);
}
//设置DPI
function DPISet(){
	
	var xdpi = document.getElementById("dpix").value;
	var ydpi = document.getElementById("dpiy").value;
	var jsonObj = {FuncName:'camSetImageDPI',argument:{xDPI:parseInt(xdpi),yDPI:parseInt(ydpi)}};
	sendWsMessage(jsonObj);
}
//设置JPG压缩率
function JPGQSet()
{
	var JPGQ = document.getElementById("jpg").value;
	var jsonObj = {FuncName:'camSetImageJPGQuanlity',argument:{quanlity:parseInt(JPGQ)}};
	sendWsMessage(jsonObj);
}

//设置手动裁剪区域
function CropZoneSet(){

	var left = document.getElementById("left").value;
	var right = document.getElementById("right").value;
	var top = document.getElementById("top").value;
	var bottom = document.getElementById("bottom").value;

	var jsonObj = {FuncName:'camSetImageCusCropRect',argument:{left:parseInt(left),right:parseInt(right),top:parseInt(top),bottom:parseInt(bottom)}};
	sendWsMessage(jsonObj);
	
}

function showBase64info(str)
{
	
	alert("Base64数据为："+ str);
	
}

var AutoCaptureTime = 0;
//连拍
function continuCapture(){
	
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camStartAutoCapture',argument:{type:0,param:4,filePath:filepath}};
	AutoCaptureTime = 4;
	sendWsMessage(jsonObj);
}
//定时连拍
function timeCapture(){
	
	var filepath = document.getElementById("saveText").value;
	var jsonObj = {FuncName:'camStartAutoCapture',argument:{type:1,param:4,filePath:filepath}};
	AutoCaptureTime = 4;
	sendWsMessage(jsonObj);
	
}
//停止连拍
function StopAutoCapture(){
	
	var jsonObj = {FuncName:'camStopAutoCapture',argument:{}};
	sendWsMessage(jsonObj);
}

//处理回调
function AutoCaptureBack(re){
	
	var progress0 = document.getElementById("autoCaptureProgress");
	
	if(re == "-1000"){
	
		progress0.value = "0";

	}else {
	
		progress0.value = "100";
		setTimeout(function(){
			progress0.value = "0";
		},AutoCaptureTime/2 *1000);
	}
		
}

//初始化人脸识别模块
function InitFaceSDK(){
	var jsonObj = {FuncName:'InitFaceSDK',argument:{}};
	sendWsMessage(jsonObj);
}
//反初始化人脸识别模块
function UinitFaceSDK(){
	
	var jsonObj = {FuncName:'UinitFaceSDK',argument:{}};
	sendWsMessage(jsonObj);
}


//打开人脸视频
function OpenFaceCamera(index){
	
	var jsonObj = {FuncName:'OpenFaceCamera',argument:{devIndex:index,subtype:0,width:0,height:0}};
	sendWsMessage(jsonObj);
}
//设置比对图片
 function SetComparePic(){
            	
	var url = document.getElementById("imgOne").value;
	
    var jsonObj = {FuncName:'SetHeadByFile',argument:{path:url}};
	sendWsMessage(jsonObj); 	
            	
}
//匹配
function comparePic(){
	
	var jsonObj = {FuncName:'MatchFace',argument:{path:"D:\\123.jpg"}};
	sendWsMessage(jsonObj); 
	
}

//图片base64比对
function SetComparePicBase64(){
	
	var url = document.getElementById("imgBase64").value;
	var jsonObj = {FuncName:'SetHeadByBaseStr',argument:{bsStr:url}};
	sendWsMessage(jsonObj);
	
}
//获得麦克风名字
function MicrophoneName(names){	

	//设备名字
		
	var objSelect = document.getElementById("Microphone");
	objSelect.options.length = 0;
	
	for (var i = 0; i < names.length;i++ ) {
	
		var op = new Option(names[i],i);
		objSelect.options[objSelect.length] = op;
		
	}
}
//获得视频格式名字					
function VideoName(names){	

//	//设备名字
//	var objSelect = document.getElementById("VideoType");
//	objSelect.options.length = 0;
//	for (var i = 0; i < names.length;i++ ) {
//	
//		var op = new Option(names[i],i);
//		objSelect.options[objSelect.length] = op;
//		
//	}
//	
//	
//	objSelect.onchange = function(){
//		
//		var pathobj = document.getElementById("SaveVieoText");	
//		var savepath = pathobj.value ;	
//		var index = objSelect.selectedIndex;  
//		var text = objSelect.options[index].text; 
//		var str = savepath.indexOf(".") + 1;
//		str = savepath.substr(0,str) + text;
//		pathobj.setAttribute("value",str);
//	}
}	
//开始视频名字
function StartVideo(){
	var savepath = document.getElementById("SaveVieoText").value;
	var objSelect = document.getElementById("device");
	var CurMicphone = document.getElementById("Microphone");
	var CurVideoFormat = document.getElementById("VideoType");
	//console.log(savepath,CurMicphone.selectedIndex,CurVideoFormat.selectedIndex);
	var jsonObj = {FuncName:'camStartRecord',argument:{filePath:savepath,micphone:CurMicphone.selectedIndex,videoFormat:CurVideoFormat.selectedIndex}};
	sendWsMessage(jsonObj);
}
//关闭视频
function StopVideo(){
	var objSelect = document.getElementById("device");
	var jsonObj = {FuncName:'camStopRecord',argument:{devIndex:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
	var objSelect = document.getElementById("voice");
	objSelect.setAttribute("Value",0);
}
//录音声音反馈
function GetVoice(){
	var objSelect = document.getElementById("voice");
	var jsonObj = {FuncName:'camGetMicrophoneVolumeLevel',argument:{devIndex:objSelect.selectedIndex}};
	sendWsMessage(jsonObj);
}
function ShowVioce(volume){
	var objSelect = document.getElementById("voice");
	//console.log(objSelect.value);
	objSelect.setAttribute("Value",volume);
}
//合并PDF
var count = 0;
function addFile()
{
		count++;

        var newDiv = "<div id=divUpload" + count + ">"
            + " <input  id=file"+count+" type=text width=1000 size=50 name=upload/>"
             +"<a href=javascript:delUpload('divUpload" + count+"')>删除</a>"
            + " </div>";

        var newDiv2 = "<div id=index" + count + ">" + count + " </div>";
        document.getElementById("uploadContent").insertAdjacentHTML("beforeEnd", newDiv);
        document.getElementById("Div2").insertAdjacentHTML("beforeEnd", newDiv2);
}
function delUpload(diva) {
	document.getElementById("Div2").removeChild(document.getElementById("index"+count));
    count--;
    document.getElementById(diva).parentNode.removeChild(document.getElementById(diva));  
}
function CombineFile()
{
    for(var i = 1;i<count+1;i++)
    {
        var path = document.getElementById("file" + i).value;
        if(path==null)
        {
           continue;
        }
        if(path.value=="")
        {
           continue;
        }
        var ret = AddFileToPDFList(path);
    }
       var fileext =".pdf";
	   var strFolder = document.getElementById("pdftext").value;
	   var myDate = new Date();
	   var myName = "Image_"+myDate.getFullYear()+(myDate.getMonth()+1)+myDate.getDate()+"_"+myDate.getHours()+myDate.getMinutes()+myDate.getSeconds()+myDate.getMilliseconds();

	   var newFile = strFolder + "\\" + myName + fileext ;
       var result = CombinePDF(newFile, 50); 
}

function AddFileToPDFList(path)
{
	var filepath = path;
	var jsonObj = {FuncName:'camAddFileToPDFList',argument:{filePath:filepath}};
	sendWsMessage(jsonObj);
}

function CombinePDF(path,JQ)
{
	var JpegQuaility = JQ;
	var filepath = path;
	var jsonObj = {FuncName:'camCombinePDF',argument:{filePath:filepath,JpegQuality:JpegQuaility}};
	sendWsMessage(jsonObj);
}
function CombinePicture()
{

    var path1 = document.getElementById("file1").value;
    var path2 = document.getElementById("file2").value;
    var fileext =".jpg";
	var strFolder = document.getElementById("pdftext").value;
	var myDate = new Date();
	var myName = "Image_"+myDate.getFullYear()+(myDate.getMonth()+1)+myDate.getDate()+"_"+myDate.getHours()+myDate.getMinutes()+myDate.getSeconds()+myDate.getMilliseconds();
	var newFile = strFolder + "\\" + myName + fileext ;

	var objectSelect = document.getElementById("CombineType").selectedIndex;
	var iType = 0;
	if(objectSelect == 0){
		iType = 7;
	}else{
		iType = 4;
	}

	var ioffsetX = 0;
	var ioffsetY = 0;

	var jsonObj = {FuncName:'camCombineImage',argument:{filePath1:path1,filePath2:path2,PdfPath:newFile,Type:iType,offsetX:ioffsetX,offsetY:ioffsetY}};
	sendWsMessage(jsonObj);
}
 

//图片添加路径  
function imgFormatter(value,row,index){  
     if('' != value && null != value){  
    var strs = new Array(); //定义一数组   
    if(value.substr(value.length-1,1)==","){  
        value=value.substr(0,value.length-1)  
    }  
        strs = value.split(","); //字符分割   
  var rvalue ="";            
    for (i=0;i<strs.length ;i++ ){   
        rvalue += "<img onclick=download(\""+strs[i]+"\") style='width:66px; height:60px;margin-left:3px;' src='<%=path%>" + strs[i] + "' title='点击查看图片'/>";  
        }   
    return  rvalue;        
     }  
    }  

