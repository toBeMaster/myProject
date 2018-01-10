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
		/* �˴����ļ�ʱ����buffer������ã�������ʧһ�� */
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
	����IO���ܱȽ�:
	�ڶ�дһ��10k�ļ���ʱ�����ַ�ʽ�ĺ�ʱ����:
	InputStreamReader And OutputStreamWriter : 25ms (���������ļ��ı���;��buffer)
	InputStreamReader And OutputStreamWriter : 35ms (���������ļ��ı���;����buffer)
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
 �ܽ�һ��


java IO��һ��ʹ��ԭ��

һ���������Դ��ȥ�򣩷��ࣺ

1�����ļ��� FileInputStream, FileOutputStream, FileReader, FileWriter

2����byte[]��ByteArrayInputStream, ByteArrayOutputStream

3����Char[]: CharArrayReader, CharArrayWriter

4����String: StringBufferInputStream, StringReader, StringWriter

5�������������InputStream, OutputStream, Reader, Writer

�������Ƿ��ʽ������֣�

1��Ҫ��ʽ�������PRintStream, PrintWriter

���Ƿ�Ҫ����֣�

1��Ҫ���壺BufferedInputStream, BufferedOutputStream, BufferedReader, BufferedWriter

�ġ�����ݸ�ʽ�֣�

1�������Ƹ�ʽ��ֻҪ����ȷ���Ǵ��ı��ģ�: InputStream, OutputStream�������д�Stream���������

2�����ı���ʽ������Ӣ���뺺�ֻ�������뷽ʽ����Reader, Writer�������д�Reader, Writer������

�塢����������֣�

1�����룺Reader, InputStream���͵�����

2�������Writer, OutputStream���͵�����

��������Ҫ��

1����Stream��Reader,Writer��ת���ࣺInputStreamReader, OutputStreamWriter

2���������������ObjectInputStream, ObjectOutputStream

3����̼�ͨ�ţ�PipeInputStream, PipeOutputStream, PipeReader, PipeWriter

4���ϲ����룺SequenceInputStream

5�����������Ҫ��PushbackInputStream, PushbackReader, LineNumberInputStream, LineNumberReader



����ʹ���ĸ����Լ���Ĺ����̵�һ��׼�����£�������������Ҫ����

��һ��������ԭʼ����ݸ�ʽ��ʲô���Ƿ�Ϊ�ı���

�ڶ��������뻹�����?

�����Ƿ���Ҫת������InputStreamReader, OutputStreamWriter?

���ģ������Դ��ȥ����ʲô���ļ����ڴ棿���磿

���壬�Ƿ�Ҫ���壺bufferedReader ���ر�ע����һ��Ҫע�����readLine()�Ƿ��ж��壬��ʲô��read, write���������������������

�����Ƿ�Ҫ��ʽ�������print?





�ܽ����



������java��IO�����ƶ���������£�I/O��ⳣʹ�á���(stream)�����ֳ�����ν��������һ������ɻ������ݵģ������ݵ�Դ��Ŀ��Ķ�������I/O�豸�ڲ��ľ�����������������ˡ� ����JDK�ĵ�����ʾ�ģ�Java��I/O���ֳ������������󲿷֡�����InputStream��Reader�������඼��һ����ģ��̳������ģ��ܶ�ȡ������byte�����read( )������ͬ�?����OutputStream��Writer�������඼��һ����ģ���д�뵥����byte�����write( )��������ͨ������£����ǲ���ȥ����Щ�����ģ������Ǹ��������õ� ���� ����߻��ṩһЩ��ʵ�õĽӿڡ���ˣ�����ٻ�����ֻ��һ������ܴ���һ���������Σ�ʵ������ðѶ����������������Դ�����ȡ����Ĺ��ܡ�Java�������֮���Ի���ô���˷��Σ�����Ҫ��ԭ����ǡ������Ϊ����һ�������ö�����󡱡�


