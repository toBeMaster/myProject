/**
 * 
 */
package se.thread;
/**
* 项目名称：StudyEEAndSE    
* 类名称：DoSomething    
* 类描述：    
* 创建人：魏峰    
* 创建时间：2017年5月10日 下午4:23:05      
* @version
 */
public class DoSomething implements Runnable {
	private String name;
	public DoSomething(String name){
		this.name=name;
	}
	@Override
	public void run() {
		for(int i=0;i<100;i++){
			System.out.println(name+":"+i);
		}
	}
}
class TestRunnable {
    public static void main(String[] args) {
        DoSomething ds1 = new DoSomething("阿三----------");
        DoSomething ds2 = new DoSomething("李四");

        Thread t1 = new Thread(ds1);
        Thread t2 = new Thread(ds2);

        t1.start(); 
        t2.start(); 
    } 
}