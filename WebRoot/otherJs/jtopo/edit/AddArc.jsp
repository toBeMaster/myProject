<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>添加链路</title>
</head>
<body>

	<div class="easyui-tabs" style="width:100%;height:100%;">
		<div title="真实链路" style="width:100%;height:100%;">
			<center>
				<form id="addRealArcFrom" method="post">
					<input type="hidden" id="topoUpNodeId" name="arcDTO.upNodeId" value="${arcDTO.upNodeId}" />
					<input type="hidden" id="topoDownNodeId" name="arcDTO.downNodeId" value="${arcDTO.downNodeId}"/>
					<input type="hidden" id="topoUpNetPortId" name="arcDTO.upNetPortId"/>
					<input type="hidden" id="topoDownNetPortId" name="arcDTO.downNetPortId" />
					<input type="hidden" id="dgPagetopoId" name="arcDTO.topoId"/>
					
					<table style="font-family:'微软雅黑'; font-size: 12px;padding: 15px">
						<tr>
							<td><label>名称:</label>
							</td>
							<td><input class="easyui-textbox" style="width: 120px"
								data-options="prompt:'输入链路名称',required:true" name="arcDTO.name"/>
							</td>
							<td></td>
						</tr>

						<tr>
							<td><label>上联:</label>
							</td>
							<td><label id="upNodeName" style="width: 120px"></label>
							</td>
							<td><input id="upNodeNetPorts"   style="width: 150px"
								class="easyui-combobox" data-options="editable:false,panelHeight:'145',required:true,
							valueField:'targetId',textField:'text',
							url:'topo_getNetPortTreeByTyId?deviceId=${arcDTO.upId}'" />
							</td>
						</tr>
						<tr>
							<td><label>下联:</label>
							</td>
							<td><label id="downNodeName" style="width: 120px"></label>
							</td>
							<td><input id="downNodeNetPorts"    style="width: 150px"
							class="easyui-combobox" data-options="editable:false,panelHeight:'145',required:true,
							valueField:'targetId',textField:'text',url:'topo_getNetPortTreeByTyId?deviceId=${arcDTO.downId}'" />
							</td>
						</tr>
					</table>
				</form>
				<div style="margin-top: 17px">
					<a href="javascript:void(0)" style="margin-right: 20px"
						class="easyui-linkbutton" onclick="addTopoArc()">添加</a> <a
						href="javascript:void(0)" style="margin-left: 20px"
						class="easyui-linkbutton" onclick="closeTopoDgPage()">取消</a>
				</div>
			</center>

			<script type="text/javascript">
				var upNodeId = $("#topoUpNodeId").val();
				var downNodeId = $("#topoDownNodeId").val();
				$("#upNodeName").html(nodeMap.get(upNodeId).data.name);
				$("#downNodeName").html(nodeMap.get(downNodeId).data.name);
				function addTopoArc() {
					$("#topoUpNetPortId").val($('#upNodeNetPorts').combo('getValue'));
					$("#topoDownNetPortId").val($('#downNodeNetPorts').combo('getValue'));
					$("#dgPagetopoId").val(topoid);
					$("#addRealArcFrom").form('submit', {
						url : "topo_addTopoLink",
						onSubmit : function() {
							if ($(this).form("validate")) {
								$.messager.progress();
								return true;
							} else {
								return false;
							}
						},
						success : function(data) {
							$.messager.progress('close');
							closeTopoDgPage();
							loadTopo(topoid);
						}
					});
				}
			</script>
		</div>
	</div>
</body>
</html>