Java��IO��ṹ��
      ��ӿ���InputStream/OutputStream���䵱���Դ��IO����FileInputStream/FileOutputStream��ByteArrayInputStream  / ByteArrayOutputStream  �ȣ��䵱װ�ι��ܵ�IO����BufferedInputStream  /   BufferedOutputStream��DataInputStream   /   DataOutputStream�ȣ�
     ���Ƕ��Ǽ̳�װ�νӿ�FilterInputStream/FilterOutputStream��
      ʹ��IOʱ�����ȴ���һ�����ԴIO��Ȼ������Ҫ�Ĺ��ܴ���װ����IO���乹�캯��Ĳ���Ϊ�Ѵ��������ԴIO��
      �����Դ���һ�����л�����ļ�������Ϊ��ٶ���Ҫ�Ӵ��̶�ȡ�ļ���C:\log.txt����
      // ����һ��FileInputStream:
      FileInputStream fileInput = new FileInputStream(��C:\\log.txt��);
      // ����һ��BufferedInputStream:
      BufferedInputStream bufferedInput = new BufferedInputStream(fileInput);
     // ���ڵõ���bufferedInput���Ǿ��л�����ļ�������
�������߽�һ����д���£�
     InputStream input = new BufferedInputStream(new FileInputStream(��C:\\log.txt��));
     // ���ڵõ���input���Ǿ��л�����ļ�������




java.io.Reader �� java.io.InputStream ���
java.io.Reader �� java.io.InputStream ����� Java �����ࡣReader ���ڶ���16λ�ַ�Ҳ���� Unicode ������ַ�� InputStream ���ڶ��� ASCII �ַ�Ͷ�������ݡ�
�� Java �У��в�ͬ���͵� Reader ��������Ӧ�ڲ�ͬ�����Դ��
    FileReader ���ڴ��ļ����룻
    CharArrayReader ���ڴӳ����е��ַ��������룻
    StringReader ���ڴӳ����е��ַ����룻
    PipedReader ���ڶ�ȡ����һ���߳��е� PipedWriter д��ܵ�����ݡ�
��Ӧ��Ҳ�в�ͬ���͵� InputStream ��������Ӧ�ڲ�ͬ�����Դ��FileInputStream��ByteArrayInputStream��StringBufferInputStream��PipedInputStream�����⣬��������û�ж�Ӧ Reader ���͵� InputStream ��������
    Socket �����׽��֣�
    URLConnection ���� URL ���ӡ�
��������ʹ�� getInputStream() ����ȡ��ݡ�
��Ӧ�ģ�java.io.Writer �� java.io.OutputStream Ҳ�����Ƶ����


1��Java����֧������������͵���
InputStream��OutputStream���ֽ����������ֽ�������InputStream��OutputStream�����ࡣ
Reader�� Writer���ַ����������ַ�������Reader��Writer�����ࡣ


2���ڵ���
Java 2 SDK�������ֻ����͵Ľڵ㣺�ļ�(file)���ڴ�(memory)���ܵ�(pipe)��


3�������
�������������֮�ϣ�������򡢱任�Ȳ����������Ҳ��������������
������Ҫ�ı���������ԭʼ���ʱ������Խ�һ���������������ӵ�һ��ԭʼ���������ϡ�
�ù�������ԭʼ��ݱ任������Ҫ�ĸ�ʽ��  


4�����ֽ�����
4.1��FileInputStream��FileOutputStream
�������ڵ����������ݴ����ļ�����Щ��Ĺ��캯��������ָ�����������ӵ��ļ���
Ҫ����һ��FileInputStream����������ļ�������ڶ����ǿɶ��ġ�
�����Ҫ����һ��FileOutputStream������ļ��Ѿ����ڣ�������ǡ�
FileInputStream infile = new FileInputStream(��myfile.dat��);
FileOutputStream outfile = new FileOutputStream(��results.dat��);
4.1�� BufferInputStream��BufferOutputStream
��Щ�ǹ������������ǿ������I/O������Ч�ʡ�
4.3�� PipedInputStream��PipedOutputStream
�ܵ����������̼߳����ͨ�š�һ���̵߳�PipedInputStream�������һ���̵߳�PipedOutputStream�����ȡ���롣
Ҫʹ�ܵ������ã�������һ�����뷽��һ���������
4.4�� DataInputStream��DataOutputStream
��Щ������ͨ��������дJava����


