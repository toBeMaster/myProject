package arithmetic;

import org.junit.Test;

public class PITest {
	public double getPI(long n){
		double PI;
		int sum=0;
		double x,y;
		for(int i=0;i<n;i++){
			x = Math.random();
			y = Math.random();
			if(x*x+y*y<=1){
				sum++;
			}
		}
		PI = 4.0*sum/n;
		return PI;
	}
	@Test
	public void test1(){
		System.out.println("Ô²ÖÜÂÊÊÇ£º"+getPI(5000000000l));
	}
}
