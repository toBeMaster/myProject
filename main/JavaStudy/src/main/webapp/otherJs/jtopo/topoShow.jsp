<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<%
	String JTOPO_PATH = PATH+"/topo/jtopo";
%>
<!-- 此页面供大屏幕使用 -->
<html>
<head>

<link rel="stylesheet" type="text/css" href="<%=PATH%>/topo/jtopo/css/rightlist.css">
<link rel="stylesheet" type="text/css"
	href="<%=PATH%>/css/login/login.css">
<link rel="stylesheet" type="text/css" href="<%=PATH %>/topo/jtopo/css/common.css" />

<script src="<%=JTOPO_PATH %>/js/topo/jtopo-0.4.8-min.js"></script>
<script src="<%=JTOPO_PATH %>/js/util/map.js"></script>
<script src="<%=JTOPO_PATH %>/js/demoJs.js"></script>


<script type="text/javascript" src="<%=JS_PATH%>/styleConstant.js"></script>
<script type="text/javascript" src="<%=JS_PATH%>/unit/formatter.js"></script>
<style type="text/css">
	.panel-body{
		    background-color: transparent;
		    border-width:0;
	}
</style>
</head>
<body>
	<div id="arcTip"
		style="position: absolute; top: 322px; left: 922px; display: none;z-index:10000;
		background: rgba(0,0,0,0.9);padding: 0px;;display: table-cell;font-family: '微软雅黑';color: #efefef;border-radius: 4px;">
	</div>
	<textarea name="textfield" id="textfield"
		onkeydown="if(event.keyCode==13)this.blur();"
		style="width: 60px; position: absolute; top: 322px; left: 922px; display: none;">
	</textarea>
	<ul id="contextmenu" style="display: none;">
		<li style="border-bottom:1px solid #f0f0f0;"><a id="addNodesTopo">添加设备</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="addLinkTopo()">添加链路</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="changeLayout()">改变布局</a></li>
		<li><span style="width:100px;"> <a href="#">舞台模式 ></a>
				<ul>
					<li><a onclick="changeMode('normal')">正常</a></li>
					<li><a onclick="changeMode('select')">框选</a></li>
				</ul>
		</span></li>
	</ul>
	<ul id="nodemenu" style="display:none">
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="gotoDetailPage(currentNode)">资源详情页</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="deleteNode(currentNode)">删除节点</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="editDistance('add')">增加距离</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="editDistance('decrease')">减小距离</a></li>
		<li><span style="width:100px;"> <a href="#">图元布局</a>
				<ul>
					<li><a onclick="changeNodeLayout('top');">树形上</a></li>
					<li><a onclick="changeNodeLayout('bottom');">树形下</a></li>
					<li><a onclick="changeNodeLayout('left');">树形左</a></li>
					<li><a onclick="changeNodeLayout('right');">树形右</a></li>
					<li><a onclick="changeNodeLayout('circle');">圆形</a></li>
				</ul>
		</span></li>
	</ul>
	<ul id="linkmenu" style="display: none;">
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="deleteLink(currentTarget)">删除链路</a></li>
		<li><a onclick="swapLinkTopo(currentTarget)">交换链路上下行</a></li>
	</ul>
	<div id="dgPage" class="easyui-dialog" title="编辑框"
		style="width: 350px; height: 260px;"
		data-options="closed: true,resizable:true,modal:true"></div>

	<div id="topoTab"  data-options="fit:true"
		style="width:100%;height:100%;">
		<div title="物理拓扑图" style="height:100%;width:100%;overflow-x:hidden;">
			<div class="easyui-panel" style="width:100%; height:100%"
				id="topoDiv">
				<canvas style="width:100%; height:100%" id="topoPan"></canvas>
			</div>
		</div>
	</div>
	<div id="bb">
		<a href="#" class="easyui-linkbutton" onclick="saveContainer()">保存</a>
		<a href="#" class="easyui-linkbutton" onclick="closeContainer()">关闭</a>
	</div>
	<div id="addContainer" class="easyui-dialog"
		data-options="title:'添加分组',closed:true,modal:true,buttons:'#bb' ">
		<table>
			<tr>
				<td><label style="color:#000000">分组名称：</label></td>
				<td><input id="groupName" class="easyui-textbox"></td>
			</tr>
		</table>
	</div>

	<div id="addNodeDialog" class="easyui-dialog" style="overflow:hidden;"
		data-options="title:'添加图元',width:600,height:518,closed:true,modal:true,
		href:'addNodeDetail.jsp',
		buttons:'#addNodeDialog_button',
		onClose:function(){
			saveUnitStatus();
		}
		">

	</div>
	<div id="addNodeDialog_button" style="border:0">
		<input id="saveNodeConfig" onclick="saveNodeConfig()" type="button"
			value="保存" class="inputButtonStyle fontStyle"
			onmouseover="this.style.background='url(<%=PATH%>/img/login/button5.png)'"
			onmouseout="this.style.background='url(<%=PATH%>/img/login/button3.png)'">
	</div>
	<div id="addTopoDialog">
		<center>
			<form action="" id="addTopoForm" method="post" style="padding-top:20%;">
				<div>
					<label for="toponame">拓扑图名称:</label> 
					<input id="toponame"
						class="easyui-textbox" type="text" name="toponame"
						data-options="required:true" />
				</div>
			</form>
		</center>
		
	</div>
	<script src="<%=JTOPO_PATH %>/js/topoShow.js"></script>
	<script>
		var PATH="<%=PATH%>";
	</script>
</body>
</html>