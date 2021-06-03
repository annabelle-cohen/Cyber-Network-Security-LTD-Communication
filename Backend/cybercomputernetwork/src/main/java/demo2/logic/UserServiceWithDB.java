package demo2.logic;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map.Entry;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo2.boundaries.UserBoundary;
import demo2.dal.Configuration;
import demo2.dal.UserConverter;
import demo2.dal.UserEntity;
import demo2.dao.UserDao;

@Service
public class UserServiceWithDB implements UserService {

	private UserDao userDao;
	private JavaMailSender mailSender;
	Configuration conf;
	UserConverter userConverter;

	@Autowired
	public void setUserConverter(UserConverter userConverter) {
		this.userConverter = userConverter;
	}

	@Autowired
	public UserServiceWithDB(UserDao userDao, JavaMailSender mailSender) {
		this.userDao = userDao;
		this.mailSender = mailSender;
		this.conf = new Configuration();
	}

	@Override
	@Transactional(readOnly = true)
	public UserBoundary Login(String email, UserBoundary input) {

		/* second check if password is correct else throw exception */
		Optional<UserEntity> userEntity = this.userDao.findById(email);
		if (userEntity.isPresent()) {
			if (userEntity.get().getIsBlocked()) {
				throw new UserNotFoundException("user is blocked");
			} else {
				byte[] salt = this.fromHex(userEntity.get().getSalt());
				byte[] currentHmac = this.fromHex(userEntity.get().gethMac());
				byte[] newHmac = this.generateHash(input.getPassword(), salt);
				boolean isCorrect = Arrays.equals(currentHmac, newHmac);

				if (isCorrect) {
					return this.userConverter.convertFromEntity(userEntity.get());

				} else {
					throw new UserNotFoundException("Username or password isn't correct");
				}
			}
		} else {
			throw new UserNotFoundException("User doesn't exist:" + email);
		}

	}

	@Override
	@Transactional
	public UserBoundary createUser(UserBoundary input) {

		if (this.isValidEmail(input.getEmail())) {
			Optional<UserEntity> userEntity = this.userDao.findById(input.getEmail());
			if (!userEntity.isPresent()) {
				if (input.getPassword().length() >= this.conf.getPasswordLength()) {
					if (!this.readFromOnlineFile(input.getPassword())) {
						if (this.checkString(input.getPassword())) {

							byte[] salt = this.createSalt();
							String hash = this.toHex(this.generateHash(input.getPassword(), salt));
							System.err.println("Real Hashing is:" + hash);
							UserEntity user = this.userConverter.convertToEntity(input);
							user.setSalt(this.toHex(salt));
							user.sethMac(hash);

							this.userDao.save(user);
							return this.userConverter.convertFromEntity(user);
						} else {
							throw new UserNotFoundException(
									"A password must contain at least one capital letter, a special character and a number ");
						}

					} else {
						throw new UserNotFoundException("Too weak Password ");

					}
				} else {
					throw new UserNotFoundException("Password must include minimum 10 characters ");
				}
			} else {
				throw new UserNotFoundException(input.getEmail() + " user already Exist in System");
			}

		} else {
			throw new UserNotFoundException("Invalid email format!");
		}

	}

	@Override
	@Transactional
	public UserBoundary updateUserDetails(UserBoundary input, String email) {
		/* check if password is according configuration and not from the black list */
		/* save old password */
		Optional<UserEntity> userEntity = this.userDao.findById(email);
		if (userEntity.isPresent()) {
			UserEntity entity = userEntity.get();
			UserBoundary userBound = this.userConverter.convertFromEntity(entity);
			int i = 0;
			if (this.checkString(input.getPassword()) && input.getPassword().length() >= this.conf.getPasswordLength()) {
				boolean isAlreadyExistsInHistory = false;
				int mapSize = userBound.getHistory().size()-1;
				
				if (mapSize > this.conf.getHistoryTime()) {
					mapSize -= this.conf.getHistoryTime();
				}else {
					mapSize = 0;
				}

				if (entity.getHistory().length() > 0) {
					for (Entry<String, Object> entry : userBound.getHistory().entrySet()) {

						if (i == mapSize) {
							byte[] saltHistory = this.fromHex(entry.getKey());
							byte[] hMac = this.fromHex(String.valueOf(entry.getValue()));
							byte[] tempHmac = this.generateHash(input.getPassword(), saltHistory);
							boolean isExist = Arrays.equals(hMac, tempHmac);
							if (!isExist) {
								isAlreadyExistsInHistory = false;
							} else {
								throw new UserNotFoundException("Password already used");
							}
							mapSize++;

						}

						i++;
					}
				}

				if (!isAlreadyExistsInHistory && !this.readFromOnlineFile(input.getPassword())) {
					byte[] saltExist = this.fromHex(entity.getSalt());
					byte[] hMacExist = this.fromHex(entity.gethMac());
					byte[] checkHmac = this.generateHash(input.getPassword(), saltExist);
					boolean isTheSame = Arrays.equals(hMacExist, checkHmac);
					if (!isTheSame) {
						HashMap<String,Object> tempHistory = new LinkedHashMap<>();
						for (Entry<String, Object> entry : userBound.getHistory().entrySet()) {
							tempHistory.put(entry.getKey(), entry.getValue());
						}
						tempHistory.put(entity.getSalt(), entity.gethMac());
						input.setHistory(tempHistory);
						// calculate new salt for user
						byte[] newSalt = this.createSalt();
						byte[] newHmac = this.generateHash(input.getPassword(), newSalt);
						UserEntity userEntityNew = this.userConverter.convertToEntity(input);
						userEntityNew.setSalt(this.toHex(newSalt));
						userEntityNew.sethMac(this.toHex(newHmac));
						this.userDao.save(userEntityNew);
					} else {
						throw new UserNotFoundException("You try to change password to same password ");
					}
				}

			} else {
				throw new UserNotFoundException("Inavlid password");
			}

		} else {
			throw new UserNotFoundException("User doesn't exist:" + input.getEmail());
		}

		return input;
	}

