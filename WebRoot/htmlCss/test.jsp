<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>
<%
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String solidPath = request.getRequestURI();
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  <title>路径设置</title>
  </head>
  
  <body>
    <%=basePath %><br>
    <%=path %><br> 
    <%=solidPath %><br>
    <%=application.getRealPath(request.getRequestURI()) %><br>
    <%=application.getRealPath("/") %><br>
    1:<img src="<%=basePath%>/img/router.png" /><br>
    2:<img src="<%=path%>/img/setting.png" /><br>
    3:<img src="img/01.png" /><br>
    4:<img src="./img/01.png" /><br>
    ${pageContext.request.contextPath }<br>
  </body>
</html>
