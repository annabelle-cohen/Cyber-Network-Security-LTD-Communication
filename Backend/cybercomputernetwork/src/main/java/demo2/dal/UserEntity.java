package demo2.dal;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "USERS")
public class UserEntity {

	private String email;
	private String hMac;
	private String salt;
	private Boolean isBlocked;
	private Boolean isResetChanged;

	private String history;

	public UserEntity() {
		super();
	}

	@Id
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Lob
	public String gethMac() {
		return hMac;
	}

	public void sethMac(String hMac) {
		this.hMac = hMac;
	}

	@Lob
	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
	@Lob
	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}
	
	public Boolean getIsResetChanged() {
		return isResetChanged;
	}

	public void setIsResetChanged(Boolean isResetChanged) {
		this.isResetChanged = isResetChanged;
	}


}
