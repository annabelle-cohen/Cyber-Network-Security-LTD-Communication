package demo2.logic;

public class CustomerNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 7959630775218620404L;

	public CustomerNotFoundException() {
		super();
	}

	public CustomerNotFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public CustomerNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public CustomerNotFoundException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	
	

}
