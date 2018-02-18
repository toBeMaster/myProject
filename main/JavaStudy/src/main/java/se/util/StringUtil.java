package se.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

import org.junit.Test;

public class StringUtil {
	public static String read(File src) {
		StringBuffer res = new StringBuffer();
		String line = null;
		try {
			BufferedReader reader = new BufferedReader(new FileReader(src));
			while ((line = reader.readLine()) != null) {
				res.append(line + "\n");
			}
			reader.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return res.toString();
	}

	public static boolean write(String cont, File dist) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(dist));
			writer.write(cont);
			writer.flush();
			writer.close();
			return true;
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}

	public static boolean replaceFile(String filePath, String regex,
			String newString) {
		File src = new File(filePath);
		String cont = StringUtil.read(src);
		// �Եõ������ݽ��д���
		cont = cont.replaceAll(regex, "");
		System.out.println(cont);
		// ����Դ�ļ�
		StringUtil.write(cont, src);
		return true;
	}
	@Test 
	public void optimizeJsxml(){
		String filePath = "resource/report/report2.jrxml";
		replaceFile(filePath,"(splitType=\"[a-zA-Z]{1,20}\")|(language=\"[a-zA-Z]{1,20}\")|(uuid=\"[0-9a-zA-Z\\-]{1,60}\")","");
	}
	@Test
	public void testSubstring(){
		String destFileConvertion ="/abc/ ";
		destFileConvertion =destFileConvertion.substring(0,destFileConvertion.lastIndexOf("/"));
		String parentDirectory = destFileConvertion.substring(0,destFileConvertion.lastIndexOf("/"));
		System.out.println("mm:"+parentDirectory);
	}
}
