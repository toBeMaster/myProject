<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ include file="../../inc/path.inc"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>拓扑图</title>
	<link rel="stylesheet" type="text/css" href="<%=PATH %>/easyuiV143/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="<%=PATH %>/easyuiV143/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="css/common.css"/>
	<link rel="stylesheet" type="text/css" href="css/rightlist.css">
	
	<script src="<%=PATH %>/easyuiV143/jquery.min.js"></script> 
	<script src="<%=PATH %>/easyuiV143/jquery.easyui.min.js"></script>
	<script src="js/topo/jtopo-0.4.8-min.js"></script>
	
	<script src="js/util/uuid.js"></script>
	<script src="js/demoJs.js"></script>
	<script language="javascript">
	startList = function() {
		if (document.all&&document.getElementById) {
			navRoot = document.getElementById("nav");
			for (i=0; i<navRoot.childNodes.length; i++) {
				node = navRoot.childNodes[i];
				if (node.nodeName=="LI") {
					node.onmouseover=function() {
						this.className+=" over";
					}
					node.onmouseout=function() {
						this.className=this.className.replace(" over", "");
					}
				}
			}
		}
	}
	window.onload=startList;
</script>
  </head>
  <body>
 <div id="floatTools" class="rides-css" style="height:46px;">
  <div class="floatL">
  	<a style="display:block" id="aFloatTools_Show" class="btnOpen" title="查看在线客服"  href="javascript:void(0);">展开</a>
  	<a style="display:none" id="aFloatTools_Hide" class="btnCtn" title="关闭在线客服"  href="javascript:void(0);">收缩</a>
  </div>
  <div id="divFloatToolsView" class="floatR" style="display: none;height:500px;width:110px;">
    <div class="cn">
      <ul id="nav"> 
      	<li><a onclick="alert(111);">资源列表</a></li>
        <li><a onclick="alert(111);">搜索</a></li>
        <li><a onclick="alert(111);">保存</a></li>
        <li><a id="fullScreenButton">全屏</a></li>
        <li><a onclick="alert(111);">打印</a></li>
        <li>  
        	<span  >
	        	<a href="#">设备标签</a>
		        <ul style="float:left;top:150px;right:90px;"> 
			            <li><a onclick="setDeviceLabel('name');">name</a></li> 
			            <li><a onclick="setDeviceLabel('topoId');">topoId</a></li> 
			            <li><a onclick="setDeviceLabel('unitId');">unitId</a></li> 
			    </ul> 
			</span>  
        </li>
        <li> 
       		 <span style="width:60px;">
	        	<a href="#">链路标签</a>
		        <ul style="float:left;top:180px; "> 
			            <li><a onclick="setLinkLabel('none');">无</a></li> 
			            <li><a onclick="setLinkLabel('name');">name</a></li> 
			            <li><a onclick="setLinkLabel('downId');">downId</a></li> 
			            <li><a onclick="setLinkLabel('upId');">upId</a></li> 
			    </ul> 
			</span>    
		</li> 
        <li> 
        	<span style="width:60px;">
	        	<a href="#">布局模式</a>
		        <ul style="float:left;top:210px;"> 
			            <li><a href="#">History</a></li> 
			            <li><a href="#">Team</a></li> 
			            <li><a href="#">Offices</a></li> 
			    </ul> 
			</span>     
        </li>
        <li><a onclick="updateBgTopo()">背景设置</a></li>
        <li> 
        	<span style="width:60px;">
	        	<a href="#">字体大小</a>
		         <ul style="float:left;top:270px;right:90px;"> 
			            <li><a onclick="setFontSize('up');">增加</a></li> 
			            <li><a onclick="setFontSize('down');">减少</a></li> 
			    </ul> 
			</span>     
        </li>
     	<li><a onclick="alert(111);">颜色</a></li>
     	<li><a onclick="alert(111);">自适应</a></li>
     	<li><a onclick="alert(111);">正常比例</a></li>
     	<li><a onclick="alert(111);">后退</a></li>
     	<li><a onclick="alert(111);">鸟瞰图</a></li>
     
      </ul>
    </div>
  </div>
