package demo2.logic;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import demo2.boundaries.CustomerBoundary;
import demo2.dal.CustomerConverter;
import demo2.dal.CustomerEntity;

//@Service
public class CustomerServiceImplemntation implements CustomerService {

	private Map<String, CustomerEntity> database;
	private CustomerConverter customerConverter;

	@Autowired
	public void setCustomerConverter(CustomerConverter customerConverter) {
		this.customerConverter = customerConverter;
	}

	@PostConstruct
	public void Init() {
		// create thread safe list
		this.database = Collections.synchronizedMap(new HashMap<>());
	}

	@Override
	public CustomerBoundary createCustomer(CustomerBoundary input) {
		/* maybe add tests */

		if (!database.containsKey(input.getPhone())) {
			CustomerEntity custEntity = customerConverter.convertToEntity(input);
			custEntity.setCurrentTimestamp(new Date());
			database.put(custEntity.getPhone(), custEntity);
		} else {
			throw new CustomerNotFoundException("Customer Already exist in the system");
		}
		return this.customerConverter.convertFromEntity(this.customerConverter.convertToEntity(input));
	}

	@Override
	public CustomerBoundary updateUserDetails(String phone, CustomerBoundary input) {
		/* chekc if phone exist in DB */
		/* change the matching fields */
		if (database.containsKey(phone)) {
			CustomerEntity custEntity = database.get(phone);

			if (!custEntity.getCity().equals(input.getCity())) {
				custEntity.setCity(input.getCity());
			}

			if (!custEntity.getStreet().equals(input.getStreet())) {
				custEntity.setStreet(input.getStreet());
			}

		

			if (custEntity.getHomeNumber() != input.getHomeNumber() && input.getHomeNumber() != null
					&& input.getHomeNumber() > 0) {
				custEntity.setHomeNumber(input.getHomeNumber());
			}

			if (custEntity.getZipCode() != input.getZipCode() && input.getZipCode() != null && input.getZipCode() > 0) {
				custEntity.setZipCode(input.getZipCode());
			}

			if (custEntity.getInternetGB() != input.getInternetGB() && input.getInternetGB() != null
					&& input.getInternetGB() > 0) {
				custEntity.setInternetGB(input.getInternetGB());
			}

		} else {
			throw new CustomerNotFoundException("Customer Not exist in the system");
		}
		return null;
	}

	@Override
	public List<CustomerBoundary> exportAllCustomers() {
		/* return all the users from DB */
		// need stream to return list of entity to boundary
		return this.database.values().stream().map(entity -> this.customerConverter.convertFromEntity(entity))
				.collect(Collectors.toList());
	}

}
