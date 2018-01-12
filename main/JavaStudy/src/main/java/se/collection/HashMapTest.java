package se.collection;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

public class HashMapTest {
	@Test
	public void testHashMapPut(){
		Map<String,Object> params = new HashMap<String, Object>();
		String userId ="1";
		params.put("userId", userId);
		userId ="2";
		params.put("userId", userId);
		System.out.print("map:"+params.size());
	}
}
