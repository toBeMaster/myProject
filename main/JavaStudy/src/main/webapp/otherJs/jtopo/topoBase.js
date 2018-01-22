/**
 * 定义拷贝方法,递推调用
 * filterType-->00000001   
 * 从低位开始： 
 * 		i1: 跳过函数
 * 		i2: 跳过目标对象未定义属性
 * 		i3: 禁止深克隆
 * 		i4: 跳过空值		
 */
function copyProperties(des,ori,filterParams,filterType){
	if(!des) des = new Object();
	for(var p in ori){
		if(filterParams&& $.inArray(p,filterParams)){
			continue;  //skip  params in filterparams
		}
		if((filterType&1)==1 && typeof p =="function"){//xxx1
			continue;//skip the p ,disable function
		}
		if(filterType&&(filterType&2)==2&&!des.hasOwnProperty(p)){//xx1x
			continue; //skip undefined params of des
		}
		if((filterType&8)==8 && (p==null)){//x1xx
			continue;//skip  null
		}
		if(typeof p =="object"){
			if((filterType&4)==4){//1xxx
				continue;
			}
			copyProperties(des[p],ori[p],filterParams,filterType);
		}else {
			des[p] = ori[p];
		}
	}
};
/**
 * 定义topo类
 * 由于id,name，configFile是动态运行指定，所以要通过构造器传入
 */
