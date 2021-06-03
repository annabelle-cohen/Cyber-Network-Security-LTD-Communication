package demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo2.boundaries.CustomerBoundary;
import demo2.logic.CustomerService;

@RestController
public class CustomerController {

	private CustomerService customerService;
	
	@Autowired
	public CustomerController(CustomerService customerService) {
		super();
		this.customerService = customerService;
	}

	@RequestMapping(path = "/acs/createCustomer", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public CustomerBoundary createCustomer(@RequestBody CustomerBoundary input) {
		return this.customerService.createCustomer(input);
	}

	@RequestMapping(path = "/acs/customers/{phone}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public CustomerBoundary updateUserDetails(@PathVariable("phone") String phone, @RequestBody CustomerBoundary input) {
		return this.customerService.updateUserDetails(phone, input);
	}

	@RequestMapping(path = "/acs/admin/customer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public CustomerBoundary[] exportAllCustomers(
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "size", required = false, defaultValue = "5") int size) {
		/* add int page and int size to function */
		return this.customerService.exportAllCustomers().toArray(new CustomerBoundary[0]);

	}
}
