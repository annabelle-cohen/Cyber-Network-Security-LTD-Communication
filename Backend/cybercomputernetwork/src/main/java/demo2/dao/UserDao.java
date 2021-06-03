package demo2.dao;

import org.springframework.data.repository.CrudRepository;

import demo2.dal.UserEntity;

public interface UserDao extends CrudRepository<UserEntity, String> {


}
