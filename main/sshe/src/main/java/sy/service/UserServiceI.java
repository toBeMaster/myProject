package sy.service;

import sy.pageModel.DataGrid;
import sy.pageModel.User;

public interface UserServiceI {

	public User save(User user);

	public User login(User user);

	public DataGrid datagrid(User user);

	public void remove(String ids);

}
