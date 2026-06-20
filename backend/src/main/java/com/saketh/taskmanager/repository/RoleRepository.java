package com.saketh.taskmanager.repository;

import com.saketh.taskmanager.entity.Role;

import com.saketh.taskmanager.enums.RoleName;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByName(RoleName name);

}