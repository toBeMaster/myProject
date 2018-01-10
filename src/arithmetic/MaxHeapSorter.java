package arithmetic;

import org.junit.Test;

public class MaxHeapSorter {
	static final int SIZE=10;
	/*
	 * 堆排序类似用筛子筛选，基于当前节点路径，小的值移下去，大的值移上去
	 *1  基础满足完全二叉树，
	 *2  父节点为i，那么左子树 索引是 2*i+1，右子树为：2*i+2 --> 2*(i+1)
	 *3  左子树索引是奇数     
	 *4  如果一个数组长度是n 那么最后一个节点索引是a[n-1] 
	 *5  通过最后一个节点，得到它的父节点  通过2和4运算： 父节点索引是    n-1=2*i+1  -->   i = n/2-1;
	 * 
	 */
	static void heapSort(int[] a,int n){
		int i,j,h,k;
		int t;
		for(i=n/2-1;i>=0;i--){  //每个循坏 a[i],对a[i]下面构造堆结构   n/2-1 代表指向最后一个节点的父节点
			while(2*i+1<n){   //如果a[i] 有左子树     
				j=2*i+1;   //判断目标移到左子树
				if(j+1<n){   //如果a[i] 有右子树
					if(a[j]<a[j+1]){  //如果左子树小于右子树
						j++;  //目标移到右子树
					}
				}
				if(a[i]<a[j]){    //如果子树大于父节点自己   交换数据
					t=a[i];
					a[i]=a[j]; 
					a[j]=t;
					i=j;  //堆根改变了， 要判断交换后 子树数据是否是堆结构
				}else {
					break; //代表满足堆结构    因为从最后的节点算的，所以当下节点满足堆结构，则子孙已经排好序
				}
			}//循环结束后，当前节点下的子树是堆结构 所以i减去1 ，即向前面的节点去排序
		}
		
		System.out.println("输出原数据构造的堆");
		/* for(h=0;h<n;h++){
			 System.out.print(a[h]+" ");
		 }*/
		printCompleteBinaryTree(a,1);
		 System.out.println();
		 
		//这里的i 是堆结构的数据长度 每循环一次，最大值与i交换，最大值放置到后面i的位置，i-- ,表示堆排序排除i
		for(i=n-1;i>0;i--){
			t=a[0];
			a[0] =a[i];
			a[i] = t;//交换值，因为  每循环一次之前都是堆结构 
			k=0;//自上而下  建立 可以减少时间，因为子树都是堆结构
			//交换后可能破坏了堆结构，要重新对 其余的数据建立堆结构
			while(2*k+1<i){ 
				j=2*k+1;
				if(j+1<i){
					if(a[j]<a[j+1]){
						j++;
					}
				}
				if(a[k]<a[j]){
					t = a[k];
					a[k]=a[j];
					a[j]=t;
					k=j;
				}else {
					break;
				}
			}
			
			System.out.print("\n第"+(n-i)+"步结果");
			 for(h=0;h<n;h++){
				 System.out.print(a[h]+" ");
			 }
			/*System.out.println();
			printCompleteBinaryTree(a,1);*/
			 System.out.println();
		}
	}
	@Test
	public void testHeapSort(){
		int[] ARRAY  = {12,20,5,16,15,1,30,45,23,9};
		System.out.print("\n原数据：");
		 for(int h=0;h<ARRAY.length;h++){
			 System.out.print(ARRAY[h]+" ");
		 }
		 System.out.println();
		 printCompleteBinaryTree(ARRAY,1);
		 System.out.println();
		heapSort(ARRAY, ARRAY.length);
	}
	
	
	public static void printCompleteBinaryTree(int[] a,int marginNum){
		int level = (int)Math.floor(Math.log(a.length)/Math.log(2))+1;
		int margin = 1;//间距
		if(marginNum>-1&& marginNum<5){
			margin = marginNum;
		}
		int width = (int)Math.pow(2, level+margin)+1;//树宽
		for(int i=1;i<=level;i++){
			System.out.println();     //转行
			int c = (int)Math.pow(2, i-1);//行容量    c-1 是第一个数的下标
			int space = width/c;//相邻间距
			int head = (int)Math.pow(2, level-i+margin); //第一个数空间位置
			for(int offset=0;offset<head;offset++){
			 	System.out.print(" ");
			}
			for(int j=0;j<c;j++){
				int t=0;
				if(c-1+j<a.length){
					t = a[c-1+j]; //将要输出的值
					System.out.print(t); //因为数字可能是多位的，所以后面的间距要减去位数
				}
				int bit = (int)Math.floor(Math.log(t)/Math.log(10))+1;
				for(int offset=0;offset<space-bit;offset++){ //控制空格个数
					System.out.print(" ");
				}
			}
		}
	}
	public static void printCBTSimple(int[] a){
		int level = (int)Math.floor(Math.log(a.length)/Math.log(2))+1;
		for(int i=1;i<=level;i++){
			System.out.println();     //转行
			int c = (int)Math.pow(2, i-1);//行容量    c-1 是第一个数的下标
			for(int j=0;j<c&&c-1+j<a.length;j++){
				System.out.print(a[c-1+j]+" ");  
			}
		}
	}
	@Test
	public void testTree(){
		int[] ARRAY  = {12,20,5,16,15,1,30,45,23,9};
		int[] ARRAY4  = {12,20,5345,164,15,1,30,45,23,9,12,320,5,16,15,1,3430,45,253,9};
		int[] ARRAY1  = {1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16};
		int[] ARRAY3  = {1,2,3,4,5,6,7,8,9,9,8,7,6,5,4,3,2,1,3,8,1,3,9,5,7 };
		int[] ARRAY2  = {1,2,3,4,5,6,7,8,9};
		printCompleteBinaryTree(ARRAY1,0);
	}
	
}
