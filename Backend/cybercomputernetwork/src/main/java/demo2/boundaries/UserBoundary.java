package demo2.boundaries;

import java.util.Map;

public class UserBoundary {
	private String email;
	private String password;
	private Boolean isBlocked;
	private Boolean isResetChanged;
	private Map<String, Object> history;



	public UserBoundary(String email, String password, Boolean isBlocked, Boolean isResetChanged,
			Map<String, Object> history) {
		super();
		this.email = email;
		this.password = password;
		this.isBlocked = isBlocked;
		this.isResetChanged = isResetChanged;
		this.history = history;
	}

	public UserBoundary() {

	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Map<String, Object> getHistory() {
		return history;
	}

	public void setHistory(Map<String, Object> history) {
		this.history = history;
	}

	public Boolean getIsResetChanged() {
		return isResetChanged;
	}

	public void setIsResetChanged(Boolean isResetChanged) {
		this.isResetChanged = isResetChanged;
	}
	

}
