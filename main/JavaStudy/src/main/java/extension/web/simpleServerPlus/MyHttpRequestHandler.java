package extension.web.simpleServerPlus;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;
import java.net.URLDecoder;

 
/**
 * 访问本地文件/目录
 * 
 * @author guoshaocheng
 * 
 */
class MyHttpRequestHandler implements Runnable {

	private Socket accept;
	private String baseDir;
	private String localhostAddress;

	public MyHttpRequestHandler(Socket accept,String baseDir) {
		this.accept = accept;
		this.baseDir = baseDir;
	}

	@Override
	public void run() {

		System.out.println("接受到请求，开始处理");
		BufferedReader bReader2 = null;
		try {
			// 读取数据
			System.out.println("接受到请求,IP：" + accept.getRemoteSocketAddress());
			InputStream is = accept.getInputStream();
			OutputStream oStream = accept.getOutputStream();
			InputStreamReader isReader = new InputStreamReader(is);
			BufferedReader bReader = new BufferedReader(isReader);
			StringBuilder sb = new StringBuilder();
			String bufferStr = null;
			
			System.out.println("------------------开始读取数据--------------------");
			int count = 0;
			while (!(((bufferStr = bReader.readLine()).equals("")) && count > 0)) {
				count++;
				sb.append(bufferStr);
				sb.append("\n");
				int index = bufferStr.indexOf("Host: ");
				if(index>=0){
					localhostAddress = bufferStr.substring(6);
				}
			}
			bufferStr = sb.toString();
			System.out.println("最终读取数据：\n" + bufferStr);

			// 返回数据
			System.out
					.println("\n\n\n------------------向浏览器返回数据---------------------");
			String[] split = bufferStr.split("\r");
			String destFile = (split[0].split(" "))[1];
			destFile  = URLDecoder.decode(destFile,"UTF-8");//中文转码
			System.out.println("请求路径为：" + destFile);
			String destFileConvertion = destFile.replace("/", "\\");

			// 读取文件内容
			String fileStr = "";//
			try {
				File file = new File(baseDir + destFileConvertion);
				if (file.isDirectory()) {
					fileStr ="<html/><head><meta charset='UTF-8'></head><body>";
					String tempPath = "" + destFile;
					if (!tempPath.endsWith("/")) {
						tempPath += "/";
					}
					if(tempPath.length()>1){
						fileStr +=  "<a href='http://"+localhostAddress+"/' target='_self'>.</a><br/>";
						String parentDirectory = tempPath.substring(0,tempPath.lastIndexOf("/"));
						parentDirectory = parentDirectory.substring(0,parentDirectory.lastIndexOf("/"));
						if (!parentDirectory.endsWith("/")) {
							parentDirectory += "/";
						}
						parentDirectory = "<a href='"+parentDirectory+"' target='_self'>..</a><br/>";
						fileStr += parentDirectory;
					}
					
					String[] list = file.list();
					for (String item : list) {
						if(item.indexOf("$")==0)continue;
						String targetType = "_self";
						if(item.lastIndexOf(".")>0){
							targetType = "_blank";
						}
						fileStr += "<a href='" + tempPath + item
								+ "'target='"+targetType+"'>" + item + "</a><br/>";
					}
					fileStr+= "</body></html>";
					
					// 返回
					System.out.println("返回内容为:\n" + fileStr);
					oStream.write(fileStr.getBytes());
					oStream.flush();
				} else {
					int BUFFER_SIZE =1024;
					byte[] bytes = new byte[BUFFER_SIZE];
					FileInputStream fis = null;
					try {
						// 根据我们Constant中指定目录与浏览器解析的地址去初始化一个文件。
						File file1 = new File(baseDir, destFile );
						fis = new FileInputStream(file1);
						int ch = fis.read(bytes, 0, bytes.length);
						while (ch != -1) {
							oStream.write(bytes, 0, bytes.length);
							ch = fis.read(bytes, 0, bytes.length);
							oStream.flush();
						}
						oStream.close();
					} catch (FileNotFoundException e) {
						String errorMessage ="<html><head><title>404</title></head><body><center style='padding-top:10%;'>";
						errorMessage += "HTTP/1.1 404 File Not Found<br/>"
								+ "Content-Type: text/html<br/>" + "Content-Length: 23<br/>"
						        + "<h1 style='color:red;'>File Not Found</h1>";
					 	errorMessage +=  "</center></body></html>";
						oStream.write(errorMessage.getBytes());
					} finally {
						if (fis != null)
							fis.close();
					}
				}
			} catch (FileNotFoundException e) {
				fileStr = "file not found!";
				oStream.write(fileStr.getBytes());
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (accept != null)
					accept.close();
				if (bReader2 != null) {
					bReader2.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

}