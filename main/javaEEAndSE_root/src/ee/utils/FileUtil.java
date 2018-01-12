package ee.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import ee.model.ResultMsgModel;

/**
 * 文件工具类
 * @author CLWang
 *
 * @date2017-7-14下午4:44:18
 */
public class FileUtil {
	  /** 
     * 新建目录 
     * @param folderPath String 如 c:/fqf 
     * @return boolean 
     */ 
   public static void newFolder(String folderPath) { 
       try { 
           String filePath = folderPath; 
           filePath = filePath.toString(); 
           java.io.File myFilePath = new java.io.File(filePath); 
           if (!myFilePath.exists()) { 
               myFilePath.mkdir(); 
           } 
       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
   } 
   // 创建目录
	public static boolean createDir(String destDirName) {
		File dir = new File(destDirName);
		if (dir.exists()) {// 判断目录是否存在
			return false;
		}
		if (!destDirName.endsWith(File.separator)) {// 结尾是否以"/"结束
			destDirName = destDirName + File.separator;
			dir = new File(destDirName);
		}
		if (dir.mkdirs()) {// 创建目标目录
			return true;
		} else {
			return false;
		}
	}

   /** 
     * 新建文件 
     * @param filePathAndName String 文件路径及名称 如c:/fqf.txt 
     * @param fileContent String 文件内容 
     * @return boolean 
     */ 
   public static boolean newFile(String filePathAndName, String fileContent) { 
	   boolean flag =false;
       try { 
           String filePath = filePathAndName; 
           filePath = filePath.toString(); 
           File myFilePath = new File(filePath); 
           if (!myFilePath.exists()) { 
               myFilePath.createNewFile(); 
           } 
           FileWriter resultFile = new FileWriter(myFilePath); 
           PrintWriter myFile = new PrintWriter(resultFile); 
           String strContent = fileContent; 
           myFile.println(strContent); 
           resultFile.close(); 
           flag = true;
       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
       return flag;
   } 

   /** 
     * 删除文件 
     * @param filePathAndName String 文件路径及名称 如c:/fqf.txt 
     * @param fileContent String 
     * @return boolean 
     */ 
   public static boolean delFile(String filePathAndName) { 
	   boolean flag = false;
       try { 
           String filePath = filePathAndName; 
           filePath = filePath.toString(); 
           java.io.File myDelFile = new java.io.File(filePath); 
           myDelFile.delete(); 
            flag = true;
       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
       return flag;
   } 

   /** 
     * 删除文件夹 
     * @param filePathAndName String 文件夹路径及名称 如c:/fqf 
     * @param fileContent String 
     * @return boolean 
     */ 
   public static void delFolder(String folderPath) { 
       try { 
           delAllFile(folderPath); //删除完里面所有内容 
           String filePath = folderPath; 
           filePath = filePath.toString(); 
           java.io.File myFilePath = new java.io.File(filePath); 
           myFilePath.delete(); //删除空文件夹 

       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
   } 

   /** 
     * 删除文件夹里面的所有文件 
     * @param path String 文件夹路径 如 c:/fqf 
     */ 
   public static void delAllFile(String path) { 
       File file = new File(path); 
       if (!file.exists()) { 
           return; 
       } 
       if (!file.isDirectory()) { 
           return; 
       } 
       String[] tempList = file.list(); 
       File temp = null; 
       for (int i = 0; i < tempList.length; i++) { 
           if (path.endsWith(File.separator)) { 
               temp = new File(path + tempList[i]); 
           } 
           else { 
               temp = new File(path + File.separator + tempList[i]); 
           } 
           if (temp.isFile()) { 
               temp.delete(); 
           } 
           if (temp.isDirectory()) { 
               delAllFile(path+"/"+ tempList[i]);//先删除文件夹里面的文件 
               delFolder(path+"/"+ tempList[i]);//再删除空文件夹 
           } 
       } 
   } 

   /** 
     * 复制单个文件 
     * @param oldPath String 原文件路径 如：c:/fqf.txt 
     * @param newPath String 复制后路径 如：f:/fqf.txt 
     * @return boolean 
     */ 
   public static void copyFile(String oldPath, String newPath) { 
       try { 
           int byteread = 0; 
           File oldfile = new File(oldPath); 
           if (oldfile.exists()) { //文件存在时 
               InputStream inStream = new FileInputStream(oldPath); //读入原文件 
               FileOutputStream fs = new FileOutputStream(newPath); 
               byte[] buffer = new byte[1444]; 
               while ( (byteread = inStream.read(buffer)) != -1) { 
                   fs.write(buffer, 0, byteread); 
               } 
               inStream.close(); 
               fs.close();
           } 
       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
   } 

   /** 
     * 复制整个文件夹内容 
     * @param oldPath String 原文件路径 如：c:/fqf 
     * @param newPath String 复制后路径 如：f:/fqf/ff 
     * @return boolean 
     */ 
   public static void copyFolder(String oldPath, String newPath) { 

       try { 
           (new File(newPath)).mkdirs(); //如果文件夹不存在 则建立新文件夹 
           File a=new File(oldPath); 
           String[] file=a.list(); 
           File temp=null; 
           for (int i = 0; i < file.length; i++) { 
               if(oldPath.endsWith(File.separator)){ 
                   temp=new File(oldPath+file[i]); 
               } 
               else{ 
                   temp=new File(oldPath+File.separator+file[i]); 
               } 

               if(temp.isFile()){ 
                   FileInputStream input = new FileInputStream(temp); 
                   FileOutputStream output = new FileOutputStream(newPath + "/" + 
                           (temp.getName()).toString()); 
                   byte[] b = new byte[1024 * 5]; 
                   int len; 
                   while ( (len = input.read(b)) != -1) { 
                       output.write(b, 0, len); 
                   } 
                   output.flush(); 
                   output.close(); 
                   input.close(); 
               } 
               if(temp.isDirectory()){//如果是子文件夹 
                   copyFolder(oldPath+"/"+file[i],newPath+"/"+file[i]); 
               } 
           } 
       } 
       catch (Exception e) { 
           e.printStackTrace(); 
       } 
   } 

   /** 
     * 移动文件到指定目录 
     * @param oldPath String 如：c:/fqf.txt 
     * @param newPath String 如：d:/fqf.txt 
     */ 
   public static void moveFile(String oldPath, String newPath) { 
       copyFile(oldPath, newPath); 
       delFile(oldPath); 
   } 
   /**
    * 文件上传
    */
   public void saveAreaLocationBG(){
	    HttpServletRequest request = null;
		request = ServletActionContext.getRequest();
		ResultMsgModel result = new ResultMsgModel();
		try {
			if(ServletFileUpload.isMultipartContent(request)){
			        FileItemFactory fileItemFactory = new DiskFileItemFactory();
					ServletFileUpload fileUpload = new ServletFileUpload(fileItemFactory);
			       try { 
					@SuppressWarnings("unchecked")
					List<FileItem> list = fileUpload.parseRequest(request);
					for (FileItem item : list) {
						// 如果fileitem中封装的是普通输入项的数据
						if (item.isFormField()) {		
						} else {
							String fileName = item.getName();
							if(fileName != null && !fileName.trim().equals("")){
								File file = new File(fileName);
								String picName = file.getName();
								String stuffix = picName.substring(picName.lastIndexOf('.')+1);
								if(stuffix.toLowerCase().equals("jpg")  || stuffix.toLowerCase().equals("png")){
									    String filePath ="";
									    String name = filePath  + fileName;  
									    File fileDir = new File(filePath);
										if  (!fileDir .exists()  && !fileDir .isDirectory())      
										{       
										    fileDir .mkdir();    
										}  
										File fileTo = new File(name);
										if(!fileTo.exists())    
										{    
										   fileTo.createNewFile();    
										}  
										item.write(fileTo);
										//写入成功
										result.setObj( filePath+fileName);
										result.setSuccess(true);
										result.setMsg("上传成功！");
									   //调用业务层 
								}
							}
						}
					}
				} catch (Exception e) {
					System.out.println("错误："+e.toString());
					result.setSuccess(false);
					result.setMsg("上传失败！");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		putJson(result);
	}
}

