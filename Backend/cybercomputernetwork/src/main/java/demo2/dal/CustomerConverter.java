package demo2.dal;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;
import demo2.boundaries.CustomerBoundary;
import demo2.logic.CustomerNotFoundException;

@Component
public class CustomerConverter {

	@PostConstruct
	public void setUp() {

	}

	public CustomerBoundary convertFromEntity(CustomerEntity entity) {

		CustomerBoundary bound = new CustomerBoundary();

		if (entity.getUserName().getFirstName() != null && entity.getUserName().getLastName() != null) {

			bound.setUserName(entity.getUserName().getFirstName() + " " + entity.getUserName().getLastName());
		} else {
			bound.setUserName(null);
		}

		if (entity.getCity() != null) {
			bound.setCity(entity.getCity());
		}

		if (entity.getStreet() != null) {
			bound.setStreet(entity.getStreet());
		}

		if (entity.getHomeNumber() != null && entity.getHomeNumber() > 0) {
			bound.setHomeNumber(entity.getHomeNumber());
		}

		if (entity.getZipCode() != null && entity.getZipCode() > 0) {
			bound.setZipCode(entity.getZipCode());
		}

		if (entity.getPhone() != null && entity.getPhone().length() == 10) {
			bound.setPhone(entity.getPhone());
		}

		if (entity.getInternetGB() != null && entity.getInternetGB() > 0) {
			bound.setInternetGB(entity.getInternetGB());
		}

		bound.setCurrentTimestamp(entity.getCurrentTimestamp());
		return bound;
	}

	public CustomerEntity convertToEntity(CustomerBoundary boundary) {
		CustomerEntity custEntity = new CustomerEntity();
		if (boundary.getUserName() != null) {
			this.checkUserName(boundary.getUserName(), custEntity);
		} else {
			throw new CustomerNotFoundException("Invaild name:" + boundary.getUserName());
		}

		if (boundary.getCity() != null) {
			custEntity.setCity(boundary.getCity());
		} else {
			throw new CustomerNotFoundException("Invaild city name for :" + boundary.getCity());
		}

		if (boundary.getStreet() != null) {
			custEntity.setStreet(boundary.getStreet());
		} else {
			throw new CustomerNotFoundException("Invaild Street name for :" + boundary.getStreet());
		}
		if (boundary.getHomeNumber() != null && boundary.getHomeNumber() > 0) {
			custEntity.setHomeNumber(boundary.getHomeNumber());
		} else {
			throw new CustomerNotFoundException("Invaild Home Number for :" + boundary.getHomeNumber());
		}

		if (boundary.getZipCode() != null && boundary.getZipCode() > 0) {
			custEntity.setZipCode(boundary.getZipCode());
		} else {
			throw new CustomerNotFoundException("Invaild Zipcode for :" + boundary.getZipCode());
		}

		if (boundary.getPhone() != null && boundary.getPhone().length() == 10) {
			custEntity.setPhone(boundary.getPhone());
		} else {
			throw new CustomerNotFoundException("Invaild Phone Number for :" + boundary.getPhone());
		}

		if (boundary.getInternetGB() != null && boundary.getInternetGB() > 0) {
			custEntity.setInternetGB(boundary.getInternetGB());
		} else {
			throw new CustomerNotFoundException("Invaild Internet GB for :" + boundary.getInternetGB());
		}

		custEntity.setCurrentTimestamp(boundary.getCurrentTimestamp());
		return custEntity;
	}

	public void checkUserName(String userName, CustomerEntity custEntity) {

		String[] arr = userName.split(" ");
		if (arr.length > 0) {

			if (arr.length == 2) {
				custEntity.setUserName(new UserName(arr[0], arr[arr.length - 1]));
			} else if (arr.length > 2) {
				StringBuilder firstName = new StringBuilder();
				for (int i = 0; i < arr.length - 1; i++) {

					firstName.append(arr[i] + " ");

				}
				custEntity.setUserName(new UserName(String.valueOf(firstName), arr[arr.length - 1]));
			} else {
				custEntity.setUserName(new UserName(arr[0], ""));
			}
		} else {
			throw new IllegalArgumentException("User Name Must have at least one letter!");
		}
	}

}
