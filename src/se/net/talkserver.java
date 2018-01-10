package  se.net;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
public class talkserver
{
	public static void main(String args[])
	{
		try
		{
			ServerSocket server = null;
			try
			{
				server = new ServerSocket(4700);
			}catch(Exception e)
			{
				System.out.println("can not listen to:" + e);
			}
			Socket socket = null;
			try
			{
				socket = server.accept();
			}catch(Exception e)
			{
				System.out.println("Error:" + e);
			}
			String line;
			BufferedReader is = new BufferedReader(new InputStreamReader(
				socket.getInputStream()));
			PrintWriter os = new PrintWriter(socket.getOutputStream());
			BufferedReader sin = new BufferedReader(new InputStreamReader(System.in));
			System.out.println("Client:" + is.readLine());
			line = sin.readLine();
			while (!line.equals("bye"))	
			{
				os.println(line);
				os.flush();
				System.out.println("Server:" + line);
				System.out.println("Client:" + is.readLine());
				line = sin.readLine();
			}

			is.close();
			os.close();
			socket.close();
			server.close();
		}catch(Exception e)
		{
			System.out.println("Error" + e);
		}
	}
}
			