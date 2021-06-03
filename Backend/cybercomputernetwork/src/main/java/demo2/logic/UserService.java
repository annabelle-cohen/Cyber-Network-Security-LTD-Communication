package demo2.logic;

import demo2.boundaries.UserBoundary;

public interface UserService {
	
	public UserBoundary Login(String email, UserBoundary input);
	
	public UserBoundary createUser(UserBoundary input);
	
	public UserBoundary updateUserDetails(UserBoundary input,String email);
	
	public void deleteAllUseres(String email);

	public UserBoundary updateIsBlocking(UserBoundary input, String email);

	public UserBoundary forgotPassword(String email);
	

}
