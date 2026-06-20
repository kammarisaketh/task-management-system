package com.saketh.taskmanager.dto;

import com.saketh.taskmanager.entity.Task;
import com.saketh.taskmanager.enums.TaskPriority;
import com.saketh.taskmanager.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class TaskResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final TaskPriority priority;
    private final TaskStatus status;
    private final Long assigneeId;
    private final String assigneeEmail;
    private final Long createdById;
    private final String createdByEmail;
    private final LocalDate dueDate;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public TaskResponse(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.priority = task.getPriority();
        this.status = task.getStatus();

        this.assigneeId = task.getAssignee() != null
                ? task.getAssignee().getId()
                : null;

        this.assigneeEmail = task.getAssignee() != null
                ? task.getAssignee().getEmail()
                : null;

        this.createdById = task.getCreatedBy().getId();
        this.createdByEmail = task.getCreatedBy().getEmail();
        this.dueDate = task.getDueDate();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public String getAssigneeEmail() {
        return assigneeEmail;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public String getCreatedByEmail() {
        return createdByEmail;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}