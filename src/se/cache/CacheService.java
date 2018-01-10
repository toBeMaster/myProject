package se.cache;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import ee.path.PathConstant;

public class CacheService {
	public boolean initCache() {
		CachePool.getInstance().putCacheItem("comEventList", null, -1);
		return true;
	}
	
	public void writeCachePool() {
		String path = PathConstant.getProjectDir();
		File file = new File(path+"object.out");
		ObjectOutputStream oout = null;
		try {
			oout = new ObjectOutputStream(new FileOutputStream(file));
			CachePool cachePool = CachePool.getInstance();
			oout.writeObject(cachePool.getCacheItem("cameraList"));
			oout.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public  void readCachePool() {
		CachePool.getInstance().clearAllItems();
		String path = PathConstant.getProjectDir();
		File file = new File(path+"object.out");
		try {
			ObjectInputStream oin = new ObjectInputStream(new FileInputStream(
					file));
			oin.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
	}
	public void clearCachePool(){
		CachePool.getInstance().clearAllItems();
	}
}
