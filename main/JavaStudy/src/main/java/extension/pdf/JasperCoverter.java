package extension.pdf;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperRunManager;

public class JasperCoverter extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			String jrxmlSourcePath = this.getServletContext().getRealPath("/")
					+ "jrxml\\report1.jrxml";
			System.out.println(jrxmlSourcePath);
			String jrxmlDestSourcePath = this.getClass().getClassLoader()
					.getResource("").getPath().substring(1)
					+ "jasperreports/report1.jasper";
			JasperCompileManager.compileReportToFile(jrxmlSourcePath,
					jrxmlDestSourcePath);
			InputStream isRef = new FileInputStream(new File(
					jrxmlDestSourcePath));
			ServletOutputStream sosRef = response.getOutputStream();
			response.setContentType("application/pdf");
			JasperRunManager.runReportToPdfStream(isRef, sosRef, new HashMap<Object, Object>(),
					new JREmptyDataSource());
			sosRef.flush();
			sosRef.close();
		} catch (JRException e) { // TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
