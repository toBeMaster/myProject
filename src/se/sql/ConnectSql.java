/**
 * 
 */
package se.sql;

import java.sql.ResultSet;
import java.sql.SQLException;

import DB.DBUtil;

/**
 * 项目名称：StudyEEAndSE 类名称：ConnectSql 类描述： 创建人：魏峰 创建时间：2017年4月1日 下午4:40:40
 * 修改时间：2017年4月1日 下午4:40:40 修改备注：
 * 
 * @version
 * 
 */
public class ConnectSql {
	static DBUtil db = null;
	public static void main(String agrs[]) {
		 db = new DBUtil();
		 ResultSet ret=null;
		 String sql ="select* from obj";
		 try {
			ret = db.selectSQL(sql);
			while(ret.next()){
				String id = ret.getString("obj_id");
				String name = ret.getString("obj_name");
				String desc = ret.getString("obj_desc");
				System.out.println("id:"+id + "  name:"+name+" desc:"+desc);
			}
			sql = "insert into obj(obj_id,obj_name,obj_desc) values('2','wf','student')";
			db.insertSQL(sql);
			
			sql ="select* from obj";
			ret = db.selectSQL(sql);
			while(ret.next()){
				String id = ret.getString("obj_id");
				String name = ret.getString("obj_name");
				String desc = ret.getString("obj_desc");
				System.out.println("id:"+id + "  name:"+name+" desc:"+desc);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		 db.close();
	}
}
