package com.raos.to_do_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.raos.to_do_backend.repo.ToDoItemRepository;

@SpringBootApplication(scanBasePackages = { "com.raos.to_do_backend" })
public class ToDoBackendApplication implements CommandLineRunner {
	@Autowired
	private ToDoItemRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(ToDoBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		repository.deleteAll();
	}

}
