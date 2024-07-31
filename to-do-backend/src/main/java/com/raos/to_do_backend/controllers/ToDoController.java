package com.raos.to_do_backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raos.to_do_backend.models.ToDoItem;
import com.raos.to_do_backend.service.AuthenticationService;
import com.raos.to_do_backend.service.ToDoItemService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {
    @Autowired
    private ToDoItemService service;
    @Autowired
    private AuthenticationService authService;

    @GetMapping
    public List<ToDoItem> findAll() {
        System.out.println("Arrived to /api/todos");
        return service.getAllItems(authService.getUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDoItem> getMethodName(@PathVariable String id) {
        // Get the item by ID
        return service.getItem(
                authService.getUser(), id).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());

    }

    @PostMapping
    public ResponseEntity<ToDoItem> createItem(@RequestBody ToDoItem item) {
        // Create a new item
        ToDoItem createdItem = service.createItem(authService.getUser(), item);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoItem> updateItem(@PathVariable String id, @RequestBody ToDoItem item) {
        // Update an existing item
        Optional<ToDoItem> updatedItem = service.updateItem(authService.getUser(), id, item);
        return updatedItem.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        // Delete an item
        boolean deleted = service.deleteItem(authService.getUser(), id);

        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
