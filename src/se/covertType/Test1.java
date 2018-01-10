package se.covertType;

import org.junit.Test;

public class Test1 {
	@Test
	public void test1(){
		SuperObject o= new SuperObject();
		o= new SonObject(5);
		System.out.println(o.a);
		((SonObject)o).a3();
		System.out.println(((SonObject)o).a);
	}
	@Test
	public void test2(){
		SonObject son = new SonObject(4);
		son.setD(10);
		System.out.println(son.getD());
		SuperObject su = (SuperObject)son;
		System.out.println(su.getD());
	}
}
