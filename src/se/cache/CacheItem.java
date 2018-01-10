package se.cache;

import java.util.Date;

/**
 * 缓存实体
 * 
 */
public class CacheItem {
	// 创建缓存时间
	private Date createTime = new Date();
	// 缓存期满时间
	private long expireTime = 1;
	// 缓存实体
	private Object entity;

	public CacheItem(Object obj, long expires) {
		this.entity = obj;
		this.expireTime = expires;
	}

	// 判断缓存是否超时
	public boolean isExpired() {
		return (expireTime != -1 && new Date().getTime() - createTime.getTime() > expireTime);
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Object getEntity() {
		return entity;
	}

	public void setEntity(Object entity) {
		this.entity = entity;
	}

	public long getExpireTime() {
		return expireTime;
	}

	public void setExpireTime(long expireTime) {
		this.expireTime = expireTime;
	}
}
