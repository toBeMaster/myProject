package se.net;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.junit.Test;

public class InetAddressDemo {
	@Test
	public void testInet1() throws UnknownHostException{
		InetAddress inet = InetAddress.getByName("localhost");
		System.out.println("inet:"+inet);
	}
}
