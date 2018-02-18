package extension.web.httpServer;

import java.io.IOException;

public class StaticResourceProcessor {

	public void process(Request request, Response response) {
		// TODO Auto-generated method stub
		try {
			response.sendStaticResource();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}