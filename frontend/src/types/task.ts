export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "BLOCKED" | "COMPLETED";

export type TaskRequest = {
    title: string;
    description: string;
    priority: TaskPriority;
    assigneeId: number | null;
    dueDate: string;
};

export type TaskResponse = {
    id: number;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assigneeId: number | null;
    assigneeEmail: string | null;
    createdById: number;
    createdByEmail: string;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
};