var topoName;
var eagleEyeEnable=false;
var canvas = document.getElementById("topoPan");
var isFirstLink, topoid, scene, stage, topo, currentNode,currentLink,
nodeMap,linkMap, nodeDataMap, linkDataMap,
isFirst = !0, isFirstLink = !0,
nodeMap = new Map(), linkMap = new Map(), nodeDataMap = new Map(), linkDataMap = new Map();
var containers=new Array();
var hiddenLinkArray = new Array();
var hiddenNodeArray = new Array();
var hideLinkByNodeMap= new Map();
var INIT_TOPO="物理拓扑根图";
var zoomLevel = 1;
var TOPORADIO = 9/10;
var TRANSLATEXY=50;
var CIRCLE_BASIC=40;
var font="12px Microsoft Yahei";// 节点字体
var topoAttr=new TopoAttr();//当前拓扑图的杂项设置

var type="tree";
var currentTarget=null;
var pageScreen = {};

pageScreen.width=document.getElementById("topoDiv").offsetHeight-30;
pageScreen.height=document.getElementById("topoDiv").offsetWidth-5;

setSize(), initTopo(); 
/**
 * 初始化变量
 */
//主要应用在新建拓扑图  拓扑图的初始化需要以后再度改进，目前切换拓扑图和新建拓扑图重复代码比较多，结构不清晰
function initTopoParams(topo){
	if(!topo||!topo.topoAttr){
		topoAttr=new TopoAttr();
		zoomLevel=1;
		eagleEyeEnable=false;
	}
	$("#pageControllerAddId").attr("title",(zoomLevel*100).toFixed(0)+"% +10%");
	$("#pageControllerDecId").attr("title",(zoomLevel*100).toFixed(0)+"% -10%");
	$("#fontSize").numberspinner("setValue",topoAttr.font.substring(0,2));
}
//改变拓扑图
function changeTopo(name){
	stopAnimate();
	topoName=name;
	stage.remove(scene);
 	loadTopo(name,name);
}


// 初始化舞台及加载topo图
function initTopo() {
	stage = new JTopo.Stage(canvas);
	stage.eagleEye.visible = false;
 	loadTopo(1);
}

/**
 * 加载拓扑图扑图
 */
function loadTopo(a,name) {
	scene = new JTopo.Scene(stage), 
	clearAll(), 
	stageListen();
	topoid = a, 
	getTopoById(a,name);
};
/**
 * 后台获取拓扑对象
 */
function getTopoById(a,name) {
	if (null == a) 
		return null;
	if(!name&&name!=undefined){
		topoName=name;
	}
	if(!topoName){
		topoName=INIT_TOPO;
	}
	var url="getPhysicalTopoByName";
	$.ajax({
		type:"post",
		url:url,
		data:{
			"topoName":topoName
		},
		success:function(data){
			topo=data;
			loadScene(topo);
		} 
	});
	return  topo;
}
//拓扑图用户配置属性对象
function TopoAttr(){
	this.deviceLabelColor="0,0,0",
	this.deviceLabel="name",
	this.linkLabelColor="0,0,0",
	this.linkLabel="none",
	this.linkConnType ="FoldLink",
	this.font ="12px Microsoft Yahei";
}
/**
 * 初始化jscene
 */
function loadScene(topo){
	//变量修改
 	if(!topo.topoAttr){
		topoAttr=new TopoAttr();
	}else{
		topoAttr =topo.topoAttr;
	}
	setStyle(topo), 
	addNodes(topo), 
	addArcs(topo);
	loadEndHidden(topo);
 	createScene(scene);
 	
 	if(topo.zoomLevel>0){
 		zoomLevel = topo.zoomLevel;
 	}
	$("#pageControllerAddId").attr("title",(zoomLevel*100).toFixed(0)+"% +10%");
	$("#pageControllerDecId").attr("title",(zoomLevel*100).toFixed(0)+"% -10%");
	$("#fontSize").numberspinner("setValue",topoAttr.font.substring(0,2));
	
	//改变拓扑图
	setDeviceLabel(topoAttr.deviceLabel);
	setLinkLabel(topoAttr.linkLabel);
	setDeviceLabelColor(topoAttr.deviceLabelColor);
	setLinkLabelColor(topoAttr.linkLabelColor);
	setFontSizeByValue(topoAttr.font.substring(0,2));
}

/**
 * 初始化的时候清空数据
 * 主要是链路和图元的数据
 */
function clearAll() {
	var a, b;
	hiddenLinkArray = new Array();
	hiddenNodeArray = new Array();
	hideLinkByNodeMap= new Map();
	nodeMap = new Map(), 
	linkMap = new Map(), 
	nodeDataMap = new Map(), 
	linkDataMap = new Map();
	for ( a = scene.getDisplayedElements(), b = 0; b < a.length; b++) 
		scene.remove(a[b]);
	scene.childs=[];
	stage.setCenter($("#topoDiv").width()/2, $("#topoDiv").height()/2);
}


var eagleEye;
function registeNodeListener(node){
	eagleEye={
			width:stage.eagleEye.getData().width+50,
			height:stage.eagleEye.getData().height
	};
	node.mouseover(function(a) {
		showNodeTip(a);
	}), 
	node.mouseout(function() {
		stageListen();// 注册
	}),
	node.mouseup(function(a) {
		$("#arcTip").hide();
	}),
	node.mousedown(function(a) {
		$("#arcTip").hide();
		currentNode = a;
		if(a.button==2){
			var width=a.pageX+10;
			var height= a.pageY+10;
			if(a.pageY>$("#topoDiv").height()-$("#nodemenu").height()-60){
				height=$("#topoDiv").height()-$("#nodemenu").height()-60;
			} 
			$("#nodemenu").css({
				top:height,
				left:width 
			}).show();
			$("#contextmenu").hide();
			$("#linkmenu").hide();
			stage.removeEventListener("mousedown");
		}
		 
	}), 
	node.dbclick(function(a) {
		currentNode = a;
		// 改变图元状态
		changeShowChilds(currentNode.target);
	});
	node.mousedrag(function(a){
		if(a.clientX>$("#topoDiv").width()-eagleEye.width
				&& a.clientY>$("#topoDiv").height()-eagleEye.height
		){
			stage.eagleEye.visible=false;
		}else {
			stage.eagleEye.visible=eagleEyeEnable;
		}
	});
	 
}


