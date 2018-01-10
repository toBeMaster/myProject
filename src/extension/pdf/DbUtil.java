package extension.pdf;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbUtil {
	private static final String driver = "com.mysql.jdbc.Driver";
	private static final String url = "jdbc:mysql://127.0.0.1:3306/netmaster50";
	private static final String user = "root";
	private static final String password = "123456";
	private static Connection conn =null;
	private DbUtil(){}
	/**
	 * ªÒ»°Connection
	 * @return
	 */
	public static Connection getConnection() {
		if(conn==null){
			try {
				Class.forName(driver);
				conn = DriverManager.getConnection(url, user, password);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return conn;
	}
}