</div>
	<div id="arcTip" style="position: absolute; top: 322px; left: 922px; display: none;background: rgba(0,0,0,0.9);padding: 3px;;display: table-cell;font-family: '微软雅黑';color: #efefef;border-radius: 4px;"></div>
  	<textarea name="textfield" id="textfield" onkeydown="if(event.keyCode==13)this.blur();" style="width: 60px; position: absolute; top: 322px; left: 922px; display: none;"></textarea>
	<ul id="contextmenu" style="display: none;">
		<li><a onclick="addNodesTopo()">添加设备</a>
		</li>
		<li><a onclick="addLinkTopo()">添加链路</a>
		</li>
		<li><a onclick="deleteNodesTopo()">删除设备</a>
		</li>
		<li><a onclick="deleteLinkTopo()">删除链路</a>
		</li>
		<li><a onclick="changeLayout()">改变布局</a>
		</li>
		<li><a onclick="saveTopo()">保存配置</a>
		</li>
		<li><a onclick="refreshTopo()">数据刷新</a>
		</li>
		<li><span style="width:100px;">
	        	<a href="#" >舞台模式</a>
		         <ul> 
			            <li><a onclick="changeMode('normal')">正常</a></li> 
			            <li><a onclick="changeMode('select')">框选</a></li> 
			    </ul> 
			</span>     
		</li>
	</ul>
	<ul id="nodemenu">
		<li><a onclick="changeTopoNode(currentNode)">资源详细页</a>
		</li>
		<li><a onclick="deleteTopoNode(currentNode)">体验化管理</a>
		</li>
		<li><a onclick="deleteTopoNode(currentNode)">删除节点</a>
		</li>
		<li><a onclick="configureTopo(currentNode)">图元工具</a>
		</li>
		<li><a onclick="editDistance('add')">增加距离</a>
		</li>
		<li><a onclick="editDistance('decrease')">减小距离</a>
		</li>
		<li><span style="width:100px;">
	        	<a href="#" >图元布局</a>
		         <ul> 
			            <li><a onclick="changeNodeLayout('top');">树形上</a></li> 
			            <li><a onclick="changeNodeLayout('bottom');">树形下</a></li> 
			            <li><a onclick="changeNodeLayout('left');">树形左</a></li> 
			            <li><a onclick="changeNodeLayout('right');">树形右</a></li> 
			            <li><a onclick="changeNodeLayout('circle');">圆形</a></li> 
			    </ul> 
			</span>     
		</li>
	</ul>
	<ul id="linkmenu" style="display: none;">
		<li><a>编辑链路</a>
		</li>
		<li><a>删除链路</a>
		</li>
		<li><a onclick="swapLinkTopo(currentTarget)">交换链路上下行</a>
		</li>
	</ul>
	<div id="dgPage" class="easyui-dialog" title="编辑框"
		style="width: 350px; height: 260px;"
		data-options="closed: true,resizable:true,modal:true">
	</div>
	<div style="width:100%; height:100%" id="topoDiv">
		<div
			<div>
				<div><canvas style="width:100%; height:100%" id="topoPan"></canvas></div>	
			</div>
	</div>
	</div>
	<script type="text/javascript">	
	function showTopoType(a) {
		if(a!=null&&a.length>0){
			getTopByType(a[0]);
		}
	}
	/**
	*通过类型获取了拓扑
	*/
	function getTopByType(a) {
		$("#tops").combobox("clear"), $("#tops").combobox("reload", "json/getTopoByType.json");
	}
	/**
	*加载拓扑图扑图
	*/
	function loadTopo(a) {
		topoid = a, 
		clearAll(), 
		getTopoById(a);
	}
	function loadScene(topo){
		setStyle(topo), 
		addNodes(topo), 
		addArcs(topo);
		//getUpdateTopo();
	 	createScene(scene);
	}
	/**
	*初始化的时候清空数据
	*/
	function clearAll() {
		var a, b;
		for (nodeMap = new Map(), linkMap = new Map(), nodeDataMap = new Map(), linkDataMap = new Map(), 
		a = scene.getDisplayedElements(), b = 0; b < a.length; b++) scene.remove(a[b]);
		stage.setCenter($("#topoDiv").width()/2, $("#topoDiv").height()/2);
	}
	/**
	*后台获取拓扑对象
	*/
	var getTopoType="local";
	function getTopoById(a) {
		if (null == a) 
			return null;
		var url="json/getTopoById.json";
	 	url="json/500.json";
	 //	url="getPhsicalTopo";
		if(url=="getPhsicalTopo"){
			getTopoType= "web";
		}else if(url=="json/getTopoById.json"){
			getTopoType="local";
		}
		$.ajax({
			type:"post",
			url:url,
			success:function(data){
				topo=data;
				loadScene(topo);
			} 
		})
		return  topo;
	}
	/**
	*设置样式
	*/
	function setStyle(a) {
		scene.background= "<%=PATH %>/img/topo/jtopo/img/bg/3.png";
	}
	/**
	*添加图元并添加监听事件
	*/
	$("#fullScreenButton").click(function(){
		runPrefixMethod(stage.canvas, "RequestFullScreen")
	});
	var runPrefixMethod = function(element, method) {
		var usablePrefixMethod;
		["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
			if (usablePrefixMethod) return;
			if (prefix === "") {
				// 无前缀，方法首字母小写
				method = method.slice(0,1).toLowerCase() + method.slice(1);
			}
			var typePrefixMethod = typeof element[prefix + method];
			if (typePrefixMethod + "" !== "undefined") {
				if (typePrefixMethod === "function") {
					usablePrefixMethod = element[prefix + method]();
				} else {
					usablePrefixMethod = element[prefix + method];
				}
			}
		});

		return usablePrefixMethod;
	};
	function updateFontSize(){
		//document.getElementByTagName("body").style.fontSize="15px";
	}
	/**
	 * a：拓扑图信息
	 **/
	function addNodes(a) {
		var b, c, d, e; 
		if (null != scene && null != a && null != a.nodes && 0 != a.nodes.length) 
			for (b = a.nodes, c = 0; c < b.length; c++) {
				d = b[c], 
				e = new JTopo.Node(d.name), 
				e.data = d, 
				e.setLocation(d.x, d.y), 
				e.setImage(getImg(d.imgType,d.alarm), !0),
				e.fontColor ="42,44,46",
				//e.alarm=d.alarm+"级告警",
				e.mouseover(function(a) {
					showNodeTip(a);
				}), 
				e.mouseout(function() {
					this.alarm = null, stageListen();//注册
				}),
				e.mouseup(function(a) {
					
				}),
				e.mousedown(function(a) {
					currentNode = a;
					if(a.button==2){
						$("#nodemenu").css({
							top:a.pageY+10,
							left:a.pageX+10 
						}).show();
						 
						$("#contextmenu").hide();
						$("#linkmenu").hide();
					}
					 
				}), 
				e.dbclick(function(a) {
					currentNode = a, 
					updateNodeName();
				});
				if(d.layout){
					eval("d.layout="+d.layout);
					e.layout=d.layout;
				}
				scene.add(e);
				nodeMap.put(d.id, e);
			}
				
	}
	
	/**
	*图元显示tip
	*/
	function showNodeTip(a) {
		var b, c = a.target;
		c && (b = nodeDataMap.get(c.data.id), new Object(), c.alarm = b.text, c.alarmColor = "0,0,0", 
		c.fillColor = "0,0,255",c.alarmFontColor = "255,255,255", stage.removeEventListener("mousedown"));
	}

	function stageListen() {
		$("#arcTip").hide();
		stage.addEventListener("mousedown", function(a) {
			2 == a.button && ($("#contextmenu").css({
					top:a.pageY + 10,
					left:a.pageX + 10
				}).show(), 
				$("#nodemenu").hide(), 
				$("#linkmenu").hide()
			);
		}), 
		stage.click(function(a) {
			0 == a.button && ($("#contextmenu").hide(), $("#nodemenu").hide(), $("#linkmenu").hide());
		});
	}
	/**
	*添加连线
	*/
	function addArcs(a) {
		var b, c, d, e;
		if(null != scene && null != a && null != a.arcs && 0 != a.arcs.length){
			for(b = a.arcs, c = 0; c < b.length; c++){
				d = b[c], nodeMap.get(d.upNodeId) && nodeMap.get(d.downNodeId) && 
				(e = new JTopo.Link(nodeMap.get(d.upNodeId), 
						nodeMap.get(d.downNodeId), null), 
				e.arrowsRadius = 10,e.data = d, 
				e.arrowsOffset=-15,
				e.lineWidth = 3,
				e.mouseover(function(a) {
					 showArcTip(a)
				}), e.mouseout(function() {
					stageListen();
				}), e.mousedown(function(a) {
					 currentTarget=a.target;
					 2 == a.button && ($("#linkmenu").css({
						top:a.pageY + 10,
						left:a.pageX + 20
					}).show(), $("#contextmenu").hide(), $("#nodemenu").hide());
				}),
				scene.add(e), linkMap.put(d.id, e));
			}
		}
	}
	/**
	*连线显示tip，之后可能直接在jtopo里面实现
	*/
	function showArcTip(a) {
		if (null != a.target.data) {
			var b, c, d, e, f, g, h, i = linkDataMap.get(a.target.data.id);
			if (i && (h = i.text, null != h)) {
				for (b = 10, d = "", e = h.split("\n"), f = 0; f < e.length; f++) 
				{
					g = textSize(12, e[f]), 
					g.width > b && (b = g.width); 
					if(f!=e.length-1)
					{
						d += e[f] + "</br>"
					}
					
				}
				$("#arcTip").html(d);
				c= $("#arcTip").height();
				$("#arcTip").css({
					top:a.pageY - (c+10),
					left:a.pageX - b/2,
				}).show(), 
				stage.removeEventListener("mousedown");
			}
		}
	}
	
	/**
	*获取刷新的数据如状态，告警，tip显示
	*/
	function getUpdateTopo() {	
		$.ajax({
			type:"get",
			url:"json/topoDate.json",
			dataType:"json",
			success:function(a) {
				var b, c, d;
				if (a) {
					if (b = a.nodes, c = a.arcs, b && b.length > 0) for (d = 0; d < b.length; d++) nodeDataMap.removeByKey(b[d].id),nodeDataMap.put(b[d].id, b[d]);
					if (c && c.length > 0) for (d = 0; d < c.length; d++) linkDataMap.removeByKey(c[d].id),linkDataMap.put(c[d].id, c[d]);
					refreshTopoData();
				}
			}
		});
	}
	
	/**
	*改变图元和链路的样式
	*/
	function refreshTopoData() {
		var ns = nodeMap.values();
		if(ns.length>0){
			for(var i=0;i<ns.length;i++){
				var n = nodeDataMap.get(ns[i].data.id);
				if(!n){
					continue;
				}
				//faultFlag 告警产生叹号 0 ,1 ,2 ,3 ,4 ,5 
				ns[i].fault=n.faultFlag;
				var tatget=n.target;
				if(tatget){
					if(tatget.平均CPU利用率!=null){
						var cpu=tatget.平均CPU利用率;
						if(0<=cpu&&cpu<20){
							ns[i].setImage(getImg(ns[i].data.imgType,0), !0)
						}else if(20<=cpu&&cpu<60){
							ns[i].setImage(getImg(ns[i].data.imgType,1), !0)
						}else if(60<=cpu&&cpu<80){
							ns[i].setImage(getImg(ns[i].data.imgType,2), !0)
							ns[i].alarm ="2级告警";
						}else if(80<=cpu&&cpu<90){
							ns[i].setImage(getImg(ns[i].data.imgType,3), !0)
							ns[i].alarm ="3级告警";
						}else{
							ns[i].setImage(getImg(ns[i].data.imgType,4), !0)
							ns[i].alarm ="4级告警";
						}
					}
				}
			}
		}
		var ads = linkDataMap.values();
		if(ads!=null&&ads.length>0){
			for(var i=0;i<ads.length;i++){
				var arc=linkMap.get(ads[i].id);
				var faultFlag = ads[i].faultFlag;
				if(0==faultFlag){
					arc.strokeColor = '220,20,60';
				}else{
					arc.strokeColor = '33,121,237';
				}
			}
		}
	}
	
	/**
	*改变图元名称
	*/
	function updateNodeName() {
		var a, b = $("#textfield");
		null != currentNode.target && (a = currentNode.target, $("#textfield").val(""), 
		$("#textfield").css({
			top:currentNode.pageY,
			left:currentNode.pageX - a.width / 2
		}).show().val(a.text).focus().select(), a.text = "", b[0].JTopoNode = a, isFirst && ($("#textfield").blur(function() {
			var a = currentNode.target.data.id, c = b.hide().val();
			b[0].JTopoNode.text = c, $.post("topo_updataNodeName", {
				id:a,
				name:c
			}, function(b) {
				if (b) {
					loadTopo(topoid);
					var d = nodeMap.get(a);
					d.data.name = c;
				} else $.messager.show({
					title:"我的消息",
					msg:"修改失败",
					timeout:2e3,
					showType:"show",
					style:{
						right:"",
						top:"35%",
						bottom:""
					}
				});
			});
		}), isFirst = !1));
	}
	/**
	*初始化的时候设置canvas的尺寸
	*/
	function setSize() {
		canvas.width = $(document.body).width(), canvas.height = $("#topoDiv").height();
	}
	/**
	*初始化变量
	*/
	function initTopo() {
		stage = new JTopo.Stage(canvas), 
		scene = new JTopo.Scene(stage), 
		stageListen();
		stage.eagleEye.visible = true;
	 	loadTopo(1);
	}
	
	/**
	*获取文字显示的像素宽高，这个方法没有用
	*a ：字体大小
	*b ：文字
	*/
	function textSize(a, b) {
		var c = document.createElement("span"), d = {};
		c.style.fontSize=a;
		return d.width = c.offsetWidth, d.height = c.offsetWidth, c.style.visibility = "hidden", 
		document.body.appendChild(c), "undefined" != typeof c.textContent ? c.textContent = b :c.innerText = b, 
		d.width = c.offsetWidth - d.width, d.height = c.offsetHeight - d.height, c.parentNode.removeChild(c), 
		d;
	}
	
	/**
	*修改拓扑图的背景
	*/
	function updateBgTopo() {
		$("#dgPage").dialog("open"), $("#dgPage").dialog("resize", {
			width:550,
			height:400
		}),
		$("#dgPage").dialog("refresh", "backGround.jsp"),$("#contextmenu").hide();
	}
	/**
	*设置拓扑图布局
	*/
	function setTopoLayout(type) {
		var nodes=nodeMap.values();
		if(nodes.length==0){
			return;
		}
		if(1==type){
			scene.doLayout(JTopo.layout.TreeLayout('down', 100,100));
		}else if(2==type){
			var centerX = $("#topoDiv").width()/2;
			var centerY = $("#topoDiv").height()/2; 
			var radius = 200;
			var count = nodes.length;
			for(var i=0; i < count; i++){
				var x = centerX+ (radius * Math.cos(Math.PI * 2 / count * i));  
				var y = centerY+ (radius * Math.sin(Math.PI * 2 / count * i));  
				nodes[i].x=x;  
				nodes[i].y=y;  
			}
		}
	}
	
	/**
	*刷拓扑图
	*/
	function refreshTopo() {
		$("#contextmenu").hide();
		loadTopo(topoid);
		//getUpdateTopo();
	}
	function showAlarm(){
		$("#contextmenu").hide();
	//	getUpdateTopo();
	}
	
	
	/**添加图元*/
	function configureTopo() {
		$("#dgPage").dialog("open").dialog("setTitle", "更换图元"), $("#dgPage").dialog("refresh", "topo_configurePage?topology.id=" + topoid), 
		$("#dgPage").dialog("resize", {
			width:600,
			height:400
		}), $("#contextmenu").hide();
	}
	
	/**添加链路*/
	function addLinkTopo() {
		$("#contextmenu").hide();
		var selecteNodes= scene.selectedElements;
		var len = selecteNodes.length;
		if(len!=2){
			$.messager.show({
				title:'提示',
				msg:'请选择两个节点',
				timeout:1000,
				showType:'slide'
			});
			return;
		}
		$("#dgPage").dialog("open").dialog("setTitle", "添加链路"), $("#dgPage").dialog("resize", {
			width:400,
			height:260
		});
		$("#dgPage").dialog("refresh", "topo_addLinkTopoPage?arcDTO.upNodeId="
				+selecteNodes[0].data.id+"&arcDTO.downNodeId="+selecteNodes[1].data.id
				+"&arcDTO.upId="+selecteNodes[0].data.unitId+"&arcDTO.downId="+selecteNodes[1].data.unitId);
	}

	/**
	*获取图片
	*/
	function getImg(a,f) {
		var img=d111005_0;
		if(a==111005){
			if(0==f){
				img = d111005_0;
			}else if(1==f){
				img = d111005_1;
			}else if(2==f){
				img = d111005_2;
			}else if(3==f){
				img = d111005_3;
			}else if(4==f){
				img = d111005_4;
			}else if(5==f){
				img = d111005_5;
			}else{
				img = d111005_0;
			}
		}else if(a==121005){
			if(0==f){
				img = d121005_0;
			}else if(1==f){
				img = d121005_1;
			}else if(2==f){
				img = d121005_2;
			}else if(3==f){
				img = d121005_3;
			}else if(4==f){
				img = d121005_4;
			}else if(5==f){
				img = d121005_5;
			}else{
				img = d121005_0;
			}
		}
		
		else if(a==211004){
			if(0==f){
				img = f211004_0;
			}else if(1==f){
				img = f211004_1;
			}else if(2==f){
				img = f211004_2;
			}else if(3==f){
				img = f211004_3;
			}else if(4==f){
				img = f211004_4;
			}else if(5==f){
				img = f211004_5;
			}else{
				img = f211004_0;
			}
		}else if(a==221004){
			if(0==f){
				img = f221004_0;
			}else if(1==f){
				img = f221004_1;
			}else if(2==f){
				img = f221004_2;
			}else if(3==f){
				img = f221004_3;
			}else if(4==f){
				img = f221004_4;
			}else if(5==f){
				img = f221004_5;
			}else{
				img = s221004_0;
			}
		}
		else if(a==311001){
			if(0==f){
				img = r311001_0;
			}else if(1==f){
				img = r311001_1;
			}else if(2==f){
				img = r311001_2;
			}else if(3==f){
				img = r311001_3;
			}else if(4==f){
				img = r311001_4;
			}else if(5==f){
				img = r311001_5;
			}else{
				img = r311001_0;
			}
		}else if(a==321001){
			if(0==f){
				img = r321001_0;
			}else if(1==f){
				img = r321001_1;
			}else if(2==f){
				img = r321001_2;
			}else if(3==f){
				img = r321001_3;
			}else if(4==f){
				img = r321001_4;
			}else if(5==f){
				img = r321001_5;
			}else{
				img = r321001_0;
			}
		}
		else if(a==412100){
			if(0==f){
				img = s412100_0;
			}else if(1==f){
				img = s412100_1;
			}else if(2==f){
				img = s412100_2;
			}else if(3==f){
				img = s412100_3;
			}else if(4==f){
				img = s412100_4;
			}else if(5==f){
				img = s412100_5;
			}else{
				img = s412100_0;
			}
		}else if(a==422100){
			if(0==f){
				img = s422100_0;
			}else if(1==f){
				img = s422100_1;
			}else if(2==f){
				img = s422100_2;
			}else if(3==f){
				img = s422100_3;
			}else if(4==f){
				img = s422100_4;
			}else if(5==f){
				img = s422100_5;
			}else{
				img = s422100_0;
			}
		}
		else if(a==511002){
			if(0==f){
				img = s511002_0;
			}else if(1==f){
				img = s511002_1;
			}else if(2==f){
				img = s511002_2;
			}else if(3==f){
				img = s511002_3;
			}else if(4==f){
				img = s511002_4;
			}else if(5==f){
				img = s511002_5;
			}else{
				img = s511002_0;
			}
		}else if(a==521002){
			if(0==f){
				img = s521002_0;
			}else if(1==f){
				img = s521002_1;
			}else if(2==f){
				img = s521002_2;
			}else if(3==f){
				img = s521002_3;
			}else if(4==f){
				img = s521002_4;
			}else if(5==f){
				img = s521002_5;
			}else{
				img = s521002_0;
			}
		}
		else if(a==611003){
			if(0==f){
				img = t611003_0;
			}else if(1==f){
				img = t611003_1;
			}else if(2==f){
				img = t611003_2;
			}else if(3==f){
				img = t611003_3;
			}else if(4==f){
				img = t611003_4;
			}else if(5==f){
				img = t611003_5;
			}else{
				img = t611003_0;
			}
		}else if(a==621003){
			if(0==f){
				img = t621003_0;
			}else if(1==f){
				img = t621003_1;
			}else if(2==f){
				img = t621003_2;
			}else if(3==f){
				img = t621003_3;
			}else if(4==f){
				img = t621003_4;
			}else if(5==f){
				img = t621003_5;
			}else{
				img = t621003_0;
			}
		}
		return img;
	}
	
	var isFirstLink, topoid, scene, stage, topo, canvas, currentNode,currentLink,nodeMap, linkMap, nodeDataMap, linkDataMap,
	isFirst = !0, isFirstLink = !0, canvas = document.getElementById("topoPan"), nodeMap = new Map(), 
	linkMap = new Map(), nodeDataMap = new Map(), linkDataMap = new Map(),
	d111005_0, d111005_1, d111005_2, d111005_3, d111005_4, d111005_5,
	d121005_0, d121005_1, d121005_2, d121005_3, d121005_4, d121005_5, 
	f211004_0, f211004_1, f211004_2, f211004_3, f211004_4, f211004_5, 
	f221004_0, f221004_1, f221004_2, f221004_3, f221004_4, f221004_5, 
	r311001_0, r311001_1, r311001_2, r311001_3, r311001_4, r311001_5,
	r321001_0, r321001_1, r321001_2, r321001_3, r321001_4, r321001_5, 
	s412100_0, s412100_1, s412100_2, s412100_3, s412100_4, s412100_5, 
	s422100_0, s422100_1, s422100_2, s422100_3, s422100_4, s422100_5,
	s511002_0, s511002_1, s511002_2, s511002_3, s511002_4, s511002_5, 
	s521002_0, s521002_1, s521002_2, s521002_3, s521002_4, s521002_5,
	t611003_0, t611003_1, t611003_2, t611003_3, t611003_4, t611003_5, 
	t621003_0, t621003_1, t621003_2, t621003_3, t621003_4, t621003_5;
	d111005_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_0.png",
	d111005_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_1.png", 
	d111005_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_2.png", 
	d111005_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_3.png", 
	d111005_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_4.png", 
	d111005_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_1/1005_5.png", 
	d121005_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_0.png", 
	d121005_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_1.png", 
	d121005_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_2.png", 
	d121005_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_3.png", 
	d121005_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_4.png", 
	d121005_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Device/_2/1005_5.png",
	f211004_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_0.png", 
	f211004_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_1.png",
	f211004_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_2.png", 
	f211004_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_3.png",
	f211004_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_4.png", 
	f211004_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_1/1004_5.png", 
	f221004_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_0.png", 
	f221004_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_2.png", 
	f221004_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_3.png", 
	f221004_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_4.png",
	f221004_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_5.png", 
	f221004_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Firewall/_2/1004_6.png", 
	r311001_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_0.png", r311001_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_1.png", 
	r311001_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_2.png", r311001_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_3.png", 
	r311001_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_4.png", r311001_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_1/1001_5.png", 
	r321001_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_0.png", r321001_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_1.png", 
	r321001_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_2.png", r321001_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_3.png", 
	r321001_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_4.png", r321001_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Router/_2/1001_5.png", 
	s412100_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_0.png", s412100_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_1.png", 
	s412100_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_2.png", s412100_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_3.png", 
	s412100_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_4.png", s412100_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_1/2100_5.png", 
	s422100_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_0.png", s422100_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_1.png", 
	s422100_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_2.png", s422100_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_3.png", 
	s422100_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_4.png", s422100_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Server/_2/2100_5.png", 
	s511002_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_0.png", s511002_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_1.png",
	s511002_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_2.png", s511002_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_3.png", 
	s511002_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_4.png", s511002_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_1/1002_5.png", 
	s521002_0 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_0.png", s521002_1 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_1.png", 
	s521002_2 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_2.png", s521002_3 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_3.png", 
	s521002_4 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_4.png", s521002_5 = "<%=PATH %>/img/topo/jtopo/img/icon/Switch/_2/1002_5.png", 
	t611003_0 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_0.png", t611003_1 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_1.png",
	t611003_2 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_2.png", t611003_3 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_3.png",
	t611003_4 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_4.png", t611003_5 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_1/1003_5.png", 
	t621003_0 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_0.png", t621003_1 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_1.png",
	t621003_2 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_2.png", t621003_3 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_3.png", 
	t621003_4 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_4.png", t621003_5 = "<%=PATH %>/img/topo/jtopo/img/icon/ThreeSwitch/_2/1003_5.png", 
	setSize(), initTopo();//window.setInterval(getUpdateTopo, 1000);
	
	
	
	stage.addEventListener("click",function(e){
		currentTarget=null;
	});
	var font="12px Microsoft Yahei";//节点字体
	var type="tree";
	var currentTarget=null;
	var templates=new Array();
	var screen = {};
	var circle_basic=40;
	screen.width=document.getElementById("topoDiv").offsetHeight-30;
	screen.height=document.getElementById("topoDiv").offsetWidth-5;
	var root;
	//添加连线
	function addLink(nodeA, nodeZ){
        var link = new JTopo.Link(nodeA, nodeZ);
        link.strokeColor = '33,121,237';
        link.lineWidth = 3;
        link.arrowsOffset=-15;
        link.arrowsRadius=10;
        
        link.data={};
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
        scene.add(link);
        return link;
    } 
	function copyLink(oldLink){
		var link=new JTopo.Link(oldLink.nodeA, oldLink.nodeZ);
		link.strokeColor = oldLink.strokeColor;
	    link.lineWidth = oldLink.lineWidth;
	    link.arrowsOffset=oldLink.arrowsOffset;
	    link.arrowsRadius=oldLink.arrowsRadius;
	    link.data=oldLink.data;
	    return link;
	}
	//添加节点
	function addNode(text){
        var node = new JTopo.Node();
        node.text=text;
        node.fontColor = '0,0,0';
        
        node.data={};
        node.data.id=uuid();
        node.data.nodeLevel=0;
        node.data.hasChild=false;
        node.data.childscount=0;
        node.data.parentId=null;
        node.data.parentIds=[];
        node.data.alarm="1";
        node.data.nodeType=2100;
        node.data.imgType=111005;
        node.data.name="test";
        node.data.topoId="2";
        node.data.unitId="192.168.0.57";
        node.data.x=0;
        node.data.y=0;
        
        node.mouseout(function() {
		     stageListen();//注册
		}),
        node.mousedown(function(a) {
        	stage.removeEventListener("mousedown");
			currentNode = a;
			if(a.button == 2){
				$("#nodemenu").css({
					top :a.pageY+10,
					left:a.pageX+10
				}).show();
			}
			$("#contextmenu").hide();
			$("#linkmenu").hide();
		});
        node.dbclick(function(a) {
			currentNode = a, 
			updateNodeName();
		});
        scene.add(node);
        return node;
    }
	function createScene(data){
		for(var i=0;i<data.childs.length;i++){
			var element=data.childs[i];
			element.font=font;//设置字体
			element.click(function(e){
				currentTarget=e.target;
			});
			
			if(element.elementType=="node"){
				if(element.data.parentId=="scene"){
					root=element;
				}else{
					templates.push(element);
				}
			} 
		}
	 	 
		//拖动事件后重新布局
	 	scene.addEventListener('mousedown',function(e){
	 		if(e.button==0 && e.target ){
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
	  /*   root.setLocation(screen.width/2,screen.height/5);
	    scene.doLayout(JTopo.layout.TreeLayout('down', 20, 150));
		JTopo.layout.layoutNode(scene,root,true); */
	    changeLayout("circle");
	}
	 
	function recoverChildsXY(parent){
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
	function recoverChildsRespond(parent){
		if(parent.removeLinks){
			for(var i=0;i<parent.removeLinks.length;i++){
				var removelink = parent.removeLinks[i];
		 		scene.add(copyLink(parent.removeLinks[i]));
			}
		}
	}
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
	//设置连线长度
	function setLinkLength(id){
		for(var i=0;i<scene.childs.length;i++){
			var child=scene.childs[i];
			if(child.elementType=="node"  && child.data.hasChild==true){
				if(!id || includeId(child.data,id)){
					var parent= getNodeById(child.data.parentId);
					if(parent && parent.layout && parent.layout.radius &&child.layout&& child.layout.radius){
						var link = getLinkByNode(parent,child);
						if(!link){
						//	continue;
						}
						var add=300;
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
	function getDistence(x1,y1,x2,y2){
		var x= x2-x1;
		var y= y2-y1;
		return Math.sqrt(x*x+y*y);
	}
	function includeId(data,id){
		if(data.parentId==id){
			return true;
		}
		return false;
	}
	//获取连线
	function getLinkByNode(nodeA,nodeZ){
		for(var i=0;i<scene.childs.length;i++){
			var child=scene.childs[i];
			if(child.elementType=="link" && child.nodeA==nodeA && child.nodeZ==nodeZ){
				return child;
			}
		}
	}
	//获取父节点
	function getNodeById(id){
		for(var i=0;i<scene.childs.length;i++){
			var child=scene.childs[i];
			if(child.elementType=="node" && child.data.id==id){
				return child;
			}
		}		
	}
	//改变布局
	function changeLayout(layout){
		if(layout && layout=="circle"){
			type="tree";
		}
		if(type!="circle"){
			type="circle";
			root.setLocation(screen.width/2,screen.height/2);
			var d=circle_basic;
			for(i=0;i<scene.childs.length;i++){
				var child=scene.childs[i];
				if(child.elementType=="node"){
					
					var r;
					var count=child.data.childsCount;
					//第四套方案  如果子节点个数过小，则无法正常显示，所以当子节点小于10个就指定一个数值，大于10个就采用第三套公式
					if(count<15){
						r=70; 
					}else if(count>=15 && count<40){
					//	d=d*Math.pow(2/3,Math.floor(count/100));
						r = d*(Math.sin(Math.PI/2- Math.PI/count)/Math.sin(2*Math.PI/count));
					}else{
						r = d*(Math.sin(Math.PI/2- Math.PI/40)/Math.sin(2*Math.PI/40));
					}
					child.layout={type:'circle',radius:r};
					JTopo.layout.layoutNode(scene,child,true);
				}
			}
		 	JTopo.layout.layoutNode(scene,root,true);
			setLinkLength();
		}else {
			type="tree";
			root.setLocation(screen.width/2,screen.height/5);
	 		root.layout={type:'tree',width:20,height:150};
	 		JTopo.layout.layoutNode(scene,root,true);
			for(i=0;i<scene.childs.length;i++){
				var child=scene.childs[i];
				if(child.elementType=="node"){
					child.layout={type:'tree',width:20,height:150};
				}
			} 
	 		scene.doLayout(JTopo.layout.TreeLayout('down', 20, 150));
		}
		$("#contextmenu").hide();//点击功能后，需要将其菜单隐藏
	}
	function swapLinkTopo(currentTarget){
		var tempA=currentTarget.nodeA;
		var tempZ=currentTarget.nodeZ;
		currentTarget.nodeA=tempZ;
		currentTarget.nodeZ=tempA;
	}
	
	function saveTopo(){
		//存放节点集合
		var nodeList = new Array();
		//标记节点集合最新下标
		var nodeIndex = 0;
		//连线集合
		var linkList = new Array();
		//标记连线集合最新下标
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
		})
	}
	//编辑子节点布局
	function changeNodeLayout(layout){
		console.info("currentNode:",currentNode.target);
		var node=currentNode.target;
		var count=currentNode.target.data.childsCount;
		if(layout=="circle"){
			var d=circle_basic;
			var r;
			if(count<15){
				r=70; 
			}else{
				if(count>=15&& count<50){
					d+=5;
				}
				d=d*Math.pow(2/3,Math.floor(count/100));
				r = d*(Math.sin(Math.PI/2- Math.PI/count)/Math.sin(2*Math.PI/count));
			}
			currentNode.target.layout={type:'circle',radius:r};
		}else{
			var height;
			var width=35;
			height=150;
			currentNode.target.layout={type: 'tree', direction: layout, width: width, height: height};
		}
	 	removeChildsRespond(currentNode.target);
		JTopo.layout.layoutNode(scene,currentNode.target,false);
	 	recoverChildsRespond(currentNode.target);
	 	setLinkLength(currentNode.target.data.id);
	}
	function setlayoutNode(node){
		if(node.layout.type=="circle"){
			var count=0;
			for(var i=0;i<scene.childs.length;i++){
				var link= scene.childs[i];
				if(link.elementType=="link" && link.nodeA==node && !link.nodeZ.hasChild){
					count++;
				}
			}
			var angle=2*Math.PI/count;
			var d=circle_basic;
			var r;
			if(count<15){
				r=70; 
			}else{
				if(count>=15&& count<50){
					d+=5;
				}
				d=d*Math.pow(2/3,Math.floor(count/100));
				r = d*(Math.sin(Math.PI/2- Math.PI/count)/Math.sin(2*Math.PI/count));
			}
			node.layout.radius=r;
			var increase=1;
			for(var i=0;i<scene.childs.length;i++){
				var link=scene.childs[i];
				if(link.elementType=="link" && link.nodeA==node &&!link.nodeZ.hasChild){
					var child =link.nodeZ;
					child.x=node.x+r*Math.cos(angle*increase);
					child.y=node.y+r*Math.sin(angle*increase);
					increase++;
				}
			}
		}
	}
	//编辑父子节点的距离
	function editDistance(op){
		var radio=10/11;
		var node=currentNode.target;
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
		recoverChildsRespond(currentNode.target);
	 	setLinkLength(currentNode.target.data.id);
	}
	//设置标签
	function setDeviceLabel(select){
		for(var i=0;i<scene.childs.length;i++){
			var node=scene.childs[i];
			if(node.elementType && node.elementType=="node"){
				 if(select in node.data){
					 node.text=node.data[select];
				 }
			}
		}
	}
	//设置链路标签
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
	function changeMode(mode){
		scene.mode=mode;
	}
	//改变字体大小
	function setFontSize(op){
		var fontSize =  parseInt(font.substring(0,2));
		var fontStyle = font.substring(2,font.length);
		if(op=="up"){
			if(fontSize==36){
				easyuiShow({msg:"已达到字体上限,不允许增加！"});
				return;
			}
			fontSize+=2;
		}else if(op=="down"){
			if(fontSize==10){
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
	
	//自定义easyui的提示格式
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
			showType : obj.showType
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
	</script>
  </body>
</html>