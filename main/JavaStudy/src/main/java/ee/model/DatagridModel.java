package ee.model;

public class DatagridModel<T>{
	private T rows;
	private int total;
	/**
	 * @return the rows
	 */
	public T getRows() {
		return rows;
	}
	/**
	 * @param rows the rows to set
	 */
	public void setRows(T rows) {
		this.rows = rows;
	}
	/**
	 * @return the total
	 */
	public int getTotal() {
		return total;
	}
	/**
	 * @param total the total to set
	 */
	public void setTotal(int total) {
		this.total = total;
	}
}
