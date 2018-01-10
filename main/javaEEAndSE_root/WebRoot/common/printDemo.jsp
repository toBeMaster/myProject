<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'printDemo.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<style type="text/css">
@media print .b {
	display: none;
}
</style>
<style media="print">
.noprint {
	DISPLAY: none
}
</style>
<script type="text/javascript">
	function doPrint() {
		/* bdhtml=window.document.body.innerHTML; 
		sprnstr="<!--startprint-->"; 
		eprnstr="<!--endprint-->"; 
		prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17); 
		prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr)); 
		window.document.body.innerHTML=prnhtml;  */
		window.print();
	}
</script>
</head>

<body>
	<OBJECT id="WebBrowser" height="0" width="0"
		classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" VIEWASTEXT>
	</OBJECT>
	This is my JSP page.
	<br>
	<center class=noprint>hhhhhh</center>
	<span class="b"> 打印</span>
	<br>
	<input type="button" value="打印" onclick="doPrint()">
	<input type="button" value="直接打印">
	<input type="button" value="页面设置">
	<input type="button" value="打印预览">
	<INPUT type="button" value="关闭窗口">
</body>
</html>
