package com.raos.to_do_backend.models;

import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.AbstractAuthenticationToken;

public class FirebaseAuthenticationToken extends AbstractAuthenticationToken {

    private final FirebaseToken firebaseToken;
    private final User user;

    public FirebaseAuthenticationToken(FirebaseToken firebaseToken) {
        super(null);
        this.firebaseToken = firebaseToken;
        this.user = new User(firebaseToken.getUid(), firebaseToken.getEmail(), firebaseToken.getName(),
                firebaseToken.getPicture());
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public User getPrincipal() {
        return user;
    }

    public FirebaseToken getFirebaseToken() {
        return firebaseToken;
    }
}
