package com.saketh.taskmanager.dto;

import java.util.Set;

public class LoginResponse {

    private String token;
    private String tokenType;
    private String email;
    private Set<String> roles;

    public LoginResponse() {
    }

    public LoginResponse(String token, String tokenType, String email, Set<String> roles) {
        this.token = token;
        this.tokenType = tokenType;
        this.email = email;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}