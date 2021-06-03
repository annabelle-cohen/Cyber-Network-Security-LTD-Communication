package demo2.logic;

import java.util.List;

import demo2.boundaries.CustomerBoundary;

public interface CustomerService {
	
	public CustomerBoundary createCustomer(CustomerBoundary input);
	
	public CustomerBoundary updateUserDetails(String phone, CustomerBoundary input);
	
	public List<CustomerBoundary> exportAllCustomers();

}