// 注册监听
function stageListen() {
	$("#arcTip").hide();
	stage.removeAllEventListener();
	stage.wheelZoom = 0.85;
	stage.addEventListener("mousedown", function(a) {
		if(a.button==2){
			var width=a.pageX+10;
			var height= a.pageY+10;
			if(a.pageY>$("#topoDiv").height()-$("#nodemenu").height()){
				height=$("#topoDiv").height()-$("#nodemenu").height()+30;
			} 
			$("#contextmenu").css({
				top:height,
				left:width
			}).show();
			$("#nodemenu").hide(); 
			$("#linkmenu").hide();
		}
	}), 
	
	stage.click(function(a) {
		0 == a.button && ($("#contextmenu").hide(), $("#nodemenu").hide(), 
				$("#linkmenu").hide());
	});
	scene.removeAllEventListener();
	scene.addEventListener("mousedown",function(e){
		if(e.button==0 && e.target && e.target.elementType=="node"){
 			removeChildsRespond(e.target);
            saveChildsXY(e.target);
            recoverChildsRespond(e.target);
 		}
	});
    scene.addEventListener('mouseup',function(e){
    	if(e.button==0 && e.target ){
    		recoverChildsXY(e.target);
 		}
    });
}


/** 添加链路 */
function addLinkTopo() {
	$("#contextmenu").hide();
	var selectedNodes= scene.selectedElements;
	var len = selectedNodes.length;
	if(len<2){
		$.messager.show({
			title:'提示',
			msg:'请至少选择两个节点',
			timeout:1000,
			showType:'slide'
		});
		return;
	}
	if(selectedNodes[0].data.nodeType=="2100" && selectedNodes[1].data.nodeType=="2100"){
		$.messager.show({
			title:'提示',
			msg:'两台服务器之间不允许添加链路',
			timeout:1000,
			showType:'slide'
		});
		return;
	}
	addLink(selectedNodes[0],selectedNodes[1]);
}
/**
 * 初始化变量
 */
function initConstant(){
	currentTarget=null;
	CIRCLE_BASIC=40;
	getFaultList();
}
window.setInterval(getFaultList,30*1000);
stage.addEventListener("click",function(e){
	currentTarget=null;
});
// 切换流程图
$("#state").combobox({
	valueField : 'id',
	textField : 'text',
	editable:false,
	value:INIT_TOPO,
	url : "getTopoNameList",
	onChange : function(n, o) {
		/*topoName=n;
		stage.remove(scene);
	 	loadTopo(1);*/
	 	changeTopo(n);
	},
	onShowPanel:function(){
		$("#state").combobox("reload");
	} 
});
$("#fontSize").numberspinner({
	width:50,
	required:true,
	increment:2,
	min:12,
	max:30,
	editable:true,
	value:12,
	onSpinUp:function(){
		setFontSizeByValue();
	},
	onSpinDown:function(){
		setFontSizeByValue();
	},
	onChange:function(){
		setFontSizeByValue();
	}
});
$("#addTopoDialog").dialog({
	title:'新建拓扑图',
	top:'200px',
	width:300,
	height:300,
	modal:true,
	closed:true,
	onOpen:function(){
		$("#toponame").textbox("setValue","");
	},
	buttons:[{
		text:'确认',
		handler:function(){
			newTopo();
		}
	},{
		text:"取消",
		handler:function(){
			$("#addTopoDialog").dialog("close");
		}
	}]
});
function setTopoAttr(){
	$("#contextmenu").hide();
	$("#setTopoAttrDialog").dialog("open");
	if(topoAttr){
		$("#deviceLabelColor").combobox("setValue",topoAttr.deviceLabelColor);
		$("#deviceLabel").combobox("setValue",topoAttr.deviceLabel);
		$("#linkLabelColor").combobox("setValue",topoAttr.linkLabelColor);
		$("#linkLabel").combobox("setValue",topoAttr.linkLabel);
		$("#linkConnType").combobox("setValue",topoAttr.linkConnType?topoAttr.linkConnType:"link");
		$("#fontSizeText").numberspinner("setValue",topoAttr.font.substring(0, 2));
	}
}
function saveTopoAttr(){
	var linkConnType=$("#linkConnType").combobox("getValue");
	if(linkConnType!=topoAttr.linkConnType){
		$.messager.confirm("更改链路连接","更改链路将保存当前设置，是否继续？",function(r){
			if(r){
				editTopoAttr();
				topoAttr.linkConnType = linkConnType;
		 		setLinkConnType(linkConnType);
			}
		});
	}else{
		editTopoAttr();
	}
}
function editTopoAttr(){
	var deviceLabel=$("#deviceLabel").combobox("getValue");
	var nodeColor=$("#deviceLabelColor").combobox("getValue");
	var linkColor =$("#linkLabelColor").combobox("getValue");
	var linkLabel =$("#linkLabel").combobox("getValue");
//	var linkConnType=$("#linkConnType").combobox("getValue");
	var fontSize = $("#fontSizeText").numberspinner("getValue");
	
	if(topoAttr.font &&fontSize!=topoAttr.font.substring(0, 2)){
		$("#fontSize").numberspinner("setValue",fontSize);
		topoAttr.font=font;
	}
	if(deviceLabel!=topoAttr.deviceLabel){
		setDeviceLabel(deviceLabel);
		topoAttr.deviceLabel=deviceLabel;
	}
	if(nodeColor!=topoAttr.deviceLabelColor){
		setDeviceLabelColor(nodeColor);
		topoAttr.deviceLabelColor=nodeColor;
	}
	if(linkColor!=topoAttr.linkLabelColor){
		setLinkLabelColor(linkColor);
		topoAttr.linkLabelColor=linkColor;
	}
	if(linkLabel!=topoAttr.linkLabel){
		setLinkLabel(linkLabel);
		topoAttr.linkLabel=linkLabel;
	}
	
	$("#setTopoAttrDialog").dialog("close");
}
function cancelTopoAttr(){
	$("#setTopoAttrDialog").dialog("close");
}

