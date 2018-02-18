package  se.net;

import java.net.*;
import java.io.*;

public class TCPServer {
	public static void main(String[] args) throws Exception {
		ServerSocket ss = new ServerSocket(6666);
		while (true) {
			Socket s = ss.accept();
			System.out.println("a client connect!\n"+s.getInetAddress().getHostAddress()+"/"+s.getInetAddress().getHostName());
			DataInputStream dis = new DataInputStream(s.getInputStream());
			System.out.println("test!");
			System.out.println("---"+dis.readUTF());
			dis.close();
			s.close();
		}

	}
}