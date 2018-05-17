package extension.web.simpleServer;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

/**
 * 访问本地文件/目录
 * 
 * @author guoshaocheng
 * 
 */
class MyHttpRequestHandler implements Runnable {

	private Socket accept;

	public static final String baseDir = "D:\\";

	public MyHttpRequestHandler(Socket accept) {
		this.accept = accept;
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
				// printBs(bufferStr.getBytes());
				// System.out.println("读到的数据：" + bufferStr);
				sb.append("\n");
			}
			bufferStr = sb.toString();
			System.out.println("最终读取数据：\n" + bufferStr);

			// 返回数据
			System.out
					.println("\n\n\n------------------向浏览器返回数据---------------------");
			String[] split = bufferStr.split("\r");
			String destFile = (split[0].split(" "))[1];
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
					String[] list = file.list();
					for (String item : list) {
						fileStr += "<a href='" + tempPath + item
								+ "'target='_blank'>" + item + "</a><br/>";
					}
					fileStr+= "</body></html>";
					
				} else {
					FileReader fReader = new FileReader(file);
					bReader2 = new BufferedReader(fReader);
					char[] cs = new char[1024];
					int len = 0;
					while (-1 != (len = bReader2.read(cs))) {
						fileStr = fileStr + new String(cs, 0, len);
					}
				}
			} catch (FileNotFoundException e) {
				fileStr += "file not found!";
			}
			// 返回
			System.out.println("返回内容为:\n" + fileStr);
			oStream.write(fileStr.getBytes());
			oStream.flush();
			is.close();
			isReader.close();
			bReader.close();
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