// 添加连线
function addLink(nodeA, nodeZ,data){
    var link =null;
    if(topoAttr && topoAttr.linkConnType=="FoldLink"){
    	link= new JTopo.FoldLink(nodeA, nodeZ);
    }else{
    	link= new JTopo.Link(nodeA, nodeZ);
    }
    link.dashedPattern=4;
    link.lineJoin  = 'round';  
    link.strokeColor = '33,121,237';
    link.lineWidth = 1/2;
    link.arrowsOffset=-25;
    link.arrowsRadius=10;
    link.fontColor = "0,0,0";
    link.data=data;
    if(!data){
    	link.data= {};
    	link.data.arcType=0;
        link.data.downId=nodeZ.data.unitId;
        link.data.downNetPortId= "12";
        link.data.downNodeId=nodeZ.data.id;
        link.data.id=uuid();
        link.data.linkId=uuid();
        link.data.name=nodeA.data.unitId+"/"+nodeZ.data.unitId;
        link.data.topoId="2";
        link.data.upId=nodeA.data.unitId;
        link.data.upNetPortId="14";
        link.data.upNodeId=nodeA.data.id;
        link.data.type="1";
    }
    var text =  "名称:"+link.data.name+"\n"+
    			"上行设备:"+link.data.upId+"\n"+
    		 	"上行接口:"+link.data.upNetPortId+"\n"+
    		 	"下行设备:"+link.data.downId+"\n"+
    		 	"下行接口:"+link.data.downNetPortId+"\n";
    link.data.text=text;
    link.mouseout(function() {
		stageListen();
	});
    link.mouseover(function(a){
    	showArcTip(a);
    });
    link.mousedown(function(a) {
    	stage.removeEventListener("mousedown");
    	currentNode = a;
    	currentTarget=a.target;
		2 == a.button && ($("#linkmenu").css({
			top:a.pageY + 10,
			left:a.pageX + 20
		}).show(), $("#contextmenu").hide(),$("#nodemenu").hide());
	});
    scene.add(link);
    linkMap.put(link.data.id, link);
     if($.inArray(link.nodeA.data.id, link.nodeZ.data.parentIds)<0){
		 link.nodeZ.data.parentIds.push(link.nodeA.data.id);
	 }
	 if($.inArray(link.nodeZ.data.id, link.nodeA.data.childIds)<0){
		 link.nodeA.data.childIds.push(link.nodeA.data.id);
	 }
    
    nodeA.data.hasChild=true;
    return link;
} 
// 复制链路
function copyLink(oldLink){
	var link =null;
	    if(topoAttr.linkConnType=="FoldLink"){
	    	link= new JTopo.FoldLink(oldLink.nodeA, oldLink.nodeZ);
	    }else{
	    	link= new JTopo.Link(oldLink.nodeA, oldLink.nodeZ);
	    }
	link.strokeColor = oldLink.strokeColor;
    link.lineWidth = oldLink.lineWidth;
    link.arrowsOffset=oldLink.arrowsOffset;
    link.arrowsRadius=oldLink.arrowsRadius;
    link.data=oldLink.data;
    link.mouseout(function() {
		stageListen();
	});
    link.mousedown(function(a) {
    	stage.removeEventListener("mousedown");
    	currentNode = a;
    	currentTarget=a.target;
		2 == a.button && ($("#linkmenu").css({
			top:a.pageY + 10,
			left:a.pageX + 20
		}).show(), $("#contextmenu").hide(),$("#nodemenu").hide());
	});
    return link;
}
// 布局的准备工作
function createScene(data){
	initConstant();
	if(topo && topo.enableLayout!=true){
		changeLayout("circle");
	}
	
}
// 恢复位置
function recoverChildsXY(parent){
	if(scene && parent.childsXY){
		for(var i=0;i<nodeMap.size();i++){
			var node = nodeMap.element(i).value;
			for(var j=0;j<parent.childsXY.length;j++){
				var xy=parent.childsXY[j];
				if(xy.id==node.data.id){
					node.x=parent.x+xy.x;
					node.y=parent.y+xy.y;
				}
			}
		}
		delete parent.childsXY;
	}
}
// 保存位置  这里不用用linkMap 在拖动时，是临时从scene删除，而linkMap没有改动
function saveChildsXY(parent){
	parent.childsXY=[];
	for(var i=0;i<scene.childs.length;i++){
		var link = scene.childs[i];
		if(link.elementType=="link"){
			if(link.nodeA==parent){
				 var child=link.nodeZ;
				 var temp=new Object();
				 temp.id=child.data.id;
				 temp.x=child.x-parent.x;
				 temp.y=child.y-parent.y;
				 parent.childsXY.push(temp);
			}
		}
	}
}

// 恢复响应
function recoverChildsRespond(parent){
	if(parent.removeLinks){
		for(var i=0;i<parent.removeLinks.length;i++){
			var removelink = parent.removeLinks[i];
	 		scene.add(copyLink(removelink));
		}
	}
}
//删除链路防止响应
function removeChildsRespond(parent){
	parent.removeLinks=new Array();
	for(var i=0;i<scene.childs.length;i++){
		var child= scene.childs[i];
		if(child.elementType=="link"){
			if(child.nodeA==parent){
				if(child.nodeZ.data.childIds.length>0){
					parent.removeLinks.push(child);
				}
			}
		}
	}
	for(i=0;i<parent.removeLinks.length;i++){
		scene.remove(parent.removeLinks[i]);
	}
}

// 设置连线长度 根据子节点是否有父节点id
function setLinkLength(id){
	for(var i=0;i<scene.childs.length;i++){
		var child=scene.childs[i];
		if(child.elementType=="node"  && child.data.childIds.length>0){
			if(!id || includeId(child.data,id)){
				var parent= getNodeById(child.data.parentIds[0]);
				if(parent && parent.layout && parent.layout.radius &&child.layout&& child.layout.radius){
					var link = getLinkByNode(parent,child);
					if(!link){
					 	continue;
					}
					var add=150;
					var distence=getDistence(parent,child);
					var length0 = parent.layout.radius+child.layout.radius;
					var length1 = length0+add;
					var cosQ= (child.x- parent.x)/distence;
					var sinQ= (child.y- parent.y)/distence;
					var x = length1*cosQ+parent.x;
					var y = length1*sinQ+parent.y;
					child.x = x;
					child.y = y;
				  	JTopo.layout.layoutNode(scene, child, false); 
				}
			}
		}
	}
}

// 子节点是否包含点击的父节点id
function includeId(data,id){
	return data.parentIds.contains(id);
}

