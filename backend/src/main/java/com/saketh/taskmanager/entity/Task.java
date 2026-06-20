package com.saketh.taskmanager.entity;

import com.saketh.taskmanager.enums.TaskPriority;

import com.saketh.taskmanager.enums.TaskStatus;

import jakarta.persistence.*;

import java.time.LocalDate;

import java.time.LocalDateTime;

@Entity

@Table(name = "tasks")

public class Task {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(nullable = false, length = 150)

    private String title;

    @Column(columnDefinition = "TEXT")

    private String description;

    @Enumerated(EnumType.STRING)

    @Column(nullable = false, length = 20)

    private TaskPriority priority;

    @Enumerated(EnumType.STRING)

    @Column(nullable = false, length = 30)

    private TaskStatus status = TaskStatus.TODO;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "assignee_id")

    private User assignee;

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "created_by_id", nullable = false)

    private User createdBy;

    @Column(name = "due_date")

    private LocalDate dueDate;

    @Column(name = "created_at", nullable = false, updatable = false)

    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)

    private LocalDateTime updatedAt;

    public Task() {

    }

    @PrePersist

    protected void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (status == null) {

            status = TaskStatus.TODO;

        }

    }

    @PreUpdate

    protected void onUpdate() {

        updatedAt = LocalDateTime.now();

    }

    public Long getId() {

        return id;

    }

    public String getTitle() {

        return title;

    }

    public void setTitle(String title) {

        this.title = title;

    }

    public String getDescription() {

        return description;

    }

    public void setDescription(String description) {

        this.description = description;

    }

    public TaskPriority getPriority() {

        return priority;

    }

    public void setPriority(TaskPriority priority) {

        this.priority = priority;

    }

    public TaskStatus getStatus() {

        return status;

    }

    public void setStatus(TaskStatus status) {

        this.status = status;

    }

    public User getAssignee() {

        return assignee;

    }

    public void setAssignee(User assignee) {

        this.assignee = assignee;

    }

    public User getCreatedBy() {

        return createdBy;

    }

    public void setCreatedBy(User createdBy) {

        this.createdBy = createdBy;

    }

    public LocalDate getDueDate() {

        return dueDate;

    }

    public void setDueDate(LocalDate dueDate) {

        this.dueDate = dueDate;

    }

    public LocalDateTime getCreatedAt() {

        return createdAt;

    }

    public LocalDateTime getUpdatedAt() {

        return updatedAt;

    }

}