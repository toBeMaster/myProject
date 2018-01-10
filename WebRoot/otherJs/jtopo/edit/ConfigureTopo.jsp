<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>配置拓扑图</title>
  </head>
  <body>
  	<div style="width: 100%;height: 90%;">
  		<table id="topconfigdg" class="easyui-datagrid" data-options="url:'topo_getTopoUnitTree?id=${topology.id }'
  				,fit:true,fitColumns:true,pagination:true,onLoadSuccess:configOnloadSuccess">
  			<thead>
  				<tr>
  					<th data-options="field:'ck',checkbox:true"></th>
  					<th data-options="field:'id',hidden:true"></th>
  					<th data-options="field:'name',width:100,formatter:topoSourceName">资源名称</th>
  					<th data-options="field:'ip',width:100,align:'center'">IP地址</th>
  					<th data-options="field:'type',width:100,align:'center'">类型</th>
  				</tr>
  			</thead>
  		</table>
  	</div>
  	<center>
  	<div style="padding: 5px;">
  		
  			是否初始化:<input id="initializeid" type="checkbox" name="initialize"/>
		<a href="javascript:void(0)" class="easyui-linkbutton"
			onclick="saveTopoConfig()">确定</a>
		<a href="javascript:void(0)" class="easyui-linkbutton"
			style="margin-left: 20px;" onclick="closeTopoDgPage()">取消</a>
  		
	</div>
	</center>
	<script type="text/javascript">
		var flag=false;
		function saveTopoConfig(){
<%--			var selRows = $('#topconfigdg').datagrid('getChecked');  --%>
			if(document.getElementById("initializeid").checked){
				flag=true;
			}
			var rows = $("#topconfigdg").datagrid("getSelections");
			if(rows.length==0){
				$.messager.alert('警告','请选择至少一条');
				return;
			}
			var ids="";
			for(var i=0; i<rows.length;i++){
				if(i!=rows.length-1){
					ids+=rows[i].id+";"
				}else{
					ids+=rows[i].id
				}
			}
			$.post("topo_saveNodes",{"id":topoid,"unitIds":ids,"flag":flag},function(data){
				closeTopoDgPage();
				if(data){
					addNodeAndLink(topoid);
				}else{
					$.messager.alert('警告','系统错误');
				}
				
			})
		}
		function topoSourceName(value,row,index){
			var arr = value.split(";")
			var str = "<div><img src="+arr[0]+" /><lable>"+arr[1]+"</lable></div>";
			return str;
		}
		
		function configOnloadSuccess(data){
			for(var i=0;i<data.rows.length;i++){
				if(data.rows[i].checked){
					$('#topconfigdg').datagrid('selectRow',i);
				}
			}
		}
	</script>
  </body>
</html>
