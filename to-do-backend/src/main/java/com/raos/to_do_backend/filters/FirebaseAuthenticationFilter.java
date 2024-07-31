package com.raos.to_do_backend.filters;

import com.google.firebase.auth.FirebaseAuthException;
import com.raos.to_do_backend.service.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class FirebaseAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private AuthenticationService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("Arrived here");

        // Get token from the Authorization header
        String token = authService.getBearerToken(request.getHeader("Authorization"));
        try {
            // Decode and verify the token
            if (token != null)
                authService.verifyAccess(token);
        } catch (FirebaseAuthException e) {
            // If the token is invalid, return a 401 response
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
            return;
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
