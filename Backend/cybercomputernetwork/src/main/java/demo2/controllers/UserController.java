package demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import demo2.boundaries.UserBoundary;
import demo2.logic.UserService;

@CrossOrigin
@RestController
public class UserController {
	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
	}

	@RequestMapping(path = "/acs/users/login/{useremail}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary Login(@PathVariable("useremail") String email, @RequestBody UserBoundary input) {
		return this.userService.Login(email, input);

	}

	@RequestMapping(path = "/acs/createUser", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary createUser(@RequestBody UserBoundary input) {

		return this.userService.createUser(input);
	}

	@RequestMapping(path = "/acs/users/{email}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateUserDetails(@RequestBody UserBoundary input, @PathVariable("email") String email) {
		this.userService.updateUserDetails(input, email);
	}

	@RequestMapping(path = "/acs/usersBlocks/{email}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary updateBlocking(@RequestBody UserBoundary input, @PathVariable("email") String email) {
		return this.userService.updateIsBlocking(input, email);
	}

	@RequestMapping(path = "/acs/admin/users/{adminEmail}", method = RequestMethod.DELETE)
	public void deleteAllUseres(@PathVariable("adminEmail") String email) {// throws Exception {

		this.userService.deleteAllUseres(email);
	}

	@RequestMapping(path = "/acs/users/forgotPassword/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserBoundary forgotPassword(@PathVariable("useremail") String email) {// throws Exception {

		return this.userService.forgotPassword(email);
	}

}
