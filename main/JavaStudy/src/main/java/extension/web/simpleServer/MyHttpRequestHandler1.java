package extension.web.simpleServer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

/**
 * 将url上的参数相加
 * 
 * @author guoshaocheng
 * 
 */
class MyHttpRequestHandler1 implements Runnable {

	private Socket accept;

	public MyHttpRequestHandler1(Socket accept) {
		this.accept = accept;
	}

	@Override
	public void run() {

		System.out.println("接受到请求，开始处理");
		try {

			// 读取数据
			System.out.println("接受到请求,IP：" + accept.getRemoteSocketAddress());
			InputStream is = accept.getInputStream();
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
			String requestUrl = (split[0].split(" "))[1];
			System.out.println("请求路径为：" + requestUrl);
			String[] requestParams = requestUrl.split("\\?")[1].split("&");
			System.out.println("请求参数：" + requestParams);

			String responseContent = (Integer.valueOf(requestParams[0]))
					+ (Integer.valueOf(requestParams[1])) + "";
			System.out.println("返回内容为:\n" + responseContent);
			OutputStream oStream = accept.getOutputStream();
			oStream.write(responseContent.getBytes());

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (accept != null)
					accept.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

}