//设置所有节点的parentId
function setParentsId(){
	for(var i=0;i<scene.childs.length;i++){
		 var link=scene.childs[i];
		 if(link.elementType=="link"){
			 if($.inArray(link.nodeA.data.id, link.nodeZ.data.parentIds)<0){
				 link.nodeZ.data.parentIds.push(link.nodeA.data.id);
			 }
		 }
	}
}
// 隐藏或显示子节点
function changeShowChilds(parent){
	var showState = !parent.data.showChilds;
	setParentAndChildAttr();
	if(!hasChild(parent)){
		return false;
	}
	var childsFaultLevel=0;
	var count=0;
	for(var i=0;i<scene.childs.length;i++){
		 var link=scene.childs[i];
		 if(link.elementType=="link" && link.nodeA==parent){
			 var node= link.nodeZ;
			 if(!hasChild(node)){
		 		 link.visible=showState;
		 		 //判断是否隐藏
		 		 if(node.data.parentIds.length>1){
		 			 var hiddenCount = 0;
		 			 for(var j=0;j<node.data.parentIds.length;j++){
		 				 var pp = getNodeById(node.data.parentIds[j]);
		 				 if(pp&&!(pp.visible)){
		 					 hiddenCount++;
		 				 }
		 			 }
		 			 if(hiddenCount<node.data.parentIds.length-1){
		 				 //父节点起码还有2个是显示状态，则不隐藏节点
		 	 	 		 continue;
		 			 }
		 		 }
		 		 node.visible=showState;
		 		 count++;
		 		 if(node.fault && node.fault.level>childsFaultLevel){
		 			childsFaultLevel=node.fault.level;
		 		 }
			 }
		 }
	}
	
	var level =0;
	if(parent.fault){
		level= parent.fault.level;
	}
	if(parent.data.showChilds){
		parent.data.showChilds=false;
		var url = getImgPathByUnitType(parent.data.nodeType,level,0);
		parent.setImage(url);
		
		parent.alarm=count+"";
		parent.alarmColor=setAlarmStyle(null,{level:childsFaultLevel});
	}else{
		parent.data.showChilds=true;
		url = getImgPathByUnitType(parent.data.nodeType,level);
		parent.setImage(getImgPathByUnitType(parent.data.nodeType,level));
		
		parent.alarm=undefined;
	}
	
}
// 节点分级，需要依赖节点已有parentId
function setNodeLevel(){
	for(var i=0;i<nodeMap.size();i++){
		 var node = nodeMap.element(i).value;
		 if(node.elementType=="node" && node.data.parentIds.length==0){
			 node.data.nodeLevel = 1;
			 recurNodeLevel(node);
		 } 
	}
}
 

// 使用递归设置节点级别，需要依赖节点parentId、hasChild已设置
function recurNodeLevel(parent){
	for(var i=0;i<nodeMap.size();i++){
		 var node =  nodeMap.element(i).value;
		 if(node.elementType=="node" && node.data.parentIds.contains(parent.data.id)){
			 node.data.nodeLevel = parent.data.nodeLevel+1;
			 if(!node.data.hasChild) continue;
			 recurNodeLevel(node);
		 }
	}
}
// 改变布局
function changeLayout(layout){
	if(layout && layout=="circle"){
		type="tree";
	}
	if(type!="circle"){
		type="circle";
		
		for(var j = 0;j<scene.childs.length;j++){
			var node = scene.childs[j];
			if(node.elementType=="node" && node.data.nodeLevel==1){
				var d=CIRCLE_BASIC;
				for(var i=0;i<scene.childs.length;i++){
					var child=scene.childs[i];
					if(child.elementType=="node" ){
						var r;
						var count=getChildsCount(child);
						// 第四套方案
						// 如果子节点个数过小，则无法正常显示，所以当子节点小于10个就指定一个数值，大于10个就采用第三套公式
						if(count<15){
							r=100; 
						}else if(count>=15 && count<40){
							r = d*(Math.sin(Math.PI/2- Math.PI/count)/Math.sin(2*Math.PI/count));
						}else{
							r = d*(Math.sin(Math.PI/2- Math.PI/40)/Math.sin(2*Math.PI/40));
						}
						child.layout={type:'circle',radius:r};
						JTopo.layout.layoutNode(scene,child,true);
					}
				}
			 	JTopo.layout.layoutNode(scene,node,true);
				setLinkLength();
			}
		}
		
	}else {
		type="tree";
		
		for(j = 0;j<scene.childs.length;j++){
			var node = scene.childs[j];
			if(node.elementType=="node" && node.data.nodeLevel==1){
				node.layout={type:'tree',width:30,height:150};
				node.setLocation(pageScreen.width/2,pageScreen.height/5);
		 		JTopo.layout.layoutNode(scene,node,true);
				for(i=0;i<scene.childs.length;i++){
					var child=scene.childs[i];
					if(child.elementType=="node"){
						child.layout={type:'tree',width:30,height:150};
					}
				} 
		 		scene.doLayout(JTopo.layout.TreeLayout('down', 30, 150));
			}
		}
 		
	}
	$("#contextmenu").hide();// 点击功能后，需要将其菜单隐藏
}
// 交换链路方向
function swapLinkTopo(currentTarget){
	
	var tempA=currentTarget.nodeA;
	var tempZ=currentTarget.nodeZ;
	removeLinkDao(currentTarget.data.id);
	addLink(tempZ,tempA);
}
//链路策略
function linkStrategy(currentTarget){
	
}
//隐藏链路
function hideLink(currentTarget){
	currentTarget.visible = false;
	var obj ={
		id:currentTarget.data.id,
		name:currentTarget.data.name,
		upId:currentTarget.data.upId,
		downId:currentTarget.data.downId
	};
	hiddenLinkArray.push(obj);
}
var showHiddenTargetDialog=null;
function showHiddenTarget(){
	if(!showHiddenTargetDialog){
		showHiddenTargetDialog=$("#showHiddenTargetDialog").dialog({
			title:"显示隐藏项"
		});
	}
	$("#contextmenu").hide();
	if($("#hiddenNodeJsp")[0].contentWindow.loadData){
		$("#hiddenNodeJsp")[0].contentWindow.loadData();
		$("#hiddenLinkJsp")[0].contentWindow.loadData();
	}
	setTimeout(function(){
		showHiddenTargetDialog.dialog("open");
	},10);
}
function showControl(){
	if($("#pageController").css("display")=="none"){
		$("#pageController").show();
		$("#showControlId").html("隐藏控制项");
	}else{
		$("#pageController").hide();
		$("#showControlId").html("显示控制项");
	}
	$("#contextmenu").hide();
}


