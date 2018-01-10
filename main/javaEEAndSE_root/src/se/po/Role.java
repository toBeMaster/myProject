package se.po;

import java.io.Serializable;
import java.util.List;

/**
 * 角色
 *
 */
public class Role implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4720423624865528649L;
	/**
	 * 角色ID
	 */
	private String roleId;
	/**
	 * 角色名称
	 */
	private String roleName;
	/**
	 * 权限列表
	 */
	private List<AbilityResource> abilityResources;
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public List<AbilityResource> getAbilityResources() {
		return abilityResources;
	}
	public void setAbilityResources(List<AbilityResource> abilityResources) {
		this.abilityResources = abilityResources;
	}
	
}
