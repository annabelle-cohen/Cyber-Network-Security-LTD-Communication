package demo2.dal;

import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import demo2.boundaries.UserBoundary;


@Component
public class UserConverter {
	private ObjectMapper jackson;

	@PostConstruct
	public void setUp() {
		this.jackson = new ObjectMapper();
	}

	public UserBoundary convertFromEntity(UserEntity entity) {
		UserBoundary userBound = new UserBoundary();
		if (entity.getEmail() != null) {
			userBound.setEmail(entity.getEmail());
		}

		if (entity.getIsBlocked() != null) {
			userBound.setIsBlocked(entity.getIsBlocked());
		}

		if (entity.getIsResetChanged() != null) {
			userBound.setIsResetChanged(entity.getIsResetChanged());
		}

		// unmarshalling
		try {
			@SuppressWarnings("unchecked")
			Map<String, Object> readValue = (Map<String, Object>) this.jackson.readValue(entity.getHistory(), // JSON
					Map.class);
			userBound.setHistory(readValue);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return userBound;
	}

	public UserEntity convertToEntity(UserBoundary boundary) {
		UserEntity userEntity = new UserEntity();
		if (boundary.getEmail() != null) {
			userEntity.setEmail(boundary.getEmail());
		}

		if (boundary.getIsBlocked() != null) {
			userEntity.setIsBlocked(boundary.getIsBlocked());
		}

		if (boundary.getIsResetChanged() != null) {
			userEntity.setIsResetChanged(boundary.getIsResetChanged());
		}

		// marshalling
		try {
			userEntity.setHistory(this.jackson.writeValueAsString(boundary.getHistory()));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return userEntity;
	}

}