function saveHiddenTarget(){
	var ids = $("#hiddenNodeJsp")[0].contentWindow.getCheckedBox();
	
	if(ids&&ids!=""){
		ids=ids.split(",");
		for(var i=0;i<ids.length;i++){
			var id =ids[i];
			var node = nodeMap.valuesByKey(id)[0];
			node.visible=true;
			hiddenNodeArray.splice(i, 1);
			for(var j=0;j<hideLinkByNodeMap.size();j++){
				var link = hideLinkByNodeMap.element(i).value;
				if(link.nodeA.data.id==id|| link.nodeZ.data.id){
					link.visible = true;
					hideLinkByNodeMap.removeByKey(link.data.id);
				}
			}
		}
	}
	var linkIds = $("#hiddenLinkJsp")[0].contentWindow.getCheckedBox();
	if(linkIds&&linkIds!=""){
		linkIds=linkIds.split(",");
		for(var i=0;i<linkIds.length;i++){
			var id =linkIds[i];
			var node = linkMap.valuesByKey(id)[0];
			node.visible=true;
			hiddenLinkArray.splice(i, 1);
		}
	}
	showHiddenTargetDialog.dialog("close");
}
function cancelHiddenTarget(){
	$("#hiddenNodeJsp")[0].contentWindow.cancelChecked();
	$("#hiddenLinkJsp")[0].contentWindow.cancelChecked();
	showHiddenTargetDialog.dialog("close");
}
// 保存拓扑图
function saveTopo(){
	// 存放节点集合
	var nodeList = new Array();
	// 标记节点集合最新下标
	var nodeIndex = 0;
	// 连线集合
	var linkList = new Array();
	// 标记连线集合最新下标
	var linkIndex = 0;
	if(null != scene.childs && scene.childs.length > 0){
		for(var i=0;i<scene.childs.length;i++){
			var child = scene.childs[i];
			if(child.elementType && child.elementType=="node"){
				var node= child.data;
				node.nodeId=child._id;
				node.elementType=child.elementType;
				node.x=child.x;
				node.y=child.y;
				if(!child.layout){
					child.layout={type:'tree',width:20,height:150};
				}
				
				node.layout=  JSON.stringify(child.layout);
				nodeList[nodeIndex] = node;
				nodeIndex++;
			}else if(child.elementType && child.elementType=="link"){
				var link =child.data;
				linkList[linkIndex] = link;
				linkIndex++;
			}
		}
	}
	var nlist=JSON.stringify(nodeList);
	var llist=JSON.stringify(linkList);
	$.ajax({
		url:"savePhsicalTopo",
		type:"post",
		data:{
			"sceneId":topo.id,
			"sceneName":topo.name,
			"topoType" : topo.topoType,
			"zoomLevel" : topo.zoomLevel,
			"nodeList" : nlist,
			"linkList" : llist
		},
		success:function(data){
		}
	});
}

// 编辑子节点布局
function changeNodeLayout(layout,node){
	var target=null;
	if(currentNode){
		target = currentNode.target;
	}
	if(node){
		target =node;
	}
	var count=getChildsCount(target);
	if(layout=="circle"){
		var d=CIRCLE_BASIC+20;
		var r;
		if(count<15){
			r=100; 
		}else{
			if(count>=15&& count<50){
				d+=5;
			}
			d=d*Math.pow(2/3,Math.floor(count/100));
			r = d*(Math.sin(Math.PI/2- Math.PI/count)/Math.sin(2*Math.PI/count));
		}
		target.layout={type:'circle',radius:r};
	}else{
		var height;
		var width=35;
		height=150;
		target.layout={type: 'tree', direction: layout, width: width, height: height};
	}
 	removeChildsRespond(target);
	JTopo.layout.layoutNode(scene,target,true);
 	setLinkLength(target.data.id);
 	recoverChildsRespond(target);
}
function gotoDetailPage(current){
	var tab=$("#topoTab");
	var node = current.target;
	var ip= node.data.id;
	var title=node.data.name;
	$("#nodemenu").hide();
	$("#arcTip").hide();
	if(tab.tabs("exists",title)){
		tab.tabs("select",title);
		return;
	}
	var path= getPath();
	var page='deviceDetail';
	
	var nodeType= node.data.nodeType;
	if(nodeType=="2100"){
		page='serverDetail';
	}
	var url=path+'/unit/'+page+'.jsp?id='+ip;
	tab.tabs("add",{
		title:title,
		content:"<iframe src="+url+" style='width:99%;height:98%;'></iframe>",
		closable:true
	});
	
}
// 编辑父子节点的距离
function editDistance(op){
	var radio=10/11;
	var layout = currentNode.target.layout;
	if(layout.type=="circle"){
		if(op=="add"){
			layout.radius*=1/radio;
		}else if(op=="decrease"){
			layout.radius*=radio;
		}
	}else if(layout.type=="tree"){
		if(op=="add"){
			layout.width*=1/radio;
			layout.height*=1/radio;
		}else if(op=="decrease"){
			layout.width*=radio;
			layout.height*=radio;
		}
	}
	removeChildsRespond(currentNode.target);
 	JTopo.layout.layoutNode(scene,currentNode.target,true);
 	setLinkLength(currentNode.target.data.id);
 	recoverChildsRespond(currentNode.target);
}

function addContainer(){
	$("#addContainer").dialog('open');
	 
}
function saveContainer(){
	var name=$("#groupName").textbox("getValue");
	var group= new JTopo.Container(name);
	group.fontColor = '255,255,255';
	group.font = '14pt 微软雅黑';
	group.borderColor = '255,0,0';
	group.borderRadius = 30; // 圆角
	group.setBound(10,10,300,200);
    scene.add(group);
    containers.push(group);
    $("#addContainer").dialog('close');
}
function closeContainer(){
	  $("#addContainer").dialog('close');
}

// 改变jtopo模式
function changeMode(mode){
	$("#contextmenu").hide();
	scene.mode=mode;
}


// 增加节点
$("#addNodesTopo").click(function(e){
	$("#contextmenu").hide();
	var point = new Object();
	point.x=e.pageX;
	point.y=e.pageY;
	$("#addNodeDialog").data("point",point);
	openAddNodesDialog();
});
function openAddNodesDialog(){
	$("#addNodeDialog").dialog("open");
	$("#unit").datagrid("load");
}

