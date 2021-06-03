package demo2.dal;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="CUSTOMERS")
public class CustomerEntity {
	
	private UserName userName;
	private String phone;
	private String city;
	private String street;
	private Integer homeNumber;
	private Integer zipCode;
	private Double internetGB;
	private Date currentTimestamp;
	
	public CustomerEntity() {
		super();
	}
	
	@Embedded
	public UserName getUserName() {
		return userName;
	}
	public void setUserName(UserName userName) {
		this.userName = userName;
	}
	
	@Id
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public Integer getHomeNumber() {
		return homeNumber;
	}
	public void setHomeNumber(Integer homeNumber) {
		this.homeNumber = homeNumber;
	}
	public Integer getZipCode() {
		return zipCode;
	}
	public void setZipCode(Integer zipCode) {
		this.zipCode = zipCode;
	}
	public Double getInternetGB() {
		return internetGB;
	}
	public void setInternetGB(Double internetGB) {
		this.internetGB = internetGB;
	}	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="MESSAGE_TIMESTAMP") //  set column name: MESSAGE_TIMESTAMP
	public Date getCurrentTimestamp() {
		return currentTimestamp;
	}
	
	public void setCurrentTimestamp(Date currentTimestamp) {
		this.currentTimestamp = currentTimestamp;
	}

}
