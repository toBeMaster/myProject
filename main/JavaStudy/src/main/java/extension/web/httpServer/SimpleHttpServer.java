package extension.web.httpServer;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

import javax.servlet.http.HttpServletRequest;
  
public class SimpleHttpServer {  
  
    //服务器入口处  
  // shutdown command  
  private static final String SHUTDOWN_COMMAND = "/SHUTDOWN";  
  
  // the shutdown command received  
  private boolean shutdown = false;  
  
  public static void main(String[] args) {  
       
    SimpleHttpServer server = new SimpleHttpServer();   
    server.await();  
  }  
  
  public void await() {  
    ServerSocket serverSocket = null;  //由于我们的服务器端要一直等待,所以用了ServerSocket这个类一直等待直到接收消息  
    int port = Constants.PORT;  
    String host = Constants.HOST;
    try {  
        //设置端口号及服务器主机地址  
      serverSocket =  new ServerSocket(port, 1, InetAddress.getByName(host));  
    }  
    catch (IOException e) {  
      e.printStackTrace();  
      System.exit(1);  
    }  
  
    // Loop waiting for a request  
    System.out.println("服务器已经启动！");
    while (!shutdown) {  
      Socket socket = null;  
      InputStream input = null;  
      OutputStream output = null;  
      try {  
          //一个服务器必须要有一个接收流对象与一个输出流对象  
        socket = serverSocket.accept();  
        input = socket.getInputStream();  
        output = socket.getOutputStream();  
        
        // create Request object and parse  
        Request request = new Request(input);  
        //解析浏览器中输入的网址  
        request.parse();  
  
        // create Response object  
        Response response = new Response(output);  
        response.setRequest(request);  
  
         
        //检查是否以"/servlet/"开头(也可以以其它字母开头再对应去处理，这便是动态处理)，否则处理静态资源  
        if (request.getUri()!=null&&request.getUri().startsWith("/servlet/")) {  
          ServletProcessor processor = new ServletProcessor();  
          processor.process(request, response);  
          
        }  
        else {  
          StaticResourceProcessor processor = new StaticResourceProcessor();  
          processor.process(request, response);  
        }  
  
        // Close the socket  
        socket.close();  
        //check if the previous URI is a shutdown command  
        if(request!=null&& request.getUri()!=null){
        	shutdown = request.getUri().equals(SHUTDOWN_COMMAND);  
        }
      }  
      catch (Exception e) {  
        e.printStackTrace();  
        System.exit(1);  
      }  
    }  
    System.out.println("服务器已经关闭！");
  }  
}  