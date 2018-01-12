/**
 * 
 */
package se.access;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author Administrator
 *
 */
public class MatchersDemo {
	public static void main(String[] args){
		p("a".matches("a."));
		p("aa".matches("a."));
		p("aab".matches("a?"));
		p("aa".matches("a*"));
		p("a".matches("[a-z&&[abc]]"));
		p("aa".matches("[a-z&&[abc]]*"));
		p("____________________________");
		p("3333".matches("\\d{3}"));
		p("\\".matches("\\\\"));
		p("A".matches("\\p{Lower}"));
		p("A".matches("\\p{Upper}"));
		p("____________________________");
		p("hello sir".matches("^h.llo.*"));
		
		Pattern p = Pattern.compile("\\d{3,5}");
		String s = "123-23423-234-00";
		Matcher m  = p.matcher(s);
		p(m.matches());//匹锟斤拷锟斤拷锟�锟斤拷锟斤拷锟揭碉拷锟侥斤拷尾
		m.reset(); // 锟斤拷锟斤拷锟斤拷锟街凤拷
		p(m.find());//锟揭碉拷一锟斤拷锟街达拷  锟斤拷锟斤拷锟揭碉拷锟侥斤拷尾
		p(m.start()+"-"+m.end());
		p(m.find());
		p(m.find());
		p(m.find());
		p("____________________________");
		p(m.lookingAt());//锟斤拷头锟斤拷
		p(m.lookingAt());
		p(m.lookingAt());
		p(m.lookingAt());
		
		p("____________________________");
		Pattern p1 = Pattern.compile("java",Pattern.CASE_INSENSITIVE);
		Matcher m1 = p1.matcher("java Java jaVa i love JaVa ");
		StringBuffer buf =new StringBuffer();
	//	m1.replaceAll("JAVA");
		int i=0;
		while(m1.find()){
			i++;
			if(i%2==0){
				m1.appendReplacement(buf, "java");
			}else {
				m1.appendReplacement(buf, "JAVA");
			}
		}
		p("____________________________");
		Pattern p2 = Pattern.compile("(\\d{3,5})([a-z]{2})");
		Matcher m2 = p2.matcher("234aw-21232fw-52521aa");
		while(m2.find()){
			p(m2.group(1));
		}
	}
	public static void p(Object o){
		System.out.println(o);
	}
}
