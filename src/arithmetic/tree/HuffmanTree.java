package arithmetic.tree;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class HuffmanTree {
	public static List<TreeNode> list = new ArrayList<TreeNode>();

	// 冒泡法对数组进行排序，即对权值进行排序,按从小到大进行排序，同时封装成节点，装入队列中，list是创建的一个队列对象
	public void sortValue(int[] array) {
		// 冒泡排序的过程
		for (int i = 0; i < array.length; i++) {
			for (int j = i + 1; j < array.length; j++) {
				if (array[i] > array[j]) {// 比较大小
					int temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
		}
		for(int i=0;i<array.length;i++){
			 //创建节点对象，并把它装入队列中   
			  TreeNode node=new TreeNode(array[i]);   
			  list.add(node);   
		}
		
	}

	// 生成哈夫曼树的方法
	public void createTree(int[] array) {
		// 调用sortValue方法，将叶子节点进行封装
		this.sortValue(array);
		// 根据哈夫曼编码的原理，建立哈夫曼树
		while (list.size() > 1) {// 节点树大于一时，才进行如下操作
			TreeNode leftnode = list.remove(0);// 获得左节点
			TreeNode rightnode = list.remove(0);// 获得右节点
			// 根据这两个节点，创建它们的父节点
			int value = leftnode.getValue() + rightnode.getValue();
			TreeNode parentnode = new TreeNode(value);
			// 给这三个节点建立对应的关系
			leftnode.setParent(parentnode);
			rightnode.setParent(parentnode);
			parentnode.setChildLeft(leftnode);
			parentnode.setChildRight(rightnode);
			// 将这两个节点的父节点装入队列中，并对它们进行排列
			this.sortAgain(parentnode);
		}
		
	}

	public void sortAgain(TreeNode newnode) {
		// 因为里面的节点已经排好序了，所以只是将新节点插入对应的位置就可以了
		int size = list.size();
		if (size > 0) {// 里面至少有一个节点才能进行比较
			if (newnode.getValue() > list.get(size - 1).getValue()) {// 如果要加入的节点的权值大于队列中最后一个节点的权值，则放到最后面
				list.add(newnode);
			} else {// 否则才去进行比较
				for (int i = 0; i < list.size(); i++) {
					TreeNode node = list.get(i);// 按顺序得到节点
					if (newnode.getValue() <= node.getValue()) {// 比较它们的权值
						list.add(i, newnode);// 将新节点添加到指定的位置
						break;// 结束循环
					}
				}
			}
		} else {// 否则直接加进去
			list.add(newnode);
		}
	}
	@Test
	public void test1(){
		int[] ARRAY  = {12,20,5,16,15,1,30,45,23,9};
		createTree(ARRAY);
		if(list.size()>0){
			TreeNode root  = list.get(0);
			System.out.println(root);
		}
		
	}
}
