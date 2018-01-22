package ee.model.topo;

public class LinkAttr{
	/**
	 * 透明度
	 */
	private String alpha;
	/**
	 * style.strokeColor
	 * 连线的颜色
	 */
	private String strokeColor;
	/**
	 * style.lineWidth
	 * 线条的宽度（像素）
	 */
	private String lineWidth;
	/**
	 * int
	 *  虚线
	 */
	private String dashedPattern;
	/**
	 * round,...
	 */
	private String lineJoin;
	/**
	 * 箭头
	 */
	private String arrowsOffset;
	/**
	 * 剪头大小
	 */
	private String arrowsRadius;
	/**
	 * 文本偏移量x
	 */
	private String textOffsetX;
	/**
	 * 文本偏移量y
	 */
	private String textOffsetY;
	/**
	 *  折线拐角处的长度
	 */
	private String bundleOffset;
	/**
	 * 线条之间的间隔
	 */
	private String bundleGap;
	/**
	 * 方向   'horizontal' 
	 */
	private String direction;
	/**
	 * 不是link定义的属性，而是构造类型
	 * 对应链路的创建类型，
	 * 链路连接类型,非必选
	 * 默认"link"   ,可选： "flexLink"，"link"，"FoldLink"，CurveLink
	 */
	private String linkConnType;
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
	 * @return the strokeColor
	 */
	public String getStrokeColor() {
		return strokeColor;
	}
	/**
	 * @param strokeColor the strokeColor to set
	 */
	public void setStrokeColor(String strokeColor) {
		this.strokeColor = strokeColor;
	}
	/**
	 * @return the lineWidth
	 */
	public String getLineWidth() {
		return lineWidth;
	}
	/**
	 * @param lineWidth the lineWidth to set
	 */
	public void setLineWidth(String lineWidth) {
		this.lineWidth = lineWidth;
	}
	/**
	 * @return the dashedPattern
	 */
	public String getDashedPattern() {
		return dashedPattern;
	}
	/**
	 * @param dashedPattern the dashedPattern to set
	 */
	public void setDashedPattern(String dashedPattern) {
		this.dashedPattern = dashedPattern;
	}
	/**
	 * @return the lineJoin
	 */
	public String getLineJoin() {
		return lineJoin;
	}
	/**
	 * @param lineJoin the lineJoin to set
	 */
	public void setLineJoin(String lineJoin) {
		this.lineJoin = lineJoin;
	}
	/**
	 * @return the arrowsOffset
	 */
	public String getArrowsOffset() {
		return arrowsOffset;
	}
	/**
	 * @param arrowsOffset the arrowsOffset to set
	 */
	public void setArrowsOffset(String arrowsOffset) {
		this.arrowsOffset = arrowsOffset;
	}
	/**
	 * @return the arrowsRadius
	 */
	public String getArrowsRadius() {
		return arrowsRadius;
	}
	/**
	 * @param arrowsRadius the arrowsRadius to set
	 */
	public void setArrowsRadius(String arrowsRadius) {
		this.arrowsRadius = arrowsRadius;
	}
	/**
	 * @return the textOffsetX
	 */
	public String getTextOffsetX() {
		return textOffsetX;
	}
	/**
	 * @param textOffsetX the textOffsetX to set
	 */
	public void setTextOffsetX(String textOffsetX) {
		this.textOffsetX = textOffsetX;
	}
	/**
	 * @return the textOffsetY
	 */
	public String getTextOffsetY() {
		return textOffsetY;
	}
	/**
	 * @param textOffsetY the textOffsetY to set
	 */
	public void setTextOffsetY(String textOffsetY) {
		this.textOffsetY = textOffsetY;
	}
	/**
	 * @return the linkConnType
	 */
	public String getLinkConnType() {
		return linkConnType;
	}
	/**
	 * @param linkConnType the linkConnType to set
	 */
	public void setLinkConnType(String linkConnType) {
		this.linkConnType = linkConnType;
	}
	/**
	 * @return the bundleOffset
	 */
	public String getBundleOffset() {
		return bundleOffset;
	}
	/**
	 * @param bundleOffset the bundleOffset to set
	 */
	public void setBundleOffset(String bundleOffset) {
		this.bundleOffset = bundleOffset;
	}
	/**
	 * @return the bundleGap
	 */
	public String getBundleGap() {
		return bundleGap;
	}
	/**
	 * @param bundleGap the bundleGap to set
	 */
	public void setBundleGap(String bundleGap) {
		this.bundleGap = bundleGap;
	}
	/**
	 * @return the direction
	 */
	public String getDirection() {
		return direction;
	}
	/**
	 * @param direction the direction to set
	 */
	public void setDirection(String direction) {
		this.direction = direction;
	}
}
