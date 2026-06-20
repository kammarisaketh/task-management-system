package com.saketh.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> checkHealth() {
        return Map.of(
                "status", "UP",
                "message", "Task Manager API is running"
        );
    }

    @GetMapping("/protected")
    public Map<String, String> protectedRoute() {
        return Map.of(
                "message", "You accessed a protected endpoint"
        );
    }
}