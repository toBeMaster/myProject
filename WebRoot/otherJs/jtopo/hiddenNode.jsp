<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		*{
			margin: 0;
			padding: 0;
		}
		html,body{
			width: 100%;
			height: 100%;
		}
		ul,li{
			list-style: none;
		}
		ul{
			overflow: hidden;
		}
		li{
			float: left;
			width: 125px;
			height: 100px;
			margin: 10px;
			font-size: 12px;
			border: 1px transparent solid;
			position: relative;
		}
		li input{
			position: absolute;
			left: 3px;
			top: 3px;
		}
		li img{
			width: 60px;
			height:60px;
			margin-left: 32.5px;
		}
		li span{
			display: block;
			text-align: center;
		}
	</style>
	<script>
		var PATH="<%=PATH%>";
</script>
</head>
<body>
	<ul id="box">
	</ul>
</body>
<script>

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
function loadData(){
	$("#box").html("");
	var hideNodeArray = parent.window.getHiddenNode();
	for(var i=0;i<hideNodeArray.length;i++){
		var name = hideNodeArray[i].name;
		var value = hideNodeArray[i].id;
		var img = getImgPathByUnitType(hideNodeArray[i].imgType);
		var temp ="<li><input type='checkbox' value='"+value+"'><img src='"+img+"' alt=''>"
			+"<p><span>"+name+"</span><span>"+value+"</span></p></li>";
		$("#box").append(temp);
	}
}
function getCheckedBox(){
	 var ids = "";
	  $("input:checkbox:checked").each(function(i) {
          if (0 == i) {
        	  ids = $(this).attr("value");
          } else {
        	  ids += ("," + $(this).attr("value"));
          }
      });
	  return ids;
}
function cancelChecked(){
	 $("input:checkbox:checked").each(function(i) {
		 $(this).prop("checked", false); 
     });
}
$(document).ready(function(){
	var $box=$('#box');
	var $cells=$box.children();
	$cells.hover(function(){
		alert(1);
		$(this).css({
			border:'1px #B7BBBD solid',
			background:'#D5D5D5'
		});
	},function(){
		$(this).css({
			border:'1px transparent solid',
			background:''
		});
	});
	
	loadData();
});
	
</script>
</html>