package extension.tool;

import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.Test;

public class PrintUtil {
	private static Logger log =Logger.getLogger(PrintUtil.class);
	@Test
	public void test4j(){
		log.info("hh:"+new Date());
	}
}
