import { object, string } from 'zod/v4';

export const signInSchema = object({
    username: string()
        .min(1, { error: "Username is required" }),
    password: string()
        .min(1, { error: "Password is required" })
});

export const signUpSchema = object({
    username: string()
        .min(1, { error: "Username is required" }),
    password: string()
        .min(1, { error: "Password is required" })
        .min(8, { error: "Password must be at least 8 characters long" })
        .max(32, { error: "Password must be less than 32 characters long" })
});