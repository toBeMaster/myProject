package se.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

/**
 * using the InputStreamReader And OutputStreamWriter
 */
class EncoderRW {
	public String read(String fileName,String charset) throws IOException {
		StringBuffer sb = new StringBuffer();
		/* 此处读文件时用了buffer，如果不用，性能损失一倍 */
		BufferedReader in = new BufferedReader(new InputStreamReader(
				new FileInputStream(fileName), charset));
		String s;
		while ((s = in.readLine()) != null) {
			sb.append(s);
			sb.append("\n");
		}
		in.close();
		return sb.toString();
	}
	public String read(String fileName) throws IOException {
		StringBuffer sb = new StringBuffer();
		InputStreamReader isr = new InputStreamReader(new FileInputStream(fileName));
		int s;
		while((s=isr.read())!=-1){
			sb.append((char)s);
		}
		isr.close();
		return sb.toString();
	}
	public void write(String fileName, String text) throws IOException {
		OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(
				fileName), "utf-8");
		out.write(text);
		out.flush();
		out.close();
	}
}

/**
 * using the BufferedReader And BufferedWriter
 */
class WriterReader {
	public String read(String fileName) throws IOException {
		StringBuffer sb = new StringBuffer();
		BufferedReader in = new BufferedReader(new FileReader(fileName));
		String s;
		while ((s = in.readLine()) != null) {
			sb.append(s);
			sb.append("\n");
		}
		in.close();
		return sb.toString();
	}

	public void write(String fileName, String text) throws IOException {
		PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(
				fileName)));
		out.print(text);
		out.close();
	}
}

/**
 * using the BufferedInputStream And BufferedOutputStream
 */
class BufferedStream {
	public byte[] read(String fileName) throws IOException {
		BufferedInputStream remoteBIS = new BufferedInputStream(
				new FileInputStream(fileName));
		ByteArrayOutputStream baos = new ByteArrayOutputStream(10240);
		byte[] buf = new byte[1024];
		int bytesRead = 0;
		while (bytesRead >= 0) {
			baos.write(buf, 0, bytesRead);
			bytesRead = remoteBIS.read(buf);
		}
		byte[] content = baos.toByteArray();
		remoteBIS.close();
		return content;
	}

	public void write(String fileName, byte[] content) throws IOException {
		BufferedOutputStream out = new BufferedOutputStream(
				new FileOutputStream(fileName));
		out.write(content);
		out.flush();
		out.close();
	}
}

