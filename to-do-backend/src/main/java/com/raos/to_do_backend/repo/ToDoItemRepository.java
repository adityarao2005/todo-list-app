package com.raos.to_do_backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.raos.to_do_backend.models.ToDoItem;

public interface ToDoItemRepository extends MongoRepository<ToDoItem, String> {

    Optional<ToDoItem> findOptionalByIdAndUserID(String id, String userID);

    List<ToDoItem> findByUserID(String userID);
}