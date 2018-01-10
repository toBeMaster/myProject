<%@page import="com.nstrong.web.dto.base.UserDTO"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../inc/path.inc"%>
<%@ include file="../inc/head.inc"%>
<%
	String userId = (String)session.getAttribute("userId");
%>
<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
  <head>
  <script src="<%=PATH %>/js/unit.js"></script>
  <style type="text/css">
  	body{
		font-family:"Microsoft YaHei",SimSun;
	}
	.datagrid-row-selected {
	   background: #eaf2ff;
	}
	.tooltip{
		position:fiexed;
		background:#E9F2FF;
	}
	.tooltip-arrow-outer, .tooltip-arrow{
		border:0;
	}
  </style>
  <script>
  	var PATH = "<%=PATH%>";
	var userId = "<%=userId%>";
  </script>
  <script type="text/javascript">
  	$(function(){
  		$("#datagrid").datagrid({
  			url:PATH+"/videoITOMAction!getStorageDeviceList.action",
  			fitColumns:true,
  			method:"post",
  			columns:[[
  			    {field:'id',hidden:true},
  			    {field:'name',title:'名称',width:100},
  			    {field:'ip',title:'IP',width:100,align:'center'},
  			  	{field:'highLevel',title:'最高异常等级',width:100,align:'center',formatter:alarmFormatter },
  			  	{field:'healthPercent',title:'健康度',width:100,align:'center',formatter:percentFormatter},
  			  	{field:'useRadio',title:'使用率',width:100,align:'center' ,formatter:percentFormatter},
  			  	{field:'totalCapacity',title:'总容量',width:100,align:'center',formatter:covertByte},
  			  	{field:'usedCapacity',title:'使用容量',width:100,align:'center',formatter:covertByte},
  			  	{field:'unusedCapacity',title:'闲置容量',width:100,align:'center',formatter:covertByte},
  			  	{field:'managerName',title:'管理人',width:100},
  			  	{field:'connectCameraCount',title:'关联摄像头',width:100,align:'center' }
  			]]
  		});
  	});
  </script>
  </head>
  <body class="xyfull">
  	  <div id="tooltip"></div>
  	  <div id="datagrid" style="width:100%;height:100%;" title="存储设备">
  	  </div>
  </body>
</html>
