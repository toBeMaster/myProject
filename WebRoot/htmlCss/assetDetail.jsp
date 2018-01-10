<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../../inc/path.inc"%>
<%@ include file="../../inc/head.inc"%>
<%
	String id = request.getParameter("id");
	String uuid=UUID.randomUUID().toString();
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>动态生成表单</title>

</head>
<body>

	<center>
		<table id="systemTable<%=uuid%>" class="systemTableClass"
			align="center" cellspacing="5">
			<tr>
				<td><lable>资产名称：</lable></td>
				<td><input id="assetName<%=uuid%>" class="easyui-textbox" /></td>
			</tr>
			<tr>
				<td><lable>资产编号：</lable></td>
				<td><input id="anum<%=uuid%>" class="easyui-textbox" /></td>
			</tr>
			<tr>
				<td><label>资产类型：</label></td>
				<td><select id="assetType<%=uuid%>" multiple></select></td>
				<td><label id="assetTypeTip<%=uuid%>"
					style="color:red;display:'none';"></label></td>
			</tr>
			<tr>
				<td><lable>使用状态：</lable></td>
				<td><select id="ustatus<%=uuid%>" class="easyui-combobox"
					name="unittype" style="width:180px"
					data-options="url: 'json/ustatus.json',method: 'get',valueField:'id',textField:'text',editable:false" />
				</td>
			</tr>
			<tr>
				<td><lable>厂商：</lable></td>
				<td><select id="manu<%=uuid%>" class="easyui-combobox"
					style="width:180px"
					data-options="url: 'getSupportManufatorTree',method: 'get',valueField:'value',textField:'text'" />
				</td>
			</tr>
			<tr>
				<td><lable>管理IP：</lable></td>
				<td><input id="ip<%=uuid%>" class="easyui-textbox" /></td>
			</tr>
			<tr>
				<td><lable>地域：</lable></td>
				<td><input id="areaid<%=uuid%>" class="easyui-textbox" /></td>
			</tr>
			<tr>
				<td><lable>管理人：</lable></td>
				<td><input id="manager<%=uuid%>" class="easyui-textbox" /></td>
			</tr>
			<tr>
				<td><lable>入库时间：</lable></td>
				<td><input id="intime<%=uuid%>" type="text"
					class="easyui-datebox" data-options="editable:false"> </input></td>
			</tr>
			<tr style=" ">
				<td>
					<label>父资产：</label>
				</td>
				<td>
					<input id="parentAsset<%=uuid%>" type="text" style="width:180px"
						class="easyui-combobox" 
						data-options=" url:'getParentAssetList', 
												valueField:'id',
			 									textField:'name'">
				</td>
			</tr>
		</table>
		<table id="comp_content<%=uuid%>" align="center" cellspacing="5">
		</table>
		<span><a href="#" class="easyui-linkbutton" iconCls="icon-save"
			onclick="saveUpdateAsset()">保存</a> </span>
	</center>

<script type="text/javascript">
var id="<%=id%>";
var uuid="<%=uuid%>";
var msg="test";
$(function(){
	$.ajax({
		url:'getAssetAttr',
		type:'post',
		data:{
			"id":id,
			"assetLevelType":2
		},
		success:function(data){
			createUpdateForm(data,uuid);
		}
	});
	$("#assetType"+uuid).combotree({
			 url:'getAssetType',
			 valueField:'id',
			 textField:'text',
			 checkbox:true,
			 width:240,
		 	 cascadeCheck:false,
			 onBeforeCheck:function(node,checked){
				 var id=node.id;
				 if(id=="a1000" || id=="a1001" || id=="a1002"){
					 return false;
				 }
			 },
			 onBeforeLoad:function(node, param){
					$('.tree-checkbox').unbind('click');
				},
			 onCheck : function(node, checked){
					//使其成为单选类型
					var cknodes = $(this).tree("getChecked");
					if (cknodes.length > 1) {
						for (var i = 0; i < cknodes.length; i++) {
							$(this).tree("uncheck", cknodes[i].target);
						}
						//再选中改节点
						$(this).tree("check", node.target);
						
					}
					
					//根据资产类型找到对应资产模板，并动态加载控件
					//过滤重复oncCheck事件
					if(cknodes.length == 1 && checked == true){		//选中某资产类型时
						//取值赋值
						 $("#comp_content"+uuid).html("");
						 var id=node.id;
						 var levelcode=node.attributes.levelcode;
						 var url="getAssetTemplateByAssetType";
						 
						 $.ajax({
							 url:url,
							 type:'post',
							 data:{
								 "assetTypeId":node.id
							 },
							 dataType:'json',
							 success:function(data){
								 if(data){
									 updateAssetForm(data);
								 }else{
									  $("#assetName"+uuid).textbox("setValue","");
									  $("#ustatus"+uuid).combobox("setValue","202");
									  $("#manu"+uuid).combobox("setValue","");
									  $("#ip"+uuid).textbox("setValue","");
									  $("#areaid"+uuid).textbox("setValue","");
									  $("#manager"+uuid).textbox("setValue","");
									  $("#intime"+uuid).datebox("setValue","");
									
								  	  $("#comp_content"+uuid).html("");
								 }
							 }
						 });
						 
					}else if(cknodes.length == 0 && checked == false){	//取消所有资产类型勾选时清空数据
						//TODO
					}
			 }  
		 });
	})
