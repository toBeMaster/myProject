
package ee.model.topo;

import java.io.Serializable;
import java.util.List;

/**
 * 拓扑图模型， 针对js 的 Topo类结构
 * @author fwei
 *
 */
/**
 * json 数据结构 { "id": "1001", "name": "上海", "background":
 * "/config/areaUnit/bg/defaultBG.jpg", "nodes": [ { "elementType": "node",
 * "id": "1001001", "name": "徐汇区", "nodeId": "1001001", "nodeType": "area", "x":
 * 0.360745614035088, "y": 0.406779661016949, "childIds": [], "parentIds": [] }
 * ], "nodeAttr": { "selected": false, "dragable": true, "font": "12px Microsoft
 * Yahei", "fontColor": "42,44,46" } }
 */
public class TopoModel implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 拓扑图id
	 */
	private String id;
	/**
	 * name
	 */
	private String name;
	/**
	 * 节点集合
	 */
	private List<NodeModel<?>> nodes;
	/**
	 * 链路集合
	 */
	private List<LinkModel<?>>  links;
	/**
	 * 背景图片地址
	 */
	private String background;
	/**
	 * 全局节点属性配置
	 */
	private NodeAttr nodeAttr;
	/**
	 * 全局链路属性配置
	 */
	private LinkAttr linkAttr;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
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
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the background
	 */
	public String getBackground() {
		return background;
	}

	/**
	 * @param background
	 *            the background to set
	 */
	public void setBackground(String background) {
		this.background = background;
	}

	/**
	 * @return the nodeAttr
	 */
	public NodeAttr getNodeAttr() {
		return nodeAttr;
	}

	/**
	 * @param nodeAttr
	 *            the nodeAttr to set
	 */
	public void setNodeAttr(NodeAttr nodeAttr) {
		this.nodeAttr = nodeAttr;
	}

	/**
	 * @return the linkAttr
	 */
	public LinkAttr getLinkAttr() {
		return linkAttr;
	}

	/**
	 * @param linkAttr
	 *            the linkAttr to set
	 */
	public void setLinkAttr(LinkAttr linkAttr) {
		this.linkAttr = linkAttr;
	}

 

	/**
	 * @return the nodes
	 */
	public List<NodeModel<?>> getNodes() {
		return nodes;
	}

	/**
	 * @param nodes the nodes to set
	 */
	public void setNodes(List<NodeModel<?>> nodes) {
		this.nodes = nodes;
	}

	/**
	 * @return the links
	 */
	public List<LinkModel<?>> getLinks() {
		return links;
	}

	/**
	 * @param links the links to set
	 */
	public void setLinks(List<LinkModel<?>> links) {
		this.links = links;
	}
	
}
