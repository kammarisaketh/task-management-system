package com.saketh.taskmanager.repository;

import com.saketh.taskmanager.entity.Task;

import com.saketh.taskmanager.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignee(User assignee);

    List<Task> findByCreatedBy(User createdBy);

}