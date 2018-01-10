<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<html>
<head>
		<meta charset="utf-8">
		<title>JTOPO虚线流动demo</title>
		<script src="<%=PATH%>/easyuiV143/jquery.min.js"></script>
		<script src="<%=PATH%>/easyuiV143/jquery.easyui.min.js"></script>
		<script src="js/topo/jtopo-0.4.8-min.js"></script>
		
		<script type="text/javascript">
			 $(document).ready(function(){
				 CanvasRenderingContext2D.prototype.JTopoDashedLineTo = function(a, b, c, d, e) {
					 var animespeed= (new Date())/100;
					 "undefined" == typeof e && (e = 5);
					 var f = c - a,//x轴差
							 g = d - b,//y轴差
							 h = Math.floor(Math.sqrt(f * f + g * g)),//勾股定理,直线长度
							 i = 0 >= e ? h: h / e,//虚线段数
							 j = g / h * e,
							 k = f / h * e;
					 this.beginPath();
					 animespeed=animespeed%(e*2);
					 var txs=-f/h*animespeed;
					 var tys=-g/h*animespeed;
					 for (var l = 0; i > l; l++) {
						 l % 2 ? this.lineTo(a + l * k-txs, b + l * j-tys) : this.moveTo((a + l * k-txs)>(a+i*k)?(a + l * k):(a + l * k-txs), (b + l * j-tys)>(b + i * j)?(b + l * j):(b + l * j-tys))
					 };
					 this.stroke()
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
							 this.lineTo(a+i*xl,b+i*yl)
							 this.stroke();
						 }
					 }
				 };
            	var canvas = document.getElementById('canvas');   
            	//JTopo.createStageFromJson(stageJson, canvas);  
            	 
            	var stage = new JTopo.Stage(canvas);
            	var scene = new JTopo.Scene(stage);
            	scene.background = './img/topo/bg/test.jpg';
            	
            	var node1 = new JTopo.CircleNode("");                            
            	node1.radius = 24; // 半径
            	node1.alpha = 0.7;
            	node1.setLocation(400, 150);
            	scene.add(node1);
				
            	var node2 = new JTopo.CircleNode("");                            
            	node2.radius = 32; // 半径
            	node2.alpha = 0.7;
            	node2.setLocation(600, 400);
            	scene.add(node2);
            	
            	var node3 = new JTopo.CircleNode("");                            
            	node3.radius = 32; // 半径
            	node3.alpha = 0.7;
            	node3.setLocation(400, 300);
            	scene.add(node3);
            	
				JTopo.Animate.stepByStep(node1, 
                        {alpha: 0.5,
                            rotate:  1,
                            scaleX: 4,
                            scaleY: 4
                        }, 1000, true).start();
				
				JTopo.Animate.stepByStep(node2, 
                        {alpha: 0.5,
                            rotate:  1,
                            scaleX: 4,
                            scaleY: 4
                        }, 1000, true).start();
				
				JTopo.Animate.stepByStep(node3, 
                        {alpha: 0.5,
                            rotate:  1,
                            scaleX: 4,
                            scaleY: 4
                        }, 1000, true).start();
        });
        
		</script>
	</head>
	<body>
		<canvas width="1200" height="750"id="canvas">
		</canvas>
	</body>
</html>