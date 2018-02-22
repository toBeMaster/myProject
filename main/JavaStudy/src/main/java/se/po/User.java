package se.po;

import java.io.Serializable;
import java.util.List;

/**
 *
 */
public class User implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2841075985730048324L;
	/**
	 */
	private String id;
	/**
	 */
	private String loginName;
	/**
	 */
	private String userName;
	/**
	 */
	private String pinyin;
	/**
 
	 */
	private Department department;
	/**
 
	 */
	private String departmentName;
	/**
 
	 */
	private String departmentId;
	/**
 
	 */
	private String mobileNumber;
	/**
 
	 */
	private String teleNumber;
	/**
 
	 */
	private String email;
	/**
 
	 */
	private String password;
	/**
 
	 */
	private String photoPath;
	/**
 
	 */
	private String described;
	/**
 
	 */
	private List<String> roleIds;
	/**
 
	 */
	private List<String> roleNames;
	/**
 
	 */
	private int isDeleted;
	/**
 
	 */
	private String integrality = "";

	/**
	 * @hibernate.many-to-one column="departmentid"
	 * @return
	 */
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	/**
	 * @hibernate.id generator-class="assigned"
	 * @return
	 */
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	/**
	 * @hibernate.property column="loginname" 
	 * @return
	 */
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	/**
	 * @hibernate.property column="username"
	 * @return
	 */
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @hibernate.property column="pinyin"
	 * @return
	 */
	public String getPinyin() {
		return pinyin;
	}

	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}
	
	/**
	 * @hibernate.property column="mobilenumber"
	 * @return
	 */
	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	/**
	 * @hibernate.property column="telenumber"
	 * @return
	 */
	public String getTeleNumber() {
		return teleNumber;
	}

	public void setTeleNumber(String teleNumber) {
		this.teleNumber = teleNumber;
	}

	/**
	 * @hibernate.property column="email"
	 * @return
	 */
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @hibernate.property column="password"
	 * @return
	 */
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @hibernate.property column="photopath"
	 * @return
	 */
	public String getPhotoPath() {
		return photoPath;
	}

	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}

	/**
	 * @hibernate.property column="described"
	 * @return
	 */
	public String getDescribed() {
		return described;
	}

	public void setDescribed(String described) {
		this.described = described;
	}

	/**
	 * @hibernate.property column="isdeleted"
	 * @return
	 */
	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public String getIntegrality() {
		return integrality;
	}

	public void setIntegrality(String integrality) {
		this.integrality = integrality;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public List<String> getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(List<String> roleIds) {
		this.roleIds = roleIds;
	}

	public List<String> getRoleNames() {
		return roleNames;
	}

	public void setRoleNames(List<String> roleNames) {
		this.roleNames = roleNames;
	}

	/**
	 * @return the departmentId
	 */
	public String getDepartmentId() {
		return departmentId;
	}

	/**
	 * @param departmentId the departmentId to set
	 */
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	

}
