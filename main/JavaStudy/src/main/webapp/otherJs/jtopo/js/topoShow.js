var topoName;
eagleEyeEnable=false;
var canvas = document.getElementById("topoPan");
var isFirstLink, topoid, scene, stage, topo, currentNode,currentLink,nodeMap,
linkMap, nodeDataMap, linkDataMap,
isFirst = !0, isFirstLink = !0,nodeMap = new Map(), 
linkMap = new Map(), nodeDataMap = new Map(), linkDataMap = new Map();
var containers=new Array();
var INIT_TOPO="物理拓扑根图";
setSize(), initTopo(); 
addKeyDownListener();
/**
 * 初始化变量
 */
function getAllNodeId(){
	var ids = "";
	for(var i=0;i<scene.childs.length;i++){
		var node = scene.childs[i];
		if(node.elementType=="node"){
			ids +=node.data.id+",";
		}
	}
	return ids; 
}
// 重置所有图元
function resetAllNode(){
	for(var i=0;i<scene.childs.length;i++){
		var node = scene.childs[i];
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
	var num = 0;
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
/**
 * 获取文字显示的像素宽高 a ：字体大小 b ：文字
 */
function textSize(a, b) {
	var c = document.createElement("span"), d = {};
	c.style.fontSize=a;
	return d.width = c.offsetWidth, d.height = c.offsetWidth, 
	c.style.visibility = "hidden", document.body.appendChild(c), 
	"undefined" != typeof c.textContent ? c.textContent = b :c.innerText = b, 
	d.width = c.offsetWidth - d.width, d.height = c.offsetHeight - d.height, 
	c.parentNode.removeChild(c), 
	d;
}
/**
 * 连线显示tip
 */
function showArcTip(a,fault) {
	if (null != a.target.data) {
		var color ='70,77,89';
		if(fault){
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
					color ='70,77,89';
			}
		}
		var b, c, d, e, f, g, h, i =a.target.data;
		if (i && (h = i.text, null != h)) {
			for (b = 10, d = "<table cellpadding='2'cellspacing='2' style='font-size:xx-small;color:#fff;bord-color:#fff;background:rgb("+color+");'>", e = h.split("\n"), f = 0; f < e.length; f++) 
			{
				g = textSize(12, e[f]), 
				g.width > b && (b = g.width); 
				if(f!=e.length-1)
				{
					var index =e[f].indexOf(":")+1;
					d +="<tr><td style='width:80px;height:20px;'> "+ e[f].substring(0,index)+"</td><td style='width:240px;height:20px'>"+e[f].substring(index,e[f].length)+"</td</tr>";
				}
				
			}
			d+= "</table>";
			$("#arcTip").html(d);
			c= $("#arcTip").height();
			$("#arcTip").css({
				top:a.pageY - (c+20),
				left:a.pageX - 160,
			}).show(), 
			stage.removeEventListener("mousedown");
		}
	}
}
/**
 * 图元显示tip
 */
function showNodeTip(a) {
	var b, node = a.target;
	if(node){
		b = nodeDataMap.get(node.data.id);
		var text = "";
		$.each(b,function(k,v){
			if(k=='id'){
				text+="设备ip\t\t:\t\t"+v+" \n";
			}else if(k=='name'){
				text+="设备名称\t\t:\t\t"+v+" \n";
			}else if(k=="nodeTypeStr"){
				text+="设备类型\t\t:\t\t"+v+" \n";
			}
		
		});
		text+="资源类型\t\t:\t\t"+"设备 \n";
		node.data.text=text;
		showArcTip(a);
		stage.removeEventListener("mousedown");
	}
}
// 重置警告
function resetAlarm(faults){
	$.each(faults,function(i,fault){
		for(var i=0;i<scene.childs.length;i++){
			var node= scene.childs[i];
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
	for(var i=0;i<scene.childs.length;i++){
		var node = scene.childs[i];
		if(node.elementType=="node"){
			node.alpha = 1;
		}
	}
}
// 更新节点
function updateNodeStatus(faults){
	$.each(faults,function(i,fault){
		for(var i=0;i<scene.childs.length;i++){
			var node= scene.childs[i];
			//TODO 暂时控制异常数量，供设计部使用
			if(i >3){
				return;
			}
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
// 初始化舞台及加载topo图
function initTopo() {
	stage = new JTopo.Stage(canvas);
	stage.eagleEye.visible = false;
 	loadTopo(1);
}
// 配置菜单样式
var startList = function() {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav");
		for (var i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				};
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				};
			}
		}
	}
};
window.onload=startList;
/**
 * 加载拓扑图扑图
 */
function loadTopo(a,name) {
	scene = new JTopo.Scene(stage), 
	
	stageListen();
	topoid = a, 
	clearAll(), 
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
/**
 * 初始化jscene
 */
function loadScene(topo){
	setStyle(topo), 
	addNodes(topo), 
	addArcs(topo);
 	createScene(scene);
}
/**
 * 初始化的时候清空数据
 */
function clearAll() {
	var a, b;
	for (nodeMap = new Map(), linkMap = new Map(), nodeDataMap = new Map(), linkDataMap = new Map(), 
	a = scene.getDisplayedElements(), b = 0; b < a.length; b++) scene.remove(a[b]);
	scene.childs=[];
	stage.setCenter($("#topoDiv").width()/2, $("#topoDiv").height()/2);
}
/**
 * 设置样式
 */
function setStyle(a) {
	if(a&&a.background){
		scene.background=a.background;
	}else{
		//透明背景
		scene.background= PATH+"/img/topo/jtopo/img/bg/8.png";
	}
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
	// this.alarm = null,
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
			}).hide();
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

/**
 * a：拓扑图信息
 */
function addNodes(topo) {
	var width=$("#topoDiv").width();
	var height=$("#topoDiv").height();
	var nodes, c, data, node; // nodes:节点集合 datas:节点信息 a:拓扑图 node：节点
	if (null != scene && null != topo && null != topo.nodes && 0 != topo.nodes.length) 
		for (nodes = topo.nodes, c = 0; c < nodes.length; c++) {
			data = nodes[c], 
			node = new JTopo.Node(data.name), 
			node.setSize(20,30);
			node.data = data, 
			node.setLocation(data.x*width, data.y*height), 
			node.setImage(getImgPathByUnitType(data.nodeType));
			node.fontColor ="255,255,255";
			node.data.showChilds =true;
			registeNodeListener(node);
			if(data.layout){
				eval("data.layout="+data.layout);
				node.layout=data.layout;
			}
			scene.add(node);
			nodeDataMap.put(data.id,data);
			nodeMap.put(data.id, node);
		} 
			
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
			}).hide();
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
// 键盘事件
function addKeyDownListener(){
	window.addEventListener('keydown', function(e){
		if(e.ctrlKey){
			if(e.keyCode==39){
	    		setFontSize('up');
	    	}else if(e.keyCode==37){
	    		setFontSize('down');
	    	}else if(e.keyCode==40){
	    		stage.zoomIn(0.9);
	    	}else if(e.keyCode==38){
	    		stage.zoomOut(0.9);
	    	}
		}
	}, true);
}
/**
 * 添加连线
 */
function addArcs(topo ) {
	var arcs, c, data, arc;// arcs:连线集合 data:连线信息 topo:拓扑图 arc：连线
	if(null != scene && null != topo && null != topo.arcs && 0 != topo.arcs.length){
		for(arcs = topo.arcs, c = 0; c < arcs.length; c++){
			data = arcs[c], nodeMap.get(data.upId) && nodeMap.get(data.downId) && 
			(arc = new JTopo.FoldLink(nodeMap.get(data.upId), 
					nodeMap.get(data.downId), null), 
			arc.arrowsRadius = 10,arc.data = data, 
			arc.dashedPattern=4,
			arc.arrowsOffset=-25,
			arc.lineWidth = 1/2,
			arc.mouseover(function(a) {
		    	showArcTip(a);
			}), arc.mouseout(function() {
				stageListen();
			}), arc.mousedown(function(a) {
				 stage.removeEventListener("mousedown");
				 currentTarget=a.target;
				 2 == a.button && ($("#linkmenu").css({
					top:a.pageY + 10,
					left:a.pageX + 20
				}).hide(), $("#contextmenu").hide(), $("#nodemenu").hide());
			}),
			scene.add(arc), linkMap.put(data.id, arc));
		}
	}
}
/**
 * 改变图元名称
 */
function updateNodeName() {
	var a, b = $("#textfield");
	null != currentNode.target && (a = currentNode.target, $("#textfield").val(""), 
	$("#textfield").css({
		top:currentNode.pageY,
		left:currentNode.pageX - a.width / 2
	}).hide().val(a.text).focus().select(), 
	a.text = "", 
	b[0].JTopoNode = a, 
	isFirst && ($("#textfield").blur(
			function() {
				var c = b.hide().val();
				b[0].JTopoNode.text = c;
			}),
	isFirst = !1));
}
/**
 * 初始化的时候设置canvas的尺寸
 */
function setSize() {
	canvas.width = $(document.body).width(), canvas.height = $("#topoDiv").height();
}

/**
 * 修改拓扑图的背景
 */
function updateBgTopo() {
	$("#dgPage").dialog("open"), $("#dgPage").dialog("resize", {
		width:550,
		height:400
	}),
	$("#dgPage").dialog("refresh", "backGround.jsp"),$("#contextmenu").hide();
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
	}//http://192.168.101.111:8080/qcbin/start_a.jsp
	addLink(selectedNodes[0],selectedNodes[1]);
}
/**
 * 初始化变量
 */
function initConstant(){
	currentTarget=null;
	circle_basic=40;
	root=null;
	getFaultList();
}
window.setInterval(getFaultList,15*1000);
stage.addEventListener("click",function(e){
	currentTarget=null;
});
var font="12px Microsoft Yahei";// 节点字体
var type="tree";
var currentTarget=null;
var screen = {};
var circle_basic=40;
screen.width=document.getElementById("topoDiv").offsetHeight-30;
screen.height=document.getElementById("topoDiv").offsetWidth-5;
var root=null;
function changeTopo(name){
	topoName=name;
	stage.remove(scene);
 	loadTopo(1);
}
// 切换流程图
$("#state").combobox({
	valueField : 'id',
	textField : 'text',
	editable:false,
	value:INIT_TOPO,
	url : "getTopoNameList",
	onChange : function(n, o) { 
		topoName=n;
		stage.remove(scene);
	 	loadTopo(1);
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
$("#deviceLabel").combobox({
	panelHeight:100,
	width:80,
	required:true,
	editable:false,
	onChange:function(newValue,oldValue){
		setDeviceLabel(newValue);
	}
});
$("#linkLabel").combobox({
	panelHeight:100,
	width:80,
	required:true,
	editable:false,
	value:'none',
	onChange:function(newValue,oldValue){
		setLinkLabel(newValue);
	}
});
$("#addTopoDialog").dialog({
	title:'新建拓扑图',
	top:'200px',
	width:300,
	height:300,
	modal:true,
	closed:true,
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
function setFontSizeByValue(){
	var fontSize =$("#fontSize").numberspinner("getValue");  // parseInt(font.substring(0,2));
	var fontStyle = font.substring(2,font.length);
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
	 	node.font=fontSize+fontStyle;
	}
	font=fontSize+fontStyle;
}
// 添加连线
function addLink(nodeA, nodeZ,data){
    var link = new JTopo.FoldLink(nodeA, nodeZ);
    link.dashedPattern=4;
    link.lineJoin  = 'round';  
    link.strokeColor = '33,121,237';
    link.lineWidth = 1/2;
    link.arrowsOffset=-25;
    link.arrowsRadius=10;
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
		}).hide(), $("#contextmenu").hide(),$("#nodemenu").hide());
	});
    scene.add(link);
    linkMap.put(link.data.id, link);
    nodeZ.data.parentId=nodeA.data.id;
    nodeA.data.hasChild=true;
    return link;
} 
// 复制链路
function copyLink(oldLink){
	var link=new JTopo.FoldLink(oldLink.nodeA, oldLink.nodeZ);
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
	for(var i=0;i<data.childs.length;i++){
		var element=data.childs[i];
		element.font=font;// 设置字体
		element.click(function(e){
			currentTarget=e.target;
		});
		
		if(element.elementType=="node"){
			if(element.data.parentId=="scene"){
				root=element;
			}
		} 
	}
	if(topo && topo.enableLayout!=true){
		changeLayout("circle");
	}
}
// 恢复位置
function recoverChildsXY(parent){
	if(scene && scene.childs && parent.childsXY){
		for(var i=0;i<scene.childs.length;i++){
			var node = scene.childs[i];
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
// 保存位置
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
// 删除链路
function removeChildsRespond(parent){
	parent.removeLinks=new Array();
	for(var i=0;i<scene.childs.length;i++){
		var child= scene.childs[i];
		if(child.elementType=="link"){
			if(child.nodeA==parent){
				if(child.nodeZ.data.hasChild){
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
		if(child.elementType=="node"  && child.data.hasChild==true){
			if(!id || includeId(child.data,id)){
				var parent= getNodeById(child.data.parentId);
				if(parent && parent.layout && parent.layout.radius &&child.layout&& child.layout.radius){
					var link = getLinkByNode(parent,child);
					if(!link){
					 	continue;
					}
					var add=150;
					var distence=getDistence(parent.x,parent.y,child.x,child.y);
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
// 获取距离
function getDistence(x1,y1,x2,y2){
	var x= x2-x1;
	var y= y2-y1;
	return Math.sqrt(x*x+y*y);
}
// 子节点是否包含点击的父节点id
function includeId(data,id){
	if(data.parentId==id){
		return true;
	}
	return false;
}
// 获取连线
function getLinkByNode(nodeA,nodeZ){
	for(var i=0;i<scene.childs.length;i++){
		var child=scene.childs[i];
		if(child.elementType=="link" && child.nodeA==nodeA && child.nodeZ==nodeZ){
			return child;
		}
	}
}
// 获取父节点
function getNodeById(id){
	for(var i=0;i<scene.childs.length;i++){
		var child=scene.childs[i];
		if(child.elementType=="node" && child.data.id==id){
			return child;
		}
	}		
}
/*
 * 获取子节点个数 param 1： 节点对象 param 2: 自动补全属性设置
 */
function getChildsCount(parent,autoCreateParam){
	var childsCount=0;
	for(var i=0;i<scene.childs.length;i++){
		var link = scene.childs[i];
		if(link.elementType=="link"&& link.nodeA==parent){
			childsCount++;
			autoCreateParam?(link.nodeZ.data.parentId = parent.data.id):null;
		}
	}
	parent.data.childsCount=childsCount;
	autoCreateParam?(parent.data.hasChild=childsCount>0):null;
	return childsCount;
}
function hasChild(parent){
	for(var i=0;i<scene.childs.length;i++){
		 var link=scene.childs[i];
		 if(link.elementType=="link" && link.nodeA==parent){
			 parent.data.hasChild=true;
			 return true;
		 }
	}
	return false;
}
// 隐藏或显示子节点
function changeShowChilds(parent){
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
		 		 node.visible=!node.visible;
		 		 link.visible=!link.visible;
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
	for(var i=0;i<scene.childs.length;i++){
		 var node = scene.childs[i];
		 if(node.elementType=="node" && !node.data.parentId){
			 node.data.nodeLevel = 1;
			 recurNodeLevel(node);
		 } 
	}
}
 

// 使用递归设置节点级别，需要依赖节点parentId、hasChild已设置
function recurNodeLevel(parent){
	for(var i=0;i<scene.childs.length;i++){
		 var node = scene.childs[i];
		 if(node.elementType=="node" && node.data.parentId==parent.data.id){
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
				var d=circle_basic;
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
				node.setLocation(screen.width/2,screen.height/5);
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
	currentTarget.nodeA=tempZ;
	currentTarget.nodeZ=tempA;
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
		var d=circle_basic+20;
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
		href:url,
		closable:true
	});
	
}
function getPath(){
	// 获取主机地址之后的目录如：/Tmall/index.jsp
	var pathName=window.document.location.pathname; 
	// 获取带"/"的项目名，如：/Tmall
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
	return projectName;
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
// 设置标签
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
// 设置链路标签
function setLinkLabel(select){
	for(var i=0;i<scene.childs.length;i++){
		var node=scene.childs[i];
		if(node.elementType && node.elementType=="link"){
			 if(select == "none"){
				 node.text=null;
			 }else if(select in node.data){
				 node.text=node.data[select];
			 }
		}
	}
}
// 改变jtopo模式
function changeMode(mode){
	$("#contextmenu").hide();
	scene.mode=mode;
}
// 改变字体大小
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
			scene.remove(currentTarget);
			saveToJson();
		}
	});
	$("#linkmenu").hide();
}
function deleteLinkByNodeId(nodeId){
	for(var i=0;i<scene.childs.length;i++){
		var link=scene.childs[i];
		if(link.elementType=="link" && (link.nodeA.data.id==nodeId ||link.nodeZ.data.id==nodeId)){
			 scene.remove(link);
		}
	}
}
// 删除节点
function deleteNode(currentNode){
	$.messager.confirm('操作提示','是否删除此图元？',function(r){
		if(r){
			scene.remove(currentNode.target);
			deleteLinkByNodeId(currentNode.target.data.id);
			saveToJson();
		}
	});
	$("#nodemenu").hide();
}
// 自定义easyui的提示格式
function easyuiShow(obj){
	if( !obj.title){
		obj.title="提示信息";
	}
	if( !obj.timeout){
		obj.timeout=3000;
	}
	if( !obj.showType){
		obj.showType="slide";
	}
	$.messager.show({
	    title : obj.title,
		msg : obj.msg,
		timeout : obj.timeout,
		showType : obj.showType,
        style:{
            right:'',
            top:document.body.scrollTop+document.documentElement.scrollTop,
            bottom:''
        }
	});
}
// 生成uuid
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid;
}
// 设置鹰眼
function setEagleEye(){
	stage.eagleEye.visible = !stage.eagleEye.visible;
	eagleEyeEnable=!eagleEyeEnable;
}
// 导出png
function printPNG(){
	stage.saveImageInfo();
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
			topoName=r;
			stage.remove(scene);
			scene = new JTopo.Scene(stage), 
			stageListen();
			setStyle();
			stage.eagleEye.visible = false;
			clearAll(); 
			saveToJson(topoName);
			$("#toponame").textbox("setValue","");
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
	saveScene.zoomLevel=topo.zoomLevel;
	saveScene.background= $(scene.background).attr("src"); 
	saveScene.arcs=linkList;
	saveScene.nodes=nodeList;
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
// 获取图片路径
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




CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function(a, b, c, d, e) {
	 var animespeed= (new Date())/100;
	 "undefined" == typeof e && (e = 5);
	 var f = c - a,// x轴差
			 g = d - b,// y轴差
			 h = Math.floor(Math.sqrt(f * f + g * g)),// 勾股定理,直线长度
			 i = 0 >= e ? h: h / e,// 虚线段数
			 j = g / h * e,
			 k = f / h * e;
	 this.beginPath();
	 animespeed=animespeed%(e*2);
	 var txs=-f/h*animespeed;
	 var tys=-g/h*animespeed;
	 for (var l = 0; i > l; l++) {
		 l % 2 ? this.lineTo(a + l * k-txs, b + l * j-tys) : this.moveTo((a + l * k-txs)>(a+i*k)?(a + l * k):(a + l * k-txs), (b + l * j-tys)>(b + i * j)?(b + l * j):(b + l * j-tys));
	 };
	 this.stroke();
};
CanvasRenderingContext2D.prototype.JtopoDrawPointPath=function(a,b,c,d,e,f){
	 var animespeed=(new Date())/10;
	var xs=c- a,
		xy=d- b,
		l = Math.floor(Math.sqrt(xs * xs + xy * xy)),
			colorlength=50,
			j=l;
		xl=xs/ l,
	    yl=xy/l;
	 var colorpoint=animespeed%(l+colorlength)-colorlength;

	 for(var i=0;i<j;i++){
		 if(((i)>colorpoint)&&((i)<(colorpoint+colorlength))){
			 this.beginPath();
			 this.strokeStyle=e;
			 this.moveTo(a+(i-1)*xl,b+(i-1)*yl);
			 this.lineTo(a+i*xl,b+i*yl);
			 this.stroke();
		 }else{
			 this.beginPath();
			 this.strokeStyle=f;
			 this.moveTo(a+(i-1)*xl,b+(i-1)*yl);
			 this.lineTo(a+i*xl,b+i*yl);
			 this.stroke();
		 }
	 }
};