import apiClient from "./apiClient";
import type { TaskRequest, TaskResponse, TaskStatus } from "../types/task";

export async function getAllTasks(): Promise<TaskResponse[]> {
    const response = await apiClient.get<TaskResponse[]>("/tasks");
    return response.data;
}

export async function getMyTasks(): Promise<TaskResponse[]> {
    const response = await apiClient.get<TaskResponse[]>("/tasks/my-tasks");
    return response.data;
}

export async function createTask(data: TaskRequest): Promise<TaskResponse> {
    const response = await apiClient.post<TaskResponse>("/tasks", data);
    return response.data;
}

export async function updateTask(
    taskId: number,
    data: TaskRequest
): Promise<TaskResponse> {
    const response = await apiClient.put<TaskResponse>(`/tasks/${taskId}`, data);
    return response.data;
}

export async function updateTaskStatus(
    taskId: number,
    status: TaskStatus
): Promise<TaskResponse> {
    const response = await apiClient.patch<TaskResponse>(
        `/tasks/${taskId}/status`,
        {
            status,
        }
    );

    return response.data;
}

export async function deleteTask(taskId: number): Promise<void> {
    await apiClient.delete(`/tasks/${taskId}`);
}