/**
 * 
 */
package  se.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**    
 *      
 * 项目名称：studyJava    
 * 类名称：TestDataStream    
 * 类描述：    
 * 创建人：魏峰    
 * 创建时间：2017年3月17日 下午5:12:19    
 * 修改人：魏峰     
 * 修改时间：2017年3月17日 下午5:12:19    
 * 修改备注：   
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
		  
		  String str="你好，hi";
		  dos.writeUTF(str);   //按UTF-8格式写入
		  dos.writeChars(str); //按字符写入
		  //按字节写入有两种方法，第一种方法只能适应无汉字的情况；
		  //因为方法1在写入时会把所有的字符都按1个字节写入，而汉字的表示需要2个字节，
		  //这就造成了数据的丢失，读入时就会出现乱码。
		  //而方法2在将字符串转换为字节数组时就把汉字字符变为了2个字节，
		  //写入文件的时候也会按2个字节的文字写入，这样读取的时候就不会出现问题
		  dos.writeBytes(str);//方法1：将整个字符串按字节写入
		  byte[] b=str.getBytes();
		  dos.write(b);  //方法2：将字符串转换为字节数组后再逐一写入
		  dos.close();
		  //按UTF-8格式读取
		  System.out.println(dis.readUTF());
		  //字符读取
		  char [] c=new char[4];
		  for(int i=0;i<4;i++){     
		   c[i]=dis.readChar();   //读取4个字符
		  }
		  System.out.print(new String(c,0,4));
		  System.out.println();
		  //字节读取
		  byte [] b1=new byte[4];
		  dis.read(b1); //读取4个字节
		  System.out.print(new String(b1,0,4));//输出时会出现乱码
		  System.out.println();
		  
		  byte [] b2=new byte[1024];
		  int len=dis.read(b2); //按字节读取剩余的内容
		  System.out.println(new String(b2,0,len));
		  dis.close();
	}
	/**
	   	注意1：一般情况下在读入时尽量按照写入时的格式进行读取，
			否则有可能会出现显示乱码或程序出现异常。
			如首先写入文件用的是writeUTF()，在读取的时候如果不是用readUTF()就会出现乱码，
			如果readUTF()读取的内容不是UTF-8格式的，程序就会抛出异常。
 
		注意2：如程序中注释所说，对于出现汉字字符的情况不能用writeBytes()，这会在写入文件时丢弃汉字字符的
			第一个字节从而在读取时出现错误。
 
		注意3：所有的读取方法都是共享一个位置指示器的，即在前面的read方法执行后，后面再执行其他read方法都是从上
			一个read方法读取到的位置开始向后读取的。如开始执行了1次readByte()后面的readChar是从第2个字节开始读的。
	 */
}
