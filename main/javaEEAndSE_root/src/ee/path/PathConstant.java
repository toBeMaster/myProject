package ee.path;

import java.io.File;
import java.net.URL;

/**
 * 
 * 
 * 功能：常量定义
 * 
 */
public final class PathConstant {

	/**
	 * 工程目录
	 */
	public final static String PROJECT_DIR = PathConstant.getProjectDir();
	/**
	 * 路径目录
	 */
	public final static String PATH_DIR = PROJECT_DIR + "path/";
	/**
	 * 路径ID
	 */
	public final static String PATH_ID = "pathid";
	/**
	 * 关键字
	 */
	public final static String KEYWORD = "keyword";
	/**
	 * DWR 开始记录数
	 */
	public static final String DWR_START = "start";
	/**
	 * DWR 每页记录数
	 */
	public static final String DWR_LIMIT = "limit";
	/**
	 * 用户上传文件存放-目录
	 */
	public final static String XLS_PATH = PATH_DIR + "uploadFile/";
	/**
	 * TOMCAT 下级保存表格路径
	 */
	public final static String TOMCAT_XLS_PATH = "path/uploadFile/";
	/**
	 * 数据备份-目录
	 */
	public final static String DATABACKUP_DIR = PROJECT_DIR + "dataBackup/";
	/**
	 * 数据还原文件上传临时目录
	 */
	public static final String DATA_RESTORE_TMP_PATH = PROJECT_DIR
			+ "dataRestoreTmp/";

	/**
	 * 是否为Win系统
	 * 
	 * @return boolean
	 */
	public static boolean isWinSys() {
		boolean isWin = false;
		if (System.getProperty("os.name").toUpperCase().startsWith("WINDOWS")) {
			isWin = true;
		}
		return isWin;
	}

	/**
	 * 功能：得到工程目录
	 * 
	 * @return String 工程目录
	 */
	public static String getProjectDir() {
		String filePath = PathConstant.class.getProtectionDomain()
				.getCodeSource().getLocation().getPath();
		if (filePath.indexOf("WEB-INF") > 0) {
			int index = isWinSys() ? 1 : 0;
			filePath = filePath.substring(index,
					filePath.indexOf("WEB-INF/classes"));
		}
		return filePath;
	}

	/**
	 * 判断webapps 下有无该目录
	 * 
	 * @param directory
	 * @return boolean
	 */
	public static boolean isDirectory(String directory) {
		boolean isDirectory = false;
		String headpath = new PathConstant().getClass().getResource("")
				.toString();
		if (headpath.indexOf("webapps") > 0) {
			headpath = headpath.substring(headpath.indexOf("/"),
					headpath.indexOf("webapps"));
			String path = headpath + "webapps/" + directory;
			File file = new File(path);
			if (!file.exists()) {
				isDirectory = false;
			} else {
				File[] files = file.listFiles();
				if (files != null && files.length > 0) {
					isDirectory = true;
				} else {
					isDirectory = false;
				}
			}
		}

		return isDirectory;
	}
	//获取绝对路径
	public static String getRootPath() {
		 
		ClassLoader  cl = PathConstant.class.getClassLoader();
		URL url = cl.getResource("/");
		String classPath = url.getPath();
		String rootPath = "";
		// windows下
		if ("\\".equals(File.separator)) {
			rootPath = classPath.substring(1,
					classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("/", "\\");
		}
		// linux下
		if ("/".equals(File.separator)) {
			rootPath = classPath.substring(0,
					classPath.indexOf("/WEB-INF/classes"));
			rootPath = rootPath.replace("\\", "/");
		}
		return rootPath;
	}
}
