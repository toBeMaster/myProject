package ee.model.topo;

public class LinkModel<T>{
	/**
	 * 链路id
	 */
	private String id;
	/**
	 * 链路名称
	 */
	private String name;
	/**
	 * 上联id
	 */
	private String nodeAId;
	/**
	 * 下联id
	 */
	private String nodeZId;
	/**
	 * 链路的属性 具体对应 jtopo 的 link属性
	 */
	private LinkAttr linkAttr;
	
	/**
	 * 业务对象，网络链路对象
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
	 * @return the nodeAId
	 */
	public String getNodeAId() {
		return nodeAId;
	}
	/**
	 * @param nodeAId the nodeAId to set
	 */
	public void setNodeAId(String nodeAId) {
		this.nodeAId = nodeAId;
	}
	/**
	 * @return the nodeZId
	 */
	public String getNodeZId() {
		return nodeZId;
	}
	/**
	 * @param nodeZId the nodeZId to set
	 */
	public void setNodeZId(String nodeZId) {
		this.nodeZId = nodeZId;
	}
	/**
	 * @return the linkAttr
	 */
	public LinkAttr getLinkAttr() {
		return linkAttr;
	}
	/**
	 * @param linkAttr the linkAttr to set
	 */
	public void setLinkAttr(LinkAttr linkAttr) {
		this.linkAttr = linkAttr;
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
