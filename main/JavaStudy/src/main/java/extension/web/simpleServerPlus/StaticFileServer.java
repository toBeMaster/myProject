package extension.web.simpleServerPlus;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import se.util.base.FileUtil;
import se.util.base.PropsUtil;

/**
 * 静态文件服务器，使用浏览器可以访问指定文件
 * 参考帖子第一个case：http://tieba.baidu.com/p/5000244109?see_lz=1
 * 
 * @author guoshaocheng
 * 
 */
public class StaticFileServer {
	private static String baseDir = "D:\\";
	public static int PORT = 8096;
	public static void main(String[] args) {
		parseConfig();
		new StaticFileServer().service();

	}

	public void service() {

		System.out.println("静态文件服务器启动");
		ServerSocket serverSocket = null;
		try {
			serverSocket = new ServerSocket(PORT);
			// serverSocket.setSoTimeout(15000);
			while (true) {
				Socket accept = serverSocket.accept();
				new Thread(new MyHttpRequestHandler(accept,baseDir)).start();
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
		System.out.println("静态服务器关闭");
	}

	static void printBs(byte[] bs) {

		System.out.print("字节数据：");
		for (byte b : bs) {
			System.out.print(b + " ");
		}
	}
	
	 private static String getResourcePath() {
	        String className = StaticFileServer.class.getName();
	        String classNamePath = className.replace(".", "/") + ".class";
	        URL is = FileUtil.class.getClassLoader().getResource(classNamePath);
	        String path = is.getFile();
	        path = StringUtils.replace(path, "%20", " ");
	 
	        return StringUtils.removeStart(path, "/");
	    }
	 private static void parseConfig(){
		 PropsUtil propsUtil = new PropsUtil("conf.properties");
		 String portStr = propsUtil.getValueByKey("port");
		 String baseDirStr = propsUtil.getValueByKey("baseDir");
		 if(portStr!=null){
			 PORT = Integer.parseInt(portStr);
		 }
		 if(baseDirStr!=null){
			 baseDir = baseDirStr;
		 }
		 System.out.println("port:"+PORT);
		 System.out.println("baseDir:"+baseDir);
	 }
}