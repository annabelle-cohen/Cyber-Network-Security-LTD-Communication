package demo2.logic;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo2.boundaries.CustomerBoundary;
import demo2.dal.CustomerConverter;
import demo2.dal.CustomerEntity;
import demo2.dao.CustomerDao;

@Service
public class CustomerServiceWithDB implements CustomerService {

	// private Map<String, CustomerEntity> database;
	private CustomerDao customerDao;
	private CustomerConverter customerConverter;

	@Autowired
	public void setCustomerConverter(CustomerConverter customerConverter) {
		this.customerConverter = customerConverter;
	}

	@Autowired
	public CustomerServiceWithDB(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	@Override
	@Transactional
	public CustomerBoundary createCustomer(CustomerBoundary input) {
		/* maybe add tests */
		Optional<CustomerEntity> customerEntity = this.customerDao.findById(input.getPhone());
		if (!customerEntity.isPresent()) {
			CustomerEntity custEntity = customerConverter.convertToEntity(input);
			custEntity.setCurrentTimestamp(new Date());

			this.customerDao.save(custEntity);
		} else {
			throw new CustomerNotFoundException("Customer Already exist in the system");
		}
		return this.customerConverter.convertFromEntity(this.customerConverter.convertToEntity(input));
	}

	@Override
	@Transactional
	public CustomerBoundary updateUserDetails(String phone, CustomerBoundary input) {
		/* chekc if phone exist in DB */
		/* change the matching fields */
		Optional<CustomerEntity> customerEntity = this.customerDao.findById(input.getPhone());
		if (customerEntity.isPresent()) {
			CustomerEntity custEntity = customerEntity.get();

			if (!custEntity.getCity().equals(input.getCity())) {
				custEntity.setCity(input.getCity());
			}

			if (!custEntity.getStreet().equals(input.getStreet())) {
				custEntity.setStreet(input.getStreet());
			}

			if (input.getUserName() != null) {
				this.customerConverter.checkUserName(input.getUserName(), custEntity);
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

			this.customerDao.save(custEntity);

		} else {
			throw new CustomerNotFoundException("Customer Not exist in the system");
		}
		return input;
	}

	@Override
	@Transactional(readOnly = true)
	public List<CustomerBoundary> exportAllCustomers() {
		/* return all the users from DB */
		// need stream to return list of entity to boundary
		List<CustomerBoundary> rv = new ArrayList<>();
		Iterable<CustomerEntity> content = this.customerDao.findAll();
		for (CustomerEntity cst : content) {
			rv.add(this.customerConverter.convertFromEntity(cst));
		}

		return rv;
	}

}
