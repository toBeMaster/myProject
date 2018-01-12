<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<body style="height:100%;">
<script src="js/addNodeDetail.js"></script>
<div id="tab" class="easyui-tabs" style="height:100%;border:0px;">
	<div data-options="title:'图元配置'" style="height:92%;" >
		<div class="easyui-layout" style="height:100%;border:0px;">
			<div data-options="region:'west',title:'备选设备',split:false" style="width:40%;border-bottom:0px;height:100%;">
				<span>
					<input id="searchParam" class="easyui-textbox" data-options="prompt:'输入名称或ip',readOnly:true" style="width:120px;height:28px">
					<a onclick="searchUnit()" class="easyui-linkbutton" data-options="iconCls:'icon-search'" style="width:30px"></a>				
					<a onclick="revert()" class="easyui-linkbutton" data-options=" " style="width:40px">还原</a>				
				</span>
				<ul id="unitTree" style="height:82%"></ul>
			</div>
	  		<div data-options="region:'center',title:'已选设备'" style="width:60%;padding:0px;background:#eee;border-bottom:0px;">
	  			<table id="unit" class="easyui-datagrid" data-options="fit:false"style="height:100%;"></table>
	  		</div>
		</div>
	</div>
</div>
</body>
 
