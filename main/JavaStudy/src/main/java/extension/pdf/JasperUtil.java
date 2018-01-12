package extension.pdf;

import java.io.File;
import java.io.OutputStream;
import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.base.JRBaseReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.JRXlsExporterParameter;
import net.sf.jasperreports.engine.util.JRLoader;

import org.junit.Test;

import se.util.StringUtil;

/**
 * func:PDF生成相关的工具类. desc:可以将jrxml文件转成jasper或者pdf文件. depend JAR:
 * itext-2.1.7.jar; groovy-all-1.5.5.jar; iTextAsian-2.1.jar;
 * commons-digester-2.1.jar jarperreports-3.5.0.jar;
 * commons-collections-3.2.1.jar jaxen-1.1-beta-4.jar; jxl-2.6.jar ...
 * 不懂请百度，出错也百度基本是版本不兼容才会出错. ireport：5.6.0
 * 导出的jrxml文件不兼容，需要更改uuid和splittype,后续我将直接在这个类里面实现转换. 问题解决：删除语言指定的groovy 删除uuid
 * 产出splittype. author:weifeng date:2017-08-16
 */
public class JasperUtil {
	public static final String JRXML_SUFFIX = ".jrxml";
	public static final String JASPER_SUFFIX = ".jasper";
	public static final String PDF_SUFFIX = ".pdf";

	/**
	 * 将jsxml转换成 jasper
	 * 
	 * @param jrxmlSourcePath
	 * @param jrxmlDestSourcePath
	 */
	public static boolean jsxmlToJasper(String jrxmlSourcePath,
			String jrxmlDestSourcePath) {
		boolean flag = false;
		if (jrxmlSourcePath == null
				|| !jrxmlSourcePath.endsWith(JasperUtil.JRXML_SUFFIX)) {
			return flag;
		}
		if (jrxmlDestSourcePath == null) {
			jrxmlDestSourcePath = jrxmlSourcePath.substring(0,
					jrxmlSourcePath.length() - 6)
					+ JasperUtil.JASPER_SUFFIX;
		}
		try {
			JasperCompileManager.compileReportToFile(jrxmlSourcePath,
					jrxmlDestSourcePath);
			flag = true;
		} catch (JRException e) {
			e.printStackTrace();
		}
		return flag;
	}