5�� ���ַ�����
ͼ������Reader��Writer�ַ�������ϵ�ṹ��
5.1��InputStreamReader �� OutputStreamWriter
�����ֽ������ַ���֮���ת���ӿڡ�
���㹹��һ��InputStreamReader��OutputStreamWriterʱ��ת����������16λUnicode������ƽ̨���ض���ʾ֮���ת����
InputStreamReader��һ�����Դ��ȡ�ֽڣ����Զ�����ת����Unicode�ַ�
������ر�������InputStreamReade�Ὣ�ֽ���ת��������������ַ�����
OutputStreamWriter���ַ��Unicode����д���������������ʹ�õĲ���Unicode�ַ�OutputStreamWriter�Ὣ����ַ����ת����Unicode���롣
5.2.��������ߺ�����
��Ϊ�ڸ��ָ�ʽ֮�����ת��������I/O���������ƣ������ڴ��������ʱЧ����ߡ�
��InputStreamReader��OutputStreamWriter�Ľ�β����һ��BufferedReader��BufferedWriter��һ�������⡣
��ס��BufferedWriterʹ��flush()������
5.3�� ʹ�������ַ�ת��
�������Ҫ��һ���Ǳ���(���磬�����ӵ�һ����ͬ���͵Ļ������������Ӷ�ȡ)���ַ�����ȡ���룬
����������������������ʹ����ʽ���ַ���빹��ir=new InputStreamReader(System.in,  ��8859_1��);
ע�������ͨ���������Ӷ�ȡ�ַ��Ӧ��ʹ��������ʽ��
������ĳ����������ͼ�����ȡ���ַ������ر�ʾ������ת�������Ⲣ��������ȷ�ġ�ISO 8859-1��ӳ�䵽ASCII��Latin-1����ģʽ��


6�� �����л�
java.io.Serializable�ӿ�֧�ֽ�һ��Java���������ŵ�һ�����С�
��һ�������ŵ�ĳ�����͵����ô洢���ϳ�Ϊ�����֡���
���һ��������Ա���ŵ����̻�Ŵ��ϣ����߿��Է��͵�����һ̨��������ŵ��洢��������ϣ���ô�������ͱ���Ϊ�ɱ��ֵġ�
java.io.Serializable�ӿ�û���κη�������ֻ��Ϊһ������ǡ�����������ʵ��������ӿڵ�����Դ��л���
����û��ʵ��Serializable�ӿڵĶ����ܱ����֡�
// �ļ�ʵ��׷�ӣ�
// ���е�FileWriter()�еĵڶ�������ĺ�����:�Ƿ����ļ���׷������
PrintWriter out = new PrintWriter(new FileWriter(logFileName, true), true);
Java��д�ļ���õ�����FileInputStream/FileOutputStream��FileReader/FileWriter��
����FileInputStream��FileOutputStream�ǻ����ֽ����ģ������ڶ�д�������ļ���
��д�ַ��ļ�����ʹ�û����ַ��FileReader��FileWriter��ʡȥ���ֽ����ַ�֮���ת����
����������Ĺ��캯��Ĭ��ʹ��ϵͳ�ı��뷽ʽ������ļ�������ϵͳ���뷽ʽ��һ�£����ܻ�������롣
����������£�����ʹ��FileReader��FileWriter�ĸ��ࣺInputStreamReader/OutputStreamWriter��
����Ҳ�ǻ����ַ�ģ����ڹ��캯���п���ָ���������ͣ�InputStreamReader(InputStream in, Charset cs) ��OutputStreamWriter(OutputStream out, Charset cs)��  





// ��д�ļ��ı��룺
InputStreamReader r = new InputStreamReader(new FileInputStream(fileName), ��utf-8��);
OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(fileName),��utf-8��);
*/