/**
 * 
 */
package DB;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * 项目名称：StudyEEAndSE 类名称：DBUtil 类描述： 创建人：魏峰 创建时间：2017年4月1日 下午5:15:26
 * 修改时间：2017年4月1日 下午5:15:26 修改备注：
 * 
 * @version
 * 
 */
public class DBUtil {
	private static final String driver = "com.mysql.jdbc.Driver";
	private static final String url = "jdbc:mysql://localhost:3306/study";
	private static final String user = "root";
	private static final String password = "";

	public Connection conn = null;
	public PreparedStatement pst = null;

	public DBUtil() {
		try {
			Class.forName(driver);// 指定连接类型
			conn = DriverManager.getConnection(url, user, password);
			if (!conn.isClosed())
				System.out.println("数据库连接成功");
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("数据库连接失败");
		} catch (ClassNotFoundException e) {
			System.out.println("无法加载驱动程序 :" + driver);
		}
	}

	public void close() {
		try {
			this.conn.close();
			this.pst.close();
		} catch (SQLException e) {
			System.out.println("关闭数据库问题 ：");
			e.printStackTrace();
		}
	}

	// execute selection language
	public ResultSet selectSQL(String sql) {
		ResultSet rs = null;
		try {
			pst = conn.prepareStatement(sql);
			rs = pst.executeQuery(sql);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return rs;
	}

	public boolean insertSQL(String sql) {
		try {
			pst = conn.prepareStatement(sql);
			pst.executeUpdate();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			System.out.println("插入时出错：");
			e.printStackTrace();
		}
		return false;
	}

	// execute delete language
	public boolean deleteSQL(String sql) {
		try {
			pst = conn.prepareStatement(sql);
			pst.executeUpdate();
			return true;
		} catch (SQLException e) {
			System.out.println("删除数据库时出错：");
			e.printStackTrace();
		} catch (Exception e) {
			System.out.println("删除时出错：");
			e.printStackTrace();
		}
		return false;
	}

	// execute update language
	public boolean updateSQL(String sql) {
		try {
			pst = conn.prepareStatement(sql);
			pst.executeUpdate();
			return true;
		} catch (SQLException e) {
			System.out.println("更新数据库时出错：");
			e.printStackTrace();
		} catch (Exception e) {
			System.out.println("更新时出错：");
			e.printStackTrace();
		}
		return false;
	}
}