	/**
	 * 获取报表模板对象
	 * 
	 * @param templateFileName
	 *            报表模板文件名
	 * @return jasperReport
	 * @throws Exception
	 *             Exception
	 */
	private static JasperReport getReport(String templateFileName) {
		String suffixName = templateFileName.substring(templateFileName
				.lastIndexOf('.'));
		JasperReport report = null;
		try {
			if (".jrxml".equalsIgnoreCase(suffixName)) {
				report = JasperCompileManager.compileReport(templateFileName);
			} else if (".jasper".equalsIgnoreCase(suffixName)) {
				report = (JasperReport) JRLoader.loadObject(templateFileName);
			} else {
				throw new Exception("wrong report template file type exception");
			}
		} catch (JRException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return report;
	}

	/**
	 * 去除报表的上下左右的边距并且设置报表只有一页
	 * 
	 * @param report
	 *            jasperReport
	 * @throws Exception
	 *             exception
	 */
	private static void clearReportMarginAndPage(JasperReport report)
			throws Exception {
		Field margin = JRBaseReport.class.getDeclaredField("leftMargin");
		margin.setAccessible(true);
		margin.setInt(report, 0);

		margin = JRBaseReport.class.getDeclaredField("rightMargin");
		margin.setAccessible(true);
		margin.setInt(report, 0);

		margin = JRBaseReport.class.getDeclaredField("bottomMargin");
		margin.setAccessible(true);
		margin.setInt(report, 0);

		margin = JRBaseReport.class.getDeclaredField("topMargin");
		margin.setAccessible(true);
		margin.setInt(report, 0);

		Field pageHeight = JRBaseReport.class.getDeclaredField("pageHeight");
		pageHeight.setAccessible(true);
		pageHeight.setInt(report, Integer.MAX_VALUE);
	}

	/**
	 * 获取JasperPrint对象
	 * 
	 * @param templateFileName
	 *            模板文件名
	 * @param params
	 *            打印参数
	 * @param dataSource
	 *            报表数据源
	 * @param isClearMargin
	 *            是否清除边距
	 * @return JasperPrint
	 * @throws Exception
	 *             Exception
	 */
	private static JasperPrint getJasperPrint(String templateFileName,
			Map<String, Object> params, JRDataSource dataSource,
			boolean isClearMargin) throws Exception {
		JasperReport report = getReport(templateFileName);
		if (isClearMargin) {
			clearReportMarginAndPage(report);
		}
		JasperPrint jasperPrint = JasperFillManager.fillReport(report, params,
				dataSource);
		return jasperPrint;
	}

	/**
	 * 获取JasperPrint对象
	 * 
	 * @param templateFileName
	 *            模板文件名
	 * @param params
	 *            打印参数
	 * @param dataSource
	 *            报表数据源
	 * @param isClearMargin
	 *            是否清除边距
	 * @return JasperPrint
	 * @throws Exception
	 *             Exception
	 */
	private static JasperPrint getJasperPrint(String templateFileName,
			Map<String, Object> params, Connection conn, boolean isClearMargin)
			throws Exception {
		JasperReport report = getReport(templateFileName);
		if (isClearMargin) {
			clearReportMarginAndPage(report);
		}
		JasperPrint jasperPrint = JasperFillManager.fillReport(report, params,
				conn);
		return jasperPrint;
	}

	/**
	 * 打印PDF文件到输出流
	 * 
	 * @param templateFileName
	 *            模板文件名
	 * @param params
	 *            打印参数
	 * @param dataSource
	 *            报表数据源
	 * @param out
	 *            OutputStream
	 * @throws Exception
	 *             Exception
	 */
	public static void printPdfToStream(String templateFileName,
			Map<String, Object> params, JRDataSource dataSource,
			OutputStream out) throws Exception {
		JasperPrint print = getJasperPrint(templateFileName, params,
				dataSource, Boolean.FALSE);
		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
		exporter.exportReport();
		out.flush();
	}

	/**
	 * 打印PDF文件到输出流 // 使用JRPdfExproter导出器导出pdf
	 * 
	 * @param templateFileName
	 *            模板文件名
	 * @param params
	 *            打印参数
	 * @param dataSource
	 *            报表数据源
	 * @param out
	 *            OutputStream
	 * @throws Exception
	 *             Exception
	 */
	public static void printPdfToStream(JasperPrint print, OutputStream out)
			throws Exception {
		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
		exporter.exportReport();
		out.flush();
	}

	/***
	 * 打印EXCEL文件到输出流
	 * 
	 * @param templateFileName
	 *            模板文件名
	 * @param params
	 *            打印参数
	 * @param dataSource
	 *            报表数据源
	 * @param out
	 *            OutputStream
	 * @throws Exception
	 *             Exception
	 */
	public static void printExcelToStream(JasperPrint print, OutputStream out)
			throws Exception {
		JRXlsExporter exporter = new JRXlsExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, print);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);
		exporter.setParameter(JRXlsExporterParameter.IS_ONE_PAGE_PER_SHEET,
				Boolean.FALSE);
		exporter.setParameter(JRXlsExporterParameter.IS_WHITE_PAGE_BACKGROUND,
				Boolean.TRUE);
		exporter.setParameter(
				JRXlsExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, true);
		exporter.exportReport();
		out.flush();
	}

	@Test
	public void createJasper() {
		String  filePath="resource/report/patrolreport.jrxml";
		//解决jrxml文件兼容性
	 //  	StringUtil.replaceFile(filePath,"(splitType=\"[a-zA-Z]{1,50}\")|(language=\"[a-zA-Z]{1,20}\")|(uuid=\"[0-9a-zA-Z\\-]{1,60}\")","");
		jsxmlToJasper(filePath, null);
	}
	@Test
	public void encodingJrxml(){
		String  filePath="resource/report/patrolreport.jrxml";
		//解决jrxml文件兼容性
	   	StringUtil.replaceFile(filePath,"(splitType=\"[a-zA-Z]{1,50}\")|(language=\"[a-zA-Z]{1,20}\")|(uuid=\"[0-9a-zA-Z\\-]{1,60}\")","");
	}
	/**
	 * 测试jasper是否可用
	 */
	@Test
	public void testJasper() {
		String jasperPath = "resource/report/report1.jasper";
		JasperUtil.getReport(jasperPath);
	}

	/**
	 * demo测试 将jrxml文件转换成pdf
	 */
	@Test
	public void createPdf() {
		createJasper();
		Connection conn = null;
		try {
			File file = new File("resource/report/report1.jrxml");// 如果转换不了，可能是groovy
			if (file.exists()) {
				// 存放需要传给JasperReport的参数
				HashMap<String, Object> parameter = new HashMap<String, Object>();
				HashMap<String, Object> basicinfo = new HashMap<String, Object>();
				basicinfo.put("name", "hello,魏峰");
				parameter.put("basicinfo", basicinfo);
				// 获取数据连接
				conn = DbUtil.getConnection();
				// 将数据和参数填充到JasperReport中 ，conn作为数据源
				JasperPrint jp = JasperUtil.getJasperPrint(
						file.getAbsolutePath(), parameter, conn, false);
				// 输出路径
				String pdfFilePath = file.getAbsolutePath().substring(0,
						file.getAbsolutePath().lastIndexOf("."))
						+ JasperUtil.PDF_SUFFIX;
				// 导出为pdf文件
				JasperExportManager.exportReportToPdfFile(jp, pdfFilePath);
			//	 JasperUtil.printExcelToStream(jp, new FileOutputStream("resource/report/1.xls"));//无效
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
