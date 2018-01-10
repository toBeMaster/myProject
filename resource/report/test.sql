ALTER TABLE ns_area add COLUMN parentid VARCHAR(128) DEFAULT NUll  COMMENT '鐖剁骇鍦板煙ID';
ALTER TABLE ns_area add COLUMN levelcode VARCHAR(1000) DEFAULT NUll COMMENT '鐖跺瓙绾у叧绯荤粨鏋�;
update ns_area set parentid = '000001' where id != '000001';
update ns_area set levelcode = CONCAT('000001','_',id) where id != '000001';
update ns_area set levelcode = id where id = '000001';