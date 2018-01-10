/**
 * 
 */
package se.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**    
 *      
 * ��Ŀ��ƣ�studyJava    
 * ����ƣ�TestDataStream    
 * ��������    
 * �����ˣ�κ��    
 * ����ʱ�䣺2017��3��17�� ����5:12:19    
 * �޸��ˣ�κ��     
 * �޸�ʱ�䣺2017��3��17�� ����5:12:19    
 * �޸ı�ע��   
 * @version     
 *     
 */
public class TestDataStream {
	 public static void main(String[] args) throws Exception {
		  String path = "";
		  FileOutputStream fos=new FileOutputStream(path+"WebRoot/config/data.txt");
		  BufferedOutputStream bos=new BufferedOutputStream(fos);
		  DataOutputStream dos=new DataOutputStream(bos);
		  
		  FileInputStream fis=new FileInputStream("data.txt");
		  BufferedInputStream bis=new BufferedInputStream(fis);
		  DataInputStream dis=new DataInputStream(bis);
		  
		  String str="��ã�hi";
		  dos.writeUTF(str);   //��UTF-8��ʽд��
		  dos.writeChars(str); //���ַ�д��
		  //���ֽ�д�������ַ�������һ�ַ���ֻ����Ӧ�޺��ֵ������
		  //��Ϊ����1��д��ʱ������е��ַ�1���ֽ�д�룬���ֵı�ʾ��Ҫ2���ֽڣ�
		  //����������ݵĶ�ʧ������ʱ�ͻ�������롣
		  //��2�ڽ��ַ�ת��Ϊ�ֽ�����ʱ�ͰѺ����ַ��Ϊ��2���ֽڣ�
		  //д���ļ���ʱ��Ҳ�ᰴ2���ֽڵ�����д�룬�����ȡ��ʱ��Ͳ����������
		  dos.writeBytes(str);//����1��������ַ��ֽ�д��
		  byte[] b=str.getBytes();
		  dos.write(b);  //����2�����ַ�ת��Ϊ�ֽ����������һд��
		  dos.close();
		  //��UTF-8��ʽ��ȡ
		  System.out.println(dis.readUTF());
		  //�ַ��ȡ
		  char [] c=new char[4];
		  for(int i=0;i<4;i++){     
		   c[i]=dis.readChar();   //��ȡ4���ַ�
		  }
		  System.out.print(new String(c,0,4));
		  System.out.println();
		  //�ֽڶ�ȡ
		  byte [] b1=new byte[4];
		  dis.read(b1); //��ȡ4���ֽ�
		  System.out.print(new String(b1,0,4));//���ʱ���������
		  System.out.println();
		  
		  byte [] b2=new byte[1024];
		  int len=dis.read(b2); //���ֽڶ�ȡʣ�������
		  System.out.println(new String(b2,0,len));
		  dis.close();
	}
	/**
	   	ע��1��һ��������ڶ���ʱ��������д��ʱ�ĸ�ʽ���ж�ȡ��
			�����п��ܻ������ʾ������������쳣��
			������д���ļ��õ���writeUTF()���ڶ�ȡ��ʱ���������readUTF()�ͻ�������룬
			���readUTF()��ȡ�����ݲ���UTF-8��ʽ�ģ�����ͻ��׳��쳣��
 
		ע��2���������ע����˵�����ڳ��ֺ����ַ�����������writeBytes()�������д���ļ�ʱ�������ַ��
			��һ���ֽڴӶ��ڶ�ȡʱ���ִ���
 
		ע��3�����еĶ�ȡ�������ǹ���һ��λ��ָʾ���ģ�����ǰ���read����ִ�к󣬺�����ִ������read�������Ǵ���
			һ��read������ȡ����λ�ÿ�ʼ����ȡ�ġ��翪ʼִ����1��readByte()�����readChar�Ǵӵ�2���ֽڿ�ʼ���ġ�
	 */
}
