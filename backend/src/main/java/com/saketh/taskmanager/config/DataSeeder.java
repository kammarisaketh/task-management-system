package com.saketh.taskmanager.config;

import com.saketh.taskmanager.entity.Role;
import com.saketh.taskmanager.enums.RoleName;
import com.saketh.taskmanager.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) {

        createRoleIfMissing(RoleName.ADMIN);
        createRoleIfMissing(RoleName.EMPLOYEE);
    }

    private void createRoleIfMissing(RoleName roleName) {

        boolean roleExists = roleRepository
                .findByName(roleName)
                .isPresent();

        if (!roleExists) {
            roleRepository.save(new Role(roleName));
        }
    }
}