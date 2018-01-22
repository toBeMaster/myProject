package ee.model.topo;

/**
 * 节点属性
 * @author Administrator
 *	用string 类型代替boolean类型: "false","true",
 *	由于初值为false ,返回这样的数会误导js判断，而String类型为空时，json插件不会将此值传回页面，
 *	所以页面js只需对返回对象解析一遍，将"true"or "false"转化为相应boolean值即可
 */
public class NodeAttr {
	/**
	 * 节点类型  节点的创建方式 
	 * new JTopo.Node("Hello");
	 * new JTopo.CircleNode('左下偏移')
	 */
	private String nodeType;
	/**
	 * 设置节点是否可见
	 */
	private String visible;
	/**
	 * 是否显示阴影, 例如:node.shadow = "true"
	 */
	private String shadow;
	/**
	 * zIndex，大的覆盖小的,范围 [10-999]，10以下保留占用。
	 */
	private int zIndex;
	/**
	 * 设置节点是否可以拖动
	 */
	private String dragable;
	/**
	 * 是否被选中
	 */
	private String selected;
	/**
	 * 是否可被编辑
	 */
	private String editAble;
	/**
	 * 节点字体，例如：node.font = "12px Consolas"
	 */
	private String font;
	/**
	 * 字体颜色，例如：node.fontColor = "255,255,0"
	 */
	private String fontColor;
	/**
	 * 节点文本位置，例如：node.textPosition = "Bottom_Center"
	 */
	private String textPosition;
	/**
	 * 选中时，是否显示表示选中状态的矩形，默认为：true，显示
	 */
	private String showSelected;
	/**
	 * 设置节点旋转的角度（弧度）
	 */
	private String rotate;
	/**
	 * 透明度, 取值范围[0-1]
	 */
	private String alpha;
	/**
	 * 水平缩放
	 */
	private String scaleX;
	/**
	 * 垂直缩放
	 */
	private String scaleY;
	/**
	 * 设置节点的填充颜色
	 */
	private String fillColor;
	/**
	 * 图片路径，可以交付给后台处理图片地址
	 */
	private String imgPath;
	/**
	 * @return the visible
	 */
	public String getVisible() {
		return visible;
	}
	/**
	 * @param visible the visible to set
	 */
	public void setVisible(String visible) {
		this.visible = visible;
	}
	/**
	 * @return the shadow
	 */
	public String getShadow() {
		return shadow;
	}
	/**
	 * @param shadow the shadow to set
	 */
	public void setShadow(String shadow) {
		this.shadow = shadow;
	}
	/**
	 * @return the zIndex
	 */
	public int getzIndex() {
		return zIndex;
	}
	/**
	 * @param zIndex the zIndex to set
	 */
	public void setzIndex(int zIndex) {
		this.zIndex = zIndex;
	}
	/**
	 * @return the dragable
	 */
	public String getDragable() {
		return dragable;
	}
	/**
	 * @param dragable the dragable to set
	 */
	public void setDragable(String dragable) {
		this.dragable = dragable;
	}
	/**
	 * @return the selected
	 */
	public String getSelected() {
		return selected;
	}
	/**
	 * @param selected the selected to set
	 */
	public void setSelected(String selected) {
		this.selected = selected;
	}
	/**
	 * @return the editAble
	 */
	public String getEditAble() {
		return editAble;
	}
	/**
	 * @param editAble the editAble to set
	 */
	public void setEditAble(String editAble) {
		this.editAble = editAble;
	}
	/**
	 * @return the font
	 */
	public String getFont() {
		return font;
	}
	/**
	 * @param font the font to set
	 */
	public void setFont(String font) {
		this.font = font;
	}
	/**
	 * @return the fontColor
	 */
	public String getFontColor() {
		return fontColor;
	}
	/**
	 * @param fontColor the fontColor to set
	 */
	public void setFontColor(String fontColor) {
		this.fontColor = fontColor;
	}
	/**
	 * @return the textPosition
	 */
	public String getTextPosition() {
		return textPosition;
	}
	/**
	 * @param textPosition the textPosition to set
	 */
	public void setTextPosition(String textPosition) {
		this.textPosition = textPosition;
	}
	/**
	 * @return the showSelected
	 */
	public String getShowSelected() {
		return showSelected;
	}
	/**
	 * @param showSelected the showSelected to set
	 */
	public void setShowSelected(String showSelected) {
		this.showSelected = showSelected;
	}
	/**
	 * @return the rotate
	 */
	public String getRotate() {
		return rotate;
	}
	/**
	 * @param rotate the rotate to set
	 */
	public void setRotate(String rotate) {
		this.rotate = rotate;
	}
	/**
	 * @return the alpha
	 */
	public String getAlpha() {
		return alpha;
	}
	/**
	 * @param alpha the alpha to set
	 */
	public void setAlpha(String alpha) {
		this.alpha = alpha;
	}
	/**
	 * @return the scaleX
	 */
	public String getScaleX() {
		return scaleX;
	}
	/**
	 * @param scaleX the scaleX to set
	 */
	public void setScaleX(String scaleX) {
		this.scaleX = scaleX;
	}
	/**
	 * @return the scaleY
	 */
	public String getScaleY() {
		return scaleY;
	}
	/**
	 * @param scaleY the scaleY to set
	 */
	public void setScaleY(String scaleY) {
		this.scaleY = scaleY;
	}
	/**
	 * @return the fillColor
	 */
	public String getFillColor() {
		return fillColor;
	}
	/**
	 * @param fillColor the fillColor to set
	 */
	public void setFillColor(String fillColor) {
		this.fillColor = fillColor;
	}
	/**
	 * @return the nodeType
	 */
	public String getNodeType() {
		return nodeType;
	}
	/**
	 * @param nodeType the nodeType to set
	 */
	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}
	/**
	 * @return the imgPath
	 */
	public String getImgPath() {
		return imgPath;
	}
	/**
	 * @param imgPath the imgPath to set
	 */
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	
}
