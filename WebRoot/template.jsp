<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../inc/path.inc"%>
<%@ include file="../inc/head.inc"%>
<%
	UserDTO user = (UserDTO)request.getAttribute("user");
	String userId = null;
	if(user!=null){
		userId = user.getId();
	}
%>
<!DOCTYPE HTML>
<html style="width:100%;height:100%;">
  <head>
  <script src="<%=PATH %>/js/common.js"></script>
  <script src="<%=PATH %>/js/echarts.js"></script>
  <script>
  	var PATH = "<%=PATH%>";
	var userId = "<%=userId%>";
  </script>
  </head>
  <body style="width:100%;height:100%;">
  	  
  </body>
</html>
