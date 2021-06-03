package demo2.logic;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import demo2.boundaries.UserBoundary;
import demo2.dal.UserConverter;
import demo2.dal.UserEntity;

//@Service
public class UserServiceImplemntation implements UserService {

	private Map<String, UserEntity> database;
	UserConverter userConverter;

	@Autowired
	public void setUserConverter(UserConverter userConverter) {
		this.userConverter = userConverter;
	}

	@PostConstruct
	public void Init() {
		// create thread safe list
		this.database = Collections.synchronizedMap(new HashMap<>());
	}

	@Override
	public UserBoundary Login(String email, UserBoundary input) {
		/* first check if user exist in DB */
		/**
		 * check if the user try at least 3 time to login and then lock by client side
		 */
		/* second check if password is correct else throw exception */
		UserEntity userEntity = null;
		if (database.containsKey(email)) {
			userEntity = database.get(email);
			/* need calculate the hmac with th salt on the given password from the input */
			/*
			 * also check if there is a match between the saved user in the database and the
			 * goven input by the hmac value
			 */

		} else {
			throw new UserNotFoundException("User doesn't exist:" + email);
		}

		return this.userConverter.convertFromEntity(userEntity);
	}

	@Override
	public UserBoundary createUser(UserBoundary input) {

		UserEntity userEntity = this.userConverter.convertToEntity(input);

		if (!database.containsKey(userEntity.getEmail())) {
			if (this.isValidEmail(input.getEmail())) {
				if (input.getPassword().length() >= 10) {
					if (this.checkString(input.getPassword())) {
						/** soon need calculate salt and hmac !!!! in another package and then save **/
						database.put(input.getEmail(), userEntity);

					} else {
						throw new UserNotFoundException(
								"A password must contain at least one capital letter, a special character and a number ");
					}
				} else {
					throw new UserNotFoundException("Password must include minimum 10 characters ");
				}
			} else {
				throw new UserNotFoundException("Invalid email format!");
			}

		} else {
			throw new UserNotFoundException(userEntity.getEmail() + " user already Exist in System");
		}

		return this.userConverter.convertFromEntity(userEntity);
	}

	@Override
	public UserBoundary updateUserDetails(UserBoundary input, String email) {
		/* check if password is according configuration and not from the black list */
		/* save old password */

		if (database.containsKey(email)) {
			UserEntity entity = this.database.get(email);
			int i = 0;
			boolean isCheckSpecial = false;
			boolean isAlreadyExistsInHistory = false;

			// for 3 last passwords
			int mapSize = input.getHistory().size();

			if (mapSize > 3) {
				mapSize -= 3;
				isCheckSpecial = true;
			}

			for (Object obj : input.getHistory().values()) {
				i++;
				if (isCheckSpecial) {
					if (i == mapSize) {
						System.err.println("calaculate with sal and hmac");
						mapSize++;
					}
				} else {
					System.err.println("calaculate with sal and hmac regulare");
				}

			}

			if (!isAlreadyExistsInHistory) {
				// check if not from black list
				if (this.checkString(input.getPassword())) {
					// if every thing is fine then we calculate the new hmac and save it with the
					// exist salt
					// and save the old password in the map
					input.getHistory().put("Salt test", "Hmac value");
					input.setPassword(input.getPassword());
					entity = userConverter.convertToEntity(input);
					// set to the salt and hmac
				} else {
					throw new UserNotFoundException(
							"A password must contain at least one capital letter, a special character and a number ");
				}
			}

		} else {
			throw new UserNotFoundException("User doesn't exist:" + input.getEmail());
		}

		return input;
	}

	@Override
	public void deleteAllUseres(String email) {
		/* delete all users for us not for the web */
		this.database.clear();

	}

	public boolean checkString(String input) {
		String specialChars = "~`!@#$%^&*()-_=+\\|[{]};:'\",<.>/?";
		char currentCharacter;
		boolean numberPresent = false;
		boolean upperCasePresent = false;
		boolean lowerCasePresent = false;
		boolean specialCharacterPresent = false;

		for (int i = 0; i < input.length(); i++) {
			currentCharacter = input.charAt(i);
			if (Character.isDigit(currentCharacter)) {
				numberPresent = true;
			} else if (Character.isUpperCase(currentCharacter)) {
				upperCasePresent = true;
			} else if (Character.isLowerCase(currentCharacter)) {
				lowerCasePresent = true;
			} else if (specialChars.contains(String.valueOf(currentCharacter))) {
				specialCharacterPresent = true;
			}
		}

		return numberPresent && upperCasePresent && lowerCasePresent && specialCharacterPresent;
	}

	public boolean isValidEmail(String email) {
		String emailFormat = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		return email.matches(emailFormat);
	}

	@Override
	public UserBoundary updateIsBlocking(UserBoundary input, String email) {
		// TODO Auto-generated method stub
		return input;
	}

	@Override
	public UserBoundary forgotPassword(String email) {
		// TODO Auto-generated method stub
		return null;
	}

}
