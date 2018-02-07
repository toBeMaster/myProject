package extension.broadcast;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

//服务器端接收程序
public class BroadcastServer
{
     public static void main(String[] args) 
     {
            int port = 9999;//开启监听的端口
            DatagramSocket ds = null;
            DatagramPacket dp = null;
            byte[] buf = new byte[1024];//存储发来的消息
            StringBuffer sbuf = new StringBuffer();
            try 
            {
                //绑定端口的
                ds = new DatagramSocket(port);
                dp = new DatagramPacket(buf, buf.length);
                System.out.println("监听广播端口打开：");
                ds.receive(dp);
                ds.close();
                int i;
                for(i=0;i<1024;i++)
                {
                    if(buf[i] == 0)
                    {
                        break;
                    }
                    sbuf.append((char) buf[i]);
                }           
                System.out.println("收到广播消息：" + sbuf.toString());
            }
            catch (Exception e) 
            {
                e.printStackTrace();
            } 
        }
}