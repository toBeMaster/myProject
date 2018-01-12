<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../inc/path.inc"%>
<%@ include file="../inc/head.inc"%>
<%
	String userId = (String)session.getAttribute("userId");
%>
<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
  <head>
  <script src="<%=PATH %>/js/defineConst.js"></script>
  <script src="<%=PATH %>/js/unit.js"></script>
  <style type="text/css">
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
  	var PAGE = finalConst({
 		type :"1001",
 		userId:"<%=userId%>"
 	});
  	$(function(){
  		$("#datagrid").datagrid({
  			url:PATH+"/videoITOMAction!getNetDeviceList.action",
  			fitColumns:true,
  			method:"post",
  			columns:[[
  			    {field:'id',hidden:true},
  			    {field:'name',title:'名称',width:100},
  			    {field:'sysName',title:'系统名称',width:100},
  			    {field:'ip',title:'IP',width:100,align:'center'},
  			  	{field:'unitTypeName',title:'类型',width:100},
  			  	{field:'highLevel',title:'最高异常等级',width:100,align:'center',formatter:alarmFormatter},
  			  	{field:'healthValue',title:'健康度',width:100,align:'center',formatter:percentFormatter },
  			  	{field:'averageCpuUseRadio',title:'平均cpu利用率',width:100,align:'center',formatter:percentFormatter },
  			  	{field:'averageMemUseRadio',title:'平均内存利用率',width:100,align:'center',formatter:percentFormatter },
  			  	{field:'icmpResponseTime',title:'ICMP响应时间',width:100,align:'right',formatter:covertTime},
  			  	{field:'portCount',title:'接口数',width:100,align:'center'},
  			  	{field:'managerName',title:'管理人',width:100},
  			  	{field:'connectCameraCount',title:'关联摄像头',width:100,align:'center' }
  			]],
  			tools:[{
  		        iconCls:'icon-set',
  		        handler:function(){
				
  		        }
  		    }]
  		});
  		var width =window.innerWidth*0.5;
  		var height =window.innerHeight*0.6;
  		$("#unitWindow").dialog({
  			title:"关联资源",
  			left:(window.innerWidth-width)*0.4,
  			top:(window.innerHeight-height)*0.4,
  			width:width,
  			height:height,
  			closed:false,
  			modal:true,
  			content:"<iframe id='unitIframe' class='xyfull' src='connectDevice.jsp?unitType="+PAGE.type+"'></iframe>",
  			buttons:[{
				text:'确定',
				handler:function(){ }
			},{
				text:'取消',
				handler:function(){ }
			}]
  		});
  	});
   
  </script>
  </head>
  <body class="xyfull">
  	  <div id="tooltip"></div>
  	  <div id="datagrid" style="width:100%;height:100%;" title="网络设备">
  	  </div>
  	  <div id="unitWindow" class="easyui-dialog"></div>
  </body>
</html>
