package extension.snmp;

import java.io.IOException;

import java.util.Vector;

import org.snmp4j.CommunityTarget;

import org.snmp4j.PDU;

import org.snmp4j.Snmp;

import org.snmp4j.TransportMapping;

import org.snmp4j.event.ResponseEvent;

import org.snmp4j.mp.SnmpConstants;

import org.snmp4j.smi.Address;

import org.snmp4j.smi.GenericAddress;

import org.snmp4j.smi.Integer32;

import org.snmp4j.smi.OID;

import org.snmp4j.smi.OctetString;

import org.snmp4j.smi.VariableBinding;

import org.snmp4j.transport.DefaultUdpTransportMapping;

/**
 * 
 * 
 * @author zhanjia
 * 
 * 
 */

public class SnmpUtilSendTrap {

	private Snmp snmp = null;

	private Address targetAddress = null;

	public void initComm() throws IOException {

		// ���ù����̵�IP�Ͷ˿�

		targetAddress = GenericAddress.parse("udp:192.168.32.187/162");

		TransportMapping transport = new DefaultUdpTransportMapping();

		snmp = new Snmp(transport);

		transport.listen();

	}

	/**
	 * 
	 * 
	 * 
	 * 
	 * @throws IOException
	 */

	public void sendPDU() throws IOException {


		CommunityTarget target = new CommunityTarget();

		target.setAddress(targetAddress);


		target.setRetries(2);


		target.setTimeout(1500);


		target.setVersion(SnmpConstants.version2c);


		PDU pdu = new PDU();

		pdu.setRequestID((new Integer32(1234)));

		pdu.setType(1);

		pdu.setErrorIndex(2);

		pdu.add(new VariableBinding(new OID(".1.3.6.1.2.3377.10.1.1.1.1"),

		new OctetString("SnmpTrap")));

		pdu.add(new VariableBinding(new OID(".1.3.6.1.2.3377.10.1.1.1.2"),

		new OctetString("JavaEE")));

		pdu.add(new VariableBinding(new OID(".1.3.6.1.2.3377.10.1.1.1.3"),

		new OctetString("aaa")));

		pdu.add(new VariableBinding(new OID(".1.3.6.1.2.3377.10.1.1.1.4"),

		new OctetString("ccc")));

		pdu.add(new VariableBinding(new OID("1"),

		new OctetString("wcnmlgb")));

		pdu.setType(PDU.TRAP);


		ResponseEvent respEvnt = snmp.send(pdu, target);

		if (respEvnt != null && respEvnt.getResponse() != null) {

			Vector<VariableBinding> recVBs = (Vector<VariableBinding>) respEvnt
					.getResponse().getVariableBindings();

			for (int i = 0; i < recVBs.size(); i++) {

				VariableBinding recVB = recVBs.elementAt(i);

				System.out
						.println(recVB.getOid() + " : " + recVB.getVariable());

			}

		}

		else {

			System.out.println("8111111111111111");

		}

	}

	public static void main(String[] args) {

		try {

			SnmpUtilSendTrap util = new SnmpUtilSendTrap();

			util.initComm();

			util.sendPDU();

		} catch (Exception e) {

			e.printStackTrace();

		}

	}

}
