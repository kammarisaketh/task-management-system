package com.saketh.taskmanager.service;

import com.saketh.taskmanager.dto.AuthResponse;
import com.saketh.taskmanager.dto.LoginRequest;
import com.saketh.taskmanager.dto.LoginResponse;
import com.saketh.taskmanager.dto.RegisterRequest;
import com.saketh.taskmanager.entity.Role;
import com.saketh.taskmanager.entity.User;
import com.saketh.taskmanager.enums.RoleName;
import com.saketh.taskmanager.repository.RoleRepository;
import com.saketh.taskmanager.repository.UserRepository;
import com.saketh.taskmanager.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        String normalizedEmail = request.getEmail()
                .trim()
                .toLowerCase();

        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new IllegalArgumentException(
                    "An account already exists with this email"
            );
        }

        Role employeeRole = roleRepository
                .findByName(RoleName.EMPLOYEE)
                .orElseGet(() ->
                        roleRepository.save(
                                new Role(RoleName.EMPLOYEE)
                        )
                );

        User user = new User();
        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());
        user.setEmail(normalizedEmail);
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.getRoles().add(employeeRole);

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "User registered successfully",
                savedUser.getId(),
                savedUser.getEmail()
        );
    }

    public LoginResponse login(LoginRequest request) {

        String normalizedEmail = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository
                .findByEmail(normalizedEmail)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new IllegalArgumentException(
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(user.getEmail());

        Set<String> roles = user.getRoles()
                .stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet());

        return new LoginResponse(
                token,
                "Bearer",
                user.getEmail(),
                roles
        );
    }
}