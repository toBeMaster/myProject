package arithmetic;

import org.junit.Test;

public class NumberUnitl {
	public static int getNumBit(int num){
		int c =1;
		for(;num/10>0;c++,num/=10){
		}
		return c;
	}
	public static int getNumBit1(int num){
		int c =1;
		c = (int)Math.floor(Math.log(num)/Math.log(10))+1;
		return c;
	}
	
	@Test
	public void test1(){
		int c =getNumBit1(1324);
		System.out.println(c);
	}
}