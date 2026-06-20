export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    tokenType: string;
    email: string;
    roles: string[];
};

export type RegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type RegisterResponse = {
    message: string;
    userId: number;
    email: string;
};