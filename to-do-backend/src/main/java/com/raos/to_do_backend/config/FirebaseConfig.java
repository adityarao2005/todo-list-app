package com.raos.to_do_backend.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Configuration
public class FirebaseConfig {
    @Value("classpath:serviceAccountKey.json")
    private Resource firebaseConfig;

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(firebaseConfig.getInputStream()))
                .build();

        return FirebaseApp.getApps().size() == 0 ? FirebaseApp.initializeApp(options) : FirebaseApp.getApps().get(0);

    }
}
