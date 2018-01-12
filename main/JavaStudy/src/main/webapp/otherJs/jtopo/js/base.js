CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function(a, b, c, d, e) {
	 var animespeed= (new Date())/50;
	 if("undefined" == typeof e){
		 e = 5;
	 } 
	 var f = c - a,  g = d - b, h = Math.floor(Math.sqrt(f * f + g * g)),// 勾股定理,直线长度
			 i = 0 >= e ? h: h / e,// 虚线段数
			 j = g / h * e,
			 k = f / h * e;
	 this.beginPath();
	 animespeed=animespeed%(e*2);
	 var txs=-f/h*animespeed;
	 var tys=-g/h*animespeed;
	 for (var l = 0; i > l; l++) {
		 l % 2 ? this.lineTo(a + l * k-txs, b + l * j-tys) : this.moveTo((a + l * k-txs)>(a+i*k)?(a + l * k-txs):(a + l * k-txs), (b + l * j-tys)>(b + i * j)?(b + l * j-tys):(b + l * j-tys));
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
function getPath(){
	// 获取主机地址之后的目录如：/Tmall/index.jsp
	var pathName=window.document.location.pathname; 
	// 获取带"/"的项目名，如：/Tmall
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1); 
	return projectName;
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
		showType : obj.showType,
        style:{
            right:'',
            top:document.body.scrollTop+document.documentElement.scrollTop,
            bottom:''
        }
	});
}

//生成uuid
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
Array.prototype.removeByValue = function(val) {
	  for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      continue;
	    }
	  }
};
Array.prototype.contains = function ( needle ) {
	  for (i in this) {
	    if (this[i] == needle) return true;
	  }
	  return false;
};

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
 * 设置样式
 */
function setStyle(a) {
	if(a&&a.background){
		scene.background=a.background;
	}else{
		scene.background= PATH+"/img/topo/jtopo/img/bg/3.png";
	}
	
}
/**
 * 初始化的时候设置canvas的尺寸
 */
function setSize() {
	canvas.width = $(document.body).width(), canvas.height = $("#topoDiv").height();
}
//获取距离
function getDistence(p,c){
	var x= c.x-p.x;
	var y= c.y-p.y;
	return Math.sqrt(x*x+y*y);
}
//导出png
function printPNG(){
	stage.saveImageInfo();
}
/**
 * 加载后，隐藏图元
 * @param topo
 */
function loadEndHidden(topo){
	if(topo.hiddenLinkArray){
		hiddenLinkArray = topo.hiddenLinkArray;
	}
	if(topo.hiddenNodeArray){
		hiddenNodeArray = topo.hiddenNodeArray;
	}
	if(topo.hiddenLinkByNode){
		for(var i=0;i<topo.hiddenLinkByNode.length;i++){
			var id = topo.hiddenLinkByNode[i];
			for(var j=0;j<linkMap.size();j++){
				var link = linkMap.element(j).value;
				if(link.data.id==id){
					hideLinkByNodeMap.put(id, link);
				}
			}
		}
	}
	for(var i=0;i<hiddenNodeArray.length;i++){
		if(nodeMap.valuesByKey(hiddenNodeArray[i].id)){
			nodeMap.valuesByKey(hiddenNodeArray[i].id)[0].visible=false;
		}
	}
	for(i=0;i<hiddenLinkArray.length;i++){
		if(linkMap.valuesByKey(hiddenLinkArray[i].id)){
			linkMap.valuesByKey(hiddenLinkArray[i].id)[0].visible=false;
		}
	}
	for(i=0;i<hideLinkByNodeMap.size();i++){
		if(linkMap.valuesByKey(hideLinkByNodeMap.element(i).value.data.id)){
			linkMap.valuesByKey(hideLinkByNodeMap.element(i).value.data.id)[0].visible=false;
		}
	}
}
//遍历所有节点，设置节点父子节点id
function setParentAndChildAttr(){
	if(scene&& scene.childs){
		for(var i=0;i<scene.childs.length;i++){
			var link = scene.childs[i];
			if(link.elementType == "link"){
				 if($.inArray(link.nodeA.data.id, link.nodeZ.data.parentIds)<0){
					 link.nodeZ.data.parentIds.push(link.nodeA.data.id);
				 }
				 if($.inArray(link.nodeZ.data.id, link.nodeA.data.childIds)<0){
					 link.nodeA.data.childIds.push(link.nodeZ.data.id);
				 }
			}
		}
	}
}
/**
 * 初始化的时候设置canvas的尺寸
 */
function setSize() {
	canvas.width = $(document.body).width(), canvas.height = $("#topoDiv").height();
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
/**
 * a：拓扑图信息
 */
function addNodes(topo) {
	var width=$("#topoDiv").width();
	var height=$("#topoDiv").height();
	var fontColor = "42,44,46";
	var nodes, c, data, node; // nodes:节点集合 datas:节点信息 a:拓扑图 node：节点
	if (null != scene && null != topo && null != topo.nodes && 0 != topo.nodes.length) 
		for (nodes = topo.nodes, c = 0; c < nodes.length; c++) {
			data = nodes[c], 
			node = new JTopo.Node(data.name), 
			node.setSize(20,30);
			node.data = data, 
			node.setLocation(data.x*width, data.y*height), 
			node.setImage(getImgPathByUnitType(data.nodeType));
			node.fontColor =fontColor;
			node.data.showChilds =true;
			node.data.childIds = new Array();
			node.data.parentIds = new Array();
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
/**
 * 添加连线
 */
function addArcs(topo ) {
	var fontColor = "0,0,0";
	var arcs, c, data, arc;// arcs:连线集合 data:连线信息 topo:拓扑图 arc：连线
	if(null != scene && null != topo && null != topo.arcs && 0 != topo.arcs.length){
		for(arcs = topo.arcs, c = 0; c < arcs.length; c++){
			data = arcs[c];
			if(nodeMap.get(data.upId) && nodeMap.get(data.downId) ){
				topoAttr.linkConnType=="FoldLink"?(arc = new JTopo.FoldLink(nodeMap.get(data.upId), 
						nodeMap.get(data.downId), null)):
							(arc = new JTopo.Link(nodeMap.get(data.upId), 
									nodeMap.get(data.downId), null));
				arc.arrowsRadius = 10,arc.data = data, 
				arc.dashedPattern=10,
				arc.arrowsOffset=-25,
				arc.lineWidth = 1/2,
				arc.fontColor = fontColor,
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
					}).show(), $("#contextmenu").hide(), $("#nodemenu").hide());
				}),
				
				scene.add(arc), linkMap.put(data.id, arc);
			}
		}
	}
	setParentAndChildAttr();
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
/*// 配置菜单样式
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
*/