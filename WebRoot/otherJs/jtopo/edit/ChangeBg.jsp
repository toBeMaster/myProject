<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>更换背景</title>
	</head>
	<body>
		<div style="width: 100%; height: 100%;">
			<table style="width: 100%; height: 80%;">
				<tr style="width: 100%; height: 50%;">
					<td>
						<img onclick="topoChangeBg('img/topo/bg/1.jpg')" width="64px"
							height="64px" src='img/topo/bg/1.jpg' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/2.png')" width="64px"
							height="64px" src='img/topo/bg/2.png' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/3.png')" width="64px"
							height="64px" src='img/topo/bg/3.png' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/4.png')" width="64px"
							height="64px" src='img/topo/bg/4.png' />
					</td>
				</tr>
				<tr style="width: 100%; height: 50%;">
					<td>
						<img onclick="topoChangeBg('img/topo/bg/5.jpg')" width="64px"
							height="64px" src='img/topo/bg/5.jpg' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/6.jpg')" width="64px"
							height="64px" src='img/topo/bg/6.jpg' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/7.png')" width="64px"
							height="64px" src='img/topo/bg/7.png' />
					</td>
					<td>
						<img onclick="topoChangeBg('img/topo/bg/5.png')" width="64px"
							height="64px" src='img/topo/bg/5.png' />
					</td>
				</tr>
			</table>
			<div style="padding: 5px; margin-left: 35%">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					onclick="submitForm()">确定</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					style="margin-left: 20px;" onclick="cancelForm()">取消</a>
			</div>
		</div>
		<script type="text/javascript">
var img, topobg = scene.background, falg = false;
function topoChangeBg(value) {
	scene.background = value;
	img = value;
}
function submitForm() {
	$.post('json/getTopoById.json', {
		'topoId' : topoid,
		'background' : img
	}, function(data) {
		falg = true;
		$("#dgPage").dialog("close");
		if (!data) {
			$.messager.alert('警告', '保存失败');
			return;
		}

	})
}
function cancelForm() {
	scene.background = topobg;
	$("#dgPage").dialog("close");
}
</script>
	</body>
</html>
