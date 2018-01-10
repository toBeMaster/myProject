package se.po;

import java.io.Serializable;

/**
 * 权限
 *
 */
public class AbilityResource implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8993694707449397789L;
	/**
	 * 权限ID
	 */
	private String resourceId;
	/**
	 * 权限名称
	 */
	private String resourceName;
	public String getResourceId() {
		return resourceId;
	}
	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
}