function Topo(options){
	if(!options) throw "options is undefined！";
	var obj = {
		id:options.id,
		name:options.name,
		domId:options.domId,
		defaultBackground:"/img/topo/bg/3.png",
		path:options.path||PATH,//项目路径，减少依赖
		url:options.url, 
		canvas:null,
		stage:null,
		scene:null,
		currentTarget:null,
		nodeMap:null,
		linkMap:null,
		delElementMap:null,
		nodeDataMap:null,
		linkDataMap:null,
		stageAttr:{
			mode:"normal",
			eagleEye:"false"
		},
		sceneAttr:{
			background:null,
			mode:"normal"
		},
		nodeAttr:{
	 		selected:false,
			dragable:true,
			font:"12px Microsoft Yahei",
			fontColor :"42,44,46"
		},//当前拓扑图节点的属性设置
		linkAttr:{
			font:"12px Microsoft Yahei",
			fontColor :"42,44,46",
			linkConnType:"link"
		},
		//对象 方法定义
		/**
		 * 设置canvas大小
		 */
		setSize:function(w,h){
			this.canvas.width = $($("#"+this.domId).parent()).width();
			this.canvas.height = $($("#"+this.domId).parent()).height();
		},
		/**
		 * 设置场景背景
		 */
		setSceneBG:function(url){//不能包括项目路径，必须为项目路径下的相对路径
			if(!url){
				url=this.defaultBackground;
			}
			this.background =url;
			this.scene.background  = this.path+ url;
		},
		/**
		 * 清空数据
		 */
		clearAll:function(){
			var a, b;
			var scene = this.scene;
			for ( a =  scene.getDisplayedElements(), b = 0; b < a.length; b++) 
				scene.remove(a[b]);
			scene.childs=[];
			scene.clear();
			this.stage.setCenter(this.canvas.width /2, this.canvas.height/2);
			this.nodeMap = new Map();
			this.linkMap = new Map();
			this.nodeDataMap = new Map();
			this.linkDataMap = new Map();
		},
		/**
		 * 对象初始化
		 */
		initTopo:function(){
			this.canvas = document.getElementById(this.domId);
			this.setSize();
			this.stage = new JTopo.Stage(this.canvas);
			this.nodeMap = new Map();
			this.nodeDataMap = new Map();
			this.linkMap = new Map();
			this.linkDataMap = new Map();
			this.delElementMap = new Map();
			this.loadTopo();//初始化后加载拓扑图
		},
		/**
		 * 加载拓扑图 ，抽离出来为了可以切换场景
		 */
		loadTopo:function(id,name){
			this.scene = new JTopo.Scene(this.stage);
			this.scene.mode = this.sceneAttr.mode;
			this.clearAll();
			this.stageListener();
		 	this.getTopoById(PATH+this.url,this.id);
		  	this.scene.mode = this.sceneAttr.mode;
		},
		/**
		 * 获取数据
		 */
		getTopoById:function(url,id){
			var topo = this;
			if (null == id) 
				id= this.id;
			if (null == url) 
				url= this.url;
			if(!url) throw "url is null,please input url!";
			$.ajax({
				type:"post",
				url:url,
				data:{
					topoId:id
				},
				success:function(data){
					if(data&&data.success){
						copyProperties(topo,data.obj,["dragable","selected"],1);//只跳过函数
						topo.nodes = data.obj.nodes;
						topo.links = data.obj.links;
						topo.loadScene(data.obj);
					}else{
						topo.loadScene({
							background:topo.defaultBackground
						})
					}
				} 
			});
		},
		/**
		 * 通过加载后的数据部署场景
		 */
		loadScene:function(data){
			this.setSceneBG(data.background);
		 	this.addNodes();
		 	this.addLinks();
		 	this.scene.mode = this.sceneAttr.mode;
		 	this.onLoadSuccess();
		},
		/**
		 * 加载数据后，统一添加节点
		 */
		addNodes:function(){
			var topo =this;
			var scene = this.scene;
			var width=this.canvas.width;
			var height=this.canvas.height;
			var fontColor = this.nodeAttr.fontColor;
			var nodes, c, data, node; // nodes:节点集合 datas:节点信息 a:拓扑图 node：节点
			if (null != scene && null != topo && null != topo.nodes && 0 != topo.nodes.length) 
				for (nodes = topo.nodes, c = 0; c < nodes.length; c++) {
					data = nodes[c], 
					node = new JTopo.Node(data.name);
					var size = topo.nodeSizeFormatter(node);
					if(!size||!size.width || !size.height){
						size ={
							width:30,
							height:30
						}
					}
					node.setSize(size.width,size.height);
					node.dragable=  topo.nodeAttr.dragable;
					node.selected=  topo.nodeAttr.selected;
					node.data = data;//存放具体业务数据
					node.setLocation(data.x*width, data.y*height);
					var imgPath;
					if(node.data.nodeAttr&& node.data.nodeAttr.imgPath){
						imgPath =this.path+ node.data.nodeAttr.imgPath;
					}else{
						imgPath = this.imgPathFormatter(data);
					}
					node.setImage(imgPath);
					node.fontColor =fontColor;
					node.data.childIds = new Array();
					node.data.parentIds = new Array();
					topo.registeNodeListener(node);//分开写
					topo.scene.add(node);
					topo.nodeDataMap.put(data.id,data.data);
					topo.nodeMap.put(data.id, node);
				} 
		},
		addLinks:function(){
			var topo =this;
			var nodeMap = this.nodeMap;
			var scene = this.scene;
			var fontColor = this.linkAttr.fontColor;
			var linkAttr = this.linkAttr;
			var arcs, c, data, arc;// arcs:连线集合 data:连线信息 topo:拓扑图 arc：连线
			if(null != scene  && null != topo.links &&  topo.links.length>0){
				for(arcs = topo.links, c = 0; c < arcs.length; c++){
					data = arcs[c];
					//构建链路连接方向 
					var direction;
					if(data.linkAttr){
						if(data.linkAttr.linkConnType){
							linkAttr.linkConnType = data.linkAttr.linkConnType;
						}
						if(data.linkAttr.direction){
							direction=data.linkAttr.direction;
						}
					}
					if(nodeMap.get(data.nodeAId) && nodeMap.get(data.nodeZId) ){
						linkAttr.linkConnType=="FoldLink"?(
								arc = new JTopo.FoldLink(nodeMap.get(data.nodeAId), 
								nodeMap.get(data.nodeZId), null)):
									(arc = new JTopo.Link(nodeMap.get(data.nodeAId), 
											nodeMap.get(data.nodeZId), null));
						arc.text = data.name;
						arc.arrowsRadius = 10,
						arc.data = data, 
						arc.dashedPattern=10,
						arc.arrowsOffset=-25,
						arc.lineWidth = 1/2,
						arc.fontColor = fontColor;
						if(direction){
							arc.direction =direction;
						}
						arc.mouseover(function(a) {
					   // 	showArcTip(a);
						}), arc.mouseout(function() {
						//	stageListen();
						}), arc.mousedown(function(a) {
						}),
						scene.add(arc), 
						topo.linkMap.put(data.id, arc);
						topo.linkDataMap.put(data.id, arc.data);
					}
				}
			}
		},
		/**
		 * 手动添加节点
		 */
		addNode:function(obj){
			var node = this.nodeMap.get(obj.id);
			if(!node){
				node = new JTopo.Node(obj.text);
				node.setLocation(50,50);
				node.dragable=  this.nodeAttr.dragable;
				node.selected=  this.nodeAttr.selected;
				node.setSize(30,30);
				this.nodeAttr.fontColor?node.fontColor =this.nodeAttr.fontColor:null;
				node.id=obj.id;
				node.data={};
				node.data.id=node.id;
				node.data.unitType=obj.unitType;
				node.data.name=obj.text;
				node.setImage(this.imgPathFormatter(node.data));
				this.registeNodeListener(node);
				this.scene.add(node);
				this.nodeMap.put(node.id, node);
			}
			return node;
		},
		/**
		 * 对节点的大小进行控制
		 * 返回{
		 * 	 width:xxx,
		 * 	 height:xxx
		 * }
		 */
		nodeSizeFormatter:function(node){
			var obj ={
				width:30,
				height:30
			}
			return obj;
		},
		/**
		 * 获取图片路径
		 */
		imgPathFormatter:function(node){
			var type = node.unitType;
			var path = this.path;
			var imgPath = path+"/img/areaUnit/topo/video.png";
			if(type=="area"){
				imgPath= path+"/img/areaUnit/topo/area.png";
			}else if(type="video"){
				imgPath= path+"/img/areaUnit/topo/video.png";
			}
			return imgPath;
		},
		/**
		 * 删除节点
		 */
		removeNode:function(id){
			this.removeLinkByNodeId(id);
			//删除节点逻辑接口  所有删除最后都应调用这个接口
			var node = this.nodeMap.get(id);
			this.delElementMap.put(node.id,node);
			this.scene.remove(node);
			this.nodeMap.removeByKey(id);
		},
		removeLink:function(id){
			var link = this.linkMap.valuesByKey(linkId)[0];
			link.nodeA.data.childIds.removeByValue(link.nodeZ.data.id);
			link.nodeZ.data.parentIds.removeByValue(link.nodeA.data.id);
			scene.remove(link);
			this.linkMap.removeByKey(linkId);//从集合中删除
		},
		removeLinkByNodeId:function(id){
			var scene = this.scene;
			//这里还是用scene比较好，删除不会影响遍历中的元素
			for(var i=0;i<scene.childs.length;i++){
				var link=scene.childs[i];
				if(link.elementType=="link" && (link.nodeA.data.id==nodeId ||link.nodeZ.data.id==nodeId)){
					 scene.remove(link);
					 link.nodeA.data.childIds.removeByValue(link.nodeZ.data.id);
					 link.nodeZ.data.parentIds.removeByValue(link.nodeA.data.id);
					 this.linkMap.removeByKey(link.data.id);//从集合中删除
				}
			}
		},
		/**
		 * 保存返回json数据
		 */
		toJson:function(){
			var topo  = this;
			var width=topo.canvas.width;
			var height=topo.canvas.height;
			var saveScene= new Object();
			// 存放节点集合
			var nodeList = new Array();
			// 标记节点集合最新下标
			var nodeIndex = 0;
			var scene = topo.scene;
			if(null != scene.childs && scene.childs.length > 0){
				for(var i=0;i<scene.childs.length;i++){
					var child = scene.childs[i];
					if(child.elementType && child.elementType=="node"){
						var node= child.data;
						node.nodeId=child.data.id;
						node.name = child.data.name;
						node.elementType=child.elementType;
						node.x=child.x/width;
						node.y=child.y/height;
						nodeList[nodeIndex] = node;
						nodeIndex++;
					} 
				}
			}
			saveScene.id=topo.id;
			saveScene.name=topo.name;
			saveScene.topoType=topo.topoType;
			saveScene.background= topo.background; 
			saveScene.nodes=nodeList;
			copyProperties(saveScene.nodeAttr,topo.nodeAttr,["dragable","selected"],1);
			var json = JSON.stringify(saveScene);
			return json;
		},
		/*
		 * 事件注册
		 */
		
		/**
		 * 当topo完全部署完毕
		 */
		onLoadSuccess:function( ){
		},
		/**
		 * 舞台、场景事件
		 */
		stageListener: function(){
			var topo = this;
			var stage = topo.stage;
			var scene = topo.scene;
			stage.removeAllEventListener();
			stage.addEventListener("mousedown", function(a) {
				 stageMouseDown(a);
			});
			stage.click(function(a) {
				 stageClick(a);
			});
			scene.removeAllEventListener();
			scene.addEventListener("mousedown",function(a){
				 sceneMouseDown(a);
			});
			 scene.addEventListener('mouseup',function(a){
				 sceneMouseDown(a);
			 });
		},
		
		/**
		 * 事件的具体调用由调用页面自行编辑，这里提供调用接口
		 */
		registeNodeListener:function(node){
			var topo = this;
			node.mouseover(function(a) {
		 		nodeMouseOver(a);
			}), 
			node.mouseout(function(a) {
				topo.stageListener();// 注册
				nodeMouseOut(a);
			}),
			node.mouseup(function(a) {
				nodeMouseUp(a);
			}),
			node.mousedown(function(a) {
				topo.currentNode = a.target;
				nodeMouseDown(a);
			}), 
			node.dbclick(function(a) {
				topo.currentNode = a.target;
				nodeDbClick(a);
			});
		}
	}
	Topo.prototype = obj;
	copyProperties(obj,options);
	obj.initTopo();
	return obj;
}



var debugInfo = false;
//响应事件 接口，开发人员可以重写覆盖
function stageMouseDown(a){
	debugInfo?console.log("stageMouseDown"):null;
}
function stageClick(a){
	debugInfo?console.log("stageClick"):null;
}
function sceneMouseDown(a){
	debugInfo?console.log("sceneMouseDown"):null;
}
function sceneMouseUp(a){
	debugInfo?console.log("sceneMouseUp"):null;
}
function nodeMouseOver(a){
	debugInfo?console.log("nodeMouseOver"):null;
}
function nodeMouseOut(a){
	debugInfo?console.log("nodeMouseOut"):null;
}
function nodeMouseDown(a){
	debugInfo?console.log("nodeMouseDown"):null;
}
function nodeMouseUp(a){
	debugInfo?console.log("nodeMouseUp"):null;
}
function nodeDbClick(a){
	debugInfo?console.log("nodeDbClick"):null;
}