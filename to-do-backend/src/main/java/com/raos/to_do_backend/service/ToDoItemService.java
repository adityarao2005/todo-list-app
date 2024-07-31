package com.raos.to_do_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.raos.to_do_backend.models.ToDoItem;
import com.raos.to_do_backend.models.User;
import com.raos.to_do_backend.repo.ToDoItemRepository;

@Service
public class ToDoItemService {
    @Autowired
    private ToDoItemRepository repository;

    public ToDoItemService(ToDoItemRepository repository) {
        this.repository = repository;
    }

    public List<ToDoItem> getAllItems(User user) {
        System.out.println(user.getId());
        return repository.findByUserID(user.getId());
    }

    public Optional<ToDoItem> getItem(User user, String id) {
        return repository.findOptionalByIdAndUserID(id, user.getId());
    }

    public ToDoItem createItem(User user, ToDoItem item) {
        item.setUserID(user.getId());
        return repository.save(item);
    }

    public Optional<ToDoItem> updateItem(User user, String id, ToDoItem item) {
        return repository.findOptionalByIdAndUserID(id, user.getId()).map(existingItem -> {
            existingItem.setCompleted(item.isCompleted());
            existingItem.setTitle(item.getTitle());
            return repository.save(existingItem);
        });
    }

    public boolean deleteItem(User user, String id) {
        Optional<ToDoItem> item = repository.findOptionalByIdAndUserID(id, user.getId());
        if (item.isPresent()) {
            repository.delete(item.get());
            return true;
        } else {
            return false;
        }
    }
}
