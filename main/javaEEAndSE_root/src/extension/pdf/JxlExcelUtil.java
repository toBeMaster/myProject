package extension.pdf;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
public class JxlExcelUtil {
	/**
	 * 导出EXCEL列表
	 * @param templateFileName
	 * @param excelPath
	 * @param beanParams
	 * @throws InvalidFormatException
	 * @throws IOException
	 */
	public String exportFile(String templateFileName, String excelPath, Map<String, Object> beanParams)throws InvalidFormatException, IOException {
		HSSFWorkbook workBook = createExcel(templateFileName,
				beanParams);
		OutputStream ouputStream = new  FileOutputStream(excelPath);
		workBook.write(ouputStream);
		ouputStream.flush();
		ouputStream.close();
		return excelPath;
	}
	
	/**
	 * 根据模板生成Excel文件.
	 * @param templateFileName 模板文件.
	 * @param list 模板中存放的数据.
	 * @param resultFileName 生成的文件.
	 * @throws InvalidFormatException 
	 */
	public HSSFWorkbook createExcel(String templateFileName, Map<String,Object> beanParams) throws InvalidFormatException{
		//创建XLSTransformer对象
		XLSTransformer transformer = new XLSTransformer();
		//得到模板文件路径
		String srcFilePath =  templateFileName;
		try {
			//生成Excel文件
			InputStream in = new FileInputStream(srcFilePath);
			HSSFWorkbook workBook = null;
			workBook = (HSSFWorkbook) transformer.transformXLS(in, beanParams);
			return workBook;
		} catch (ParsePropertyException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