public class TestIO {
	/**
	三种IO性能比较:
	在读写一个10k文件的时候，三种方式的耗时如下:
	InputStreamReader And OutputStreamWriter : 25ms (可以设置文件的编码;用buffer)
	InputStreamReader And OutputStreamWriter : 35ms (可以设置文件的编码;不用buffer)
	BufferedReader And BufferedWriter : 8ms 
	BufferedInputStream And BufferedOutputStream : 2ms
	*/
	public static void main(String[] args) throws IOException {
		long currentTime = System.currentTimeMillis();
		EncoderRW rw = new EncoderRW();
		rw.write("index.dat", rw.read("./src/com/wf/io/TestIO.java","utf-8"));
		System.out.println("cost time:"
				+ Long.toString(System.currentTimeMillis() - currentTime)
				+ " ms");
		
		/*currentTime = System.currentTimeMillis();
		rw = new EncoderRW();
		rw.write("index.dat", rw.read("./src/com/wf/io/TestIO.java"));
		System.out.println("cost time:"
				+ Long.toString(System.currentTimeMillis() - currentTime)
				+ " ms");*/
		
		currentTime = System.currentTimeMillis();
		WriterReader wr = new WriterReader();
		wr.write("index.dat", wr.read("./src/com/wf/io/TestIO.java"));
		System.out.println("cost time:"
				+ Long.toString(System.currentTimeMillis() - currentTime)
				+ " ms");

		currentTime = System.currentTimeMillis();
		BufferedStream bf = new BufferedStream();
		bf.write("index.dat", bf.read("./src/com/wf/io/TestIO.java"));
		System.out.println("cost time:"
				+ Long.toString(System.currentTimeMillis() - currentTime)
				+ " ms");
		System.out.println(TestIO.class.getResource("/").getPath());
		System.out.println(TestIO.class.getProtectionDomain().getCodeSource().getLocation().getPath());
	}
}
/*
 总结一：


java IO的一般使用原则：

一、按数据来源（去向）分类：

1、是文件： FileInputStream, FileOutputStream, FileReader, FileWriter

2、是byte[]：ByteArrayInputStream, ByteArrayOutputStream

3、是Char[]: CharArrayReader, CharArrayWriter

4、是String: StringBufferInputStream, StringReader, StringWriter

5、网络数据流：InputStream, OutputStream, Reader, Writer

二、按是否格式化输出分：

1、要格式化输出：PRintStream, PrintWriter

三、按是否要缓冲分：

1、要缓冲：BufferedInputStream, BufferedOutputStream, BufferedReader, BufferedWriter

四、按数据格式分：

1、二进制格式（只要不能确定是纯文本的）: InputStream, OutputStream及其所有带Stream结束的子类

2、纯文本格式（含纯英文与汉字或其他编码方式）；Reader, Writer及其所有带Reader, Writer的子类

五、按输入输出分：

1、输入：Reader, InputStream类型的子类

2、输出：Writer, OutputStream类型的子类

六、特殊需要：

1、从Stream到Reader,Writer的转换类：InputStreamReader, OutputStreamWriter

2、对象输入输出：ObjectInputStream, ObjectOutputStream

3、进程间通信：PipeInputStream, PipeOutputStream, PipeReader, PipeWriter

4、合并输入：SequenceInputStream

5、更特殊的需要：PushbackInputStream, PushbackReader, LineNumberInputStream, LineNumberReader



决定使用哪个类以及它的构造进程的一般准则如下（不考虑特殊需要）：

第一，考虑最原始的数据格式是什么：是否为文本？

第二，是输入还是输出?

第三，是否需要转换流：InputStreamReader, OutputStreamWriter?

第四，数据来源（去向）是什么：文件？内存？网络？

第五，是否要缓冲：bufferedReader （特别注明：一定要注意的是readLine()是否有定义，有什么比read, write更特殊的输入或输出方法）

第六，是否要格式化输出：print?





总结二：



首先是java的IO。这破东西可真费事，I/O类库常使用”流(stream)”这种抽象。所谓”流”是一种能生成或接受数据的，代表数据的源和目标的对象。流把I/O设备内部的具体操作给隐藏起来了。 正如JDK文档所显示的，Java的I/O类库分成输入和输出两大部分。所有InputStream和Reader的派生类都有一个基本的，继承下来的，能读取单个或byte数组的read( )方法。同理，所有OutputStream和Writer的派生类都有一个基本的，能写入单个或byte数组的write( )方法。但通常情况下，你是不会去用这些方法的；它们是给其它类用的 —— 而后者会提供一些更实用的接口。因此，你很少会碰到只用一个类就能创建一个流的情形，实际上你得把多个对象叠起来，并以此来获取所需的功能。Java的流类库之所以会那么让人犯晕，最主要的原因就是”你必须为创建一个流而动用多个对象”。


Java的IO类结构：
      根接口是InputStream/OutputStream，充当数据源的IO类有FileInputStream/FileOutputStream，ByteArrayInputStream  / ByteArrayOutputStream  等，充当装饰功能的IO类有BufferedInputStream  /   BufferedOutputStream，DataInputStream   /   DataOutputStream等，
     它们都是继承装饰接口FilterInputStream/FilterOutputStream。
      使用IO时，首先创建一个数据源IO，然后根据需要的功能创建装饰类IO，其构造函数的参数为已创建的数据源IO。
      我们以创建一个具有缓冲的文件输入流为例，假定需要从磁盘读取文件“C:\log.txt”：
      // 创建一个FileInputStream:
      FileInputStream fileInput = new FileInputStream(”C:\\log.txt”);
      // 创建一个BufferedInputStream:
      BufferedInputStream bufferedInput = new BufferedInputStream(fileInput);
     // 现在得到的bufferedInput即是具有缓冲的文件输入流
　　或者进一步简写如下：
     InputStream input = new BufferedInputStream(new FileInputStream(”C:\\log.txt”));
     // 现在得到的input即是具有缓冲的文件输入流




java.io.Reader 和 java.io.InputStream 区别
java.io.Reader 和 java.io.InputStream 组成了 Java 输入类。Reader 用于读入16位字符，也就是 Unicode 编码的字符；而 InputStream 用于读入 ASCII 字符和二进制数据。
在 Java 中，有不同类型的 Reader 输入流对应于不同的数据源：
    FileReader 用于从文件输入；
    CharArrayReader 用于从程序中的字符数组输入；
    StringReader 用于从程序中的字符串输入；
    PipedReader 用于读取从另一个线程中的 PipedWriter 写入管道的数据。
相应的也有不同类型的 InputStream 输入流对应于不同的数据源：FileInputStream，ByteArrayInputStream，StringBufferInputStream，PipedInputStream。另外，还有两种没有对应 Reader 类型的 InputStream 输入流：
    Socket 用于套接字；
    URLConnection 用于 URL 连接。
这两个类使用 getInputStream() 来读取数据。
相应的，java.io.Writer 和 java.io.OutputStream 也有类似的区别。


1、Java技术支持两种数据类型的流
InputStream和OutputStream：字节流。其它字节流都是InputStream或OutputStream的子类。
Reader和 Writer：字符流。其它字符流都是Reader或Writer的子类。


2、节点流
Java 2 SDK中有三种基本类型的节点：文件(file)、内存(memory)、管道(pipe)。


3、过程流
过程流在其它流之上，完成排序、变换等操作。过程流也被称做过滤流。
当你需要改变输入流的原始数据时，你可以将一个过滤输入流连接到一个原始的输入流上。
用过滤流将原始数据变换成你需要的格式。  


4、基本字节流类
4.1、FileInputStream和FileOutputStream
这两个节点流用来操纵磁盘文件。这些类的构造函数允许你指定它们所连接的文件。
要构造一个FileInputStream，所关联的文件必须存在而且是可读的。
如果你要构造一个FileOutputStream而输出文件已经存在，则它将被覆盖。
FileInputStream infile = new FileInputStream(”myfile.dat”);
FileOutputStream outfile = new FileOutputStream(”results.dat”);
4.1、 BufferInputStream和BufferOutputStream
这些是过滤器流，它们可以提高I/O操作的效率。
4.3、 PipedInputStream和PipedOutputStream
管道流用来在线程间进行通信。一个线程的PipedInputStream对象从另一个线程的PipedOutputStream对象读取输入。
要使管道流有用，必须有一个输入方和一个输出方。
4.4、 DataInputStream和DataOutputStream
这些过滤器通过流来读写Java基本类


5、 基本字符流类
图阐述了Reader和Writer字符流的体系结构。
5.1、InputStreamReader 和 OutputStreamWriter
用于字节流与字符流之间的转换接口。
当你构造一个InputStreamReader或OutputStreamWriter时，转换规则定义了16位Unicode和其它平台的特定表示之间的转换。
InputStreamReader从一个数据源读取字节，并自动将其转换成Unicode字符。
如果你特别声明，InputStreamReade会将字节流转换成其它种类的字符流。
OutputStreamWriter将字符的Unicode编码写到输出流，如果你的使用的不是Unicode字符，OutputStreamWriter会将你的字符编码转换成Unicode编码。
5.2.、缓冲读者和作者
因为在各种格式之间进行转换和其它I/O操作很类似，所以在处理大块数据时效率最高。
在InputStreamReader和OutputStreamWriter的结尾链接一个BufferedReader和BufferedWriter是一个好主意。
记住对BufferedWriter使用flush()方法。
5.3、 使用其它字符转换
如果你需要从一个非本地(例如，从连接到一个不同类型的机器的网络连接读取)的字符编码读取输入，
你可以象下面这个程序那样，使用显式的字符编码构造ir=new InputStreamReader(System.in,  “8859_1″);
注：如果你通过网络连接读取字符，就应该使用这种形式。
否则，你的程序会总是试图将所读取的字符当作本地表示来进行转换，而这并不总是正确的。ISO 8859-1是映射到ASCII的Latin-1编码模式。


6、 对象串行化
java.io.Serializable接口支持将一个Java技术对象存放到一个流中。
将一个对象存放到某种类型的永久存储器上称为”保持”。
如果一个对象可以被存放到磁盘或磁带上，或者可以发送到另外一台机器并存放到存储器或磁盘上，那么这个对象就被称为可保持的。
java.io.Serializable接口没有任何方法，它只作为一个”标记”，用来表明实现了这个接口的类可以串行化。
类中没有实现Serializable接口的对象不能被保持。
// 文件实现追加：
// 其中的FileWriter()中的第二个参数的含义是:是否在文件中追加内容
PrintWriter out = new PrintWriter(new FileWriter(logFileName, true), true);
Java读写文件最常用的类是FileInputStream/FileOutputStream和FileReader/FileWriter。
其中FileInputStream和FileOutputStream是基于字节流的，常用于读写二进制文件。
读写字符文件建议使用基于字符的FileReader和FileWriter，省去了字节与字符之间的转换。
但这两个类的构造函数默认使用系统的编码方式，如果文件内容与系统编码方式不一致，可能会出现乱码。
在这种情况下，建议使用FileReader和FileWriter的父类：InputStreamReader/OutputStreamWriter，
它们也是基于字符的，但在构造函数中可以指定编码类型：InputStreamReader(InputStream in, Charset cs) 和OutputStreamWriter(OutputStream out, Charset cs)。  





// 读写文件的编码：
InputStreamReader r = new InputStreamReader(new FileInputStream(fileName), “utf-8″);
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName),”utf-8″);
*/