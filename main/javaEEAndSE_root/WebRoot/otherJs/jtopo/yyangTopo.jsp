<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<html>
<head>
	<script>
		var PATH="<%=PATH%>";
	</script>
	<link rel="stylesheet" type="text/css" href="<%=PATH %>/topo/jtopo/css/common.css" />
	<script src="<%=PATH %>/topo/jtopo/js/topo/jtopo-0.4.8-min.js"></script>
</head>
<body>
	<div id="topoTab" class="easyui-tabs"  
		style="width:100%;height:100%;">
		<div title="物理拓扑图" style="width:100%;height:100%;overflow-x:hidden;">
			<div class="easyui-panel" style="width:100%; height:100%;background: #012330;"
				id="topoDiv">
				<canvas style="width:100%; height:100%" id="canvas"></canvas>
			</div>
			<ul id="contextmenu" style="display: none;">
				<li style="border-bottom:1px solid #f0f0f0;">
					<a id="menu1" onclick="nodeLayout(0)">横向布局</a></li>
				<li style="border-bottom:1px solid #f0f0f0;">
					<a id="menu2" onclick="nodeLayout(1)">纵向布局</a></li>
				<li style="border-bottom:1px solid #f0f0f0;">
					<a id="menu3" onclick="nodeLayout(2)">矩阵布局</a></li>
				<li><span style="width:100px;"> 
					<a href="#">舞台模式></a>
						<ul><li><a onclick="changeMode('normal')">正常</a></li>
							<li><a onclick="changeMode('select')">框选</a></li></ul>
					</span></li>
				<li style="border-bottom:1px solid #f0f0f0;">
					<a id="menu11" onclick="addContainer()">插入容器</a></li>
			</ul>
			<ul id="containermenu" style="display: none;">
				<li style="border-bottom:1px solid #f0f0f0;">
					<a onclick="setContainer()">属性</a></li>
				<li style="border-bottom:1px solid #f0f0f0;">
					<a onclick="deleteContainer()">删除</a></li>
				<!-- <li style="border-bottom:1px solid #f0f0f0;">
					<input id="txt2" type="text" onclick="coloropen(2)" />
    						<div id="colorpane" style="position: absolute; z-index: 999; display: none;">
					</li> -->
			</ul>
			
			
		</div>
	</div>
	<div id="containerWindow" class="easyui-dialog"  data-options="modal:false,closed:true,title:'容器属性'" style="width:400;height:300;position: fixed;">
		<table style="width:95%; color: #000000;font-size: 16px;">
			<tr>
				<td style="width: 30%;">填充颜色:</td>
				<td><input id="txt2" type="text" onclick="coloropen(2)" />
  						<div id="colorpane" style="position: absolute; z-index: 999; display: none;"></td>
			</tr>
			<tr>
				<td style="height: 60px;">透明度:</td>
				<td>
					<input class="easyui-slider" value="50" style="width:200px" data-options="showTip:true,
						onChange: function(value){
							setContainerAlpha(value);
						}">
				</td>
			</tr>
		</table>
	</div>
	<script type="text/javascript">
		var canvas = $("#canvas")[0];
		//设置舞台大小
		canvas.width=$("#topoDiv")[0].offsetWidth-3;
		canvas.height=$("#topoDiv")[0].offsetHeight- 3;
		var stage = new JTopo.Stage(canvas); 	// 创建一个舞台对象
		var scene = new JTopo.Scene(stage); 	// 创建一个场景对象
		//设置框选模式
		scene.mode = "select";
		//隐藏所有菜单
		function hideAllMenu(){
			$("#contextmenu").hide();
			$("#containermenu").hide();
		}
	</script>
	<!-- 引入拓扑连线动画效果 -->
	<script type="text/javascript" src="<%=PATH %>/topo/jtopo/js/animation/topoLinkAnimation.js"></script>
	<!-- 引入拓扑容器设计JS -->
	<script type="text/javascript" src="<%=PATH %>/topo/jtopo/js/animation/topoContainer.js"></script>
	<!-- 引入取色板 -->
	<script type="text/javascript" src="<%=PATH %>/topo/jtopo/js/animation/topoColorBoard.js"></script>
	<script type="text/javascript">
		//单独节点（模拟节点连线）
		var rootNode = new JTopo.Node("192.168.101.1");
		rootNode.setLocation(canvas.width/2,canvas.height/2);
		scene.add(rootNode);
		//模拟node数据
		for(var i = 2; i<= 50; i++){
			var x = getRandom(50, canvas.width - 100);
			var y = getRandom(50, canvas.height - 100);
			var node = new JTopo.CircleNode(getRandom(1, 255) +"." +getRandom(1, 255) +"." +getRandom(1, 255) +"." +getRandom(1, 255) );  // 创建一个节点
			node.radius = 10;
			node.setLocation(x,y); 				// 模拟随机数设置节点坐标                 
			scene.add(node);
			//模拟直线连线效果
			var link = new JTopo.Link(rootNode, node, "");
			//模拟曲折线连线效果
			//var link = new JTopo.FlexionalLink(rootNode, node, "");
			link.lineWidth = 0.5;
			//连线效果：（连线上增加动画） 
			link.drawanimepic(linkImagePath,scene); 
			link.strokeColor="255,0,255";
			scene.add(link);
		}
		stageListen();
		//生成随机数
		function getRandom(min, max){
            var r = Math.random() * (max - min);
            var re = Math.round(r + min);
            re = Math.max(Math.min(re, max), min);
            return re;
        };
     	//改变框选模式
        function changeMode(mode){
        	hideAllMenu();
        	scene.mode=mode;
        }
     	// 注册鼠标监听
        function stageListen() {
     		//清空原鼠标监听
        	stage.removeAllEventListener();
			stage.mousedown(function(event){
				//捕获舞台内右键属性
				if(event.button == 2){
					hideAllMenu();
					var width=event.pageX+10;
        			var height= event.pageY+10;
		     		var sleNodes= scene.selectedElements;
        			//容器设置
        			if(sleNodes.length == 1 && sleNodes[0].elementType == "container"){
        				$("#containermenu").css({
            				top:height,
            				left:width
            			}).show();
        			}else{
        				$("#contextmenu").css({
            				top:height,
            				left:width
            			}).show();
        			}
				}
			});
			stage.click(function(event){
				//捕获舞台内左键属性
				if(event.button == 0){
					hideAllMenu();
				}
			}); 
        }
     	//框选多个节点进行横向/纵向布局
     	function nodeLayout(type){
     		hideAllMenu();
     		var selectedNodes= scene.selectedElements;
     		//连线效果：（过滤调连线动画中的节点）
			selectedNodes  = getSelectedNodes(selectedNodes);
     		var selSize = selectedNodes.length;
     		if(selSize < 2){
     			messagerShow("请选择2个以上节点进行布局", "提示");
     		}else{
         		//调用按ip地址排序方法
         		selectedNodes = sortarr(selectedNodes);
     			//横向布局逻辑
     			if(type == 0){
         			var leftX = -1;
         			var leftY = -1;
         			var rightX = -1;
	     			for(var j = 0; j < selectedNodes.length; j++){
	     				//var nodeId = selectedNodes[j]._id;
	     				var nodeX = selectedNodes[j].x;
	     				var nodeY =  selectedNodes[j].y;
	     				//找到所有坐标中最左方x坐标
	     				if(leftX == -1){
	     					leftX = nodeX;
	     					leftY = nodeY;
	     				}else if(nodeX == leftX){
	     					leftX = nodeX;
	     					//如果x坐标相等则优先选择靠上方的
	     					if(leftY > nodeY){
	     						leftY =  nodeY;
	     					}
	     				}else if(nodeX < leftX){
	     					leftX = nodeX;
	     					leftY = nodeY;
	     				}
	     				//找到所有坐标中最右方x坐标
	     				if(rightX == -1){
	     					rightX = nodeX;
	     				}else if(nodeX >= rightX){
	     					rightX = nodeX;
	     				}
	     			}
	     			var avgInterval = (rightX - leftX)/(selectedNodes.length - 1);
	     			//TODO 初步布局测试
	     			for(var j = 0; j < selectedNodes.length; j++){
	     				var nodeId = selectedNodes[j]._id;
	     				selectedNodes[j].x  = leftX + j * avgInterval;   
	     				selectedNodes[j].y = leftY;
	     			}
	     		//纵向布局
     			}else if(type == 1){
         			var topX = -1;
         			var topY = -1;
         			var bottomY = -1;
     				for(var j = 0; j < selectedNodes.length; j++){
	     				//var nodeId = selectedNodes[j]._id;
	     				var nodeX = selectedNodes[j].x;
	     				var nodeY =  selectedNodes[j].y;
	     				//找到所有坐标中最上方y坐标
	     				if(topY == -1){
	     					topY = nodeY;
	     					topX = nodeX;
	     				}else if(nodeY == topY){
	     					topY = nodeY;
	     					//如果y坐标相等则优先选择靠左方的
	     					if(topX > nodeX){
	     						topX =  nodeX;
	     					}
	     				}else if(nodeY <= topY){
	     					topY = nodeY;
	     					topX = nodeX;
	     				}
	     				//找到所有坐标中最下方y坐标
	     				if(bottomY == -1){
	     					bottomY = nodeY;
	     				}else if(nodeY >= bottomY){
	     					bottomY = nodeY;
	     				}
	     			}
	     			var avgInterval = (bottomY - topY)/(selectedNodes.length - 1);
	     			//初步布局测试
	     			for(var j = 0; j < selectedNodes.length; j++){
	     				//var nodeId = selectedNodes[j]._id;
	     				selectedNodes[j].y  = topY + j * avgInterval;   
	     				selectedNodes[j].x = topX;
	     			}
         		//矩阵布局
     			}else if(type == 2){
     				var minX = 4000;
         			var minY = 4000;
         			var maxX = 0;
         			var maxY = 0;
         			var size = selectedNodes.length;
         			var cut = Math.ceil(Math.sqrt(size)) - 2;
	     			for(var j = 0; j < size; j++){
	     				var nodeX = selectedNodes[j].x;
	     				var nodeY =  selectedNodes[j].y;
	     				if(minX >= nodeX){
	     					minX = nodeX;
	     				}
	     				if(minY > nodeY){
	     					minY = nodeY;
	     				}
	     				if(maxX <= nodeX){
	     					maxX = nodeX;
	     				}
	     				if(maxY <= nodeY){
	     					maxY = nodeY;
	     				}
	     			}
	     			for(var j = 0; j< size; j++){
	     				var xl = (j + 1) % ( cut + 2);
	     				if(xl == 0){
	     					xl = cut + 1;
	     				}else {
	     					xl = xl -1;
	     				}
	     				var xv = minX +  (maxX - minX) / (cut + 1) * xl;
	     				var xy = minY +  (maxY - minY) / (cut + 1) * Math.ceil((j + 1) / (cut + 2) - 1);
     					selectedNodes[j].x = xv;
     					selectedNodes[j].y = xy;
	     			}
         		}else if(type == 3){
         			
         		}
     		}
     	}
     	//冒泡排序
		function sortarr(selectedNodes){
		    for(var i=0;i<selectedNodes.length-1;i++){
		        for(var j=0;j<selectedNodes.length-1-i;j++){
		        	//通过ip地址排序
		        	//selectedNodes[j].text格式：192.168.101.1
		        	var arry1 = selectedNodes[j].text.split(".");
		        	var arry2 = selectedNodes[j+1].text.split(".");
		        	if(arry1.length >= 4 && arry2.length >= 4){
			        	var last1 = parseInt(arry1[0]);
			        	var last2 = parseInt(arry1[1]);
			        	var last3 = parseInt(arry1[2]);
			        	var last4 = parseInt(arry1[3]);
			        	var next1 = parseInt(arry2[0]);
			        	var next2 = parseInt(arry2[1]);
			        	var next3 = parseInt(arry2[2]);
			        	var next4 = parseInt(arry2[3]);
			            if(last1>next1 || (last1 == next1 && last2 > next2) 
			            		|| (last1 == next1 && last2 == next2 && last3 > next3)
			            		|| (last1 == next1 && last2 == next2 && last3 == next3 && last4 > next4)){
			                var temp=selectedNodes[j];
			                selectedNodes[j]=selectedNodes[j+1];
			                selectedNodes[j+1]=temp;
			            }
		        	}
		        }
		    }
		    return selectedNodes;
		}
	</script>
</body>
</html>