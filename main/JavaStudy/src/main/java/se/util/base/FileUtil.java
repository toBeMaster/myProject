package se.util.base;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

import org.apache.log4j.Logger;

/**
 * 文件操作类
 * 
 * @author 孙宇
 * 
 */
public class FileUtil {

	private static final Logger logger = Logger.getLogger(FileUtil.class);

	private static final int BUFFER = 1024;

	/**
	 * 功 能: 拷贝文件(只能拷贝文件)
	 * 
	 * @param strSourceFileName
	 *            指定的文件全路径名
	 * @param strDestDir
	 *            拷贝到指定的文件夹
	 * @return 如果成功true;否则false
	 */
	public boolean copyTo(String strSourceFileName, String strDestDir) {
		File fileSource = new File(strSourceFileName);
		File fileDest = new File(strDestDir);

		// 如果源文件不存或源文件是文件夹
		if (!fileSource.exists() || !fileSource.isFile()) {
			logger.debug("源文件[" + strSourceFileName + "],不存在或是文件夹!");
			return false;
		}

		// 如果目标文件夹不存在
		if (!fileDest.isDirectory() || !fileDest.exists()) {
			if (!fileDest.mkdirs()) {
				logger.debug("目录文件夹不存，在创建目标文件夹时失败!");
				return false;
			}
		}

		try {
			String strAbsFilename = strDestDir + File.separator + fileSource.getName();

			FileInputStream fileInput = new FileInputStream(strSourceFileName);
			FileOutputStream fileOutput = new FileOutputStream(strAbsFilename);

			logger.debug("开始拷贝文件:");

			int count = -1;

			long nWriteSize = 0;
			long nFileSize = fileSource.length();

			byte[] data = new byte[BUFFER];

			while (-1 != (count = fileInput.read(data, 0, BUFFER))) {

				fileOutput.write(data, 0, count);

				nWriteSize += count;

				long size = (nWriteSize * 100) / nFileSize;
				long t = nWriteSize;

				String msg = null;

				if (size <= 100 && size >= 0) {
					msg = "\r拷贝文件进度:   " + size + "%   \t" + "\t   已拷贝:   " + t;
					logger.debug(msg);
				} else if (size > 100) {
					msg = "\r拷贝文件进度:   " + 100 + "%   \t" + "\t   已拷贝:   " + t;
					logger.debug(msg);
				}

			}

			fileInput.close();
			fileOutput.close();

			logger.debug("拷贝文件成功!");
			return true;

		} catch (Exception e) {
			logger.debug("异常信息：[");
			logger.error(e);
			logger.debug("]");
			return false;
		}
	}

	/**
	 * 删除指定的文件
	 * 
	 * @param strFileName
	 *            指定绝对路径的文件名
	 * @return 如果删除成功true否则false
	 */
	public boolean delete(String strFileName) {
		File fileDelete = new File(strFileName);

		if (!fileDelete.exists() || !fileDelete.isFile()) {
			logger.debug("错误: " + strFileName + "不存在!");
			return false;
		}

		return fileDelete.delete();
	}

	/**
	 * 移动文件(只能移动文件)
	 * 
	 * @param strSourceFileName
	 *            是指定的文件全路径名
	 * @param strDestDir
	 *            移动到指定的文件夹中
	 * @return 如果成功true; 否则false
	 */
	public boolean moveFile(String strSourceFileName, String strDestDir) {
		if (copyTo(strSourceFileName, strDestDir))
			return this.delete(strSourceFileName);
		else
			return false;
	}

	/**
	 * 创建文件夹
	 * 
	 * @param strDir
	 *            要创建的文件夹名称
	 * @return 如果成功true;否则false
	 */
	public boolean makedir(String strDir) {
		File fileNew = new File(strDir);

		if (!fileNew.exists()) {
			logger.debug("文件夹不存在--创建文件夹");
			return fileNew.mkdirs();
		} else {
			logger.debug("文件夹存在");
			return true;
		}
	}

	/**
	 * 删除文件夹
	 * 
	 * @param strDir
	 *            要删除的文件夹名称
	 * @return 如果成功true;否则false
	 */
	public boolean rmdir(String strDir) {
		File rmDir = new File(strDir);
		if (rmDir.isDirectory() && rmDir.exists()) {
			String[] fileList = rmDir.list();

			for (int i = 0; i < fileList.length; i++) {
				String subFile = strDir + File.separator + fileList[i];
				File tmp = new File(subFile);
				if (tmp.isFile())
					tmp.delete();
				else if (tmp.isDirectory())
					rmdir(subFile);
				else {
					logger.debug("error!");
				}
			}
			rmDir.delete();
		} else
			return false;
		return true;
	}

}