//更新输入框值
function updateAssetForm(data) {
			$("#comp_content"+uuid).html("");
			$("#comp_content"+uuid).attr("templateId",data.id);
			console.info("data:",data);
			if(!isNull(data.assetName)){
				$("#assetName"+uuid).textbox("setValue", data.assetName);
			}
			if(!isNull(data.ustatus)){
				$("#ustatus"+uuid).combobox("setValue", data.ustatus);
			}
			if(!isNull(data.manu)){
				$("#manu"+uuid).combobox("setValue", data.manu);
			}
			if(!isNull(data.ip)){
				$("#ip"+uuid).textbox("setValue", data.ip);
			}
			if(!isNull(data.areaid)){
				$("#areaid"+uuid).textbox("setValue", data.areaid);
			}
			if(!isNull(data.manager)){
				$("#manager"+uuid).textbox("setValue", data.manager);
			}
			if(!isNull(data.intimeStr)){
				$("#intime"+uuid).datebox("setValue", data.intimeStr);
			}
			if(data.templateAttrMap ){
		 		var formDatas = new Array();
				$.each(data.templateAttrMap, function(k, o) {
					var temp = {};
					temp.componentName = o.name;
					temp.componentTypeValue = o.elementType;
					temp.componentValue = o.value;
					temp.componentId = o.id;
					formDatas.push(temp);
				});
				createComponentContentLocal(formDatas);
		 	}
		}
//资产输入框赋值
function createUpdateForm(attr,uuid) {
	 	$("#anum" + uuid).textbox("setValue",attr.anum);
	 	$("#areaid" + uuid).textbox("setValue",attr.areaid);
	 	if(!attr.atype){
	 		attr.atype="";
	 	}
	 	$("#assetType" + uuid).combotree("setValue",attr.atype);
	 	$("#intime" + uuid).datebox("setValue",attr.intimeStr);
	 	$("#manu" + uuid).combobox("setValue",attr.manu);
	 	$("#ip" + uuid).textbox("setValue",attr.ip);
	  	$("#location" + uuid).textbox("setValue",attr.location);
		$("#manager" + uuid).textbox("setValue",attr.manager);
		$("#assetName" + uuid).textbox("setValue",attr.name);
	 	$("#ustatus" + uuid).combobox("setValue",attr.ustatus);
	 	
	 	$("#parentAsset"+uuid).combobox("setValue",attr.parentId);
	 	$("#comp_content"+uuid).html("");
	 	if(attr.attrMap){
	 		var formDatas = new Array();
			$.each(attr.attrMap, function(k, o) {
				if(!o.templateId){
					o.templateId="undefined";
				}
				$("#comp_content"+uuid).attr("templateId",o.templateId);
				var temp = {};
				temp.componentName = o.name;
				temp.componentTypeValue = o.elementType;
				temp.componentValue = o.value;
				temp.componentId = o.id;
				formDatas.push(temp);
			});
			createComponentContentLocal(formDatas);
	 	}
		
	} 
//保存更新操作
function saveUpdateAsset(){
	var assetNum= $("#anum" + uuid).textbox("getValue");
	var areaid= $("#areaid" + uuid).textbox("getValue");
  	var assetType= $("#assetType" + uuid).combotree("getValue");
	var intime= $("#intime" + uuid).datebox("getValue");
	var manu= $("#manu" + uuid).combobox("getValue" );
	var ip= $("#ip" + uuid).textbox("getValue" );
	var manager= $("#manager" + uuid).textbox("getValue" );
	var assetName= $("#assetName" + uuid).textbox("getValue" );
	var ustatus= $("#ustatus" + uuid).combobox("getValue" );
	var parentAsset=$("#parentAsset"+uuid).combobox("getValue");
	var templateId=$("#comp_content"+uuid).attr("templateId");
	 var dynamicAttrStr = getDynamicAttrStrLocal("comp_content"+uuid);
	var assetId=id;
 
	$.ajax({
		url:'updateAsset',
		type:'post',
		data:{
			  "id":assetId,
			  "dynamicAttrStr":dynamicAttrStr,
			  "parentAsset":parentAsset,
			  "templateId":templateId,
			  "assetNum":assetNum,
			  "assetType":assetType,
			  "assetName":assetName,
			  "ustatus":ustatus,
			  "manu":manu,
			  "ip":ip,
			  "areaid":areaid,
			  "manager":manager,
			  "intime":intime
		},
		success:function(data){
			$("#property_treegrid").treegrid("reload");
		}
	});
	
}
//生成组件内容，data是一个包含内容数据的对象
function createComponentContentLocal(data) {
	
	if (data == undefined || data.length == 0) {
		return;
	}
	$.each(data, function(K, element) {
		var $tr = $('<tr ></tr>');
		var $tdName = createTdName(element);
		var $tdType = createTdType(element);
		$tr.append($tdName).append($tdType);
		$("#comp_content"+uuid).append($tr);
	});
}

//获取自定义属性信息
function getDynamicAttrStrLocal(comp_contentId) {
	var dynamicAttrs = $("#"+comp_contentId+" tr td");
	var attrArray = new Array();
	for (var i = 1; i < dynamicAttrs.length; i += 2) {
		var $td = $(dynamicAttrs[i]);
		var componentAttr = $($td.children()[0]);
		var attr = new Object();
		attr.attrName = componentAttr.attr("componentName");
		attr.attrType = componentAttr.attr("componentType");
		attr.attrId = componentAttr.attr("id");
		attr.attrValue = $($td.children()[1]).children()[1].value;
		attrArray.push(attr);
	}
	return JSON.stringify(attrArray);
}
</script>
</body>
</html>
