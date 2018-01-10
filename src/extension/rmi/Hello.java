package extension.rmi;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class Hello extends UnicastRemoteObject implements HelloInterface {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String message;
	protected Hello(String msg) throws RemoteException {
	//	 super();
		 message = msg;
	}

	@Override
	public String say() throws RemoteException {
		System.out.print("called by helloClient!");
		return message;
	}

}
