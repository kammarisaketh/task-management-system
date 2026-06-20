package com.saketh.taskmanager.dto;

import com.saketh.taskmanager.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserResponse {

    private final Long id;
    private final String firstName;
    private final String lastName;
    private final String email;
    private final boolean enabled;
    private final Set<String> roles;

    public UserResponse(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.enabled = user.isEnabled();
        this.roles = user.getRoles()
                .stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public Set<String> getRoles() {
        return roles;
    }
}