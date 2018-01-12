package ee.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.junit.Test;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

import ee.model.ResultMsgModel;

public class DataWrapper {
	/**
	 * 转换成json格式
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
	 * 转换成json格式o
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
		msg.setMsg("hello,你好");
		msg.setSuccess(true);
		msg.setObj(new Date());
		// 输出毫秒值
		System.out.println(JSON.toJSONString(msg));
		// 默认格式为yyyy-MM-dd HH:mm:ss
		System.out.println(JSON.toJSONString(msg,
				SerializerFeature.WriteDateUseDateFormat));
		// 根据自定义格式输出日期
		System.out.println(JSON.toJSONStringWithDateFormat(msg, "yyyy-MM-dd",
				SerializerFeature.WriteDateUseDateFormat));
	}
}
