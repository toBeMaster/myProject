package ee.model.topo;

import java.io.Serializable;
import java.util.List;

public class NodeModel<T> implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1780241149257500820L;
	/**
	 * 节点Id
	 */
	private String id;
	/**
	 * 节点名称
	 */
	private String name;
	/**
	 * 子节点id集合
	 */
	private List<String> childIds;
	/**
	 * 父节点id集合
	 */
	private List<String> parentIds;
	/**
	 * 节点的属性 具体对应 jtopo 的 node属性
	 */
	private NodeAttr nodeAttr;
	/**
	 * 坐标x
	 */
	private float x;
	/**
	 * 坐标y
	 */
	private float y;
	
	/**
	 * 业务对象，一些节点设备
	 */
	private T data;
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the childIds
	 */
	public List<String> getChildIds() {
		return childIds;
	}
	/**
	 * @param childIds the childIds to set
	 */
	public void setChildIds(List<String> childIds) {
		this.childIds = childIds;
	}
	/**
	 * @return the parentIds
	 */
	public List<String> getParentIds() {
		return parentIds;
	}
	/**
	 * @param parentIds the parentIds to set
	 */
	public void setParentIds(List<String> parentIds) {
		this.parentIds = parentIds;
	}
	/**
	 * @return the x
	 */
	public float getX() {
		return x;
	}
	/**
	 * @param x the x to set
	 */
	public void setX(float x) {
		this.x = x;
	}
	/**
	 * @return the y
	 */
	public float getY() {
		return y;
	}
	/**
	 * @param y the y to set
	 */
	public void setY(float y) {
		this.y = y;
	}
	/**
	 * @return the nodeAttr
	 */
	public NodeAttr getNodeAttr() {
		return nodeAttr;
	}
	/**
	 * @param nodeAttr the nodeAttr to set
	 */
	public void setNodeAttr(NodeAttr nodeAttr) {
		this.nodeAttr = nodeAttr;
	}
	/**
	 * @return the data
	 */
	public T getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(T data) {
		this.data = data;
	}
}
