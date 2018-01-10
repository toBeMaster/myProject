<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<%
	String JTOPO_PATH = PATH+"/topo/jtopo";
%>
<html>
<head>
<script>
		var PATH="<%=PATH%>";
</script>
<link rel="stylesheet" type="text/css" href="<%=PATH%>/topo/jtopo/css/rightlist.css">
<link rel="stylesheet" type="text/css" href="<%=PATH%>/topo/jtopo/css/controller.css">
<link rel="stylesheet" type="text/css"
	href="<%=PATH%>/css/login/login.css">
<link rel="stylesheet" type="text/css" href="<%=PATH %>/topo/jtopo/css/common.css" />

<script src="<%=JTOPO_PATH %>/js/topo/jtopo-0.4.8-min.js"></script>
<script src="<%=JTOPO_PATH %>/js/util/map.js"></script>
<script src="<%=JTOPO_PATH %>/js/base.js"></script>
<script src="<%=JTOPO_PATH %>/js/demoJs.js"></script>


<script type="text/javascript" src="<%=JS_PATH%>/styleConstant.js"></script>
<script type="text/javascript" src="<%=JS_PATH%>/unit/formatter.js"></script>
</head>
<body>
	<div id="pageController" class="pageController" style="display:none;">
		<div class="top" id="top" onclick="pageControllerTop()"></div>
		<div class="right" id="right" onclick="pageControllerRight()"></div>
		<div class="bottom" id="bottom" onclick="pageControllerBottom()"></div>
		<div class="left" id="left" onclick="pageControllerLeft()"></div>
		<div class="middle">
			<div class="add" id="pageControllerAddId" onclick="pageControllerAdd();" title=" +10%"  ></div>
			<div class="dec" id=pageControllerDecId onclick="pageControllerDec()" title=" -10%"  ></div>
		</div>
	</div>
	<div id="arcTip"
		style="position: absolute; top: 322px; left: 922px; display: none;z-index:10000;
		background: rgba(0,0,0,0.9);padding: 0px;;display: table-cell;font-family: '微软雅黑';color: #efefef;border-radius: 4px;">
	</div>
	<textarea name="textfield" id="textfield"
		onkeydown="if(event.keyCode==13)this.blur();"
		style="width: 60px; position: absolute; top: 322px; left: 922px; display: none;">
	</textarea>
	<ul id="contextmenu" style="display: none;height:auto;">
		<li style="border-bottom:1px solid #f0f0f0;"><a id="addNodesTopo">添加设备</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="addLinkTopo()">添加链路</a></li>
		<!-- <li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="linkStrategy()">链路策略</a></li> -->
		<li  style="border-bottom:1px solid #f0f0f0;"><a
			onclick="showControl()" id="showControlId">显示控制项</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="showHiddenTarget()">显示隐藏项</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a href="#">舞台模式 ></a>
				<ul>
					<li style="border-bottom:1px solid #f0f0f0;"><a onclick="changeMode('normal')">正常</a></li>
					<li><a onclick="changeMode('select')">框选</a></li>
				</ul>
		</li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="changeLayout()">改变布局</a></li>
		<li ><a
			onclick="setTopoAttr()">拓扑属性</a></li>
		
	</ul>
	<ul id="nodemenu" style="height:auto;">
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="gotoDetailPage(currentNode)">资源详情页</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="hideNode(currentNode)">隐藏节点</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="deleteNode(currentNode)">删除节点</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="editDistance('add')">增加距离</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="editDistance('decrease')">减小距离</a></li>
		<li> <a href="#">图元布局-></a>
				<ul>
					<li><a onclick="changeNodeLayout('top');">树形上</a></li>
					<li><a onclick="changeNodeLayout('bottom');">树形下</a></li>
					<li><a onclick="changeNodeLayout('left');">树形左</a></li>
					<li><a onclick="changeNodeLayout('right');">树形右</a></li>
					<li><a onclick="changeNodeLayout('circle');">圆形</a></li>
				</ul>
		</li>
	</ul>
	<ul id="linkmenu" style="display: none;">
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="hideLink(currentTarget)">隐藏链路</a></li>
		<li style="border-bottom:1px solid #f0f0f0;"><a
			onclick="deleteLink(currentTarget)">删除链路</a></li>
		<li><a onclick="swapLinkTopo(currentTarget)">交换链路上下行</a></li>
	</ul>
	<div id="dgPage" class="easyui-dialog" title="编辑框"
		style="width: 350px; height: 260px;"
		data-options="closed: true,resizable:true,modal:true"></div>

	<div id="topoTab" class="easyui-tabs" data-options="fit:true"
		style="width:98%;height:97.5%;">
		<div title="物理拓扑图" style="height:99%;width:100%;overflow-x:hidden;">
			<div class="easyui-panel" style="width:99%; ">
				<label style="margin-left: 10px;">拓扑名称：</label> 
					<input id="state"
					panelHeight="auto" style="width: 150px; height: 25px;"> <label
					style="color:#D3D3D3;">|</label> <a href="#"
					class="easyui-linkbutton" data-options="plain:true"
					iconCls="icon-topo-add" onclick="$('#addTopoDialog').dialog('open');" title="新建拓扑图"></a> <label
					style="color:#D3D3D3;">|</label> <a href="#"
					class="easyui-linkbutton" data-options="plain:true"
					iconCls="icon-topo-save" onclick="saveToJson();" title="保存拓扑图"></a>
				<label style="color:#D3D3D3;">|</label> <a id="nodetool" href="#"
					class="easyui-linkbutton" data-options="plain:true"
					iconCls="icon-topo-delete" onclick="deleteTopo()" title="删除拓扑图"></a>
				<span style="float:right;overflow:hidden;width:250px;"> <span
					style="overflow:hidden;width:100%;pxdisplay:inline-block;">
						<span id="toolbar" toolState="open" style="overflow:hidden;">
							<a href="#" class="easyui-linkbutton" data-options="plain:true"
							iconCls="icon-topo-eagleEye" onclick="setEagleEye();" title="鸟瞰图"></a>
							<label style="color:#D3D3D3;">|</label> 
							<a href="#"
							class="easyui-linkbutton" data-options="plain:true"
							iconCls="icon-topo-group" onclick="addContainer();" title="分组" style="display:none">
							</a>
							  <a href="#"
							class="easyui-linkbutton" data-options="plain:true"
							iconCls="icon-topo-bgset" onclick="updateBgTopo();" title="背景设置"></a>
							<label style="color:#D3D3D3;">|</label> <a id="nodetool" href="#"
							class="easyui-linkbutton" data-options="plain:true"
							iconCls="icon-topo-print" onclick="printPNG();" title="打印"></a> 
							<label
							style="color:#D3D3D3;">|</label> 
							<label><img alt="字体大小"
								src="<%=PATH%>/img/topo/icon/fontSize.png" title="字体大小"></label> <input
							id="fontSize" class="easyui-numberspinner">
					</span>
				</span> <a id="toolset" href="#" class="easyui-linkbutton"
					style="float:right;background:#F1F1F1 !important;"
					data-options="plain:true" iconCls="icon-set"
					onclick="changeToolbar();">工具</a>
				</span>

			</div>
			<div class="easyui-panel" style="width:99%; height:94.6%"
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
	<div id="showHiddenTargetDialog"  data-options="modal:true,buttons:'#showHiddenTargetDialog_button'" style="width:50%;height:50%;">
		<div class="easyui-tabs" data-options="" style="width:auto;height:95%;">
			<div title="隐藏设备">
				<iframe id="hiddenNodeJsp" src="hiddenNode.jsp" style="width:100%;height:99%;border-width:1 0 0 0;"></iframe>
			</div>
			<div title="隐藏链路">
				<iframe id="hiddenLinkJsp"  src="hiddenLink.jsp" style="width:100%;height:99%;border-width:1 0 0 0;"></iframe>
			</div>
		</div>
	</div>
	<div id="showHiddenTargetDialog_button">
		<input id="showHiddenTargetDialog_button_ok"  onclick="saveHiddenTarget()" type="button"
			value="确定" class="inputButtonStyle fontStyle"
			onmouseover="this.style.background='url(<%=PATH%>/img/login/button5.png)'"
			onmouseout="this.style.background='url(<%=PATH%>/img/login/button3.png)'">
		<input id="showHiddenTargetDialog_button_cancel"  type="button"
			value="取消" class="inputButtonStyle fontStyle" onclick="cancelHiddenTarget()"
			onmouseover="this.style.background='url(<%=PATH%>/img/login/button5.png)'"
			onmouseout="this.style.background='url(<%=PATH%>/img/login/button3.png)'">
	</div>
	<div id="setTopoAttrDialog" class="easyui-dialog"  data-options="modal:true,buttons:'#setTopoAttrDialog_button',closed:true,title:'拓扑属性'" style="width:30%;height:auto;">
		 <center class="center">
		 	<table>
		 		<!-- <tr>
		 			<td><label class="tableLabel">拓扑图名称：</label></td>
		 			<td><label><input type="text" class="easyui-textbox"  value="test"></label></td>
		 		</tr> -->
		 		 
		 		<tr>
		 			<td><label class=" tableLabel">设备标签：</label></td>
		 			<td>  
						<select id="deviceLabel" class="easyui-combobox" data-options="editable:false" style="width:86%;">
								<option value="name">名称</option>
								<option value="unitId">ip地址</option>
								<option value="short">缩略</option>
								<option value="none">无</option>
							</select>
					</td>
		 		</tr>
		 		<tr>
		 			<td><label class=" tableLabel">设备标签颜色：</label></td>
		 			<td>  
						<select id="deviceLabelColor" class="easyui-combobox" data-options="editable:false" style="width:86%;">
								<option value="0,0,0" selected>黑</option>
				        		<option value="48,146,224">蓝</option>
				       			<option value="190,22,35">红</option>
				       			<option value="255,255,255">白</option>
				       			<option value="190,190,190">灰</option>
				       			<option value="255,165,0">橙</option>
				       			<option value="26,162,68">绿</option>
							</select></td>
		 		</tr>
		 		<tr>
		 			<td><label class=" tableLabel">链路标签：</label></td>
		 			<td>  
						<select id="linkLabel" class="easyui-combobox" data-options="editable:false" style="width:86%;">
								<option value="name">链路id</option>
								<option value="upId">上行ip</option>
								<option value="downId">下行ip</option>
								<option value="none">无</option>
							</select>
					</td>
		 		</tr>
		 		<tr>
		 			<td><label class=" tableLabel">链路标签颜色：</label></td>
		 			<td> 
							<select id="linkLabelColor" class="easyui-combobox" data-options="editable:false" style="width:86%;">
								<option value="0,0,0" selected>黑</option>
				        		<option value="48,146,224">蓝</option>
				       			<option value="190,22,35">红</option>
				       			<option value="255,255,255">白</option>
				       			<option value="190,190,190">灰</option>
				       			<option value="255,165,0">橙</option>
				       			<option value="26,162,68">绿</option>
							</select> 
		 			 </td>
		 		</tr>
		 		<tr>
		 			<td><label class=" tableLabel">字体大小：</label></td>
		 			<td> 
							<input id="fontSizeText" class="easyui-numberspinner" style="width:86%;"
								data-options="required:true,
												increment:2,
												min:12,
												max:30,
												editable:true,
												value:12"	
							>
		 			 </td>
		 		</tr>
		 		<tr>
		 			<td><label class=" tableLabel">链路类型：</label></td>
		 			<td> 
							<select id="linkConnType" class="easyui-combobox" data-options="editable:false" style="width:86%;">
								<option value="FoldLink" selected>折线</option>
								<option value="Link" >直线</option>
							</select> 
		 			 </td>
		 		</tr>
		 	</table>
		 </center>
	</div>
	<div id="setTopoAttrDialog_button">
		<input id="setTopoAttrDialog_button_ok"  onclick="saveTopoAttr()" type="button"
			value="确定" class="inputButtonStyle fontStyle"
			onmouseover="this.style.background='url(<%=PATH%>/img/login/button5.png)'"
			onmouseout="this.style.background='url(<%=PATH%>/img/login/button3.png)'">
		<input id="setTopoAttrDialog_button_cancel"  type="button"
			value="取消" class="inputButtonStyle fontStyle" onclick="cancelTopoAttr()"
			onmouseover="this.style.background='url(<%=PATH%>/img/login/button5.png)'"
			onmouseout="this.style.background='url(<%=PATH%>/img/login/button3.png)'">
	</div>
	
	<script src="<%=JTOPO_PATH %>/js/topoPage.js"></script>
</body>
</html>