/**
 * 
 */
package se.io;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.io.PrintWriter;

/**
 * 
 * ��Ŀ��ƣ�studyJava ����ƣ�PwAndPs �������� �����ˣ�κ�� ����ʱ�䣺2017��3��20�� ����3:15:08 �޸��ˣ�κ��
 * �޸�ʱ�䣺2017��3��20�� ����3:15:08 �޸ı�ע��
 * 
 * @version
 * 
 */
public class PwAndPs {
	public static void main(String[] args) {
		PwAndPs pp = new PwAndPs();
	//	pp.test1();
		pp.test2();
	}

	public void test1() {
		try {
			byte[] sim = { (byte) 0xbc, (byte) 0xf2, // ��
					(byte) 0xcc, (byte) 0xe5, // ��
					(byte) 0xd6, (byte) 0xd0, // ��
					(byte) 0xce, (byte) 0xc4 }; // ��
			InputStreamReader inputStreamReader = new InputStreamReader(
					new ByteArrayInputStream(sim), "GB2312");
			PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(
					System.out, "GB2312"));
			PrintStream printStream = new PrintStream(System.out, true,
					"GB2312");
			int in;
			while ((in = inputStreamReader.read()) != -1) {
				printWriter.print((char) in);
				printStream.print((char) in);
			}
			inputStreamReader.close();
			printWriter.close();
			printStream.close();
		} catch (ArrayIndexOutOfBoundsException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void test2() {
		try {
			String str ="h,��";
			InputStreamReader inputStreamReader = new InputStreamReader(
					new ByteArrayInputStream(str.getBytes()), "GB2312");
			PrintWriter printWriter = new PrintWriter(new OutputStreamWriter(
					System.out, "GB2312"));
			PrintStream printStream = new PrintStream(System.out, true,
					"GB2312");
			int in;
			while ((in = inputStreamReader.read()) != -1) {
				printStream.print((char) in);
				printStream.flush();
				printWriter.print((char) in);
			}
			
			inputStreamReader.close();
			printWriter.close();
			printStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}