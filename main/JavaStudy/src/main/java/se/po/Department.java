package se.po;

import java.io.Serializable;

/**
 *
 */
public class Department implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5569625750091908772L;
	/**
 
	 */
	private String id;
	/**
 
	 */
	private String departmentName;
	/**
 
	 */
	private String parentId;
	/**
 
	 */
	private int sn;
	/**
	 */
	private String described;
	/**
	 */
	private int isDeleted;
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
	 * @hibernate.property 
	 * @return
	 */
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	
	/**
	 * @hibernate.property 
	 * @return
	 */
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	
	/**
	 * @hibernate.property 
	 * @return
	 */
	public int getSn() {
		return sn;
	}
	public void setSn(int sn) {
		this.sn = sn;
	}
	
	/**
	 * @hibernate.property 
	 * @return
	 */
	public String getDescribed() {
		return described;
	}
	public void setDescribed(String described) {
		this.described = described;
	}
	
	/**
	 * @hibernate.property 
	 * @return
	 */
	public int getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}
}
