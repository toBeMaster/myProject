package ee.path;

import org.junit.Test;

public class PathTest {
	@Test
	public void test1(){
		String path = PathConstant.getProjectDir();
		System.out.println("path:"+path);
		path = PathConstant.getRootPath();
		System.out.println("path:"+path);
	}
}