// 删除链路
function deleteLink(currentTarget){ 
	$.messager.confirm('操作提示','是否删除此链路？',function(r){
		if(r){
			removeLinkDao(currentTarget.data.id);
			saveToJson();
		}
	});
	$("#linkmenu").hide();
}
//删除节点页面接口
function deleteNode(currentNode){
	$.messager.confirm('操作提示','是否删除此图元？',function(r){
		if(r){
			//不要改动顺序
			removeNodeDao(currentNode.target.data.id);
			saveToJson();
		}
	});
	$("#nodemenu").hide();
}
//隐藏设备
function hideNode(currentTarget){
	var target = currentNode.target;
	target.visible = false;
	var obj={
		id : target.data.id,
		nodeType : target.data.nodeType,
		nodeTypeStr : target.data.nodeTypeStr,
		name : target.data.name,
		imgType : target.data.imgType
	};
	hiddenNodeArray.push(obj);
	//这里还是用scene比较好，删除不会影响遍历中的元素
	var nodeId = target.data.id;
	for(var i=0;i<linkMap.size();i++){
		var link=linkMap.element(i).value;
		if(link.nodeA.data.id==nodeId ||link.nodeZ.data.id==nodeId){
			 link.visible = false;
			 link.nodeA.data.childIds.removeByValue(link.nodeZ.data.id);
			 link.nodeZ.data.parentIds.removeByValue(link.nodeA.data.id);
			 hideLinkByNodeMap.put(link.data.id,link);
		}
	}
}
//下面三个方法都是在真正删除相应元素时被调用
//删除链路逻辑接口  所有删除节点最后都应调用这个接口
function removeLinkDao(linkId){
	var link = linkMap.valuesByKey(linkId)[0];
	link.nodeA.data.childIds.removeByValue(link.nodeZ.data.id);
	link.nodeZ.data.parentIds.removeByValue(link.nodeA.data.id);
	scene.remove(link);
	linkMap.removeByKey(linkId);//从集合中删除
}
//删除节点逻辑接口  所有删除最后都应调用这个接口
function removeNodeDao(nodeId){
	deleteLinkByNodeId(nodeId);
	scene.remove(nodeMap.get(nodeId));
	nodeMap.removeByKey(nodeId);
	getFaultList();
}
//删除链路  
function deleteLinkByNodeId(nodeId){
	//这里还是用scene比较好，删除不会影响遍历中的元素
	for(var i=0;i<scene.childs.length;i++){
		var link=scene.childs[i];
		if(link.elementType=="link" && (link.nodeA.data.id==nodeId ||link.nodeZ.data.id==nodeId)){
			 scene.remove(link);
			 link.nodeA.data.childIds.removeByValue(link.nodeZ.data.id);
			 link.nodeZ.data.parentIds.removeByValue(link.nodeA.data.id);
			 linkMap.removeByKey(link.data.id);//从集合中删除
		}
	}
}


// 设置鹰眼
function setEagleEye(){
	stage.eagleEye.visible = !stage.eagleEye.visible;
	eagleEyeEnable=!eagleEyeEnable;
}

function deleteTopo(){
	if(topoName ==INIT_TOPO){
		easyuiShow({msg:"默认拓扑图不允许删除！"});
		return;
	}
	$.messager.confirm("操作提示","是否删除此拓扑图？",function(r){
		if(r) {
			$.ajax({
				url:'deleteTopoByName',
				type:'post',
				data:{
					topoName:topoName
				},
				success:function(data){
					stopAnimate();
					easyuiShow({msg:data});
				 	$("#state").combobox("setValue",INIT_TOPO);
				}
			});
		}
		return;
	});
}
//验证：只 能用 中文、英文、数字、下划线
function testName(val){
	var reg=/^[a-zA-Z0-9_\u4E00-\u9FA5]+$/;//new RegExp("^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$"); 
	return reg.test(val);
}
// 新建拓扑图
function newTopo(){
	var r=$("#toponame").textbox("getValue");
	var result=testName(r);
	if(!result){
		$.messager.confirm("提示信息","您输入的名称不合法,请重新命名!",function(flag){
		});
		
		return false;
	}
	var toponames;
	$.ajax({
		url:'getTopoNameList',
		type:'post',
		success:function(data){
			toponames=data;
			if(toponames!=undefined&&toponames.length>0){
				var repetition=false;
				$.each(toponames,function(key,obj){
					if(obj.text==r){
						repetition=true;
					}
				});
				if(repetition==true){
					$.messager.alert("提示信息","您输入的名称重复,请重新生成!",function(){
					//	$("#toponame").textbox("setValue","");
					});
					return false;
				}
			} 
			topoAttr = new TopoAttr();
			topoName=r;
			stopAnimate();
			stage.remove(scene);
			scene = new JTopo.Scene(stage), 
			clearAll(),
			stageListen();
			setStyle();
			initTopoParams();
			saveToJson(topoName);
			$("#addTopoDialog").dialog("close");
			return true;
		}
	});
}
// 保存拓扑图到json
function saveToJson(changeTopoName){
	var width=$("#topoDiv").width();
	var height=$("#topoDiv").height();
	var saveScene= new Object();
	// 存放节点集合
	var nodeList = new Array();
	// 标记节点集合最新下标
	var nodeIndex = 0;
	// 连线集合
	var linkList = new Array();
	// 标记连线集合最新下标
	var linkIndex = 0;
	if(null != scene.childs && scene.childs.length > 0){
		for(var i=0;i<scene.childs.length;i++){
			var child = scene.childs[i];
			if(child.elementType && child.elementType=="node"){
				var node= child.data;
				node.nodeId=child.data.id;
				node.elementType=child.elementType;
				node.x=child.x/width;
				node.y=child.y/height;
				if(!child.layout){
					child.layout={type:'tree',width:20,height:150};
				}
				node.layout=  JSON.stringify(child.layout);
				if(node.childscount!=undefined){
					delete node.childscount;
				}
				nodeList[nodeIndex] = node;
				nodeIndex++;
			}else if(child.elementType && child.elementType=="link"){
				var link =child.data;
				linkList[linkIndex] = link;
				linkIndex++;
			}
		}
	}
	if(!topo){
		topo={
		};
	}
	if(!topo.id){
		topo.id=uuid();
	}
	saveScene.id=topo.id;
	saveScene.name=topoName;
	saveScene.topoType=topo.topoType;
	saveScene.zoomLevel=zoomLevel;
	saveScene.background= $(scene.background).attr("src"); 
	saveScene.arcs=linkList;
	saveScene.nodes=nodeList;
	saveScene.hiddenNodeArray = hiddenNodeArray;
	saveScene.hiddenLinkArray = hiddenLinkArray;
	saveScene.hiddenLinkByNode = hideLinkByNodeMap.keys();
	saveScene.topoAttr=topoAttr;
	saveScene.enableLayout=true;
	var json = JSON.stringify(saveScene);
	$.ajax({
		url:'savePhsicalTopoToJson',
		type:'post',
		data:{
			"json":json,
			"name":topoName
		},
		success:function(data){
			easyuiShow(data);
			if(changeTopoName){
				$("#state").combobox("setValue",changeTopoName);
			}
		}
	});
};

