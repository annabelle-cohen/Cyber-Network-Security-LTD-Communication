package demo2.boundaries;

import java.util.Date;

public class CustomerBoundary {

	private String userName;
	private String phone;
	private String city;
	private String street;
	private Integer homeNumber;
	private Integer zipCode;
	private Double internetGB;
	private Date currentTimestamp;


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public CustomerBoundary() {

	}

	public Date getCurrentTimestamp() {
		return currentTimestamp;
	}

	public void setCurrentTimestamp(Date currentTimestamp) {
		this.currentTimestamp = currentTimestamp;
	}


	public CustomerBoundary(String userName, String phone, String city, String street, Integer homeNumber,
			Integer zipCode, Double internetGB, Date currentTimestamp) {
		super();
		this.userName = userName;
		this.phone = phone;
		this.city = city;
		this.street = street;
		this.homeNumber = homeNumber;
		this.zipCode = zipCode;
		this.internetGB = internetGB;
		this.currentTimestamp = currentTimestamp;
	}

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

}
