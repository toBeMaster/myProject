<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>修改名称</title>
</head>
<body>
	<div style="width: 100%;height: 100%">
		<center>
			<table style="padding: 11px;">
				<tr>
					<td><label>名称</label>
					</td>
					<td><input class="easyui-textbox" id="inputTopoName"
						style="width: 120px" data-options="prompt:'输入名称',required:true" />
					</td>
				</tr>
			</table>
			<div style="margin-top: 5px">
				<a href="javascript:void(0)" style="margin-right: 20px"
					class="easyui-linkbutton" onclick="doTopo()">修改</a> <a
					href="javascript:void(0)" style="margin-left: 20px"
					class="easyui-linkbutton" onclick="closeTopoDgPage()">取消</a>
			</div>
		</center>
		<script type="text/javascript">
			function doTopo() {
				var topoName = $('#inputTopoName').textbox('getValue');
				if (topoName == null || "" == topoName) {
					return;
				}
				$.ajax({
					type : "GET",
					url : "topo_topoRename?id=" + topoid+"&name="+topoName,
					success : function(a) {
						closeTopoDgPage();
					}
				});
			}
		</script>
	</div>

</body>
</html>
