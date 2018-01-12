<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>  
<head>  
<meta http-equiv="imagetoolbar" c> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script language="javascript" src="print.js"></script>  
<style media="print">  
.noprint  {DISPLAY:  none;}  
</style>  
<title>打印测试</title>  
</head>  
<OBJECT id="factory" style="DISPLAY: none" codeBase="smsx.cab#VVersion=6,3,435,20"  classid="clsid:1663ed61-23eb-11d2-b92f-008048fdd814" viewastext></OBJECT>  
  
<script defer>  
function window.onload() {      
setPrintBase('页眉','页脚');  
}  
</script>  
<body topmargin="0" leftmargin="0" rightmargin="0" bottommargin="0" marginwidth="0" marginheight="0">  
<center class="noprint">  
<input type=button value="打印" onclick="print();">    
<input type=button value="页面设置" >    
<input type=button value="打印预览" >              
<input type="button" value="关闭" >  
</center>  
  <center>  
      <table width="100%" border="0" cellpadding="0" cellspacing="0">  
          <tr><td align="center"><b>内容</b></td></tr>  
      </table>  
    </center>  
</body>  
</html> 