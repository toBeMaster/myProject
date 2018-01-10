<%@page contentType="text/html" pageEncoding="UTF-8"%>  
<!DOCTYPE html>  
<html>  
    <head>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
        <title>JSP Page</title>  
        <script src="<%=request.getContextPath()%>/dwr/engine.js"></script>  
        <script src="<%=request.getContextPath()%>/dwr/interface/Hello.js"></script>  
          
        <script>  
             Hello.sayHello("张三",function(res){
            	 console.log("res:",res);
             });  
        </script>  
    </head>  
    <body>  
        <h1>Hello World!</h1>  
    </body>  
</html> 