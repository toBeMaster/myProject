package se.io;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import se.po.User;
import ee.path.PathConstant;

public class ObjectSerializable {
	public void writeCachePool() {
		String path = PathConstant.getProjectDir();
		File file = new File(path+"object.out");
		ObjectOutputStream oout = null;
		try {
			oout = new ObjectOutputStream(new FileOutputStream(file));
			User user = new User();
			user.setLoginName("iiii");
			oout.writeObject(user);
			oout.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@SuppressWarnings("unchecked")
	public  void readCachePool() {
		String path = PathConstant.getProjectDir();
		File file = new File(path+"object.out");
		try {
			ObjectInputStream oin = new ObjectInputStream(new FileInputStream(
					file));
			User user = (User)oin.readObject();
			oin.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
}
