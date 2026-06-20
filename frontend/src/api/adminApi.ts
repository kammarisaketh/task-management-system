import apiClient from "./apiClient";

import type { UserResponse } from "../types/user";

export async function getAllUsers(): Promise<UserResponse[]> {

    const response = await apiClient.get<UserResponse[]>("/admin/users");

    return response.data;

}