package extension.web.simpleServer;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * 静态文件服务器，使用浏览器可以访问指定文件
 * 参考帖子第一个case：http://tieba.baidu.com/p/5000244109?see_lz=1
 * 
 * @author guoshaocheng
 * 
 */
public class StaticFileServer {

	public static void main(String[] args) {

		new StaticFileServer().service();

	}

	public void service() {

		System.out.println("静态文件服务器启动");
		ServerSocket serverSocket = null;
		try {
			serverSocket = new ServerSocket(8080);
			// serverSocket.setSoTimeout(15000);
			while (true) {
				Socket accept = serverSocket.accept();
				new Thread(new MyHttpRequestHandler(accept)).start();
				//new Thread(new MyHttpRequestHandler1(accept)).start();
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (serverSocket != null) {
				try {
					serverSocket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		System.out.println("静态服务器结束");
	}

	static void printBs(byte[] bs) {

		System.out.print("字节数据：");
		for (byte b : bs) {
			System.out.print(b + " ");
		}
	}
}