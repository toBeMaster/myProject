package ee.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

import ee.model.ResultMsgModel;

public class DataWrapper {
	/**
	 * 杞崲鎴恓son鏍煎紡
	 * 
	 * @param obj
	 */
	public static void putJson(Object obj, HttpServletResponse resp) {
		String json = JSON.toJSONString(obj,
				SerializerFeature.DisableCircularReferenceDetect);
		resp.setContentType("text/json;charset=utf-8");
		PrintWriter out = null;
		try {
			out = resp.getWriter();
			out.print(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 转换成json格式
	 * 
	 * @param obj
	 */
	public static void putJson(Object obj) {
		HttpServletResponse resp = ServletActionContext.getResponse();
		String json = JSON.toJSONString(obj,
				SerializerFeature.DisableCircularReferenceDetect);
		resp.setContentType("text/json;charset=utf-8");
		PrintWriter out = null;
		try {
			out = resp.getWriter();
			out.print(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testJsonDate() {
		ResultMsgModel msg = new ResultMsgModel();
		msg.setMsg("hello,浣犲ソ");
		msg.setSuccess(true);
		msg.setObj(new Date());
		// 杈撳嚭姣鍊�
		System.out.println(JSON.toJSONString(msg));
		// 榛樿鏍煎紡涓簓yyy-MM-dd HH:mm:ss
		System.out.println(JSON.toJSONString(msg,
				SerializerFeature.WriteDateUseDateFormat));
		// 鏍规嵁鑷畾涔夋牸寮忚緭鍑烘棩鏈�
		System.out.println(JSON.toJSONStringWithDateFormat(msg, "yyyy-MM-dd",
				SerializerFeature.WriteDateUseDateFormat));
	}
}
