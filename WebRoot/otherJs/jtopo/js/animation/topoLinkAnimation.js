/**
 * 拓扑图Link连线动画JS
 */
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
JTopo.Link.prototype.drawanimepic=function(imgurl,scene,width,height){
	var imgnode=new JTopo.CircleNode();
	//imgnode.setSize(width?width:16,height?height:16)
	imgnode.setSize(3,3);
	//图片路径
	//imgnode.setImage(imgurl);
	imgnode.fillColor = "224,73,232";
	imgnode.zIndex=2.5;
	imgnode.isNode = false;
	//是否显示表示选中状态的矩形
	imgnode.showSelected = false;
	var thislink=this;
	this.isremove=false;
	//连线上节点运动速度（值越小速度越快）
	var aniSpeed = 15;
	function b(a, b) {
		var c = [];
		if (null == a || null == b) return c;
		if (a && b && a.outLinks && b.inLinks) for (var d = 0; d < a.outLinks.length; d++) for (var e = a.outLinks[d], f = 0; f < b.inLinks.length; f++) {
			var g = b.inLinks[f];
			e === g && c.push(g)
		}
		return c
	}
	function c(a, c) {
		var d = b(a, c),
				e = b(c, a),
				f = d.concat(e);
		return f
	}
	function d(a) {
		var b = c(a.nodeA, a.nodeZ);
		return b = b.filter(function(b) {
			return a !== b
		})
	}
	thislink.removeHandler = function() {
		this.isremove=true;
		var a = this;
		this.nodeA && this.nodeA.outLinks && (this.nodeA.outLinks = this.nodeA.outLinks.filter(function(b) {
			return b !== a
		})),
		this.nodeZ && this.nodeZ.inLinks && (this.nodeZ.inLinks = this.nodeZ.inLinks.filter(function(b) {
			return b !== a
		}));
		var b = d(this);
		b.forEach(function(a, b) {
			a.nodeIndex = b
		})
	};
	function imgnodeanime(){
		if(!thislink.isremove){
			if(thislink.nodeA.outLinks){
				var xs=thislink.nodeA.cx- thislink.nodeZ.cx,
					xy=thislink.nodeA.cy- thislink.nodeZ.cy,
					l = Math.floor(Math.sqrt(xs * xs + xy * xy)),
					j=l;
				xl=xs/ l, yl=xy/l;
				var animespeed=(new Date()/aniSpeed);
				var colorpoint=parseInt(animespeed%l);
				imgnode.rotate=(Math.atan(xy/xs))+(xs>0?Math.PI:0);
				imgnode.cx=thislink.nodeA.cx-colorpoint*xl;
				imgnode.cy=thislink.nodeA.cy-colorpoint*yl;
				window.requestAnimationFrame(imgnodeanime);
			}
		}else{
			scene.remove(imgnode)
		}
	}
	window.requestAnimationFrame(imgnodeanime);
	scene.add(imgnode);
	return imgnode;
};
//连线上动画图片路径
var linkImagePath = PATH+"/topo/jtopo/img/link/linkImg2.png";
//从框选集合中过滤掉非节点（防止影响布局算法）
function getSelectedNodes(selectedNodes){
	var newSelectedNodes = new Array();
	for(var i= 0; i< selectedNodes.length; i++){
		var isNode = selectedNodes[i].isNode;
		//isNode= false代表是连线上的动画效果，布局时需过滤掉。
		if(selectedNodes[i].elementType == "node" && (typeof(isNode) == "undefined" || isNode != false)){
			newSelectedNodes[newSelectedNodes.length] = selectedNodes[i];
		}
	}
	return newSelectedNodes;
}

//测试效果
/*//var canvas = document.getElementById('canvas'); //舞台
//var stage = new JTopo.Stage(canvas);//场景
//var scene = new JTopo.Scene(stage);
var node = new JTopo.Node("Hello");
node.setLocation(10, 10);
scene.add(node);
var node2 = new JTopo.Node("Hello");
node2.setLocation(400, 200);
scene.add(node2);
var link1=new JTopo.Link(node,node2);
var arrownode=link1.drawanimepic(linkImagePath,scene);
link1.strokeColor="255,0,255";//圆边
scene.add(link1)*/