function changeToolbar(){
	var $toolbar = $("#toolbar");
	var state = $toolbar.attr("toolState");
	var $width=$toolbar.width();
	
	if(state=="open"){
		$toolbar.animate({
			'margin-left':$width+100
		},300,function(){
			$toolbar.attr("toolState","closed");
		});
	}else{
		$toolbar.animate({
			'margin-left':0
		},300,function(){
			$toolbar.attr("toolState","open");
		});
		$("#arcTip").hide();
	}
	
}

/**
 * 控制器功能
 */
function pageControllerTop(){
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.y-=TRANSLATEXY;
	}
}
function pageControllerRight(){
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.x+=TRANSLATEXY;
	}
}
function pageControllerBottom(){
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.y+=TRANSLATEXY;
	}
}
function pageControllerLeft(){
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.x-=TRANSLATEXY;
	}
}
function pageControllerAdd(){
	zoomLevel /=TOPORADIO;
	$("#pageControllerAddId").attr("title",(zoomLevel*100).toFixed(0)+"% +10%");
	$("#pageControllerDecId").attr("title",(zoomLevel*100).toFixed(0)+"% -10%");
	var bound = stage.getBound();
	var center = {
			x:(bound.right+bound.left)/2,
			y:(bound.bottom+bound.top)/2
	};
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.x=(node.x-center.x)/TOPORADIO+center.x;
		node.y=(node.y-center.y)/TOPORADIO+center.y;
	}
}
function pageControllerDec(){
	zoomLevel *=TOPORADIO;
	$("#pageControllerAddId").attr("title",(zoomLevel*100).toFixed(0)+"% +10%");
	$("#pageControllerDecId").attr("title",(zoomLevel*100).toFixed(0)+"% -10%");
	var bound = stage.getBound();
	var center = {
			x:(bound.right+bound.left)/2,
			y:(bound.bottom+bound.top)/2
	};
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.x=(node.x-center.x)*TOPORADIO+center.x;
		node.y=(node.y-center.y)*TOPORADIO+center.y;
	}
}
/**
 * 取值部分
 */
//获取所有图元id
function getAllNodeId(){
	var ids = "";
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		if(node.elementType=="node"){
			ids +=node.data.id+",";
		}
	}
	return ids; 
}
//获取图片路径
function getImgPathByUnitType(unitType,level,collapse){
	if(!unitType){
		unitType=1001;
	}
	if(!level){
		level=0;
	}
	if(collapse==0)
	{
		level+="0";
	}
	
	var imgPath = PATH+"/img/topo/unit/"+unitType+"_"+level+".png";
	return imgPath;
}
//获取连线
function getLinkByNode(nodeA,nodeZ){
	for(var i=0;i<linkMap.size();i++){
		var child=linkMap.element(i).value;
		if(child.nodeA==nodeA && child.nodeZ==nodeZ){
			return child;
		}
	}
}
// 获取父节点
function getNodeById(id){
	for(var i=0;i<nodeMap.size();i++){
		var child=nodeMap.element(i).value;
		if(child.data.id==id){
			return child;
		}
	}		
}
/*
 * 获取子节点个数 param 1： 节点对象 param 2: 自动补全属性设置
 */
function getChildsCount(parent,autoCreateParam){
	var childsCount=0;
	childsCount == parent.data.childIds.length;
	parent.data.childsCount=childsCount;
	autoCreateParam?(parent.data.hasChild=childsCount>0):null;
	return childsCount;
}
function hasChild(parent){
	var flag = parent.data.childIds.length>0?true:false;
	return flag;
}
function getHiddenNode(){
	return 	hiddenNodeArray;
}
function getHiddenLink(){
	return 	hiddenLinkArray;
}
/**
 * 实现功能
 */
//改变字体大小
function setFontSize(op){
	var fontSize =  parseInt(font.substring(0,2));
	var fontStyle = font.substring(2,font.length);
	if(op=="up"){
		if(fontSize>=36){// 这个值不能再加
			easyuiShow({msg:"已达到字体上限,不允许增加！"});
			return;
		}
		fontSize+=2;
	}else if(op=="down"){
		if(fontSize<=10){// 这个值不能再减
			easyuiShow({msg:"已达到字体下限,不允许减小！"});
			return;
		}
		fontSize-=2;
	}
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
	 	node.font=fontSize+fontStyle;
	}
	font=fontSize+fontStyle;
}
function setFontSizeByValue(fontSize){
	if(!fontSize){
		fontSize =$("#fontSize").numberspinner("getValue");  // parseInt(font.substring(0,2));
	}
	var fontStyle = font.substring(2,font.length);
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
	 	node.font=fontSize+fontStyle;
	}
	font=fontSize+fontStyle;
}
//设置标签
function setDeviceLabel(select){
	var label= select;
	if(!select){
		label=$("#deviceLabel").combobox("getValue");
	}
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
		if(node.elementType && node.elementType=="node"){
			 if(label=="none"){
				node.text=undefined;
				continue;
			 }else if(label=="short"){
				node.text=node.text.substring(0,3)+"...";
				continue;
			 }
			 
			 if(label in node.data){
				 node.text=node.data[label];
			 }
		}
	}
}
// 设置标签颜色
function setDeviceLabelColor(select){
	var label= select;
	if(!select){
		label=$("#deviceLabelColor").combobox("getValue");
	}
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
		if(node.elementType && node.elementType=="node"){
			node.fontColor=label;
		}
	}
}
//设置链路标签
function setLinkLabel(select){
	for(var i=0;i<linkMap.size();i++){
		var node=linkMap.element(i).value;
		if(node.elementType && node.elementType=="link"){
			if(select == "none"){
				node.text=null;
			}else if(select in node.data){
				node.text=node.data[select];
			}
		}
	}
}
// 设置链路标签颜色
function setLinkLabelColor(select){
	for(var i=0;i<linkMap.size();i++){
		var node=linkMap.element(i).value;
		if(node.elementType && node.elementType=="link"){
			 node.fontColor = select;
		}
	}
}
//更改所有链路类型
function setLinkConnType(linkConnType){
	saveToJson();
	changeTopo(topoName);
}
/**
 * 告警模块
 */
