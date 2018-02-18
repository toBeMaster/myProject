package se.util.base;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

/**
 * Java中Preperties配置文件工具类
 * 
 * @author shu
 * 
 */
public class PropsUtil {
	private String path = "";
	private Properties properties;

	/**
	 * 默认构造函数
	 */
	public PropsUtil() {
	}

	/**
	 * 构造函数
	 * 
	 * @param path
	 *            传入Properties地址值
	 */
	public PropsUtil(String path) {
		this.path = path;
	}

	/**
	 * 加载properties文件
	 * 
	 * @return 返回读取到的properties对象
	 */
	public Properties loadProps() {
		InputStream inStream = ClassLoader.getSystemResourceAsStream(path);
		try {
			if (inStream == null)
				throw new FileNotFoundException(path + " file is not found");
			properties = new Properties();
			properties.load(inStream);
			inStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return properties;
	}

	/**
	 * 将配置写入到文件
	 */
	public void writeFile() {
		// 获取文件输出流
		try {
			FileOutputStream outputStream = new FileOutputStream(new File(
					ClassLoader.getSystemResource(path).toURI()));
			properties.store(outputStream, null);
			outputStream.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 通过关键字获取值
	 * 
	 * @param key
	 * @return 返回对应的字符串，如果无，返回null
	 */
	public String getValueByKey(String key) {
		if (properties == null)
			properties = loadProps();
		String val = properties.getProperty(key.trim());
		return val;
	}

	/**
	 * 通过关键字获取值
	 * 
	 * @param key
	 *            需要获取的关键字
	 * @param defaultValue
	 *            若找不到对应的关键字时返回的值
	 * @return 返回找到的字符串
	 */
	public String getValueByKey(String key, String defaultValue) {
		if (properties == null)
			properties = loadProps();
		return properties.getProperty(key, defaultValue);
	}

	/**
	 * 获取Properties所有的值
	 * 
	 * @return 返回Properties的键值对
	 */
	public Map<String, String> getAllProperties() {
		if (properties == null)
			properties = loadProps();
		Map<String, String> map = new HashMap<String, String>();
		// 获取所有的键值
		Iterator<String> it = properties.stringPropertyNames().iterator();
		while (it.hasNext()) {
			String key = it.next();
			map.put(key, properties.getProperty(key));
		}
		/*
		 * Enumeration enumeration = properties.propertyNames(); while
		 * (enumeration.hasMoreElements()) { String key = (String)
		 * enumeration.nextElement(); String value = getValueByKey(key);
		 * map.put(key, value); }
		 */
		return map;
	}

	/**
	 * 往Properties写入新的键值且保存
	 * 
	 * @param key
	 *            对应的键
	 * @param value
	 *            对应的值
	 */
	public void addProperties(String key, String value) {
		if (properties == null)
			properties = loadProps();
		properties.setProperty(key, value);
		try {
			writeFile();
		} catch (Exception e) {
			throw new RuntimeException("write fail");
		}
	}

	/**
	 * 更新配置文件
	 * 
	 * @param key
	 *            对应的键
	 * @param value
	 *            对应的值
	 */
	public void update(String key, String value) {
		if (properties == null)
			properties = loadProps();
		if (properties.containsKey(key)){
			//properties.replace(key, value);
			properties.remove(key);
			properties.setProperty(key, value);
		}
			
		try {
			writeFile();
		} catch (Exception e) {
			throw new RuntimeException("write fail");
		}
	}

	/**
	 * 刪除某一鍵值对
	 * 
	 * @param key
	 */
	public void deleteByKey(String key) {
		if (properties == null)
			properties = loadProps();
		if (!properties.containsKey(key))
			throw new RuntimeException("not such key");
		properties.remove(key);
		try {
			writeFile();
		} catch (Exception e) {
			throw new RuntimeException("write fail");
		}
	}

	/**
	 * 设置path值
	 * 
	 * @param path
	 */
	public void setPath(String path) {
		this.path = path;
	}
}