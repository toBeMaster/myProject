<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
    <title>拓扑图</title>
	<link rel="stylesheet" type="text/css" href="../../easyuiV143/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="../../easyuiV143/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="css/common.css"/>
	
	<script src="../../easyuiV143/jquery.min.js"></script> 
	<script src="../../easyuiV143/jquery.easyui.min.js"></script>
	<script src="js/demoJs.js"></script>
  </head>
  <body>
   <div>
	   <table>
		   	<tr>
		   		<td><img onclick="changeImg(1)" width="260px"height="140px" src='img/topo/bg/1.png' /></td>
		   		<td><img onclick="changeImg(2)" width="260px"height="140px" src='img/topo/bg/2.png' /></td>
		   	</tr>
	   		<tr>
	   			<td><img onclick="changeImg(3)" width="260px"height="140px" src='img/topo/bg/3.png' /></td>
	   			<td><img onclick="changeImg(4)" width="260px"height="140px" src='img/topo/bg/4.png' /></td>
	   		</tr>
	   </table>
	   <div style="padding: 20px; margin-left: 35%">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					onclick="submit()">确定</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					style="margin-left: 20px;" onclick="cancel()">取消</a>
			</div>
   </div>
  <script type="text/javascript">
  var img = scene.background;
  var BGcolor;
   function changeImg(value){
	  // BGcolor = "img/topo/bg/"+value+".png";
	   BGcolor = "<%=path%>"+"/img/topo/jtopo/img/bg/"+value+".png";
	   scene.background = BGcolor;
   }
   function submit(){
	   $("#dgPage").dialog("close");
	   saveToJson();
   }
   function cancel(){
	   scene.background = img;
	   $("#dgPage").dialog("close");
   }
   </script>
  </body>
</html>