	@Override
	public UserBoundary updateIsBlocking(UserBoundary input, String email) {
		Optional<UserEntity> userEntity = this.userDao.findById(email);
		if (userEntity.isPresent()) {
			input.setIsBlocked(true);
			UserEntity entity = this.userConverter.convertToEntity(input);
			this.userDao.save(entity);

		} else {
			throw new UserNotFoundException("Did not found user for " + email);
		}

		return input;

	}

	@Override
	public UserBoundary forgotPassword(String email) {
		Optional<UserEntity> userEntity = this.userDao.findById(email);
		if (userEntity.isPresent()) {
			UserBoundary bound = this.userConverter.convertFromEntity(userEntity.get());

			String randPass = this.generateRandomShaPass();
			bound.setPassword(randPass);
			String body = "Your verification password is :" + randPass;
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("ltdco805@gmail.com");
			message.setTo(email);
			message.setText(body);
			message.setSubject("Reset Password LTD Communication");

			mailSender.send(message);
			return bound;

		} else {
			throw new UserNotFoundException("Could not reset password for email: " + email);
		}

	}

	@Override
	@Transactional
	public void deleteAllUseres(String email) {
		/* delete all users for us not for the web */
		this.userDao.deleteAll();

	}

	public boolean checkString(String input) {
		String specialChars = this.conf.getCompilation();
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

	private byte[] generateHash(String password, byte[] salt) {
		try {
			// Get a SHA-1 MessageDigest
			MessageDigest digest = MessageDigest.getInstance("SHA-1");
			// Add the salt to MessageDigest
			digest.update(salt);
			// Digest the password,notice that we get the password as byte array.
			byte[] hash = digest.digest(password.getBytes());
			// Reset the MessageDigest,just in case
			digest.reset();

			return hash;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return salt;

	}

	@SuppressWarnings({ "static-access", "unused" })
	private String generateRandomShaPass() {
		byte[] rand = new byte[3];
		SecureRandom random;
		try {
			random = new SecureRandom().getInstance("SHA1PRNG");
			random.nextBytes(rand);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return this.toHex(rand);
	}

	private String toHex(byte[] array) {
		// Create a new BigInteger with the byte array
		BigInteger bi = new BigInteger(1, array);
		// get the big integer as a string
		String hex = bi.toString(16);
		// Calculate the padding length
		int paddingLength = (array.length * 2) - hex.length();
		// If there is any padding
		if (paddingLength > 0) {
			// Format the padding length and cocatenate the hex stirng
			return String.format("%0" + paddingLength + "d", 0) + hex;
		} else {
			// Else just return the hex string
			return hex;
		}
	}

	private byte[] fromHex(String hex) {
		// Create a byte array with half of the hex string length
		byte[] binary = new byte[hex.length() / 2];
		// For 0 to byte array length
		for (int i = 0; i < binary.length; i++) {
			// Parse 2 chars from base 16 to 2
			binary[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);

		}
		// return the bute array
		return binary;
	}

	@SuppressWarnings("static-access")
	private byte[] createSalt() {
		byte[] salt = new byte[16];
		SecureRandom random;
		try {
			random = new SecureRandom().getInstance("SHA1PRNG");
			random.nextBytes(salt);
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		return salt;
	}

	public boolean readFromOnlineFile(String password) {
		boolean isEqual = false;
		try {
			if (this.conf.isDicAvoid()) {
				URL oracle = new URL(this.conf.getPath());
				BufferedReader in = new BufferedReader(new InputStreamReader(oracle.openStream()));

				String inputLine;

				while ((inputLine = in.readLine()) != null) {

					String[] parts = inputLine.split("	");
					if (!isEqual) {
						isEqual = password.equals(parts[1]);
					}

				}
				in.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return isEqual;

	}

}
