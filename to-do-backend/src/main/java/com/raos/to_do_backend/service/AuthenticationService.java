package com.raos.to_do_backend.service;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.raos.to_do_backend.models.FirebaseAuthenticationToken;
import com.raos.to_do_backend.models.User;

@Service
public class AuthenticationService {

    public User getUser() {
        // Get authentication
        var authentication = getAuthentication();

        if (authentication == null) {
            return null;
        }

        // Get principal
        return authentication.getPrincipal();
    }

    public FirebaseAuthenticationToken getAuthentication() {
        // Get authentication from the SecurityContext
        SecurityContext context = SecurityContextHolder.getContext();
        return (FirebaseAuthenticationToken) context.getAuthentication();
    }

    public void setAuthentication(FirebaseAuthenticationToken authentication) {
        // Set authentication into the security context
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(authentication);
    }

    public void clearAuthentication() {
        SecurityContext context = SecurityContextHolder.getContext();
        context.setAuthentication(null);
    }

    public boolean isAuthenticated() {
        return getAuthentication() != null;
    }

    public String getBearerToken(String authHeader) {
        // Get the Authorization header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        // Get the token
        return authHeader.substring(7);
    }

    public void verifyAccess(String token) throws FirebaseAuthException {
        // Decode and verify the token
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);

        if (decodedToken == null) {
            throw new IllegalArgumentException("Invalid token");
        }

        // Set the authentication object in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(new FirebaseAuthenticationToken(decodedToken));

    }
}
