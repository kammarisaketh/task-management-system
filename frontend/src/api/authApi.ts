import apiClient from "./apiClient";
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from "../types/auth";

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
}

export async function registerUser(
    data: RegisterRequest
): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>("/auth/register", data);
    return response.data;
}