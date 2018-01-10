package arithmetic;

import org.junit.Test;

public class SortUtile {
	 public static int[] ARRAY  = {12,20,5,16,15,1,30,45,23,9};
	 public static final int SIZE = 10;
	 private static int step=0;
	
	 public void quickSort(int[] a,int left,int right){
         int ltemp = left;
         int rtemp = right;
         int key = a[(left+right)/2];//分界值
         int t;
         
         while(ltemp<rtemp){
             //从前往后比较
             while( a[ltemp]<key)//如果没有比关键值大的，比较下一个，直到有比关键值大的交换位置
                ltemp++;
             //从后往前比较
             while( a[rtemp]>key)  //如果没有比关键值小的，比较下一个，直到有比关键值小的交换位置，然后又从前往后比较
                 rtemp--;
             if(ltemp<rtemp){
                   t = a[ltemp];
                 a[ltemp] = a[rtemp];
                 a[rtemp] = t;
                 
                 ltemp++;
                 rtemp--;
             }
       //  此时第一次循环比较结束，关键值的位置已经确定了。左边的值都比关键值小，右边的值都比关键值大，但是两边的顺序还有可能是不一样的，进行下面的递归调用
             System.out.print("\n第"+(++step)+"次排序结果：");
             for(int i = 0; i<a.length; i++){
                 System.out.print( a[i]+" ");
             }
             System.out.println("  基数："+key);
         }
         if(ltemp==rtemp) ltemp++;
         //递归
         if(left<rtemp) quickSort(a,left,ltemp-1);//左边序列。第一个索引位置到关键值索引-1
         if(ltemp<right) quickSort(a,rtemp+1,right);//右边序列。从关键值索引+1到最后一个
     }
	 //从第二个数依次往后与前比较，插入到合适位置
	 //第二个如果大于第一个则执行第三个比较，此时前两个已经排好序，
	 //第三个数（待插入数）如果小于第二个数，第二个数先移到第三个位置，
	 //待插入数继续向前比较，前面如果继续大于则逐个后移一位，
	 //否则当前位置后一位为待插入数
	 public static void insertSort(int[] a){
		 int i,j,insertNum;
		 // t 是要要插入的数
		 for(i=1;i<a.length;i++){
			 insertNum = a[i];
			 j=i-1;
			 while(j>=0&& insertNum<a[j]){
				 a[j+1] =a[j];
				 j--;
			 }
			 a[j+1] =insertNum;
			 System.out.print("\n第"+i+"次排序结果：");
			 for(int h=0;h<a.length;h++){
				 System.out.print(a[h]+" ");
			 }
		 }
	 }
	 public static void shellSort(int[] a){
		 int i,j,h;
		 int r,temp;//r 所分组数，temp,中间交换变量
		 int x=0;
		 for(r=a.length/2;r>=1;r/=2){//分段
			 for(i=r;i<a.length;i++){
				 temp = a[i];
				 j=i-r;
				 while(j>=0&&temp<a[j]){//这里是插入排序逻辑
					 a[j+r] = a[j];
					 j-=r;//多个分组
				 }
				 a[j+r]=temp;
			 }
			 x++;
			 System.out.print("第"+x+"步排序是：");
			 for( h = 0; h<a.length; h++){
		            System.out.print( a[h]+" ");
		     }
			 System.out.println();
		 }
		 
	 }
	 @Test
     public void test1( ){
        int[] a = ARRAY;
        int start = 0;
        int end = a.length-1;
        System.out.print("排序前： " );
        for(int i = 0; i<a.length; i++){
            System.out.print( a[i]+" ");
        }
        System.out.println( );
        quickSort(a,start,end);
        System.out.println("\n排序后： ");
        for(int i = 0; i<a.length; i++){
        	System.out.print( a[i]+" ");
         }
        System.out.println();
     }
	 @Test
	 public void test2( ){
		 int[] a = ARRAY;
		 System.out.print("排序前： " );
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println( );
		 insertSort(a);
		 System.out.println("\n排序后： ");
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println();
	 }
	 @Test
	 public void test3( ){
		 int[] a = ARRAY;
		 System.out.print("排序前： " );
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println( );
		 shellSort(a);
		 System.out.println("\n排序后： ");
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println();
	 }
	 @Test
	 public void test4( ){
		 int[] a = ARRAY;
		 System.out.print("排序前： " );
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println( );
		 quickSort(a, 0, a.length-1);
		 System.out.println("\n排序后： ");
		 for(int i = 0; i<a.length; i++){
			 System.out.print( a[i]+" ");
		 }
		 System.out.println();
	 }


}
