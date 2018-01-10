package se.covertType;

public class SonObject extends SuperObject {
	public int a = 3;
	public int c;
	private int d=5;
	public SonObject(){
		super();
	}
	/**
	 * @return the a
	 */
	public int getA() {
		return a;
	}
	/**
	 * @param a the a to set
	 */
	public void setA(int a) {
		this.a = a;
	}
	/**
	 * @return the c
	 */
	public int getC() {
		return c;
	}
	/**
	 * @param c the c to set
	 */
	public void setC(int c) {
		this.c = c;
	}
	/**
	 * @return the d
	 */
	public int getD() {
		return d;
	}
	/**
	 * @param d the d to set
	 */
	public void setD(int d) {
		this.d = d;
	}
	public SonObject(int a){
		super();
		super.a=a;
	}
	public void a1() {
	}

	public void a3() {
		System.out.println("hello");
	}
}
