package com.raos.to_do_backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "to_do_items")
public class ToDoItem {
    // Fields
    @Id
    private String id;
    private String userID;
    private String title;
    private boolean completed;

    // Constructors
    public ToDoItem() {
    }

    public ToDoItem(String id, String userID, String title, boolean completed) {
        this.id = id;
        this.userID = userID;
        this.title = title;
        this.completed = completed;
    }


    // Getters
    public String getId() {
        return id;
    }

    public String getUserID() {
        return userID;
    }

    public String getTitle() {
        return title;
    }   

    public boolean isCompleted() {
        return completed;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    @Override
    public String toString() {
        return String.format("ToDoItem[id=%s, userID='%s', title='%s', completed='%s']", id, userID, title, String.valueOf(completed));
    }
}
