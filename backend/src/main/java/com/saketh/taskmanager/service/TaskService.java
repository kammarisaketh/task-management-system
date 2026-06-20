package com.saketh.taskmanager.service;

import com.saketh.taskmanager.dto.TaskRequest;
import com.saketh.taskmanager.dto.TaskResponse;
import com.saketh.taskmanager.dto.TaskStatusUpdateRequest;
import com.saketh.taskmanager.entity.Task;
import com.saketh.taskmanager.entity.User;
import com.saketh.taskmanager.exception.ForbiddenException;
import com.saketh.taskmanager.exception.ResourceNotFoundException;
import com.saketh.taskmanager.repository.TaskRepository;
import com.saketh.taskmanager.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(
            TaskRepository taskRepository,
            UserRepository userRepository
    ) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskResponse createTask(TaskRequest request) {

        User currentUser = getCurrentUser();

        User assignee = null;

        if (request.getAssigneeId() != null) {
            assignee = userRepository
                    .findById(request.getAssigneeId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Assignee not found"
                            )
                    );
        }

        Task task = new Task();
        task.setTitle(request.getTitle().trim());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setAssignee(assignee);
        task.setCreatedBy(currentUser);
        task.setDueDate(request.getDueDate());

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(savedTask);
    }

    public List<TaskResponse> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(TaskResponse::new)
                .toList();
    }

    public List<TaskResponse> getMyTasks() {
        User currentUser = getCurrentUser();

        return taskRepository.findByAssignee(currentUser)
                .stream()
                .map(TaskResponse::new)
                .toList();
    }

    public TaskResponse getTaskById(Long taskId) {

        User currentUser = getCurrentUser();

        Task task = taskRepository
                .findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        )
                );

        boolean isAdmin = hasRole("ROLE_ADMIN");

        boolean isAssignedEmployee =
                task.getAssignee() != null &&
                        task.getAssignee()
                                .getId()
                                .equals(currentUser.getId());

        if (!isAdmin && !isAssignedEmployee) {
            throw new ForbiddenException(
                    "You are not allowed to view this task"
            );
        }

        return new TaskResponse(task);
    }

    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request
    ) {
        Task task = taskRepository
                .findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        )
                );

        User assignee = null;

        if (request.getAssigneeId() != null) {
            assignee = userRepository
                    .findById(request.getAssigneeId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Assignee not found"
                            )
                    );
        }

        task.setTitle(request.getTitle().trim());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setAssignee(assignee);
        task.setDueDate(request.getDueDate());

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(savedTask);
    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository
                .findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        )
                );

        taskRepository.delete(task);
    }

    public TaskResponse updateTaskStatus(
            Long taskId,
            TaskStatusUpdateRequest request
    ) {
        User currentUser = getCurrentUser();

        Task task = taskRepository
                .findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found"
                        )
                );

        boolean isAdmin = hasRole("ROLE_ADMIN");

        boolean isAssignedEmployee =
                task.getAssignee() != null &&
                        task.getAssignee()
                                .getId()
                                .equals(currentUser.getId());

        if (!isAdmin && !isAssignedEmployee) {
            throw new ForbiddenException(
                    "You are not allowed to update this task"
            );
        }

        task.setStatus(request.getStatus());

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(savedTask);
    }

    private boolean hasRole(String roleName) {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return authentication
                .getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority().equals(roleName)
                );
    }

    private User getCurrentUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Current user not found"
                        )
                );
    }
}