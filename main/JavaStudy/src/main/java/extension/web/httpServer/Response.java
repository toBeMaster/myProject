package extension.web.httpServer;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.ServletResponse;

import se.util.base.FileUtil;


public class Response implements ServletResponse {

	private static final int BUFFER_SIZE = 1024;
	Request request;
	OutputStream output;
	PrintWriter writer;

	public Response(OutputStream output) {
		this.output = output;
	}

	public void setRequest(Request request) {
		this.request = request;
	}

	/* This method is used to serve a static page */
	public void sendStaticResource() throws IOException {
		byte[] bytes = new byte[BUFFER_SIZE];
		FileInputStream fis = null;
		try {
			// 根据我们Constant中指定目录与浏览器解析的地址去初始化一个文件。
			String requestURI = request.getUri();
			if(requestURI!=null){
				requestURI  = URLDecoder.decode(requestURI,"UTF-8");//中文转码
				File file = new File(Constants.WEB_ROOT,requestURI);
				String fileStr = "";
				if(file!=null){
					if(file.isDirectory()){
						fileStr ="<html/><head><title>资源列表</title><meta charset='UTF-8'></head><body>";//输出页面响应编码
						String tempPath = "" + requestURI;
						if (!tempPath.endsWith("/")) {
							tempPath += "/";
						}
						String[] list = file.list();
						for (String item : list) {
							fileStr += "<a href='" + tempPath + item
									+ "'target='_blank'>" + item + "</a><br/>";
						}
						fileStr+= "</body></html>";
						output.write(fileStr.getBytes());
					}else{
						/*if(request.getFileType().equals("text")){
							fileStr ="<html><head> <title></title></head><body style='color:green;'>";//输出页面响应编码
							output.write(fileStr.getBytes("utf-8"));
						}*/
						fis = new FileInputStream(file);
						int ch = fis.read(bytes, 0, BUFFER_SIZE);
						while (ch != -1) {
							output.write(bytes, 0, ch);
							ch = fis.read(bytes, 0, BUFFER_SIZE);
						}
						/*if(request.getFileType().equals("text")){
							fileStr= "</body></html>";
							output.write(fileStr.getBytes("utf-8"));
						}*/
					}
				}else{
					String errorMessage = "<h1 style='color:red;'>File Not Found</h1>";
					output.write(errorMessage.getBytes());
				}
			}
		
		} catch (FileNotFoundException e) {
			String errorMessage = "HTTP/1.1 404 File Not Found\r\n"
					+ "Content-Type: text/html\r\n" + "Content-Length: 23\r\n"
					+ "\r\n" + "<h1 style='color:blue;'>File Not Found</h1>";
			output.write(errorMessage.getBytes());
		} finally {
			if (fis != null)
				fis.close();
		}
	}

	@Override
	public String getCharacterEncoding() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getContentType() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServletOutputStream getOutputStream() throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrintWriter getWriter() throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setCharacterEncoding(String charset) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setContentLength(int len) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setContentType(String type) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setBufferSize(int size) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public int getBufferSize() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void flushBuffer() throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void resetBuffer() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isCommitted() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void reset() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setLocale(Locale loc) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Locale getLocale() {
		// TODO Auto-generated method stub
		return null;
	}
}