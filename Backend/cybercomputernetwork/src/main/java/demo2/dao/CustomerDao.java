package demo2.dao;

import demo2.dal.CustomerEntity;

import org.springframework.data.repository.CrudRepository;

public interface CustomerDao extends CrudRepository<CustomerEntity, String> {

}