//重置所有图元的告警状态
function resetAllNode(){
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		if(node.elementType=="node"){
			node.removeAllEventListener();
			if(node.fault&& node.data.showChilds){
				node.alarm = null;
			}
			node.fault=null;
			var url=getImgPathByUnitType(node.data.nodeType);
			if(!node.data.showChilds){
				url=getImgPathByUnitType(node.data.nodeType,0,0);
			}
			node.setImage(url);
			registeNodeListener(node);
		}
	}
}
// 获取故障列表
function getFaultList(){
	if(nodeMap.size()==0){
		return;
	}
	
	$.ajax({
		url:'getFaultList',
		type:'post',
		data:{
			ids:getAllNodeId()
		},
		success:function(data){
			if(data && data.length>0){
				resetAllNode();
				stopAnimate();
				updateNodeStatus(data);
			}
		}
	});
}
//重置警告
function resetAlarm(faults){
	$.each(faults,function(i,fault){
		for(var i=0;i<nodeMap.size();i++){
			var node= nodeMap.element(i).value;
			if(node.data.id==fault.unitId){
			 	node.alarm = undefined;
			}
		}
	});
}
// 获取告警信息
function getAlarmMsg(e){
	var node=e.target;
	var fault = node.fault;
	var data = node.data;
	var text = "";
	var faultTime = fault.faultTime;
	var discription ="异常描述 :"+ fault.discription+"\n";
	
	
	var faultDate= new Date();
	faultDate.setTime(faultTime);
	faultTime = faultDate.toLocaleString();
	
	text+= discription;
	text+="异常产生时间\t\t\t\t\t:"+faultTime+"\n";
	text+="设备ip:"+data.id+"\n";
	text+="设备名称:"+data.name+"\n";
	return text; 
}
 
var timerIndex=new Array();
function stopAnimate(){
	if(timerIndex.length>0){
		$.each(timerIndex,function(i,index){
			clearInterval(index);
		});
	}
	for(var i=0;i<nodeMap.size();i++){
		var node = nodeMap.element(i).value;
		node.alpha = 1;
	}
	timerIndex=new Array();
}
// 更新节点
function updateNodeStatus(faults){
	$.each(faults,function(i,fault){
		for(var i=0;i<nodeMap.size();i++){
			var node= nodeMap.element(i).value;
			if(node.data.id==fault.unitId&& fault.level>0){
				node.removeEventListener("mouserover");
				node.removeEventListener("mouserout");
				
				node.alarmFont = "8px Consolas";
				node.fault=fault;
				
				if(node.data.showChilds){
					node.alarm = fault.levelName;
					setAlarmStyle(node,fault);
				}
				
				var url=getImgPathByUnitType(node.data.nodeType,fault.level);
				if(!node.data.showChilds){
					url = getImgPathByUnitType(node.data.nodeType,fault.level,0);
				}
				node.setImage(url);
				node.mouseover(function(e){
					var target = e.target;
					setAlarmStyle(target,fault);
					target.fillColor = "0,255,255";
					stage.removeEventListener("mousedown");
					var text =getAlarmMsg(e);
					target.data.text = text;
					showArcTip(e,fault);
				});
				node.mousedown(function(a){
					$("#arcTip").hide();
					
				});
				node.mouseout(function(e){
					if(this.data.showChilds){
						this.alarm = this.fault.levelName;
					}
					stageListen();// 注册
				});
				if(true||node.animateFlag!=true){
					node.animateStatus ="dev";
					node.alpha =Math.random();
					var index=window.setInterval(startAnimate(node),50);
					timerIndex.push(index);
				} 
				node.animateFlag=true;
			}
		}
	});
}
function startAnimate(node){
	return function(){
		setAlpha(node);
	};
}
function setAlpha(sNode){
	var increase =0.1;
	if(sNode.animateStatus.indexOf("dev") > -1){
		sNode.alpha-=increase;
		sNode.alarmAlpha -=increase;
		if(sNode.alpha<0.6){
			sNode.animateStatus="add";
		}
	}else{
		sNode.alpha+=increase;
		sNode.alarmAlpha +=increase;
		if(sNode.alpha>1){
			sNode.animateStatus="dev";
		}
	}
}
function setAlarmStyle(node,fault){
	var color =null;
	switch(fault.level){
		case 1: 
			color ='72,136,229';break;
		case 2:
			color ='247,184,45';break;
		case 3:
			color ='249,126,58';break;
		case 4:
			color ='255,0,0';break;
		default:
			color ='255,0,0';
	}
	if(node){
		node.alarmColor = color;
	}
	return color;
}
/**
 * 测试用
 */
function createDemoData(num){
	var x = 30, y = 50;
	num = parseInt(num);
	var root = new JTopo.Node("root"+num);
	root.text ="root";
	root.setLocation(300, 300);
	 root.setImage(getImgPathByUnitType("1003"));
	 root.fontColor ="42,44,46";
	    registeNodeListener(root);
	    root.data={};
	    root.data.id="root";
	    root.data.nodeLevel=0;
	    root.data.showChilds=true;
	    root.data.parentIds=[];
	    root.data.childIds=[];
	    root.data.x=x;
	    root.data.y=y;
	    scene.add(root);
	    nodeMap.put(root.data.id, root);
	for(var i=0;i<num;i++){
		x =(i%20)*50;
		y =(i/20)*70;
		 var v={
			    	id:i,
			    	unitType:"1003",
			    	name:"node"+i
			    	
			    };
		var node = new JTopo.Node("node"+i);
		    node.setLocation(x, y);
		    node.setImage(getImgPathByUnitType(v.unitType));
		    node.fontColor ="42,44,46";
		    node.text = "node"+i;
		    registeNodeListener(node);
		    node.id=v.id;
		    node.data={};
		    node.data.id=v.id;
		    node.data.nodeLevel=0;
		    node.data.showChilds=true;
		    node.data.parentIds=[];
		    node.data.childIds=[];
		    node.data.nodeType=v.unitType;
		    node.data.name=v.text;
		    node.data.x=x;
		    node.data.y=y;
		    scene.add(node);
		    nodeMap.put(node.data.id, node);
		    
		  addLink(root, node);
	}
	var node = new JTopo.Node("node");
    node.setLocation(400, 400);
    node.fontColor ="42,44,46";
    node.text = "node";
    registeNodeListener(node);
    node.id="node";
    node.data={};
    node.data.id="node";
    node.data.nodeLevel=0;
    node.data.showChilds=true;
    node.data.parentIds=[];
    node.data.childIds=[];
    node.data.name="node";
    node.data.x=x;
    node.data.y=y;
    scene.add(node);
    nodeMap.put(node.data.id, node);
    
    addLink(root, node);
}