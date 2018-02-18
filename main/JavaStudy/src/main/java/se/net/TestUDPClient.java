package se.net;

import java.net.*;
import java.io.*;

public class TestUDPClient {
	public static void main(String args[]) throws Exception {
		long n = 10002L;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		DataOutputStream dos = new DataOutputStream(baos);
		dos.writeLong(n);

		byte[] buf = baos.toByteArray();
		System.out.println(buf.length);

		DatagramPacket dp = new DatagramPacket(buf, buf.length,
				new InetSocketAddress("127.0.0.1",5678));
		DatagramSocket ds = new DatagramSocket(1234);//这里设置没有意义，数据包里面已经设置好了地址
		ds.send(dp);
		ds.close();

	}
}