package se.base;

import org.junit.Test;

public class Arithmetic {
	@Test
	public void triangle(){
		int level =8;
		for(int i=0;i<level;i++){
			for(int j=0;j<level*2;j++){
				String ch =" ";
				if(j==level-i || j==level+i){
					ch="*";
				}
				if(i==level-1 && j>=level-i &&j<=level+i //×îºóÒ»²ã
						&& j%2!=0){
					ch="*";
				}
				System.out.print(ch);
			}
			System.out.println();
		}
	}
}
