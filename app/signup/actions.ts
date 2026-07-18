"use server";

import { signUpSchema } from "@/zod";
import { ZodError } from "zod/v4";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";

export async function handleSignup(previousState: string, formData: FormData) {
    try {
        // Get the username and password
        const { username, password } = await signUpSchema.parseAsync({ username: formData.get("username"), password: formData.get("password")});

        // Make sure no other users have the same username
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (user) {
            return "Username already taken.";
        }

        // Salt and hash their password using bcrypt using the industry standard of 10 characters
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the user into the database
        await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword
            }
        });

        // Revalidate the users tag
        updateTag("users");
    } catch (error) {
        // If we encounter an error with the formatting, return that. Otherwise, throw the error and crash the client.
        if (error instanceof ZodError) {
            return error.issues.map(issue => issue.message).toString();
        }
        throw error;
    }

    redirect("/signup/success");
}